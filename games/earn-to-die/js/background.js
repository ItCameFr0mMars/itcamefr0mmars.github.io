

function earn_to_die_part_2_remastered() {
  chrome.tabs.create({url: chrome.runtime.getURL("earn_to_die_part_2_remastered.html")}, function () {})
}

chrome.browserAction.onClicked.addListener(earn_to_die_part_2_remastered);

chrome.runtime.onInstalled.addListener(function (r) {
  if (r.reason === "install")
    earn_to_die_part_2_remastered();
});