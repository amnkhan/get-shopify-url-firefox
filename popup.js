window.addEventListener("DOMContentLoaded", () => {
  // UI Variables
  let bg = chrome.extension.getBackgroundPage();
  let wrapper = document.querySelector(".wrapper");
  let generalMessage = document.querySelector(".general-message");
  let shopifyInfoUi = document.querySelector(".shopify-info");
  let ShopifyContents;
  // Create the UI
  // not a shopify store
  function notAShopifyStore() {
    let p = document.createElement("p");
    let i = document.createElement("i");
    p.classList.add("normal-case");
    i.classList.add("fas", "fa-exclamation-circle");

    p.innerText = "Sorry, not a shopify store!";
    p.prepend(i);

    generalMessage.append(p);
  }

  // generate UI items
  function generateUI(
    elem,
    icon,
    elemClass,
    fontCase,
    iconClass,
    title,
    content
  ) {
    // let title_with_content = `${title}: ${content}`;
    elem = document.createElement("p");
    icon = document.createElement("i");
    elem.classList.add(elemClass, fontCase);
    icon.classList.add("fas", iconClass);
    if (title === "none") {
      elem.textContent = `${content}`;
    } else {
      elem.textContent = `${title}: ${content}`;
    }

    elem.prepend(icon);
    shopifyInfoUi.appendChild(elem);
  }

  // double click to copy to clipboard
  function copyToClipBoard(content, target) {
    navigator.clipboard.writeText(content).then(
      function () {
        if (target.childNodes[0].classList.contains("animate") === false) {
          // add animation
          target.childNodes[0].classList.add("animate");
          // remove animation
          setTimeout(function () {
            target.childNodes[0].classList.remove("animate");
          }, 1000);
        }
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }

  // Handle Double Click
  function handleClick(e) {
    // SHOP URL
    if (e.target.classList.contains("shop-url")) {
      let text = ShopifyContents.shopify.shop;
      copyToClipBoard(text, e.target);
    }
    // THEME NAME
    if (e.target.classList.contains("shop-theme")) {
      let text = ShopifyContents.shopify.theme.name;
      copyToClipBoard(text, e.target);
    }
    // ACTIVE CURRENCY
    if (e.target.classList.contains("shop-currency")) {
      let text = ShopifyContents.shopify.currency.active;
      copyToClipBoard(text, e.target);
    }
    // PRODUCT ID
    if (e.target.classList.contains("shop-product-id")) {
      let text = ShopifyContents.product.rid;
      copyToClipBoard(text, e.target);
    }
  }

  // Attach Double Click Event to Wrapper div
  wrapper.addEventListener("dblclick", handleClick);

  // shopify store
  function shopifyStore(shop, theme, currency, productId) {
    // shop
    if (shop !== undefined) {
      generateUI(
        "shopifyUrlElem",
        "shopifyUrlIcon",
        "shop-url",
        "normal-case",
        "fa-store",
        "Shop",
        shop
      );
    }

    // theme
    if (theme !== undefined) {
      generateUI(
        "shopifyThemeElem",
        "shopifyThemeIcon",
        "shop-theme",
        "normal-case",
        "fa-pager",
        "Theme",
        theme
      );
    }
    // currency
    if (currency !== undefined) {
      generateUI(
        "shopifyCurrencyElem",
        "shopifyCurrencyIcon",
        "shop-currency",
        "normal-case",
        "fa-wallet",
        "Currency",
        currency
      );
    }

    // Product ID
    if (productId !== undefined) {
      // Product ID
      generateUI(
        "shopifyProductId",
        "shopifyProductIcon",
        "shop-product-id",
        "normal-case",
        "fa-hashtag",
        "Product id",
        productId
      );
    }
  }

  // Check for the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentTabId = tabs[0].id;
    let currentPerf = bg.perfWatch[currentTabId];
    ShopifyContents = currentPerf;
    // safety check: when page is still loading
    if (!currentPerf) {
      return;
    }
    // If the URL is not a shopify store
    if (currentPerf.shopify == false) {
      notAShopifyStore();
      console.log(currentPerf.shopify);
    }
    // If the URL is a shopify store
    if (currentPerf.shopify) {
      shopifyStore(
        currentPerf.shopify.shop,
        currentPerf.shopify.theme.name,
        currentPerf.shopify.currency.active,
        currentPerf.product.rid
      );
    }
  });
});
