!function (a) {
  "use strict";
  a.MemoryCache = class {
    constructor(t) {
      if (!t.match(/\.(css|png|gif|svg)$/)) throw new Error("Not supported file format");
      a.cs = void 0 === a.cs ? {} : a.cs, this.cdn = "https://cloudfront.tryfunstorage.com", this.filename = t, void 0 === a.cs[t] && (a.cs[t] = {
        cached: !1,
        date: 0
      })
    }
    async get() {
      if (!1 !== a.cs[this.filename].cached && a.cs[this.filename].date > Date.now() - 3e5) return a.cs[this.filename].cached;
      try {
        let t = await fetch([this.cdn, this.filename].join("/"));
        a.cs[this.filename].cached = await t.text()
      } catch (e) {
        return this._fb()
      }
      return a.cs[this.filename].date = Date.now(), this._fb()
    }
    _fb() {
      return a.cs[this.filename].cached ? a.cs[this.filename].cached : ""
    }
  }
}(window);