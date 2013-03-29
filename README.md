[![build status](https://secure.travis-ci.org/dankogai/js-codepoints.png)](http://travis-ci.org/dankogai/js-codepoints)

codepoints.js
=============

make your javascript handle unicode codepoints more correctly

SYNOPSIS
========
````javascript
'𠮷野家'.length;                        // 4 // unfortunately
'𠮷野家'.codepoints;                    // 3 // naturally
String.fromCodePoint(0x20BB7);          // '𠮷'
'𠮷野家'.codePointAt(0);                // 0x20BB7
'𠮷野家'.toArrayOfUChar();              // ['𠮷','野','家']
'𠮷野家'.replace(RegExp.RE_UCHAR, '.'); // '...'
````
codepoints.js
=============

make your javascript handle unicode codepoints more correctly

SYNOPSIS
========
````javascript
'𠮷野家'.length;                        // 4 // unfortunately
'𠮷野家'.codepoints;                    // 3 // naturally
String.fromCodePoint(0x20BB7);          // '𠮷'
'𠮷野家'.codePointAt(0);                // 0x20BB7
'𠮷野家'.toArrayOfUChar();              // ['𠮷','野','家']
'𠮷野家'.replace(RegExp.RE_UCHAR, '.'); // '...'
````
