/*
 Highcharts JS v7.1.1 (2019-04-09)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(Q, K) {
    "object" === typeof module && module.exports ? (K["default"] = K, module.exports = Q.document ? K(Q) : K) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function() {
        return K(Q)
    }) : (Q.Highcharts && Q.Highcharts.error(16, !0), Q.Highcharts = K(Q))
})("undefined" !== typeof window ? window : this, function(Q) {
    function K(a, C, I, F) {
        a.hasOwnProperty(C) || (a[C] = F.apply(null, I))
    }
    var G = {};
    K(G, "parts/Globals.js", [], function() {
        var a = "undefined" === typeof Q ? "undefined" !== typeof window ? window : {} : Q,
            C = a.document,
            I = a.navigator && a.navigator.userAgent || "",
            F = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            k = /(edge|msie|trident)/i.test(I) && !a.opera,
            e = -1 !== I.indexOf("Firefox"),
            q = -1 !== I.indexOf("Chrome"),
            t = e && 4 > parseInt(I.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "7.1.1",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: t,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: k,
            isWebKit: -1 !== I.indexOf("AppleWebKit"),
            isFirefox: e,
            isChrome: q,
            isSafari: !q && -1 !== I.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(I),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: F,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: [],
            dateFormats: {}
        }
    });
    K(G, "parts/Utilities.js", [G["parts/Globals.js"]], function(a) {
        a.timers = [];
        var C = a.charts,
            I = a.doc,
            F = a.win;
        a.error = function(k, e, q) {
            var t = a.isNumber(k) ? "Highcharts error #" + k + ": www.highcharts.com/errors/" + k : k,
                u = function() {
                    if (e) throw Error(t);
                    F.console &&
                        console.log(t)
                };
            q ? a.fireEvent(q, "displayError", {
                code: k,
                message: t
            }, u) : u()
        };
        a.Fx = function(a, e, q) {
            this.options = e;
            this.elem = a;
            this.prop = q
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    e = this.paths[1],
                    q = [],
                    t = this.now,
                    u = a.length,
                    v;
                if (1 === t) q = this.toD;
                else if (u === e.length && 1 > t)
                    for (; u--;) v = parseFloat(a[u]), q[u] = isNaN(v) ? e[u] : t * parseFloat(e[u] - v) + v;
                else q = e;
                this.elem.attr("d", q, null, !0)
            },
            update: function() {
                var a = this.elem,
                    e = this.prop,
                    q = this.now,
                    t = this.options.step;
                if (this[e + "Setter"]) this[e + "Setter"]();
                else a.attr ? a.element && a.attr(e, q, null, !0) : a.style[e] = q + this.unit;
                t && t.call(a, q, this)
            },
            run: function(k, e, q) {
                var t = this,
                    u = t.options,
                    v = function(a) {
                        return v.stopped ? !1 : t.step(a)
                    },
                    p = F.requestAnimationFrame || function(a) {
                        setTimeout(a, 13)
                    },
                    h = function() {
                        for (var d = 0; d < a.timers.length; d++) a.timers[d]() || a.timers.splice(d--, 1);
                        a.timers.length && p(h)
                    };
                k !== e || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = k, this.end = e, this.unit = q, this.now = this.start, this.pos = 0, v.elem = this.elem, v.prop =
                    this.prop, v() && 1 === a.timers.push(v) && p(h)) : (delete u.curAnim[this.prop], u.complete && 0 === Object.keys(u.curAnim).length && u.complete.call(this.elem))
            },
            step: function(k) {
                var e = +new Date,
                    q, t = this.options,
                    u = this.elem,
                    v = t.complete,
                    p = t.duration,
                    h = t.curAnim;
                u.attr && !u.element ? k = !1 : k || e >= p + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), q = h[this.prop] = !0, a.objectEach(h, function(a) {
                    !0 !== a && (q = !1)
                }), q && v && v.call(u), k = !1) : (this.pos = t.easing((e - this.startTime) / p), this.now = this.start + (this.end - this.start) *
                    this.pos, this.update(), k = !0);
                return k
            },
            initPath: function(k, e, q) {
                function t(a) {
                    var b, g;
                    for (c = a.length; c--;) b = "M" === a[c] || "L" === a[c], g = /[a-zA-Z]/.test(a[c + 3]), b && g && a.splice(c + 1, 0, a[c + 1], a[c + 2], a[c + 1], a[c + 2])
                }

                function u(a, d) {
                    for (; a.length < g;) {
                        a[0] = d[g - a.length];
                        var n = a.slice(0, b);
                        [].splice.apply(a, [0, 0].concat(n));
                        w && (n = a.slice(a.length - b), [].splice.apply(a, [a.length, 0].concat(n)), c--)
                    }
                    a[0] = "M"
                }

                function v(a, c) {
                    for (var d = (g - a.length) / b; 0 < d && d--;) l = a.slice().splice(a.length / z - b, b * z), l[0] = c[g - b - d * b], m &&
                        (l[b - 6] = l[b - 2], l[b - 5] = l[b - 1]), [].splice.apply(a, [a.length / z, 0].concat(l)), w && d--
                }
                e = e || "";
                var p, h = k.startX,
                    d = k.endX,
                    m = -1 < e.indexOf("C"),
                    b = m ? 7 : 3,
                    g, l, c;
                e = e.split(" ");
                q = q.slice();
                var w = k.isArea,
                    z = w ? 2 : 1,
                    J;
                m && (t(e), t(q));
                if (h && d) {
                    for (c = 0; c < h.length; c++)
                        if (h[c] === d[0]) {
                            p = c;
                            break
                        } else if (h[0] === d[d.length - h.length + c]) {
                        p = c;
                        J = !0;
                        break
                    }
                    void 0 === p && (e = [])
                }
                e.length && a.isNumber(p) && (g = q.length + p * z * b, J ? (u(e, q), v(q, e)) : (u(q, e), v(e, q)));
                return [e, q]
            },
            fillSetter: function() {
                a.Fx.prototype.strokeSetter.apply(this, arguments)
            },
            strokeSetter: function() {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            }
        };
        a.merge = function() {
            var k, e = arguments,
                q, t = {},
                u = function(e, p) {
                    "object" !== typeof e && (e = {});
                    a.objectEach(p, function(h, d) {
                        !a.isObject(h, !0) || a.isClass(h) || a.isDOMElement(h) ? e[d] = p[d] : e[d] = u(e[d] || {}, h)
                    });
                    return e
                };
            !0 === e[0] && (t = e[1], e = Array.prototype.slice.call(e, 2));
            q = e.length;
            for (k = 0; k < q; k++) t = u(t, e[k]);
            return t
        };
        a.pInt = function(a, e) {
            return parseInt(a, e || 10)
        };
        a.isString = function(a) {
            return "string" ===
                typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(k, e) {
            return !!k && "object" === typeof k && (!e || !a.isArray(k))
        };
        a.isDOMElement = function(k) {
            return a.isObject(k) && "number" === typeof k.nodeType
        };
        a.isClass = function(k) {
            var e = k && k.constructor;
            return !(!a.isObject(k, !0) || a.isDOMElement(k) || !e || !e.name || "Object" === e.name)
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase =
            function(a, e) {
                for (var k = a.length; k--;)
                    if (a[k] === e) {
                        a.splice(k, 1);
                        break
                    }
            };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(k, e, q) {
            var t;
            a.isString(e) ? a.defined(q) ? k.setAttribute(e, q) : k && k.getAttribute && ((t = k.getAttribute(e)) || "class" !== e || (t = k.getAttribute(e + "Name"))) : a.defined(e) && a.isObject(e) && a.objectEach(e, function(a, e) {
                k.setAttribute(e, a)
            });
            return t
        };
        a.splat = function(k) {
            return a.isArray(k) ? k : [k]
        };
        a.syncTimeout = function(a, e, q) {
            if (e) return setTimeout(a, e, q);
            a.call(0, q)
        };
        a.clearTimeout =
            function(k) {
                a.defined(k) && clearTimeout(k)
            };
        a.extend = function(a, e) {
            var k;
            a || (a = {});
            for (k in e) a[k] = e[k];
            return a
        };
        a.pick = function() {
            var a = arguments,
                e, q, t = a.length;
            for (e = 0; e < t; e++)
                if (q = a[e], void 0 !== q && null !== q) return q
        };
        a.css = function(k, e) {
            a.isMS && !a.svg && e && void 0 !== e.opacity && (e.filter = "alpha(opacity\x3d" + 100 * e.opacity + ")");
            a.extend(k.style, e)
        };
        a.createElement = function(k, e, q, t, u) {
            k = I.createElement(k);
            var v = a.css;
            e && a.extend(k, e);
            u && v(k, {
                padding: 0,
                border: "none",
                margin: 0
            });
            q && v(k, q);
            t && t.appendChild(k);
            return k
        };
        a.extendClass = function(k, e) {
            var q = function() {};
            q.prototype = new k;
            a.extend(q.prototype, e);
            return q
        };
        a.pad = function(a, e, q) {
            return Array((e || 2) + 1 - String(a).replace("-", "").length).join(q || 0) + a
        };
        a.relativeLength = function(a, e, q) {
            return /%$/.test(a) ? e * parseFloat(a) / 100 + (q || 0) : parseFloat(a)
        };
        a.wrap = function(a, e, q) {
            var k = a[e];
            a[e] = function() {
                var a = Array.prototype.slice.call(arguments),
                    e = arguments,
                    p = this;
                p.proceed = function() {
                    k.apply(p, arguments.length ? arguments : e)
                };
                a.unshift(k);
                a = q.apply(this, a);
                p.proceed = null;
                return a
            }
        };
        a.datePropsToTimestamps = function(k) {
            a.objectEach(k, function(e, q) {
                a.isObject(e) && "function" === typeof e.getTime ? k[q] = e.getTime() : (a.isObject(e) || a.isArray(e)) && a.datePropsToTimestamps(e)
            })
        };
        a.formatSingle = function(k, e, q) {
            var t = /\.([0-9])/,
                u = a.defaultOptions.lang;
            /f$/.test(k) ? (q = (q = k.match(t)) ? q[1] : -1, null !== e && (e = a.numberFormat(e, q, u.decimalPoint, -1 < k.indexOf(",") ? u.thousandsSep : ""))) : e = (q || a.time).dateFormat(k, e);
            return e
        };
        a.format = function(k, e, q) {
            for (var t = "{", u = !1, v, p, h,
                    d, m = [], b; k;) {
                t = k.indexOf(t);
                if (-1 === t) break;
                v = k.slice(0, t);
                if (u) {
                    v = v.split(":");
                    p = v.shift().split(".");
                    d = p.length;
                    b = e;
                    for (h = 0; h < d; h++) b && (b = b[p[h]]);
                    v.length && (b = a.formatSingle(v.join(":"), b, q));
                    m.push(b)
                } else m.push(v);
                k = k.slice(t + 1);
                t = (u = !u) ? "}" : "{"
            }
            m.push(k);
            return m.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(k, e, q, t, u) {
            var v, p = k;
            q = a.pick(q, 1);
            v = k / q;
            e || (e = u ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 ===
                q ? e = e.filter(function(a) {
                    return 0 === a % 1
                }) : .1 >= q && (e = [1 / q])));
            for (t = 0; t < e.length && !(p = e[t], u && p * q >= k || !u && v <= (e[t] + (e[t + 1] || e[t])) / 2); t++);
            return p = a.correctFloat(p * q, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function(a, e) {
            var k = a.length,
                t, u;
            for (u = 0; u < k; u++) a[u].safeI = u;
            a.sort(function(a, p) {
                t = e(a, p);
                return 0 === t ? a.safeI - p.safeI : t
            });
            for (u = 0; u < k; u++) delete a[u].safeI
        };
        a.arrayMin = function(a) {
            for (var e = a.length, k = a[0]; e--;) a[e] < k && (k = a[e]);
            return k
        };
        a.arrayMax = function(a) {
            for (var e = a.length,
                    k = a[0]; e--;) a[e] > k && (k = a[e]);
            return k
        };
        a.destroyObjectProperties = function(k, e) {
            a.objectEach(k, function(a, t) {
                a && a !== e && a.destroy && a.destroy();
                delete k[t]
            })
        };
        a.discardElement = function(k) {
            var e = a.garbageBin;
            e || (e = a.createElement("div"));
            k && e.appendChild(k);
            e.innerHTML = ""
        };
        a.correctFloat = function(a, e) {
            return parseFloat(a.toPrecision(e || 14))
        };
        a.setAnimation = function(k, e) {
            e.renderer.globalAnimation = a.pick(k, e.options.chart.animation, !0)
        };
        a.animObject = function(k) {
            return a.isObject(k) ? a.merge(k) : {
                duration: k ?
                    500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(k, e, q, t) {
            k = +k || 0;
            e = +e;
            var u = a.defaultOptions.lang,
                v = (k.toString().split(".")[1] || "").split("e")[0].length,
                p, h, d = k.toString().split("e"); - 1 === e ? e = Math.min(v, 20) : a.isNumber(e) ? e && d[1] && 0 > d[1] && (p = e + +d[1], 0 <= p ? (d[0] = (+d[0]).toExponential(p).split("e")[0], e = p) : (d[0] = d[0].split(".")[0] || 0, k = 20 > e ? (d[0] * Math.pow(10, d[1])).toFixed(e) : 0, d[1] = 0)) : e = 2;
            h = (Math.abs(d[1] ?
                d[0] : k) + Math.pow(10, -Math.max(e, v) - 1)).toFixed(e);
            v = String(a.pInt(h));
            p = 3 < v.length ? v.length % 3 : 0;
            q = a.pick(q, u.decimalPoint);
            t = a.pick(t, u.thousandsSep);
            k = (0 > k ? "-" : "") + (p ? v.substr(0, p) + t : "");
            k += v.substr(p).replace(/(\d{3})(?=\d)/g, "$1" + t);
            e && (k += q + h.slice(-e));
            d[1] && 0 !== +k && (k += "e" + d[1]);
            return k
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(k, e, q) {
            if ("width" === e) return Math.max(0, Math.min(k.offsetWidth, k.scrollWidth, k.getBoundingClientRect && "none" === a.getStyle(k,
                "transform", !1) ? Math.floor(k.getBoundingClientRect().width) : Infinity) - a.getStyle(k, "padding-left") - a.getStyle(k, "padding-right"));
            if ("height" === e) return Math.max(0, Math.min(k.offsetHeight, k.scrollHeight) - a.getStyle(k, "padding-top") - a.getStyle(k, "padding-bottom"));
            F.getComputedStyle || a.error(27, !0);
            if (k = F.getComputedStyle(k, void 0)) k = k.getPropertyValue(e), a.pick(q, "opacity" !== e) && (k = a.pInt(k));
            return k
        };
        a.inArray = function(a, e, q) {
            return e.indexOf(a, q)
        };
        a.find = Array.prototype.find ? function(a, e) {
                return a.find(e)
            } :
            function(a, e) {
                var k, t = a.length;
                for (k = 0; k < t; k++)
                    if (e(a[k], k)) return a[k]
            };
        a.keys = Object.keys;
        a.offset = function(a) {
            var e = I.documentElement;
            a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (F.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                left: a.left + (F.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
            }
        };
        a.stop = function(k, e) {
            for (var q = a.timers.length; q--;) a.timers[q].elem !== k || e && e !== a.timers[q].prop || (a.timers[q].stopped = !0)
        };
        a.objectEach = function(a, e, q) {
            for (var k in a) a.hasOwnProperty(k) &&
                e.call(q || a[k], a[k], k, a)
        };
        a.objectEach({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function(k, e) {
            a[e] = function(a) {
                return Array.prototype[k].apply(a, [].slice.call(arguments, 1))
            }
        });
        a.addEvent = function(k, e, q, t) {
            var u, v = k.addEventListener || a.addEventListenerPolyfill;
            u = "function" === typeof k && k.prototype ? k.prototype.protoEvents = k.prototype.protoEvents || {} : k.hcEvents = k.hcEvents || {};
            a.Point && k instanceof a.Point && k.series && k.series.chart && (k.series.chart.runTrackerClick = !0);
            v && v.call(k,
                e, q, !1);
            u[e] || (u[e] = []);
            u[e].push(q);
            t && a.isNumber(t.order) && (q.order = t.order, u[e].sort(function(a, h) {
                return a.order - h.order
            }));
            return function() {
                a.removeEvent(k, e, q)
            }
        };
        a.removeEvent = function(k, e, q) {
            function t(h, d) {
                var m = k.removeEventListener || a.removeEventListenerPolyfill;
                m && m.call(k, h, d, !1)
            }

            function u(h) {
                var d, m;
                k.nodeName && (e ? (d = {}, d[e] = !0) : d = h, a.objectEach(d, function(a, d) {
                    if (h[d])
                        for (m = h[d].length; m--;) t(d, h[d][m])
                }))
            }
            var v, p;
            ["protoEvents", "hcEvents"].forEach(function(a) {
                var d = k[a];
                d && (e ? (v =
                    d[e] || [], q ? (p = v.indexOf(q), -1 < p && (v.splice(p, 1), d[e] = v), t(e, q)) : (u(d), d[e] = [])) : (u(d), k[a] = {}))
            })
        };
        a.fireEvent = function(k, e, q, t) {
            var u, v, p, h, d;
            q = q || {};
            I.createEvent && (k.dispatchEvent || k.fireEvent) ? (u = I.createEvent("Events"), u.initEvent(e, !0, !0), a.extend(u, q), k.dispatchEvent ? k.dispatchEvent(u) : k.fireEvent(e, u)) : ["protoEvents", "hcEvents"].forEach(function(m) {
                if (k[m])
                    for (v = k[m][e] || [], p = v.length, q.target || a.extend(q, {
                            preventDefault: function() {
                                q.defaultPrevented = !0
                            },
                            target: k,
                            type: e
                        }), h = 0; h < p; h++)(d = v[h]) &&
                        !1 === d.call(k, q) && q.preventDefault()
            });
            t && !q.defaultPrevented && t.call(k, q)
        };
        a.animate = function(k, e, q) {
            var t, u = "",
                v, p, h;
            a.isObject(q) || (h = arguments, q = {
                duration: h[2],
                easing: h[3],
                complete: h[4]
            });
            a.isNumber(q.duration) || (q.duration = 400);
            q.easing = "function" === typeof q.easing ? q.easing : Math[q.easing] || Math.easeInOutSine;
            q.curAnim = a.merge(e);
            a.objectEach(e, function(d, h) {
                a.stop(k, h);
                p = new a.Fx(k, q, h);
                v = null;
                "d" === h ? (p.paths = p.initPath(k, k.d, e.d), p.toD = e.d, t = 0, v = 1) : k.attr ? t = k.attr(h) : (t = parseFloat(a.getStyle(k,
                    h)) || 0, "opacity" !== h && (u = "px"));
                v || (v = d);
                v && v.match && v.match("px") && (v = v.replace(/px/g, ""));
                p.run(t, v, u)
            })
        };
        a.seriesType = function(k, e, q, t, u) {
            var v = a.getOptions(),
                p = a.seriesTypes;
            v.plotOptions[k] = a.merge(v.plotOptions[e], q);
            p[k] = a.extendClass(p[e] || function() {}, t);
            p[k].prototype.type = k;
            u && (p[k].prototype.pointClass = a.extendClass(a.Point, u));
            return p[k]
        };
        a.uniqueKey = function() {
            var a = Math.random().toString(36).substring(2, 9),
                e = 0;
            return function() {
                return "highcharts-" + a + "-" + e++
            }
        }();
        a.isFunction = function(a) {
            return "function" ===
                typeof a
        };
        F.jQuery && (F.jQuery.fn.highcharts = function() {
            var k = [].slice.call(arguments);
            if (this[0]) return k[0] ? (new(a[a.isString(k[0]) ? k.shift() : "Chart"])(this[0], k[0], k[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
        })
    });
    K(G, "parts/Color.js", [G["parts/Globals.js"]], function(a) {
        var C = a.isNumber,
            I = a.merge,
            F = a.pInt;
        a.Color = function(k) {
            if (!(this instanceof a.Color)) return new a.Color(k);
            this.init(k)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [F(a[1]), F(a[2]), F(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [F(a[1]), F(a[2]), F(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(k) {
                var e, q, t, u;
                if ((this.input = k = this.names[k && k.toLowerCase ? k.toLowerCase() : ""] || k) && k.stops) this.stops = k.stops.map(function(e) {
                    return new a.Color(e[1])
                });
                else if (k && k.charAt && "#" === k.charAt() && (e = k.length, k = parseInt(k.substr(1), 16), 7 === e ? q = [(k & 16711680) >>
                        16, (k & 65280) >> 8, k & 255, 1
                    ] : 4 === e && (q = [(k & 3840) >> 4 | (k & 3840) >> 8, (k & 240) >> 4 | k & 240, (k & 15) << 4 | k & 15, 1])), !q)
                    for (t = this.parsers.length; t-- && !q;) u = this.parsers[t], (e = u.regex.exec(k)) && (q = u.parse(e));
                this.rgba = q || []
            },
            get: function(a) {
                var e = this.input,
                    k = this.rgba,
                    t;
                this.stops ? (t = I(e), t.stops = [].concat(t.stops), this.stops.forEach(function(e, k) {
                    t.stops[k] = [t.stops[k][0], e.get(a)]
                })) : t = k && C(k[0]) ? "rgb" === a || !a && 1 === k[3] ? "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")" : "a" === a ? k[3] : "rgba(" + k.join(",") + ")" : e;
                return t
            },
            brighten: function(a) {
                var e,
                    k = this.rgba;
                if (this.stops) this.stops.forEach(function(e) {
                    e.brighten(a)
                });
                else if (C(a) && 0 !== a)
                    for (e = 0; 3 > e; e++) k[e] += F(255 * a), 0 > k[e] && (k[e] = 0), 255 < k[e] && (k[e] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function(a, e) {
                var k = this.rgba,
                    t = a.rgba;
                t.length && k && k.length ? (a = 1 !== t[3] || 1 !== k[3], e = (a ? "rgba(" : "rgb(") + Math.round(t[0] + (k[0] - t[0]) * (1 - e)) + "," + Math.round(t[1] + (k[1] - t[1]) * (1 - e)) + "," + Math.round(t[2] + (k[2] - t[2]) * (1 - e)) + (a ? "," + (t[3] + (k[3] - t[3]) * (1 - e)) : "") + ")") : e = a.input ||
                    "none";
                return e
            }
        };
        a.color = function(k) {
            return new a.Color(k)
        }
    });
    K(G, "parts/SvgRenderer.js", [G["parts/Globals.js"]], function(a) {
        var C, I, F = a.addEvent,
            k = a.animate,
            e = a.attr,
            q = a.charts,
            t = a.color,
            u = a.css,
            v = a.createElement,
            p = a.defined,
            h = a.deg2rad,
            d = a.destroyObjectProperties,
            m = a.doc,
            b = a.extend,
            g = a.erase,
            l = a.hasTouch,
            c = a.isArray,
            w = a.isFirefox,
            z = a.isMS,
            J = a.isObject,
            D = a.isString,
            A = a.isWebKit,
            n = a.merge,
            x = a.noop,
            B = a.objectEach,
            E = a.pick,
            H = a.pInt,
            f = a.removeEvent,
            r = a.splat,
            N = a.stop,
            M = a.svg,
            L = a.SVG_NS,
            P = a.symbolSizes,
            O = a.win;
        C = a.SVGElement = function() {
            return this
        };
        b(C.prototype, {
            opacity: 1,
            SVG_NS: L,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function(y, f) {
                this.element = "span" === f ? v(f) : m.createElementNS(this.SVG_NS, f);
                this.renderer = y;
                a.fireEvent(this, "afterInit")
            },
            animate: function(y, f, b) {
                var c = a.animObject(E(f, this.renderer.globalAnimation, !0));
                E(m.hidden, m.msHidden, m.webkitHidden, !1) && (c.duration = 0);
                0 !== c.duration ? (b && (c.complete = b), k(this, y, c)) : (this.attr(y, null, b), a.objectEach(y, function(a, y) {
                    c.step && c.step.call(this, a, {
                        prop: y,
                        pos: 1
                    })
                }, this));
                return this
            },
            complexColor: function(y, f, b) {
                var r = this.renderer,
                    d, g, l, h, S, m, L, w, x, e, z, M = [],
                    N;
                a.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    y.radialGradient ? g = "radialGradient" : y.linearGradient && (g = "linearGradient");
                    g && (l = y[g], S = r.gradients, L = y.stops, e = b.radialReference, c(l) && (y[g] = l = {
                            x1: l[0],
                            y1: l[1],
                            x2: l[2],
                            y2: l[3],
                            gradientUnits: "userSpaceOnUse"
                        }),
                        "radialGradient" === g && e && !p(l.gradientUnits) && (h = l, l = n(l, r.getRadialAttr(e, h), {
                            gradientUnits: "userSpaceOnUse"
                        })), B(l, function(a, y) {
                            "id" !== y && M.push(y, a)
                        }), B(L, function(a) {
                            M.push(a)
                        }), M = M.join(","), S[M] ? z = S[M].attr("id") : (l.id = z = a.uniqueKey(), S[M] = m = r.createElement(g).attr(l).add(r.defs), m.radAttr = h, m.stops = [], L.forEach(function(y) {
                            0 === y[1].indexOf("rgba") ? (d = a.color(y[1]), w = d.get("rgb"), x = d.get("a")) : (w = y[1], x = 1);
                            y = r.createElement("stop").attr({
                                offset: y[0],
                                "stop-color": w,
                                "stop-opacity": x
                            }).add(m);
                            m.stops.push(y)
                        })), N = "url(" + r.url + "#" + z + ")", b.setAttribute(f, N), b.gradient = M, y.toString = function() {
                            return N
                        })
                })
            },
            applyTextOutline: function(y) {
                var f = this.element,
                    b, c, r; - 1 !== y.indexOf("contrast") && (y = y.replace(/contrast/g, this.renderer.getContrast(f.style.fill)));
                y = y.split(" ");
                b = y[y.length - 1];
                (c = y[0]) && "none" !== c && a.svg && (this.fakeTS = !0, y = [].slice.call(f.getElementsByTagName("tspan")), this.ySetter = this.xSetter, c = c.replace(/(^[\d\.]+)(.*?)$/g, function(a, y, f) {
                        return 2 * y + f
                    }), this.removeTextOutline(y),
                    r = f.firstChild, y.forEach(function(a, y) {
                        0 === y && (a.setAttribute("x", f.getAttribute("x")), y = f.getAttribute("y"), a.setAttribute("y", y || 0), null === y && f.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        e(a, {
                            "class": "highcharts-text-outline",
                            fill: b,
                            stroke: b,
                            "stroke-width": c,
                            "stroke-linejoin": "round"
                        });
                        f.insertBefore(a, r)
                    }))
            },
            removeTextOutline: function(a) {
                for (var y = a.length, f; y--;) f = a[y], "highcharts-text-outline" === f.getAttribute("class") && g(a, this.element.removeChild(f))
            },
            symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
            attr: function(y, f, b, c) {
                var r, d = this.element,
                    g, l = this,
                    n, h, m = this.symbolCustomAttribs;
                "string" === typeof y && void 0 !== f && (r = y, y = {}, y[r] = f);
                "string" === typeof y ? l = (this[y + "Getter"] || this._defaultGetter).call(this, y, d) : (B(y, function(f, b) {
                    n = !1;
                    c || N(this, b);
                    this.symbolName && -1 !== a.inArray(b, m) && (g || (this.symbolAttr(y), g = !0), n = !0);
                    !this.rotation || "x" !== b && "y" !== b || (this.doTransform = !0);
                    n || (h = this[b + "Setter"] || this._defaultSetter, h.call(this, f, b, d), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b) &&
                        this.updateShadows(b, f, h))
                }, this), this.afterSetters());
                b && b.call(this);
                return l
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function(a, f, b) {
                for (var y = this.shadows, c = y.length; c--;) b.call(y[c], "height" === a ? Math.max(f - (y[c].cutHeight || 0), 0) : "d" === a ? this.d : f, a, y[c])
            },
            addClass: function(a, f) {
                var y = this.attr("class") || "";
                f || (a = (a || "").split(/ /g).reduce(function(a, f) {
                    -1 === y.indexOf(f) && a.push(f);
                    return a
                }, y ? [y] : []).join(" "));
                a !== y && this.attr("class",
                    a);
                return this
            },
            hasClass: function(a) {
                return -1 !== (this.attr("class") || "").split(" ").indexOf(a)
            },
            removeClass: function(a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function(a) {
                var y = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(f) {
                    y[f] = E(a[f], y[f])
                });
                y.attr({
                    d: y.renderer.symbols[y.symbolName](y.x, y.y, y.width, y.height, y)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, f) {
                var y;
                f = f || a.strokeWidth || 0;
                y = Math.round(f) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + y;
                a.y = Math.floor(a.y || this.y || 0) + y;
                a.width = Math.floor((a.width || this.width || 0) - 2 * y);
                a.height = Math.floor((a.height || this.height || 0) - 2 * y);
                p(a.strokeWidth) && (a.strokeWidth = f);
                return a
            },
            css: function(a) {
                var y = this.styles,
                    f = {},
                    c = this.element,
                    r, d = "",
                    g, l = !y,
                    n = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                y && B(a, function(a, b) {
                    a !== y[b] && (f[b] = a, l = !0)
                });
                l && (y && (a = b(y, f)), a && (null === a.width ||
                    "auto" === a.width ? delete this.textWidth : "text" === c.nodeName.toLowerCase() && a.width && (r = this.textWidth = H(a.width))), this.styles = a, r && !M && this.renderer.forExport && delete a.width, c.namespaceURI === this.SVG_NS ? (g = function(a, y) {
                    return "-" + y.toLowerCase()
                }, B(a, function(a, y) {
                    -1 === n.indexOf(y) && (d += y.replace(/([A-Z])/g, g) + ":" + a + ";")
                }), d && e(c, "style", d)) : u(c, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            getStyle: function(a) {
                return O.getComputedStyle(this.element ||
                    this, "").getPropertyValue(a)
            },
            strokeWidth: function() {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width"),
                    f;
                a.indexOf("px") === a.length - 2 ? a = H(a) : (f = m.createElementNS(L, "rect"), e(f, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(f), a = f.getBBox().width, f.parentNode.removeChild(f));
                return a
            },
            on: function(a, f) {
                var y = this,
                    b = y.element;
                l && "click" === a ? (b.ontouchstart = function(a) {
                        y.touchEventFired = Date.now();
                        a.preventDefault();
                        f.call(b, a)
                    }, b.onclick =
                    function(a) {
                        (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (y.touchEventFired || 0)) && f.call(b, a)
                    }) : b["on" + a] = f;
                return this
            },
            setRadialReference: function(a) {
                var y = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                y && y.radAttr && y.animate(this.renderer.getRadialAttr(a, y.radAttr));
                return this
            },
            translate: function(a, f) {
                return this.attr({
                    translateX: a,
                    translateY: f
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a =
                    this.translateX || 0,
                    f = this.translateY || 0,
                    b = this.scaleX,
                    c = this.scaleY,
                    r = this.inverted,
                    d = this.rotation,
                    g = this.matrix,
                    l = this.element;
                r && (a += this.width, f += this.height);
                a = ["translate(" + a + "," + f + ")"];
                p(g) && a.push("matrix(" + g.join(",") + ")");
                r ? a.push("rotate(90) scale(-1,1)") : d && a.push("rotate(" + d + " " + E(this.rotationOriginX, l.getAttribute("x"), 0) + " " + E(this.rotationOriginY, l.getAttribute("y") || 0) + ")");
                (p(b) || p(c)) && a.push("scale(" + E(b, 1) + " " + E(c, 1) + ")");
                a.length && l.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a =
                    this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, f, b) {
                var y, c, r, d, l = {};
                c = this.renderer;
                r = c.alignedObjects;
                var n, h;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = f, !b || D(b)) this.alignTo = y = b || "renderer", g(r, this), r.push(this), b = null
                } else a = this.alignOptions, f = this.alignByTranslate, y = this.alignTo;
                b = E(b, c[y], c);
                y = a.align;
                c = a.verticalAlign;
                r = (b.x || 0) + (a.x || 0);
                d = (b.y || 0) + (a.y || 0);
                "right" === y ? n = 1 : "center" === y && (n = 2);
                n && (r += (b.width - (a.width || 0)) / n);
                l[f ? "translateX" : "x"] = Math.round(r);
                "bottom" === c ? h = 1 : "middle" === c && (h = 2);
                h && (d += (b.height - (a.height || 0)) / h);
                l[f ? "translateY" : "y"] = Math.round(d);
                this[this.placed ? "animate" : "attr"](l);
                this.placed = !0;
                this.alignAttr = l;
                return this
            },
            getBBox: function(a, f) {
                var y, c = this.renderer,
                    r, d = this.element,
                    l = this.styles,
                    g, n = this.textStr,
                    m, L = c.cache,
                    w = c.cacheKeys,
                    x = d.namespaceURI === this.SVG_NS,
                    B;
                f = E(f, this.rotation);
                r = f * h;
                g = c.styledMode ? d && C.prototype.getStyle.call(d, "font-size") : l && l.fontSize;
                p(n) && (B = n.toString(), -1 === B.indexOf("\x3c") && (B = B.replace(/[0-9]/g,
                    "0")), B += ["", f || 0, g, this.textWidth, l && l.textOverflow].join());
                B && !a && (y = L[B]);
                if (!y) {
                    if (x || c.forExport) {
                        try {
                            (m = this.fakeTS && function(a) {
                                [].forEach.call(d.querySelectorAll(".highcharts-text-outline"), function(y) {
                                    y.style.display = a
                                })
                            }) && m("none"), y = d.getBBox ? b({}, d.getBBox()) : {
                                width: d.offsetWidth,
                                height: d.offsetHeight
                            }, m && m("")
                        } catch (Z) {}
                        if (!y || 0 > y.width) y = {
                            width: 0,
                            height: 0
                        }
                    } else y = this.htmlGetBBox();
                    c.isSVG && (a = y.width, c = y.height, x && (y.height = c = {
                            "11px,17": 14,
                            "13px,20": 16
                        }[l && l.fontSize + "," + Math.round(c)] ||
                        c), f && (y.width = Math.abs(c * Math.sin(r)) + Math.abs(a * Math.cos(r)), y.height = Math.abs(c * Math.cos(r)) + Math.abs(a * Math.sin(r))));
                    if (B && 0 < y.height) {
                        for (; 250 < w.length;) delete L[w.shift()];
                        L[B] || w.push(B);
                        L[B] = y
                    }
                }
                return y
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var y = this;
                y.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        y.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var y = this.renderer,
                    f = this.element,
                    b;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && y.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) b = this.zIndexSetter();
                b || (a ? a.element : y.box).appendChild(f);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var y = a.parentNode;
                y && y.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    f = a.element || {},
                    b = a.renderer,
                    c = b.isSVG && "SPAN" === f.nodeName && a.parentGroup,
                    r = f.ownerSVGElement,
                    d = a.clipPath;
                f.onclick = f.onmouseout = f.onmouseover = f.onmousemove =
                    f.point = null;
                N(a);
                d && r && ([].forEach.call(r.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                    -1 < a.getAttribute("clip-path").indexOf(d.element.id) && a.removeAttribute("clip-path")
                }), a.clipPath = d.destroy());
                if (a.stops) {
                    for (r = 0; r < a.stops.length; r++) a.stops[r] = a.stops[r].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(f);
                for (b.styledMode || a.destroyShadows(); c && c.div && 0 === c.div.childNodes.length;) f = c.parentGroup, a.safeRemoveChild(c.div), delete c.div, c = f;
                a.alignTo && g(b.alignedObjects, a);
                B(a, function(f, y) {
                    delete a[y]
                });
                return null
            },
            shadow: function(a, f, b) {
                var y = [],
                    c, r, d = this.element,
                    l, g, n, h;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    g = E(a.width, 3);
                    n = (a.opacity || .15) / g;
                    h = this.parentInverted ? "(-1,-1)" : "(" + E(a.offsetX, 1) + ", " + E(a.offsetY, 1) + ")";
                    for (c = 1; c <= g; c++) r = d.cloneNode(0), l = 2 * g + 1 - 2 * c, e(r, {
                        stroke: a.color || "#000000",
                        "stroke-opacity": n * c,
                        "stroke-width": l,
                        transform: "translate" + h,
                        fill: "none"
                    }), r.setAttribute("class", (r.getAttribute("class") || "") + " highcharts-shadow"), b && (e(r, "height", Math.max(e(r, "height") -
                        l, 0)), r.cutHeight = l), f ? f.element.appendChild(r) : d.parentNode && d.parentNode.insertBefore(r, d), y.push(r);
                    this.shadows = y
                }
                return this
            },
            destroyShadows: function() {
                (this.shadows || []).forEach(function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = E(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, f, b) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[f] !== a && (b.setAttribute(f, a), this[f] = a)
            },
            dashstyleSetter: function(a) {
                var f, y = this["stroke-width"];
                "inherit" === y && (y = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (f = a.length; f--;) a[f] =
                        H(a[f]) * y;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                var f = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                f[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", f[a]))
            },
            opacitySetter: function(a, f, b) {
                this[f] = a;
                b.setAttribute(f, a)
            },
            titleSetter: function(a) {
                var f = this.element.getElementsByTagName("title")[0];
                f || (f = m.createElementNS(this.SVG_NS, "title"), this.element.appendChild(f));
                f.firstChild && f.removeChild(f.firstChild);
                f.appendChild(m.createTextNode(String(E(a),
                    "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            setTextPath: function(f, b) {
                var y = this.element,
                    c = {
                        textAnchor: "text-anchor"
                    },
                    r, d = !1,
                    l, g = this.textPathWrapper,
                    h = !g;
                b = n(!0, {
                    enabled: !0,
                    attributes: {
                        dy: -5,
                        startOffset: "50%",
                        textAnchor: "middle"
                    }
                }, b);
                r = b.attributes;
                if (f && b && b.enabled) {
                    this.options && this.options.padding && (r.dx = -this.options.padding);
                    g || (this.textPathWrapper =
                        g = this.renderer.createElement("textPath"), d = !0);
                    l = g.element;
                    (b = f.element.getAttribute("id")) || f.element.setAttribute("id", b = a.uniqueKey());
                    if (h)
                        for (f = y.getElementsByTagName("tspan"); f.length;) f[0].setAttribute("y", 0), l.appendChild(f[0]);
                    d && g.add({
                        element: this.text ? this.text.element : y
                    });
                    l.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + b);
                    p(r.dy) && (l.parentNode.setAttribute("dy", r.dy), delete r.dy);
                    p(r.dx) && (l.parentNode.setAttribute("dx", r.dx), delete r.dx);
                    a.objectEach(r,
                        function(a, f) {
                            l.setAttribute(c[f] || f, a)
                        });
                    y.removeAttribute("transform");
                    this.removeTextOutline.call(g, [].slice.call(y.getElementsByTagName("tspan")));
                    this.applyTextOutline = this.updateTransform = x
                } else g && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(y, f));
                return this
            },
            destroyTextPath: function(a, f) {
                var y;
                f.element.setAttribute("id", "");
                for (y = this.textPathWrapper.element.childNodes; y.length;) a.firstChild.appendChild(y[0]);
                a.firstChild.removeChild(this.textPathWrapper.element);
                delete f.textPathWrapper
            },
            fillSetter: function(a, f, b) {
                "string" === typeof a ? b.setAttribute(f, a) : a && this.complexColor(a, f, b)
            },
            visibilitySetter: function(a, f, b) {
                "inherit" === a ? b.removeAttribute(f) : this[f] !== a && b.setAttribute(f, a);
                this[f] = a
            },
            zIndexSetter: function(a, f) {
                var b = this.renderer,
                    y = this.parentGroup,
                    c = (y || b).element || b.box,
                    r, d = this.element,
                    l, g, b = c === b.box;
                r = this.added;
                var n;
                p(a) ? (d.setAttribute("data-z-index", a), a = +a, this[f] === a && (r = !1)) : p(this[f]) && d.removeAttribute("data-z-index");
                this[f] = a;
                if (r) {
                    (a =
                        this.zIndex) && y && (y.handleZ = !0);
                    f = c.childNodes;
                    for (n = f.length - 1; 0 <= n && !l; n--)
                        if (y = f[n], r = y.getAttribute("data-z-index"), g = !p(r), y !== d)
                            if (0 > a && g && !b && !n) c.insertBefore(d, f[n]), l = !0;
                            else if (H(r) <= a || g && (!p(a) || 0 <= a)) c.insertBefore(d, f[n + 1] || null), l = !0;
                    l || (c.insertBefore(d, f[b ? 3 : 0] || null), l = !0)
                }
                return l
            },
            _defaultSetter: function(a, f, b) {
                b.setAttribute(f, a)
            }
        });
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter =
            C.prototype.rotationOriginXSetter = C.prototype.rotationOriginYSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = C.prototype.matrixSetter = function(a, f) {
                this[f] = a;
                this.doTransform = !0
            };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function(a, f, b) {
            this[f] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", b), b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === f && 0 === a && this.hasStroke && (b.removeAttribute("stroke"),
                this.hasStroke = !1)
        };
        I = a.SVGRenderer = function() {
            this.init.apply(this, arguments)
        };
        b(I.prototype, {
            Element: C,
            SVG_NS: L,
            init: function(a, f, b, c, r, d, l) {
                var y;
                y = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                });
                l || y.css(this.getStyle(c));
                c = y.element;
                a.appendChild(c);
                e(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && e(c, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = c;
                this.boxWrapper = y;
                this.alignedObjects = [];
                this.url = (w || A) && m.getElementsByTagName("base").length ? O.location.href.split("#")[0].replace(/<[^>]*>/g,
                    "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(m.createTextNode("Created with Highcharts 7.1.1"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = d;
                this.forExport = r;
                this.styledMode = l;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(f, b, !1);
                var g;
                w && a.getBoundingClientRect && (f = function() {
                    u(a, {
                        left: 0,
                        top: 0
                    });
                    g = a.getBoundingClientRect();
                    u(a, {
                        left: Math.ceil(g.left) - g.left + "px",
                        top: Math.ceil(g.top) - g.top +
                            "px"
                    })
                }, f(), this.unSubPixelFix = F(O, "resize", f))
            },
            definition: function(a) {
                function f(a, c) {
                    var y;
                    r(a).forEach(function(a) {
                        var r = b.createElement(a.tagName),
                            d = {};
                        B(a, function(a, f) {
                            "tagName" !== f && "children" !== f && "textContent" !== f && (d[f] = a)
                        });
                        r.attr(d);
                        r.add(c || b.defs);
                        a.textContent && r.element.appendChild(m.createTextNode(a.textContent));
                        f(a.children || [], r);
                        y = r
                    });
                    return y
                }
                var b = this;
                return f(a)
            },
            getStyle: function(a) {
                return this.style = b({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                d(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var f = new this.Element;
                f.init(this, a);
                return f
            },
            draw: x,
            getRadialAttr: function(a, f) {
                return {
                    cx: a[0] - a[2] /
                        2 + f.cx * a[2],
                    cy: a[1] - a[2] / 2 + f.cy * a[2],
                    r: f.r * a[2]
                }
            },
            truncate: function(a, f, b, c, r, d, l) {
                var y = this,
                    g = a.rotation,
                    n, h = c ? 1 : 0,
                    L = (b || c).length,
                    w = L,
                    x = [],
                    B = function(a) {
                        f.firstChild && f.removeChild(f.firstChild);
                        a && f.appendChild(m.createTextNode(a))
                    },
                    p = function(d, g) {
                        g = g || d;
                        if (void 0 === x[g])
                            if (f.getSubStringLength) try {
                                x[g] = r + f.getSubStringLength(0, c ? g + 1 : g)
                            } catch (aa) {} else y.getSpanWidth && (B(l(b || c, d)), x[g] = r + y.getSpanWidth(a, f));
                        return x[g]
                    },
                    e, z;
                a.rotation = 0;
                e = p(f.textContent.length);
                if (z = r + e > d) {
                    for (; h <= L;) w = Math.ceil((h +
                        L) / 2), c && (n = l(c, w)), e = p(w, n && n.length - 1), h === L ? h = L + 1 : e > d ? L = w - 1 : h = w;
                    0 === L ? B("") : b && L === b.length - 1 || B(n || l(b || c, w))
                }
                c && c.splice(0, w);
                a.actualWidth = e;
                a.rotation = g;
                return z
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function(a) {
                var f = a.element,
                    b = this,
                    c = b.forExport,
                    r = E(a.textStr, "").toString(),
                    y = -1 !== r.indexOf("\x3c"),
                    d = f.childNodes,
                    g, l = e(f, "x"),
                    n = a.styles,
                    h = a.textWidth,
                    w = n && n.lineHeight,
                    x = n && n.textOutline,
                    p = n && "ellipsis" === n.textOverflow,
                    z =
                    n && "nowrap" === n.whiteSpace,
                    N = n && n.fontSize,
                    P, A, D = d.length,
                    n = h && !a.added && this.box,
                    k = function(a) {
                        var c;
                        b.styledMode || (c = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : N || b.style.fontSize || 12);
                        return w ? H(w) : b.fontMetrics(c, a.getAttribute("style") ? a : f).h
                    },
                    J = function(a, f) {
                        B(b.escapes, function(b, c) {
                            f && -1 !== f.indexOf(b) || (a = a.toString().replace(new RegExp(b, "g"), c))
                        });
                        return a
                    },
                    O = function(a, f) {
                        var b;
                        b = a.indexOf("\x3c");
                        a = a.substring(b, a.indexOf("\x3e") - b);
                        b = a.indexOf(f + "\x3d");
                        if (-1 !== b && (b = b + f.length +
                                1, f = a.charAt(b), '"' === f || "'" === f)) return a = a.substring(b + 1), a.substring(0, a.indexOf(f))
                    };
                P = [r, p, z, w, x, N, h].join();
                if (P !== a.textCache) {
                    for (a.textCache = P; D--;) f.removeChild(d[D]);
                    y || x || p || h || -1 !== r.indexOf(" ") ? (n && n.appendChild(f), y ? (r = b.styledMode ? r.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e') : r.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e'),
                            r = r.replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g)) : r = [r], r = r.filter(function(a) {
                            return "" !== a
                        }), r.forEach(function(r, y) {
                            var d, n = 0,
                                w = 0;
                            r = r.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                            d = r.split("|||");
                            d.forEach(function(r) {
                                if ("" !== r || 1 === d.length) {
                                    var x = {},
                                        B = m.createElementNS(b.SVG_NS, "tspan"),
                                        P, E;
                                    (P = O(r, "class")) && e(B, "class", P);
                                    if (P = O(r, "style")) P = P.replace(/(;| |^)color([ :])/, "$1fill$2"), e(B, "style",
                                        P);
                                    (E = O(r, "href")) && !c && (e(B, "onclick", 'location.href\x3d"' + E + '"'), e(B, "class", "highcharts-anchor"), b.styledMode || u(B, {
                                        cursor: "pointer"
                                    }));
                                    r = J(r.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== r) {
                                        B.appendChild(m.createTextNode(r));
                                        n ? x.dx = 0 : y && null !== l && (x.x = l);
                                        e(B, x);
                                        f.appendChild(B);
                                        !n && A && (!M && c && u(B, {
                                            display: "block"
                                        }), e(B, "dy", k(B)));
                                        if (h) {
                                            var D = r.replace(/([^\^])-/g, "$1- ").split(" "),
                                                x = !z && (1 < d.length || y || 1 < D.length);
                                            E = 0;
                                            var H = k(B);
                                            if (p) g = b.truncate(a, B, r, void 0, 0, Math.max(0, h - parseInt(N ||
                                                12, 10)), function(a, f) {
                                                return a.substring(0, f) + "\u2026"
                                            });
                                            else if (x)
                                                for (; D.length;) D.length && !z && 0 < E && (B = m.createElementNS(L, "tspan"), e(B, {
                                                    dy: H,
                                                    x: l
                                                }), P && e(B, "style", P), B.appendChild(m.createTextNode(D.join(" ").replace(/- /g, "-"))), f.appendChild(B)), b.truncate(a, B, null, D, 0 === E ? w : 0, h, function(a, f) {
                                                    return D.slice(0, f).join(" ").replace(/- /g, "-")
                                                }), w = a.actualWidth, E++
                                        }
                                        n++
                                    }
                                }
                            });
                            A = A || f.childNodes.length
                        }), p && g && a.attr("title", J(a.textStr, ["\x26lt;", "\x26gt;"])), n && n.removeChild(f), x && a.applyTextOutline &&
                        a.applyTextOutline(x)) : f.appendChild(m.createTextNode(J(r)))
                }
            },
            getContrast: function(a) {
                a = t(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, f, r, c, d, g, l, h, L, w) {
                var y = this.label(a, f, r, L, null, null, w, null, "button"),
                    m = 0,
                    B = this.styledMode;
                y.attr(n({
                    padding: 8,
                    r: 2
                }, d));
                if (!B) {
                    var x, p, e, M;
                    d = n({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {
                            color: "#333333",
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, d);
                    x = d.style;
                    delete d.style;
                    g = n(d, {
                        fill: "#e6e6e6"
                    }, g);
                    p = g.style;
                    delete g.style;
                    l = n(d, {
                        fill: "#e6ebf5",
                        style: {
                            color: "#000000",
                            fontWeight: "bold"
                        }
                    }, l);
                    e = l.style;
                    delete l.style;
                    h = n(d, {
                        style: {
                            color: "#cccccc"
                        }
                    }, h);
                    M = h.style;
                    delete h.style
                }
                F(y.element, z ? "mouseover" : "mouseenter", function() {
                    3 !== m && y.setState(1)
                });
                F(y.element, z ? "mouseout" : "mouseleave", function() {
                    3 !== m && y.setState(m)
                });
                y.setState = function(a) {
                    1 !== a && (y.state = m = a);
                    y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a ||
                        0
                    ]);
                    B || y.attr([d, g, l, h][a || 0]).css([x, p, e, M][a || 0])
                };
                B || y.attr(d).css(b({
                    cursor: "default"
                }, x));
                return y.on("click", function(a) {
                    3 !== m && c.call(y, a)
                })
            },
            crispLine: function(a, f) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - f % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + f % 2 / 2);
                return a
            },
            path: function(a) {
                var f = this.styledMode ? {} : {
                    fill: "none"
                };
                c(a) ? f.d = a : J(a) && b(f, a);
                return this.createElement("path").attr(f)
            },
            circle: function(a, f, b) {
                a = J(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: f,
                    r: b
                };
                f = this.createElement("circle");
                f.xSetter =
                    f.ySetter = function(a, f, b) {
                        b.setAttribute("c" + f, a)
                    };
                return f.attr(a)
            },
            arc: function(a, f, b, r, c, d) {
                J(a) ? (r = a, f = r.y, b = r.r, a = r.x) : r = {
                    innerR: r,
                    start: c,
                    end: d
                };
                a = this.symbol("arc", a, f, b, b, r);
                a.r = b;
                return a
            },
            rect: function(a, f, b, r, c, d) {
                c = J(a) ? a.r : c;
                var g = this.createElement("rect");
                a = J(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: f,
                    width: Math.max(b, 0),
                    height: Math.max(r, 0)
                };
                this.styledMode || (void 0 !== d && (a.strokeWidth = d, a = g.crisp(a)), a.fill = "none");
                c && (a.r = c);
                g.rSetter = function(a, f, b) {
                    g.r = a;
                    e(b, {
                        rx: a,
                        ry: a
                    })
                };
                g.rGetter = function() {
                    return g.r
                };
                return g.attr(a)
            },
            setSize: function(a, f, b) {
                var r = this.alignedObjects,
                    c = r.length;
                this.width = a;
                this.height = f;
                for (this.boxWrapper.animate({
                        width: a,
                        height: f
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: E(b, !0) ? void 0 : 0
                    }); c--;) r[c].align()
            },
            g: function(a) {
                var f = this.createElement("g");
                return a ? f.attr({
                    "class": "highcharts-" + a
                }) : f
            },
            image: function(a, f, r, c, d, g) {
                var l = {
                        preserveAspectRatio: "none"
                    },
                    n, y = function(a, f) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink",
                            "href", f) : a.setAttribute("hc-svg-href", f)
                    },
                    h = function(f) {
                        y(n.element, a);
                        g.call(n, f)
                    };
                1 < arguments.length && b(l, {
                    x: f,
                    y: r,
                    width: c,
                    height: d
                });
                n = this.createElement("image").attr(l);
                g ? (y(n.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), l = new O.Image, F(l, "load", h), l.src = a, l.complete && h({})) : y(n.element, a);
                return n
            },
            symbol: function(a, f, r, c, d, g) {
                var l = this,
                    n, y = /^url\((.*?)\)$/,
                    h = y.test(a),
                    L = !h && (this.symbols[a] ? a : "circle"),
                    w = L && this.symbols[L],
                    B = p(f) && w && w.call(this.symbols,
                        Math.round(f), Math.round(r), c, d, g),
                    x, e;
                w ? (n = this.path(B), l.styledMode || n.attr("fill", "none"), b(n, {
                    symbolName: L,
                    x: f,
                    y: r,
                    width: c,
                    height: d
                }), g && b(n, g)) : h && (x = a.match(y)[1], n = this.image(x), n.imgwidth = E(P[x] && P[x].width, g && g.width), n.imgheight = E(P[x] && P[x].height, g && g.height), e = function() {
                    n.attr({
                        width: n.width,
                        height: n.height
                    })
                }, ["width", "height"].forEach(function(a) {
                    n[a + "Setter"] = function(a, f) {
                        var b = {},
                            r = this["img" + f],
                            c = "width" === f ? "translateX" : "translateY";
                        this[f] = a;
                        p(r) && (g && "within" === g.backgroundSize &&
                            this.width && this.height && (r = Math.round(r * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(f, r), this.alignByTranslate || (b[c] = ((this[f] || 0) - r) / 2, this.attr(b)))
                    }
                }), p(f) && n.attr({
                    x: f,
                    y: r
                }), n.isImg = !0, p(n.imgwidth) && p(n.imgheight) ? e() : (n.attr({
                    width: 0,
                    height: 0
                }), v("img", {
                    onload: function() {
                        var a = q[l.chartIndex];
                        0 === this.width && (u(this, {
                            position: "absolute",
                            top: "-999em"
                        }), m.body.appendChild(this));
                        P[x] = {
                            width: this.width,
                            height: this.height
                        };
                        n.imgwidth =
                            this.width;
                        n.imgheight = this.height;
                        n.element && e();
                        this.parentNode && this.parentNode.removeChild(this);
                        l.imgCount--;
                        if (!l.imgCount && a && a.onload) a.onload()
                    },
                    src: x
                }), this.imgCount++));
                return n
            },
            symbols: {
                circle: function(a, f, b, r) {
                    return this.arc(a + b / 2, f + r / 2, b / 2, r / 2, {
                        start: .5 * Math.PI,
                        end: 2.5 * Math.PI,
                        open: !1
                    })
                },
                square: function(a, f, b, r) {
                    return ["M", a, f, "L", a + b, f, a + b, f + r, a, f + r, "Z"]
                },
                triangle: function(a, f, b, r) {
                    return ["M", a + b / 2, f, "L", a + b, f + r, a, f + r, "Z"]
                },
                "triangle-down": function(a, f, b, r) {
                    return ["M", a, f, "L", a + b,
                        f, a + b / 2, f + r, "Z"
                    ]
                },
                diamond: function(a, f, b, r) {
                    return ["M", a + b / 2, f, "L", a + b, f + r / 2, a + b / 2, f + r, a, f + r / 2, "Z"]
                },
                arc: function(a, f, b, r, c) {
                    var d = c.start,
                        g = c.r || b,
                        l = c.r || r || b,
                        n = c.end - .001;
                    b = c.innerR;
                    r = E(c.open, .001 > Math.abs(c.end - c.start - 2 * Math.PI));
                    var y = Math.cos(d),
                        h = Math.sin(d),
                        L = Math.cos(n),
                        n = Math.sin(n),
                        d = .001 > c.end - d - Math.PI ? 0 : 1;
                    c = ["M", a + g * y, f + l * h, "A", g, l, 0, d, E(c.clockwise, 1), a + g * L, f + l * n];
                    p(b) && c.push(r ? "M" : "L", a + b * L, f + b * n, "A", b, b, 0, d, 0, a + b * y, f + b * h);
                    c.push(r ? "" : "Z");
                    return c
                },
                callout: function(a, f, b, r, c) {
                    var d =
                        Math.min(c && c.r || 0, b, r),
                        g = d + 6,
                        l = c && c.anchorX;
                    c = c && c.anchorY;
                    var n;
                    n = ["M", a + d, f, "L", a + b - d, f, "C", a + b, f, a + b, f, a + b, f + d, "L", a + b, f + r - d, "C", a + b, f + r, a + b, f + r, a + b - d, f + r, "L", a + d, f + r, "C", a, f + r, a, f + r, a, f + r - d, "L", a, f + d, "C", a, f, a, f, a + d, f];
                    l && l > b ? c > f + g && c < f + r - g ? n.splice(13, 3, "L", a + b, c - 6, a + b + 6, c, a + b, c + 6, a + b, f + r - d) : n.splice(13, 3, "L", a + b, r / 2, l, c, a + b, r / 2, a + b, f + r - d) : l && 0 > l ? c > f + g && c < f + r - g ? n.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, f + d) : n.splice(33, 3, "L", a, r / 2, l, c, a, r / 2, a, f + d) : c && c > r && l > a + g && l < a + b - g ? n.splice(23, 3, "L", l + 6, f +
                        r, l, f + r + 6, l - 6, f + r, a + d, f + r) : c && 0 > c && l > a + g && l < a + b - g && n.splice(3, 3, "L", l - 6, f, l, f - 6, l + 6, f, b - d, f);
                    return n
                }
            },
            clipRect: function(f, b, r, c) {
                var d = a.uniqueKey() + "-",
                    g = this.createElement("clipPath").attr({
                        id: d
                    }).add(this.defs);
                f = this.rect(f, b, r, c, 0).add(g);
                f.id = d;
                f.clipPath = g;
                f.count = 0;
                return f
            },
            text: function(a, f, b, r) {
                var c = {};
                if (r && (this.allowHTML || !this.forExport)) return this.html(a, f, b);
                c.x = Math.round(f || 0);
                b && (c.y = Math.round(b));
                p(a) && (c.text = a);
                a = this.createElement("text").attr(c);
                r || (a.xSetter = function(a,
                    f, b) {
                    var r = b.getElementsByTagName("tspan"),
                        c, d = b.getAttribute(f),
                        g;
                    for (g = 0; g < r.length; g++) c = r[g], c.getAttribute(f) === d && c.setAttribute(f, a);
                    b.setAttribute(f, a)
                });
                return a
            },
            fontMetrics: function(a, f) {
                a = !this.styledMode && /px/.test(a) || !O.getComputedStyle ? a || f && f.style && f.style.fontSize || this.style && this.style.fontSize : f && C.prototype.getStyle.call(f, "font-size");
                a = /px/.test(a) ? H(a) : 12;
                f = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: f,
                    b: Math.round(.8 * f),
                    f: a
                }
            },
            rotCorr: function(a, f, b) {
                var r = a;
                f && b && (r = Math.max(r *
                    Math.cos(f * h), 4));
                return {
                    x: -a / 3 * Math.sin(f * h),
                    y: r
                }
            },
            label: function(r, c, d, g, l, h, L, w, m) {
                var y = this,
                    B = y.styledMode,
                    x = y.g("button" !== m && "label"),
                    e = x.text = y.text("", 0, 0, L).attr({
                        zIndex: 1
                    }),
                    z, M, P = 0,
                    N = 3,
                    E = 0,
                    A, D, H, k, J, O = {},
                    v, t, q = /^url\((.*?)\)$/.test(g),
                    u = B || q,
                    S = function() {
                        return B ? z.strokeWidth() % 2 / 2 : (v ? parseInt(v, 10) : 0) % 2 / 2
                    },
                    U, R, T;
                m && x.addClass("highcharts-" + m);
                U = function() {
                    var a = e.element.style,
                        f = {};
                    M = (void 0 === A || void 0 === D || J) && p(e.textStr) && e.getBBox();
                    x.width = (A || M.width || 0) + 2 * N + E;
                    x.height = (D || M.height ||
                        0) + 2 * N;
                    t = N + Math.min(y.fontMetrics(a && a.fontSize, e).b, M ? M.height : Infinity);
                    u && (z || (x.box = z = y.symbols[g] || q ? y.symbol(g) : y.rect(), z.addClass(("button" === m ? "" : "highcharts-label-box") + (m ? " highcharts-" + m + "-box" : "")), z.add(x), a = S(), f.x = a, f.y = (w ? -t : 0) + a), f.width = Math.round(x.width), f.height = Math.round(x.height), z.attr(b(f, O)), O = {})
                };
                R = function() {
                    var a = E + N,
                        f;
                    f = w ? 0 : t;
                    p(A) && M && ("center" === J || "right" === J) && (a += {
                        center: .5,
                        right: 1
                    }[J] * (A - M.width));
                    if (a !== e.x || f !== e.y) e.attr("x", a), e.hasBoxWidthChanged && (M = e.getBBox(!0),
                        U()), void 0 !== f && e.attr("y", f);
                    e.x = a;
                    e.y = f
                };
                T = function(a, f) {
                    z ? z.attr(a, f) : O[a] = f
                };
                x.onAdd = function() {
                    e.add(x);
                    x.attr({
                        text: r || 0 === r ? r : "",
                        x: c,
                        y: d
                    });
                    z && p(l) && x.attr({
                        anchorX: l,
                        anchorY: h
                    })
                };
                x.widthSetter = function(f) {
                    A = a.isNumber(f) ? f : null
                };
                x.heightSetter = function(a) {
                    D = a
                };
                x["text-alignSetter"] = function(a) {
                    J = a
                };
                x.paddingSetter = function(a) {
                    p(a) && a !== N && (N = x.padding = a, R())
                };
                x.paddingLeftSetter = function(a) {
                    p(a) && a !== E && (E = a, R())
                };
                x.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== P && (P = a, M && x.attr({
                        x: H
                    }))
                };
                x.textSetter = function(a) {
                    void 0 !== a && e.attr({
                        text: a
                    });
                    U();
                    R()
                };
                x["stroke-widthSetter"] = function(a, f) {
                    a && (u = !0);
                    v = this["stroke-width"] = a;
                    T(f, a)
                };
                B ? x.rSetter = function(a, f) {
                    T(f, a)
                } : x.strokeSetter = x.fillSetter = x.rSetter = function(a, f) {
                    "r" !== f && ("fill" === f && a && (u = !0), x[f] = a);
                    T(f, a)
                };
                x.anchorXSetter = function(a, f) {
                    l = x.anchorX = a;
                    T(f, Math.round(a) - S() - H)
                };
                x.anchorYSetter = function(a, f) {
                    h = x.anchorY = a;
                    T(f, a - k)
                };
                x.xSetter = function(a) {
                    x.x = a;
                    P && (a -= P * ((A || M.width) + 2 * N), x["forceAnimate:x"] = !0);
                    H = Math.round(a);
                    x.attr("translateX",
                        H)
                };
                x.ySetter = function(a) {
                    k = x.y = Math.round(a);
                    x.attr("translateY", k)
                };
                var F = x.css;
                L = {
                    css: function(a) {
                        if (a) {
                            var f = {};
                            a = n(a);
                            x.textProps.forEach(function(b) {
                                void 0 !== a[b] && (f[b] = a[b], delete a[b])
                            });
                            e.css(f);
                            "width" in f && U();
                            "fontSize" in f && (U(), R())
                        }
                        return F.call(x, a)
                    },
                    getBBox: function() {
                        return {
                            width: M.width + 2 * N,
                            height: M.height + 2 * N,
                            x: M.x - N,
                            y: M.y - N
                        }
                    },
                    destroy: function() {
                        f(x.element, "mouseenter");
                        f(x.element, "mouseleave");
                        e && (e = e.destroy());
                        z && (z = z.destroy());
                        C.prototype.destroy.call(x);
                        x = y = U = R = T = null
                    }
                };
                B || (L.shadow = function(a) {
                    a && (U(), z && z.shadow(a));
                    return x
                });
                return b(x, L)
            }
        });
        a.Renderer = I
    });
    K(G, "parts/Html.js", [G["parts/Globals.js"]], function(a) {
        var C = a.attr,
            I = a.createElement,
            F = a.css,
            k = a.defined,
            e = a.extend,
            q = a.isFirefox,
            t = a.isMS,
            u = a.isWebKit,
            v = a.pick,
            p = a.pInt,
            h = a.SVGElement,
            d = a.SVGRenderer,
            m = a.win;
        e(h.prototype, {
            htmlCss: function(a) {
                var b = "SPAN" === this.element.tagName && a && "width" in a,
                    d = v(b && a.width, void 0),
                    c;
                b && (delete a.width, this.textWidth = d, c = !0);
                a && "ellipsis" === a.textOverflow && (a.whiteSpace =
                    "nowrap", a.overflow = "hidden");
                this.styles = e(this.styles, a);
                F(this.element, a);
                c && this.htmlUpdateTransform();
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        d = this.element,
                        l = this.translateX || 0,
                        c = this.translateY || 0,
                        h = this.x || 0,
                        m = this.y || 0,
                        e = this.textAlign || "left",
                        D = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[e],
                        A = this.styles,
                        n = A && A.whiteSpace;
                    F(d, {
                        marginLeft: l,
                        marginTop: c
                    });
                    !a.styledMode && this.shadows && this.shadows.forEach(function(a) {
                        F(a, {
                            marginLeft: l + 1,
                            marginTop: c + 1
                        })
                    });
                    this.inverted && [].forEach.call(d.childNodes, function(b) {
                        a.invertChild(b, d)
                    });
                    if ("SPAN" === d.tagName) {
                        var A = this.rotation,
                            x = this.textWidth && p(this.textWidth),
                            B = [A, e, d.innerHTML, this.textWidth, this.textAlign].join(),
                            E;
                        (E = x !== this.oldTextWidth) && !(E = x > this.oldTextWidth) && ((E = this.textPxLength) || (F(d, {
                            width: "",
                            whiteSpace: n || "nowrap"
                        }), E = d.offsetWidth), E = E > x);
                        E && (/[ \-]/.test(d.textContent || d.innerText) ||
                            "ellipsis" === d.style.textOverflow) ? (F(d, {
                            width: x + "px",
                            display: "block",
                            whiteSpace: n || "normal"
                        }), this.oldTextWidth = x, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        B !== this.cTT && (n = a.fontMetrics(d.style.fontSize, d).b, !k(A) || A === (this.oldRotation || 0) && e === this.oldAlign || this.setSpanRotation(A, D, n), this.getSpanCorrection(!k(A) && this.textPxLength || d.offsetWidth, n, D, A, e));
                        F(d, {
                            left: h + (this.xCorr || 0) + "px",
                            top: m + (this.yCorr || 0) + "px"
                        });
                        this.cTT = B;
                        this.oldRotation = A;
                        this.oldAlign = e
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, d, l) {
                var b = {},
                    g = this.renderer.getTransformKey();
                b[g] = b.transform = "rotate(" + a + "deg)";
                b[g + (q ? "Origin" : "-origin")] = b.transformOrigin = 100 * d + "% " + l + "px";
                F(this.element, b)
            },
            getSpanCorrection: function(a, d, l) {
                this.xCorr = -a * l;
                this.yCorr = -d
            }
        });
        e(d.prototype, {
            getTransformKey: function() {
                return t && !/Edge/.test(m.navigator.userAgent) ? "-ms-transform" : u ? "-webkit-transform" : q ? "MozTransform" : m.opera ? "-o-transform" : ""
            },
            html: function(b, d, l) {
                var c = this.createElement("span"),
                    g = c.element,
                    m = c.renderer,
                    p = m.isSVG,
                    D = function(a, b) {
                        ["opacity", "visibility"].forEach(function(c) {
                            a[c + "Setter"] = function(d, l, f) {
                                var r = a.div ? a.div.style : b;
                                h.prototype[c + "Setter"].call(this, d, l, f);
                                r && (r[l] = d)
                            }
                        });
                        a.addedSetters = !0
                    },
                    A = a.charts[m.chartIndex],
                    A = A && A.styledMode;
                c.textSetter = function(a) {
                    a !== g.innerHTML && (delete this.bBox, delete this.oldTextWidth);
                    this.textStr = a;
                    g.innerHTML = v(a, "");
                    c.doTransform = !0
                };
                p && D(c, c.element.style);
                c.xSetter = c.ySetter = c.alignSetter = c.rotationSetter = function(a, b) {
                    "align" === b && (b =
                        "textAlign");
                    c[b] = a;
                    c.doTransform = !0
                };
                c.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                c.attr({
                    text: b,
                    x: Math.round(d),
                    y: Math.round(l)
                }).css({
                    position: "absolute"
                });
                A || c.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                g.style.whiteSpace = "nowrap";
                c.css = c.htmlCss;
                p && (c.add = function(a) {
                    var b, d = m.box.parentNode,
                        l = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) l.push(a), a = a.parentGroup;
                            l.reverse().forEach(function(a) {
                                function f(f, b) {
                                    a[b] =
                                        f;
                                    "translateX" === b ? r.left = f + "px" : r.top = f + "px";
                                    a.doTransform = !0
                                }
                                var r, g = C(a.element, "class");
                                g && (g = {
                                    className: g
                                });
                                b = a.div = a.div || I("div", g, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || d);
                                r = b.style;
                                e(a, {
                                    classSetter: function(a) {
                                        return function(f) {
                                            this.element.setAttribute("class", f);
                                            a.className = f
                                        }
                                    }(b),
                                    on: function() {
                                        l[0].div && c.on.apply({
                                            element: l[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: f,
                                    translateYSetter: f
                                });
                                a.addedSetters || D(a)
                            })
                        }
                    } else b = d;
                    b.appendChild(g);
                    c.added = !0;
                    c.alignOnAdd && c.htmlUpdateTransform();
                    return c
                });
                return c
            }
        })
    });
    K(G, "parts/Time.js", [G["parts/Globals.js"]], function(a) {
        var C = a.defined,
            I = a.extend,
            F = a.merge,
            k = a.pick,
            e = a.timeUnits,
            q = a.win;
        a.Time = function(a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function(a) {
                var e = k(a && a.useUTC, !0),
                    v = this;
                this.options = a = F(!0, this.options || {}, a);
                this.Date = a.Date || q.Date || Date;
                this.timezoneOffset = (this.useUTC = e) &&
                    a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(e && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function(a, h) {
                    var d = h.getTime(),
                        m = d - v.getTimezoneOffset(h);
                    h.setTime(m);
                    a = h["getUTC" + a]();
                    h.setTime(d);
                    return a
                }, this.set = function(a, h, d) {
                    var m;
                    if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === h.getTimezoneOffset() % 60) h["set" + a](d);
                    else m = v.getTimezoneOffset(h), m = h.getTime() - m, h.setTime(m), h["setUTC" + a](d), a = v.getTimezoneOffset(h),
                        m = h.getTime() + a, h.setTime(m)
                }) : e ? (this.get = function(a, h) {
                    return h["getUTC" + a]()
                }, this.set = function(a, h, d) {
                    return h["setUTC" + a](d)
                }) : (this.get = function(a, h) {
                    return h["get" + a]()
                }, this.set = function(a, h, d) {
                    return h["set" + a](d)
                })
            },
            makeTime: function(e, q, v, p, h, d) {
                var m, b, g;
                this.useUTC ? (m = this.Date.UTC.apply(0, arguments), b = this.getTimezoneOffset(m), m += b, g = this.getTimezoneOffset(m), b !== g ? m += g - b : b - 36E5 !== this.getTimezoneOffset(m - 36E5) || a.isSafari || (m -= 36E5)) : m = (new this.Date(e, q, k(v, 1), k(p, 0), k(h, 0), k(d, 0))).getTime();
                return m
            },
            timezoneOffsetFunction: function() {
                var e = this,
                    k = this.options,
                    v = q.moment;
                if (!this.useUTC) return function(a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (k.timezone) {
                    if (v) return function(a) {
                        return 6E4 * -v.tz(a, k.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && k.getTimezoneOffset ? function(a) {
                    return 6E4 * k.getTimezoneOffset(a)
                } : function() {
                    return 6E4 * (e.timezoneOffset || 0)
                }
            },
            dateFormat: function(e, k, v) {
                if (!a.defined(k) || isNaN(k)) return a.defaultOptions.lang.invalidDate || "";
                e = a.pick(e, "%Y-%m-%d %H:%M:%S");
                var p = this,
                    h = new this.Date(k),
                    d = this.get("Hours", h),
                    m = this.get("Day", h),
                    b = this.get("Date", h),
                    g = this.get("Month", h),
                    l = this.get("FullYear", h),
                    c = a.defaultOptions.lang,
                    w = c.weekdays,
                    z = c.shortWeekdays,
                    J = a.pad,
                    h = a.extend({
                        a: z ? z[m] : w[m].substr(0, 3),
                        A: w[m],
                        d: J(b),
                        e: J(b, 2, " "),
                        w: m,
                        b: c.shortMonths[g],
                        B: c.months[g],
                        m: J(g + 1),
                        o: g + 1,
                        y: l.toString().substr(2, 2),
                        Y: l,
                        H: J(d),
                        k: d,
                        I: J(d % 12 || 12),
                        l: d % 12 || 12,
                        M: J(p.get("Minutes", h)),
                        p: 12 > d ? "AM" : "PM",
                        P: 12 > d ? "am" : "pm",
                        S: J(h.getSeconds()),
                        L: J(Math.floor(k % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(h, function(a, b) {
                    for (; - 1 !== e.indexOf("%" + b);) e = e.replace("%" + b, "function" === typeof a ? a.call(p, k) : a)
                });
                return v ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
            },
            resolveDTLFormat: function(e) {
                return a.isObject(e, !0) ? e : (e = a.splat(e), {
                    main: e[0],
                    from: e[1],
                    to: e[2]
                })
            },
            getTimeTicks: function(a, q, v, p) {
                var h = this,
                    d = [],
                    m, b = {},
                    g;
                m = new h.Date(q);
                var l = a.unitRange,
                    c = a.count || 1,
                    w;
                p = k(p, 1);
                if (C(q)) {
                    h.set("Milliseconds", m, l >= e.second ? 0 : c * Math.floor(h.get("Milliseconds", m) / c));
                    l >= e.second && h.set("Seconds", m, l >=
                        e.minute ? 0 : c * Math.floor(h.get("Seconds", m) / c));
                    l >= e.minute && h.set("Minutes", m, l >= e.hour ? 0 : c * Math.floor(h.get("Minutes", m) / c));
                    l >= e.hour && h.set("Hours", m, l >= e.day ? 0 : c * Math.floor(h.get("Hours", m) / c));
                    l >= e.day && h.set("Date", m, l >= e.month ? 1 : Math.max(1, c * Math.floor(h.get("Date", m) / c)));
                    l >= e.month && (h.set("Month", m, l >= e.year ? 0 : c * Math.floor(h.get("Month", m) / c)), g = h.get("FullYear", m));
                    l >= e.year && h.set("FullYear", m, g - g % c);
                    l === e.week && (g = h.get("Day", m), h.set("Date", m, h.get("Date", m) - g + p + (g < p ? -7 : 0)));
                    g = h.get("FullYear",
                        m);
                    p = h.get("Month", m);
                    var z = h.get("Date", m),
                        J = h.get("Hours", m);
                    q = m.getTime();
                    h.variableTimezone && (w = v - q > 4 * e.month || h.getTimezoneOffset(q) !== h.getTimezoneOffset(v));
                    q = m.getTime();
                    for (m = 1; q < v;) d.push(q), q = l === e.year ? h.makeTime(g + m * c, 0) : l === e.month ? h.makeTime(g, p + m * c) : !w || l !== e.day && l !== e.week ? w && l === e.hour && 1 < c ? h.makeTime(g, p, z, J + m * c) : q + l * c : h.makeTime(g, p, z + m * c * (l === e.day ? 1 : 7)), m++;
                    d.push(q);
                    l <= e.hour && 1E4 > d.length && d.forEach(function(a) {
                        0 === a % 18E5 && "000000000" === h.dateFormat("%H%M%S%L", a) && (b[a] = "day")
                    })
                }
                d.info =
                    I(a, {
                        higherRanks: b,
                        totalRange: l * c
                    });
                return d
            }
        }
    });
    K(G, "parts/Options.js", [G["parts/Globals.js"]], function(a) {
        var C = a.color,
            I = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                backgroundColor: C("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://simpletechnologiesltd.com/",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "School Tool"
            }
        };
        a.setOptions = function(C) {
            a.defaultOptions = I(!0, a.defaultOptions, C);
            a.time.update(I(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(I(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function(C, k, e) {
            return a.time.dateFormat(C, k, e)
        }
    });
    K(G, "parts/Tick.js", [G["parts/Globals.js"]], function(a) {
        var C = a.correctFloat,
            I = a.defined,
            F = a.destroyObjectProperties,
            k = a.fireEvent,
            e = a.isNumber,
            q = a.merge,
            t = a.pick,
            u = a.deg2rad;
        a.Tick = function(a, e, h, d, m) {
            this.axis = a;
            this.pos = e;
            this.type = h || "";
            this.isNewLabel = this.isNew = !0;
            this.parameters = m || {};
            this.tickmarkOffset = this.parameters.tickmarkOffset;
            this.options = this.parameters.options;
            h || d || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var e = this,
                    p = e.axis,
                    h = p.options,
                    d = p.chart,
                    m = p.categories,
                    b = p.names,
                    g = e.pos,
                    l = t(e.options && e.options.labels, h.labels),
                    c = p.tickPositions,
                    w = g === c[0],
                    z = g === c[c.length - 1],
                    m = this.parameters.category || (m ? t(m[g], b[g], g) : g),
                    k = e.label,
                    c = c.info,
                    D, A, n, x;
                p.isDatetimeAxis && c && (A = d.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid && c.higherRanks[g] || c.unitName]), D = A.main);
                e.isFirst = w;
                e.isLast = z;
                e.formatCtx = {
                    axis: p,
                    chart: d,
                    isFirst: w,
                    isLast: z,
                    dateTimeLabelFormat: D,
                    tickPositionInfo: c,
                    value: p.isLog ? C(p.lin2log(m)) : m,
                    pos: g
                };
                h = p.labelFormatter.call(e.formatCtx, this.formatCtx);
                if (x = A && A.list) e.shortenLabel = function() {
                    for (n = 0; n < x.length; n++)
                        if (k.attr({
                                text: p.labelFormatter.call(a.extend(e.formatCtx, {
                                    dateTimeLabelFormat: x[n]
                                }))
                            }), k.getBBox().width < p.getSlotWidth(e) - 2 * t(l.padding, 5)) return;
                    k.attr({
                        text: ""
                    })
                };
                if (I(k)) k && k.textStr !== h && (!k.textWidth || l.style && l.style.width || k.styles.width || k.css({
                    width: null
                }), k.attr({
                    text: h
                }));
                else {
                    if (e.label = k = I(h) && l.enabled ? d.renderer.text(h, 0, 0, l.useHTML).add(p.labelGroup) : null) d.styledMode || k.css(q(l.style)), k.textPxLength = k.getBBox().width;
                    e.rotation = 0
                }
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var e = this.axis,
                    h = e.options.labels,
                    d = a.x,
                    m = e.chart.chartWidth,
                    b = e.chart.spacing,
                    g = t(e.labelLeft, Math.min(e.pos, b[3])),
                    b = t(e.labelRight, Math.max(e.isRadial ? 0 : e.pos + e.len, m - b[1])),
                    l = this.label,
                    c = this.rotation,
                    w = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[e.labelAlign || l.attr("align")],
                    z = l.getBBox().width,
                    k = e.getSlotWidth(this),
                    D = k,
                    A = 1,
                    n, x = {};
                if (c || "justify" !== t(h.overflow, "justify")) 0 > c && d - w * z < g ? n = Math.round(d / Math.cos(c * u) - g) : 0 < c && d + w * z > b && (n = Math.round((m - d) / Math.cos(c * u)));
                else if (m = d + (1 - w) * z, d - w * z < g ? D = a.x + D * (1 - w) - g : m > b && (D = b - a.x + D * w, A = -1), D = Math.min(k, D), D < k && "center" === e.labelAlign && (a.x += A * (k - D - w * (k - Math.min(z, D)))), z > D || e.autoRotation && (l.styles || {}).width) n = D;
                n && (this.shortenLabel ? this.shortenLabel() : (x.width =
                    Math.floor(n), (h.style || {}).textOverflow || (x.textOverflow = "ellipsis"), l.css(x)))
            },
            getPosition: function(e, p, h, d) {
                var m = this.axis,
                    b = m.chart,
                    g = d && b.oldChartHeight || b.chartHeight;
                e = {
                    x: e ? a.correctFloat(m.translate(p + h, null, null, d) + m.transB) : m.left + m.offset + (m.opposite ? (d && b.oldChartWidth || b.chartWidth) - m.right - m.left : 0),
                    y: e ? g - m.bottom + m.offset - (m.opposite ? m.height : 0) : a.correctFloat(g - m.translate(p + h, null, null, d) - m.transB)
                };
                k(this, "afterGetPosition", {
                    pos: e
                });
                return e
            },
            getLabelPosition: function(a, e, h, d,
                m, b, g, l) {
                var c = this.axis,
                    w = c.transA,
                    z = c.reversed,
                    p = c.staggerLines,
                    D = c.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    A = m.y,
                    n = d || c.reserveSpaceDefault ? 0 : -c.labelOffset * ("center" === c.labelAlign ? .5 : 1),
                    x = {};
                I(A) || (A = 0 === c.side ? h.rotation ? -8 : -h.getBBox().height : 2 === c.side ? D.y + 8 : Math.cos(h.rotation * u) * (D.y - h.getBBox(!1, 0).height / 2));
                a = a + m.x + n + D.x - (b && d ? b * w * (z ? -1 : 1) : 0);
                e = e + A - (b && !d ? b * w * (z ? 1 : -1) : 0);
                p && (h = g / (l || 1) % p, c.opposite && (h = p - h - 1), e += c.labelOffset / p * h);
                x.x = a;
                x.y = Math.round(e);
                k(this, "afterGetLabelPosition", {
                    pos: x,
                    tickmarkOffset: b,
                    index: g
                });
                return x
            },
            getMarkPath: function(a, e, h, d, m, b) {
                return b.crispLine(["M", a, e, "L", a + (m ? 0 : -h), e + (m ? h : 0)], d)
            },
            renderGridLine: function(a, e, h) {
                var d = this.axis,
                    m = d.options,
                    b = this.gridLine,
                    g = {},
                    l = this.pos,
                    c = this.type,
                    w = t(this.tickmarkOffset, d.tickmarkOffset),
                    z = d.chart.renderer,
                    p = c ? c + "Grid" : "grid",
                    k = m[p + "LineWidth"],
                    A = m[p + "LineColor"],
                    m = m[p + "LineDashStyle"];
                b || (d.chart.styledMode || (g.stroke = A, g["stroke-width"] = k, m && (g.dashstyle = m)), c || (g.zIndex = 1), a && (e = 0), this.gridLine = b = z.path().attr(g).addClass("highcharts-" +
                    (c ? c + "-" : "") + "grid-line").add(d.gridGroup));
                if (b && (h = d.getPlotLinePath(l + w, b.strokeWidth() * h, a, "pass"))) b[a || this.isNew ? "attr" : "animate"]({
                    d: h,
                    opacity: e
                })
            },
            renderMark: function(a, e, h) {
                var d = this.axis,
                    m = d.options,
                    b = d.chart.renderer,
                    g = this.type,
                    l = g ? g + "Tick" : "tick",
                    c = d.tickSize(l),
                    w = this.mark,
                    z = !w,
                    p = a.x;
                a = a.y;
                var k = t(m[l + "Width"], !g && d.isXAxis ? 1 : 0),
                    m = m[l + "Color"];
                c && (d.opposite && (c[0] = -c[0]), z && (this.mark = w = b.path().addClass("highcharts-" + (g ? g + "-" : "") + "tick").add(d.axisGroup), d.chart.styledMode || w.attr({
                    stroke: m,
                    "stroke-width": k
                })), w[z ? "attr" : "animate"]({
                    d: this.getMarkPath(p, a, c[0], w.strokeWidth() * h, d.horiz, b),
                    opacity: e
                }))
            },
            renderLabel: function(a, p, h, d) {
                var m = this.axis,
                    b = m.horiz,
                    g = m.options,
                    l = this.label,
                    c = g.labels,
                    w = c.step,
                    m = t(this.tickmarkOffset, m.tickmarkOffset),
                    z = !0,
                    k = a.x;
                a = a.y;
                l && e(k) && (l.xy = a = this.getLabelPosition(k, a, l, b, c, m, d, w), this.isFirst && !this.isLast && !t(g.showFirstLabel, 1) || this.isLast && !this.isFirst && !t(g.showLastLabel, 1) ? z = !1 : !b || c.step || c.rotation || p || 0 === h || this.handleOverflow(a), w && d % w &&
                    (z = !1), z && e(a.y) ? (a.opacity = h, l[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (l.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(e, p, h) {
                var d = this.axis,
                    m = d.horiz,
                    b = this.pos,
                    g = t(this.tickmarkOffset, d.tickmarkOffset),
                    b = this.getPosition(m, b, g, p),
                    g = b.x,
                    l = b.y,
                    d = m && g === d.pos + d.len || !m && l === d.pos ? -1 : 1;
                h = t(h, 1);
                this.isActive = !0;
                this.renderGridLine(p, h, d);
                this.renderMark(b, h, d);
                this.renderLabel(b, p, h, e);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function() {
                F(this, this.axis)
            }
        }
    });
    K(G, "parts/Axis.js", [G["parts/Globals.js"]], function(a) {
        var C = a.addEvent,
            I = a.animObject,
            F = a.arrayMax,
            k = a.arrayMin,
            e = a.color,
            q = a.correctFloat,
            t = a.defaultOptions,
            u = a.defined,
            v = a.deg2rad,
            p = a.destroyObjectProperties,
            h = a.extend,
            d = a.fireEvent,
            m = a.format,
            b = a.getMagnitude,
            g = a.isArray,
            l = a.isNumber,
            c = a.isString,
            w = a.merge,
            z = a.normalizeTickInterval,
            J = a.objectEach,
            D = a.pick,
            A = a.removeEvent,
            n = a.seriesTypes,
            x = a.splat,
            B = a.syncTimeout,
            E = a.Tick,
            H = function() {
                this.init.apply(this, arguments)
            };
        a.extend(H.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            },
            init: function(a, b) {
                var f = b.isX,
                    r = this;
                r.chart = a;
                r.horiz = a.inverted && !r.isZAxis ? !f : f;
                r.isXAxis = f;
                r.coll = r.coll || (f ? "xAxis" : "yAxis");
                d(this, "init", {
                    userOptions: b
                });
                r.opposite = b.opposite;
                r.side = b.side || (r.horiz ? r.opposite ? 0 : 2 : r.opposite ? 1 : 3);
                r.setOptions(b);
                var c = this.options,
                    l = c.type;
                r.labelFormatter = c.labels.formatter || r.defaultLabelFormatter;
                r.userOptions = b;
                r.minPixelPadding = 0;
                r.reversed = c.reversed;
                r.visible = !1 !== c.visible;
                r.zoomEnabled = !1 !== c.zoomEnabled;
                r.hasNames = "category" === l || !0 === c.categories;
                r.categories = c.categories || r.hasNames;
                r.names || (r.names = [], r.names.keys = {});
                r.plotLinesAndBandsGroups = {};
                r.isLog = "logarithmic" === l;
                r.isDatetimeAxis = "datetime" ===
                    l;
                r.positiveValuesOnly = r.isLog && !r.allowNegativeLog;
                r.isLinked = u(c.linkedTo);
                r.ticks = {};
                r.labelEdge = [];
                r.minorTicks = {};
                r.plotLinesAndBands = [];
                r.alternateBands = {};
                r.len = 0;
                r.minRange = r.userMinRange = c.minRange || c.maxZoom;
                r.range = c.range;
                r.offset = c.offset || 0;
                r.stacks = {};
                r.oldStacks = {};
                r.stacksTouched = 0;
                r.max = null;
                r.min = null;
                r.crosshair = D(c.crosshair, x(a.options.tooltip.crosshairs)[f ? 0 : 1], !1);
                b = r.options.events; - 1 === a.axes.indexOf(r) && (f ? a.axes.splice(a.xAxis.length, 0, r) : a.axes.push(r), a[r.coll].push(r));
                r.series = r.series || [];
                a.inverted && !r.isZAxis && f && void 0 === r.reversed && (r.reversed = !0);
                J(b, function(a, f) {
                    C(r, f, a)
                });
                r.lin2log = c.linearToLogConverter || r.lin2log;
                r.isLog && (r.val2lin = r.log2lin, r.lin2val = r.lin2log);
                d(this, "afterInit")
            },
            setOptions: function(a) {
                this.options = w(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], w(t[this.coll], a));
                d(this, "afterSetOptions", {
                    userOptions: a
                })
            },
            defaultLabelFormatter: function() {
                var f = this.axis,
                    b = this.value,
                    c = f.chart.time,
                    d = f.categories,
                    l = this.dateTimeLabelFormat,
                    g = t.lang,
                    n = g.numericSymbols,
                    g = g.numericSymbolMagnitude || 1E3,
                    e = n && n.length,
                    h, x = f.options.labels.format,
                    f = f.isLog ? Math.abs(b) : f.tickInterval;
                if (x) h = m(x, this, c);
                else if (d) h = b;
                else if (l) h = c.dateFormat(l, b);
                else if (e && 1E3 <= f)
                    for (; e-- && void 0 === h;) c = Math.pow(g, e + 1), f >= c && 0 === 10 * b % c && null !== n[e] && 0 !== b && (h = a.numberFormat(b / c, -1) + n[e]);
                void 0 === h && (h = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));
                return h
            },
            getSeriesExtremes: function() {
                var a = this,
                    b = a.chart,
                    c;
                d(this, "getSeriesExtremes", null, function() {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    a.series.forEach(function(f) {
                        if (f.visible || !b.options.chart.ignoreHiddenSeries) {
                            var r = f.options,
                                d = r.threshold,
                                g, n;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= d && (d = null);
                            if (a.isXAxis) r = f.xData, r.length && (c = f.getXExtremes(r), g = c.min, n = c.max,
                                l(g) || g instanceof Date || (r = r.filter(l), c = f.getXExtremes(r), g = c.min, n = c.max), r.length && (a.dataMin = Math.min(D(a.dataMin, g), g), a.dataMax = Math.max(D(a.dataMax, n), n)));
                            else if (f.getExtremes(), n = f.dataMax, g = f.dataMin, u(g) && u(n) && (a.dataMin = Math.min(D(a.dataMin, g), g), a.dataMax = Math.max(D(a.dataMax, n), n)), u(d) && (a.threshold = d), !r.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                d(this, "afterGetSeriesExtremes")
            },
            translate: function(a, b, c, d, g, n) {
                var f = this.linkedParent || this,
                    r = 1,
                    e = 0,
                    h = d ? f.oldTransA :
                    f.transA;
                d = d ? f.oldMin : f.min;
                var x = f.minPixelPadding;
                g = (f.isOrdinal || f.isBroken || f.isLog && g) && f.lin2val;
                h || (h = f.transA);
                c && (r *= -1, e = f.len);
                f.reversed && (r *= -1, e -= r * (f.sector || f.len));
                b ? (a = (a * r + e - x) / h + d, g && (a = f.lin2val(a))) : (g && (a = f.val2lin(a)), a = l(d) ? r * (a - d) * h + e + r * x + (l(n) ? h * n : 0) : void 0);
                return a
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, b, c, g,
                n) {
                var f = this,
                    r = f.chart,
                    e = f.left,
                    h = f.top,
                    x, m, B, w, L = c && r.oldChartHeight || r.chartHeight,
                    z = c && r.oldChartWidth || r.chartWidth,
                    p, k = f.transB,
                    A, E = function(a, f, b) {
                        if ("pass" !== g && a < f || a > b) g ? a = Math.min(Math.max(f, a), b) : p = !0;
                        return a
                    };
                A = {
                    value: a,
                    lineWidth: b,
                    old: c,
                    force: g,
                    translatedValue: n
                };
                d(this, "getPlotLinePath", A, function(d) {
                    n = D(n, f.translate(a, null, null, c));
                    n = Math.min(Math.max(-1E5, n), 1E5);
                    x = B = Math.round(n + k);
                    m = w = Math.round(L - n - k);
                    l(n) ? f.horiz ? (m = h, w = L - f.bottom, x = B = E(x, e, e + f.width)) : (x = e, B = z - f.right, m = w =
                        E(m, h, h + f.height)) : (p = !0, g = !1);
                    d.path = p && !g ? null : r.renderer.crispLine(["M", x, m, "L", B, w], b || 1)
                });
                return A.path
            },
            getLinearTickPositions: function(a, b, c) {
                var f, r = q(Math.floor(b / a) * a);
                c = q(Math.ceil(c / a) * a);
                var d = [],
                    g;
                q(r + a) === r && (g = 20);
                if (this.single) return [b];
                for (b = r; b <= c;) {
                    d.push(b);
                    b = q(b + a, g);
                    if (b === f) break;
                    f = b
                }
                return d
            },
            getMinorTickInterval: function() {
                var a = this.options;
                return !0 === a.minorTicks ? D(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function() {
                var a =
                    this,
                    b = a.options,
                    c = a.tickPositions,
                    d = a.minorTickInterval,
                    g = [],
                    l = a.pointRangePadding || 0,
                    n = a.min - l,
                    l = a.max + l,
                    e = l - n;
                if (e && e / d < a.len / 3)
                    if (a.isLog) this.paddedTicks.forEach(function(f, b, r) {
                        b && g.push.apply(g, a.getLogTickPositions(d, r[b - 1], r[b], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) g = g.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), n, l, b.startOfWeek));
                else
                    for (b = n + (c[0] - n) % d; b <= l && b !== g[0]; b += d) g.push(b);
                0 !== g.length && a.trimTicks(g);
                return g
            },
            adjustForMinRange: function() {
                var a =
                    this.options,
                    b = this.min,
                    c = this.max,
                    d, g, l, n, e, h, x, m;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (u(a.min) || u(a.max) ? this.minRange = null : (this.series.forEach(function(a) {
                    h = a.xData;
                    for (n = x = a.xIncrement ? 1 : h.length - 1; 0 < n; n--)
                        if (e = h[n] - h[n - 1], void 0 === l || e < l) l = e
                }), this.minRange = Math.min(5 * l, this.dataMax - this.dataMin)));
                c - b < this.minRange && (g = this.dataMax - this.dataMin >= this.minRange, m = this.minRange, d = (m - c + b) / 2, d = [b - d, D(a.min, b - d)], g && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = F(d),
                    c = [b + m, D(a.max, b + m)], g && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = k(c), c - b < m && (d[0] = c - m, d[1] = D(a.min, c - m), b = F(d)));
                this.min = b;
                this.max = c
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : this.series.forEach(function(f) {
                    var b = f.closestPointRange,
                        r = f.visible || !f.chart.options.chart.ignoreHiddenSeries;
                    !f.noSharedTooltip && u(b) && r && (a = u(a) ? Math.min(a, b) : b)
                });
                return a
            },
            nameToX: function(a) {
                var f = g(this.categories),
                    b = f ? this.categories : this.names,
                    c = a.options.x,
                    d;
                a.series.requireSorting = !1;
                u(c) || (c = !1 === this.options.uniqueNames ? a.series.autoIncrement() : f ? b.indexOf(a.name) : D(b.keys[a.name], -1)); - 1 === c ? f || (d = b.length) : d = c;
                void 0 !== d && (this.names[d] = a.name, this.names.keys[a.name] = d);
                return d
            },
            updateNames: function() {
                var a = this,
                    b = this.names;
                0 < b.length && (Object.keys(b.keys).forEach(function(a) {
                    delete b.keys[a]
                }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(f) {
                    f.xIncrement = null;
                    if (!f.points || f.isDirtyData) a.max = Math.max(a.max, f.xData.length - 1), f.processData(),
                        f.generatePoints();
                    f.data.forEach(function(b, c) {
                        var r;
                        b && b.options && void 0 !== b.name && (r = a.nameToX(b), void 0 !== r && r !== b.x && (b.x = r, f.xData[c] = r))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var f = this,
                    b = f.max - f.min,
                    g = f.axisPointRange || 0,
                    l, e = 0,
                    h = 0,
                    x = f.linkedParent,
                    m = !!f.categories,
                    B = f.transA,
                    w = f.isXAxis;
                if (w || m || g) l = f.getClosest(), x ? (e = x.minPointOffset, h = x.pointRangePadding) : f.series.forEach(function(a) {
                    var b = m ? 1 : w ? D(a.options.pointRange, l, 0) : f.axisPointRange || 0,
                        r = a.options.pointPlacement;
                    g = Math.max(g, b);
                    if (!f.single ||
                        m) a = n.xrange && a instanceof n.xrange ? !w : w, e = Math.max(e, a && c(r) ? 0 : b / 2), h = Math.max(h, a && "on" === r ? 0 : b)
                }), x = f.ordinalSlope && l ? f.ordinalSlope / l : 1, f.minPointOffset = e *= x, f.pointRangePadding = h *= x, f.pointRange = Math.min(g, b), w && (f.closestPointRange = l);
                a && (f.oldTransA = B);
                f.translationSlope = f.transA = B = f.staticScale || f.len / (b + h || 1);
                f.transB = f.horiz ? f.left : f.bottom;
                f.minPixelPadding = B * e;
                d(this, "afterSetAxisTranslation")
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(f) {
                var c = this,
                    g = c.chart,
                    n = c.options,
                    e = c.isLog,
                    h = c.isDatetimeAxis,
                    x = c.isXAxis,
                    m = c.isLinked,
                    B = n.maxPadding,
                    w = n.minPadding,
                    p, k = n.tickInterval,
                    A = n.tickPixelInterval,
                    E = c.categories,
                    H = l(c.threshold) ? c.threshold : null,
                    J = c.softThreshold,
                    t, v, C;
                h || E || m || this.getTickAmount();
                v = D(c.userMin, n.min);
                C = D(c.userMax, n.max);
                m ? (c.linkedParent = g[c.coll][n.linkedTo], p = c.linkedParent.getExtremes(), c.min = D(p.min, p.dataMin), c.max = D(p.max, p.dataMax), n.type !== c.linkedParent.options.type && a.error(11, 1, g)) : (!J && u(H) && (c.dataMin >= H ? (p = H, w = 0) :
                    c.dataMax <= H && (t = H, B = 0)), c.min = D(v, p, c.dataMin), c.max = D(C, t, c.dataMax));
                e && (c.positiveValuesOnly && !f && 0 >= Math.min(c.min, D(c.dataMin, c.min)) && a.error(10, 1, g), c.min = q(c.log2lin(c.min), 15), c.max = q(c.log2lin(c.max), 15));
                c.range && u(c.max) && (c.userMin = c.min = v = Math.max(c.dataMin, c.minFromRange()), c.userMax = C = c.max, c.range = null);
                d(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(E || c.axisPointRange || c.usePercentage || m) && u(c.min) && u(c.max) && (g = c.max - c.min) && (!u(v) && w && (c.min -=
                    g * w), !u(C) && B && (c.max += g * B));
                l(n.softMin) && !l(c.userMin) && n.softMin < c.min && (c.min = v = n.softMin);
                l(n.softMax) && !l(c.userMax) && n.softMax > c.max && (c.max = C = n.softMax);
                l(n.floor) && (c.min = Math.min(Math.max(c.min, n.floor), Number.MAX_VALUE));
                l(n.ceiling) && (c.max = Math.max(Math.min(c.max, n.ceiling), D(c.userMax, -Number.MAX_VALUE)));
                J && u(c.dataMin) && (H = H || 0, !u(v) && c.min < H && c.dataMin >= H ? c.min = c.options.minRange ? Math.min(H, c.max - c.minRange) : H : !u(C) && c.max > H && c.dataMax <= H && (c.max = c.options.minRange ? Math.max(H, c.min +
                    c.minRange) : H));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : m && !k && A === c.linkedParent.options.tickPixelInterval ? k = c.linkedParent.tickInterval : D(k, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, E ? 1 : (c.max - c.min) * A / Math.max(c.len, A));
                x && !f && c.series.forEach(function(a) {
                    a.processData(c.min !== c.oldMin || c.max !== c.oldMax)
                });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !k && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                f = D(n.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !k && c.tickInterval < f && (c.tickInterval = f);
                h || e || k || (c.tickInterval = z(c.tickInterval, null, b(c.tickInterval), D(n.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var f = this.options,
                    c, b = f.tickPositions;
                c = this.getMinorTickInterval();
                var g = f.tickPositioner,
                    l = f.startOnTick,
                    n = f.endOnTick;
                this.tickmarkOffset = this.categories && "between" === f.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c;
                this.single = this.min === this.max && u(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== f.allowDecimals);
                this.tickPositions = c = b && b.slice();
                !c && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (c = [this.min, this.max], a.error(19, !1, this.chart)) : c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, f.units), this.min, this.max, f.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length > this.len && (c = [c[0], c.pop()], c[0] === c[1] && (c.length = 1)), this.tickPositions = c, g && (g = g.apply(this, [this.min, this.max]))) && (this.tickPositions = c = g);
                this.paddedTicks =
                    c.slice(0);
                this.trimTicks(c, l, n);
                this.isLinked || (this.single && 2 > c.length && !this.categories && (this.min -= .5, this.max += .5), b || g || this.adjustTickAmount());
                d(this, "afterSetTickPositions")
            },
            trimTicks: function(a, c, b) {
                var f = a[0],
                    g = a[a.length - 1],
                    l = this.minPointOffset || 0;
                d(this, "trimTicks");
                if (!this.isLinked) {
                    if (c && -Infinity !== f) this.min = f;
                    else
                        for (; this.min - l > a[0];) a.shift();
                    if (b) this.max = g;
                    else
                        for (; this.max + l < a[a.length - 1];) a.pop();
                    0 === a.length && u(f) && !this.options.tickPositions && a.push((g + f) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    c, b = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === b.alignTicks || !1 === b.startOnTick || !1 === b.endOnTick || this.isLog || this.chart[this.coll].forEach(function(f) {
                    var b = f.options,
                        b = [f.horiz ? b.left : b.top, b.width, b.height, b.pane].join();
                    f.series.length && (a[b] ? c = !0 : a[b] = 1)
                });
                return c
            },
            getTickAmount: function() {
                var a = this.options,
                    c = a.tickAmount,
                    b = a.tickPixelInterval;
                !u(a.tickInterval) && this.len < b && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (c = 2);
                !c && this.alignToOthers() && (c = Math.ceil(this.len /
                    b) + 1);
                4 > c && (this.finalTickAmt = c, c = 5);
                this.tickAmount = c
            },
            adjustTickAmount: function() {
                var a = this.options,
                    c = this.tickInterval,
                    b = this.tickPositions,
                    d = this.tickAmount,
                    g = this.finalTickAmt,
                    l = b && b.length,
                    n = D(this.threshold, this.softThreshold ? 0 : null),
                    e;
                if (this.hasData()) {
                    if (l < d) {
                        for (e = this.min; b.length < d;) b.length % 2 || e === n ? b.push(q(b[b.length - 1] + c)) : b.unshift(q(b[0] - c));
                        this.transA *= (l - 1) / (d - 1);
                        this.min = a.startOnTick ? b[0] : Math.min(this.min, b[0]);
                        this.max = a.endOnTick ? b[b.length - 1] : Math.max(this.max, b[b.length -
                            1])
                    } else l > d && (this.tickInterval *= 2, this.setTickPositions());
                    if (u(g)) {
                        for (c = a = b.length; c--;)(3 === g && 1 === c % 2 || 2 >= g && 0 < c && c < a - 1) && b.splice(c, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a = this.series.some(function(a) {
                        return a.isDirtyData || a.isDirty || a.xAxis.isDirty
                    }),
                    c;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (c = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax ||
                    this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = c || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                d(this, "afterSetScale")
            },
            setExtremes: function(a, c, b, g, l) {
                var f = this,
                    n = f.chart;
                b = D(b, !0);
                f.series.forEach(function(a) {
                    delete a.kdTree
                });
                l = h(l, {
                    min: a,
                    max: c
                });
                d(f, "setExtremes", l, function() {
                    f.userMin = a;
                    f.userMax = c;
                    f.eventArgs = l;
                    b && n.redraw(g)
                })
            },
            zoom: function(a, c) {
                var f = this.dataMin,
                    b = this.dataMax,
                    g = this.options,
                    l = Math.min(f, D(g.min, f)),
                    n = Math.max(b, D(g.max, b));
                a = {
                    newMin: a,
                    newMax: c
                };
                d(this, "zoom", a, function(a) {
                    var c = a.newMin,
                        d = a.newMax;
                    if (c !== this.min || d !== this.max) this.allowZoomOutside || (u(f) && (c < l && (c = l), c > n && (c = n)), u(b) && (d < l && (d = l), d > n && (d = n))), this.displayBtn = void 0 !== c || void 0 !== d, this.setExtremes(c, d, !1, void 0, {
                        trigger: "zoom"
                    });
                    a.zoomed = !0
                });
                return a.zoomed
            },
            setAxisSize: function() {
                var f =
                    this.chart,
                    c = this.options,
                    b = c.offsets || [0, 0, 0, 0],
                    d = this.horiz,
                    g = this.width = Math.round(a.relativeLength(D(c.width, f.plotWidth - b[3] + b[1]), f.plotWidth)),
                    l = this.height = Math.round(a.relativeLength(D(c.height, f.plotHeight - b[0] + b[2]), f.plotHeight)),
                    n = this.top = Math.round(a.relativeLength(D(c.top, f.plotTop + b[0]), f.plotHeight, f.plotTop)),
                    c = this.left = Math.round(a.relativeLength(D(c.left, f.plotLeft + b[3]), f.plotWidth, f.plotLeft));
                this.bottom = f.chartHeight - l - n;
                this.right = f.chartWidth - g - c;
                this.len = Math.max(d ? g :
                    l, 0);
                this.pos = d ? c : n
            },
            getExtremes: function() {
                var a = this.isLog;
                return {
                    min: a ? q(this.lin2log(this.min)) : this.min,
                    max: a ? q(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var f = this.isLog,
                    c = f ? this.lin2log(this.min) : this.min,
                    f = f ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = c : Infinity === a ? a = f : c > a ? a = c : f < a && (a = f);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                var f = (D(a, 0) - 90 * this.side +
                    720) % 360;
                a = {
                    align: "center"
                };
                d(this, "autoLabelAlign", a, function(a) {
                    15 < f && 165 > f ? a.align = "right" : 195 < f && 345 > f && (a.align = "left")
                });
                return a.align
            },
            tickSize: function(a) {
                var f = this.options,
                    c = f[a + "Length"],
                    b = D(f[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0),
                    g;
                b && c && ("inside" === f[a + "Position"] && (c = -c), g = [c, b]);
                a = {
                    tickSize: g
                };
                d(this, "afterTickSize", a);
                return a.tickSize
            },
            labelMetrics: function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    c = this.horiz,
                    b = this.tickInterval,
                    d = b,
                    g = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b),
                    l, n = a.rotation,
                    e = this.labelMetrics(),
                    h, x = Number.MAX_VALUE,
                    m, B = this.max - this.min,
                    w = function(a) {
                        var f = a / (g || 1),
                            f = 1 < f ? Math.ceil(f) : 1;
                        f * b > B && Infinity !== a && Infinity !== g && (f = Math.ceil(B / b));
                        return q(f * b)
                    };
                c ? (m = !a.staggerLines && !a.step && (u(n) ? [n] : g < D(a.autoRotationLimit, 80) && a.autoRotation)) && m.forEach(function(a) {
                    var f;
                    if (a === n || a && -90 <= a && 90 >= a) h = w(Math.abs(e.h / Math.sin(v * a))), f = h + Math.abs(a / 360), f < x && (x = f, l = a, d = h)
                }) : a.step || (d = w(e.h));
                this.autoRotation = m;
                this.labelRotation = D(l, n);
                return d
            },
            getSlotWidth: function(a) {
                var f = this.chart,
                    c = this.horiz,
                    b = this.options.labels,
                    d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    g = f.margin[3];
                return a && a.slotWidth || c && 2 > (b.step || 0) && !b.rotation && (this.staggerLines || 1) * this.len / d || !c && (b.style && parseInt(b.style.width, 10) || g && g - f.spacing[3] || .33 * f.chartWidth)
            },
            renderUnsquish: function() {
                var a =
                    this.chart,
                    b = a.renderer,
                    d = this.tickPositions,
                    g = this.ticks,
                    l = this.options.labels,
                    n = l && l.style || {},
                    e = this.horiz,
                    h = this.getSlotWidth(),
                    x = Math.max(1, Math.round(h - 2 * (l.padding || 5))),
                    m = {},
                    B = this.labelMetrics(),
                    w = l.style && l.style.textOverflow,
                    z, p, k = 0,
                    A;
                c(l.rotation) || (m.rotation = l.rotation || 0);
                d.forEach(function(a) {
                    (a = g[a]) && a.label && a.label.textPxLength > k && (k = a.label.textPxLength)
                });
                this.maxLabelLength = k;
                if (this.autoRotation) k > x && k > B.h ? m.rotation = this.labelRotation : this.labelRotation = 0;
                else if (h && (z = x, !w))
                    for (p = "clip", x = d.length; !e && x--;)
                        if (A = d[x], A = g[A].label) A.styles && "ellipsis" === A.styles.textOverflow ? A.css({
                            textOverflow: "clip"
                        }) : A.textPxLength > h && A.css({
                            width: h + "px"
                        }), A.getBBox().height > this.len / d.length - (B.h - B.f) && (A.specificTextOverflow = "ellipsis");
                m.rotation && (z = k > .5 * a.chartHeight ? .33 * a.chartHeight : k, w || (p = "ellipsis"));
                if (this.labelAlign = l.align || this.autoLabelAlign(this.labelRotation)) m.align = this.labelAlign;
                d.forEach(function(a) {
                    var f = (a = g[a]) && a.label,
                        c = n.width,
                        b = {};
                    f && (f.attr(m), a.shortenLabel ?
                        a.shortenLabel() : z && !c && "nowrap" !== n.whiteSpace && (z < f.textPxLength || "SPAN" === f.element.tagName) ? (b.width = z, w || (b.textOverflow = f.specificTextOverflow || p), f.css(b)) : f.styles && f.styles.width && !b.width && !c && f.css({
                            width: null
                        }), delete f.specificTextOverflow, a.rotation = m.rotation)
                }, this);
                this.tickRotCorr = b.rotCorr(B.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.series.some(function(a) {
                    return a.hasData()
                }) || this.options.showEmpty && u(this.min) && u(this.max)
            },
            addTitle: function(a) {
                var f =
                    this.chart.renderer,
                    c = this.horiz,
                    b = this.opposite,
                    d = this.options.title,
                    g, l = this.chart.styledMode;
                this.axisTitle || ((g = d.textAlign) || (g = (c ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: b ? "right" : "left",
                    middle: "center",
                    high: b ? "left" : "right"
                })[d.align]), this.axisTitle = f.text(d.text, 0, 0, d.useHTML).attr({
                    zIndex: 7,
                    rotation: d.rotation || 0,
                    align: g
                }).addClass("highcharts-axis-title"), l || this.axisTitle.css(w(d.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                l || d.style.width || this.isRadial ||
                    this.axisTitle.css({
                        width: this.len
                    });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var f = this.ticks;
                f[a] ? f[a].addLabel() : f[a] = new E(this, a)
            },
            getOffset: function() {
                var a = this,
                    c = a.chart,
                    b = c.renderer,
                    g = a.options,
                    l = a.tickPositions,
                    n = a.ticks,
                    e = a.horiz,
                    h = a.side,
                    x = c.inverted && !a.isZAxis ? [1, 0, 3, 2][h] : h,
                    m, B, w = 0,
                    z, p = 0,
                    k = g.title,
                    A = g.labels,
                    E = 0,
                    H = c.axisOffset,
                    c = c.clipOffset,
                    q = [-1, 1, 1, -1][h],
                    t = g.className,
                    v = a.axisParent;
                m = a.hasData();
                a.showAxis = B = m || D(g.showEmpty, !0);
                a.staggerLines = a.horiz && A.staggerLines;
                a.axisGroup || (a.gridGroup = b.g("grid").attr({
                    zIndex: g.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(v), a.axisGroup = b.g("axis").attr({
                    zIndex: g.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(v), a.labelGroup = b.g("axis-labels").attr({
                    zIndex: A.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (t || "")).add(v));
                m || a.isLinked ? (l.forEach(function(c, b) {
                        a.generateTick(c, b)
                    }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === h || 2 ===
                    h || {
                        1: "left",
                        3: "right"
                    }[h] === a.labelAlign, D(A.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && l.forEach(function(a) {
                        E = Math.max(n[a].getLabelSize(), E)
                    }), a.staggerLines && (E *= a.staggerLines), a.labelOffset = E * (a.opposite ? -1 : 1)) : J(n, function(a, c) {
                    a.destroy();
                    delete n[c]
                });
                k && k.text && !1 !== k.enabled && (a.addTitle(B), B && !1 !== k.reserveSpace && (a.titleOffset = w = a.axisTitle.getBBox()[e ? "height" : "width"], z = k.offset, p = u(z) ? 0 : D(k.margin, e ? 5 : 10)));
                a.renderLine();
                a.offset = q * D(g.offset, H[h] ? H[h] +
                    (g.margin || 0) : 0);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                b = 0 === h ? -a.labelMetrics().h : 2 === h ? a.tickRotCorr.y : 0;
                p = Math.abs(E) + p;
                E && (p = p - b + q * (e ? D(A.y, a.tickRotCorr.y + 8 * q) : A.x));
                a.axisTitleMargin = D(z, p);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(n, l));
                e = this.tickSize("tick");
                H[h] = Math.max(H[h], a.axisTitleMargin + w + q * a.offset, p, l && l.length && e ? e[0] + q * a.offset : 0);
                g = g.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                c[x] = Math.max(c[x], g);
                d(this, "afterGetOffset")
            },
            getLinePath: function(a) {
                var c =
                    this.chart,
                    b = this.opposite,
                    f = this.offset,
                    d = this.horiz,
                    g = this.left + (b ? this.width : 0) + f,
                    f = c.chartHeight - this.bottom - (b ? this.height : 0) + f;
                b && (a *= -1);
                return c.renderer.crispLine(["M", d ? this.left : g, d ? f : this.top, "L", d ? c.chartWidth - this.right : g, d ? f : c.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    c = this.left,
                    b = this.top,
                    g = this.len,
                    l = this.options.title,
                    n = a ? c : b,
                    e = this.opposite,
                    h = this.offset,
                    x = l.x || 0,
                    m = l.y || 0,
                    B = this.axisTitle,
                    w = this.chart.renderer.fontMetrics(l.style && l.style.fontSize, B),
                    B = Math.max(B.getBBox(null, 0).height - w.h - 1, 0),
                    g = {
                        low: n + (a ? 0 : g),
                        middle: n + g / 2,
                        high: n + (a ? g : 0)
                    }[l.align],
                    c = (a ? b + this.height : c) + (a ? 1 : -1) * (e ? -1 : 1) * this.axisTitleMargin + [-B, B, w.f, -B][this.side],
                    a = {
                        x: a ? g + x : c + (e ? this.width : 0) + h + x,
                        y: a ? c + m - (e ? this.height : 0) + h : g + m
                    };
                d(this, "afterGetTitlePosition", {
                    titlePosition: a
                });
                return a
            },
            renderMinorTick: function(a) {
                var c = this.chart.hasRendered && l(this.oldMin),
                    b = this.minorTicks;
                b[a] || (b[a] = new E(this, a, "minor"));
                c && b[a].isNew && b[a].render(null, !0);
                b[a].render(null, !1, 1)
            },
            renderTick: function(a, c) {
                var b = this.isLinked,
                    f = this.ticks,
                    d = this.chart.hasRendered && l(this.oldMin);
                if (!b || a >= this.min && a <= this.max) f[a] || (f[a] = new E(this, a)), d && f[a].isNew && f[a].render(c, !0, -1), f[a].render(c)
            },
            render: function() {
                var c = this,
                    b = c.chart,
                    g = c.options,
                    n = c.isLog,
                    e = c.isLinked,
                    h = c.tickPositions,
                    x = c.axisTitle,
                    m = c.ticks,
                    w = c.minorTicks,
                    z = c.alternateBands,
                    p = g.stackLabels,
                    k = g.alternateGridColor,
                    A = c.tickmarkOffset,
                    H = c.axisLine,
                    D = c.showAxis,
                    q = I(b.renderer.globalAnimation),
                    t, v;
                c.labelEdge.length = 0;
                c.overlap = !1;
                [m, w, z].forEach(function(a) {
                    J(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (c.hasData() || e) c.minorTickInterval && !c.categories && c.getMinorTickPositions().forEach(function(a) {
                    c.renderMinorTick(a)
                }), h.length && (h.forEach(function(a, b) {
                    c.renderTick(a, b)
                }), A && (0 ===
                    c.min || c.single) && (m[-1] || (m[-1] = new E(c, -1, null, !0)), m[-1].render(-1))), k && h.forEach(function(f, d) {
                    v = void 0 !== h[d + 1] ? h[d + 1] + A : c.max - A;
                    0 === d % 2 && f < c.max && v <= c.max + (b.polar ? -A : A) && (z[f] || (z[f] = new a.PlotLineOrBand(c)), t = f + A, z[f].options = {
                        from: n ? c.lin2log(t) : t,
                        to: n ? c.lin2log(v) : v,
                        color: k
                    }, z[f].render(), z[f].isActive = !0)
                }), c._addedPlotLB || ((g.plotLines || []).concat(g.plotBands || []).forEach(function(a) {
                    c.addPlotBandOrLine(a)
                }), c._addedPlotLB = !0);
                [m, w, z].forEach(function(a) {
                    var c, f = [],
                        d = q.duration;
                    J(a, function(a,
                        c) {
                        a.isActive || (a.render(c, !1, 0), a.isActive = !1, f.push(c))
                    });
                    B(function() {
                        for (c = f.length; c--;) a[f[c]] && !a[f[c]].isActive && (a[f[c]].destroy(), delete a[f[c]])
                    }, a !== z && b.hasRendered && d ? d : 0)
                });
                H && (H[H.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(H.strokeWidth())
                }), H.isPlaced = !0, H[D ? "show" : "hide"](!0));
                x && D && (g = c.getTitlePosition(), l(g.y) ? (x[x.isNew ? "attr" : "animate"](g), x.isNew = !1) : (x.attr("y", -9999), x.isNew = !0));
                p && p.enabled && c.renderStackTotals();
                c.isDirty = !1;
                d(this, "afterRender")
            },
            redraw: function() {
                this.visible &&
                    (this.render(), this.plotLinesAndBands.forEach(function(a) {
                        a.render()
                    }));
                this.series.forEach(function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var c = this,
                    b = c.stacks,
                    f = c.plotLinesAndBands,
                    g;
                d(this, "destroy", {
                    keepEvents: a
                });
                a || A(c);
                J(b, function(a, c) {
                    p(a);
                    b[c] = null
                });
                [c.ticks, c.minorTicks, c.alternateBands].forEach(function(a) {
                    p(a)
                });
                if (f)
                    for (a = f.length; a--;) f[a].destroy();
                "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a) {
                    c[a] &&
                        (c[a] = c[a].destroy())
                });
                for (g in c.plotLinesAndBandsGroups) c.plotLinesAndBandsGroups[g] = c.plotLinesAndBandsGroups[g].destroy();
                J(c, function(a, b) {
                    -1 === c.keepProps.indexOf(b) && delete c[b]
                })
            },
            drawCrosshair: function(a, c) {
                var b, f = this.crosshair,
                    g = D(f.snap, !0),
                    l, n = this.cross;
                d(this, "drawCrosshair", {
                    e: a,
                    point: c
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (u(c) || !g)) {
                    g ? u(c) && (l = D(c.crosshairPos, this.isXAxis ? c.plotX : this.len - c.plotY)) : l = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    u(l) && (b = this.getPlotLinePath(c && (this.isXAxis ? c.x : D(c.stackY, c.y)), null, null, null, l) || null);
                    if (!u(b)) {
                        this.hideCrosshair();
                        return
                    }
                    g = this.categories && !this.isRadial;
                    n || (this.cross = n = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (g ? "category " : "thin ") + f.className).attr({
                        zIndex: D(f.zIndex, 2)
                    }).add(), this.chart.styledMode || (n.attr({
                            stroke: f.color || (g ? e("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                            "stroke-width": D(f.width, 1)
                        }).css({
                            "pointer-events": "none"
                        }), f.dashStyle &&
                        n.attr({
                            dashstyle: f.dashStyle
                        })));
                    n.show().attr({
                        d: b
                    });
                    g && !f.width && n.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                d(this, "afterDrawCrosshair", {
                    e: a,
                    point: c
                })
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide();
                d(this, "afterHideCrosshair")
            }
        });
        return a.Axis = H
    });
    K(G, "parts/DateTimeAxis.js", [G["parts/Globals.js"]], function(a) {
        var C = a.Axis,
            I = a.getMagnitude,
            F = a.normalizeTickInterval,
            k = a.timeUnits;
        C.prototype.getTimeTicks = function() {
            return this.chart.time.getTimeTicks.apply(this.chart.time,
                arguments)
        };
        C.prototype.normalizeTimeTickInterval = function(a, q) {
            var e = q || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            q = e[e.length - 1];
            var u = k[q[0]],
                v = q[1],
                p;
            for (p = 0; p < e.length && !(q = e[p], u = k[q[0]], v = q[1], e[p + 1] && a <= (u * v[v.length - 1] + k[e[p + 1][0]]) / 2); p++);
            u === k.year && a < 5 * u && (v = [1, 2, 5]);
            a = F(a / u, v, "year" === q[0] ? Math.max(I(a / u), 1) : 1);
            return {
                unitRange: u,
                count: a,
                unitName: q[0]
            }
        }
    });
    K(G, "parts/LogarithmicAxis.js", [G["parts/Globals.js"]], function(a) {
        var C = a.Axis,
            I = a.getMagnitude,
            F = a.normalizeTickInterval,
            k = a.pick;
        C.prototype.getLogTickPositions = function(a, q, t, u) {
            var e = this.options,
                p = this.len,
                h = [];
            u || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), h = this.getLinearTickPositions(a, q, t);
            else if (.08 <= a)
                for (var p = Math.floor(q), d, m, b, g, l, e = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < t + 1 && !l; p++)
                    for (m = e.length, d = 0; d < m && !l; d++) b = this.log2lin(this.lin2log(p) *
                        e[d]), b > q && (!u || g <= t) && void 0 !== g && h.push(g), g > t && (l = !0), g = b;
            else q = this.lin2log(q), t = this.lin2log(t), a = u ? this.getMinorTickInterval() : e.tickInterval, a = k("auto" === a ? null : a, this._minorAutoInterval, e.tickPixelInterval / (u ? 5 : 1) * (t - q) / ((u ? p / this.tickPositions.length : p) || 1)), a = F(a, null, I(a)), h = this.getLinearTickPositions(a, q, t).map(this.log2lin), u || (this._minorAutoInterval = a / 5);
            u || (this.tickInterval = a);
            return h
        };
        C.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function(a) {
            return Math.pow(10,
                a)
        }
    });
    K(G, "parts/PlotLineOrBand.js", [G["parts/Globals.js"], G["parts/Axis.js"]], function(a, C) {
        var I = a.arrayMax,
            F = a.arrayMin,
            k = a.defined,
            e = a.destroyObjectProperties,
            q = a.erase,
            t = a.merge,
            u = a.pick;
        a.PlotLineOrBand = function(a, e) {
            this.axis = a;
            e && (this.options = e, this.id = e.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                a.fireEvent(this, "render");
                var e = this,
                    p = e.axis,
                    h = p.horiz,
                    d = e.options,
                    m = d.label,
                    b = e.label,
                    g = d.to,
                    l = d.from,
                    c = d.value,
                    w = k(l) && k(g),
                    z = k(c),
                    q = e.svgElem,
                    D = !q,
                    A = [],
                    n = d.color,
                    x = u(d.zIndex, 0),
                    B = d.events,
                    A = {
                        "class": "highcharts-plot-" + (w ? "band " : "line ") + (d.className || "")
                    },
                    E = {},
                    H = p.chart.renderer,
                    f = w ? "bands" : "lines";
                p.isLog && (l = p.log2lin(l), g = p.log2lin(g), c = p.log2lin(c));
                p.chart.styledMode || (z ? (A.stroke = n, A["stroke-width"] = d.width, d.dashStyle && (A.dashstyle = d.dashStyle)) : w && (n && (A.fill = n), d.borderWidth && (A.stroke = d.borderColor, A["stroke-width"] = d.borderWidth)));
                E.zIndex = x;
                f += "-" + x;
                (n = p.plotLinesAndBandsGroups[f]) || (p.plotLinesAndBandsGroups[f] = n = H.g("plot-" + f).attr(E).add());
                D && (e.svgElem = q = H.path().attr(A).add(n));
                if (z) A = p.getPlotLinePath(c, q.strokeWidth());
                else if (w) A = p.getPlotBandPath(l, g, d);
                else return;
                (D || !q.d) && A && A.length ? (q.attr({
                    d: A
                }), B && a.objectEach(B, function(a, c) {
                    q.on(c, function(a) {
                        B[c].apply(e, [a])
                    })
                })) : q && (A ? (q.show(!0), q.animate({
                    d: A
                })) : q.d && (q.hide(), b && (e.label = b = b.destroy())));
                m && k(m.text) && A && A.length && 0 < p.width && 0 < p.height && !A.isFlat ? (m = t({
                    align: h && w && "center",
                    x: h ? !w && 4 : 10,
                    verticalAlign: !h && w && "middle",
                    y: h ? w ? 16 : 10 : w ? 6 : -4,
                    rotation: h && !w && 90
                }, m), this.renderLabel(m, A, w, x)) : b && b.hide();
                return e
            },
            renderLabel: function(a, e, h, d) {
                var m = this.label,
                    b = this.axis.chart.renderer;
                m || (m = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (h ? "band" : "line") + "-label " + (a.className || "")
                }, m.zIndex = d, this.label = m = b.text(a.text, 0, 0, a.useHTML).attr(m).add(), this.axis.chart.styledMode || m.css(a.style));
                d = e.xBounds || [e[1], e[4], h ? e[6] : e[1]];
                e = e.yBounds || [e[2], e[5], h ? e[7] : e[2]];
                h = F(d);
                b = F(e);
                m.align(a, !1, {
                    x: h,
                    y: b,
                    width: I(d) - h,
                    height: I(e) - b
                });
                m.show(!0)
            },
            destroy: function() {
                q(this.axis.plotLinesAndBands,
                    this);
                delete this.axis;
                e(this)
            }
        };
        a.extend(C.prototype, {
            getPlotBandPath: function(a, e) {
                var h = this.getPlotLinePath(e, null, null, !0),
                    d = this.getPlotLinePath(a, null, null, !0),
                    m = [],
                    b = this.horiz,
                    g = 1,
                    l;
                a = a < this.min && e < this.min || a > this.max && e > this.max;
                if (d && h)
                    for (a && (l = d.toString() === h.toString(), g = 0), a = 0; a < d.length; a += 6) b && h[a + 1] === d[a + 1] ? (h[a + 1] += g, h[a + 4] += g) : b || h[a + 2] !== d[a + 2] || (h[a + 2] += g, h[a + 5] += g), m.push("M", d[a + 1], d[a + 2], "L", d[a + 4], d[a + 5], h[a + 4], h[a + 5], h[a + 1], h[a + 2], "z"), m.isFlat = l;
                return m
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a,
                    "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(e, p) {
                var h = (new a.PlotLineOrBand(this, e)).render(),
                    d = this.userOptions;
                h && (p && (d[p] = d[p] || [], d[p].push(e)), this.plotLinesAndBands.push(h));
                return h
            },
            removePlotBandOrLine: function(a) {
                for (var e = this.plotLinesAndBands, h = this.options, d = this.userOptions, m = e.length; m--;) e[m].id === a && e[m].destroy();
                [h.plotLines || [], d.plotLines || [], h.plotBands || [], d.plotBands || []].forEach(function(b) {
                    for (m = b.length; m--;) b[m].id ===
                        a && q(b, b[m])
                })
            },
            removePlotBand: function(a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function(a) {
                this.removePlotBandOrLine(a)
            }
        })
    });
    K(G, "parts/Tooltip.js", [G["parts/Globals.js"]], function(a) {
        var C = a.doc,
            I = a.extend,
            F = a.format,
            k = a.isNumber,
            e = a.merge,
            q = a.pick,
            t = a.splat,
            u = a.syncTimeout,
            v = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, e) {
                this.chart = a;
                this.options = e;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = e.split && !a.inverted;
                this.shared = e.shared || this.split;
                this.outside = e.outside && !this.split
            },
            cleanSplit: function(a) {
                this.chart.series.forEach(function(e) {
                    var d = e && e.tt;
                    d && (!d.isActive || a ? e.tt = d.destroy() : d.isActive = !1)
                })
            },
            applyFilter: function() {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{
                            tagName: "feGaussianBlur",
                            "in": "SourceAlpha",
                            stdDeviation: 1
                        }, {
                            tagName: "feOffset",
                            dx: 1,
                            dy: 1
                        }, {
                            tagName: "feComponentTransfer",
                            children: [{
                                tagName: "feFuncA",
                                type: "linear",
                                slope: .3
                            }]
                        },
                        {
                            tagName: "feMerge",
                            children: [{
                                tagName: "feMergeNode"
                            }, {
                                tagName: "feMergeNode",
                                "in": "SourceGraphic"
                            }]
                        }
                    ]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            },
            getLabel: function() {
                var e = this,
                    h = this.chart.renderer,
                    d = this.chart.styledMode,
                    m = this.options,
                    b, g;
                this.label || (this.outside && (this.container = b = a.doc.createElement("div"), b.className = "highcharts-tooltip-container", a.css(b, {
                    position: "absolute",
                    top: "1px",
                    pointerEvents: m.style &&
                        m.style.pointerEvents
                }), a.doc.body.appendChild(b), this.renderer = h = new a.Renderer(b, 0, 0)), this.split ? this.label = h.g("tooltip") : (this.label = h.label("", 0, 0, m.shape || "callout", null, null, m.useHTML, null, "tooltip").attr({
                    padding: m.padding,
                    r: m.borderRadius
                }), d || this.label.attr({
                    fill: m.backgroundColor,
                    "stroke-width": m.borderWidth
                }).css(m.style).shadow(m.shadow)), d && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)), this.outside && (g = {
                        x: this.label.xSetter,
                        y: this.label.ySetter
                    },
                    this.label.xSetter = function(a, c) {
                        g[c].call(this.label, e.distance);
                        b.style.left = a + "px"
                    }, this.label.ySetter = function(a, c) {
                        g[c].call(this.label, e.distance);
                        b.style.top = a + "px"
                    }), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                e(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, e(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer &&
                    (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function(e, h, d, m) {
                var b = this,
                    g = b.now,
                    l = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(e - g.x) || 1 < Math.abs(h - g.y)),
                    c = b.followPointer || 1 < b.len;
                I(g, {
                    x: l ? (2 * g.x + e) / 3 : e,
                    y: l ? (g.y + h) / 2 : h,
                    anchorX: c ? void 0 : l ? (2 * g.anchorX + d) / 3 : d,
                    anchorY: c ? void 0 : l ? (g.anchorY + m) / 2 : m
                });
                b.getLabel().attr(g);
                l && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    b &&
                        b.move(e, h, d, m)
                }, 32))
            },
            hide: function(e) {
                var h = this;
                a.clearTimeout(this.hideTimer);
                e = q(e, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = u(function() {
                    h.getLabel()[e ? "fadeOut" : "hide"]();
                    h.isHidden = !0
                }, e))
            },
            getAnchor: function(a, e) {
                var d = this.chart,
                    h = d.pointer,
                    b = d.inverted,
                    g = d.plotTop,
                    l = d.plotLeft,
                    c = 0,
                    w = 0,
                    z, k;
                a = t(a);
                this.followPointer && e ? (void 0 === e.chartX && (e = h.normalize(e)), a = [e.chartX - d.plotLeft, e.chartY - g]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function(a) {
                    z = a.series.yAxis;
                    k = a.series.xAxis;
                    c += a.plotX + (!b && k ? k.left - l : 0);
                    w += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && z ? z.top - g : 0)
                }), c /= a.length, w /= a.length, a = [b ? d.plotWidth - w : c, this.shared && !b && 1 < a.length && e ? e.chartY - g : b ? d.plotHeight - c : w]);
                return a.map(Math.round)
            },
            getPosition: function(a, e, d) {
                var h = this.chart,
                    b = this.distance,
                    g = {},
                    l = h.inverted && d.h || 0,
                    c, w = this.outside,
                    z = w ? C.documentElement.clientWidth - 2 * b : h.chartWidth,
                    k = w ? Math.max(C.body.scrollHeight, C.documentElement.scrollHeight, C.body.offsetHeight, C.documentElement.offsetHeight,
                        C.documentElement.clientHeight) : h.chartHeight,
                    p = h.pointer.chartPosition,
                    A = ["y", k, e, (w ? p.top - b : 0) + d.plotY + h.plotTop, w ? 0 : h.plotTop, w ? k : h.plotTop + h.plotHeight],
                    n = ["x", z, a, (w ? p.left - b : 0) + d.plotX + h.plotLeft, w ? 0 : h.plotLeft, w ? z : h.plotLeft + h.plotWidth],
                    x = !this.followPointer && q(d.ttBelow, !h.inverted === !!d.negative),
                    B = function(a, c, f, d, n, e) {
                        var h = f < d - b,
                            m = d + b + f < c,
                            B = d - b - f;
                        d += b;
                        if (x && m) g[a] = d;
                        else if (!x && h) g[a] = B;
                        else if (h) g[a] = Math.min(e - f, 0 > B - l ? B : B - l);
                        else if (m) g[a] = Math.max(n, d + l + f > c ? d : d + l);
                        else return !1
                    },
                    E =
                    function(a, c, f, d) {
                        var l;
                        d < b || d > c - b ? l = !1 : g[a] = d < f / 2 ? 1 : d > c - f / 2 ? c - f - 2 : d - f / 2;
                        return l
                    },
                    H = function(a) {
                        var b = A;
                        A = n;
                        n = b;
                        c = a
                    },
                    f = function() {
                        !1 !== B.apply(0, A) ? !1 !== E.apply(0, n) || c || (H(!0), f()) : c ? g.x = g.y = 0 : (H(!0), f())
                    };
                (h.inverted || 1 < this.len) && H();
                f();
                return g
            },
            defaultFormatter: function(a) {
                var e = this.points || t(this),
                    d;
                d = [a.tooltipFooterHeaderFormatter(e[0])];
                d = d.concat(a.bodyFormatter(e));
                d.push(a.tooltipFooterHeaderFormatter(e[0], !0));
                return d
            },
            refresh: function(e, h) {
                var d = this.chart,
                    m = this.options,
                    b, g = e,
                    l,
                    c = {},
                    w, z = [];
                w = m.formatter || this.defaultFormatter;
                var c = this.shared,
                    k = d.styledMode,
                    p = [];
                m.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = t(g)[0].series.tooltipOptions.followPointer, l = this.getAnchor(g, h), h = l[0], b = l[1], !c || g.series && g.series.noSharedTooltip ? c = g.getLabelConfig() : (p = d.pointer.getActiveSeries(g), d.series.forEach(function(a) {
                        (a.options.inactiveOtherPoints || -1 === p.indexOf(a)) && a.setState("inactive", !0)
                    }), g.forEach(function(a) {
                        a.setState("hover");
                        z.push(a.getLabelConfig())
                    }),
                    c = {
                        x: g[0].category,
                        y: g[0].y
                    }, c.points = z, g = g[0]), this.len = z.length, w = w.call(c, this), c = g.series, this.distance = q(c.tooltipOptions.distance, 16), !1 === w ? this.hide() : (d = this.getLabel(), this.isHidden && d.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(w, t(e)) : (m.style.width && !k || d.css({
                    width: this.chart.spacingBox.width
                }), d.attr({
                    text: w && w.join ? w.join("") : w
                }), d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + q(g.colorIndex, c.colorIndex)), k || d.attr({
                    stroke: m.borderColor || g.color || c.color ||
                        "#666666"
                }), this.updatePosition({
                    plotX: h,
                    plotY: b,
                    negative: g.negative,
                    ttBelow: g.ttBelow,
                    h: l[2] || 0
                })), this.isHidden = !1), a.fireEvent(this, "refresh"))
            },
            renderSplit: function(e, h) {
                var d = this,
                    m = [],
                    b = this.chart,
                    g = b.renderer,
                    l = !0,
                    c = this.options,
                    w = 0,
                    z, k = this.getLabel(),
                    p = b.plotTop;
                a.isString(e) && (e = [!1, e]);
                e.slice(0, h.length + 1).forEach(function(a, n) {
                    if (!1 !== a && "" !== a) {
                        n = h[n - 1] || {
                            isHeader: !0,
                            plotX: h[0].plotX,
                            plotY: b.plotHeight
                        };
                        var e = n.series || d,
                            B = e.tt,
                            A = n.series || {},
                            H = "highcharts-color-" + q(n.colorIndex, A.colorIndex,
                                "none");
                        B || (B = {
                            padding: c.padding,
                            r: c.borderRadius
                        }, b.styledMode || (B.fill = c.backgroundColor, B.stroke = c.borderColor || n.color || A.color || "#333333", B["stroke-width"] = c.borderWidth), e.tt = B = g.label(null, null, null, (n.isHeader ? c.headerShape : c.shape) || "callout", null, null, c.useHTML).addClass("highcharts-tooltip-box " + H).attr(B).add(k));
                        B.isActive = !0;
                        B.attr({
                            text: a
                        });
                        b.styledMode || B.css(c.style).shadow(c.shadow);
                        a = B.getBBox();
                        A = a.width + B.strokeWidth();
                        n.isHeader ? (w = a.height, b.xAxis[0].opposite && (z = !0, p -= w), A =
                            Math.max(0, Math.min(n.plotX + b.plotLeft - A / 2, b.chartWidth + (b.scrollablePixels ? b.scrollablePixels - b.marginRight : 0) - A))) : A = n.plotX + b.plotLeft - q(c.distance, 16) - A;
                        0 > A && (l = !1);
                        a = (n.series && n.series.yAxis && n.series.yAxis.pos) + (n.plotY || 0);
                        a -= p;
                        n.isHeader && (a = z ? -w : b.plotHeight + w);
                        m.push({
                            target: a,
                            rank: n.isHeader ? 1 : 0,
                            size: e.tt.getBBox().height + 1,
                            point: n,
                            x: A,
                            tt: B
                        })
                    }
                });
                this.cleanSplit();
                c.positioner && m.forEach(function(a) {
                    var b = c.positioner.call(d, a.tt.getBBox().width, a.size, a.point);
                    a.x = b.x;
                    a.align = 0;
                    a.target =
                        b.y;
                    a.rank = q(b.rank, a.rank)
                });
                a.distribute(m, b.plotHeight + w);
                m.forEach(function(a) {
                    var g = a.point,
                        e = g.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: l || g.isHeader || c.positioner ? a.x : g.plotX + b.plotLeft + d.distance,
                        y: a.pos + p,
                        anchorX: g.isHeader ? g.plotX + b.plotLeft : g.plotX + e.xAxis.pos,
                        anchorY: g.isHeader ? b.plotTop + b.plotHeight / 2 : g.plotY + e.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var e = this.chart,
                    d = this.getLabel(),
                    m = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a),
                    b = a.plotX + e.plotLeft;
                a = a.plotY + e.plotTop;
                var g;
                this.outside && (g = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(d.width + g, d.height + g, !1), b += e.pointer.chartPosition.left - m.x, a += e.pointer.chartPosition.top - m.y);
                this.move(Math.round(m.x), Math.round(m.y || 0), b, a)
            },
            getDateFormat: function(a, e, d, m) {
                var b = this.chart.time,
                    g = b.dateFormat("%m-%d %H:%M:%S.%L", e),
                    l, c, h = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    z = "millisecond";
                for (c in v) {
                    if (a === v.week && +b.dateFormat("%w", e) === d && "00:00:00.000" ===
                        g.substr(6)) {
                        c = "week";
                        break
                    }
                    if (v[c] > a) {
                        c = z;
                        break
                    }
                    if (h[c] && g.substr(h[c]) !== "01-01 00:00:00.000".substr(h[c])) break;
                    "week" !== c && (z = c)
                }
                c && (l = b.resolveDTLFormat(m[c]).main);
                return l
            },
            getXDateFormat: function(a, e, d) {
                e = e.dateTimeLabelFormats;
                var h = d && d.closestPointRange;
                return (h ? this.getDateFormat(h, a.x, d.options.startOfWeek, e) : e.day) || e.year
            },
            tooltipFooterHeaderFormatter: function(e, h) {
                var d = h ? "footer" : "header",
                    m = e.series,
                    b = m.tooltipOptions,
                    g = b.xDateFormat,
                    l = m.xAxis,
                    c = l && "datetime" === l.options.type && k(e.key),
                    w = b[d + "Format"];
                h = {
                    isFooter: h,
                    labelConfig: e
                };
                a.fireEvent(this, "headerFormatter", h, function(a) {
                    c && !g && (g = this.getXDateFormat(e, b, l));
                    c && g && (e.point && e.point.tooltipDateKeys || ["key"]).forEach(function(a) {
                        w = w.replace("{point." + a + "}", "{point." + a + ":" + g + "}")
                    });
                    m.chart.styledMode && (w = this.styledModeFormat(w));
                    a.text = F(w, {
                        point: e,
                        series: m
                    }, this.chart.time)
                });
                return h.text
            },
            bodyFormatter: function(a) {
                return a.map(function(a) {
                    var d = a.series.tooltipOptions;
                    return (d[(a.point.formatPrefix || "point") + "Formatter"] ||
                        a.point.tooltipFormatter).call(a.point, d[(a.point.formatPrefix || "point") + "Format"] || "")
                })
            },
            styledModeFormat: function(a) {
                return a.replace('style\x3d"font-size: 10px"', 'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class\x3d"highcharts-color-{$1.colorIndex}"')
            }
        }
    });
    K(G, "parts/Pointer.js", [G["parts/Globals.js"]], function(a) {
        var C = a.addEvent,
            I = a.attr,
            F = a.charts,
            k = a.color,
            e = a.css,
            q = a.defined,
            t = a.extend,
            u = a.find,
            v = a.fireEvent,
            p = a.isNumber,
            h = a.isObject,
            d = a.offset,
            m = a.pick,
            b = a.splat,
            g = a.Tooltip;
        a.Pointer = function(a, c) {
            this.init(a, c)
        };
        a.Pointer.prototype = {
            init: function(a, c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = c.chart.events && !!c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                g && (a.tooltip = new g(a, c.tooltip), this.followTouchMove = m(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var c = this.chart,
                    b = c.options.chart,
                    d = b.zoomType || "",
                    c = c.inverted;
                /touch/.test(a.type) && (d = m(b.pinchType, d));
                this.zoomX = a = /x/.test(d);
                this.zoomY =
                    d = /y/.test(d);
                this.zoomHor = a && !c || d && c;
                this.zoomVert = d && !c || a && c;
                this.hasZoom = a || d
            },
            normalize: function(a, c) {
                var b;
                b = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                c || (this.chartPosition = c = d(this.chart.container));
                return t(a, {
                    chartX: Math.round(b.pageX - c.left),
                    chartY: Math.round(b.pageY - c.top)
                })
            },
            getCoordinates: function(a) {
                var c = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function(b) {
                    c[b.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: b,
                        value: b.toValue(a[b.horiz ? "chartX" : "chartY"])
                    })
                });
                return c
            },
            findNearestKDPoint: function(a, c, b) {
                var d;
                a.forEach(function(a) {
                    var g = !(a.noSharedTooltip && c) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(b, g);
                    if ((g = h(a, !0)) && !(g = !h(d, !0))) var g = d.distX - a.distX,
                        l = d.dist - a.dist,
                        e = (a.series.group && a.series.group.zIndex) - (d.series.group && d.series.group.zIndex),
                        g = 0 < (0 !== g && c ? g : 0 !== l ? l : 0 !== e ? e : d.series.index > a.series.index ? -1 : 1);
                    g && (d = a)
                });
                return d
            },
            getPointFromEvent: function(a) {
                a = a.target;
                for (var c; a && !c;) c = a.point, a = a.parentNode;
                return c
            },
            getChartCoordinatesFromPoint: function(a,
                c) {
                var b = a.series,
                    d = b.xAxis,
                    b = b.yAxis,
                    g = m(a.clientX, a.plotX),
                    e = a.shapeArgs;
                if (d && b) return c ? {
                    chartX: d.len + d.pos - g,
                    chartY: b.len + b.pos - a.plotY
                } : {
                    chartX: g + d.pos,
                    chartY: a.plotY + b.pos
                };
                if (e && e.x && e.y) return {
                    chartX: e.x,
                    chartY: e.y
                }
            },
            getHoverData: function(a, c, b, d, g, e) {
                var l, n = [];
                d = !(!d || !a);
                var x = c && !c.stickyTracking ? [c] : b.filter(function(a) {
                    return a.visible && !(!g && a.directTouch) && m(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                c = (l = d ? a : this.findNearestKDPoint(x, g, e)) && l.series;
                l && (g && !c.noSharedTooltip ?
                    (x = b.filter(function(a) {
                        return a.visible && !(!g && a.directTouch) && m(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                    }), x.forEach(function(a) {
                        var c = u(a.points, function(a) {
                            return a.x === l.x && !a.isNull
                        });
                        h(c) && (a.chart.isBoosting && (c = a.getPoint(c)), n.push(c))
                    })) : n.push(l));
                return {
                    hoverPoint: l,
                    hoverSeries: c,
                    hoverPoints: n
                }
            },
            runPointActions: function(b, c) {
                var d = this.chart,
                    g = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
                    e = g ? g.shared : !1,
                    l = c || d.hoverPoint,
                    h = l && l.series || d.hoverSeries,
                    h = this.getHoverData(l,
                        h, d.series, "touchmove" !== b.type && (!!c || h && h.directTouch && this.isDirectTouch), e, b),
                    n = [],
                    x, l = h.hoverPoint;
                x = h.hoverPoints;
                c = (h = h.hoverSeries) && h.tooltipOptions.followPointer;
                e = e && h && !h.noSharedTooltip;
                if (l && (l !== d.hoverPoint || g && g.isHidden)) {
                    (d.hoverPoints || []).forEach(function(a) {
                        -1 === x.indexOf(a) && a.setState()
                    });
                    if (d.hoverSeries !== h) h.onMouseOver();
                    n = this.getActiveSeries(x);
                    d.series.forEach(function(a) {
                        (a.options.inactiveOtherPoints || -1 === n.indexOf(a)) && a.setState("inactive", !0)
                    });
                    (x || []).forEach(function(a) {
                        a.setState("hover")
                    });
                    d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
                    if (!l.series) return;
                    l.firePointEvent("mouseOver");
                    d.hoverPoints = x;
                    d.hoverPoint = l;
                    g && g.refresh(e ? x : l, b)
                } else c && g && !g.isHidden && (l = g.getAnchor([{}], b), g.updatePosition({
                    plotX: l[0],
                    plotY: l[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = C(d.container.ownerDocument, "mousemove", function(c) {
                    var b = F[a.hoverChartIndex];
                    if (b) b.pointer.onDocumentMouseMove(c)
                }));
                d.axes.forEach(function(c) {
                    var d = m(c.crosshair.snap, !0),
                        g = d ? a.find(x, function(a) {
                            return a.series[c.coll] ===
                                c
                        }) : void 0;
                    g || !d ? c.drawCrosshair(b, g) : c.hideCrosshair()
                })
            },
            getActiveSeries: function(a) {
                var c = [],
                    b;
                (a || []).forEach(function(a) {
                    b = a.series;
                    c.push(b);
                    b.linkedParent && c.push(b.linkedParent);
                    b.linkedSeries && (c = c.concat(b.linkedSeries));
                    b.navigatorSeries && c.push(b.navigatorSeries)
                });
                return c
            },
            reset: function(a, c) {
                var d = this.chart,
                    g = d.hoverSeries,
                    e = d.hoverPoint,
                    l = d.hoverPoints,
                    h = d.tooltip,
                    n = h && h.shared ? l : e;
                a && n && b(n).forEach(function(c) {
                    c.series.isCartesian && void 0 === c.plotX && (a = !1)
                });
                if (a) h && n && b(n).length &&
                    (h.refresh(n), h.shared && l ? l.forEach(function(a) {
                        a.setState(a.state, !0);
                        a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                    }) : e && (e.setState(e.state, !0), d.axes.forEach(function(a) {
                        a.crosshair && a.drawCrosshair(null, e)
                    })));
                else {
                    if (e) e.onMouseOut();
                    l && l.forEach(function(a) {
                        a.setState()
                    });
                    if (g) g.onMouseOut();
                    h && h.hide(c);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    d.axes.forEach(function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = d.hoverPoints = d.hoverPoint = null
                }
            },
            scaleGroups: function(a, c) {
                var b = this.chart,
                    d;
                b.series.forEach(function(g) {
                    d = a || g.getPlotBox();
                    g.xAxis && g.xAxis.zoomEnabled && g.group && (g.group.attr(d), g.markerGroup && (g.markerGroup.attr(d), g.markerGroup.clip(c ? b.clipRect : null)), g.dataLabelsGroup && g.dataLabelsGroup.attr(d))
                });
                b.clipRect.attr(c || b.clipBox)
            },
            dragStart: function(a) {
                var c = this.chart;
                c.mouseIsDown = a.type;
                c.cancelClick = !1;
                c.mouseDownX = this.mouseDownX = a.chartX;
                c.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var c = this.chart,
                    b = c.options.chart,
                    d = a.chartX,
                    g = a.chartY,
                    e = this.zoomHor,
                    l = this.zoomVert,
                    n = c.plotLeft,
                    h = c.plotTop,
                    m = c.plotWidth,
                    E = c.plotHeight,
                    p, f = this.selectionMarker,
                    r = this.mouseDownX,
                    q = this.mouseDownY,
                    t = b.panKey && a[b.panKey + "Key"];
                f && f.touch || (d < n ? d = n : d > n + m && (d = n + m), g < h ? g = h : g > h + E && (g = h + E), this.hasDragged = Math.sqrt(Math.pow(r - d, 2) + Math.pow(q - g, 2)), 10 < this.hasDragged && (p = c.isInsidePlot(r - n, q - h), c.hasCartesianSeries && (this.zoomX || this.zoomY) && p && !t && !f && (this.selectionMarker = f = c.renderer.rect(n,
                    h, e ? 1 : m, l ? 1 : E, 0).attr({
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add(), c.styledMode || f.attr({
                    fill: b.selectionMarkerFill || k("#335cad").setOpacity(.25).get()
                })), f && e && (d -= r, f.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + r
                })), f && l && (d = g - q, f.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + q
                })), p && !f && b.panning && c.pan(a, b.panning)))
            },
            drop: function(a) {
                var c = this,
                    b = this.chart,
                    d = this.hasPinched;
                if (this.selectionMarker) {
                    var g = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        l = this.selectionMarker,
                        h = l.attr ? l.attr("x") : l.x,
                        n = l.attr ?
                        l.attr("y") : l.y,
                        m = l.attr ? l.attr("width") : l.width,
                        B = l.attr ? l.attr("height") : l.height,
                        k;
                    if (this.hasDragged || d) b.axes.forEach(function(b) {
                        if (b.zoomEnabled && q(b.min) && (d || c[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[b.coll]])) {
                            var f = b.horiz,
                                e = "touchend" === a.type ? b.minPixelPadding : 0,
                                l = b.toValue((f ? h : n) + e),
                                f = b.toValue((f ? h + m : n + B) - e);
                            g[b.coll].push({
                                axis: b,
                                min: Math.min(l, f),
                                max: Math.max(l, f)
                            });
                            k = !0
                        }
                    }), k && v(b, "selection", g, function(a) {
                        b.zoom(t(a, d ? {
                            animation: !1
                        } : null))
                    });
                    p(b.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    d && this.scaleGroups()
                }
                b && p(b.index) && (e(b.container, {
                    cursor: b._cursor
                }), b.cancelClick = 10 < this.hasDragged, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(b) {
                F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function(a) {
                var c = this.chart,
                    b = this.chartPosition;
                a = this.normalize(a, b);
                !b ||
                    this.inClass(a.target, "highcharts-tracker") || c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(b) {
                var c = F[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(b) {
                var c = this.chart;
                q(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.preventDefault || (b.returnValue = !1);
                "mousedown" === c.mouseIsDown &&
                    this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            },
            inClass: function(a, c) {
                for (var b; a;) {
                    if (b = I(a, "class")) {
                        if (-1 !== b.indexOf(c)) return !0;
                        if (-1 !== b.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var c = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!c || !a || c.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a,
                        "highcharts-series-" + c.index) && this.inClass(a, "highcharts-tracker"))) c.onMouseOut()
            },
            onContainerClick: function(a) {
                var c = this.chart,
                    b = c.hoverPoint,
                    d = c.plotLeft,
                    g = c.plotTop;
                a = this.normalize(a);
                c.cancelClick || (b && this.inClass(a.target, "highcharts-tracker") ? (v(b.series, "click", t(a, {
                    point: b
                })), c.hoverPoint && b.firePointEvent("click", a)) : (t(a, this.getCoordinates(a)), c.isInsidePlot(a.chartX - d, a.chartY - g) && v(c, "click", a)))
            },
            setDOMEvents: function() {
                var b = this,
                    c = b.chart.container,
                    d = c.ownerDocument;
                c.onmousedown =
                    function(a) {
                        b.onContainerMouseDown(a)
                    };
                c.onmousemove = function(a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function(a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = C(c, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = C(d, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (c.ontouchstart = function(a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function(a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = C(d, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function() {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function(a, d) {
                    b[d] = null
                })
            }
        }
    });
    K(G, "parts/TouchPointer.js", [G["parts/Globals.js"]], function(a) {
        var C = a.charts,
            I = a.extend,
            F = a.noop,
            k = a.pick;
        I(a.Pointer.prototype, {
            pinchTranslate: function(a,
                k, t, u, v, p) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, k, t, u, v, p);
                this.zoomVert && this.pinchTranslateDirection(!1, a, k, t, u, v, p)
            },
            pinchTranslateDirection: function(a, k, t, u, v, p, h, d) {
                var e = this.chart,
                    b = a ? "x" : "y",
                    g = a ? "X" : "Y",
                    l = "chart" + g,
                    c = a ? "width" : "height",
                    w = e["plot" + (a ? "Left" : "Top")],
                    z, q, D = d || 1,
                    A = e.inverted,
                    n = e.bounds[a ? "h" : "v"],
                    x = 1 === k.length,
                    B = k[0][l],
                    E = t[0][l],
                    H = !x && k[1][l],
                    f = !x && t[1][l],
                    r;
                t = function() {
                    !x && 20 < Math.abs(B - H) && (D = d || Math.abs(E - f) / Math.abs(B - H));
                    q = (w - E) / D + B;
                    z = e["plot" + (a ? "Width" : "Height")] /
                        D
                };
                t();
                k = q;
                k < n.min ? (k = n.min, r = !0) : k + z > n.max && (k = n.max - z, r = !0);
                r ? (E -= .8 * (E - h[b][0]), x || (f -= .8 * (f - h[b][1])), t()) : h[b] = [E, f];
                A || (p[b] = q - w, p[c] = z);
                p = A ? 1 / D : D;
                v[c] = z;
                v[b] = k;
                u[A ? a ? "scaleY" : "scaleX" : "scale" + g] = D;
                u["translate" + g] = p * w + (E - p * B)
            },
            pinch: function(a) {
                var e = this,
                    t = e.chart,
                    u = e.pinchDown,
                    v = a.touches,
                    p = v.length,
                    h = e.lastValidTouch,
                    d = e.hasZoom,
                    m = e.selectionMarker,
                    b = {},
                    g = 1 === p && (e.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || e.runChartClick),
                    l = {};
                1 < p && (e.initiated = !0);
                d && e.initiated && !g &&
                    a.preventDefault();
                [].map.call(v, function(a) {
                    return e.normalize(a)
                });
                "touchstart" === a.type ? ([].forEach.call(v, function(a, b) {
                        u[b] = {
                            chartX: a.chartX,
                            chartY: a.chartY
                        }
                    }), h.x = [u[0].chartX, u[1] && u[1].chartX], h.y = [u[0].chartY, u[1] && u[1].chartY], t.axes.forEach(function(a) {
                        if (a.zoomEnabled) {
                            var b = t.bounds[a.horiz ? "h" : "v"],
                                c = a.minPixelPadding,
                                d = a.toPixels(k(a.options.min, a.dataMin)),
                                g = a.toPixels(k(a.options.max, a.dataMax)),
                                e = Math.max(d, g);
                            b.min = Math.min(a.pos, Math.min(d, g) - c);
                            b.max = Math.max(a.pos + a.len, e + c)
                        }
                    }),
                    e.res = !0) : e.followTouchMove && 1 === p ? this.runPointActions(e.normalize(a)) : u.length && (m || (e.selectionMarker = m = I({
                    destroy: F,
                    touch: !0
                }, t.plotBox)), e.pinchTranslate(u, v, b, m, l, h), e.hasPinched = d, e.scaleGroups(b, l), e.res && (e.res = !1, this.reset(!1, 0)))
            },
            touch: function(e, q) {
                var t = this.chart,
                    u, v;
                if (t.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = t.index;
                1 === e.touches.length ? (e = this.normalize(e), (v = t.isInsidePlot(e.chartX - t.plotLeft, e.chartY - t.plotTop)) && !t.openMenu ?
                    (q && this.runPointActions(e), "touchmove" === e.type && (q = this.pinchDown, u = q[0] ? 4 <= Math.sqrt(Math.pow(q[0].chartX - e.chartX, 2) + Math.pow(q[0].chartY - e.chartY, 2)) : !1), k(u, !0) && this.pinch(e)) : q && this.reset()) : 2 === e.touches.length && this.pinch(e)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(e) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(e)
            }
        })
    });
    K(G, "parts/MSPointer.js", [G["parts/Globals.js"]], function(a) {
        var C =
            a.addEvent,
            I = a.charts,
            F = a.css,
            k = a.doc,
            e = a.extend,
            q = a.noop,
            t = a.Pointer,
            u = a.removeEvent,
            v = a.win,
            p = a.wrap;
        if (!a.hasTouch && (v.PointerEvent || v.MSPointerEvent)) {
            var h = {},
                d = !!v.PointerEvent,
                m = function() {
                    var b = [];
                    b.item = function(a) {
                        return this[a]
                    };
                    a.objectEach(h, function(a) {
                        b.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return b
                },
                b = function(b, d, c, e) {
                    "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !I[a.hoverChartIndex] || (e(b), e = I[a.hoverChartIndex].pointer, e[d]({
                        type: c,
                        target: b.currentTarget,
                        preventDefault: q,
                        touches: m()
                    }))
                };
            e(t.prototype, {
                onContainerPointerDown: function(a) {
                    b(a, "onContainerTouchStart", "touchstart", function(a) {
                        h[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    b(a, "onContainerTouchMove", "touchmove", function(a) {
                        h[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        h[a.pointerId].target || (h[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    b(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete h[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, d ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, d ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(k, d ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            p(t.prototype, "init", function(a, b, c) {
                a.call(this, b, c);
                this.hasZoom && F(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            p(t.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            p(t.prototype, "destroy", function(a) {
                this.batchMSEvents(u);
                a.call(this)
            })
        }
    });
    K(G, "parts/Legend.js", [G["parts/Globals.js"]], function(a) {
        var C = a.addEvent,
            I = a.css,
            F = a.discardElement,
            k = a.defined,
            e = a.fireEvent,
            q = a.isFirefox,
            t = a.marginNames,
            u = a.merge,
            v = a.pick,
            p = a.setAnimation,
            h = a.stableSort,
            d = a.win,
            m = a.wrap;
        a.Legend = function(a, d) {
            this.init(a, d)
        };
        a.Legend.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.setOptions(d);
                d.enabled && (this.render(), C(this.chart, "endResize", function() {
                        this.legend.positionCheckboxes()
                    }),
                    this.proximate ? this.unchartrender = C(this.chart, "render", function() {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
            },
            setOptions: function(a) {
                var b = v(a.padding, 8);
                this.options = a;
                this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = u(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.symbolWidth = v(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout &&
                    !this.chart.inverted
            },
            update: function(a, d) {
                var b = this.chart;
                this.setOptions(u(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                v(d, !0) && b.redraw();
                e(this, "afterUpdate")
            },
            colorizeItem: function(a, d) {
                a.legendGroup[d ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var b = this.options,
                        c = a.legendItem,
                        g = a.legendLine,
                        h = a.legendSymbol,
                        m = this.itemHiddenStyle.color,
                        b = d ? b.itemStyle.color : m,
                        k = d ? a.color || m : m,
                        p = a.options && a.options.marker,
                        n = {
                            fill: k
                        };
                    c && c.css({
                        fill: b,
                        color: b
                    });
                    g && g.attr({
                        stroke: k
                    });
                    h && (p && h.isMarker && (n = a.pointAttribs(), d || (n.stroke = n.fill = m)), h.attr(n))
                }
                e(this, "afterColorizeItem", {
                    item: a,
                    visible: d
                })
            },
            positionItems: function() {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function(a) {
                var b = this.options,
                    d = b.symbolPadding,
                    b = !b.rtl,
                    c = a._legendItemPos,
                    e = c[0],
                    c = c[1],
                    h = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[k(a.translateY) ? "animate" : "attr"]({
                    translateX: b ? e : this.legendWidth - e - 2 * d - 4,
                    translateY: c
                });
                h && (h.x = e, h.y = c)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && F(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                this.getAllItems().forEach(function(b) {
                    ["legendItem", "legendGroup"].forEach(a, b)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a, this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    d, e = this.clipHeight || this.legendHeight,
                    c = this.titleHeight;
                a && (d = a.translateY, this.allItems.forEach(function(b) {
                    var g = b.checkbox,
                        h;
                    g && (h = d + c + g.y + (this.scrollOffset || 0) + 3, I(g, {
                        left: a.translateX + b.checkboxOffset + g.x - 20 + "px",
                        top: h + "px",
                        display: this.proximate || h > d - 6 && h < d + e - 6 ? "" : "none"
                    }))
                }, this))
            },
            renderTitle: function() {
                var a = this.options,
                    d = this.padding,
                    e = a.title,
                    c = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, d - 3, d - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                        zIndex: 1
                    }),
                    this.chart.styledMode || this.title.css(e.style), this.title.add(this.group)), e.width || this.title.css({
                    width: this.maxLegendWidth + "px"
                }), a = this.title.getBBox(), c = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: c
                }));
                this.titleHeight = c
            },
            setText: function(b) {
                var d = this.options;
                b.legendItem.attr({
                    text: d.labelFormat ? a.format(d.labelFormat, b, this.chart.time) : d.labelFormatter.call(b)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    d = b.renderer,
                    c = this.options,
                    e = this.symbolWidth,
                    h = c.symbolPadding,
                    m = this.itemStyle,
                    k = this.itemHiddenStyle,
                    p = "horizontal" === c.layout ? v(c.itemDistance, 20) : 0,
                    n = !c.rtl,
                    x = a.legendItem,
                    B = !a.series,
                    E = !B && a.series.drawLegendSymbol ? a.series : a,
                    H = E.options,
                    H = this.createCheckboxForItem && H && H.showCheckbox,
                    p = e + h + p + (H ? 20 : 0),
                    f = c.useHTML,
                    r = a.options.className;
                x || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + E.type + "-series highcharts-color-" + a.colorIndex + (r ? " " + r : "") + (B ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = x = d.text("",
                    n ? e + h : -h, this.baseline || 0, f), b.styledMode || x.css(u(a.visible ? m : k)), x.attr({
                    align: n ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(b.styledMode ? 12 : m.fontSize, x), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, x.attr("y", this.baseline)), this.symbolHeight = c.symbolHeight || this.fontMetrics.f, E.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, x, f));
                H && !a.checkbox && this.createCheckboxForItem(a);
                this.colorizeItem(a, a.visible);
                !b.styledMode &&
                    m.width || x.css({
                        width: (c.itemWidth || this.widthOption || b.spacingBox.width) - p
                    });
                this.setText(a);
                b = x.getBBox();
                a.itemWidth = a.checkboxOffset = c.itemWidth || a.legendItemWidth || b.width + p;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            },
            layoutItem: function(a) {
                var b = this.options,
                    d = this.padding,
                    c = "horizontal" === b.layout,
                    e = a.itemHeight,
                    h = b.itemMarginBottom || 0,
                    m = this.itemMarginTop,
                    k = c ? v(b.itemDistance, 20) : 0,
                    p = this.maxLegendWidth,
                    b = b.alignColumns && this.totalItemWidth > p ? this.maxItemWidth : a.itemWidth;
                c && this.itemX - d + b > p && (this.itemX = d, this.lastLineHeight && (this.itemY += m + this.lastLineHeight + h), this.lastLineHeight = 0);
                this.lastItemY = m + this.itemY + h;
                this.lastLineHeight = Math.max(e, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                c ? this.itemX += b : (this.itemY += m + e + h, this.lastLineHeight = e);
                this.offsetWidth = this.widthOption || Math.max((c ? this.itemX - d - (a.checkbox ? 0 : k) : b) + d, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                this.chart.series.forEach(function(b) {
                    var d = b && b.options;
                    b && v(d.showInLegend, k(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ? b.data : b)))
                });
                e(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            },
            getAlignment: function() {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function(a, d) {
                var b = this.chart,
                    c = this.options,
                    g = this.getAlignment(),
                    e = void 0 !== b.options.title.margin ? b.titleOffset + b.options.title.margin : 0;
                g && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(h, l) {
                    h.test(g) && !k(a[l]) && (b[t[l]] = Math.max(b[t[l]], b.legend[(l + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][l] * c[l % 2 ? "x" : "y"] + v(c.margin, 12) + d[l] + (0 === l && (0 === b.titleOffset ? 0 : e))))
                })
            },
            proximatePositions: function() {
                var b = this.chart,
                    d = [],
                    e = "left" === this.options.align;
                this.allItems.forEach(function(c) {
                    var g, h;
                    h = e;
                    var l;
                    c.yAxis && c.points && (c.xAxis.options.reversed &&
                        (h = !h), g = a.find(h ? c.points : c.points.slice(0).reverse(), function(b) {
                            return a.isNumber(b.plotY)
                        }), h = c.legendGroup.getBBox().height, l = c.yAxis.top - b.plotTop, c.visible ? (g = g ? g.plotY : c.yAxis.height, g += l - .3 * h) : g = l + c.yAxis.height, d.push({
                            target: g,
                            size: h,
                            item: c
                        }))
                }, this);
                a.distribute(d, b.plotHeight);
                d.forEach(function(a) {
                    a.item._legendItemPos[1] = b.plotTop - b.spacing[0] + a.pos
                })
            },
            render: function() {
                var b = this.chart,
                    d = b.renderer,
                    l = this.group,
                    c, m, k, p = this.box,
                    q = this.options,
                    A = this.padding;
                this.itemX = A;
                this.itemY =
                    this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = a.relativeLength(q.width, b.spacingBox.width - A);
                c = b.spacingBox.width - 2 * A - q.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (c /= 2);
                this.maxLegendWidth = this.widthOption || c;
                l || (this.group = l = d.g("legend").attr({
                    zIndex: 7
                }).add(), this.contentGroup = d.g().attr({
                    zIndex: 1
                }).add(l), this.scrollGroup = d.g().add(this.contentGroup));
                this.renderTitle();
                c = this.getAllItems();
                h(c, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) -
                        (b.options && b.options.legendIndex || 0)
                });
                q.reversed && c.reverse();
                this.allItems = c;
                this.display = m = !!c.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                c.forEach(this.renderItem, this);
                c.forEach(this.layoutItem, this);
                c = (this.widthOption || this.offsetWidth) + A;
                k = this.lastItemY + this.lastLineHeight + this.titleHeight;
                k = this.handleOverflow(k);
                k += A;
                p || (this.box = p = d.rect().addClass("highcharts-legend-box").attr({
                    r: q.borderRadius
                }).add(l), p.isNew = !0);
                b.styledMode || p.attr({
                    stroke: q.borderColor,
                    "stroke-width": q.borderWidth || 0,
                    fill: q.backgroundColor || "none"
                }).shadow(q.shadow);
                0 < c && 0 < k && (p[p.isNew ? "attr" : "animate"](p.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: c,
                    height: k
                }, p.strokeWidth())), p.isNew = !1);
                p[m ? "show" : "hide"]();
                b.styledMode && "none" === l.getStyle("display") && (c = k = 0);
                this.legendWidth = c;
                this.legendHeight = k;
                m && (d = b.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (p = d.y + b.titleOffset, d = u(d, {
                    y: 0 < b.titleOffset ? p += b.options.title.margin : p
                })), l.align(u(q, {
                    width: c,
                    height: k,
                    verticalAlign: this.proximate ?
                        "top" : q.verticalAlign
                }), !0, d));
                this.proximate || this.positionItems();
                e(this, "afterRender")
            },
            handleOverflow: function(a) {
                var b = this,
                    d = this.chart,
                    c = d.renderer,
                    e = this.options,
                    h = e.y,
                    m = this.padding,
                    h = d.spacingBox.height + ("top" === e.verticalAlign ? -h : h) - m,
                    k = e.maxHeight,
                    p, n = this.clipRect,
                    x = e.navigation,
                    B = v(x.animation, !0),
                    E = x.arrowSize || 12,
                    H = this.nav,
                    f = this.pages,
                    r, q = this.allItems,
                    t = function(a) {
                        "number" === typeof a ? n.attr({
                            height: a
                        }) : n && (b.clipRect = n.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip =
                            a ? "rect(" + m + "px,9999px," + (m + a) + "px,0)" : "auto")
                    },
                    L = function(a) {
                        b[a] = c.circle(0, 0, 1.3 * E).translate(E / 2, E / 2).add(H);
                        d.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)");
                        return b[a]
                    };
                "horizontal" !== e.layout || "middle" === e.verticalAlign || e.floating || (h /= 2);
                k && (h = Math.min(h, k));
                f.length = 0;
                a > h && !1 !== x.enabled ? (this.clipHeight = p = Math.max(h - 20 - this.titleHeight - m, 0), this.currentPage = v(this.currentPage, 1), this.fullHeight = a, q.forEach(function(a, b) {
                    var c = a._legendItemPos[1],
                        d = Math.round(a.legendItem.getBBox().height),
                        e = f.length;
                    if (!e || c - f[e - 1] > p && (r || c) !== f[e - 1]) f.push(r || c), e++;
                    a.pageIx = e - 1;
                    r && (q[b - 1].pageIx = e - 1);
                    b === q.length - 1 && c + d - f[e - 1] > p && c !== r && (f.push(c), a.pageIx = e);
                    c !== r && (r = c)
                }), n || (n = b.clipRect = c.clipRect(0, m, 9999, 0), b.contentGroup.clip(n)), t(p), H || (this.nav = H = c.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = c.symbol("triangle", 0, 0, E, E).add(H), L("upTracker").on("click", function() {
                        b.scroll(-1, B)
                    }), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation"), d.styledMode || this.pager.css(x.style),
                    this.pager.add(H), this.down = c.symbol("triangle-down", 0, 0, E, E).add(H), L("downTracker").on("click", function() {
                        b.scroll(1, B)
                    })), b.scroll(0), a = h) : H && (t(), this.nav = H.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, d) {
                var b = this.pages,
                    c = b.length,
                    e = this.currentPage + a;
                a = this.clipHeight;
                var g = this.options.navigation,
                    h = this.pager,
                    m = this.padding;
                e > c && (e = c);
                0 < e && (void 0 !== d && p(d, this.chart), this.nav.attr({
                    translateX: m,
                    translateY: a + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), [this.up, this.upTracker].forEach(function(a) {
                    a.attr({
                        "class": 1 === e ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }), h.attr({
                    text: e + "/" + c
                }), [this.down, this.downTracker].forEach(function(a) {
                    a.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": e === c ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }, this), this.chart.styledMode || (this.up.attr({
                    fill: 1 === e ? g.inactiveColor : g.activeColor
                }), this.upTracker.css({
                    cursor: 1 === e ? "default" : "pointer"
                }), this.down.attr({
                    fill: e ===
                        c ? g.inactiveColor : g.activeColor
                }), this.downTracker.css({
                    cursor: e === c ? "default" : "pointer"
                })), this.scrollOffset = -b[e - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = e, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, d) {
                var b = a.symbolHeight,
                    c = a.options.squareSymbol;
                d.legendSymbol = this.chart.renderer.rect(c ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, c ? b : a.symbolWidth, b, v(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(d.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options,
                    d = b.marker,
                    c = a.symbolWidth,
                    e = a.symbolHeight,
                    h = e / 2,
                    m = this.chart.renderer,
                    k = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var p = {};
                this.chart.styledMode || (p = {
                    "stroke-width": b.lineWidth || 0
                }, b.dashStyle && (p.dashstyle = b.dashStyle));
                this.legendLine = m.path(["M", 0, a, "L", c, a]).addClass("highcharts-graph").attr(p).add(k);
                d && !1 !== d.enabled && c && (b = Math.min(v(d.radius, h), h), 0 === this.symbol.indexOf("url") && (d = u(d, {
                        width: e,
                        height: e
                    }), b = 0), this.legendSymbol =
                    d = m.symbol(this.symbol, c / 2 - b, a - b, 2 * b, 2 * b, d).addClass("highcharts-point").add(k), d.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(d.navigator && d.navigator.userAgent) || q) && m(a.Legend.prototype, "positionItem", function(a, d) {
            var b = this,
                c = function() {
                    d._legendItemPos && a.call(b, d)
                };
            c();
            b.bubbleLegend || setTimeout(c)
        })
    });
    K(G, "parts/Chart.js", [G["parts/Globals.js"]], function(a) {
        var C = a.addEvent,
            I = a.animate,
            F = a.animObject,
            k = a.attr,
            e = a.doc,
            q = a.Axis,
            t = a.createElement,
            u = a.defaultOptions,
            v = a.discardElement,
            p = a.charts,
            h = a.css,
            d = a.defined,
            m = a.extend,
            b = a.find,
            g = a.fireEvent,
            l = a.isNumber,
            c = a.isObject,
            w = a.isString,
            z = a.Legend,
            J = a.marginNames,
            D = a.merge,
            A = a.objectEach,
            n = a.Pointer,
            x = a.pick,
            B = a.pInt,
            E = a.removeEvent,
            H = a.seriesTypes,
            f = a.splat,
            r = a.syncTimeout,
            N = a.win,
            M = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, b, c) {
            return new M(a, b, c)
        };
        m(M.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (w(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b,
                d) {
                var f, e = b.series,
                    n = b.plotOptions || {};
                g(this, "init", {
                    args: arguments
                }, function() {
                    b.series = null;
                    f = D(u, b);
                    A(f.plotOptions, function(a, b) {
                        c(a) && (a.tooltip = n[b] && D(n[b].tooltip) || void 0)
                    });
                    f.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    f.series = b.series = e;
                    this.userOptions = b;
                    var h = f.chart,
                        m = h.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = d;
                    this.isResizing = 0;
                    this.options = f;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time &&
                        Object.keys(b.time).length ? new a.Time(b.time) : a.time;
                    this.styledMode = h.styledMode;
                    this.hasCartesianSeries = h.showAxes;
                    var l = this;
                    l.index = p.length;
                    p.push(l);
                    a.chartCount++;
                    m && A(m, function(a, b) {
                        C(l, b, a)
                    });
                    l.xAxis = [];
                    l.yAxis = [];
                    l.pointCount = l.colorCounter = l.symbolCounter = 0;
                    g(l, "afterInit");
                    l.firstRender()
                })
            },
            initSeries: function(b) {
                var c = this.options.chart;
                (c = H[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0, this);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function(a) {
                var b = this.series;
                for (a = a ||
                    0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function(a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                g(this, "beforeRedraw");
                var c = this.axes,
                    d = this.series,
                    f = this.pointer,
                    e = this.legend,
                    n = this.userOptions.legend,
                    h = this.isDirtyLegend,
                    l, x, r = this.hasCartesianSeries,
                    B = this.isDirtyBox,
                    k, p = this.renderer,
                    E = p.isHidden(),
                    w = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                E && this.temporaryDisplay();
                this.layOutTitles();
                for (b = d.length; b--;)
                    if (k = d[b], k.options.stacking && (l = !0, k.isDirty)) {
                        x = !0;
                        break
                    }
                if (x)
                    for (b = d.length; b--;) k = d[b], k.options.stacking && (k.isDirty = !0);
                d.forEach(function(a) {
                    a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), h = !0) : n && (n.labelFormatter || n.labelFormat) && (h = !0));
                    a.isDirtyData && g(a, "updatedData")
                });
                h && e && e.options.enabled && (e.render(), this.isDirtyLegend = !1);
                l && this.getStacks();
                r && c.forEach(function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                r && (c.forEach(function(a) {
                    a.isDirty &&
                        (B = !0)
                }), c.forEach(function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, w.push(function() {
                        g(a, "afterSetExtremes", m(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (B || l) && a.redraw()
                }));
                B && this.drawChartBox();
                g(this, "predraw");
                d.forEach(function(a) {
                    (B || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                f && f.reset(!0);
                p.draw();
                g(this, "redraw");
                g(this, "render");
                E && this.temporaryDisplay(!0);
                w.forEach(function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function c(b) {
                    return b.id === a || b.options && b.options.id ===
                        a
                }
                var d, f = this.series,
                    e;
                d = b(this.axes, c) || b(this.series, c);
                for (e = 0; !d && e < f.length; e++) d = b(f[e].points || [], c);
                return d
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = f(b.xAxis || {}),
                    b = b.yAxis = f(b.yAxis || {});
                g(this, "getAxes");
                c.forEach(function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                b.forEach(function(a, b) {
                    a.index = b
                });
                c.concat(b).forEach(function(b) {
                    new q(a, b)
                });
                g(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var a = [];
                this.series.forEach(function(b) {
                    a = a.concat((b[b.hasGroupedData ? "points" : "data"] || []).filter(function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return this.series.filter(function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, c) {
                var d = this,
                    f = d.options,
                    e = d.styledMode,
                    g;
                g = f.title = D(!e && {
                    style: {
                        color: "#333333",
                        fontSize: f.isStock ? "16px" : "18px"
                    }
                }, f.title, a);
                f = f.subtitle = D(!e && {
                    style: {
                        color: "#666666"
                    }
                }, f.subtitle, b);
                [
                    ["title", a, g],
                    ["subtitle", b, f]
                ].forEach(function(a, b) {
                    var c = a[0],
                        f = d[c],
                        g = a[1];
                    a = a[2];
                    f && g && (d[c] = f = f.destroy());
                    a && !f && (d[c] = d.renderer.text(a.text,
                        0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function(a) {
                        d.setTitle(!b && a, b && a)
                    }, e || d[c].css(a.style))
                });
                d.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, d = this.renderer,
                    f = this.spacingBox;
                ["title", "subtitle"].forEach(function(a) {
                    var c = this[a],
                        e = this.options[a];
                    a = "title" === a ? -3 : e.verticalAlign ? 0 : b + 2;
                    var g;
                    c && (this.styledMode || (g = e.style.fontSize), g = d.fontMetrics(g, c).b, c.css({
                        width: (e.width || f.width + e.widthAdjust) + "px"
                    }).align(m({
                        y: a + g
                    }, e), !1, "spacingBox"), e.floating || e.verticalAlign || (b = Math.ceil(b + c.getBBox(e.useHTML).height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && x(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    f = this.renderTo;
                d(c) || (this.containerWidth = a.getStyle(f, "width"));
                d(b) || (this.containerHeight = a.getStyle(f, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (e.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        e.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, e.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === e.body) break
                    }
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var b, c = this.options,
                    d = c.chart,
                    f, n;
                b = this.renderTo;
                var x = a.uniqueKey(),
                    r, E;
                b || (this.renderTo = b = d.renderTo);
                w(b) && (this.renderTo = b = e.getElementById(b));
                b || a.error(13, !0, this);
                f = B(k(b, "data-highcharts-chart"));
                l(f) && p[f] && p[f].hasRendered && p[f].destroy();
                k(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                d.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                f = this.chartWidth;
                n = this.chartHeight;
                h(b, {
                    overflow: "hidden"
                });
                this.styledMode || (r = m({
                    position: "relative",
                    overflow: "hidden",
                    width: f + "px",
                    height: n + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, d.style));
                this.container = b = t("div", {
                        id: x
                    }, r,
                    b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[d.renderer] || a.Renderer)(b, f, n, null, d.forExport, c.exporting && c.exporting.allowHTML, this.styledMode);
                this.setClassName(d.className);
                if (this.styledMode)
                    for (E in c.defs) this.renderer.definition(c.defs[E]);
                else this.renderer.setStyle(d.style);
                this.renderer.chartIndex = this.index;
                g(this, "afterGetContainer")
            },
            getMargins: function(a) {
                var b = this.spacing,
                    c = this.margin,
                    f = this.titleOffset;
                this.resetMargins();
                f && !d(c[0]) && (this.plotTop = Math.max(this.plotTop, f +
                    this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(c, b);
                g(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && a.axes.forEach(function(a) {
                    a.visible && a.getOffset()
                });
                J.forEach(function(f, e) {
                    d(c[e]) || (a[f] += b[e])
                });
                a.setChartSize()
            },
            reflow: function(b) {
                var c = this,
                    f = c.options.chart,
                    g = c.renderTo,
                    n = d(f.width) && d(f.height),
                    h = f.width || a.getStyle(g, "width"),
                    f = f.height || a.getStyle(g,
                        "height"),
                    g = b ? b.target : N;
                if (!n && !c.isPrinting && h && f && (g === N || g === e)) {
                    if (h !== c.containerWidth || f !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = r(function() {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    c.containerWidth = h;
                    c.containerHeight = f
                }
            },
            setReflow: function(a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = C(N, "resize", function(a) {
                    b.reflow(a)
                }), C(this, "destroy", this.unbindReflow))
            },
            setSize: function(b,
                c, d) {
                var f = this,
                    e = f.renderer,
                    n;
                f.isResizing += 1;
                a.setAnimation(d, f);
                f.oldChartHeight = f.chartHeight;
                f.oldChartWidth = f.chartWidth;
                void 0 !== b && (f.options.chart.width = b);
                void 0 !== c && (f.options.chart.height = c);
                f.getChartSize();
                f.styledMode || (n = e.globalAnimation, (n ? I : h)(f.container, {
                    width: f.chartWidth + "px",
                    height: f.chartHeight + "px"
                }, n));
                f.setChartSize(!0);
                e.setSize(f.chartWidth, f.chartHeight, d);
                f.axes.forEach(function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                f.isDirtyLegend = !0;
                f.isDirtyBox = !0;
                f.layOutTitles();
                f.getMargins();
                f.redraw(d);
                f.oldChartHeight = null;
                g(f, "resize");
                r(function() {
                    f && g(f, "endResize", null, function() {
                        --f.isResizing
                    })
                }, F(n).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    c = this.renderer,
                    f = this.chartWidth,
                    d = this.chartHeight,
                    e = this.options.chart,
                    n = this.spacing,
                    h = this.clipOffset,
                    l, m, x, r;
                this.plotLeft = l = Math.round(this.plotLeft);
                this.plotTop = m = Math.round(this.plotTop);
                this.plotWidth = x = Math.max(0, Math.round(f - l - this.marginRight));
                this.plotHeight = r = Math.max(0, Math.round(d - m - this.marginBottom));
                this.plotSizeX =
                    b ? r : x;
                this.plotSizeY = b ? x : r;
                this.plotBorderWidth = e.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: n[3],
                    y: n[0],
                    width: f - n[3] - n[1],
                    height: d - n[0] - n[2]
                };
                this.plotBox = c.plotBox = {
                    x: l,
                    y: m,
                    width: x,
                    height: r
                };
                f = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(f, h[3]) / 2);
                c = Math.ceil(Math.max(f, h[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(f, h[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, h[2]) / 2 - c))
                };
                a || this.axes.forEach(function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                g(this, "afterSetChartSize", {
                    skipAxes: a
                })
            },
            resetMargins: function() {
                g(this, "resetMargins");
                var a = this,
                    b = a.options.chart;
                ["margin", "spacing"].forEach(function(f) {
                    var d = b[f],
                        e = c(d) ? d : [d, d, d, d];
                    ["Top", "Right", "Bottom", "Left"].forEach(function(c, d) {
                        a[f][d] = x(b[f + c], e[d])
                    })
                });
                J.forEach(function(b, c) {
                    a[b] = x(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    f = this.chartHeight,
                    d = this.chartBackground,
                    e = this.plotBackground,
                    n = this.plotBorder,
                    h, l = this.styledMode,
                    m = this.plotBGImage,
                    x = a.backgroundColor,
                    r = a.plotBackgroundColor,
                    B = a.plotBackgroundImage,
                    k, p = this.plotLeft,
                    E = this.plotTop,
                    w = this.plotWidth,
                    H = this.plotHeight,
                    z = this.plotBox,
                    A = this.clipRect,
                    q = this.clipBox,
                    t = "animate";
                d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), t = "attr");
                if (l) h = k = d.strokeWidth();
                else {
                    h = a.borderWidth || 0;
                    k = h + (a.shadow ? 8 : 0);
                    x = {
                        fill: x || "none"
                    };
                    if (h || d["stroke-width"]) x.stroke = a.borderColor, x["stroke-width"] =
                        h;
                    d.attr(x).shadow(a.shadow)
                }
                d[t]({
                    x: k / 2,
                    y: k / 2,
                    width: c - k - h % 2,
                    height: f - k - h % 2,
                    r: a.borderRadius
                });
                t = "animate";
                e || (t = "attr", this.plotBackground = e = b.rect().addClass("highcharts-plot-background").add());
                e[t](z);
                l || (e.attr({
                    fill: r || "none"
                }).shadow(a.plotShadow), B && (m ? m.animate(z) : this.plotBGImage = b.image(B, p, E, w, H).add()));
                A ? A.animate({
                    width: q.width,
                    height: q.height
                }) : this.clipRect = b.clipRect(q);
                t = "animate";
                n || (t = "attr", this.plotBorder = n = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                l || n.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                n[t](n.crisp({
                    x: p,
                    y: E,
                    width: w,
                    height: H
                }, -n.strokeWidth()));
                this.isDirtyBox = !1;
                g(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, f = a.options.series,
                    d, e;
                ["inverted", "angular", "polar"].forEach(function(g) {
                    c = H[b.type || b.defaultSeriesType];
                    e = b[g] || c && c.prototype[g];
                    for (d = f && f.length; !e && d--;)(c = H[f[d].type]) && c.prototype[g] && (e = !0);
                    a[g] = e
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                b.forEach(function(a) {
                    a.linkedSeries.length = 0
                });
                b.forEach(function(b) {
                    var c = b.options.linkedTo;
                    w(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = x(b.options.visible, c.options.visible, b.visible))
                });
                g(this, "afterLinkSeries")
            },
            renderSeries: function() {
                this.series.forEach(function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && b.items.forEach(function(c) {
                    var f = m(b.style, c.style),
                        d = B(f.left) + a.plotLeft,
                        e = B(f.top) + a.plotTop + 12;
                    delete f.left;
                    delete f.top;
                    a.renderer.text(c.html, d, e).attr({
                        zIndex: 2
                    }).css(f).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    f = 0,
                    d, e, g;
                this.setTitle();
                this.legend = new z(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                a.some(function(a) {
                    if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return f = 21, !0
                });
                d = this.plotHeight = Math.max(this.plotHeight - f, 0);
                a.forEach(function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                e = 1.1 < c / this.plotWidth;
                g = 1.05 < d / this.plotHeight;
                if (e || g) a.forEach(function(a) {
                    (a.horiz && e || !a.horiz && g) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && a.forEach(function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = D(!0,
                    this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    a.href && (N.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var b = this,
                    c = b.axes,
                    f = b.series,
                    d = b.container,
                    e, n = d && d.parentNode;
                g(b, "destroy");
                b.renderer.forExport ? a.erase(p, b) : p[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                E(b);
                for (e = c.length; e--;) c[e] = c[e].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (e = f.length; e--;) f[e] = f[e].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                d && (d.innerHTML = "", E(d), n && v(d));
                A(b, function(a, c) {
                    delete b[c]
                })
            },
            firstRender: function() {
                var b = this,
                    c = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (a.isArray(c.series) ? c.series : []).forEach(function(a) {
                        b.initSeries(a)
                    });
                    b.linkSeries();
                    g(b, "beforeRender");
                    n && (b.pointer = new n(b, c));
                    b.render();
                    if (!b.renderer.imgCount && b.onload) b.onload();
                    b.temporaryDisplay(!0)
                }
            },
            onload: function() {
                [this.callback].concat(this.callbacks).forEach(function(a) {
                    a &&
                        void 0 !== this.index && a.apply(this, [this])
                }, this);
                g(this, "load");
                g(this, "render");
                d(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    });
    K(G, "parts/ScrollablePlotArea.js", [G["parts/Globals.js"]], function(a) {
        var C = a.addEvent,
            I = a.Chart;
        C(I, "afterSetChartSize", function(C) {
            var k = this.options.chart.scrollablePlotArea;
            (k = k && k.minWidth) && !this.renderer.forExport && (this.scrollablePixels = k = Math.max(0, k - this.chartWidth)) && (this.plotWidth += k, this.clipBox.width += k, C.skipAxes || this.axes.forEach(function(e) {
                1 ===
                    e.side ? e.getPlotLinePath = function() {
                        var k = this.right,
                            t;
                        this.right = k - e.chart.scrollablePixels;
                        t = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                        this.right = k;
                        return t
                    } : (e.setAxisSize(), e.setAxisTranslation())
            }))
        });
        C(I, "render", function() {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        I.prototype.setUpScrolling = function() {
            this.scrollingContainer = a.createElement("div", {
                    className: "highcharts-scrolling"
                }, {
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch"
                },
                this.renderTo);
            this.innerContainer = a.createElement("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        I.prototype.moveFixedElements = function() {
            var a = this.container,
                k = this.fixedRenderer;
            [this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-reset-zoom",
                ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"
            ].forEach(function(e) {
                [].forEach.call(a.querySelectorAll(e), function(a) {
                    (a.namespaceURI === k.SVG_NS ? k.box : k.box.parentNode).appendChild(a);
                    a.style.pointerEvents = "auto"
                })
            })
        };
        I.prototype.applyFixed = function() {
            var F, k = !this.fixedDiv,
                e = this.options.chart.scrollablePlotArea;
            k && (this.fixedDiv = a.createElement("div", {
                className: "highcharts-fixed"
            }, {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 2
            }, null, !0), this.renderTo.insertBefore(this.fixedDiv,
                this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = F = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = F.path().attr({
                fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(a.pick(e.opacity, .85)).get(),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(), C(this, "afterShowResetZoom", this.moveFixedElements));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            F = this.chartWidth + this.scrollablePixels;
            a.stop(this.container);
            this.container.style.width = F + "px";
            this.renderer.boxWrapper.attr({
                width: F,
                height: this.chartHeight,
                viewBox: [0, 0, F, this.chartHeight].join(" ")
            });
            this.chartBackground.attr({
                width: F
            });
            k && e.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * e.scrollPositionX);
            e = this.axisOffset;
            k = this.plotTop - e[0] - 1;
            e = this.plotTop + this.plotHeight + e[2];
            F = this.plotLeft + this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({
                d: this.scrollablePixels ? ["M", 0, k, "L", this.plotLeft - 1, k, "L", this.plotLeft -
                    1, e, "L", 0, e, "Z", "M", F, k, "L", this.chartWidth, k, "L", this.chartWidth, e, "L", F, e, "Z"
                ] : ["M", 0, 0]
            })
        }
    });
    K(G, "parts/Point.js", [G["parts/Globals.js"]], function(a) {
        var C, I = a.extend,
            F = a.erase,
            k = a.fireEvent,
            e = a.format,
            q = a.isArray,
            t = a.isNumber,
            u = a.pick,
            v = a.uniqueKey,
            p = a.defined,
            h = a.removeEvent;
        a.Point = C = function() {};
        a.Point.prototype = {
            init: function(a, e, b) {
                this.series = a;
                this.applyOptions(e, b);
                this.id = p(this.id) ? this.id : v();
                this.resolveColor();
                a.chart.pointCount++;
                k(this, "afterInit");
                return this
            },
            resolveColor: function() {
                var a =
                    this.series,
                    e;
                e = a.chart.options.chart.colorCount;
                var b = a.chart.styledMode;
                b || this.options.color || (this.color = a.color);
                a.options.colorByPoint ? (b || (e = a.options.colors || a.chart.options.colors, this.color = this.color || e[a.colorCounter], e = e.length), b = a.colorCounter, a.colorCounter++, a.colorCounter === e && (a.colorCounter = 0)) : b = a.colorIndex;
                this.colorIndex = u(this.colorIndex, b)
            },
            applyOptions: function(a, e) {
                var b = this.series,
                    d = b.options.pointValKey || b.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                I(this,
                    a);
                this.options = this.options ? I(this.options, a) : a;
                a.group && delete this.group;
                a.dataLabels && delete this.dataLabels;
                d && (this.y = this[d]);
                if (this.isNull = u(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0))) this.formatPrefix = "null";
                this.selected && (this.state = "select");
                "name" in this && void 0 === e && b.xAxis && b.xAxis.hasNames && (this.x = b.xAxis.nameToX(this));
                void 0 === this.x && b && (this.x = void 0 === e ? b.autoIncrement(this) : e);
                return this
            },
            setNestedProperty: function(d, e, b) {
                b.split(".").reduce(function(b, d,
                    c, h) {
                    b[d] = h.length - 1 === c ? e : a.isObject(b[d], !0) ? b[d] : {};
                    return b[d]
                }, d);
                return d
            },
            optionsToObject: function(d) {
                var e = {},
                    b = this.series,
                    g = b.options.keys,
                    h = g || b.pointArrayMap || ["y"],
                    c = h.length,
                    k = 0,
                    p = 0;
                if (t(d) || null === d) e[h[0]] = d;
                else if (q(d))
                    for (!g && d.length > c && (b = typeof d[0], "string" === b ? e.name = d[0] : "number" === b && (e.x = d[0]), k++); p < c;) g && void 0 === d[k] || (0 < h[p].indexOf(".") ? a.Point.prototype.setNestedProperty(e, d[k], h[p]) : e[h[p]] = d[k]), k++, p++;
                else "object" === typeof d && (e = d, d.dataLabels && (b._hasPointLabels = !0), d.marker && (b._hasPointMarkers = !0));
                return e
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function() {
                var a = this.series,
                    e = a.zones,
                    a = a.zoneAxis ||
                    "y",
                    b = 0,
                    g;
                for (g = e[b]; this[a] >= g.value;) g = e[++b];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = g && g.color && !this.options.color ? g.color : this.nonZonedColor;
                return g
            },
            destroy: function() {
                var a = this.series.chart,
                    e = a.hoverPoints,
                    b;
                a.pointCount--;
                e && (this.setState(), F(e, this), e.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel || this.dataLabels) h(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (b in this) this[b] =
                    null
            },
            destroyElements: function(a) {
                var d = this,
                    b = [],
                    e, h;
                a = a || {
                    graphic: 1,
                    dataLabel: 1
                };
                a.graphic && b.push("graphic", "shadowGroup");
                a.dataLabel && b.push("dataLabel", "dataLabelUpper", "connector");
                for (h = b.length; h--;) e = b[h], d[e] && (d[e] = d[e].destroy());
                ["dataLabel", "connector"].forEach(function(b) {
                    var c = b + "s";
                    a[b] && d[c] && (d[c].forEach(function(a) {
                        a.element && a.destroy()
                    }), delete d[c])
                })
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var d = this.series,
                    b = d.tooltipOptions,
                    g = u(b.valueDecimals, ""),
                    h = b.valuePrefix || "",
                    c = b.valueSuffix || "";
                d.chart.styledMode && (a = d.chart.tooltip.styledModeFormat(a));
                (d.pointArrayMap || ["y"]).forEach(function(b) {
                    b = "{point." + b;
                    if (h || c) a = a.replace(RegExp(b + "}", "g"), h + b + "}" + c);
                    a = a.replace(RegExp(b + "}", "g"), b + ":,." + g + "f}")
                });
                return e(a, {
                    point: this,
                    series: this.series
                }, d.chart.time)
            },
            firePointEvent: function(a,
                e, b) {
                var d = this,
                    h = this.series.options;
                (h.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
                "click" === a && h.allowPointSelect && (b = function(a) {
                    d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                k(this, a, e, b)
            },
            visible: !0
        }
    });
    K(G, "parts/Series.js", [G["parts/Globals.js"]], function(a) {
        var C = a.addEvent,
            I = a.animObject,
            F = a.arrayMax,
            k = a.arrayMin,
            e = a.correctFloat,
            q = a.defaultOptions,
            t = a.defaultPlotOptions,
            u = a.defined,
            v = a.erase,
            p = a.extend,
            h = a.fireEvent,
            d = a.isArray,
            m =
            a.isNumber,
            b = a.isString,
            g = a.merge,
            l = a.objectEach,
            c = a.pick,
            w = a.removeEvent,
            z = a.splat,
            J = a.SVGElement,
            D = a.syncTimeout,
            A = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            cropShoulder: 1,
            init: function(a, b) {
                h(this, "init", {
                    options: b
                });
                var d = this,
                    e, g = a.series,
                    f;
                d.chart = a;
                d.options = b = d.setOptions(b);
                d.linkedSeries = [];
                d.bindAxes();
                p(d, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                e = b.events;
                l(e, function(a, b) {
                    d.hcEvents && d.hcEvents[b] && -1 !== d.hcEvents[b].indexOf(a) || C(d, b, a)
                });
                if (e && e.click ||
                    b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                d.parallelArrays.forEach(function(a) {
                    d[a + "Data"] || (d[a + "Data"] = [])
                });
                d.points || d.setData(b.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                g.length && (f = g[g.length - 1]);
                d._i = c(f && f._i, -1) + 1;
                a.orderSeries(this.insert(g));
                h(this, "afterInit")
            },
            insert: function(a) {
                var b = this.options.index,
                    d;
                if (m(b)) {
                    for (d = a.length; d--;)
                        if (b >= c(a[d].options.index, a[d]._i)) {
                            a.splice(d + 1, 0, this);
                            break
                        } - 1 === d &&
                        a.unshift(this);
                    d += 1
                } else a.push(this);
                return c(d, a.length - 1)
            },
            bindAxes: function() {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e;
                h(this, "bindAxes", null, function() {
                    (b.axisTypes || []).forEach(function(g) {
                        d[g].forEach(function(a) {
                            e = a.options;
                            if (c[g] === e.index || void 0 !== c[g] && c[g] === e.id || void 0 === c[g] && 0 === e.index) b.insert(a.series), b[g] = a, a.isDirty = !0
                        });
                        b[g] || b.optionalAxis === g || a.error(18, !0, d)
                    })
                })
            },
            updateParallelArrays: function(a, b) {
                var c = a.series,
                    d = arguments,
                    e = m(b) ? function(d) {
                        var f = "y" === d && c.toYData ? c.toYData(a) :
                            a[d];
                        c[d + "Data"][b] = f
                    } : function(a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                c.parallelArrays.forEach(e)
            },
            hasData: function() {
                return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.yData && 0 < this.yData.length
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    d, e = a.pointIntervalUnit,
                    g = this.chart.time,
                    b = c(b, a.pointStart, 0);
                this.pointInterval = d = c(this.pointInterval, a.pointInterval, 1);
                e && (a = new g.Date(b), "day" === e ? g.set("Date", a, g.get("Date",
                    a) + d) : "month" === e ? g.set("Month", a, g.get("Month", a) + d) : "year" === e && g.set("FullYear", a, g.get("FullYear", a) + d), d = a.getTime() - b);
                this.xIncrement = b + d;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    d = b.options,
                    e = d.plotOptions,
                    n = (b.userOptions || {}).plotOptions || {},
                    f = e[this.type],
                    l = g(a);
                a = b.styledMode;
                h(this, "setOptions", {
                    userOptions: l
                });
                this.userOptions = l;
                b = g(f, e.series, l);
                this.tooltipOptions = g(q.tooltip, q.plotOptions.series && q.plotOptions.series.tooltip, q.plotOptions[this.type].tooltip, d.tooltip.userOptions,
                    e.series && e.series.tooltip, e[this.type].tooltip, l.tooltip);
                this.stickyTracking = c(l.stickyTracking, n[this.type] && n[this.type].stickyTracking, n.series && n.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === f.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                d = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || (e = {
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative"
                }, a || (e.color = b.negativeColor,
                    e.fillColor = b.negativeFillColor), d.push(e));
                d.length && u(d[d.length - 1].value) && d.push(a ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                h(this, "afterSetOptions", {
                    options: b
                });
                return b
            },
            getName: function() {
                return c(this.options.name, "Series " + (this.index + 1))
            },
            getCyclic: function(a, b, d) {
                var e, g = this.chart,
                    f = this.userOptions,
                    h = a + "Index",
                    n = a + "Counter",
                    l = d ? d.length : c(g.options.chart[a + "Count"], g[a + "Count"]);
                b || (e = c(f[h], f["_" + h]), u(e) || (g.series.length || (g[n] = 0), f["_" + h] = e = g[n] % l, g[n] += 1), d && (b = d[e]));
                void 0 !==
                    e && (this[h] = e);
                this[a] = b
            },
            getColor: function() {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            findPointIndex: function(a, b) {
                var c = a.id;
                a = a.x;
                var d = this.points,
                    e, f;
                c && (f = (c = this.chart.get(c)) && c.index, void 0 !== f && (e = !0));
                void 0 === f && m(a) && (f = this.xData.indexOf(a, b)); -
                1 !== f && void 0 !== f && this.cropped && (f = f >= this.cropStart ? f - this.cropStart : f);
                !e && d[f] && d[f].touched && (f = void 0);
                return f
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function(b) {
                var c = this.options,
                    d = this.points,
                    e = [],
                    g, f, h, n = this.requireSorting,
                    l = b.length === d.length,
                    k = !0;
                this.xIncrement = null;
                b.forEach(function(b, f) {
                    var r, k = a.defined(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b) || {};
                    r = k.x;
                    if (k.id || m(r))
                        if (r = this.findPointIndex(k, h), -1 === r || void 0 === r ? e.push(b) :
                            d[r] && b !== c.data[r] ? (d[r].update(b, !1, null, !1), d[r].touched = !0, n && (h = r + 1)) : d[r] && (d[r].touched = !0), !l || f !== r || this.hasDerivedData) g = !0
                }, this);
                if (g)
                    for (b = d.length; b--;)(f = d[b]) && !f.touched && f.remove(!1);
                else l ? b.forEach(function(a, b) {
                    d[b].update && a !== d[b].y && d[b].update(a, !1, null, !1)
                }) : k = !1;
                d.forEach(function(a) {
                    a && (a.touched = !1)
                });
                if (!k) return !1;
                e.forEach(function(a) {
                    this.addPoint(a, !1, null, null, !1)
                }, this);
                return !0
            },
            setData: function(e, g, h, l) {
                var n = this,
                    f = n.points,
                    r = f && f.length || 0,
                    k, x = n.options,
                    p =
                    n.chart,
                    B = null,
                    w = n.xAxis,
                    z = x.turboThreshold,
                    E = this.xData,
                    A = this.yData,
                    q = (k = n.pointArrayMap) && k.length,
                    t = x.keys,
                    D = 0,
                    u = 1,
                    v;
                e = e || [];
                k = e.length;
                g = c(g, !0);
                !1 !== l && k && r && !n.cropped && !n.hasGroupedData && n.visible && !n.isSeriesBoosting && (v = this.updateData(e));
                if (!v) {
                    n.xIncrement = null;
                    n.colorCounter = 0;
                    this.parallelArrays.forEach(function(a) {
                        n[a + "Data"].length = 0
                    });
                    if (z && k > z) {
                        for (h = 0; null === B && h < k;) B = e[h], h++;
                        if (m(B))
                            for (h = 0; h < k; h++) E[h] = this.autoIncrement(), A[h] = e[h];
                        else if (d(B))
                            if (q)
                                for (h = 0; h < k; h++) B = e[h],
                                    E[h] = B[0], A[h] = B.slice(1, q + 1);
                            else
                                for (t && (D = t.indexOf("x"), u = t.indexOf("y"), D = 0 <= D ? D : 0, u = 0 <= u ? u : 1), h = 0; h < k; h++) B = e[h], E[h] = B[D], A[h] = B[u];
                        else a.error(12, !1, p)
                    } else
                        for (h = 0; h < k; h++) void 0 !== e[h] && (B = {
                            series: n
                        }, n.pointClass.prototype.applyOptions.apply(B, [e[h]]), n.updateParallelArrays(B, h));
                    A && b(A[0]) && a.error(14, !0, p);
                    n.data = [];
                    n.options.data = n.userOptions.data = e;
                    for (h = r; h--;) f[h] && f[h].destroy && f[h].destroy();
                    w && (w.minRange = w.userMinRange);
                    n.isDirty = p.isDirtyBox = !0;
                    n.isDirtyData = !!f;
                    h = !1
                }
                "point" ===
                x.legendType && (this.processData(), this.generatePoints());
                g && p.redraw(h)
            },
            processData: function(b) {
                var c = this.xData,
                    d = this.yData,
                    e = c.length,
                    g;
                g = 0;
                var f, h, n = this.xAxis,
                    l, m = this.options;
                l = m.cropThreshold;
                var k = this.getExtremesFromAll || m.getExtremesFromAll,
                    p = this.isCartesian,
                    m = n && n.val2lin,
                    w = n && n.isLog,
                    z = this.requireSorting,
                    A, q;
                if (p && !this.isDirty && !n.isDirty && !this.yAxis.isDirty && !b) return !1;
                n && (b = n.getExtremes(), A = b.min, q = b.max);
                p && this.sorted && !k && (!l || e > l || this.forceCrop) && (c[e - 1] < A || c[0] > q ? (c = [],
                    d = []) : this.yData && (c[0] < A || c[e - 1] > q) && (g = this.cropData(this.xData, this.yData, A, q), c = g.xData, d = g.yData, g = g.start, f = !0));
                for (l = c.length || 1; --l;) e = w ? m(c[l]) - m(c[l - 1]) : c[l] - c[l - 1], 0 < e && (void 0 === h || e < h) ? h = e : 0 > e && z && (a.error(15, !1, this.chart), z = !1);
                this.cropped = f;
                this.cropStart = g;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = h
            },
            cropData: function(a, b, d, e, g) {
                var f = a.length,
                    h = 0,
                    n = f,
                    l;
                g = c(g, this.cropShoulder);
                for (l = 0; l < f; l++)
                    if (a[l] >= d) {
                        h = Math.max(0, l - g);
                        break
                    }
                for (d = l; d < f; d++)
                    if (a[d] >
                        e) {
                        n = d + g;
                        break
                    }
                return {
                    xData: a.slice(h, n),
                    yData: b.slice(h, n),
                    start: h,
                    end: n
                }
            },
            generatePoints: function() {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    d, e = this.processedXData,
                    f = this.processedYData,
                    g = this.pointClass,
                    l = e.length,
                    m = this.cropStart || 0,
                    k, w = this.hasGroupedData,
                    a = a.keys,
                    A, q = [],
                    t;
                c || w || (c = [], c.length = b.length, c = this.data = c);
                a && w && (this.options.keys = !1);
                for (t = 0; t < l; t++) k = m + t, w ? (A = (new g).init(this, [e[t]].concat(z(f[t]))), A.dataGroup = this.groupMap[t], A.dataGroup.options && (A.options = A.dataGroup.options,
                    p(A, A.dataGroup.options), delete A.dataLabels)) : (A = c[k]) || void 0 === b[k] || (c[k] = A = (new g).init(this, b[k], e[t])), A && (A.index = k, q[t] = A);
                this.options.keys = a;
                if (c && (l !== (d = c.length) || w))
                    for (t = 0; t < d; t++) t !== m || w || (t += l), c[t] && (c[t].destroyElements(), c[t].plotX = void 0);
                this.data = c;
                this.points = q;
                h(this, "afterGeneratePoints")
            },
            getXExtremes: function(a) {
                return {
                    min: k(a),
                    max: F(a)
                }
            },
            getExtremes: function(a) {
                var b = this.yAxis,
                    c = this.processedXData,
                    e, g = [],
                    f = 0;
                e = this.xAxis.getExtremes();
                var n = e.min,
                    l = e.max,
                    p, w, A = this.requireSorting ?
                    this.cropShoulder : 0,
                    z, q;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (q = 0; q < e; q++)
                    if (w = c[q], z = a[q], p = (m(z, !0) || d(z)) && (!b.positiveValuesOnly || z.length || 0 < z), w = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[q + A] || w) >= n && (c[q - A] || w) <= l, p && w)
                        if (p = z.length)
                            for (; p--;) "number" === typeof z[p] && (g[f++] = z[p]);
                        else g[f++] = z;
                this.dataMin = k(g);
                this.dataMax = F(g);
                h(this, "afterGetExtremes")
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    g = this.xAxis,
                    l = g.categories,
                    k = this.yAxis,
                    f = this.points,
                    r = f.length,
                    p = !!this.modifyValue,
                    w, A = this.pointPlacementToXValue(),
                    z = m(A),
                    q = a.threshold,
                    t = a.startFromThreshold ? q : 0,
                    D, v, J, C, F = this.zoneAxis || "y",
                    I = Number.MAX_VALUE;
                for (w = 0; w < r; w++) {
                    var G = f[w],
                        K = G.x;
                    v = G.y;
                    var V = G.low,
                        Q = b && k.stacks[(this.negStacks && v < (t ? 0 : q) ? "-" : "") + this.stackKey],
                        W, X;
                    k.positiveValuesOnly && null !== v && 0 >= v && (G.isNull = !0);
                    G.plotX = D = e(Math.min(Math.max(-1E5, g.translate(K, 0, 0, 0, 1, A, "flags" === this.type)),
                        1E5));
                    b && this.visible && !G.isNull && Q && Q[K] && (C = this.getStackIndicator(C, K, this.index), W = Q[K], X = W.points[C.key]);
                    d(X) && (V = X[0], v = X[1], V === t && C.key === Q[K].base && (V = c(m(q) && q, k.min)), k.positiveValuesOnly && 0 >= V && (V = null), G.total = G.stackTotal = W.total, G.percentage = W.total && G.y / W.total * 100, G.stackY = v, W.setOffset(this.pointXOffset || 0, this.barW || 0));
                    G.yBottom = u(V) ? Math.min(Math.max(-1E5, k.translate(V, 0, 1, 0, 1)), 1E5) : null;
                    p && (v = this.modifyValue(v, G));
                    G.plotY = v = "number" === typeof v && Infinity !== v ? Math.min(Math.max(-1E5,
                        k.translate(v, 0, 1, 0, 1)), 1E5) : void 0;
                    G.isInside = void 0 !== v && 0 <= v && v <= k.len && 0 <= D && D <= g.len;
                    G.clientX = z ? e(g.translate(K, 0, 0, 0, 1, A)) : D;
                    G.negative = G[F] < (a[F + "Threshold"] || q || 0);
                    G.category = l && void 0 !== l[G.x] ? l[G.x] : G.x;
                    G.isNull || (void 0 !== J && (I = Math.min(I, Math.abs(D - J))), J = D);
                    G.zone = this.zones.length && G.getZone()
                }
                this.closestPointRangePx = I;
                h(this, "afterTranslate")
            },
            getValidPoints: function(a, b, c) {
                var d = this.chart;
                return (a || this.points || []).filter(function(a) {
                    return b && !d.isInsidePlot(a.plotX, a.plotY, d.inverted) ?
                        !1 : c || !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    e = b.inverted,
                    f = this.clipBox,
                    g = f || b.clipBox,
                    h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(),
                    n = b[h],
                    l = b[h + "m"];
                n || (a && (g.width = 0, e && (g.x = b.plotSizeX), b[h + "m"] = l = d.clipRect(e ? b.plotSizeX + 99 : -99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[h] = n = d.clipRect(g), n.count = {
                    length: 0
                });
                a && !n.count[this.index] && (n.count[this.index] = !0, n.count.length += 1);
                !1 !== c.clip &&
                    (this.group.clip(a || f ? n : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = h);
                a || (n.count[this.index] && (delete n.count[this.index], --n.count.length), 0 === n.count.length && h && b[h] && (f || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = I(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX,
                    x: 0
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99,
                    x: b.inverted ? 0 : -99
                }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                h(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    d, e, g, f, h, l = this.options.marker,
                    m, k, p, w = this[this.specialGroup] || this.markerGroup;
                d = this.xAxis;
                var A, z = c(l.enabled, !d || d.isRadial ? !0 : null, this.closestPointRangePx >= l.enabledThreshold * l.radius);
                if (!1 !== l.enabled || this._hasPointMarkers)
                    for (d = 0; d < a.length; d++)
                        if (e = a[d], h = (f = e.graphic) ? "animate" : "attr", m = e.marker || {}, k = !!e.marker, g = z && void 0 === m.enabled || m.enabled, p = !1 !== e.isInside, g && !e.isNull) {
                            g = c(m.symbol,
                                this.symbol);
                            A = this.markerAttribs(e, e.selected && "select");
                            f ? f[p ? "show" : "hide"](!0).animate(A) : p && (0 < A.width || e.hasImage) && (e.graphic = f = b.renderer.symbol(g, A.x, A.y, A.width, A.height, k ? m : l).add(w));
                            if (f && !b.styledMode) f[h](this.pointAttribs(e, e.selected && "select"));
                            f && f.addClass(e.getClassName(), !0)
                        } else f && (e.graphic = f.destroy())
            },
            markerAttribs: function(a, b) {
                var d = this.options.marker,
                    e = a.marker || {},
                    g = e.symbol || d.symbol,
                    f = c(e.radius, d.radius);
                b && (d = d.states[b], b = e.states && e.states[b], f = c(b && b.radius,
                    d && d.radius, f + (d && d.radiusPlus || 0)));
                a.hasImage = g && 0 === g.indexOf("url");
                a.hasImage && (f = 0);
                a = {
                    x: Math.floor(a.plotX) - f,
                    y: a.plotY - f
                };
                f && (a.width = a.height = 2 * f);
                return a
            },
            pointAttribs: function(a, b) {
                var d = this.options.marker,
                    e = a && a.options,
                    g = e && e.marker || {},
                    f = this.color,
                    h = e && e.color,
                    n = a && a.color,
                    e = c(g.lineWidth, d.lineWidth),
                    l = a && a.zone && a.zone.color;
                a = 1;
                f = h || l || n || f;
                h = g.fillColor || d.fillColor || f;
                f = g.lineColor || d.lineColor || f;
                b && (d = d.states[b], b = g.states && g.states[b] || {}, e = c(b.lineWidth, d.lineWidth, e + c(b.lineWidthPlus,
                    d.lineWidthPlus, 0)), h = b.fillColor || d.fillColor || h, f = b.lineColor || d.lineColor || f, a = c(b.opacity, d.opacity, a));
                return {
                    stroke: f,
                    "stroke-width": e,
                    fill: h,
                    opacity: a
                }
            },
            destroy: function(b) {
                var c = this,
                    d = c.chart,
                    e = /AppleWebKit\/533/.test(A.navigator.userAgent),
                    g, f, n = c.data || [],
                    m, k;
                h(c, "destroy");
                b || w(c);
                (c.axisTypes || []).forEach(function(a) {
                    (k = c[a]) && k.series && (v(k.series, c), k.isDirty = k.forceRedraw = !0)
                });
                c.legendItem && c.chart.legend.destroyItem(c);
                for (f = n.length; f--;)(m = n[f]) && m.destroy && m.destroy();
                c.points =
                    null;
                a.clearTimeout(c.animationTimeout);
                l(c, function(a, b) {
                    a instanceof J && !a.survive && (g = e && "group" === b ? "hide" : "destroy", a[g]())
                });
                d.hoverSeries === c && (d.hoverSeries = null);
                v(d.series, c);
                d.orderSeries();
                l(c, function(a, d) {
                    b && "hcEvents" === d || delete c[d]
                })
            },
            getGraphPath: function(a, b, c) {
                var d = this,
                    e = d.options,
                    f = e.step,
                    g, h = [],
                    n = [],
                    l;
                a = a || d.points;
                (g = a.reversed) && a.reverse();
                (f = {
                    right: 1,
                    center: 2
                }[f] || f && 3) && g && (f = 4 - f);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                a.forEach(function(g, m) {
                    var k = g.plotX,
                        r = g.plotY,
                        p = a[m - 1];
                    (g.leftCliff || p && p.rightCliff) && !c && (l = !0);
                    g.isNull && !u(b) && 0 < m ? l = !e.connectNulls : g.isNull && !b ? l = !0 : (0 === m || l ? m = ["M", g.plotX, g.plotY] : d.getPointSpline ? m = d.getPointSpline(a, g, m) : f ? (m = 1 === f ? ["L", p.plotX, r] : 2 === f ? ["L", (p.plotX + k) / 2, p.plotY, "L", (p.plotX + k) / 2, r] : ["L", k, p.plotY], m.push("L", k, r)) : m = ["L", k, r], n.push(g.x), f && (n.push(g.x), 2 === f && n.push(g.x)), h.push.apply(h, m), l = !1)
                });
                h.xMap = n;
                return d.graphPath = h
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    d = this.chart.styledMode,
                    e = [
                        ["graph", "highcharts-graph"]
                    ];
                d || e[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
                e = a.getZonesGraphs(e);
                e.forEach(function(f, e) {
                    var g = f[0],
                        h = a[g],
                        n = h ? "animate" : "attr";
                    h ? (h.endX = a.preventGraphAnimation ? null : c.xMap, h.animate({
                        d: c
                    })) : c.length && (a[g] = h = a.chart.renderer.path(c).addClass(f[1]).attr({
                        zIndex: 1
                    }).add(a.group));
                    h && !d && (g = {
                        stroke: f[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, f[3] ? g.dashstyle = f[3] : "square" !== b.linecap && (g["stroke-linecap"] =
                        g["stroke-linejoin"] = "round"), h[n](g).shadow(2 > e && b.shadow));
                    h && (h.startX = c.xMap, h.isArea = c.isArea)
                })
            },
            getZonesGraphs: function(a) {
                this.zones.forEach(function(b, c) {
                    c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || "")];
                    this.chart.styledMode || c.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                    a.push(c)
                }, this);
                return a
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    d = b.renderer,
                    e = this.zones,
                    g, f, h = this.clips || [],
                    l, m = this.graph,
                    k = this.area,
                    p = Math.max(b.chartWidth,
                        b.chartHeight),
                    w = this[(this.zoneAxis || "y") + "Axis"],
                    A, z, q = b.inverted,
                    t, D, u, v, J = !1;
                e.length && (m || k) && w && void 0 !== w.min && (z = w.reversed, t = w.horiz, m && !this.showLine && m.hide(), k && k.hide(), A = w.getExtremes(), e.forEach(function(e, n) {
                    g = z ? t ? b.plotWidth : 0 : t ? 0 : w.toPixels(A.min) || 0;
                    g = Math.min(Math.max(c(f, g), 0), p);
                    f = Math.min(Math.max(Math.round(w.toPixels(c(e.value, A.max), !0) || 0), 0), p);
                    J && (g = f = w.toPixels(A.max));
                    D = Math.abs(g - f);
                    u = Math.min(g, f);
                    v = Math.max(g, f);
                    w.isXAxis ? (l = {
                        x: q ? v : u,
                        y: 0,
                        width: D,
                        height: p
                    }, t || (l.x =
                        b.plotHeight - l.x)) : (l = {
                        x: 0,
                        y: q ? v : u,
                        width: p,
                        height: D
                    }, t && (l.y = b.plotWidth - l.y));
                    q && d.isVML && (l = w.isXAxis ? {
                        x: 0,
                        y: z ? u : v,
                        height: l.width,
                        width: b.chartWidth
                    } : {
                        x: l.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: l.height,
                        height: b.chartHeight
                    });
                    h[n] ? h[n].animate(l) : (h[n] = d.clipRect(l), m && a["zone-graph-" + n].clip(h[n]), k && a["zone-area-" + n].clip(h[n]));
                    J = e.value > A.max;
                    a.resetZones && 0 === f && (f = void 0)
                }), this.clips = h)
            },
            invertGroups: function(a) {
                function b() {
                    ["group", "markerGroup"].forEach(function(b) {
                        c[b] && (d.renderer.isVML &&
                            c[b].attr({
                                width: c.yAxis.len,
                                height: c.xAxis.len
                            }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    d = c.chart,
                    e;
                c.xAxis && (e = C(d, "resize", b), C(c, "destroy", e), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, d, e) {
                var f = this[a],
                    g = !f;
                g && (this[a] = f = this.chart.renderer.g().attr({
                    zIndex: d || .1
                }).add(e));
                f.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (u(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className ||
                    "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                f.attr({
                    visibility: c
                })[g ? "attr" : "animate"](this.getPlotBox());
                return f
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, d = a.options,
                    e = !!a.animate && b.renderer.isSVG && I(d.animation).duration,
                    f = a.visible ? "inherit" : "hidden",
                    g = d.zIndex,
                    l = a.hasRendered,
                    m = b.seriesGroup,
                    k = b.inverted;
                h(this, "render");
                c = a.plotGroup("group", "series", f, g, m);
                a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, m);
                e && a.animate(!0);
                c.inverted = a.isCartesian || a.invertable ? k : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.visible && a.drawPoints();
                a.drawDataLabels && a.drawDataLabels();
                a.redrawPoints && a.redrawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(k);
                !1 === d.clip || a.sharedClipKey || l || c.clip(b.clipRect);
                e && a.animate();
                l || (a.animationTimeout =
                    D(function() {
                        a.afterAnimate()
                    }, e));
                a.isDirty = !1;
                a.hasRendered = !0;
                h(a, "afterRender")
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    d = this.group,
                    e = this.xAxis,
                    g = this.yAxis;
                d && (a.inverted && d.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), d.animate({
                    translateX: c(e && e.left, a.plotLeft),
                    translateY: c(g && g.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b, a)
            },
            buildKDTree: function(a) {
                function b(a, d, e) {
                    var f, g;
                    if (g = a && a.length) return f = c.kdAxisArray[d % e], a.sort(function(a, b) {
                        return a[f] - b[f]
                    }), g = Math.floor(g / 2), {
                        point: a[g],
                        left: b(a.slice(0, g), d + 1, e),
                        right: b(a.slice(g + 1), d + 1, e)
                    }
                }
                this.buildingKdTree = !0;
                var c = this,
                    d = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete c.kdTree;
                D(function() {
                    c.kdTree = b(c.getValidPoints(null, !c.directTouch),
                        d, d);
                    c.buildingKdTree = !1
                }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
            },
            searchKDTree: function(a, b, c) {
                function d(a, b, c, l) {
                    var n = b.point,
                        m = e.kdAxisArray[c % l],
                        k, r, p = n;
                    r = u(a[f]) && u(n[f]) ? Math.pow(a[f] - n[f], 2) : null;
                    k = u(a[g]) && u(n[g]) ? Math.pow(a[g] - n[g], 2) : null;
                    k = (r || 0) + (k || 0);
                    n.dist = u(k) ? Math.sqrt(k) : Number.MAX_VALUE;
                    n.distX = u(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    m = a[m] - n[m];
                    k = 0 > m ? "left" : "right";
                    r = 0 > m ? "right" : "left";
                    b[k] && (k = d(a, b[k], c + 1, l), p = k[h] < p[h] ? k : n);
                    b[r] && Math.sqrt(m * m) < p[h] && (a = d(a, b[r], c + 1, l),
                        p = a[h] < p[h] ? a : p);
                    return p
                }
                var e = this,
                    f = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    h = b ? "distX" : "dist";
                b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(c);
                if (this.kdTree) return d(a, this.kdTree, b, b)
            },
            pointPlacementToXValue: function() {
                var a = this.options.pointPlacement;
                "between" === a && (a = .5);
                m(a) && (a *= c(this.options.pointRange || this.xAxis.pointRange));
                return a
            }
        })
    });
    K(G, "parts/Stacking.js", [G["parts/Globals.js"]], function(a) {
        var C = a.Axis,
            I = a.Chart,
            F = a.correctFloat,
            k = a.defined,
            e = a.destroyObjectProperties,
            q = a.format,
            t = a.objectEach,
            u = a.pick,
            v = a.Series;
        a.StackItem = function(a, e, d, m, b) {
            var g = a.chart.inverted;
            this.axis = a;
            this.isNegative = d;
            this.options = e;
            this.x = m;
            this.total = null;
            this.points = {};
            this.stack = b;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: e.align || (g ? d ? "left" : "right" : "center"),
                verticalAlign: e.verticalAlign || (g ? "middle" : d ? "bottom" : "top"),
                y: u(e.y, g ? 4 : d ? 14 : -6),
                x: u(e.x, g ? d ? -6 : 6 : 0)
            };
            this.textAlign = e.textAlign || (g ? d ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function() {
                e(this, this.axis)
            },
            render: function(a) {
                var e = this.axis.chart,
                    d = this.options,
                    m = d.format,
                    m = m ? q(m, this, e.time) : d.formatter.call(this);
                this.label ? this.label.attr({
                    text: m,
                    visibility: "hidden"
                }) : this.label = e.renderer.text(m, null, null, d.useHTML).css(d.style).attr({
                    align: this.textAlign,
                    rotation: d.rotation,
                    visibility: "hidden"
                }).add(a);
                this.label.labelrank = e.plotHeight
            },
            setOffset: function(a, e) {
                var d = this.axis,
                    h = d.chart,
                    b = d.translate(d.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    g = d.translate(0),
                    g = k(b) && Math.abs(b - g);
                a = h.xAxis[0].translate(this.x) + a;
                d = k(b) && this.getStackBox(h, this, a, b, e, g, d);
                (e = this.label) && d && (e.align(this.alignOptions, null, d), d = e.alignAttr, e[!1 === this.options.crop || h.isInsidePlot(d.x, d.y) ? "show" : "hide"](!0))
            },
            getStackBox: function(a, e, d, m, b, g, l) {
                var c = e.axis.reversed,
                    h = a.inverted;
                a = l.height + l.pos - (h ? a.plotLeft : a.plotTop);
                e = e.isNegative && !c || !e.isNegative && c;
                return {
                    x: h ? e ? m : m - g : d,
                    y: h ? a - d - b : e ? a - m - g : a - m,
                    width: h ? g : b,
                    height: h ? b : g
                }
            }
        };
        I.prototype.getStacks = function() {
            var a = this;
            a.yAxis.forEach(function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            a.series.forEach(function(e) {
                !e.options.stacking || !0 !== e.visible && !1 !== a.options.chart.ignoreHiddenSeries || (e.stackKey = e.type + u(e.options.stack, ""))
            })
        };
        C.prototype.buildStacks = function() {
            var a = this.series,
                e = u(this.options.reversedStacks, !0),
                d = a.length,
                m;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (m = d; m--;) a[e ? m : d - m - 1].setStackedPoints();
                for (m = 0; m < d; m++) a[m].modifyStacks()
            }
        };
        C.prototype.renderStackTotals = function() {
            var a =
                this.chart,
                e = a.renderer,
                d = this.stacks,
                m = this.stackTotalGroup;
            m || (this.stackTotalGroup = m = e.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            m.translate(a.plotLeft, a.plotTop);
            t(d, function(a) {
                t(a, function(a) {
                    a.render(m)
                })
            })
        };
        C.prototype.resetStacks = function() {
            var a = this,
                e = a.stacks;
            a.isXAxis || t(e, function(d) {
                t(d, function(e, b) {
                    e.touched < a.stacksTouched ? (e.destroy(), delete d[b]) : (e.total = null, e.cumulative = null)
                })
            })
        };
        C.prototype.cleanStacks = function() {
            var a;
            this.isXAxis || (this.oldStacks && (a =
                this.stacks = this.oldStacks), t(a, function(a) {
                t(a, function(a) {
                    a.cumulative = a.total
                })
            }))
        };
        v.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var e = this.processedXData,
                    h = this.processedYData,
                    d = [],
                    m = h.length,
                    b = this.options,
                    g = b.threshold,
                    l = u(b.startFromThreshold && g, 0),
                    c = b.stack,
                    b = b.stacking,
                    w = this.stackKey,
                    z = "-" + w,
                    q = this.negStacks,
                    t = this.yAxis,
                    A = t.stacks,
                    n = t.oldStacks,
                    x, B, E, v, f, r, C;
                t.stacksTouched += 1;
                for (f = 0; f < m; f++) r =
                    e[f], C = h[f], x = this.getStackIndicator(x, r, this.index), v = x.key, E = (B = q && C < (l ? 0 : g)) ? z : w, A[E] || (A[E] = {}), A[E][r] || (n[E] && n[E][r] ? (A[E][r] = n[E][r], A[E][r].total = null) : A[E][r] = new a.StackItem(t, t.options.stackLabels, B, r, c)), E = A[E][r], null !== C ? (E.points[v] = E.points[this.index] = [u(E.cumulative, l)], k(E.cumulative) || (E.base = v), E.touched = t.stacksTouched, 0 < x.index && !1 === this.singleStacks && (E.points[v][0] = E.points[this.index + "," + r + ",0"][0])) : E.points[v] = E.points[this.index] = null, "percent" === b ? (B = B ? w : z, q && A[B] &&
                        A[B][r] ? (B = A[B][r], E.total = B.total = Math.max(B.total, E.total) + Math.abs(C) || 0) : E.total = F(E.total + (Math.abs(C) || 0))) : E.total = F(E.total + (C || 0)), E.cumulative = u(E.cumulative, l) + (C || 0), null !== C && (E.points[v].push(E.cumulative), d[f] = E.cumulative);
                "percent" === b && (t.usePercentage = !0);
                this.stackedYData = d;
                t.oldStacks = {}
            }
        };
        v.prototype.modifyStacks = function() {
            var a = this,
                e = a.stackKey,
                d = a.yAxis.stacks,
                m = a.processedXData,
                b, g = a.options.stacking;
            a[g + "Stacker"] && [e, "-" + e].forEach(function(e) {
                for (var c = m.length, h, l; c--;)
                    if (h =
                        m[c], b = a.getStackIndicator(b, h, a.index, e), l = (h = d[e] && d[e][h]) && h.points[b.key]) a[g + "Stacker"](l, h, c)
            })
        };
        v.prototype.percentStacker = function(a, e, d) {
            e = e.total ? 100 / e.total : 0;
            a[0] = F(a[0] * e);
            a[1] = F(a[1] * e);
            this.stackedYData[d] = a[1]
        };
        v.prototype.getStackIndicator = function(a, e, d, m) {
            !k(a) || a.x !== e || m && a.key !== m ? a = {
                x: e,
                index: 0,
                key: m
            } : a.index++;
            a.key = [d, e, a.index].join();
            return a
        }
    });
    K(G, "parts/Dynamics.js", [G["parts/Globals.js"]], function(a) {
        var C = a.addEvent,
            I = a.animate,
            F = a.Axis,
            k = a.Chart,
            e = a.createElement,
            q = a.css,
            t = a.defined,
            u = a.erase,
            v = a.extend,
            p = a.fireEvent,
            h = a.isNumber,
            d = a.isObject,
            m = a.isArray,
            b = a.merge,
            g = a.objectEach,
            l = a.pick,
            c = a.Point,
            w = a.Series,
            z = a.seriesTypes,
            J = a.setAnimation,
            D = a.splat;
        a.cleanRecursively = function(b, c) {
            var e = {};
            g(b, function(g, h) {
                if (d(b[h], !0) && c[h]) g = a.cleanRecursively(b[h], c[h]), Object.keys(g).length && (e[h] = g);
                else if (d(b[h]) || b[h] !== c[h]) e[h] = b[h]
            });
            return e
        };
        v(k.prototype, {
            addSeries: function(a, b, c) {
                var d, e = this;
                a && (b = l(b, !0), p(e, "addSeries", {
                    options: a
                }, function() {
                    d = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    p(e, "afterAddSeries", {
                        series: d
                    });
                    b && e.redraw(c)
                }));
                return d
            },
            addAxis: function(a, c, d, e) {
                var g = c ? "xAxis" : "yAxis",
                    h = this.options;
                a = b(a, {
                    index: this[g].length,
                    isX: c
                });
                c = new F(this, a);
                h[g] = D(h[g] || {});
                h[g].push(a);
                l(d, !0) && this.redraw(e);
                return c
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    g = c.loading,
                    h = function() {
                        d && q(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = e("div", {
                        className: "highcharts-loading highcharts-loading-hidden"
                    },
                    null, b.container), b.loadingSpan = e("span", {
                    className: "highcharts-loading-inner"
                }, null, d), C(b, "redraw", h));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                b.styledMode || (q(d, v(g.style, {
                    zIndex: 10
                })), q(b.loadingSpan, g.labelStyle), b.loadingShown || (q(d, {
                    opacity: 0,
                    display: ""
                }), I(d, {
                    opacity: g.style.opacity || .5
                }, {
                    duration: g.showDuration || 0
                })));
                b.loadingShown = !0;
                h()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden",
                    this.styledMode || I(b, {
                        opacity: 0
                    }, {
                        duration: a.loading.hideDuration || 100,
                        complete: function() {
                            q(b, {
                                display: "none"
                            })
                        }
                    }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "),
            update: function(c, d, e, m) {
                var k = this,
                    n = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    f, r, w, z, q = [];
                p(k, "update", {
                    options: c
                });
                c.isResponsiveOptions || k.setResponsive(!1, !0);
                c = a.cleanRecursively(c, k.options);
                if (f = c.chart) {
                    b(!0, k.options.chart, f);
                    "className" in f && k.setClassName(f.className);
                    "reflow" in f && k.setReflow(f.reflow);
                    if ("inverted" in f || "polar" in f || "type" in f) k.propFromSeries(), r = !0;
                    "alignTicks" in f && (r = !0);
                    g(f, function(a, b) {
                        -1 !== k.propsRequireUpdateSeries.indexOf("chart." + b) && (w = !0); - 1 !== k.propsRequireDirtyBox.indexOf(b) && (k.isDirtyBox = !0); - 1 !== k.propsRequireReflow.indexOf(b) && (z = !0)
                    });
                    !k.styledMode && "style" in f && k.renderer.setStyle(f.style)
                }!k.styledMode && c.colors && (this.options.colors = c.colors);
                c.plotOptions && b(!0, this.options.plotOptions, c.plotOptions);
                g(c, function(a, b) {
                    if (k[b] && "function" === typeof k[b].update) k[b].update(a, !1);
                    else if ("function" === typeof k[n[b]]) k[n[b]](a);
                    "chart" !== b && -1 !==
                        k.propsRequireUpdateSeries.indexOf(b) && (w = !0)
                });
                this.collectionsWithUpdate.forEach(function(a) {
                    var b;
                    c[a] && ("series" === a && (b = [], k[a].forEach(function(a, c) {
                        a.options.isInternal || b.push(l(a.options.index, c))
                    })), D(c[a]).forEach(function(c, d) {
                        (d = t(c.id) && k.get(c.id) || k[a][b ? b[d] : d]) && d.coll === a && (d.update(c, !1), e && (d.touched = !0));
                        if (!d && e)
                            if ("series" === a) k.addSeries(c, !1).touched = !0;
                            else if ("xAxis" === a || "yAxis" === a) k.addAxis(c, "xAxis" === a, !1).touched = !0
                    }), e && k[a].forEach(function(a) {
                        a.touched || a.options.isInternal ?
                            delete a.touched : q.push(a)
                    }))
                });
                q.forEach(function(a) {
                    a.remove && a.remove(!1)
                });
                r && k.axes.forEach(function(a) {
                    a.update({}, !1)
                });
                w && k.series.forEach(function(a) {
                    a.update({}, !1)
                });
                c.loading && b(!0, k.options.loading, c.loading);
                r = f && f.width;
                f = f && f.height;
                a.isString(f) && (f = a.relativeLength(f, r || k.chartWidth));
                z || h(r) && r !== k.chartWidth || h(f) && f !== k.chartHeight ? k.setSize(r, f, m) : l(d, !0) && k.redraw(m);
                p(k, "afterUpdate", {
                    options: c,
                    redraw: d,
                    animation: m
                })
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a)
            }
        });
        v(c.prototype, {
            update: function(a, b, c, e) {
                function g() {
                    h.applyOptions(a);
                    null === h.y && k && (h.graphic = k.destroy());
                    d(a, !0) && (k && k.element && a && a.marker && void 0 !== a.marker.symbol && (h.graphic = k.destroy()), a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
                    m = h.index;
                    f.updateParallelArrays(h, m);
                    p.data[m] = d(p.data[m], !0) || d(a, !0) ? h.options : l(a, p.data[m]);
                    f.isDirty = f.isDirtyData = !0;
                    !f.fixedBox && f.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === p.legendType &&
                        (n.isDirtyLegend = !0);
                    b && n.redraw(c)
                }
                var h = this,
                    f = h.series,
                    k = h.graphic,
                    m, n = f.chart,
                    p = f.options;
                b = l(b, !0);
                !1 === e ? g() : h.firePointEvent("update", {
                    options: a
                }, g)
            },
            remove: function(a, b) {
                this.series.removePoint(this.series.data.indexOf(this), a, b)
            }
        });
        v(w.prototype, {
            addPoint: function(a, b, c, d, e) {
                var g = this.options,
                    f = this.data,
                    h = this.chart,
                    k = this.xAxis,
                    k = k && k.hasNames && k.names,
                    m = g.data,
                    n, w, z = this.xData,
                    q, x;
                b = l(b, !0);
                n = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(n, [a]);
                x = n.x;
                q = z.length;
                if (this.requireSorting &&
                    x < z[q - 1])
                    for (w = !0; q && z[q - 1] > x;) q--;
                this.updateParallelArrays(n, "splice", q, 0, 0);
                this.updateParallelArrays(n, q);
                k && n.name && (k[x] = n.name);
                m.splice(q, 0, a);
                w && (this.data.splice(q, 0, null), this.processData());
                "point" === g.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(n, "shift"), m.shift()));
                !1 !== e && p(this, "addPoint", {
                    point: n
                });
                this.isDirtyData = this.isDirty = !0;
                b && h.redraw(d)
            },
            removePoint: function(a, b, c) {
                var d = this,
                    e = d.data,
                    g = e[a],
                    f = d.points,
                    h = d.chart,
                    k = function() {
                        f && f.length === e.length && f.splice(a, 1);
                        e.splice(a, 1);
                        d.options.data.splice(a, 1);
                        d.updateParallelArrays(g || {
                            series: d
                        }, "splice", a, 1);
                        g && g.destroy();
                        d.isDirty = !0;
                        d.isDirtyData = !0;
                        b && h.redraw()
                    };
                J(c, h);
                b = l(b, !0);
                g ? g.firePointEvent("remove", null, k) : k()
            },
            remove: function(a, b, c, d) {
                function e() {
                    g.destroy(d);
                    g.remove = null;
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    l(a, !0) && f.redraw(b)
                }
                var g = this,
                    f = g.chart;
                !1 !== c ? p(g, "remove", null, e) : e()
            },
            update: function(c, d) {
                c = a.cleanRecursively(c, this.userOptions);
                p(this, "update", {
                    options: c
                });
                var e = this,
                    g = e.chart,
                    h = e.userOptions,
                    k, f = e.initialType || e.type,
                    m = c.type || h.type || g.options.chart.type,
                    n = !(this.hasDerivedData || c.dataGrouping || m && m !== this.type || void 0 !== c.pointStart || c.pointInterval || c.pointIntervalUnit || c.keys),
                    w = z[f].prototype,
                    q, t = ["group", "markerGroup", "dataLabelsGroup"],
                    A = ["navigatorSeries", "baseSeries"],
                    D = e.finishedAnimating && {
                        animation: !1
                    },
                    u = {};
                n && (A.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement"), !1 !== c.visible &&
                    A.push("area", "graph"), e.parallelArrays.forEach(function(a) {
                        A.push(a + "Data")
                    }), c.data && this.setData(c.data, !1));
                c = b(h, D, {
                    index: void 0 === h.index ? e.index : h.index,
                    pointStart: l(h.pointStart, e.xData[0])
                }, !n && {
                    data: e.options.data
                }, c);
                A = t.concat(A);
                A.forEach(function(a) {
                    A[a] = e[a];
                    delete e[a]
                });
                e.remove(!1, null, !1, !0);
                for (q in w) e[q] = void 0;
                z[m || f] ? v(e, z[m || f].prototype) : a.error(17, !0, g);
                A.forEach(function(a) {
                    e[a] = A[a]
                });
                e.init(g, c);
                n && this.points && (k = e.options, !1 === k.visible ? (u.graphic = 1, u.dataLabel = 1) :
                    (k.marker && !1 === k.marker.enabled && (u.graphic = 1), k.dataLabels && !1 === k.dataLabels.enabled && (u.dataLabel = 1)), this.points.forEach(function(a) {
                        a && a.series && (a.resolveColor(), Object.keys(u).length && a.destroyElements(u), !1 === k.showInLegend && a.legendItem && g.legend.destroyItem(a))
                    }, this));
                c.zIndex !== h.zIndex && t.forEach(function(a) {
                    e[a] && e[a].attr({
                        zIndex: c.zIndex
                    })
                });
                e.initialType = f;
                g.linkSeries();
                p(this, "afterUpdate");
                l(d, !0) && g.redraw(n ? void 0 : !1)
            },
            setName: function(a) {
                this.name = this.options.name = this.userOptions.name =
                    a;
                this.chart.isDirtyLegend = !0
            }
        });
        v(F.prototype, {
            update: function(a, c) {
                var d = this.chart,
                    e = a && a.events || {};
                a = b(this.userOptions, a);
                d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] = a);
                g(d.options[this.coll].events, function(a, b) {
                    "undefined" === typeof e[b] && (e[b] = void 0)
                });
                this.destroy(!0);
                this.init(d, v(a, {
                    events: e
                }));
                d.isDirtyBox = !0;
                l(c, !0) && d.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) d[e] && d[e].remove(!1);
                u(b.axes, this);
                u(b[c], this);
                m(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                b[c].forEach(function(a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                l(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    });
    K(G, "parts/AreaSeries.js", [G["parts/Globals.js"]], function(a) {
        var C = a.color,
            I = a.pick,
            F = a.Series,
            k = a.seriesType;
        k("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(e) {
                var k = [],
                    t = [],
                    u = this.xAxis,
                    v = this.yAxis,
                    p = v.stacks[this.stackKey],
                    h = {},
                    d = this.index,
                    m = v.series,
                    b = m.length,
                    g, l = I(v.options.reversedStacks, !0) ? 1 : -1,
                    c;
                e = e || this.points;
                if (this.options.stacking) {
                    for (c = 0; c < e.length; c++) e[c].leftNull = e[c].rightNull = null, h[e[c].x] = e[c];
                    a.objectEach(p, function(a, b) {
                        null !== a.total && t.push(b)
                    });
                    t.sort(function(a, b) {
                        return a - b
                    });
                    g = m.map(function(a) {
                        return a.visible
                    });
                    t.forEach(function(a, e) {
                        var m = 0,
                            w, z;
                        if (h[a] && !h[a].isNull) k.push(h[a]), [-1, 1].forEach(function(k) {
                            var m =
                                1 === k ? "rightNull" : "leftNull",
                                n = 0,
                                q = p[t[e + k]];
                            if (q)
                                for (c = d; 0 <= c && c < b;) w = q.points[c], w || (c === d ? h[a][m] = !0 : g[c] && (z = p[a].points[c]) && (n -= z[1] - z[0])), c += l;
                            h[a][1 === k ? "rightCliff" : "leftCliff"] = n
                        });
                        else {
                            for (c = d; 0 <= c && c < b;) {
                                if (w = p[a].points[c]) {
                                    m = w[1];
                                    break
                                }
                                c += l
                            }
                            m = v.translate(m, 0, 1, 0, 1);
                            k.push({
                                isNull: !0,
                                plotX: u.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: m,
                                yBottom: m
                            })
                        }
                    })
                }
                return k
            },
            getGraphPath: function(a) {
                var e = F.prototype.getGraphPath,
                    k = this.options,
                    u = k.stacking,
                    v = this.yAxis,
                    p, h, d = [],
                    m = [],
                    b = this.index,
                    g, l = v.stacks[this.stackKey],
                    c = k.threshold,
                    w = v.getThreshold(k.threshold),
                    z, k = k.connectNulls || "percent" === u,
                    J = function(e, h, k) {
                        var n = a[e];
                        e = u && l[n.x].points[b];
                        var p = n[k + "Null"] || 0;
                        k = n[k + "Cliff"] || 0;
                        var z, q, n = !0;
                        k || p ? (z = (p ? e[0] : e[1]) + k, q = e[0] + k, n = !!p) : !u && a[h] && a[h].isNull && (z = q = c);
                        void 0 !== z && (m.push({
                            plotX: g,
                            plotY: null === z ? w : v.getThreshold(z),
                            isNull: n,
                            isCliff: !0
                        }), d.push({
                            plotX: g,
                            plotY: null === q ? w : v.getThreshold(q),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                u && (a = this.getStackPoints(a));
                for (p = 0; p < a.length; p++)
                    if (h = a[p].isNull, g = I(a[p].rectPlotX,
                            a[p].plotX), z = I(a[p].yBottom, w), !h || k) k || J(p, p - 1, "left"), h && !u && k || (m.push(a[p]), d.push({
                        x: p,
                        plotX: g,
                        plotY: z
                    })), k || J(p, p + 1, "right");
                p = e.call(this, m, !0, !0);
                d.reversed = !0;
                h = e.call(this, d, !0, !0);
                h.length && (h[0] = "L");
                h = p.concat(h);
                e = e.call(this, m, !1, k);
                h.xMap = p.xMap;
                this.areaPath = h;
                return e
            },
            drawGraph: function() {
                this.areaPath = [];
                F.prototype.drawGraph.apply(this);
                var a = this,
                    k = this.areaPath,
                    t = this.options,
                    u = [
                        ["area", "highcharts-area", this.color, t.fillColor]
                    ];
                this.zones.forEach(function(e, k) {
                    u.push(["zone-area-" +
                        k, "highcharts-area highcharts-zone-area-" + k + " " + e.className, e.color || a.color, e.fillColor || t.fillColor
                    ])
                });
                u.forEach(function(e) {
                    var p = e[0],
                        h = a[p],
                        d = h ? "animate" : "attr",
                        m = {};
                    h ? (h.endX = a.preventGraphAnimation ? null : k.xMap, h.animate({
                        d: k
                    })) : (m.zIndex = 0, h = a[p] = a.chart.renderer.path(k).addClass(e[1]).add(a.group), h.isArea = !0);
                    a.chart.styledMode || (m.fill = I(e[3], C(e[2]).setOpacity(I(t.fillOpacity, .75)).get()));
                    h[d](m);
                    h.startX = k.xMap;
                    h.shiftUnit = t.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    });
    K(G, "parts/SplineSeries.js", [G["parts/Globals.js"]], function(a) {
        var C = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function(a, F, k) {
                var e = F.plotX,
                    q = F.plotY,
                    t = a[k - 1];
                k = a[k + 1];
                var u, v, p, h;
                if (t && !t.isNull && !1 !== t.doCurve && !F.isCliff && k && !k.isNull && !1 !== k.doCurve && !F.isCliff) {
                    a = t.plotY;
                    p = k.plotX;
                    k = k.plotY;
                    var d = 0;
                    u = (1.5 * e + t.plotX) / 2.5;
                    v = (1.5 * q + a) / 2.5;
                    p = (1.5 * e + p) / 2.5;
                    h = (1.5 * q + k) / 2.5;
                    p !== u && (d = (h - v) * (p - e) / (p - u) + q - h);
                    v += d;
                    h += d;
                    v > a && v > q ? (v = Math.max(a, q), h = 2 * q - v) : v < a && v < q && (v = Math.min(a, q), h =
                        2 * q - v);
                    h > k && h > q ? (h = Math.max(k, q), v = 2 * q - h) : h < k && h < q && (h = Math.min(k, q), v = 2 * q - h);
                    F.rightContX = p;
                    F.rightContY = h
                }
                F = ["C", C(t.rightContX, t.plotX), C(t.rightContY, t.plotY), C(u, e), C(v, q), e, q];
                t.rightContX = t.rightContY = null;
                return F
            }
        })
    });
    K(G, "parts/AreaSplineSeries.js", [G["parts/Globals.js"]], function(a) {
        var C = a.seriesTypes.area.prototype,
            I = a.seriesType;
        I("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    });
    K(G, "parts/ColumnSeries.js", [G["parts/Globals.js"]], function(a) {
        var C = a.animObject,
            I = a.color,
            F = a.extend,
            k = a.defined,
            e = a.isNumber,
            q = a.merge,
            t = a.pick,
            u = a.Series,
            v = a.seriesType,
            p = a.svg;
        v("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                u.prototype.init.apply(this, arguments);
                var a = this,
                    d = a.chart;
                d.hasRendered && d.series.forEach(function(d) {
                    d.type === a.type && (d.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    d = a.options,
                    e = a.xAxis,
                    b = a.yAxis,
                    g = e.options.reversedStacks,
                    g = e.reversed && !g || !e.reversed && g,
                    k, c = {},
                    p = 0;
                !1 === d.grouping ? p = 1 : a.chart.series.forEach(function(d) {
                    var e = d.options,
                        g = d.yAxis,
                        h;
                    d.type !== a.type || !d.visible && a.chart.options.chart.ignoreHiddenSeries || b.len !== g.len || b.pos !== g.pos || (e.stacking ? (k = d.stackKey, void 0 === c[k] && (c[k] = p++), h = c[k]) : !1 !== e.grouping && (h = p++), d.columnIndex = h)
                });
                var z = Math.min(Math.abs(e.transA) * (e.ordinalSlope || d.pointRange || e.closestPointRange || e.tickInterval || 1), e.len),
                    q = z * d.groupPadding,
                    u = (z - 2 * q) / (p || 1),
                    d = Math.min(d.maxPointWidth || e.len, t(d.pointWidth, u * (1 - 2 * d.pointPadding)));
                a.columnMetrics = {
                    width: d,
                    offset: (u - d) / 2 + (q + ((a.columnIndex || 0) +
                        (g ? 1 : 0)) * u - z / 2) * (g ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, d, e, b) {
                var g = this.chart,
                    h = this.borderWidth,
                    c = -(h % 2 ? .5 : 0),
                    h = h % 2 ? .5 : 1;
                g.inverted && g.renderer.isVML && (h += 1);
                this.options.crisp && (e = Math.round(a + e) + c, a = Math.round(a) + c, e -= a);
                b = Math.round(d + b) + h;
                c = .5 >= Math.abs(d) && .5 < b;
                d = Math.round(d) + h;
                b -= d;
                c && b && (--d, b += 1);
                return {
                    x: a,
                    y: d,
                    width: e,
                    height: b
                }
            },
            translate: function() {
                var a = this,
                    d = a.chart,
                    e = a.options,
                    b = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    b = a.borderWidth = t(e.borderWidth, b ? 0 : 1),
                    g = a.yAxis,
                    l = e.threshold,
                    c = a.translatedThreshold = g.getThreshold(l),
                    p = t(e.minPointLength, 5),
                    z = a.getColumnMetrics(),
                    q = z.width,
                    D = a.barW = Math.max(q, 1 + 2 * b),
                    A = a.pointXOffset = z.offset;
                d.inverted && (c -= .5);
                e.pointPadding && (D = Math.ceil(D));
                u.prototype.translate.apply(a);
                a.points.forEach(function(b) {
                    var e = t(b.yBottom, c),
                        h = 999 + Math.abs(e),
                        m = q,
                        h = Math.min(Math.max(-h, b.plotY), g.len + h),
                        n = b.plotX + A,
                        f = D,
                        r = Math.min(h, e),
                        z, w = Math.max(h, e) - r;
                    p && Math.abs(w) < p && (w = p, z = !g.reversed && !b.negative || g.reversed && b.negative, b.y === l && a.dataMax <=
                        l && g.min < l && (z = !z), r = Math.abs(r - c) > p ? e - p : c - (z ? p : 0));
                    k(b.options.pointWidth) && (m = f = Math.ceil(b.options.pointWidth), n -= Math.round((m - q) / 2));
                    b.barX = n;
                    b.pointWidth = m;
                    b.tooltipPos = d.inverted ? [g.len + g.pos - d.plotLeft - h, a.xAxis.len - n - f / 2, w] : [n + f / 2, h + g.pos - d.plotTop, w];
                    b.shapeType = a.pointClass.prototype.shapeType || "rect";
                    b.shapeArgs = a.crispCol.apply(a, b.isNull ? [n, c, f, 0] : [n, r, f, w])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, d) {
                var e = this.options,
                    b, g = this.pointAttrToOptions || {};
                b = g.stroke || "borderColor";
                var h = g["stroke-width"] || "borderWidth",
                    c = a && a.color || this.color,
                    k = a && a[b] || e[b] || this.color || c,
                    p = a && a[h] || e[h] || this[h] || 0,
                    g = a && a.dashStyle || e.dashStyle,
                    u = t(e.opacity, 1),
                    D;
                a && this.zones.length && (D = a.getZone(), c = a.options.color || D && D.color || this.color, D && (k = D.borderColor || k, g = D.dashStyle || g, p = D.borderWidth || p));
                d && (a = q(e.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, c = a.color ||
                    void 0 !== d && I(c).brighten(a.brightness).get() || c, k = a[b] || k, p = a[h] || p, g = a.dashStyle || g, u = t(a.opacity, u));
                b = {
                    fill: c,
                    stroke: k,
                    "stroke-width": p,
                    opacity: u
                };
                g && (b.dashstyle = g);
                return b
            },
            drawPoints: function() {
                var a = this,
                    d = this.chart,
                    k = a.options,
                    b = d.renderer,
                    g = k.animationLimit || 250,
                    l;
                a.points.forEach(function(c) {
                    var h = c.graphic,
                        m = h && d.pointCount < g ? "animate" : "attr";
                    if (e(c.plotY) && null !== c.y) {
                        l = c.shapeArgs;
                        h && h.element.nodeName !== c.shapeType && (h = h.destroy());
                        if (h) h[m](q(l));
                        else c.graphic = h = b[c.shapeType](l).add(c.group ||
                            a.group);
                        if (k.borderRadius) h[m]({
                            r: k.borderRadius
                        });
                        d.styledMode || h[m](a.pointAttribs(c, c.selected && "select")).shadow(!1 !== c.allowShadow && k.shadow, null, k.stacking && !k.borderRadius);
                        h.addClass(c.getClassName(), !0)
                    } else h && (c.graphic = h.destroy())
                })
            },
            animate: function(a) {
                var d = this,
                    e = this.yAxis,
                    b = d.options,
                    g = this.chart.inverted,
                    h = {},
                    c = g ? "translateX" : "translateY",
                    k;
                p && (a ? (h.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(b.threshold))), g ? h.translateX = a - e.len : h.translateY = a, d.clipBox && d.setClip(),
                    d.group.attr(h)) : (k = d.group.attr(c), d.group.animate({
                    scaleY: 1
                }, F(C(d.options.animation), {
                    step: function(a, b) {
                        h[c] = k + b.pos * (e.pos - k);
                        d.group.attr(h)
                    }
                })), d.animate = null))
            },
            remove: function() {
                var a = this,
                    d = a.chart;
                d.hasRendered && d.series.forEach(function(d) {
                    d.type === a.type && (d.isDirty = !0)
                });
                u.prototype.remove.apply(a, arguments)
            }
        })
    });
    K(G, "parts/BarSeries.js", [G["parts/Globals.js"]], function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    });
    K(G, "parts/ScatterSeries.js", [G["parts/Globals.js"]], function(a) {
        var C =
            a.Series,
            I = a.seriesType;
        I("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            jitter: {
                x: 0,
                y: 0
            },
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function() {
                this.options.lineWidth && C.prototype.drawGraph.call(this)
            },
            applyJitter: function() {
                var a = this,
                    k = this.options.jitter,
                    e = this.points.length;
                k && this.points.forEach(function(q, t) {
                    ["x", "y"].forEach(function(u, v) {
                        var p, h = "plot" + u.toUpperCase(),
                            d, m;
                        k[u] && !q.isNull && (p = a[u + "Axis"], m = k[u] * p.transA, p && !p.isLog && (d = Math.max(0, q[h] - m), p = Math.min(p.len, q[h] + m), v = 1E4 * Math.sin(t + v * e), q[h] = d + (p - d) * (v - Math.floor(v)), "x" === u && (q.clientX = q.plotX)))
                    })
                })
            }
        });
        a.addEvent(C, "afterTranslate", function() {
            this.applyJitter &&
                this.applyJitter()
        })
    });
    K(G, "mixins/centered-series.js", [G["parts/Globals.js"]], function(a) {
        var C = a.deg2rad,
            I = a.isNumber,
            F = a.pick,
            k = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options,
                    q = this.chart,
                    t = 2 * (a.slicedOffset || 0),
                    u = q.plotWidth - 2 * t,
                    q = q.plotHeight - 2 * t,
                    v = a.center,
                    v = [F(v[0], "50%"), F(v[1], "50%"), a.size || "100%", a.innerSize || 0],
                    p = Math.min(u, q),
                    h, d;
                for (h = 0; 4 > h; ++h) d = v[h], a = 2 > h || 2 === h && /%$/.test(d), v[h] = k(d, [u, q, p, v[2]][h]) + (a ? t : 0);
                v[3] > v[2] && (v[3] = v[2]);
                return v
            },
            getStartAndEndRadians: function(a,
                k) {
                a = I(a) ? a : 0;
                k = I(k) && k > a && 360 > k - a ? k : a + 360;
                return {
                    start: C * (a + -90),
                    end: C * (k + -90)
                }
            }
        }
    });
    K(G, "parts/PieSeries.js", [G["parts/Globals.js"]], function(a) {
        var C = a.addEvent,
            I = a.CenteredSeriesMixin,
            F = a.defined,
            k = I.getStartAndEndRadians,
            e = a.merge,
            q = a.noop,
            t = a.pick,
            u = a.Point,
            v = a.Series,
            p = a.seriesType,
            h = a.setAnimation;
        p("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                connectorPadding: 5,
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                softConnector: !0,
                x: 0,
                connectorShape: "fixedOffset",
                crookDistance: "70%"
            },
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var d =
                    this,
                    b = d.points,
                    e = d.startAngleRad;
                a || (b.forEach(function(a) {
                    var b = a.graphic,
                        g = a.shapeArgs;
                    b && (b.attr({
                        r: a.startR || d.center[3] / 2,
                        start: e,
                        end: e
                    }), b.animate({
                        r: g.r,
                        start: g.start,
                        end: g.end
                    }, d.options.animation))
                }), d.animate = null)
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            updateTotals: function() {
                var a, e = 0,
                    b = this.points,
                    g = b.length,
                    h, c = this.options.ignoreHiddenPoint;
                for (a = 0; a < g; a++) h = b[a], e += c && !h.visible ? 0 : h.isNull ? 0 : h.y;
                this.total = e;
                for (a = 0; a < g; a++) h = b[a], h.percentage = 0 < e && (h.visible || !c) ?
                    h.y / e * 100 : 0, h.total = e
            },
            generatePoints: function() {
                v.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function(a, e, b) {
                var d = this.center,
                    h = this.radii ? this.radii[b.index] : d[2] / 2;
                return d[0] + (e ? -1 : 1) * Math.cos(Math.asin(Math.max(Math.min((a - d[1]) / (h + b.labelDistance), 1), -1))) * (h + b.labelDistance) + (0 < b.labelDistance ? (e ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function(a) {
                this.generatePoints();
                var d = 0,
                    b = this.options,
                    e = b.slicedOffset,
                    h = e + (b.borderWidth || 0),
                    c, p, z = k(b.startAngle, b.endAngle),
                    q = this.startAngleRad = z.start,
                    z = (this.endAngleRad = z.end) - q,
                    u = this.points,
                    A, n, x = b.dataLabels.distance,
                    b = b.ignoreHiddenPoint,
                    v, E = u.length,
                    H;
                a || (this.center = a = this.getCenter());
                for (v = 0; v < E; v++) {
                    H = u[v];
                    H.labelDistance = t(H.options.dataLabels && H.options.dataLabels.distance, x);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, H.labelDistance);
                    c = q + d * z;
                    if (!b || H.visible) d += H.percentage / 100;
                    p = q + d * z;
                    H.shapeType = "arc";
                    H.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * c) / 1E3,
                        end: Math.round(1E3 *
                            p) / 1E3
                    };
                    p = (p + c) / 2;
                    p > 1.5 * Math.PI ? p -= 2 * Math.PI : p < -Math.PI / 2 && (p += 2 * Math.PI);
                    H.slicedTranslation = {
                        translateX: Math.round(Math.cos(p) * e),
                        translateY: Math.round(Math.sin(p) * e)
                    };
                    A = Math.cos(p) * a[2] / 2;
                    n = Math.sin(p) * a[2] / 2;
                    H.tooltipPos = [a[0] + .7 * A, a[1] + .7 * n];
                    H.half = p < -Math.PI / 2 || p > Math.PI / 2 ? 1 : 0;
                    H.angle = p;
                    c = Math.min(h, H.labelDistance / 5);
                    H.labelPosition = {
                        natural: {
                            x: a[0] + A + Math.cos(p) * H.labelDistance,
                            y: a[1] + n + Math.sin(p) * H.labelDistance
                        },
                        "final": {},
                        alignment: 0 > H.labelDistance ? "center" : H.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: a[0] +
                                    A + Math.cos(p) * c,
                                y: a[1] + n + Math.sin(p) * c
                            },
                            touchingSliceAt: {
                                x: a[0] + A,
                                y: a[1] + n
                            }
                        }
                    }
                }
            },
            drawGraph: null,
            redrawPoints: function() {
                var a = this,
                    h = a.chart,
                    b = h.renderer,
                    g, k, c, p, z = a.options.shadow;
                !z || a.shadowGroup || h.styledMode || (a.shadowGroup = b.g("shadow").attr({
                    zIndex: -1
                }).add(a.group));
                a.points.forEach(function(d) {
                    var l = {};
                    k = d.graphic;
                    if (!d.isNull && k) {
                        p = d.shapeArgs;
                        g = d.getTranslate();
                        if (!h.styledMode) {
                            var m = d.shadowGroup;
                            z && !m && (m = d.shadowGroup = b.g("shadow").add(a.shadowGroup));
                            m && m.attr(g);
                            c = a.pointAttribs(d,
                                d.selected && "select")
                        }
                        d.delayedRendering ? (k.setRadialReference(a.center).attr(p).attr(g), h.styledMode || k.attr(c).attr({
                            "stroke-linejoin": "round"
                        }).shadow(z, m), d.delayRendering = !1) : (k.setRadialReference(a.center), h.styledMode || e(!0, l, c), e(!0, l, p, g), k.animate(l));
                        k.attr({
                            visibility: d.visible ? "inherit" : "hidden"
                        });
                        k.addClass(d.getClassName())
                    } else k && (d.graphic = k.destroy())
                })
            },
            drawPoints: function() {
                var a = this.chart.renderer;
                this.points.forEach(function(d) {
                    d.graphic || (d.graphic = a[d.shapeType](d.shapeArgs).add(d.series.group),
                        d.delayedRendering = !0)
                })
            },
            searchPoint: q,
            sortByAngle: function(a, e) {
                a.sort(function(a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * e
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: I.getCenter,
            getSymbol: q
        }, {
            init: function() {
                u.prototype.init.apply(this, arguments);
                var a = this,
                    e;
                a.name = t(a.name, "Slice");
                e = function(b) {
                    a.slice("select" === b.type)
                };
                C(a, "select", e);
                C(a, "unselect", e);
                return a
            },
            isValid: function() {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function(a, e) {
                var b = this,
                    d = b.series,
                    h = d.chart,
                    c = d.options.ignoreHiddenPoint;
                e = t(e, c);
                a !== b.visible && (b.visible = b.options.visible = a = void 0 === a ? !b.visible : a, d.options.data[d.data.indexOf(b)] = b.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(c) {
                    if (b[c]) b[c][a ? "show" : "hide"](!0)
                }), b.legendItem && h.legend.colorizeItem(b, a), a || "hover" !== b.state || b.setState(""), c && (d.isDirty = !0), e && h.redraw())
            },
            slice: function(a, e, b) {
                var d = this.series;
                h(b, d.chart);
                t(e, !0);
                this.sliced = this.options.sliced = F(a) ? a : !this.sliced;
                d.options.data[d.data.indexOf(this)] =
                    this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(a) {
                var d = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x, d.y, d.r + a, d.r + a, {
                    innerR: this.shapeArgs.r - 1,
                    start: d.start,
                    end: d.end
                })
            },
            connectorShapes: {
                fixedOffset: function(a, e, b) {
                    var d = e.breakAt;
                    e = e.touchingSliceAt;
                    return ["M", a.x,
                        a.y
                    ].concat(b.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * d.x - e.x, 2 * d.y - e.y, d.x, d.y] : ["L", d.x, d.y]).concat(["L", e.x, e.y])
                },
                straight: function(a, e) {
                    e = e.touchingSliceAt;
                    return ["M", a.x, a.y, "L", e.x, e.y]
                },
                crookedLine: function(d, e, b) {
                    e = e.touchingSliceAt;
                    var g = this.series,
                        h = g.center[0],
                        c = g.chart.plotWidth,
                        k = g.chart.plotLeft,
                        g = d.alignment,
                        m = this.shapeArgs.r;
                    b = a.relativeLength(b.crookDistance, 1);
                    b = "left" === g ? h + m + (c + k - h - m) * (1 - b) : k + (h - m) * b;
                    h = ["L", b, d.y];
                    if ("left" === g ? b > d.x || b < e.x : b < d.x || b > e.x) h = [];
                    return ["M", d.x, d.y].concat(h).concat(["L", e.x, e.y])
                }
            },
            getConnectorPath: function() {
                var a = this.labelPosition,
                    e = this.series.options.dataLabels,
                    b = e.connectorShape,
                    g = this.connectorShapes;
                g[b] && (b = g[b]);
                return b.call(this, {
                    x: a.final.x,
                    y: a.final.y,
                    alignment: a.alignment
                }, a.connectorPosition, e)
            }
        })
    });
    K(G, "parts/DataLabels.js", [G["parts/Globals.js"]], function(a) {
        var C = a.arrayMax,
            I = a.defined,
            F = a.extend,
            k = a.format,
            e = a.merge,
            q = a.noop,
            t = a.pick,
            u = a.relativeLength,
            v = a.Series,
            p = a.seriesTypes,
            h = a.stableSort,
            d = a.isArray,
            m = a.splat;
        a.distribute = function(b, d, e) {
            function c(a, b) {
                return a.target - b.target
            }
            var g, k = !0,
                l = b,
                m = [],
                p;
            p = 0;
            var n = l.reducedLen || d;
            for (g = b.length; g--;) p += b[g].size;
            if (p > n) {
                h(b, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (p = g = 0; p <= n;) p += b[g].size, g++;
                m = b.splice(g - 1, b.length)
            }
            h(b, c);
            for (b = b.map(function(a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: t(a.align, .5)
                    }
                }); k;) {
                for (g = b.length; g--;) k = b[g], p = (Math.min.apply(0, k.targets) + Math.max.apply(0, k.targets)) / 2, k.pos = Math.min(Math.max(0, p - k.size * k.align),
                    d - k.size);
                g = b.length;
                for (k = !1; g--;) 0 < g && b[g - 1].pos + b[g - 1].size > b[g].pos && (b[g - 1].size += b[g].size, b[g - 1].targets = b[g - 1].targets.concat(b[g].targets), b[g - 1].align = .5, b[g - 1].pos + b[g - 1].size > d && (b[g - 1].pos = d - b[g - 1].size), b.splice(g, 1), k = !0)
            }
            l.push.apply(l, m);
            g = 0;
            b.some(function(b) {
                var c = 0;
                if (b.targets.some(function() {
                        l[g].pos = b.pos + c;
                        if (Math.abs(l[g].pos - l[g].target) > e) return l.slice(0, g + 1).forEach(function(a) {
                            delete a.pos
                        }), l.reducedLen = (l.reducedLen || d) - .1 * d, l.reducedLen > .1 * d && a.distribute(l, d, e), !0;
                        c += l[g].size;
                        g++
                    })) return !0
            });
            h(l, c)
        };
        v.prototype.drawDataLabels = function() {
            function b(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }

            function g(a, b) {
                var c = [],
                    f;
                if (d(a) && !d(b)) c = a.map(function(a) {
                    return e(a, b)
                });
                else if (d(b) && !d(a)) c = b.map(function(b) {
                    return e(a, b)
                });
                else if (d(a) || d(b))
                    for (f = Math.max(a.length, b.length); f--;) c[f] = e(a[f], b[f]);
                else c = e(a, b);
                return c
            }
            var h = this,
                c = h.chart,
                p = h.options,
                q = p.dataLabels,
                u = h.points,
                D, A = h.hasRendered || 0,
                n, x = a.animObject(p.animation).duration,
                v = Math.min(x, 200),
                E = t(q.defer, 0 < v),
                H = c.renderer,
                q = g(g(c.options.plotOptions && c.options.plotOptions.series && c.options.plotOptions.series.dataLabels, c.options.plotOptions && c.options.plotOptions[h.type] && c.options.plotOptions[h.type].dataLabels), q);
            a.fireEvent(this, "drawDataLabels");
            if (d(q) || q.enabled || h._hasPointLabels) n = h.plotGroup("dataLabelsGroup", "data-labels",
                E && !A ? "hidden" : "inherit", q.zIndex || 6), E && (n.attr({
                opacity: +A
            }), A || setTimeout(function() {
                var a = h.dataLabelsGroup;
                a && (h.visible && n.show(!0), a[p.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: v
                }))
            }, x - v)), u.forEach(function(d) {
                D = m(g(q, d.dlOptions || d.options && d.options.dataLabels));
                D.forEach(function(e, f) {
                    var g = e.enabled && (!d.isNull || d.dataLabelOnNull) && b(d, e),
                        l, m, r, q, z = d.dataLabels ? d.dataLabels[f] : d.dataLabel,
                        x = d.connectors ? d.connectors[f] : d.connector,
                        u = !z;
                    g && (l = d.getLabelConfig(), m = t(e[d.formatPrefix +
                        "Format"], e.format), l = I(m) ? k(m, l, c.time) : (e[d.formatPrefix + "Formatter"] || e.formatter).call(l, e), m = e.style, r = e.rotation, c.styledMode || (m.color = t(e.color, m.color, h.color, "#000000"), "contrast" === m.color && (d.contrastColor = H.getContrast(d.color || h.color), m.color = e.inside || 0 > t(e.distance, d.labelDistance) || p.stacking ? d.contrastColor : "#000000"), p.cursor && (m.cursor = p.cursor)), q = {
                        r: e.borderRadius || 0,
                        rotation: r,
                        padding: e.padding,
                        zIndex: 1
                    }, c.styledMode || (q.fill = e.backgroundColor, q.stroke = e.borderColor, q["stroke-width"] =
                        e.borderWidth), a.objectEach(q, function(a, b) {
                        void 0 === a && delete q[b]
                    }));
                    !z || g && I(l) ? g && I(l) && (z ? q.text = l : (d.dataLabels = d.dataLabels || [], z = d.dataLabels[f] = r ? H.text(l, 0, -9999).addClass("highcharts-data-label") : H.label(l, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label"), f || (d.dataLabel = z), z.addClass(" highcharts-data-label-color-" + d.colorIndex + " " + (e.className || "") + (e.useHTML ? " highcharts-tracker" : ""))), z.options = e, z.attr(q), c.styledMode || z.css(m).shadow(e.shadow), z.added || z.add(n), e.textPath && z.setTextPath(d.getDataLabelPath &&
                        d.getDataLabelPath(z) || d.graphic, e.textPath), h.alignDataLabel(d, z, e, null, u)) : (d.dataLabel = d.dataLabel && d.dataLabel.destroy(), d.dataLabels && (1 === d.dataLabels.length ? delete d.dataLabels : delete d.dataLabels[f]), f || delete d.dataLabel, x && (d.connector = d.connector.destroy(), d.connectors && (1 === d.connectors.length ? delete d.connectors : delete d.connectors[f])))
                })
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        v.prototype.alignDataLabel = function(a, d, e, c, h) {
            var b = this.chart,
                g = this.isCartesian && b.inverted,
                k = t(a.dlBox &&
                    a.dlBox.centerX, a.plotX, -9999),
                l = t(a.plotY, -9999),
                n = d.getBBox(),
                m, p = e.rotation,
                q = e.align,
                u = this.visible && (a.series.forceDL || b.isInsidePlot(k, Math.round(l), g) || c && b.isInsidePlot(k, g ? c.x + 1 : c.y + c.height - 1, g)),
                f = "justify" === t(e.overflow, "justify");
            if (u && (m = b.renderer.fontMetrics(b.styledMode ? void 0 : e.style.fontSize, d).b, c = F({
                    x: g ? this.yAxis.len - l : k,
                    y: Math.round(g ? this.xAxis.len - k : l),
                    width: 0,
                    height: 0
                }, c), F(e, {
                    width: n.width,
                    height: n.height
                }), p ? (f = !1, k = b.renderer.rotCorr(m, p), k = {
                    x: c.x + e.x + c.width / 2 + k.x,
                    y: c.y +
                        e.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        }[e.verticalAlign] * c.height
                }, d[h ? "attr" : "animate"](k).attr({
                    align: q
                }), l = (p + 720) % 360, l = 180 < l && 360 > l, "left" === q ? k.y -= l ? n.height : 0 : "center" === q ? (k.x -= n.width / 2, k.y -= n.height / 2) : "right" === q && (k.x -= n.width, k.y -= l ? 0 : n.height), d.placed = !0, d.alignAttr = k) : (d.align(e, null, c), k = d.alignAttr), f && 0 <= c.height ? a.isLabelJustified = this.justifyDataLabel(d, e, k, n, c, h) : t(e.crop, !0) && (u = b.isInsidePlot(k.x, k.y) && b.isInsidePlot(k.x + n.width, k.y + n.height)), e.shape && !p)) d[h ? "attr" : "animate"]({
                anchorX: g ?
                    b.plotWidth - a.plotY : a.plotX,
                anchorY: g ? b.plotHeight - a.plotX : a.plotY
            });
            u || (d.attr({
                y: -9999
            }), d.placed = !1)
        };
        v.prototype.justifyDataLabel = function(a, d, e, c, h, k) {
            var b = this.chart,
                g = d.align,
                l = d.verticalAlign,
                n, m, p = a.box ? 0 : a.padding || 0;
            n = e.x + p;
            0 > n && ("right" === g ? d.align = "left" : d.x = -n, m = !0);
            n = e.x + c.width - p;
            n > b.plotWidth && ("left" === g ? d.align = "right" : d.x = b.plotWidth - n, m = !0);
            n = e.y + p;
            0 > n && ("bottom" === l ? d.verticalAlign = "top" : d.y = -n, m = !0);
            n = e.y + c.height - p;
            n > b.plotHeight && ("top" === l ? d.verticalAlign = "bottom" : d.y = b.plotHeight -
                n, m = !0);
            m && (a.placed = !k, a.align(d, null, h));
            return m
        };
        p.pie && (p.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function(a) {
                return a.top + a.distributeBox.pos
            },
            radialDistributionX: function(a, d, e, c) {
                return a.getX(e < d.top + 2 || e > d.bottom - 2 ? c : e, d.half, d)
            },
            justify: function(a, d, e) {
                return e[0] + (a.half ? -1 : 1) * (d + a.labelDistance)
            },
            alignToPlotEdges: function(a, d, e, c) {
                a = a.getBBox().width;
                return d ? a + c : e - a - c
            },
            alignToConnectors: function(a, d, e, c) {
                var b = 0,
                    g;
                a.forEach(function(a) {
                    g = a.dataLabel.getBBox().width;
                    g >
                        b && (b = g)
                });
                return d ? b + c : e - b - c
            }
        }, p.pie.prototype.drawDataLabels = function() {
            var b = this,
                d = b.data,
                h, c = b.chart,
                k = b.options.dataLabels,
                m = k.connectorPadding,
                p, q = c.plotWidth,
                u = c.plotHeight,
                n = c.plotLeft,
                x = Math.round(c.chartWidth / 3),
                B, E = b.center,
                H = E[2] / 2,
                f = E[1],
                r, F, G, L, K = [
                    [],
                    []
                ],
                O, y, S, Q, R = [0, 0, 0, 0],
                T = b.dataLabelPositioners,
                Y;
            b.visible && (k.enabled || b._hasPointLabels) && (d.forEach(function(a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }),
                    a.dataLabel.shortened = !1)
            }), v.prototype.drawDataLabels.apply(b), d.forEach(function(a) {
                a.dataLabel && (a.visible ? (K[a.half].push(a), a.dataLabel._pos = null, !I(k.style.width) && !I(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > x && (a.dataLabel.css({
                    width: .7 * x
                }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
            }), K.forEach(function(d, e) {
                var g, l, p = d.length,
                    z = [],
                    x;
                if (p)
                    for (b.sortByAngle(d,
                            e - .5), 0 < b.maxLabelDistance && (g = Math.max(0, f - H - b.maxLabelDistance), l = Math.min(f + H + b.maxLabelDistance, c.plotHeight), d.forEach(function(a) {
                            0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, f - H - a.labelDistance), a.bottom = Math.min(f + H + a.labelDistance, c.plotHeight), x = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                target: a.labelPosition.natural.y - a.top + x / 2,
                                size: x,
                                rank: a.y
                            }, z.push(a.distributeBox))
                        }), g = l + x - g, a.distribute(z, g, g / 5)), Q = 0; Q < p; Q++) {
                        h = d[Q];
                        G = h.labelPosition;
                        r = h.dataLabel;
                        S = !1 === h.visible ? "hidden" :
                            "inherit";
                        y = g = G.natural.y;
                        z && I(h.distributeBox) && (void 0 === h.distributeBox.pos ? S = "hidden" : (L = h.distributeBox.size, y = T.radialDistributionY(h)));
                        delete h.positionIndex;
                        if (k.justify) O = T.justify(h, H, E);
                        else switch (k.alignTo) {
                            case "connectors":
                                O = T.alignToConnectors(d, e, q, n);
                                break;
                            case "plotEdges":
                                O = T.alignToPlotEdges(r, e, q, n);
                                break;
                            default:
                                O = T.radialDistributionX(b, h, y, g)
                        }
                        r._attr = {
                            visibility: S,
                            align: G.alignment
                        };
                        r._pos = {
                            x: O + k.x + ({
                                left: m,
                                right: -m
                            }[G.alignment] || 0),
                            y: y + k.y - 10
                        };
                        G.final.x = O;
                        G.final.y = y;
                        t(k.crop, !0) && (F = r.getBBox().width, g = null, O - F < m && 1 === e ? (g = Math.round(F - O + m), R[3] = Math.max(g, R[3])) : O + F > q - m && 0 === e && (g = Math.round(O + F - q + m), R[1] = Math.max(g, R[1])), 0 > y - L / 2 ? R[0] = Math.max(Math.round(-y + L / 2), R[0]) : y + L / 2 > u && (R[2] = Math.max(Math.round(y + L / 2 - u), R[2])), r.sideOverflow = g)
                    }
            }), 0 === C(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), this.points.forEach(function(a) {
                Y = e(k, a.options.dataLabels);
                if (p = t(Y.connectorWidth, 1)) {
                    var d;
                    B = a.connector;
                    if ((r = a.dataLabel) && r._pos && a.visible && 0 < a.labelDistance) {
                        S =
                            r._attr.visibility;
                        if (d = !B) a.connector = B = c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup), c.styledMode || B.attr({
                            "stroke-width": p,
                            stroke: Y.connectorColor || a.color || "#666666"
                        });
                        B[d ? "attr" : "animate"]({
                            d: a.getConnectorPath()
                        });
                        B.attr("visibility", S)
                    } else B && (a.connector = B.destroy())
                }
            }))
        }, p.pie.prototype.placeDataLabels = function() {
            this.points.forEach(function(a) {
                var b = a.dataLabel,
                    d;
                b && a.visible && ((d = b._pos) ?
                    (b.sideOverflow && (b._attr.width = Math.max(b.getBBox().width - b.sideOverflow, 0), b.css({
                        width: b._attr.width + "px",
                        textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                    }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](d), b.moved = !0) : b && b.attr({
                        y: -9999
                    }));
                delete a.distributeBox
            }, this)
        }, p.pie.prototype.alignDataLabel = q, p.pie.prototype.verifyDataLabelOverflow = function(a) {
            var b = this.center,
                d = this.options,
                c = d.center,
                e = d.minSize || 80,
                h, k = null !== d.size;
            k || (null !== c[0] ? h = Math.max(b[2] -
                Math.max(a[1], a[3]), e) : (h = Math.max(b[2] - a[1] - a[3], e), b[0] += (a[3] - a[1]) / 2), null !== c[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0], a[2])), e) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), e), b[1] += (a[0] - a[2]) / 2), h < b[2] ? (b[2] = h, b[3] = Math.min(u(d.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : k = !0);
            return k
        });
        p.column && (p.column.prototype.alignDataLabel = function(a, d, h, c, k) {
            var b = this.chart.inverted,
                g = a.series,
                l = a.dlBox || a.shapeArgs,
                m = t(a.below, a.plotY > t(this.translatedThreshold,
                    g.yAxis.len)),
                n = t(h.inside, !!this.options.stacking);
            l && (c = e(l), 0 > c.y && (c.height += c.y, c.y = 0), l = c.y + c.height - g.yAxis.len, 0 < l && (c.height -= l), b && (c = {
                x: g.yAxis.len - c.y - c.height,
                y: g.xAxis.len - c.x - c.width,
                width: c.height,
                height: c.width
            }), n || (b ? (c.x += m ? 0 : c.width, c.width = 0) : (c.y += m ? c.height : 0, c.height = 0)));
            h.align = t(h.align, !b || n ? "center" : m ? "right" : "left");
            h.verticalAlign = t(h.verticalAlign, b || n ? "middle" : m ? "top" : "bottom");
            v.prototype.alignDataLabel.call(this, a, d, h, c, k);
            a.isLabelJustified && a.contrastColor && d.css({
                color: a.contrastColor
            })
        })
    });
    K(G, "modules/overlapping-datalabels.src.js", [G["parts/Globals.js"]], function(a) {
        var C = a.Chart,
            G = a.isArray,
            F = a.objectEach,
            k = a.pick,
            e = a.addEvent,
            q = a.fireEvent;
        e(C, "render", function() {
            var a = [];
            (this.labelCollectors || []).forEach(function(e) {
                a = a.concat(e())
            });
            (this.yAxis || []).forEach(function(e) {
                e.options.stackLabels && !e.options.stackLabels.allowOverlap && F(e.stacks, function(e) {
                    F(e, function(e) {
                        a.push(e.label)
                    })
                })
            });
            (this.series || []).forEach(function(e) {
                var q = e.options.dataLabels;
                e.visible && (!1 !== q.enabled ||
                    e._hasPointLabels) && e.points.forEach(function(e) {
                    e.visible && (G(e.dataLabels) ? e.dataLabels : e.dataLabel ? [e.dataLabel] : []).forEach(function(h) {
                        var d = h.options;
                        h.labelrank = k(d.labelrank, e.labelrank, e.shapeArgs && e.shapeArgs.height);
                        d.allowOverlap || a.push(h)
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        C.prototype.hideOverlappingLabels = function(a) {
            var e = this,
                k = a.length,
                p = e.renderer,
                h, d, m, b, g, l, c = function(a, b, c, d, e, g, h, k) {
                    return !(e > a + c || e + h < a || g > b + d || g + k < b)
                };
            m = function(a) {
                var b, c, d, e = a.box ? 0 : a.padding || 0;
                d = 0;
                if (a &&
                    (!a.alignAttr || a.placed)) return b = a.alignAttr || {
                    x: a.attr("x"),
                    y: a.attr("y")
                }, c = a.parentGroup, a.width || (d = a.getBBox(), a.width = d.width, a.height = d.height, d = p.fontMetrics(null, a.element).h), {
                    x: b.x + (c.translateX || 0) + e,
                    y: b.y + (c.translateY || 0) + e - d,
                    width: a.width - 2 * e,
                    height: a.height - 2 * e
                }
            };
            for (d = 0; d < k; d++)
                if (h = a[d]) h.oldOpacity = h.opacity, h.newOpacity = 1, h.absoluteBox = m(h);
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (d = 0; d < k; d++)
                for (l = (m = a[d]) && m.absoluteBox, h = d + 1; h < k; ++h)
                    if (g = (b = a[h]) &&
                        b.absoluteBox, l && g && m !== b && 0 !== m.newOpacity && 0 !== b.newOpacity && (g = c(l.x, l.y, l.width, l.height, g.x, g.y, g.width, g.height)))(m.labelrank < b.labelrank ? m : b).newOpacity = 0;
            a.forEach(function(a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function() {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b), q(e, "afterHideOverlappingLabels")) : a.attr({
                    opacity: c
                })), a.isOld = !0)
            })
        }
    });
    K(G, "parts/Interaction.js", [G["parts/Globals.js"]], function(a) {
        var C =
            a.addEvent,
            G = a.Chart,
            F = a.createElement,
            k = a.css,
            e = a.defaultOptions,
            q = a.defaultPlotOptions,
            t = a.extend,
            u = a.fireEvent,
            v = a.hasTouch,
            p = a.isObject,
            h = a.Legend,
            d = a.merge,
            m = a.pick,
            b = a.Point,
            g = a.Series,
            l = a.seriesTypes,
            c = a.svg,
            w;
        w = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    d = function(a) {
                        var b = c.getPointFromEvent(a);
                        void 0 !== b && (c.isDirectTouch = !0, b.onMouseOver(a))
                    };
                a.points.forEach(function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point =
                        a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (a.trackerGroups.forEach(function(e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function(a) {
                            c.onTrackerMouseOut(a)
                        });
                        if (v) a[e].on("touchstart", d);
                        !b.styledMode && a.options.cursor && a[e].css(k).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                u(this, "afterDrawTracker")
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    d = b.trackByArea,
                    e = [].concat(d ? a.areaPath : a.graphPath),
                    g = e.length,
                    h = a.chart,
                    k = h.pointer,
                    l = h.renderer,
                    m = h.options.tooltip.snap,
                    f = a.tracker,
                    p, q = function() {
                        if (h.hoverSeries !== a) a.onMouseOver()
                    },
                    t = "rgba(192,192,192," + (c ? .0001 : .002) + ")";
                if (g && !d)
                    for (p = g + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - m, e[p + 2], "L"), (p && "M" === e[p] || p === g) && e.splice(p, 0, "L", e[p - 2] + m, e[p - 1]);
                f ? f.attr({
                    d: e
                }) : a.graph && (a.tracker = l.path(e).attr({
                    visibility: a.visible ? "visible" : "hidden",
                    zIndex: 2
                }).addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), h.styledMode || a.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: t,
                    fill: d ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * m)
                }), [a.tracker, a.markerGroup].forEach(function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", q).on("mouseout", function(a) {
                        k.onTrackerMouseOut(a)
                    });
                    b.cursor && !h.styledMode && a.css({
                        cursor: b.cursor
                    });
                    if (v) a.on("touchstart", q)
                }));
                u(this, "afterDrawTracker")
            }
        };
        l.column && (l.column.prototype.drawTracker = w.drawTrackerPoint);
        l.pie && (l.pie.prototype.drawTracker = w.drawTrackerPoint);
        l.scatter && (l.scatter.prototype.drawTracker = w.drawTrackerPoint);
        t(h.prototype, {
            setItemEvents: function(a, c, e) {
                var h = this,
                    g = h.chart.renderer.boxWrapper,
                    k = a instanceof b,
                    l = "highcharts-legend-" + (k ? "point" : "series") + "-active",
                    m = h.chart.styledMode;
                (e ? c : a.legendGroup).on("mouseover", function() {
                    h.allItems.forEach(function(b) {
                        a !== b && b.setState("inactive", !k)
                    });
                    a.setState("hover");
                    a.visible && g.addClass(l);
                    m || c.css(h.options.itemHoverStyle)
                }).on("mouseout", function() {
                    h.styledMode || c.css(d(a.visible ? h.itemStyle : h.itemHiddenStyle));
                    h.allItems.forEach(function(b) {
                        a !== b && b.setState("", !k)
                    });
                    g.removeClass(l);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    g.removeClass(l);
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : u(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = F("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function(b) {
                    u(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        t(G.prototype, {
            showResetZoom: function() {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    c = e.lang,
                    d = b.options.chart.resetZoomButton,
                    h = d.theme,
                    g = h.states,
                    k = "chart" === d.relativeTo || "spaceBox" === d.relativeTo ? null : "plotBox";
                u(this, "beforeShowResetZoom", null, function() {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, h, g && g.hover).attr({
                        align: d.position.align,
                        title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(d.position, !1,
                        k)
                });
                u(this, "afterShowResetZoom")
            },
            zoomOut: function() {
                u(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function(b) {
                var c = this,
                    d, e = c.pointer,
                    h = !1,
                    g = c.inverted ? e.mouseDownX : e.mouseDownY,
                    k;
                !b || b.resetSelection ? (c.axes.forEach(function(a) {
                    d = a.zoom()
                }), e.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function(b) {
                    var k = b.axis,
                        f = c.inverted ? k.left : k.top,
                        l = c.inverted ? f + k.width : f + k.height,
                        m = k.isXAxis,
                        n = !1;
                    if (!m && g >= f && g <= l || m || !a.defined(g)) n = !0;
                    e[m ? "zoomX" : "zoomY"] && n && (d = k.zoom(b.min, b.max), k.displayBtn &&
                        (h = !0))
                });
                k = c.resetZoomButton;
                h && !k ? c.showResetZoom() : !h && p(k) && (c.resetZoomButton = k.destroy());
                d && c.redraw(m(c.options.chart.animation, b && b.animation, 100 > c.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                u(this, "pan", {
                    originalEvent: a
                }, function() {
                    d && d.forEach(function(a) {
                        a.setState()
                    });
                    ("xy" === b ? [1, 0] : [1]).forEach(function(b) {
                        b = c[b ? "xAxis" : "yAxis"][0];
                        var d = b.horiz,
                            h = a[d ? "chartX" : "chartY"],
                            d = d ? "mouseDownX" : "mouseDownY",
                            g = c[d],
                            f = (b.pointRange || 0) / 2,
                            k = b.reversed && !c.inverted || !b.reversed &&
                            c.inverted ? -1 : 1,
                            l = b.getExtremes(),
                            m = b.toValue(g - h, !0) + f * k,
                            k = b.toValue(g + b.len - h, !0) - f * k,
                            n = k < m,
                            g = n ? k : m,
                            m = n ? m : k,
                            k = Math.min(l.dataMin, f ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
                            f = Math.max(l.dataMax, f ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
                            n = k - g;
                        0 < n && (m += n, g = k);
                        n = m - f;
                        0 < n && (m = f, g -= n);
                        b.series.length && g !== l.min && m !== l.max && (b.setExtremes(g, m, !1, !1, {
                            trigger: "pan"
                        }), e = !0);
                        c[d] = h
                    });
                    e && c.redraw(!1);
                    k(c.container, {
                        cursor: "move"
                    })
                })
            }
        });
        t(b.prototype, {
            select: function(a, b) {
                var c = this,
                    d = c.series,
                    e = d.chart;
                a = m(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    d.options.data[d.data.indexOf(c)] = c.options;
                    c.setState(a && "select");
                    b || e.getSelectedPoints().forEach(function(a) {
                        var b = a.series;
                        a.selected && a !== c && (a.selected = a.options.selected = !1, b.options.data[b.data.indexOf(a)] = a.options, a.setState(e.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = d(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function(a, c) {
                        C(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a,
                b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    e = this.series,
                    h = this.state,
                    g = e.options.states[a || "normal"] || {},
                    k = q[e.type].marker && e.options.marker,
                    l = k && !1 === k.enabled,
                    f = k && k.states && k.states[a || "normal"] || {},
                    p = !1 === f.enabled,
                    v = e.stateMarkerGraphic,
                    z = this.marker || {},
                    w = e.chart,
                    C = e.halo,
                    F, y, G, I = k && e.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (p || l && !1 === f.enabled) || a && z.states && z.states[a] && !1 === z.states[a].enabled)) {
                    this.state = a;
                    I && (F = e.markerAttribs(this,
                        a));
                    if (this.graphic) h && this.graphic.removeClass("highcharts-point-" + h), a && this.graphic.addClass("highcharts-point-" + a), w.styledMode || (y = e.pointAttribs(this, a), G = m(w.options.chart.animation, g.animation), e.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function(a) {
                        a && a.animate({
                            opacity: y.opacity
                        }, G)
                    }), this.connector && this.connector.animate({
                        opacity: y.opacity
                    }, G)), this.graphic.animate(y, G)), F && this.graphic.animate(F, m(w.options.chart.animation, f.animation, k.animation)), v && v.hide();
                    else {
                        if (a &&
                            f) {
                            h = z.symbol || e.symbol;
                            v && v.currentSymbol !== h && (v = v.destroy());
                            if (v) v[b ? "animate" : "attr"]({
                                x: F.x,
                                y: F.y
                            });
                            else h && (e.stateMarkerGraphic = v = w.renderer.symbol(h, F.x, F.y, F.width, F.height).add(e.markerGroup), v.currentSymbol = h);
                            !w.styledMode && v && v.attr(e.pointAttribs(this, a))
                        }
                        v && (v[a && w.isInsidePlot(c, d, w.inverted) ? "show" : "hide"](), v.element.point = this)
                    }(a = g.halo) && a.size ? (C || (e.halo = C = w.renderer.path().add((this.graphic || v).parentGroup)), C.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(a.size)
                    }), C.attr({
                        "class": "highcharts-halo highcharts-color-" +
                            m(this.colorIndex, e.colorIndex) + (this.className ? " " + this.className : ""),
                        zIndex: -1
                    }), C.point = this, w.styledMode || C.attr(t({
                        fill: this.color || e.color,
                        "fill-opacity": a.opacity
                    }, a.attributes))) : C && C.point && C.point.haloPath && C.animate({
                        d: C.point.haloPath(0)
                    }, null, C.hide);
                    u(this, "afterSetState")
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        t(g.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && u(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && u(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                b.series.forEach(function(a) {
                    a.setState("", !0)
                })
            },
            setState: function(a, b) {
                var c = this,
                    d = c.options,
                    e = c.graph,
                    h = d.inactiveOtherPoints,
                    g = d.states,
                    k = d.lineWidth,
                    l = d.opacity,
                    f = m(g[a ||
                        "normal"] && g[a || "normal"].animation, c.chart.options.chart.animation),
                    d = 0;
                a = a || "";
                if (c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function(b) {
                        b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a))
                    }), c.state = a, !c.chart.styledMode)) {
                    if (g[a] && !1 === g[a].enabled) return;
                    a && (k = g[a].lineWidth || k + (g[a].lineWidthPlus || 0), l = m(g[a].opacity, l));
                    if (e && !e.dashstyle)
                        for (g = {
                                "stroke-width": k
                            }, e.animate(g, f); c["zone-graph-" + d];) c["zone-graph-" + d].attr(g), d +=
                            1;
                    h || [c.group, c.markerGroup, c.dataLabelsGroup, c.labelBySeries].forEach(function(a) {
                        a && a.animate({
                            opacity: l
                        }, f)
                    })
                }
                b && h && c.points && c.points.forEach(function(b) {
                    b.setState && b.setState(a)
                })
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    g, h = d.options.chart.ignoreHiddenSeries,
                    k = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(a) {
                    if (c[a]) c[a][g]()
                });
                if (d.hoverSeries ===
                    c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && d.series.forEach(function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                c.linkedSeries.forEach(function(b) {
                    b.setVisible(a, !1)
                });
                h && (d.isDirtyBox = !0);
                u(c, g);
                !1 !== b && d.redraw()
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = this.options.selected = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                u(this, a ? "select" : "unselect")
            },
            drawTracker: w.drawTrackerGraph
        })
    });
    K(G, "parts/Responsive.js", [G["parts/Globals.js"]], function(a) {
        var C = a.Chart,
            G = a.isArray,
            F = a.isObject,
            k = a.pick,
            e = a.splat;
        C.prototype.setResponsive = function(e, k) {
            var q = this.options.responsive,
                t = [],
                p = this.currentResponsive;
            !k && q && q.rules && q.rules.forEach(function(h) {
                void 0 === h._id && (h._id = a.uniqueKey());
                this.matchResponsiveRule(h, t, e)
            }, this);
            k = a.merge.apply(0, t.map(function(e) {
                return a.find(q.rules, function(a) {
                    return a._id === e
                }).chartOptions
            }));
            k.isResponsiveOptions = !0;
            t = t.toString() || void 0;
            t !== (p && p.ruleIds) && (p && this.update(p.undoOptions, e), t ? (p = this.currentOptions(k), p.isResponsiveOptions = !0, this.currentResponsive = {
                ruleIds: t,
                mergedOptions: k,
                undoOptions: p
            }, this.update(k, e)) : this.currentResponsive = void 0)
        };
        C.prototype.matchResponsiveRule = function(a, e) {
            var q = a.condition;
            (q.callback || function() {
                return this.chartWidth <= k(q.maxWidth, Number.MAX_VALUE) && this.chartHeight <= k(q.maxHeight, Number.MAX_VALUE) && this.chartWidth >= k(q.minWidth, 0) && this.chartHeight >=
                    k(q.minHeight, 0)
            }).call(this) && e.push(a._id)
        };
        C.prototype.currentOptions = function(q) {
            function t(q, p, h, d) {
                var m;
                a.objectEach(q, function(a, g) {
                    if (!d && -1 < ["series", "xAxis", "yAxis"].indexOf(g))
                        for (a = e(a), h[g] = [], m = 0; m < a.length; m++) p[g][m] && (h[g][m] = {}, t(a[m], p[g][m], h[g][m], d + 1));
                    else F(a) ? (h[g] = G(a) ? [] : {}, t(a, p[g] || {}, h[g], d + 1)) : h[g] = k(p[g], null)
                })
            }
            var u = {};
            t(q, this.options, u, 0);
            return u
        }
    });
    K(G, "masters/highcharts.src.js", [G["parts/Globals.js"]], function(a) {
        return a
    });
    G["masters/highcharts.src.js"]._modules =
        G;
    return G["masters/highcharts.src.js"]
});
//# sourceMappingURL=highcharts.js.map