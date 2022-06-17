// get Shopify properties from DOM
function parseShopifyData() {
  let data = {};
  if (window.Shopify || window.__st) {
    data.shopify = JSON.parse(JSON.stringify(window.Shopify)) || null;
    data.product = JSON.parse(JSON.stringify(window.__st)) || null;
  } else {
    data.shopify = false;
  }
  return data;
}

// Pass that Shopify properties to Background.js
let essential = parseShopifyData();
window.postMessage({ type: "FROM_PAGE", essential });
