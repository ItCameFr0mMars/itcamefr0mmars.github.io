function gameTab() {
  chrome.tabs.create({url: chrome.runtime.getURL("slope.html")}, function (e) {
  })
}

chrome.runtime.onInstalled.addListener(function (e) {
  "install" === e.reason && gameTab()
}), chrome.browserAction.onClicked.addListener(gameTab), chrome.runtime.onMessage.addListener(function (e, n, r) {
  if (chrome.runtime.id === n.id && e.message) {
    let n = e.message;
    if ("open" === n) return gameTab(), !1;
    if ("string" == typeof n.r) return new MemoryCache(n.r).get().then(r), !0
  }
  return !1
});