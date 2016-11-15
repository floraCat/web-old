/*!
 * Masonry PACKAGED v3.3.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!
function(a) {
	function b() {}

	function c(a) {
		function c(b) {
			b.prototype.option || (b.prototype.option = function(b) {
				a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
			})
		}

		function e(b, c) {
			a.fn[b] = function(e) {
				if ("string" == typeof e) {
					for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
						var j = this[h],
							k = a.data(j, b);
						if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
							var l = k[e].apply(k, g);
							if (void 0 !== l) return l
						} else f("no such method '" + e + "' for " + b + " instance");
						else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
					}
					return this
				}
				return this.each(function() {
					var d = a.data(this, b);
					d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
				})
			}
		}
		if (a) {
			var f = "undefined" == typeof console ? b : function(a) {
					console.error(a)
				};
			return a.bridget = function(a, b) {
				c(b), e(a, b)
			}, a.bridget
		}
	}
	var d = Array.prototype.slice;
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery)
}(window), function(a) {
	function b(b) {
		var c = a.event;
		return c.target = c.target || c.srcElement || b, c
	}
	var c = document.documentElement,
		d = function() {};
	c.addEventListener ? d = function(a, b, c) {
		a.addEventListener(b, c, !1)
	} : c.attachEvent && (d = function(a, c, d) {
		a[c + d] = d.handleEvent ?
		function() {
			var c = b(a);
			d.handleEvent.call(d, c)
		} : function() {
			var c = b(a);
			d.call(a, c)
		}, a.attachEvent("on" + c, a[c + d])
	});
	var e = function() {};
	c.removeEventListener ? e = function(a, b, c) {
		a.removeEventListener(b, c, !1)
	} : c.detachEvent && (e = function(a, b, c) {
		a.detachEvent("on" + b, a[b + c]);
		try {
			delete a[b + c]
		} catch (d) {
			a[b + c] = void 0
		}
	});
	var f = {
		bind: d,
		unbind: e
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f
}(window), function() {
	function a() {}

	function b(a, b) {
		for (var c = a.length; c--;) if (a[c].listener === b) return c;
		return -1
	}

	function c(a) {
		return function() {
			return this[a].apply(this, arguments)
		}
	}
	var d = a.prototype,
		e = this,
		f = e.EventEmitter;
	d.getListeners = function(a) {
		var b, c, d = this._getEvents();
		if (a instanceof RegExp) {
			b = {};
			for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
		} else b = d[a] || (d[a] = []);
		return b
	}, d.flattenListeners = function(a) {
		var b, c = [];
		for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
		return c
	}, d.getListenersAsObject = function(a) {
		var b, c = this.getListeners(a);
		return c instanceof Array && (b = {}, b[a] = c), b || c
	}, d.addListener = function(a, c) {
		var d, e = this.getListenersAsObject(a),
			f = "object" == typeof c;
		for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
			listener: c,
			once: !1
		});
		return this
	}, d.on = c("addListener"), d.addOnceListener = function(a, b) {
		return this.addListener(a, {
			listener: b,
			once: !0
		})
	}, d.once = c("addOnceListener"), d.defineEvent = function(a) {
		return this.getListeners(a), this
	}, d.defineEvents = function(a) {
		for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
		return this
	}, d.removeListener = function(a, c) {
		var d, e, f = this.getListenersAsObject(a);
		for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
		return this
	}, d.off = c("removeListener"), d.addListeners = function(a, b) {
		return this.manipulateListeners(!1, a, b)
	}, d.removeListeners = function(a, b) {
		return this.manipulateListeners(!0, a, b)
	}, d.manipulateListeners = function(a, b, c) {
		var d, e, f = a ? this.removeListener : this.addListener,
			g = a ? this.removeListeners : this.addListeners;
		if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--;) f.call(this, b, c[d]);
		else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
		return this
	}, d.removeEvent = function(a) {
		var b, c = typeof a,
			d = this._getEvents();
		if ("string" === c) delete d[a];
		else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
		else delete this._events;
		return this
	}, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
		var c, d, e, f, g = this.getListenersAsObject(a);
		for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
		return this
	}, d.trigger = c("emitEvent"), d.emit = function(a) {
		var b = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(a, b)
	}, d.setOnceReturnValue = function(a) {
		return this._onceReturnValue = a, this
	}, d._getOnceReturnValue = function() {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, d._getEvents = function() {
		return this._events || (this._events = {})
	}, a.noConflict = function() {
		return e.EventEmitter = f, a
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
		return a
	}) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
}.call(this), function(a) {
	function b(a) {
		if (a) {
			if ("string" == typeof d[a]) return a;
			a = a.charAt(0).toUpperCase() + a.slice(1);
			for (var b, e = 0, f = c.length; f > e; e++) if (b = c[e] + a, "string" == typeof d[b]) return b
		}
	}
	var c = "Webkit Moz ms Ms O".split(" "),
		d = document.documentElement.style;
	"function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
		return b
	}) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
}(window), function(a) {
	function b(a) {
		var b = parseFloat(a),
			c = -1 === a.indexOf("%") && !isNaN(b);
		return c && b
	}

	function c() {}

	function d() {
		for (var a = {
			width: 0,
			height: 0,
			innerWidth: 0,
			innerHeight: 0,
			outerWidth: 0,
			outerHeight: 0
		}, b = 0, c = g.length; c > b; b++) {
			var d = g[b];
			a[d] = 0
		}
		return a
	}

	function e(c) {
		function e() {
			if (!m) {
				m = !0;
				var d = a.getComputedStyle;
				if (j = function() {
					var a = d ?
					function(a) {
						return d(a, null)
					} : function(a) {
						return a.currentStyle
					};
					return function(b) {
						var c = a(b);
						return c || f("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c
					}
				}(), k = c("boxSizing")) {
					var e = document.createElement("div");
					e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
					var g = document.body || document.documentElement;
					g.appendChild(e);
					var h = j(e);
					l = 200 === b(h.width), g.removeChild(e)
				}
			}
		}

		function h(a) {
			if (e(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
				var c = j(a);
				if ("none" === c.display) return d();
				var f = {};
				f.width = a.offsetWidth, f.height = a.offsetHeight;
				for (var h = f.isBorderBox = !(!k || !c[k] || "border-box" !== c[k]), m = 0, n = g.length; n > m; m++) {
					var o = g[m],
						p = c[o];
					p = i(a, p);
					var q = parseFloat(p);
					f[o] = isNaN(q) ? 0 : q
				}
				var r = f.paddingLeft + f.paddingRight,
					s = f.paddingTop + f.paddingBottom,
					t = f.marginLeft + f.marginRight,
					u = f.marginTop + f.marginBottom,
					v = f.borderLeftWidth + f.borderRightWidth,
					w = f.borderTopWidth + f.borderBottomWidth,
					x = h && l,
					y = b(c.width);
				y !== !1 && (f.width = y + (x ? 0 : r + v));
				var z = b(c.height);
				return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
			}
		}

		function i(b, c) {
			if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
			var d = b.style,
				e = d.left,
				f = b.runtimeStyle,
				g = f && f.left;
			return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c
		}
		var j, k, l, m = !1;
		return h
	}
	var f = "undefined" == typeof console ? c : function(a) {
			console.error(a)
		},
		g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
	"function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property")) : a.getSize = e(a.getStyleProperty)
}(window), function(a) {
	function b(a) {
		"function" == typeof a && (b.isReady ? a() : g.push(a))
	}

	function c(a) {
		var c = "readystatechange" === a.type && "complete" !== f.readyState;
		b.isReady || c || d()
	}

	function d() {
		b.isReady = !0;
		for (var a = 0, c = g.length; c > a; a++) {
			var d = g[a];
			d()
		}
	}

	function e(e) {
		return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), e.bind(a, "load", c)), b
	}
	var f = a.document,
		g = [];
	b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie)
}(window), function(a) {
	function b(a, b) {
		return a[g](b)
	}

	function c(a) {
		if (!a.parentNode) {
			var b = document.createDocumentFragment();
			b.appendChild(a)
		}
	}

	function d(a, b) {
		c(a);
		for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++) if (d[e] === a) return !0;
		return !1
	}

	function e(a, d) {
		return c(a), b(a, d)
	}
	var f, g = function() {
			if (a.matches) return "matches";
			if (a.matchesSelector) return "matchesSelector";
			for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) {
				var e = b[c],
					f = e + "MatchesSelector";
				if (a[f]) return f
			}
		}();
	if (g) {
		var h = document.createElement("div"),
			i = b(h, "div");
		f = i ? b : e
	} else f = d;
	"function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
		return f
	}) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
}(Element.prototype), function(a, b) {
	"function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(c, d) {
		return b(a, c, d)
	}) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector)
}(window, function(a, b, c) {
	var d = {};
	d.extend = function(a, b) {
		for (var c in b) a[c] = b[c];
		return a
	}, d.modulo = function(a, b) {
		return (a % b + b) % b
	};
	var e = Object.prototype.toString;
	d.isArray = function(a) {
		return "[object Array]" == e.call(a)
	}, d.makeArray = function(a) {
		var b = [];
		if (d.isArray(a)) b = a;
		else if (a && "number" == typeof a.length) for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
		else b.push(a);
		return b
	}, d.indexOf = Array.prototype.indexOf ?
	function(a, b) {
		return a.indexOf(b)
	} : function(a, b) {
		for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
		return -1
	}, d.removeFrom = function(a, b) {
		var c = d.indexOf(a, b); - 1 != c && a.splice(c, 1)
	}, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ?
	function(a) {
		return a instanceof HTMLElement
	} : function(a) {
		return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
	}, d.setText = function() {
		function a(a, c) {
			b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), a[b] = c
		}
		var b;
		return a
	}(), d.getParent = function(a, b) {
		for (; a != document.body;) if (a = a.parentNode, c(a, b)) return a
	}, d.getQueryElement = function(a) {
		return "string" == typeof a ? document.querySelector(a) : a
	}, d.handleEvent = function(a) {
		var b = "on" + a.type;
		this[b] && this[b](a)
	}, d.filterFindElements = function(a, b) {
		a = d.makeArray(a);
		for (var e = [], f = 0, g = a.length; g > f; f++) {
			var h = a[f];
			if (d.isElement(h)) if (b) {
				c(h, b) && e.push(h);
				for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j])
			} else e.push(h)
		}
		return e
	}, d.debounceMethod = function(a, b, c) {
		var d = a.prototype[b],
			e = b + "Timeout";
		a.prototype[b] = function() {
			var a = this[e];
			a && clearTimeout(a);
			var b = arguments,
				f = this;
			this[e] = setTimeout(function() {
				d.apply(f, b), delete f[e]
			}, c || 100)
		}
	}, d.toDashed = function(a) {
		return a.replace(/(.)([A-Z])/g, function(a, b, c) {
			return b + "-" + c
		}).toLowerCase()
	};
	var f = a.console;
	return d.htmlInit = function(c, e) {
		b(function() {
			for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) {
				var k, l = g[i],
					m = l.getAttribute(h);
				try {
					k = m && JSON.parse(m)
				} catch (n) {
					f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n);
					continue
				}
				var o = new c(l, k),
					p = a.jQuery;
				p && p.data(l, e, o)
			}
		})
	}, d
}), function(a, b) {
	"function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(c, d, e, f) {
		return b(a, c, d, e, f)
	}) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils))
}(window, function(a, b, c, d, e) {
	function f(a) {
		for (var b in a) return !1;
		return b = null, !0
	}

	function g(a, b) {
		a && (this.element = a, this.layout = b, this.position = {
			x: 0,
			y: 0
		}, this._create())
	}
	var h = a.getComputedStyle,
		i = h ?
	function(a) {
		return h(a, null)
	} : function(a) {
		return a.currentStyle
	}, j = d("transition"), k = d("transform"), l = j && k, m = !! d("perspective"), n = {
		WebkitTransition: "webkitTransitionEnd",
		MozTransition: "transitionend",
		OTransition: "otransitionend",
		transition: "transitionend"
	}[j], o = ["transform", "transition", "transitionDuration", "transitionProperty"], p = function() {
		for (var a = {}, b = 0, c = o.length; c > b; b++) {
			var e = o[b],
				f = d(e);
			f && f !== e && (a[e] = f)
		}
		return a
	}();
	e.extend(g.prototype, b.prototype), g.prototype._create = function() {
		this._transn = {
			ingProperties: {},
			clean: {},
			onEnd: {}
		}, this.css({
			position: "absolute"
		})
	}, g.prototype.handleEvent = function(a) {
		var b = "on" + a.type;
		this[b] && this[b](a)
	}, g.prototype.getSize = function() {
		this.size = c(this.element)
	}, g.prototype.css = function(a) {
		var b = this.element.style;
		for (var c in a) {
			var d = p[c] || c;
			b[d] = a[c]
		}
	}, g.prototype.getPosition = function() {
		var a = i(this.element),
			b = this.layout.options,
			c = b.isOriginLeft,
			d = b.isOriginTop,
			e = parseInt(a[c ? "left" : "right"], 10),
			f = parseInt(a[d ? "top" : "bottom"], 10);
		e = isNaN(e) ? 0 : e, f = isNaN(f) ? 0 : f;
		var g = this.layout.size;
		e -= c ? g.paddingLeft : g.paddingRight, f -= d ? g.paddingTop : g.paddingBottom, this.position.x = e, this.position.y = f
	}, g.prototype.layoutPosition = function() {
		var a = this.layout.size,
			b = this.layout.options,
			c = {},
			d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
			e = b.isOriginLeft ? "left" : "right",
			f = b.isOriginLeft ? "right" : "left",
			g = this.position.x + a[d];
		g = b.percentPosition && !b.isHorizontal ? g / a.width * 100 + "%" : g + "px", c[e] = g, c[f] = "";
		var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
			i = b.isOriginTop ? "top" : "bottom",
			j = b.isOriginTop ? "bottom" : "top",
			k = this.position.y + a[h];
		k = b.percentPosition && b.isHorizontal ? k / a.height * 100 + "%" : k + "px", c[i] = k, c[j] = "", this.css(c), this.emitEvent("layout", [this])
	};
	var q = m ?
	function(a, b) {
		return "translate3d(" + a + "px, " + b + "px, 0)"
	} : function(a, b) {
		return "translate(" + a + "px, " + b + "px)"
	};
	g.prototype._transitionTo = function(a, b) {
		this.getPosition();
		var c = this.position.x,
			d = this.position.y,
			e = parseInt(a, 10),
			f = parseInt(b, 10),
			g = e === this.position.x && f === this.position.y;
		if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
		var h = a - c,
			i = b - d,
			j = {},
			k = this.layout.options;
		h = k.isOriginLeft ? h : -h, i = k.isOriginTop ? i : -i, j.transform = q(h, i), this.transition({
			to: j,
			onTransitionEnd: {
				transform: this.layoutPosition
			},
			isCleaning: !0
		})
	}, g.prototype.goTo = function(a, b) {
		this.setPosition(a, b), this.layoutPosition()
	}, g.prototype.moveTo = l ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function(a, b) {
		this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
	}, g.prototype._nonTransition = function(a) {
		this.css(a.to), a.isCleaning && this._removeStyles(a.to);
		for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
	}, g.prototype._transition = function(a) {
		if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
		var b = this._transn;
		for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
		for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
		if (a.from) {
			this.css(a.from);
			var d = this.element.offsetHeight;
			d = null
		}
		this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
	};
	var r = k && e.toDashed(k) + ",opacity";
	g.prototype.enableTransition = function() {
		this.isTransitioning || (this.css({
			transitionProperty: r,
			transitionDuration: this.layout.options.transitionDuration
		}), this.element.addEventListener(n, this, !1))
	}, g.prototype.transition = g.prototype[j ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function(a) {
		this.ontransitionend(a)
	}, g.prototype.onotransitionend = function(a) {
		this.ontransitionend(a)
	};
	var s = {
		"-webkit-transform": "transform",
		"-moz-transform": "transform",
		"-o-transform": "transform"
	};
	g.prototype.ontransitionend = function(a) {
		if (a.target === this.element) {
			var b = this._transn,
				c = s[a.propertyName] || a.propertyName;
			if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) {
				var d = b.onEnd[c];
				d.call(this), delete b.onEnd[c]
			}
			this.emitEvent("transitionEnd", [this])
		}
	}, g.prototype.disableTransition = function() {
		this.removeTransitionStyles(), this.element.removeEventListener(n, this, !1), this.isTransitioning = !1
	}, g.prototype._removeStyles = function(a) {
		var b = {};
		for (var c in a) b[c] = "";
		this.css(b)
	};
	var t = {
		transitionProperty: "",
		transitionDuration: ""
	};
	return g.prototype.removeTransitionStyles = function() {
		this.css(t)
	}, g.prototype.removeElem = function() {
		this.element.parentNode.removeChild(this.element), this.css({
			display: ""
		}), this.emitEvent("remove", [this])
	}, g.prototype.remove = function() {
		if (!j || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
		var a = this;
		this.once("transitionEnd", function() {
			a.removeElem()
		}), this.hide()
	}, g.prototype.reveal = function() {
		delete this.isHidden, this.css({
			display: ""
		});
		var a = this.layout.options,
			b = {},
			c = this.getHideRevealTransitionEndProperty("visibleStyle");
		b[c] = this.onRevealTransitionEnd, this.transition({
			from: a.hiddenStyle,
			to: a.visibleStyle,
			isCleaning: !0,
			onTransitionEnd: b
		})
	}, g.prototype.onRevealTransitionEnd = function() {
		this.isHidden || this.emitEvent("reveal")
	}, g.prototype.getHideRevealTransitionEndProperty = function(a) {
		var b = this.layout.options[a];
		if (b.opacity) return "opacity";
		for (var c in b) return c
	}, g.prototype.hide = function() {
		this.isHidden = !0, this.css({
			display: ""
		});
		var a = this.layout.options,
			b = {},
			c = this.getHideRevealTransitionEndProperty("hiddenStyle");
		b[c] = this.onHideTransitionEnd, this.transition({
			from: a.visibleStyle,
			to: a.hiddenStyle,
			isCleaning: !0,
			onTransitionEnd: b
		})
	}, g.prototype.onHideTransitionEnd = function() {
		this.isHidden && (this.css({
			display: "none"
		}), this.emitEvent("hide"))
	}, g.prototype.destroy = function() {
		this.css({
			position: "",
			left: "",
			right: "",
			top: "",
			bottom: "",
			transition: "",
			transform: ""
		})
	}, g
}), function(a, b) {
	"function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(c, d, e, f, g) {
		return b(a, c, d, e, f, g)
	}) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item)
}(window, function(a, b, c, d, e, f) {
	function g(a, b) {
		var c = e.getQueryElement(a);
		if (!c) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));
		this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), this.option(b);
		var d = ++k;
		this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout()
	}
	var h = a.console,
		i = a.jQuery,
		j = function() {},
		k = 0,
		l = {};
	return g.namespace = "outlayer", g.Item = f, g.defaults = {
		containerStyle: {
			position: "relative"
		},
		isInitLayout: !0,
		isOriginLeft: !0,
		isOriginTop: !0,
		isResizeBound: !0,
		isResizingContainer: !0,
		transitionDuration: "0.4s",
		hiddenStyle: {
			opacity: 0,
			transform: "scale(0.001)"
		},
		visibleStyle: {
			opacity: 1,
			transform: "scale(1)"
		}
	}, e.extend(g.prototype, c.prototype), g.prototype.option = function(a) {
		e.extend(this.options, a)
	}, g.prototype._create = function() {
		this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
	}, g.prototype.reloadItems = function() {
		this.items = this._itemize(this.element.children)
	}, g.prototype._itemize = function(a) {
		for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
			var g = b[e],
				h = new c(g, this);
			d.push(h)
		}
		return d
	}, g.prototype._filterFindItemElements = function(a) {
		return e.filterFindElements(a, this.options.itemSelector)
	}, g.prototype.getItemElements = function() {
		for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
		return a
	}, g.prototype.layout = function() {
		this._resetLayout(), this._manageStamps();
		var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
		this.layoutItems(this.items, a), this._isLayoutInited = !0
	}, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function() {
		this.getSize()
	}, g.prototype.getSize = function() {
		this.size = d(this.element)
	}, g.prototype._getMeasurement = function(a, b) {
		var c, f = this.options[a];
		f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c)[b] : f) : this[a] = 0
	}, g.prototype.layoutItems = function(a, b) {
		a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
	}, g.prototype._getItemsForLayout = function(a) {
		for (var b = [], c = 0, d = a.length; d > c; c++) {
			var e = a[c];
			e.isIgnored || b.push(e)
		}
		return b
	}, g.prototype._layoutItems = function(a, b) {
		if (this._emitCompleteOnItems("layout", a), a && a.length) {
			for (var c = [], d = 0, e = a.length; e > d; d++) {
				var f = a[d],
					g = this._getItemLayoutPosition(f);
				g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g)
			}
			this._processLayoutQueue(c)
		}
	}, g.prototype._getItemLayoutPosition = function() {
		return {
			x: 0,
			y: 0
		}
	}, g.prototype._processLayoutQueue = function(a) {
		for (var b = 0, c = a.length; c > b; b++) {
			var d = a[b];
			this._positionItem(d.item, d.x, d.y, d.isInstant)
		}
	}, g.prototype._positionItem = function(a, b, c, d) {
		d ? a.goTo(b, c) : a.moveTo(b, c)
	}, g.prototype._postLayout = function() {
		this.resizeContainer()
	}, g.prototype.resizeContainer = function() {
		if (this.options.isResizingContainer) {
			var a = this._getContainerSize();
			a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
		}
	}, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function(a, b) {
		if (void 0 !== a) {
			var c = this.size;
			c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
		}
	}, g.prototype._emitCompleteOnItems = function(a, b) {
		function c() {
			e.emitEvent(a + "Complete", [b])
		}

		function d() {
			g++, g === f && c()
		}
		var e = this,
			f = b.length;
		if (!b || !f) return void c();
		for (var g = 0, h = 0, i = b.length; i > h; h++) {
			var j = b[h];
			j.once(a, d)
		}
	}, g.prototype.ignore = function(a) {
		var b = this.getItem(a);
		b && (b.isIgnored = !0)
	}, g.prototype.unignore = function(a) {
		var b = this.getItem(a);
		b && delete b.isIgnored
	}, g.prototype.stamp = function(a) {
		if (a = this._find(a)) {
			this.stamps = this.stamps.concat(a);
			for (var b = 0, c = a.length; c > b; b++) {
				var d = a[b];
				this.ignore(d)
			}
		}
	}, g.prototype.unstamp = function(a) {
		if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) {
			var d = a[b];
			e.removeFrom(this.stamps, d), this.unignore(d)
		}
	}, g.prototype._find = function(a) {
		return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0
	}, g.prototype._manageStamps = function() {
		if (this.stamps && this.stamps.length) {
			this._getBoundingRect();
			for (var a = 0, b = this.stamps.length; b > a; a++) {
				var c = this.stamps[a];
				this._manageStamp(c)
			}
		}
	}, g.prototype._getBoundingRect = function() {
		var a = this.element.getBoundingClientRect(),
			b = this.size;
		this._boundingRect = {
			left: a.left + b.paddingLeft + b.borderLeftWidth,
			top: a.top + b.paddingTop + b.borderTopWidth,
			right: a.right - (b.paddingRight + b.borderRightWidth),
			bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
		}
	}, g.prototype._manageStamp = j, g.prototype._getElementOffset = function(a) {
		var b = a.getBoundingClientRect(),
			c = this._boundingRect,
			e = d(a),
			f = {
				left: b.left - c.left - e.marginLeft,
				top: b.top - c.top - e.marginTop,
				right: c.right - b.right - e.marginRight,
				bottom: c.bottom - b.bottom - e.marginBottom
			};
		return f
	}, g.prototype.handleEvent = function(a) {
		var b = "on" + a.type;
		this[b] && this[b](a)
	}, g.prototype.bindResize = function() {
		this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0)
	}, g.prototype.unbindResize = function() {
		this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1
	}, g.prototype.onresize = function() {
		function a() {
			b.resize(), delete b.resizeTimeout
		}
		this.resizeTimeout && clearTimeout(this.resizeTimeout);
		var b = this;
		this.resizeTimeout = setTimeout(a, 100)
	}, g.prototype.resize = function() {
		this.isResizeBound && this.needsResizeLayout() && this.layout()
	}, g.prototype.needsResizeLayout = function() {
		var a = d(this.element),
			b = this.size && a;
		return b && a.innerWidth !== this.size.innerWidth
	}, g.prototype.addItems = function(a) {
		var b = this._itemize(a);
		return b.length && (this.items = this.items.concat(b)), b
	}, g.prototype.appended = function(a) {
		var b = this.addItems(a);
		b.length && (this.layoutItems(b, !0), this.reveal(b))
	}, g.prototype.prepended = function(a) {
		var b = this._itemize(a);
		if (b.length) {
			var c = this.items.slice(0);
			this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c)
		}
	}, g.prototype.reveal = function(a) {
		this._emitCompleteOnItems("reveal", a);
		for (var b = a && a.length, c = 0; b && b > c; c++) {
			var d = a[c];
			d.reveal()
		}
	}, g.prototype.hide = function(a) {
		this._emitCompleteOnItems("hide", a);
		for (var b = a && a.length, c = 0; b && b > c; c++) {
			var d = a[c];
			d.hide()
		}
	}, g.prototype.revealItemElements = function(a) {
		var b = this.getItems(a);
		this.reveal(b)
	}, g.prototype.hideItemElements = function(a) {
		var b = this.getItems(a);
		this.hide(b)
	}, g.prototype.getItem = function(a) {
		for (var b = 0, c = this.items.length; c > b; b++) {
			var d = this.items[b];
			if (d.element === a) return d
		}
	}, g.prototype.getItems = function(a) {
		a = e.makeArray(a);
		for (var b = [], c = 0, d = a.length; d > c; c++) {
			var f = a[c],
				g = this.getItem(f);
			g && b.push(g)
		}
		return b
	}, g.prototype.remove = function(a) {
		var b = this.getItems(a);
		if (this._emitCompleteOnItems("remove", b), b && b.length) for (var c = 0, d = b.length; d > c; c++) {
			var f = b[c];
			f.remove(), e.removeFrom(this.items, f)
		}
	}, g.prototype.destroy = function() {
		var a = this.element.style;
		a.height = "", a.position = "", a.width = "";
		for (var b = 0, c = this.items.length; c > b; b++) {
			var d = this.items[b];
			d.destroy()
		}
		this.unbindResize();
		var e = this.element.outlayerGUID;
		delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace)
	}, g.data = function(a) {
		a = e.getQueryElement(a);
		var b = a && a.outlayerGUID;
		return b && l[b]
	}, g.create = function(a, b) {
		function c() {
			g.apply(this, arguments)
		}
		return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function() {
			f.apply(this, arguments)
		}, c.Item.prototype = new f, e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c
	}, g.Item = f, g
}), function(a, b) {
	"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils)
}(window, function(a, b, c) {
	var d = a.create("masonry");
	return d.prototype._resetLayout = function() {
		this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
		var a = this.cols;
		for (this.colYs = []; a--;) this.colYs.push(0);
		this.maxY = 0
	}, d.prototype.measureColumns = function() {
		if (this.getContainerWidth(), !this.columnWidth) {
			var a = this.items[0],
				c = a && a.element;
			this.columnWidth = c && b(c).outerWidth || this.containerWidth
		}
		var d = this.columnWidth += this.gutter,
			e = this.containerWidth + this.gutter,
			f = e / d,
			g = d - e % d,
			h = g && 1 > g ? "round" : "floor";
		f = Math[h](f), this.cols = Math.max(f, 1)
	}, d.prototype.getContainerWidth = function() {
		var a = this.options.isFitWidth ? this.element.parentNode : this.element,
			c = b(a);
		this.containerWidth = c && c.innerWidth
	}, d.prototype._getItemLayoutPosition = function(a) {
		a.getSize();
		var b = a.size.outerWidth % this.columnWidth,
			d = b && 1 > b ? "round" : "ceil",
			e = Math[d](a.size.outerWidth / this.columnWidth);
		e = Math.min(e, this.cols);
		for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = {
			x: this.columnWidth * h,
			y: g
		}, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
		return i
	}, d.prototype._getColGroup = function(a) {
		if (2 > a) return this.colYs;
		for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
			var e = this.colYs.slice(d, d + a);
			b[d] = Math.max.apply(Math, e)
		}
		return b
	}, d.prototype._manageStamp = function(a) {
		var c = b(a),
			d = this._getElementOffset(a),
			e = this.options.isOriginLeft ? d.left : d.right,
			f = e + c.outerWidth,
			g = Math.floor(e / this.columnWidth);
		g = Math.max(0, g);
		var h = Math.floor(f / this.columnWidth);
		h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
		for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j])
	}, d.prototype._getContainerSize = function() {
		this.maxY = Math.max.apply(Math, this.colYs);
		var a = {
			height: this.maxY
		};
		return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
	}, d.prototype._getContainerFitWidth = function() {
		for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
		return (this.cols - a) * this.columnWidth - this.gutter
	}, d.prototype.needsResizeLayout = function() {
		var a = this.containerWidth;
		return this.getContainerWidth(), a !== this.containerWidth
	}, d
});