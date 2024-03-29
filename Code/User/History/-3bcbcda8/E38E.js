!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.app = t())
    : (e.app = t());
})(global, function () {
  return (function (e) {
    var t = {};
    function o(i) {
      if (t[i]) return t[i].exports;
      var r = (t[i] = { i: i, l: !1, exports: {} });
      return e[i].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
    }
    return (
      (o.m = e),
      (o.c = t),
      (o.d = function (e, t, i) {
        o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
      }),
      (o.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (o.t = function (e, t) {
        if ((1 & t && (e = o(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (
          (o.r(i),
          Object.defineProperty(i, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var r in e)
            o.d(
              i,
              r,
              function (t) {
                return e[t];
              }.bind(null, r)
            );
        return i;
      }),
      (o.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return o.d(t, "a", t), t;
      }),
      (o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.p = ""),
      o((o.s = 9))
    );
  })([
    function (e, t) {
      e.exports = require("fs");
    },
    function (module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_RESULT__;
      /**
       * [js-md5]{@link https://github.com/emn178/js-md5}
       *
       * @namespace md5
       * @version 0.7.3
       * @author Chen, Yi-Cyuan [emn178@gmail.com]
       * @copyright Chen, Yi-Cyuan 2014-2017
       * @license MIT
       */ !(function () {
        "use strict";
        var ERROR = "input is invalid type",
          WINDOW = "object" == typeof window,
          root = WINDOW ? window : {};
        root.JS_MD5_NO_WINDOW && (WINDOW = !1);
        var WEB_WORKER = !WINDOW && "object" == typeof self,
          NODE_JS =
            !root.JS_MD5_NO_NODE_JS &&
            "object" == typeof process &&
            process.versions &&
            process.versions.node;
        NODE_JS ? (root = global) : WEB_WORKER && (root = self);
        var COMMON_JS =
            !root.JS_MD5_NO_COMMON_JS &&
            "object" == typeof module &&
            module.exports,
          AMD = __webpack_require__(2),
          ARRAY_BUFFER =
            !root.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
          HEX_CHARS = "0123456789abcdef".split(""),
          EXTRA = [128, 32768, 8388608, -2147483648],
          SHIFT = [0, 8, 16, 24],
          OUTPUT_TYPES = [
            "hex",
            "array",
            "digest",
            "buffer",
            "arrayBuffer",
            "base64",
          ],
          BASE64_ENCODE_CHAR =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
              ""
            ),
          blocks = [],
          buffer8;
        if (ARRAY_BUFFER) {
          var buffer = new ArrayBuffer(68);
          (buffer8 = new Uint8Array(buffer)),
            (blocks = new Uint32Array(buffer));
        }
        (!root.JS_MD5_NO_NODE_JS && Array.isArray) ||
          (Array.isArray = function (e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          }),
          !ARRAY_BUFFER ||
            (!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
            (ArrayBuffer.isView = function (e) {
              return (
                "object" == typeof e &&
                e.buffer &&
                e.buffer.constructor === ArrayBuffer
              );
            });
        var createOutputMethod = function (e) {
            return function (t) {
              return new Md5(!0).update(t)[e]();
            };
          },
          createMethod = function () {
            var e = createOutputMethod("hex");
            NODE_JS && (e = nodeWrap(e)),
              (e.create = function () {
                return new Md5();
              }),
              (e.update = function (t) {
                return e.create().update(t);
              });
            for (var t = 0; t < OUTPUT_TYPES.length; ++t) {
              var o = OUTPUT_TYPES[t];
              e[o] = createOutputMethod(o);
            }
            return e;
          },
          nodeWrap = function (method) {
            var crypto = eval("require('crypto')"),
              Buffer = eval("require('buffer').Buffer"),
              nodeMethod = function (e) {
                if ("string" == typeof e)
                  return crypto
                    .createHash("md5")
                    .update(e, "utf8")
                    .digest("hex");
                if (null == e) throw ERROR;
                return (
                  e.constructor === ArrayBuffer && (e = new Uint8Array(e)),
                  Array.isArray(e) ||
                  ArrayBuffer.isView(e) ||
                  e.constructor === Buffer
                    ? crypto
                        .createHash("md5")
                        .update(new Buffer(e))
                        .digest("hex")
                    : method(e)
                );
              };
            return nodeMethod;
          };
        function Md5(e) {
          if (e)
            (blocks[0] =
              blocks[16] =
              blocks[1] =
              blocks[2] =
              blocks[3] =
              blocks[4] =
              blocks[5] =
              blocks[6] =
              blocks[7] =
              blocks[8] =
              blocks[9] =
              blocks[10] =
              blocks[11] =
              blocks[12] =
              blocks[13] =
              blocks[14] =
              blocks[15] =
                0),
              (this.blocks = blocks),
              (this.buffer8 = buffer8);
          else if (ARRAY_BUFFER) {
            var t = new ArrayBuffer(68);
            (this.buffer8 = new Uint8Array(t)),
              (this.blocks = new Uint32Array(t));
          } else
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          (this.h0 =
            this.h1 =
            this.h2 =
            this.h3 =
            this.start =
            this.bytes =
            this.hBytes =
              0),
            (this.finalized = this.hashed = !1),
            (this.first = !0);
        }
        (Md5.prototype.update = function (e) {
          if (!this.finalized) {
            var t,
              o = typeof e;
            if ("string" !== o) {
              if ("object" !== o) throw ERROR;
              if (null === e) throw ERROR;
              if (ARRAY_BUFFER && e.constructor === ArrayBuffer)
                e = new Uint8Array(e);
              else if (
                !(Array.isArray(e) || (ARRAY_BUFFER && ArrayBuffer.isView(e)))
              )
                throw ERROR;
              t = !0;
            }
            for (
              var i, r, s = 0, n = e.length, a = this.blocks, c = this.buffer8;
              s < n;

            ) {
              if (
                (this.hashed &&
                  ((this.hashed = !1),
                  (a[0] = a[16]),
                  (a[16] =
                    a[1] =
                    a[2] =
                    a[3] =
                    a[4] =
                    a[5] =
                    a[6] =
                    a[7] =
                    a[8] =
                    a[9] =
                    a[10] =
                    a[11] =
                    a[12] =
                    a[13] =
                    a[14] =
                    a[15] =
                      0)),
                t)
              )
                if (ARRAY_BUFFER)
                  for (r = this.start; s < n && r < 64; ++s) c[r++] = e[s];
                else
                  for (r = this.start; s < n && r < 64; ++s)
                    a[r >> 2] |= e[s] << SHIFT[3 & r++];
              else if (ARRAY_BUFFER)
                for (r = this.start; s < n && r < 64; ++s)
                  (i = e.charCodeAt(s)) < 128
                    ? (c[r++] = i)
                    : i < 2048
                    ? ((c[r++] = 192 | (i >> 6)), (c[r++] = 128 | (63 & i)))
                    : i < 55296 || i >= 57344
                    ? ((c[r++] = 224 | (i >> 12)),
                      (c[r++] = 128 | ((i >> 6) & 63)),
                      (c[r++] = 128 | (63 & i)))
                    : ((i =
                        65536 +
                        (((1023 & i) << 10) | (1023 & e.charCodeAt(++s)))),
                      (c[r++] = 240 | (i >> 18)),
                      (c[r++] = 128 | ((i >> 12) & 63)),
                      (c[r++] = 128 | ((i >> 6) & 63)),
                      (c[r++] = 128 | (63 & i)));
              else
                for (r = this.start; s < n && r < 64; ++s)
                  (i = e.charCodeAt(s)) < 128
                    ? (a[r >> 2] |= i << SHIFT[3 & r++])
                    : i < 2048
                    ? ((a[r >> 2] |= (192 | (i >> 6)) << SHIFT[3 & r++]),
                      (a[r >> 2] |= (128 | (63 & i)) << SHIFT[3 & r++]))
                    : i < 55296 || i >= 57344
                    ? ((a[r >> 2] |= (224 | (i >> 12)) << SHIFT[3 & r++]),
                      (a[r >> 2] |= (128 | ((i >> 6) & 63)) << SHIFT[3 & r++]),
                      (a[r >> 2] |= (128 | (63 & i)) << SHIFT[3 & r++]))
                    : ((i =
                        65536 +
                        (((1023 & i) << 10) | (1023 & e.charCodeAt(++s)))),
                      (a[r >> 2] |= (240 | (i >> 18)) << SHIFT[3 & r++]),
                      (a[r >> 2] |= (128 | ((i >> 12) & 63)) << SHIFT[3 & r++]),
                      (a[r >> 2] |= (128 | ((i >> 6) & 63)) << SHIFT[3 & r++]),
                      (a[r >> 2] |= (128 | (63 & i)) << SHIFT[3 & r++]));
              (this.lastByteIndex = r),
                (this.bytes += r - this.start),
                r >= 64
                  ? ((this.start = r - 64), this.hash(), (this.hashed = !0))
                  : (this.start = r);
            }
            return (
              this.bytes > 4294967295 &&
                ((this.hBytes += (this.bytes / 4294967296) << 0),
                (this.bytes = this.bytes % 4294967296)),
              this
            );
          }
        }),
          (Md5.prototype.finalize = function () {
            if (!this.finalized) {
              this.finalized = !0;
              var e = this.blocks,
                t = this.lastByteIndex;
              (e[t >> 2] |= EXTRA[3 & t]),
                t >= 56 &&
                  (this.hashed || this.hash(),
                  (e[0] = e[16]),
                  (e[16] =
                    e[1] =
                    e[2] =
                    e[3] =
                    e[4] =
                    e[5] =
                    e[6] =
                    e[7] =
                    e[8] =
                    e[9] =
                    e[10] =
                    e[11] =
                    e[12] =
                    e[13] =
                    e[14] =
                    e[15] =
                      0)),
                (e[14] = this.bytes << 3),
                (e[15] = (this.hBytes << 3) | (this.bytes >>> 29)),
                this.hash();
            }
          }),
          (Md5.prototype.hash = function () {
            var e,
              t,
              o,
              i,
              r,
              s,
              n = this.blocks;
            this.first
              ? (t =
                  ((((t =
                    ((e =
                      ((((e = n[0] - 680876937) << 7) | (e >>> 25)) -
                        271733879) <<
                      0) ^
                      ((o =
                        ((((o =
                          (-271733879 ^
                            ((i =
                              ((((i =
                                (-1732584194 ^ (2004318071 & e)) +
                                n[1] -
                                117830708) <<
                                12) |
                                (i >>> 20)) +
                                e) <<
                              0) &
                              (-271733879 ^ e))) +
                          n[2] -
                          1126478375) <<
                          17) |
                          (o >>> 15)) +
                          i) <<
                        0) &
                        (i ^ e))) +
                    n[3] -
                    1316259209) <<
                    22) |
                    (t >>> 10)) +
                    o) <<
                  0)
              : ((e = this.h0),
                (t = this.h1),
                (o = this.h2),
                (t =
                  ((((t +=
                    ((e =
                      ((((e +=
                        ((i = this.h3) ^ (t & (o ^ i))) + n[0] - 680876936) <<
                        7) |
                        (e >>> 25)) +
                        t) <<
                      0) ^
                      ((o =
                        ((((o +=
                          (t ^
                            ((i =
                              ((((i +=
                                (o ^ (e & (t ^ o))) + n[1] - 389564586) <<
                                12) |
                                (i >>> 20)) +
                                e) <<
                              0) &
                              (e ^ t))) +
                          n[2] +
                          606105819) <<
                          17) |
                          (o >>> 15)) +
                          i) <<
                        0) &
                        (i ^ e))) +
                    n[3] -
                    1044525330) <<
                    22) |
                    (t >>> 10)) +
                    o) <<
                  0)),
              (t =
                ((((t +=
                  ((e =
                    ((((e += (i ^ (t & (o ^ i))) + n[4] - 176418897) << 7) |
                      (e >>> 25)) +
                      t) <<
                    0) ^
                    ((o =
                      ((((o +=
                        (t ^
                          ((i =
                            ((((i += (o ^ (e & (t ^ o))) + n[5] + 1200080426) <<
                              12) |
                              (i >>> 20)) +
                              e) <<
                            0) &
                            (e ^ t))) +
                        n[6] -
                        1473231341) <<
                        17) |
                        (o >>> 15)) +
                        i) <<
                      0) &
                      (i ^ e))) +
                  n[7] -
                  45705983) <<
                  22) |
                  (t >>> 10)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((e =
                    ((((e += (i ^ (t & (o ^ i))) + n[8] + 1770035416) << 7) |
                      (e >>> 25)) +
                      t) <<
                    0) ^
                    ((o =
                      ((((o +=
                        (t ^
                          ((i =
                            ((((i += (o ^ (e & (t ^ o))) + n[9] - 1958414417) <<
                              12) |
                              (i >>> 20)) +
                              e) <<
                            0) &
                            (e ^ t))) +
                        n[10] -
                        42063) <<
                        17) |
                        (o >>> 15)) +
                        i) <<
                      0) &
                      (i ^ e))) +
                  n[11] -
                  1990404162) <<
                  22) |
                  (t >>> 10)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((e =
                    ((((e += (i ^ (t & (o ^ i))) + n[12] + 1804603682) << 7) |
                      (e >>> 25)) +
                      t) <<
                    0) ^
                    ((o =
                      ((((o +=
                        (t ^
                          ((i =
                            ((((i += (o ^ (e & (t ^ o))) + n[13] - 40341101) <<
                              12) |
                              (i >>> 20)) +
                              e) <<
                            0) &
                            (e ^ t))) +
                        n[14] -
                        1502002290) <<
                        17) |
                        (o >>> 15)) +
                        i) <<
                      0) &
                      (i ^ e))) +
                  n[15] +
                  1236535329) <<
                  22) |
                  (t >>> 10)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((i =
                    ((((i +=
                      (t ^
                        (o &
                          ((e =
                            ((((e += (o ^ (i & (t ^ o))) + n[1] - 165796510) <<
                              5) |
                              (e >>> 27)) +
                              t) <<
                            0) ^
                            t))) +
                      n[6] -
                      1069501632) <<
                      9) |
                      (i >>> 23)) +
                      e) <<
                    0) ^
                    (e &
                      ((o =
                        ((((o += (e ^ (t & (i ^ e))) + n[11] + 643717713) <<
                          14) |
                          (o >>> 18)) +
                          i) <<
                        0) ^
                        i))) +
                  n[0] -
                  373897302) <<
                  20) |
                  (t >>> 12)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((i =
                    ((((i +=
                      (t ^
                        (o &
                          ((e =
                            ((((e += (o ^ (i & (t ^ o))) + n[5] - 701558691) <<
                              5) |
                              (e >>> 27)) +
                              t) <<
                            0) ^
                            t))) +
                      n[10] +
                      38016083) <<
                      9) |
                      (i >>> 23)) +
                      e) <<
                    0) ^
                    (e &
                      ((o =
                        ((((o += (e ^ (t & (i ^ e))) + n[15] - 660478335) <<
                          14) |
                          (o >>> 18)) +
                          i) <<
                        0) ^
                        i))) +
                  n[4] -
                  405537848) <<
                  20) |
                  (t >>> 12)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((i =
                    ((((i +=
                      (t ^
                        (o &
                          ((e =
                            ((((e += (o ^ (i & (t ^ o))) + n[9] + 568446438) <<
                              5) |
                              (e >>> 27)) +
                              t) <<
                            0) ^
                            t))) +
                      n[14] -
                      1019803690) <<
                      9) |
                      (i >>> 23)) +
                      e) <<
                    0) ^
                    (e &
                      ((o =
                        ((((o += (e ^ (t & (i ^ e))) + n[3] - 187363961) <<
                          14) |
                          (o >>> 18)) +
                          i) <<
                        0) ^
                        i))) +
                  n[8] +
                  1163531501) <<
                  20) |
                  (t >>> 12)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((i =
                    ((((i +=
                      (t ^
                        (o &
                          ((e =
                            ((((e +=
                              (o ^ (i & (t ^ o))) + n[13] - 1444681467) <<
                              5) |
                              (e >>> 27)) +
                              t) <<
                            0) ^
                            t))) +
                      n[2] -
                      51403784) <<
                      9) |
                      (i >>> 23)) +
                      e) <<
                    0) ^
                    (e &
                      ((o =
                        ((((o += (e ^ (t & (i ^ e))) + n[7] + 1735328473) <<
                          14) |
                          (o >>> 18)) +
                          i) <<
                        0) ^
                        i))) +
                  n[12] -
                  1926607734) <<
                  20) |
                  (t >>> 12)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((s =
                    (i =
                      ((((i +=
                        ((r = t ^ o) ^
                          (e =
                            ((((e += (r ^ i) + n[5] - 378558) << 4) |
                              (e >>> 28)) +
                              t) <<
                            0)) +
                        n[8] -
                        2022574463) <<
                        11) |
                        (i >>> 21)) +
                        e) <<
                      0) ^ e) ^
                    (o =
                      ((((o += (s ^ t) + n[11] + 1839030562) << 16) |
                        (o >>> 16)) +
                        i) <<
                      0)) +
                  n[14] -
                  35309556) <<
                  23) |
                  (t >>> 9)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((s =
                    (i =
                      ((((i +=
                        ((r = t ^ o) ^
                          (e =
                            ((((e += (r ^ i) + n[1] - 1530992060) << 4) |
                              (e >>> 28)) +
                              t) <<
                            0)) +
                        n[4] +
                        1272893353) <<
                        11) |
                        (i >>> 21)) +
                        e) <<
                      0) ^ e) ^
                    (o =
                      ((((o += (s ^ t) + n[7] - 155497632) << 16) |
                        (o >>> 16)) +
                        i) <<
                      0)) +
                  n[10] -
                  1094730640) <<
                  23) |
                  (t >>> 9)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((s =
                    (i =
                      ((((i +=
                        ((r = t ^ o) ^
                          (e =
                            ((((e += (r ^ i) + n[13] + 681279174) << 4) |
                              (e >>> 28)) +
                              t) <<
                            0)) +
                        n[0] -
                        358537222) <<
                        11) |
                        (i >>> 21)) +
                        e) <<
                      0) ^ e) ^
                    (o =
                      ((((o += (s ^ t) + n[3] - 722521979) << 16) |
                        (o >>> 16)) +
                        i) <<
                      0)) +
                  n[6] +
                  76029189) <<
                  23) |
                  (t >>> 9)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((s =
                    (i =
                      ((((i +=
                        ((r = t ^ o) ^
                          (e =
                            ((((e += (r ^ i) + n[9] - 640364487) << 4) |
                              (e >>> 28)) +
                              t) <<
                            0)) +
                        n[12] -
                        421815835) <<
                        11) |
                        (i >>> 21)) +
                        e) <<
                      0) ^ e) ^
                    (o =
                      ((((o += (s ^ t) + n[15] + 530742520) << 16) |
                        (o >>> 16)) +
                        i) <<
                      0)) +
                  n[2] -
                  995338651) <<
                  23) |
                  (t >>> 9)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((i =
                    ((((i +=
                      (t ^
                        ((e =
                          ((((e += (o ^ (t | ~i)) + n[0] - 198630844) << 6) |
                            (e >>> 26)) +
                            t) <<
                          0) |
                          ~o)) +
                      n[7] +
                      1126891415) <<
                      10) |
                      (i >>> 22)) +
                      e) <<
                    0) ^
                    ((o =
                      ((((o += (e ^ (i | ~t)) + n[14] - 1416354905) << 15) |
                        (o >>> 17)) +
                        i) <<
                      0) |
                      ~e)) +
                  n[5] -
                  57434055) <<
                  21) |
                  (t >>> 11)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((i =
                    ((((i +=
                      (t ^
                        ((e =
                          ((((e += (o ^ (t | ~i)) + n[12] + 1700485571) << 6) |
                            (e >>> 26)) +
                            t) <<
                          0) |
                          ~o)) +
                      n[3] -
                      1894986606) <<
                      10) |
                      (i >>> 22)) +
                      e) <<
                    0) ^
                    ((o =
                      ((((o += (e ^ (i | ~t)) + n[10] - 1051523) << 15) |
                        (o >>> 17)) +
                        i) <<
                      0) |
                      ~e)) +
                  n[1] -
                  2054922799) <<
                  21) |
                  (t >>> 11)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((i =
                    ((((i +=
                      (t ^
                        ((e =
                          ((((e += (o ^ (t | ~i)) + n[8] + 1873313359) << 6) |
                            (e >>> 26)) +
                            t) <<
                          0) |
                          ~o)) +
                      n[15] -
                      30611744) <<
                      10) |
                      (i >>> 22)) +
                      e) <<
                    0) ^
                    ((o =
                      ((((o += (e ^ (i | ~t)) + n[6] - 1560198380) << 15) |
                        (o >>> 17)) +
                        i) <<
                      0) |
                      ~e)) +
                  n[13] +
                  1309151649) <<
                  21) |
                  (t >>> 11)) +
                  o) <<
                0),
              (t =
                ((((t +=
                  ((i =
                    ((((i +=
                      (t ^
                        ((e =
                          ((((e += (o ^ (t | ~i)) + n[4] - 145523070) << 6) |
                            (e >>> 26)) +
                            t) <<
                          0) |
                          ~o)) +
                      n[11] -
                      1120210379) <<
                      10) |
                      (i >>> 22)) +
                      e) <<
                    0) ^
                    ((o =
                      ((((o += (e ^ (i | ~t)) + n[2] + 718787259) << 15) |
                        (o >>> 17)) +
                        i) <<
                      0) |
                      ~e)) +
                  n[9] -
                  343485551) <<
                  21) |
                  (t >>> 11)) +
                  o) <<
                0),
              this.first
                ? ((this.h0 = (e + 1732584193) << 0),
                  (this.h1 = (t - 271733879) << 0),
                  (this.h2 = (o - 1732584194) << 0),
                  (this.h3 = (i + 271733878) << 0),
                  (this.first = !1))
                : ((this.h0 = (this.h0 + e) << 0),
                  (this.h1 = (this.h1 + t) << 0),
                  (this.h2 = (this.h2 + o) << 0),
                  (this.h3 = (this.h3 + i) << 0));
          }),
          (Md5.prototype.hex = function () {
            this.finalize();
            var e = this.h0,
              t = this.h1,
              o = this.h2,
              i = this.h3;
            return (
              HEX_CHARS[(e >> 4) & 15] +
              HEX_CHARS[15 & e] +
              HEX_CHARS[(e >> 12) & 15] +
              HEX_CHARS[(e >> 8) & 15] +
              HEX_CHARS[(e >> 20) & 15] +
              HEX_CHARS[(e >> 16) & 15] +
              HEX_CHARS[(e >> 28) & 15] +
              HEX_CHARS[(e >> 24) & 15] +
              HEX_CHARS[(t >> 4) & 15] +
              HEX_CHARS[15 & t] +
              HEX_CHARS[(t >> 12) & 15] +
              HEX_CHARS[(t >> 8) & 15] +
              HEX_CHARS[(t >> 20) & 15] +
              HEX_CHARS[(t >> 16) & 15] +
              HEX_CHARS[(t >> 28) & 15] +
              HEX_CHARS[(t >> 24) & 15] +
              HEX_CHARS[(o >> 4) & 15] +
              HEX_CHARS[15 & o] +
              HEX_CHARS[(o >> 12) & 15] +
              HEX_CHARS[(o >> 8) & 15] +
              HEX_CHARS[(o >> 20) & 15] +
              HEX_CHARS[(o >> 16) & 15] +
              HEX_CHARS[(o >> 28) & 15] +
              HEX_CHARS[(o >> 24) & 15] +
              HEX_CHARS[(i >> 4) & 15] +
              HEX_CHARS[15 & i] +
              HEX_CHARS[(i >> 12) & 15] +
              HEX_CHARS[(i >> 8) & 15] +
              HEX_CHARS[(i >> 20) & 15] +
              HEX_CHARS[(i >> 16) & 15] +
              HEX_CHARS[(i >> 28) & 15] +
              HEX_CHARS[(i >> 24) & 15]
            );
          }),
          (Md5.prototype.toString = Md5.prototype.hex),
          (Md5.prototype.digest = function () {
            this.finalize();
            var e = this.h0,
              t = this.h1,
              o = this.h2,
              i = this.h3;
            return [
              255 & e,
              (e >> 8) & 255,
              (e >> 16) & 255,
              (e >> 24) & 255,
              255 & t,
              (t >> 8) & 255,
              (t >> 16) & 255,
              (t >> 24) & 255,
              255 & o,
              (o >> 8) & 255,
              (o >> 16) & 255,
              (o >> 24) & 255,
              255 & i,
              (i >> 8) & 255,
              (i >> 16) & 255,
              (i >> 24) & 255,
            ];
          }),
          (Md5.prototype.array = Md5.prototype.digest),
          (Md5.prototype.arrayBuffer = function () {
            this.finalize();
            var e = new ArrayBuffer(16),
              t = new Uint32Array(e);
            return (
              (t[0] = this.h0),
              (t[1] = this.h1),
              (t[2] = this.h2),
              (t[3] = this.h3),
              e
            );
          }),
          (Md5.prototype.buffer = Md5.prototype.arrayBuffer),
          (Md5.prototype.base64 = function () {
            for (var e, t, o, i = "", r = this.array(), s = 0; s < 15; )
              (e = r[s++]),
                (t = r[s++]),
                (o = r[s++]),
                (i +=
                  BASE64_ENCODE_CHAR[e >>> 2] +
                  BASE64_ENCODE_CHAR[63 & ((e << 4) | (t >>> 4))] +
                  BASE64_ENCODE_CHAR[63 & ((t << 2) | (o >>> 6))] +
                  BASE64_ENCODE_CHAR[63 & o]);
            return (
              (e = r[s]),
              (i +=
                BASE64_ENCODE_CHAR[e >>> 2] +
                BASE64_ENCODE_CHAR[(e << 4) & 63] +
                "==")
            );
          });
        var exports = createMethod();
        COMMON_JS
          ? (module.exports = exports)
          : ((root.md5 = exports),
            AMD &&
              ((__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return exports;
              }.call(exports, __webpack_require__, exports, module)),
              void 0 === __WEBPACK_AMD_DEFINE_RESULT__ ||
                (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)));
      })();
    },
    function (e, t) {
      (function (t) {
        e.exports = t;
      }.call(this, {}));
    },
    function (e, t, o) {
      "use strict";
      (function (t) {
        const { promisify: i } = o(4),
          r = o(5),
          s = o(6),
          n = o(0),
          a = o(7),
          c = i(n.access),
          h = i(s.execFile),
          u = r.join(t, "xdg-open");
        e.exports = async (e, o) => {
          if ("string" != typeof e) throw new TypeError("Expected a `target`");
          let i;
          o = { wait: !1, background: !1, ...o };
          let r = [];
          const l = [],
            f = {};
          if (
            (Array.isArray(o.app) && ((r = o.app.slice(1)), (o.app = o.app[0])),
            "darwin" === process.platform)
          )
            (i = "open"),
              o.wait && l.push("--wait-apps"),
              o.background && l.push("--background"),
              o.app && l.push("-a", o.app);
          else if ("win32" === process.platform || a) {
            if (
              ((i = "cmd" + (a ? ".exe" : "")),
              l.push("/c", "start", '""', "/b"),
              (e = e.replace(/&/g, "^&")),
              o.wait && l.push("/wait"),
              o.app)
            ) {
              if (a && o.app.startsWith("/mnt/")) {
                const e = await (async (e) => {
                  const { stdout: t } = await h("wslpath", ["-w", e]);
                  return t.trim();
                })(o.app);
                o.app = e;
              }
              l.push(o.app);
            }
            r.length > 0 && l.push(...r);
          } else {
            if (o.app) i = o.app;
            else {
              const e = "/" === t;
              let o = !1;
              try {
                await c(u, n.constants.X_OK), (o = !0);
              } catch (e) {}
              i =
                process.versions.electron ||
                "android" === process.platform ||
                e ||
                !o
                  ? "xdg-open"
                  : u;
            }
            r.length > 0 && l.push(...r),
              o.wait || ((f.stdio = "ignore"), (f.detached = !0));
          }
          l.push(e),
            "darwin" === process.platform &&
              r.length > 0 &&
              l.push("--args", ...r);
          const p = s.spawn(i, l, f);
          return o.wait
            ? new Promise((e, t) => {
                p.once("error", t),
                  p.once("close", (o) => {
                    o > 0 ? t(new Error(`Exited with code ${o}`)) : e(p);
                  });
              })
            : (p.unref(), p);
        };
      }.call(this, "/"));
    },
    function (e, t) {
      e.exports = require("util");
    },
    function (e, t) {
      e.exports = require("path");
    },
    function (e, t) {
      e.exports = require("child_process");
    },
    function (e, t, o) {
      "use strict";
      const i = o(8),
        r = o(0),
        s = () => {
          if ("linux" !== process.platform) return !1;
          if (i.release().includes("Microsoft")) return !0;
          try {
            return r
              .readFileSync("/proc/version", "utf8")
              .includes("Microsoft");
          } catch (e) {
            return !1;
          }
        };
      Object({ NODE_ENV: "production" }).__IS_WSL_TEST__
        ? (e.exports = s)
        : (e.exports = s());
    },
    function (e, t) {
      e.exports = require("os");
    },
    function (e, t, o) {
      "use strict";
      o.r(t);
      var i = {
          APP: {
            NAME: "MonokaiPro-VSCode",
            THEMES: [
              "Monokai Pro",
              "Monokai Pro (Filter Octagon)",
              "Monokai Pro (Filter Ristretto)",
              "Monokai Pro (Filter Spectrum)",
              "Monokai Pro (Filter Machine)",
              "Monokai Classic",
            ],
            DESCRIPTION:
              "Monokai Pro theme and color scheme for Visual Studio Code",
            VERSION: "1.1.20",
            AUTHOR: "Monokai",
            CREATION_DATE: 2022,
            BUILD_DATE: "19-1-2022",
            DEBUG: !1,
            UUID: "fd330f6f-3f41-421d-9fe5-de742d0c54c0",
            SECONDS_TO_EXPIRE: 172800,
            SECONDS_TO_EXPIRE_FAST: 86400,
            SLOW_PERIOD: 604800,
          },
        },
        r = o(1),
        s = o.n(r);
      function n(e, t) {
        for (var o = 0; o < t.length; o++) {
          var i = t[o];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      var a = (function () {
        function e(t, o) {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.extensionContext = t),
            (this.vscode = o),
            (this.isFirstTime = !1),
            (this.globalState = this.extensionContext.globalState),
            this.load();
        }
        var t, o, r;
        return (
          (t = e),
          (o = [
            {
              key: "loadCurrentUserSettings",
              value: function () {
                var e = this.vscode.workspace.getConfiguration("workbench");
                (this.version = i.VERSION),
                  (this.colorTheme = e.colorTheme),
                  (this.iconTheme = e.iconTheme);
                var t = this.vscode.workspace.getConfiguration("monokaiPro");
                this.fileIconsMonochrome = t.get("fileIconsMonochrome", !1);
              },
            },
            {
              key: "get",
              value: function () {
                return {
                  fileIconsMonochrome: this.fileIconsMonochrome,
                  iconTheme: this.iconTheme,
                  colorTheme: this.colorTheme,
                };
              },
            },
            {
              key: "load",
              value: function () {
                return (
                  this.loadCurrentUserSettings(),
                  (this.firstTimeStamp = this.globalState.get(
                    "firstTimeStamp",
                    0
                  )),
                  (this.lastTimeStamp = this.globalState.get(
                    "lastTimeStamp",
                    0
                  )),
                  this.firstTimeStamp ||
                    ((this.isFirstTime = !0),
                    (this.firstTimeStamp = this.getCurrentTimeStamp()),
                    this.update("firstTimeStamp", this.firstTimeStamp)),
                  this.lastTimeStamp ||
                    ((this.lastTimeStamp = this.getCurrentTimeStamp()),
                    this.update("lastTimeStamp", this.lastTimeStamp)),
                  (this.thankYouMessageShown = this.globalState.get(
                    "thankYouMessageShown",
                    !1
                  )),
                  (this.email = this.globalState.get("email", "")),
                  (this.licenseKey = this.globalState.get("licenseKey", "")),
                  this.get()
                );
              },
            },
            {
              key: "updateTheme",
              value: function (e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  o = ""
                    .concat(e)
                    .concat(
                      this.fileIconsMonochrome ? " Monochrome " : " ",
                      "Icons"
                    ),
                  i = this.vscode.workspace.getConfiguration("workbench"),
                  r = i.iconTheme;
                e !== t.colorTheme && i.update("colorTheme", e, !0),
                  (this.isValidIconTheme(r) || this.isFirstTime) &&
                    o !== t.iconTheme &&
                    i.update("iconTheme", o, !0),
                  this.load();
              },
            },
            {
              key: "update",
              value: function (e, t) {
                this.globalState.update(e, t);
              },
            },
            {
              key: "getCurrentTimeStamp",
              value: function () {
                return Math.floor(Date.now() / 1e3);
              },
            },
            {
              key: "isValidLicense",
              value: true,
            },
            {
              key: "isValidIconTheme",
              value: function () {
                var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : "";
                return i.APP.THEMES.includes(
                  e.replace(/ (Monochrome )?Icons$/, "")
                );
              },
            },
            {
              key: "hasValidLicense",
              get: function () {
                return this.isValidLicense(this.email, this.licenseKey);
              },
            },
            {
              key: "isExpired",
              get: function () {
                return this.isUsingForAWhile
                  ? this.getCurrentTimeStamp() - this.lastTimeStamp >
                      i.APP.SECONDS_TO_EXPIRE_FAST
                  : this.getCurrentTimeStamp() - this.lastTimeStamp >
                      i.APP.SECONDS_TO_EXPIRE;
              },
            },
            {
              key: "isUsingForAWhile",
              get: function () {
                return (
                  this.lastTimeStamp - this.firstTimeStamp > i.APP.SLOW_PERIOD
                );
              },
            },
            {
              key: "hasActiveMonokaiProColorTheme",
              get: function () {
                return i.APP.THEMES.includes(this.colorTheme);
              },
            },
            {
              key: "hasActiveMonokaiProIconTheme",
              get: function () {
                return this.isValidIconTheme(this.iconTheme);
              },
            },
          ]) && n(t.prototype, o),
          r && n(t, r),
          e
        );
      })();
      function c(e, t) {
        for (var o = 0; o < t.length; o++) {
          var i = t[o];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i);
        }
      }
      o.d(t, "default", function () {
        return u;
      });
      var h = o(3),
        u = (function () {
          function e(t) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this.vscode = t),
              (this.state = null);
          }
          var t, o, r;
          return (
            (t = e),
            (o = [
              {
                key: "activate",
                value: function (e) {
                  var t = this;
                  this.state = new a(e, this.vscode);
                  var o = {
                    "monokai_pro.enter_license": function () {
                      return t.enterLicense();
                    },
                    "monokai_pro.select_theme": function () {
                      return t.selectTheme();
                    },
                    "monokai_pro.activate_icons": function () {
                      return t.activateIcons();
                    },
                  };
                  Object.keys(o).forEach(function (i) {
                    var r = t.vscode.commands.registerCommand(i, o[i]);
                    e.subscriptions.push(r);
                  }),
                    this.vscode.workspace.onDidChangeConfiguration(function () {
                      var e = t.state.get(),
                        o = t.state.load();
                      t.state.hasActiveMonokaiProColorTheme &&
                        t.state.updateTheme(o.colorTheme, e);
                    }),
                    (this.state.hasActiveMonokaiProColorTheme ||
                      this.state.hasActiveMonokaiProIconTheme) &&
                      this.checkLicense();
                },
              },
              {
                key: "enterLicense",
                value: function () {
                  var e = this;
                  this.vscode.window
                    .showInputBox({
                      ignoreFocusOut: !0,
                      placeHolder: "your email address",
                      prompt:
                        "Please enter the email address you've used to purchase your license (or type 'reset' to reset your license).",
                      validateInput: function (e) {
                        return "reset" === e || /.+@.+\..+/i.test(e)
                          ? null
                          : "Please enter a valid email address.";
                      },
                    })
                    .then(function (t) {
                      var o = t.replace(/^\s+|\s+$/g, "");
                      "reset" === o
                        ? (e.state.update("email", void 0),
                          e.state.update("licenseKey", void 0),
                          e.showMessageLicenseReset())
                        : o &&
                          e.vscode.window
                            .showInputBox({
                              ignoreFocusOut: !0,
                              placeHolder: "your license key",
                              prompt:
                                "Please enter your Monokai Pro license key.",
                            })
                            .then(function (t) {
                              t &&
                                (e.state.update("email", o),
                                e.state.update("licenseKey", t),
                                e.state.isValidLicense(o, t) ||
                                e.state.isValidLicense(o.toLowerCase(), t)
                                  ? e.showMessageValidLicense()
                                  : e.showMessageInvalidLicense());
                            });
                    });
                },
              },
              {
                key: "selectTheme",
                value: function () {
                  var e = this,
                    t = [];
                  i.APP.THEMES.forEach(function (e) {
                    t.push({ label: e });
                  }),
                    this.vscode.window
                      .showQuickPick(t, { placeHolder: "Monokai Pro theme" })
                      .then(function (t) {
                        t && e.state.updateTheme(t.label);
                      });
                },
              },
              {
                key: "activateIcons",
                value: function () {
                  this.vscode.workspace
                    .getConfiguration("workbench")
                    .update("iconTheme", "Monokai Pro Icons", !0);
                },
              },
              {
                key: "checkLicense",
                value: function () {
                  var e = this;
                  this.state.hasValidLicense
                    ? this.state.thankYouMessageShown ||
                      this.showMessageValidLicense()
                    : this.state.isExpired &&
                      (this.state.isUsingForAWhile && Math.random() < 0.5
                        ? setTimeout(function () {
                            e.showMessageEvaluation();
                          }, 1e3 * Math.floor(60 * (120 * Math.random() + 5)))
                        : this.showMessageEvaluation(),
                      this.state.update(
                        "lastTimeStamp",
                        this.state.getCurrentTimeStamp()
                      ));
                },
              },
              { key: "deactivate", value: function () {} },
              {
                key: "showMessageLicenseReset",
                value: function () {
                  this.vscode.window.showInformationMessage(
                    "Monokai Pro license information is reset"
                  );
                },
              },
              {
                key: "showMessageValidLicense",
                value: function () {
                  this.vscode.window.showInformationMessage(
                    "Thanks for your purchase of Monokai Pro.",
                    { modal: !0 }
                  ),
                    this.state.update("thankYouMessageShown", !0);
                },
              },
              {
                key: "showMessageInvalidLicense",
                value: function () {
                  this.vscode.window.showErrorMessage(
                    "Invalid license. Please enter your email and license key exactly as in the email."
                  );
                },
              },
              {
                key: "showMessageEvaluation",
                value: function () {
                  var e = {
                      theme: this.state.colorTheme,
                      version: i.APP.VERSION,
                      name: i.APP.NAME,
                    },
                    t = Object.keys(e)
                      .map(function (t) {
                        return ""
                          .concat(t, "=")
                          .concat(encodeURIComponent(e[t]));
                      })
                      .join("&");
                  this.vscode.window
                    .showInformationMessage(
                      "Thank you for evaluating Monokai Pro. Please purchase a license for extended use.",
                      { modal: !0 },
                      "OK"
                    )
                    .then(function (e) {
                      if (e)
                        switch (e.toUpperCase()) {
                          case "OK":
                            h("https://monokai.pro?".concat(t));
                        }
                    });
                },
              },
              {
                key: "unspace",
                value: function (e) {
                  return e.replace(/ /g, "_");
                },
              },
            ]) && c(t.prototype, o),
            r && c(t, r),
            e
          );
        })();
    },
  ]);
});
