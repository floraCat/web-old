(function(e) {
	"use strict";

	function r(e, r) {
		var i = e.outerWidth(true),
			s = {},
			o = {};
		if (e.is(":visible") || n) {
			return
		}
		n = true;
		e.addClass("ps-active-panel").css({
			position: "fixed",
			top: 0,
			height: "100%",
			"z-index": 999999
		});
		e.data(r);
		switch (r.side) {
		case "left":
			e.css({
				left: "-" + i + "px",
				right: "auto"
			});
			s["margin-left"] = "+=" + i;
			o.left = "+=" + i;
			break;
		case "right":
			e.css({
				left: "auto",
				right: "-" + i + "px"
			});
			s["margin-left"] = "-=" + i;
			o.right = "+=" + i;
			break
		}
		t.animate(s, r.duration);
		e.show().animate(o, r.duration, function() {
			n = false
		})
	}
	var t = e("body"),
		n = false;
	e.panelslider = function(t, n) {
		var i = e(".ps-active-panel");
		var s = {
			side: "left",
			duration: 200,
			clickClose: true
		};
		n = e.extend({}, s, n);
		if (i.is(":visible") && i[0] != t[0]) {
			e.panelslider.close(function() {
				r(t, n)
			})
		} else if (!i.length || i.is(":hidden")) {
			r(t, n)
		}
	};
	e.panelslider.close = function(r) {
		var i = e(".ps-active-panel"),
			s = i.data("duration"),
			o = i.outerWidth(true),
			u = {},
			a = {};
		if (!i.length || i.is(":hidden") || n) {
			return
		}
		n = true;
		switch (i.data("side")) {
		case "left":
			u["margin-left"] = "-=" + o;
			a.left = "-=" + o;
			break;
		case "right":
			u["margin-left"] = "+=" + o;
			a.right = "-=" + o;
			break
		}
		i.animate(a, s);
		t.animate(u, s, function() {
			i.hide();
			i.removeClass("ps-active-panel");
			n = false;
			if (r) {
				r()
			}
		})
	};
	e(document).bind("click keyup", function(t) {
		var n = e(".ps-active-panel");
		if (t.type == "keyup" && t.keyCode != 27) {
			return
		}
		if (n.is(":visible") && n.data("clickClose")) {
			e.panelslider.close()
		}
	});
	e(document).on("click", ".ps-active-panel", function(e) {
		e.stopPropagation()
	});
	e.fn.panelslider = function(t) {
		this.click(function(n) {
			var r = e(".ps-active-panel"),
				i = e(this.getAttribute("href"));
			if (r.is(":visible") && i[0] == r[0]) {
				e.panelslider.close()
			} else {
				e.panelslider(i, t)
			}
			n.preventDefault();
			n.stopPropagation()
		});
		return this
	}
})(jQuery)