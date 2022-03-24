export var get = function (k) {
    var v = localStorage.getItem(k);
    if ((v === null || v === void 0 ? void 0 : v.charAt(0)) !== '{') {
        return v;
    }
    try {
        return JSON.parse(v);
    }
    catch (e) {
        console.warn(e);
    }
};
export var set = function (k, v) { return localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); };
export var del = function (k) { return localStorage.removeItem(k); };
