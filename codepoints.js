/*
 * $Id: codepoints.js,v 0.3 2013/03/30 14:01:33 dankogai Exp dankogai $
 *
 * codepoints.js
 *
 *  (c) 2013 Dan Kogai
 *
 *  Licensed under the MIT license.
 *  http://www.opensource.org/licenses/mit-license
 *
 */
(function(root) {
    'use strict';
    // utilities
    var defineProperty = Object.defineProperty;
    var install = function(o, k, f) {
        if (Object.defaultProperty) {
            Object.defaultProperty(
                o, k,
                {value: f, writable: true, configurable: true}
            );
        } else {
            if (o[k]) return;
            o[k] = f;
            if (defineProperty) defineProperty(o, k, {enumerable: false});
        }
    };
    var fromCharCode = String.fromCharCode;
    // let the show begin
    var re_uchars = /([\uD800-\uDBFF][\uDC00-\uDFFFF]|[\S\s])/g;
    install(RegExp, 'RE_UCHARS', re_uchars);
    // number of codepoints in the string -- needs ES5
    install(String.prototype, 'codePointsOf', function() {
        return ('' + this).replace(re_uchars, '_').length;
    });
    if (defineProperty) {
        defineProperty(String.prototype, 'codepoints', {
            get: function() { return ('' + this).codePointsOf() }
        });
    }
    install(String.prototype, 'forEachUChar', function(f, ctx) {
        var i = 0, s = '' + this;
        s.replace(re_uchars, function(u) {
            f.call(ctx, u, i++, s);
        });
    });
    install(String.prototype, 'toArrayOfUChars', function() {
        var ret = [];
        ('' + this).replace(re_uchars, function(cp) { ret.push(cp) });
        return ret;
    });
    install(String.prototype, 'uCharAt', function(n) {
        return ('' + this).toArrayOfUChars()[n];
    });
    // ES6 proposals
    install(String, 'fromCodePoint', function(n) {
        if (n < 0 && n > 0x10FFFF)
            throw new RangeError('invalid codepoint');
        if (n < 0xFFFF) return fromCharCode(n);
        var offset = n - 0x10000,
        hi = (offset >>> 10) + 0xD800,
        lo = (offset & 0x3FF) + 0xDC00;
        return fromCharCode(hi) + fromCharCode(lo);
    });
    install(String.prototype, 'codePointAt', function(n) {
        var c = ('' + this).toArrayOfUChars()[n];
        if (!c) return NaN;
        if (c.length === 1) return c.charCodeAt(0);
        return 0x10000
            + (c.charCodeAt(0) - 0xD800) * 0x400
            + (c.charCodeAt(1) - 0xDC00);
    });
})(this);
