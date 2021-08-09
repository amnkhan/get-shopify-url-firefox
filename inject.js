// get Shopify properties from DOM
function parseShopifyData() {
  let data = {};
  if (window.Shopify) {
    data.shopify = JSON.parse(JSON.stringify(window.Shopify)) || null;
  } else {
    data.shopify = false;
  }
  return data;
}

// Pass that Shopify properties to Background.js
setInterval(() => {
  let essential = parseShopifyData();
  window.postMessage({ type: "FROM_PAGE", essential });
}, 500);
