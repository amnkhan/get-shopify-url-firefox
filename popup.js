window.addEventListener("DOMContentLoaded", () => {
  // UI Variables
  let bg = chrome.extension.getBackgroundPage();
  let generalMessage = document.querySelector(".general-message");
  let shopifyInfoUi = document.querySelector(".shopify-info");

  // Create the UI
  // not a shopify store
  function notAShopifyStore() {
    let p = document.createElement("p");
    let i = document.createElement("i");
    p.classList.add("normal-case");
    i.classList.add("fas", "fa-exclamation-circle");

    p.innerText = "Sorry, not a Shopify Store!";
    p.prepend(i);

    generalMessage.append(p);
  }

  // shopify store
  function shopifyStore(shop, theme, currency) {
    // shop
    let shopifyUrlElem = document.createElement("p");
    let shopifyUrlIcon = document.createElement("i");
    shopifyUrlElem.classList.add("shop-url");
    shopifyUrlIcon.classList.add("fas", "fa-clipboard-check");
    shopifyUrlElem.textContent = `${shop}`;
    shopifyUrlElem.prepend(shopifyUrlIcon);
    shopifyInfoUi.appendChild(shopifyUrlElem);

    // theme
    let shopifyThemeElem = document.createElement("p");
    let shopifyThemeIcon = document.createElement("i");
    shopifyThemeElem.classList.add("shop-theme", "normal-case");
    shopifyThemeIcon.classList.add("fas", "fa-clipboard-list");
    shopifyThemeElem.textContent = `${theme}`;
    shopifyThemeElem.prepend(shopifyThemeIcon);
    shopifyInfoUi.appendChild(shopifyThemeElem);
    // currency
    let shopifyCurrencyElem = document.createElement("p");
    let shopifyCurrencyIcon = document.createElement("i");
    shopifyCurrencyElem.classList.add("shop-currency", "uppercase");
    shopifyCurrencyIcon.classList.add("fas", "fa-dollar-sign");
    shopifyCurrencyElem.textContent = `${currency}`;
    shopifyCurrencyElem.prepend(shopifyCurrencyIcon);
    shopifyInfoUi.appendChild(shopifyCurrencyElem);
  }

  // Check for the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentTabId = tabs[0].id;
    let currentPerf = bg.perfWatch[currentTabId];

    // safety check: when page is still loading
    if (!currentPerf) {
      return;
    }
    // If the URL is not a shopify store
    if (currentPerf.shopify == false) {
      notAShopifyStore();
    }
    // If the URL is a shopify store
    if (currentPerf.shopify) {
      shopifyStore(
        currentPerf.shopify.shop,
        currentPerf.shopify.theme.name,
        currentPerf.shopify.currency.active
      );
    }
  });
});
