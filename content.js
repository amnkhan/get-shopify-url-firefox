/**
 * injectScript - Inject internal script to available access to the `window`
 *
 */
function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}
injectScript(chrome.runtime.getURL("inject.js"), "body");

// Listen for message from inject js
window.addEventListener(
  "message",
  function (event) {
    if (event.data.type && event.data.type == "FROM_PAGE") {
      chrome.runtime.sendMessage({ essential: event.data.essential });
    }
  },
  false
);
