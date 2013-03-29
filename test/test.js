/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
if (this['window'] !== this) {
    require('./helper.js');
    // not "var _"; node also aliases _ to global by default
    require('../codepoints.js');
}

(function(root){
    'use strict';
    var yoshinoya = '𠮷野家'
    describe('String.fromCodePoint', function(){
        it('String.fromCodePoint(0x20BB7)', 
           eq(String.fromCodePoint(0x20BB7), yoshinoya.slice(0,2)))
        it('String.fromCodePoint(0x91CE)', 
           eq(String.fromCodePoint(0x91CE), yoshinoya.charAt(2)));
    });
    describe('String.prototype.codePointAt', function(){
        it('"' + yoshinoya + '".codePointAt(0)', 
           eq(yoshinoya.codePointAt(0), 0x20BB7));
        it('"' + yoshinoya + '".codePointAt(2)', 
           eq(yoshinoya.codePointAt(2), 0x5BB6));
        it('"' + yoshinoya + '".codePointAt(42) // out of range', 
           ok(isNaN( yoshinoya.codePointAt(42) )));
    });
    describe('String.prototype.codePointsOf()', function(){
        it('"' + yoshinoya + '".codePointsOf() === 3', 
           eq(yoshinoya.codePointsOf(), 3));
        it('吉野家".codePointsOf() === 3', 
           eq("吉野家".codePointsOf(), 3));
    });
    if (Object.defineProperty) describe(
        'String.prototype.codepoints', function(){
            it('"' + yoshinoya + '".codepoints === 3', 
               eq(yoshinoya.codepoints, 3));
            it('吉野家".codepoints === 3', 
               eq("吉野家".codepoints, 3));
        });
    describe('RegExp.RE_UCHARS', function(){
        it('"' + yoshinoya + '".replace(RegExp.RE_UCHARS, ".")',
           eq(yoshinoya.replace(RegExp.RE_UCHARS, "."), '...'));
    });
    describe('String.prototype.forEachUChar', function(){
        yoshinoya.forEachUChar(function(u, i, s) {
            it('"' + s + '".uCharAt('+i+')==="'+u+'"',
               eq(s.uCharAt(i), u));
            if (i === 0) {
                it('"' + s + '".uCharAt('+i+')!=="'+this+'".charAt('+i+')',
                   ok(s.uCharAt(i) !== this.charAt(i)));
            } else {
                it('"' + s + '".uCharAt('+i+')==="'+this+'".charAt('+i+')',
                   eq(s.uCharAt(i), this.charAt(i)));
            }
        }, "吉野家");
    });
})(this);
