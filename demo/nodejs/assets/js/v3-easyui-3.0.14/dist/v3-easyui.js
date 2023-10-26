 /**
 * EasyUI for Vue 3.0.14
 * 
 * Copyright (c) 2009-2023 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware4.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { createVNode, withDirectives, resolveDirective, defineComponent, Fragment, vModelText, isVNode, h, mergeProps, resolveComponent, render, createTextVNode } from "vue";
const ValidateRules = {
  required: {
    validator: (e) => e == null ? !1 : typeof e == "boolean" ? e : String(e).trim().length > 0,
    message: "This field is required."
  },
  length: {
    validator: function(e, i) {
      var s = e ? String(e).trim().length : 0;
      return s >= i[0] && s <= i[1];
    },
    message: "Please enter a value between {0} and {1}."
  },
  email: {
    validator: (e) => /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/.test(e),
    message: "Please enter a valid email address."
  },
  url: {
    validator: (e) => /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e),
    message: "Please enter a valid URL."
  }
};
let lang = null;
const t = (e, i = null) => {
  if (lang) {
    let s = lang, l = e.split(".");
    for (let r = 0; r < l.length; r++) {
      let a = l[r];
      if (s[a])
        s = s[a];
      else
        return i;
    }
    return s || i;
  }
  return i;
}, use = (e) => {
  lang = e || lang;
}, Locale = {
  use,
  t
};
let guid = 1;
class MyEvent {
  constructor(i) {
    if (this.event = i, this.pageX = i.pageX, this.pageY = i.pageY, ["touchstart", "touchmove", "touchend", "touchcancel"].indexOf(i.type) >= 0) {
      let l = i.touches[0] || i.changedTouches[0];
      this.pageX = l.pageX, this.pageY = l.pageY;
    }
  }
  preventDefault() {
    this.event.preventDefault();
  }
  stopPropagation() {
    this.event.stopPropagation();
  }
}
class DomHelper {
  getElement(i) {
    return typeof i == "string" ? document.querySelector(i) : i;
  }
  outerWidth(i, s) {
    let l = this.getElement(i);
    if (!l)
      return 0;
    let r = l.offsetWidth;
    if (s) {
      let a = getComputedStyle(l);
      r += (parseInt(a.getPropertyValue("margin-left")) || 0) + (parseInt(a.getPropertyValue("margin-right")) || 0);
    }
    return r;
  }
  outerHeight(i, s) {
    let l = this.getElement(i);
    if (!l)
      return 0;
    let r = l.offsetHeight;
    if (s) {
      let a = getComputedStyle(l);
      r += (parseInt(a.getPropertyValue("margin-top")) || 0) + (parseInt(a.getPropertyValue("margin-bottom")) || 0);
    }
    return r;
  }
  closest(i, s) {
    let l = this.getElement(i);
    for (var r = l.matches || l.webkitMatchesSelector || l.mozMatchesSelector || l.msMatchesSelector; l && !r.call(l, s); )
      l = l.parentElement;
    return l;
  }
  isChild(i, s) {
    let l = this.getElement(s), r = this.getElement(i);
    for (; r && r != l; )
      r = r.parentNode;
    return r == l;
  }
  offset(i) {
    let l = this.getElement(i).getBoundingClientRect(), r = l.left, a = l.top;
    return { left: r + this.getScrollLeft(), top: a + this.getScrollTop() };
  }
  position(i) {
    let s = this.getElement(i), l = s.offsetParent;
    if (!l)
      return {
        left: 0,
        top: 0
      };
    for (; l && !/^body|html$/i.test(l.tagName) && getComputedStyle(l).getPropertyValue("position") == "static"; )
      l = l.offsetParent;
    let r = this.offset(i), a = /^body|html$/i.test(l.tagName) ? { top: 0, left: 0 } : this.offset(l), n = getComputedStyle(s);
    return r.left -= parseInt(n.getPropertyValue("margin-left")) || 0, r.top -= parseInt(n.getPropertyValue("margin-top")) || 0, n = getComputedStyle(l), a.left += parseInt(n.getPropertyValue("border-left-width")) || 0, a.top += parseInt(n.getPropertyValue("border-top-width")) || 0, {
      left: r.left - a.left,
      top: r.top - a.top
    };
  }
  getScrollLeft() {
    return Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
  }
  getScrollTop() {
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  }
  getViewport() {
    let i = document.documentElement, s = document.getElementsByTagName("body")[0];
    return {
      width: window.innerWidth || i.clientWidth || s.clientWidth,
      height: window.innerHeight || i.clientHeight || s.clientHeight
    };
  }
  isAutoSize(i) {
    let s = String(i);
    return s == "auto" || s == "";
  }
  toStyleValue(i) {
    if (i == null)
      return null;
    let s = String(i);
    var l = s.substr(s.length - 1, 1);
    return l >= "0" && l <= "9" ? s + "px" : s;
  }
  addClass(i, s) {
    this.getElement(i).classList.add(s);
  }
  removeClass(i, s) {
    this.getElement(i).classList.remove(s);
  }
  hasClass(i, s) {
    return this.getElement(i).classList.contains(s);
  }
  scrollTo(i, s) {
    let l = this.offset(i), r = this.offset(s), a = this.outerHeight(i), n = this.outerHeight(s), o = r.top - l.top;
    o < 0 ? i.scrollTop = i.scrollTop + o - 1 : o > a - n && (i.scrollTop = i.scrollTop - (a - n - o - 1));
  }
  slideUp(i, s) {
    let l = this.getElement(i);
    if (this.hasClass(l, "f-hide"))
      return;
    let r = l.style.height, a = this.outerHeight(l);
    l.style.height = a + "px";
    let n = () => {
      this.removeClass(l, "f-animate"), this.removeClass(l, "panel-noscroll"), this.addClass(l, "f-hide"), l.style.height = r, l.removeEventListener("transitionend", n, !1), s && s();
    };
    l.addEventListener("transitionend", n, !1), setTimeout(() => {
      this.addClass(l, "f-animate"), this.addClass(l, "panel-noscroll"), l.style.height = "0px";
    }, 50);
  }
  slideDown(i, s) {
    let l = this.getElement(i);
    if (!this.hasClass(l, "f-hide"))
      return;
    this.addClass(l, "panel-noscroll"), this.removeClass(l, "f-hide");
    let r = l.style.height, a = this.outerHeight(l);
    l.style.height = "0px";
    let n = () => {
      this.removeClass(l, "f-animate"), this.removeClass(l, "panel-noscroll"), l.style.height = r, l.removeEventListener("transitionend", n, !1), s && s();
    };
    l.addEventListener("transitionend", n, !1), setTimeout(() => {
      this.addClass(l, "f-animate"), l.style.height = a + "px";
    }, 50);
  }
  nextGuid() {
    return ++guid;
  }
  bind(i, s, l) {
    l.guid = l.guid || guid++;
    let r = (n) => {
      l.call(this, n) == !1 && (n.preventDefault(), n.stopPropagation());
    }, a = this.getElement(i);
    a.myevents = a.myevents || {}, a.myevents[s] || (a.myevents[s] = {}), a.myevents[s][String(l.guid)] = r, a.addEventListener(s, r, !1);
  }
  unbind(i, s, l) {
    let r = this.getElement(i);
    if (s)
      if (l) {
        let a = r.myevents[s][String(l.guid)];
        a && r.removeEventListener(s, a, !1), delete r.myevents[s][String(l.guid)];
      } else {
        for (let a in r.myevents[s]) {
          let n = r.myevents[s][a];
          r.removeEventListener(s, n, !1);
        }
        delete r.myevents[s];
      }
    else {
      for (let a in r.myevents)
        for (let n in r.myevents[a]) {
          let o = r.myevents[a][n];
          r.removeEventListener(a, o, !1);
        }
      delete r.myevents;
    }
  }
}
const domHelper = new DomHelper(), SlideUpDown = {
  mounted(e, i) {
    i.value.disabled || (i.value.collapsed && (e.collapsed = !0, domHelper.addClass(e, "f-hide")), e.sliding = !1);
  },
  updated(e, i) {
    if (!i.value.disabled && i.value.collapsed != e.collapsed)
      if (i.value.animate) {
        if (e.sliding)
          return;
        e.sliding = !0, i.value.collapsed ? domHelper.slideUp(e, () => {
          e.sliding = !1, e.collapsed = !0;
        }) : domHelper.slideDown(e, () => {
          e.sliding = !1, e.collapsed = !1;
        }), setTimeout(() => {
          e.sliding = !1;
        }, 400);
      } else
        e.collapsed = i.value.collapsed, e.collapsed ? domHelper.addClass(e, "f-hide") : domHelper.removeClass(e, "f-hide");
  }
}, Panel = {
  name: "Panel",
  directives: {
    SlideUpDown
  },
  props: {
    title: String,
    iconCls: String,
    border: {
      type: Boolean,
      default: !0
    },
    animate: {
      type: Boolean,
      default: !1
    },
    closed: {
      type: Boolean,
      default: !1
    },
    collapsed: {
      type: Boolean,
      default: !1
    },
    collapsible: {
      type: Boolean,
      default: !1
    },
    closable: {
      type: Boolean,
      default: !1
    },
    showHeader: {
      type: Boolean,
      default: !0
    },
    showFooter: {
      type: Boolean,
      default: !0
    },
    expandIconCls: {
      type: String,
      default: "panel-tool-expand"
    },
    collapseIconCls: {
      type: String,
      default: "panel-tool-collapse"
    },
    closeIconCls: {
      type: String,
      default: "panel-tool-close"
    },
    panelCls: String,
    panelStyle: Object,
    headerCls: String,
    headerStyle: Object,
    bodyCls: String,
    bodyStyle: Object,
    footerCls: String,
    footerStyle: Object
  },
  data() {
    return {
      collapsedState: this.collapsed,
      closedState: this.closed,
      animateState: this.animate,
      collapseToShrinkBody: !0
    };
  },
  computed: {
    hasHeader() {
      return this.showHeader ? !!(this.$slots.header || this.title) : !1;
    },
    hasFooter() {
      return this.showFooter ? !!this.$slots.footer : !1;
    },
    panelClasses() {
      return ["panel f-column", this.panelCls];
    },
    headerClasses() {
      return ["panel-header f-noshrink f-row f-vcenter", this.headerCls, {
        "panel-header-noborder": !this.border
      }];
    },
    bodyClasses() {
      return ["panel-body f-full", this.bodyCls, {
        "panel-body-noheader": !this.hasHeader,
        "panel-body-nobottom": this.$slots.footer,
        "panel-body-noborder": !this.border
      }];
    },
    footerClasses() {
      return ["panel-footer f-noshrink", this.footerCls, {
        "panel-footer-noborder": !this.border
      }];
    },
    collapsibleClasses() {
      return this.collapsedState ? this.expandIconCls : this.collapseIconCls;
    },
    closableClasses() {
      return this.closeIconCls;
    }
  },
  watch: {
    closed(e) {
      this.closedState = e;
    },
    collapsed(e) {
      this.collapsedState = e;
    },
    animate(e) {
      this.animateState = e;
    }
  },
  methods: {
    clickCollapsibleTool() {
      this.collapsedState = !this.collapsedState;
    },
    clickCloseTool() {
      this.closedState = !0;
    },
    panelHeader() {
      if (!this.hasHeader)
        return;
      const e = () => {
        if (this.$slots.header)
          return this.$slots.header();
        {
          const l = ["panel-title"];
          return this.iconCls && !this.$slots.icon && l.push("panel-with-icon"), createVNode("div", {
            class: l
          }, [this.title]);
        }
      }, i = () => this.iconCls && !this.$slots.icon ? createVNode("div", {
        class: this.iconCls + " panel-icon"
      }, null) : null, s = () => {
        if (this.collapsible || this.closable)
          return createVNode("div", {
            class: "panel-tool"
          }, [this.collapsible && createVNode("a", {
            href: "javascript:;",
            class: this.collapsibleClasses,
            onClick: this.clickCollapsibleTool
          }, null), this.closable && createVNode("a", {
            href: "javascript:;",
            class: this.closableClasses,
            onClick: this.clickCloseTool
          }, null)]);
      };
      return createVNode("div", {
        ref: "headerRef",
        class: this.headerClasses,
        style: this.headerStyle
      }, [e(), i(), s()]);
    },
    panelBody() {
      return withDirectives(createVNode("div", {
        ref: "bodyRef",
        class: this.bodyClasses,
        style: this.bodyStyle
      }, [this.$slots.default && this.$slots.default()]), [[resolveDirective("slideUpDown"), {
        animate: this.animateState,
        collapsed: this.collapsedState,
        disabled: !this.collapseToShrinkBody
      }]]);
    },
    panelFooter() {
      return this.hasFooter ? createVNode("div", {
        ref: "footerRef",
        class: this.footerClasses,
        style: this.footerStyle
      }, [this.$slots.footer && this.$slots.footer()]) : null;
    }
  },
  render() {
    return this.closedState ? null : createVNode("div", {
      class: this.panelClasses,
      style: this.panelStyle
    }, [this.panelHeader(), this.panelBody(), this.panelFooter()]);
  }
}, Accordion = {
  name: "Accordion",
  props: {
    border: {
      type: Boolean,
      default: !0
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    animate: {
      type: Boolean,
      default: !1
    },
    selectedIndex: {
      type: [Number, Array],
      default: 0
    }
  },
  data() {
    return {
      panels: []
    };
  },
  computed: {
    accordionClasses() {
      return ["accordion f-column", {
        "accordion-noborder": !this.border
      }];
    }
  },
  watch: {
    panels() {
      this.initPanels();
    },
    selectedIndex(e) {
      let i = e instanceof Array ? e : [e];
      this.multiple ? (this.panels.filter((s, l) => i.indexOf(l) == -1).forEach((s) => s.unselect()), this.indexes.forEach((s) => this.select(s))) : this.select(i[0]);
    }
  },
  methods: {
    initPanels() {
      if (this.panels.length) {
        this.panels.forEach((i) => {
          i.isLast = !1, i.animateState = this.animate;
        });
        let e = this.panels[this.panels.length - 1];
        e.isLast = !0, this.initSelectedPanel();
      }
    },
    initSelectedPanel() {
      let e = this.panels.filter((i) => i.selectedState);
      e.length || (this.multiple ? e = this.getPanels(this.selectedIndex || []) : e = this.getPanels([this.selectedIndex])), e.length && (e.forEach((i) => i.animateState = !1), this.multiple ? e.forEach((i) => i.collapsedState = !1) : (e[0].collapsedState = !1, e.filter((i, s) => s != 0).forEach((i) => i.collapsedState = !0)), this.$nextTick(() => {
        e.forEach((i) => i.animateState = this.animate);
      }));
    },
    addPanel(e) {
      const i = this.panels.slice();
      i.push(e), this.panels = i;
    },
    removePanel(e) {
      const i = this.panels.slice();
      let s = i.indexOf(e);
      s >= 0 && (i.splice(s, 1), this.panels = i);
    },
    getPanel(e) {
      return this.panels[e];
    },
    getPanels(e) {
      let i = [];
      for (let s of e) {
        let l = this.getPanel(s);
        l && i.push(l);
      }
      return i;
    },
    getSelectedPanels() {
      return this.panels.filter((e) => e.selectedState);
    },
    getSelectedPanel() {
      let e = this.getSelectedPanels();
      return e.length ? e[0] : null;
    },
    getPanelIndex(e) {
      for (let i = 0; i < this.panels.length; i++)
        if (this.panels[i] == e)
          return i;
      return -1;
    },
    getSelectedIndex() {
      let e = this.getSelectedPanel();
      return e ? this.getPanelIndex(e) : -1;
    },
    select(e) {
      let i = this.getPanel(e);
      i && i.select();
    },
    unselect(e) {
      let i = this.getPanel(e);
      i && i.unselect();
    }
  },
  render() {
    return createVNode("div", {
      class: this.accordionClasses
    }, [this.$slots.default()]);
  }
}, AccordionPanel = {
  name: "AccordionPanel",
  extends: Panel,
  props: {
    title: {
      type: String,
      default: ""
    },
    collapsible: {
      type: Boolean,
      default: !0
    },
    expandIconCls: {
      type: String,
      default: "accordion-expand"
    },
    collapseIconCls: {
      type: String,
      default: "accordion-collapse"
    },
    collapsed: {
      type: Boolean,
      default: !0
    },
    selected: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      isLast: !1
    };
  },
  computed: {
    selectedState() {
      return !this.collapsedState;
    },
    full() {
      return this.selected;
    },
    panelClasses() {
      return ["panel f-column", this.panelCls, {
        "panel-last": this.isLast,
        "f-full": this.selectedState,
        "f-noshrink": !this.selectedState
      }];
    },
    headerClasses() {
      return ["accordion-header panel-header f-noshrink", this.headerCls, {
        "panel-header-noborder": !this.border
      }, {
        "accordion-header-selected": this.selectedState
      }];
    },
    bodyClasses() {
      return ["accordion-body panel-body f-full", this.bodyCls, {
        "panel-body-noheader": !this.hasHeader,
        "panel-body-nobottom": this.$slots.footer,
        "panel-body-noborder": !this.border
      }];
    }
  },
  mounted() {
    this.$parent.addPanel(this), this.$el.addEventListener("click", this.clickHandler, !1);
  },
  beforeUnmount() {
    this.$parent.removePanel(this), this.$el.removeEventListener("click", this.clickHandler, !1);
  },
  methods: {
    select() {
      this.selectedState || (this.$parent.multiple || this.$parent.panels.filter((e) => e != this).forEach((e) => e.unselect()), this.collapsedState = !1, this.$parent.$emit("panelSelect", this), this.$nextTick(() => {
        window.EventHub && window.EventHub.$emit("panelSelect", this);
      }));
    },
    unselect() {
      this.selectedState && (this.collapsedState = !0, this.$parent.$emit("panelUnselect", this));
    },
    clickHandler(e) {
      domHelper.closest(e.target, ".accordion-header") && (e.stopPropagation(), this.collapsedState ? this.select() : this.$parent.multiple && this.unselect());
    }
  }
}, LinkButton = /* @__PURE__ */ defineComponent({
  name: "LinkButton",
  props: {
    disabled: {
      type: Boolean,
      default: !1
    },
    toggle: {
      type: Boolean,
      default: !1
    },
    selected: {
      type: Boolean,
      default: !1
    },
    outline: {
      type: Boolean,
      default: !1
    },
    plain: {
      type: Boolean,
      default: !1
    },
    text: String,
    iconCls: String,
    iconAlign: {
      type: String,
      default: "left"
    },
    size: {
      type: String,
      default: "small"
      // or large
    },
    href: String,
    btnCls: String,
    btnStyle: Object
  },
  data() {
    return {
      selectedState: this.selected,
      focused: !1
    };
  },
  computed: {
    isEmpty() {
      return !this.text && !this.$slots.default;
    },
    isDisabled() {
      return this.disabled;
    },
    btnIconCls() {
      let e = "l-btn-icon";
      return this.iconCls && (e += " " + this.iconCls), e;
    },
    innerCls() {
      let e = "l-btn f-inline-row f-content-center";
      return e += " l-btn-" + this.size, this.plain && (e += " l-btn-plain"), this.outline && (e += " l-btn-outline"), this.selectedState && (e += this.plain ? " l-btn-selected l-btn-plain-selected" : " l-btn-selected"), this.isDisabled && (e += this.plain ? " l-btn-disabled l-btn-plain-disabled" : " l-btn-disabled"), this.focused && (e += " l-btn-focus"), this.btnCls && (e += " " + this.btnCls), this.$attrs.class && (e += " " + this.$attrs.class), e;
    },
    btnLeftCls() {
      let e = "l-btn-left";
      return this.iconCls && (e += " l-btn-icon-" + this.iconAlign), e;
    }
  },
  watch: {
    selected(e) {
      this.selectedState = e;
    }
  },
  mounted() {
    this.$parent && this.$parent.$options.name == "ButtonGroup" && this.$parent.addButton(this);
  },
  beforeUnmount() {
    this.$parent && this.$parent.$options.name == "ButtonGroup" && this.$parent.removeButton(this);
  },
  methods: {
    focus() {
      this.$refs.btnRef && this.$refs.btnRef.focus(), this.focused = !0;
    },
    blur() {
      this.$refs.btnRef && this.$refs.btnRef.blur(), this.focused = !1;
    },
    onClick(e) {
      if (e.stopPropagation(), this.disabled)
        return e.preventDefault(), !1;
      this.href || e.preventDefault(), this.toggle && (this.selectedState = !this.selectedState), this.afterClick();
    },
    afterClick() {
    },
    renderInner() {
      let e = "";
      return this.isEmpty ? e = "" : this.text ? e = this.text : this.$slots.default && (e = this.$slots.default()), createVNode(Fragment, null, [createVNode("span", {
        class: this.isEmpty ? "l-btn-text l-btn-empty" : "l-btn-text"
      }, [e]), createVNode("span", {
        class: this.btnIconCls
      }, null)]);
    },
    renderOthers() {
      return null;
    }
  },
  render() {
    return createVNode("a", {
      ref: "btnRef",
      href: this.href || "#",
      class: this.innerCls,
      style: Object.assign({}, this.$attrs.style, this.btnStyle),
      onClick: this.onClick,
      onFocus: this.focus,
      onBlur: this.blur
    }, [createVNode("span", {
      class: this.btnLeftCls
    }, [this.renderInner()]), this.renderOthers()]);
  }
}), ButtonGroup = /* @__PURE__ */ defineComponent({
  name: "ButtonGroup",
  props: {
    selectionMode: {
      type: String,
      default: "multiple"
      // or single
    }
  },
  data() {
    return {
      buttons: []
    };
  },
  watch: {
    buttons() {
      this.initButtons();
    }
  },
  methods: {
    addButton(e) {
      const i = this.buttons.slice();
      i.push(e), this.buttons = i;
    },
    removeButton(e) {
      const i = this.buttons.slice();
      let s = i.indexOf(e);
      s >= 0 && (i.splice(s, 1), this.buttons = i);
    },
    initButtons() {
      this.buttons.forEach((e) => {
        e.afterClick = () => {
          this.selectionMode == "single" && (this.buttons.filter((i) => i != e).forEach((i) => {
            i.selectedState = !1;
          }), e.selectedState = !0);
        };
      });
    }
  },
  render() {
    return createVNode("span", {
      class: "button-group f-inline-row"
    }, [this.$slots.default()]);
  }
});
window.FileButtonFileId = window.FileButtonFileId || 1;
const FileButton = {
  name: "FileButton",
  extends: LinkButton,
  props: {
    href: {
      type: String,
      default: "javascript:;"
    },
    name: {
      type: String,
      default: "file"
    },
    accept: String,
    capture: String,
    multiple: {
      type: Boolean,
      default: !1
    },
    url: String,
    method: {
      type: String,
      default: "POST"
    },
    autoUpload: {
      type: Boolean,
      default: !0
    },
    withCredentials: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      fileId: "_easyui_file_" + window.FileButtonFileId++,
      files: []
    };
  },
  methods: {
    onFileSelect(e) {
      this.files = [];
      for (let i = 0; i < e.target.files.length; i++)
        this.files.push(e.target.files[i]);
      this.$emit("select", this.files), this.files.length && this.autoUpload && this.upload();
    },
    upload() {
      if (!this.url)
        return;
      let e = new XMLHttpRequest(), i = new FormData();
      for (let s = 0; s < this.files.length; s++) {
        let l = this.files[s];
        i.append(this.name, l, l.name);
      }
      e.upload.addEventListener("progress", (s) => {
        if (s.lengthComputable) {
          let l = s.total, r = s.loaded, a = Math.ceil(r * 100 / l);
          this.$emit("progress", a);
        }
      }, !1), e.onreadystatechange = () => {
        e.readyState == 4 && (e.status >= 200 && e.status < 300 ? this.$emit("success", {
          xhr: e,
          files: this.files
        }) : this.$emit("error", {
          xhr: e,
          files: this.files
        }));
      }, e.open(this.method, this.url, !0), e.withCredentials = this.withCredentials, e.send(i);
    },
    clear() {
      this.fileRef.nativeElement.value = "";
    },
    renderOthers() {
      return createVNode("label", {
        class: "filebox-label",
        for: this.fileId
      }, [createVNode("input", {
        type: "file",
        style: "position:absolute;left:-500000px",
        ref: "fileRef",
        id: this.fileId,
        disabled: this.disabled,
        multiple: this.multiple,
        accept: this.accept,
        capture: this.capture,
        onChange: this.onFileSelect
      }, null)]);
    }
  }
}, PaginationButton = {
  name: "PaginationButton",
  extends: LinkButton,
  props: {
    plain: {
      type: Boolean,
      default: !0
    },
    name: String
  },
  computed: {
    btnIconCls() {
      let e = "l-btn-icon";
      return this.name == "refresh" ? this.$parent.loading ? e += " pagination-loading" : e += " pagination-load" : e += " pagination-" + this.name, e;
    },
    btnLeftCls() {
      return "l-btn-left l-btn-icon-" + this.iconAlign;
    },
    isDisabled() {
      return this.name == "first" || this.name == "prev" ? !this.$parent.total || this.$parent.pageNumberState == 1 : this.name == "next" || this.name == "last" ? this.$parent.pageNumberState == this.$parent.pageCount : this.disabled;
    }
  },
  methods: {
    onClick(e) {
      if (e.stopPropagation(), this.isDisabled) {
        e.preventDefault();
        return;
      }
      this.href || e.preventDefault(), this.name == "first" ? this.$parent.selectPage(1) : this.name == "prev" ? this.$parent.selectPage(this.$parent.pageNumberState - 1) : this.name == "next" ? this.$parent.selectPage(this.$parent.pageNumberState + 1) : this.name == "last" ? this.$parent.selectPage(this.$parent.pageCount) : this.name == "refresh" && this.$parent.refreshPage();
    }
  }
}, PaginationList = {
  name: "PaginationList",
  computed: {
    pageList() {
      return this.$parent.pageList;
    },
    pageSize() {
      return this.$parent.pageSizeState;
    }
  },
  methods: {
    onChange(e) {
      this.$parent.pageSizeState = parseInt(e.target.value);
    }
  },
  render() {
    return createVNode("select", {
      class: "pagination-page-list",
      onChange: this.onChange
    }, [this.pageList.map((e) => createVNode("option", {
      selected: e == this.pageSize
    }, [e]))]);
  }
}, PaginationLink = {
  name: "PaginationLink",
  components: {
    LinkButton
  },
  computed: {
    pages() {
      let e = this.$parent.pageNumberState - Math.floor(this.$parent.links / 2);
      e < 1 && (e = 1);
      let i = e + this.$parent.links - 1;
      i > this.$parent.pageCount && (i = this.$parent.pageCount), e = i - this.$parent.links + 1, e < 1 && (e = 1);
      let s = [];
      for (let l = e; l <= i; l++)
        s.push(l);
      return s;
    }
  },
  methods: {
    onClick(e) {
      this.$parent.selectPage(e);
    }
  },
  render() {
    return createVNode("div", {
      class: "pagination-links f-inline-row"
    }, [this.pages.map((e) => createVNode(LinkButton, {
      class: "pagination-link",
      selected: e == this.$parent.pageNumberState,
      plain: !0,
      text: String(e),
      onClick: () => this.onClick(e)
    }, null))]);
  }
}, PaginationManual = {
  name: "PaginationManual",
  props: {
    pageNumber: Number
  },
  data() {
    return {
      value: this.pageNumber
    };
  },
  watch: {
    pageNumber() {
      this.value = this.pageNumber;
    }
  },
  methods: {
    onBlur() {
      const e = parseInt(this.value, 10) || 1;
      this.value = e, this.$emit("pageInput", e);
    },
    onKeyDown(e) {
      e.keyCode === 13 && this.onBlur();
    }
  },
  render() {
    return createVNode("span", {
      style: "margin:0 6px"
    }, [createVNode("span", null, [this.$parent.beforePageText]), withDirectives(createVNode("input", {
      class: "pagination-num",
      type: "text",
      "onUpdate:modelValue": (e) => this.value = e,
      size: "2",
      onBlur: this.onBlur,
      onKeydown: this.onKeyDown
    }, null), [[vModelText, this.value]]), createVNode("span", null, [this.$parent.afterPageInfo])]);
  }
}, Pagination = {
  name: "Pagination",
  components: {
    PaginationButton,
    PaginationList,
    PaginationLink,
    PaginationManual
  },
  props: {
    pageList: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },
    loading: {
      type: Boolean,
      default: !1
    },
    showPageList: {
      type: Boolean,
      default: !0
    },
    showPageInfo: {
      type: Boolean,
      default: !0
    },
    showPageRefresh: {
      type: Boolean,
      default: !0
    },
    links: {
      type: Number,
      default: 10
    },
    beforePageText: {
      type: String,
      default: () => window.Locale.t("Pagination.beforePageText", "Page")
    },
    afterPageText: {
      type: String,
      default: () => window.Locale.t("Pagination.afterPageText", "of {pages}")
    },
    displayMsg: {
      type: String,
      default: () => window.Locale.t("Pagination.displayMsg", "Displaying {from} to {to} of {total} items")
    },
    layout: {
      type: Array,
      default: () => ["first", "prev", "links", "next", "last", "refresh"]
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageNumber: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      pageNumberState: this.pageNumber,
      pageSizeState: this.pageSize,
      lastState: null,
      pagination: this
    };
  },
  computed: {
    pageInfo() {
      let e = this.displayMsg;
      return e = e.replace(/{from}/, String(this.total == 0 ? 0 : this.pageSizeState * (this.pageNumberState - 1) + 1)), e = e.replace(/{to}/, String(Math.min(this.pageSizeState * this.pageNumberState, this.total))), e = e.replace(/{total}/, String(this.total)), e;
    },
    pageCount() {
      return this.total ? Math.ceil(this.total / this.pageSizeState) || 1 : 0;
    },
    afterPageInfo() {
      let e = this.afterPageText;
      return e = e.replace(/{pages}/, String(this.pageCount)), e;
    }
  },
  created() {
    this._adjustPage(), this.lastState = {
      pageNumber: this.pageNumberState,
      pageSize: this.pageSizeState
    };
  },
  watch: {
    pageNumber(e) {
      this.pageNumberState = e;
    },
    pageSize(e) {
      this.pageSizeState = e;
    },
    pageNumberState() {
      this._adjustPage();
    },
    pageSizeState() {
      this._adjustPage();
    },
    total() {
      this._adjustPage();
    }
  },
  methods: {
    _isButton(e) {
      return ["first", "prev", "next", "last", "refresh"].indexOf(e) >= 0;
    },
    _adjustPage() {
      if (this.pageNumberState < 1 && (this.pageNumberState = 1), this.pageNumberState > this.pageCount && (this.pageNumberState = this.pageCount), this.total == 0 && (this.pageNumberState = 0, this.lastState && (this.lastState.pageNumber = 1)), this.lastState) {
        let e = {
          pageNumber: this.pageNumberState || 1,
          pageSize: this.pageSizeState
        };
        (e.pageNumber != this.lastState.pageNumber || e.pageSize != this.lastState.pageSize) && (this.lastState = e, this.$emit("pageChange", this.lastState));
      }
    },
    selectPage(e) {
      this.pageNumberState = e, this._adjustPage();
    },
    refreshPage() {
      let e = Object.assign({
        refresh: !0
      }, this.lastState);
      e.pageNumber <= 0 && (e.pageNumber = 1), this.$emit("pageChange", e);
    }
  },
  render() {
    return createVNode("div", {
      class: "pagination f-row f-content-center"
    }, [this.layout.map((e) => createVNode(Fragment, null, [e == "list" && createVNode(PaginationList, null, null), e == "links" && createVNode(PaginationLink, null, null), e == "manual" && createVNode(PaginationManual, {
      pageNumber: this.pageNumberState,
      onPageInput: (i) => this.pageNumberState = i
    }, null), this._isButton(e) && createVNode(PaginationButton, {
      name: e
    }, null), e == "sep" && createVNode("div", {
      class: "pagination-btn-separator"
    }, null), e == "info" && createVNode("div", {
      class: "f-full"
    }, [createVNode("div", {
      class: "pagination-info"
    }, [this.pageInfo])]), e == "tpl" && this.$slots.default && this.$slots.default(this.pagination)]))]);
  }
}, DEFAULT_FILTER_OPERATORS = {
  nofilter: {
    text: "No Filter",
    isMatch: () => !0
  },
  contains: {
    text: "Contains",
    isMatch: function(e, i) {
      return e = String(e), i = String(i), e.toLowerCase().indexOf(i.toLowerCase()) >= 0;
    }
  },
  equal: {
    text: "Equal",
    isMatch: function(e, i) {
      return e == i;
    }
  },
  notequal: {
    text: "Not Equal",
    isMatch: function(e, i) {
      return e != i;
    }
  },
  beginwith: {
    text: "Begin With",
    isMatch: function(e, i) {
      return e = String(e), i = String(i), e.toLowerCase().indexOf(i.toLowerCase()) == 0;
    }
  },
  endwith: {
    text: "End With",
    isMatch: function(e, i) {
      return e = String(e), i = String(i), e.toLowerCase().indexOf(i.toLowerCase(), e.length - i.length) !== -1;
    }
  },
  less: {
    text: "Less",
    isMatch: function(e, i) {
      return e < i;
    }
  },
  lessorequal: {
    text: "Less Or Equal",
    isMatch: function(e, i) {
      return e <= i;
    }
  },
  greater: {
    text: "Greater",
    isMatch: function(e, i) {
      return e > i;
    }
  },
  greaterorequal: {
    text: "Greater Or Equal",
    isMatch: function(e, i) {
      return e >= i;
    }
  }
}, ListBase = {
  name: "ListBase",
  template: "",
  props: {
    border: {
      type: Boolean,
      default: !0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    loadMsg: {
      type: String,
      default: () => window.Locale.t("ListBase.loadMsg", "Processing, please wait ...")
    },
    emptyMsg: String,
    pagination: {
      type: Boolean,
      default: !1
    },
    pagePosition: {
      type: String,
      default: "bottom"
    },
    pageOptions: Object,
    lazy: {
      type: Boolean,
      default: !1
    },
    virtualScroll: {
      type: Boolean,
      default: !1
    },
    rowHeight: {
      type: Number,
      default: 32
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageLayout: {
      type: Array,
      default: () => ["first", "prev", "links", "next", "last", "refresh"]
    },
    pageList: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },
    pageLinks: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    idField: String,
    selectionMode: String,
    selection: {
      type: [Object, Array],
      default: null
    },
    filterable: {
      type: Boolean,
      default: !1
    },
    filterRules: {
      type: Array,
      default: () => []
    },
    filterDelay: {
      type: Number,
      default: 400
    },
    filterMatchingType: {
      type: String,
      default: "all"
    },
    filterPosition: {
      type: String,
      default: "bottom"
    },
    filterBtnPosition: {
      type: String,
      default: "right"
    },
    filterOperators: {
      type: Object,
      default: () => DEFAULT_FILTER_OPERATORS
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    selectionValue() {
      return this.selectionModeState == "single" ? this.selectedRows[0] || null : this.selectionModeState == "multiple" ? this.selectedRows : this.selectionModeState == "cell" ? this.selectedCells[0] || null : this.selectionModeState == "multicell" ? this.selectedCells : null;
    }
  },
  data() {
    return {
      totalState: this.total,
      pageNumberState: this.pageNumber,
      pageSizeState: this.pageSize,
      pageState: null,
      highlightRow: null,
      highlightCell: null,
      selectionModeState: this.selectionMode,
      selectedRows: [],
      selectedCells: [],
      rows: [],
      innerData: [],
      filteredData: []
    };
  },
  watch: {
    total(e) {
      this.totalState = e;
    },
    pageNumber(e) {
      this.pageNumberState = e;
    },
    pageSize(e) {
      this.pageSizeState = e;
    },
    data(e) {
      this.$nextTick(() => this.setData(e));
    },
    selection(e) {
      this.setSelectionValue(e);
    },
    selectionMode(e) {
      this.selectionModeState = e;
    }
  },
  mounted() {
    this.setData(this.data), this.setSelectionValue(this.selection);
  },
  methods: {
    afterSelectionChange() {
    },
    setData(e) {
      e == null && (e = []), this.innerData = Object.assign([], e), this.lazy ? this.filteredData = this.innerData : (this.sortData(), this.filteredData = this.filterData(this.innerData)), this.setGroupData(), this.pagination ? this.lazy ? this.filteredData.length ? this.rows = this.filteredData.slice(0, this.pageSizeState) : this.totalState ? this.$emit("pageChange", {
        pageNumber: this.pageNumberState,
        pageSize: this.pageSizeState
      }) : this.rows = [] : (this.totalState = this.filteredData.length, this.setPageData()) : this.rows = this.filteredData;
    },
    setGroupData() {
    },
    setSelectionValue(e) {
      if (e == null) {
        this.selectedRows = [], this.selectedCells = [];
        return;
      }
      this.selectionModeState == "single" ? this.selectedRows = [e] : this.selectionModeState == "multiple" ? this.selectedRows = e : this.selectionModeState == "cell" ? this.selectedCells = [e] : this.selectionModeState == "multicell" && (this.selectedCells = e);
    },
    sortData() {
    },
    filterData(e) {
      let i = (l) => {
        let r = this.filterRules;
        if (!r.length)
          return !0;
        for (let a = 0; a < r.length; a++) {
          let n = r[a], o = l[n.field];
          o == null && (o = "");
          let u = this.filterOperators[n.op].isMatch(o, n.value);
          if (this.filterMatchingType == "any") {
            if (u)
              return !0;
          } else if (!u)
            return !1;
        }
        return this.filterMatchingType == "all";
      };
      return e.filter((l) => i(l));
    },
    doFilter(e) {
      e && (e.value == null || e.value == "" ? this.removeFilterRule(e.field) : this.addFilterRule(e)), this.setData(this.innerData), this.$emit("filterChange", this.filterRules);
    },
    doEnter() {
      this.isCellSelectionMode() ? this.highlightCell && (this.selectionModeState == "cell" ? this.selectCell(this.highlightCell.row, this.highlightCell.column) : this.selectionModeState == "multicell" && (this.isSelected(this.highlightCell.row, this.highlightCell.column) ? this.unselectCell(this.highlightCell.row, this.highlightCell.column) : this.selectCell(this.highlightCell.row, this.highlightCell.column))) : this.highlightRow && (this.selectionModeState == "single" ? this.selectRow(this.highlightRow) : this.selectionModeState == "multiple" && (this.isSelected(this.highlightRow) ? this.unselectRow(this.highlightRow) : this.selectRow(this.highlightRow)));
    },
    getSelectedIndex(e) {
      if (this.idField) {
        for (let i = 0; i < this.selectedRows.length; i++)
          if (this.selectedRows[i][this.idField] == e[this.idField])
            return this.selectedRows[i] = e, i;
        return -1;
      } else
        return this.selectedRows.indexOf(e);
    },
    getSelectedCellIndex(e, i) {
      for (let s = 0; s < this.selectedCells.length; s++) {
        let l = this.selectedCells[s];
        if (l.column == i) {
          if (this.idField) {
            if (l.row[this.idField] == e[this.idField])
              return s;
          } else if (l.row == e)
            return s;
        }
      }
      return -1;
    },
    isCellSelectionMode() {
      return this.selectionModeState == "cell" || this.selectionModeState == "multicell";
    },
    isHighlighted(e, i = null) {
      if (this.isCellSelectionMode()) {
        if (this.highlightCell && this.highlightCell.row == e && this.highlightCell.column == i)
          return !0;
      } else if (this.highlightRow == e)
        return !0;
      return !1;
    },
    isSelected(e, i = null) {
      return this.isCellSelectionMode() ? this.getSelectedCellIndex(e, i) != -1 : this.getSelectedIndex(e) != -1;
    },
    selectRow(e) {
      this.isCellSelectionMode() || this.isSelected(e) || (this.selectionModeState == "single" ? (this.selectionValue && this.$emit("rowUnselect", this.selectionValue), this.selectedRows = [e]) : this.selectionModeState == "multiple" && this.selectedRows.push(e), this.$emit("rowSelect", e), this.$emit("selectionChange", this.selectionValue), this.afterSelectionChange(this.selectionValue));
    },
    unselectRow(e) {
      if (this.isCellSelectionMode())
        return;
      let i = this.getSelectedIndex(e);
      i >= 0 && (this.selectedRows.splice(i, 1), this.$emit("rowUnselect", e), this.$emit("selectionChange", this.selectionValue), this.afterSelectionChange(this.selectionValue));
    },
    selectCell(e, i) {
      this.isCellSelectionMode() && (this.isSelected(e, i) || (this.selectionModeState == "cell" ? (this.selectionValue && this.$emit("cellUnselect", this.selectionValue), this.selectedCells = [{ row: e, column: i }]) : this.selectionModeState == "multicell" && this.selectedCells.push({ row: e, column: i }), this.$emit("cellSelect", { row: e, column: i }), this.$emit("selectionChange", this.selectionValue), this.afterSelectionChange(this.selectionValue)));
    },
    unselectCell(e, i) {
      if (!this.isCellSelectionMode())
        return;
      let s = this.getSelectedCellIndex(e, i);
      s >= 0 && (this.selectedCells.splice(s, 1), this.$emit("cellUnselect", { row: e, column: i }), this.$emit("selectionChange", this.selectionValue), this.afterSelectionChange(this.selectionValue));
    },
    clearSelections() {
      this.isCellSelectionMode() ? this.selectedCells.length && (this.selectedCells = [], this.$emit("selectionChange", this.selectionValue), this.afterSelectionChange(this.selectionValue)) : this.selectedRows.length && (this.selectedRows = [], this.$emit("selectionChange", this.selectionValue), this.afterSelectionChange(this.selectionValue));
    },
    navRow(e) {
      if (!this.rows.length)
        return;
      let i = this.rows.indexOf(this.highlightRow);
      i == -1 ? i = 0 : (i += e, i >= this.rows.length ? i = this.rows.length - 1 : i < 0 && (i = 0)), this.highlightRow = this.rows[i];
    },
    getFilterRuleIndex(e) {
      for (let i = 0; i < this.filterRules.length; i++)
        if (this.filterRules[i].field == e)
          return i;
      return -1;
    },
    getFilterRule(e) {
      let i = this.getFilterRuleIndex(e);
      return i != -1 ? this.filterRules[i] : null;
    },
    addFilterRule(e) {
      let i = this.getFilterRuleIndex(e.field);
      i != -1 ? Object.assign(this.filterRules[i], e) : this.filterRules.push(e);
    },
    removeFilterRule(e) {
      let i = this.getFilterRuleIndex(e);
      i != -1 && this.filterRules.splice(i, 1);
    },
    setPageData() {
      let e = (this.pageNumberState - 1) * this.pageSizeState;
      this.rows = this.filteredData.slice(e, e + +this.pageSizeState);
    },
    onPageChange(e) {
      this.pageState != null && !e.refresh && this.pageState.pageNumber == e.pageNumber && this.pageState.pageSize == e.pageSize || (this.pageState = e, this.pageNumberState = e.pageNumber, this.pageSizeState = e.pageSize, this.lazy || this.setPageData(), this.$emit("pageChange", Object.assign(e, {
        filterRules: this.filterRules
      })));
    },
    onVirtualPageChange(e) {
      this.pageNumberState = e.pageNumber, this.pageSizeState = e.pageSize, this.$emit("pageChange", Object.assign(e, {
        filterRules: this.filterRules
      }));
    },
    onRowClick(e) {
      this.$emit("rowClick", e), this.selectionModeState == "single" ? this.selectRow(e) : this.selectionModeState == "multiple" && (this.isSelected(e) ? this.unselectRow(e) : this.selectRow(e));
    },
    onCellClick(e, i) {
      this.$emit("cellClick", { row: e, column: i }), this.selectionModeState == "cell" ? this.selectCell(e, i) : this.selectionModeState == "multicell" && (this.isSelected(e, i) ? this.unselectCell(e, i) : this.selectCell(e, i));
    }
  }
}, VirtualScroll = {
  name: "VirtualScroll",
  props: {
    lazy: {
      type: Boolean,
      default: !1
    },
    rowHeight: {
      type: Number,
      default: 32
    },
    maxDivHeight: {
      type: Number,
      default: 1e7
    },
    maxVisibleHeight: {
      type: Number,
      default: 15e6
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    scrollPosition: Object
  },
  data() {
    return {
      innerData: [],
      items: [],
      waitingPage: 1,
      fetchingPage: 0,
      startIndex: 0,
      deltaTopHeight: 0,
      topHeights: [],
      bottomHeights: [],
      isUpdating: !1,
      isNewFetching: !1,
      totalState: this.total,
      pageNumberState: this.pageNumber,
      scrollPositionState: this.scrollPosition
    };
  },
  watch: {
    total(e) {
      this.totalState = e;
    },
    pageNumber(e) {
      this.pageNumberState = e;
    },
    data(e) {
      if (e = e || [], !e.length && !this.totalState) {
        this.clear();
        return;
      }
      if (this.scrollPositionState) {
        this.scrollPosition.innerData = e;
        return;
      }
      this.$nextTick(() => {
        this.setData(e), setTimeout(() => {
          this.scrolling();
        }, 20);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollPositionState ? (this.scrollState(this.scrollPositionState), this.scrollPositionState = null) : (this.setData(this.data), this.isNewFetching = !0);
    });
  },
  methods: {
    scrollTop(e) {
      if (e != null)
        this.$refs.bodyRef.scrollTop = e;
      else
        return this.$refs.bodyRef.scrollTop;
    },
    relativeScrollTop() {
      return this.$refs.bodyRef.scrollTop - this.startIndex * this.rowHeight + this.deltaTopHeight;
    },
    scrollbarWidth() {
      return domHelper.outerWidth(this.$refs.bodyRef) - domHelper.outerWidth(this.$refs.contentRef);
    },
    scrollState(e) {
      if (e != null)
        this.topHeights = e.topHeights, this.bottomHeights = e.bottomHeights, this.deltaTopHeight = e.deltaTopHeight, this.startIndex = e.startIndex, this.innerData = e.innerData || [], this.items = e.items || [], this.$emit("update", this.items), this.$nextTick(() => {
          this.scrollTop(e.scrollTop), this.refresh(), this.scrolling();
        });
      else
        return {
          topHeights: Object.assign([], this.topHeights),
          bottomHeights: Object.assign([], this.bottomHeights),
          deltaTopHeight: this.deltaTopHeight,
          startIndex: this.startIndex,
          scrollTop: this.scrollTop(),
          items: Object.assign([], this.items),
          innerData: Object.assign([], this.innerData)
        };
    },
    clear() {
      this.topHeights = [], this.bottomHeights = [], this.deltaTopHeight = 0, this.startIndex = 0, this.scrollTop(0), this.items = [], this.innerData = [], this.populate();
    },
    onScroll(e) {
      e.stopPropagation(), this.isUpdating || this.scrolling(), this.$emit("bodyScroll", {
        left: this.$refs.bodyRef.scrollLeft,
        top: this.scrollTop(),
        relativeTop: this.relativeScrollTop(),
        items: this.items
      });
    },
    setData(e) {
      e == null && (e = []), this.innerData = Object.assign([], e), this.fetchingPage = 0, this.lazy ? this.innerData.length ? (this.waitingPage = this.pageNumberState, this.loadPage(this.innerData)) : this.totalState > 0 ? this.fetchPage(this.waitingPage) : this.loadPage(this.innerData) : (this.totalState = this.innerData.length, this.pageNumberState = 1, this.waitingPage = 1, this.startIndex = 0, this.loadPage(this.innerData));
    },
    scrolling() {
      this.isNewFetching = !1;
      let e = domHelper.outerHeight(this.$refs.bodyRef), i = domHelper.offset(this.$refs.bodyRef), l = domHelper.offset(this.$refs.contentRef).top - i.top, r = l + domHelper.outerHeight(this.$refs.contentRef);
      if (l > e || r < 0) {
        let a = this.$refs.bodyRef.scrollTop, n = Math.floor((a + this.deltaTopHeight) / this.rowHeight), o = Math.floor(n / this.pageSize) + 1;
        o > 0 && (this.isNewFetching = !0, this.startIndex = (o - 1) * this.pageSize, this.waitingPage = o, this.items = [], this.fetchPage(this.waitingPage));
      } else if (l > 0) {
        if (this.startIndex == 0)
          return;
        let a = Math.floor(this.startIndex / this.pageSize) + 1;
        this.waitingPage = a - 1, this.fetchPage(this.waitingPage);
      } else if (r < e) {
        if (this.startIndex + this.items.length >= this.totalState)
          return;
        let a = Math.floor(this.startIndex / this.pageSize) + 1;
        this.items.length >= this.pageSize * 2 ? this.waitingPage = a + 2 : this.waitingPage = a + 1, this.fetchPage(this.waitingPage);
      }
    },
    populate() {
      if (!this.$refs.bodyRef)
        return;
      this.isUpdating = !0;
      let e = domHelper.outerHeight(this.$refs.bodyRef), i = this.startIndex * this.rowHeight, s = this.totalState * this.rowHeight - i - this.items.length * this.rowHeight;
      this.topHeights = this.splitHeights(i), this.bottomHeights = this.splitHeights(s);
      let l = this.$refs.bodyRef.scrollTop + this.deltaTopHeight;
      if (i > this.maxVisibleHeight ? (this.deltaTopHeight = i - this.maxVisibleHeight, this.topHeights = this.splitHeights(this.maxVisibleHeight)) : this.deltaTopHeight = 0, s > this.maxVisibleHeight)
        this.bottomHeights = this.splitHeights(this.maxVisibleHeight);
      else if (s == 0) {
        let r = this.totalState % this.pageSize;
        r && (this.bottomHeights = this.splitHeights(e - r * this.rowHeight));
      }
      this.$refs.bodyRef.scrollTop = l - this.deltaTopHeight, this.$emit("update", this.items), this.$nextTick(() => {
        this.$refs.bodyRef && (this.$refs.bodyRef.scrollTop = l - this.deltaTopHeight, this.isNewFetching && this.scrolling(), this.isUpdating = !1);
      });
    },
    splitHeights(e) {
      let i = Math.floor(e / this.maxDivHeight), s = e - this.maxDivHeight * i;
      e < 0 && (s = 0);
      let l = [];
      for (let r = 0; r < i; r++)
        l.push(this.maxDivHeight);
      return l.push(s), l;
    },
    loadPage(e) {
      if (this.pageNumberState != this.waitingPage)
        return;
      e = e.slice(0, this.pageSize);
      let i = Math.floor(this.startIndex / this.pageSize) + 1;
      i == this.waitingPage ? (this.items = e, this.populate()) : this.waitingPage == i + 1 ? (this.items = this.items.slice(0, this.pageSize).concat(e), this.populate()) : this.waitingPage == i + 2 ? (this.startIndex += this.pageSize, this.items = this.items.slice(this.pageSize, this.pageSize * 2).concat(e), this.populate()) : this.waitingPage == i - 1 ? (this.startIndex -= this.pageSize, this.items = e.concat(this.items.slice(0, this.pageSize)), this.populate()) : (this.startIndex = (this.pageNumberState - 1) * this.pageSize, this.items = e, this.populate());
    },
    fetchPage(e) {
      if (this.fetchingPage != e) {
        if (this.fetchingPage = e, !this.lazy) {
          let i = (e - 1) * this.pageSize, s = this.innerData.slice(i, i + this.pageSize);
          this.pageNumberState = e, this.loadPage(s);
        }
        this.$emit("pageChange", {
          pageNumber: e,
          pageSize: this.pageSize
        });
      }
    },
    gotoPage(e) {
      this.startIndex = (e - 1) * this.pageSize, this.waitingPage = e, this.populate(), this.$nextTick(() => {
        this.$refs.bodyRef.scrollTop = this.startIndex * this.rowHeight - this.deltaTopHeight, this.fetchPage(e);
      });
    },
    refresh() {
      let e = Math.floor(this.startIndex / this.pageSize) + 1;
      this.waitingPage = e, this.fetchingPage = 0, this.fetchPage(e);
    }
  },
  render() {
    return createVNode("div", {
      class: "f-column panel-noscroll"
    }, [createVNode("div", {
      ref: "bodyRef",
      class: "scroll-body f-column f-full",
      onScroll: this.onScroll
    }, [createVNode("div", {
      ref: "topRef",
      class: "scroll-top f-noshrink"
    }, [this.topHeights.map((e) => createVNode("div", {
      style: {
        height: e + "px"
      }
    }, null))]), createVNode("div", {
      ref: "contentRef",
      class: "scroll-content f-noshrink"
    }, [this.$slots.default()]), createVNode("div", {
      ref: "bottomRef",
      class: "scroll-bottom f-noshrink"
    }, [this.bottomHeights.map((e) => createVNode("div", {
      style: {
        height: e + "px"
      }
    }, null))])])]);
  }
};
function _isSlot$5(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const DataList = /* @__PURE__ */ defineComponent({
  name: "DataList",
  extends: ListBase,
  components: {
    VirtualScroll
  },
  props: {
    itemStyle: Object,
    itemCls: String,
    hoverCls: {
      type: String,
      default: "datagrid-row-over"
    },
    selectedCls: {
      type: String,
      default: "datagrid-row-selected"
    },
    scrollPosition: [Number, Object]
  },
  computed: {
    innerClasses() {
      return ["f-full", {
        "f-column": this.virtualScroll
      }];
    },
    innerStyle() {
      return {
        overflow: this.virtualScroll ? "hidden" : "auto"
      };
    },
    virtualItemStyle() {
      return Object.assign({}, this.itemStyle, {
        height: this.rowHeight + "px"
      });
    }
  },
  data() {
    return {
      vrows: [],
      scrollPositionState: this.scrollPosition
    };
  },
  mounted() {
    this.$refs.innerRef && this.scrollPositionState && this.$nextTick(() => {
      this.scrollTop(this.scrollPositionState), this.scrollPositionState = null;
    });
  },
  methods: {
    getItemClass(e) {
      let i = [];
      return this.itemCls && i.push(this.itemCls), this.hoverCls && this.highlightRow == e && i.push(this.hoverCls), this.selectedCls && this.isSelected(e) && i.push(this.selectedCls), i.length ? i.join(" ") : null;
    },
    getRowIndex(e) {
      return this.$refs.vscrollRef ? e + this.$refs.vscrollRef.startIndex : this.pagination ? e + (this.pageNumberState - 1) * this.pageSizeState : e;
    },
    scrollTop(e) {
      if (e != null)
        this.$refs.vscrollRef ? this.$refs.vscrollRef.scrollState(e) : this.$refs.innerRef.scrollTop = e;
      else
        return this.$refs.vscrollRef ? this.$refs.vscrollRef.scrollState() : this.$refs.innerRef.scrollTop;
    },
    navRow(e) {
      ListBase.methods.navRow.call(this, e), this.rows.indexOf(this.highlightRow) >= 0 && this.$nextTick(() => {
        let s = this.$refs.vscrollRef ? this.$refs.vscrollRef.$refs.bodyRef : this.$refs.innerRef, l = s.querySelector("." + this.hoverCls);
        l && domHelper.scrollTo(s, l);
      });
    },
    highlightFirstRow() {
      this.highlightRow = this.rows.length ? this.rows[0] : null, this.navRow(0);
    },
    scrollToSelectedRow() {
      let e = this.$refs.vscrollRef ? this.$refs.vscrollRef.$refs.bodyRef : this.$refs.innerRef, i = e.querySelector("." + this.selectedCls);
      i && domHelper.scrollTo(e, i);
    },
    renderPagination(e) {
      if (!this.pagination || this.pagePosition != "both" && this.pagePosition != e)
        return null;
      let i = "pageTopRef", s = "datagrid-pager f-noshrink";
      return this.pagePosition == "top" ? s += " datagrid-pager-top" : i = "pageBottomRef", createVNode(Pagination, {
        ref: i,
        class: s,
        total: this.totalState,
        pageSize: this.pageSizeState,
        pageNumber: this.pageNumberState,
        loading: this.loading,
        onPageChange: this.onPageChange
      }, null);
    },
    renderLoading() {
      return this.loading ? createVNode("div", {
        class: "datagrid-loading f-row"
      }, [createVNode("div", {
        class: "datagrid-mask"
      }, null), createVNode("div", {
        class: "datagrid-mask-msg"
      }, [this.loadMsg])]) : null;
    },
    renderEmpty() {
      if (this.loading || this.rows.length)
        return null;
      if (this.$slots.empty) {
        const e = this.$slots.empty();
        return createVNode("div", {
          class: "datagrid-empty"
        }, [e]);
      } else
        return null;
    },
    renderList() {
      return this.virtualScroll ? null : createVNode(Fragment, null, [this.rows.map((e, i) => createVNode("div", {
        class: this.getItemClass(e),
        style: this.itemStyle,
        onMouseenter: () => this.highlightRow = e,
        onMouseleave: () => this.highlightRow = null,
        onClick: (s) => this.onRowClick(e, s)
      }, [this.$slots.default({
        row: e,
        rowIndex: this.getRowIndex(i)
      })]))]);
    },
    renderVirtualList() {
      let e;
      return this.virtualScroll ? createVNode(VirtualScroll, {
        ref: "vscrollRef",
        class: "f-full",
        data: this.rows,
        total: this.total,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        rowHeight: this.rowHeight,
        lazy: this.lazy,
        scrollPosition: this.scrollPosition,
        onUpdate: (i) => this.vrows = i,
        onPageChange: this.onVirtualPageChange
      }, _isSlot$5(e = this.vrows.map((i, s) => createVNode("div", {
        class: this.getItemClass(i),
        style: this.virtualItemStyle,
        onMouseenter: () => this.highlightRow = i,
        onMouseleave: () => this.highlightRow = null,
        onClick: (l) => this.onRowClick(i, l)
      }, [this.$slots.default({
        row: i,
        rowIndex: this.getRowIndex(s)
      })]))) ? e : {
        default: () => [e]
      }) : null;
    }
  },
  render() {
    let e = "panel-body panel-body-noheader datagrid f-full f-column";
    return this.border || (e += " panel-body-noborder"), createVNode("div", {
      class: "f-column"
    }, [createVNode("div", {
      class: e
    }, [this.renderPagination("top"), createVNode("div", {
      ref: "innerRef",
      class: this.innerClasses,
      style: this.innerStyle
    }, [this.renderList(), this.renderVirtualList()]), this.renderPagination("bottom")]), this.renderLoading(), this.renderEmpty()]);
  }
}), Addon = {
  name: "Addon",
  props: {
    align: {
      type: String,
      default: "right"
    }
  },
  render() {
    return this.$slots.default ? h(
      "span",
      {
        class: {
          "textbox-addon f-inline-row f-noshrink": !0,
          "f-order2": this.align == "left",
          "f-order4": this.align == "right"
        }
      },
      [this.$slots.default()]
    ) : "";
  }
}, Label = {
  name: "Label",
  props: {
    for: String,
    align: {
      type: String,
      default: "left"
    }
  },
  computed: {
    labelClasses() {
      return ["textbox-label", {
        "textbox-label-top": this.align == "top"
      }];
    },
    labelStyle() {
      return {
        textAlign: this.align
      };
    }
  },
  mounted() {
    if (this.for) {
      let e = document.createAttribute("for");
      e.value = this.for, this.$el.setAttributeNode(e);
    }
  },
  render() {
    return createVNode("label", {
      class: this.labelClasses,
      style: this.labelStyle
    }, [this.$slots.default()]);
  }
}, FieldBase = /* @__PURE__ */ defineComponent({
  name: "FieldBase",
  template: "",
  props: {
    name: String,
    invalid: {
      type: Boolean,
      default: !1
    },
    validateOnCreate: {
      type: Boolean,
      default: !0
    },
    validateOnBlur: {
      type: Boolean,
      default: !1
    },
    validateOnChange: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      invalidState: this.invalid
    };
  },
  watch: {
    invalid(e) {
      this.invalidState = e;
    }
  },
  computed: {
    form() {
      let e = this.$parent;
      for (; e && e.$options.name != "Form"; )
        e = e.$parent;
      return e;
    },
    field() {
      let e = this.$parent;
      for (; e && e.$options.name != "FormField"; )
        e = e.$parent;
      return e;
    },
    fieldName() {
      return this.name ? this.name : this.field ? this.field.name : null;
    }
  },
  mounted() {
    this.form && this.form.fieldAdd && this.form.fieldAdd(this);
  },
  beforeUnmount() {
    this.form && this.form.fieldRemove && this.form.fieldRemove(this);
  },
  methods: {
    renderField() {
      return null;
    },
    afterFocus() {
    },
    afterBlur() {
      this.form && this.form.fieldBlur && this.form.fieldBlur(this);
    },
    afterValueChange() {
      this.form && this.form.fieldChange && this.form.fieldChange(this);
    },
    setValid(e) {
      this.invalidState = !e;
    }
  },
  render() {
    return this.renderField();
  }
}), InputBase = /* @__PURE__ */ defineComponent({
  name: "InputBase",
  extends: FieldBase,
  components: {
    FieldBase
  },
  props: {
    value: [String, Number, Array],
    modelValue: [String, Number, Array],
    disabled: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    editable: {
      type: Boolean,
      default: !0
    },
    iconCls: String,
    iconAlign: {
      type: String,
      default: "right"
    },
    placeholder: String,
    multiline: {
      type: Boolean,
      default: !1
    },
    invalid: {
      type: Boolean,
      default: !1
    },
    tabindex: Number,
    cls: String,
    inputCls: String,
    inputStyle: Object,
    inputId: String,
    textFormatter: Function
    // textFormatter: {
    //     type: Function,
    //     default: (value) => {return value == null ? value : String(value)}
    // }
  },
  data() {
    const e = this.value !== void 0 ? this.value : this.modelValue;
    return {
      valueState: e,
      textState: String(e || ""),
      focused: !1
    };
  },
  computed: {
    baseClasses() {
      return ["textbox f-inline-row f-field", this.cls, {
        "textbox-disabled": this.disabled,
        "textbox-readonly": this.readonly,
        "textbox-focused": this.focused,
        "textbox-invalid": this.invalidState
      }];
    },
    inputClasses() {
      return ["textbox-text f-full f-order3", this.inputCls, {
        "validatebox-invalid": this.invalidState
      }];
    },
    addonClasses() {
      return ["textbox-addon textbox-addon-icon f-inline-row f-noshrink", {
        "f-order1": this.iconAlign == "left",
        "f-order5": this.iconAlign == "right"
      }];
    },
    addonIconClasses() {
      return ["textbox-icon textbox-icon-disabled", this.iconCls];
    },
    text() {
      return this.textState;
    }
  },
  watch: {
    value() {
      this.setValue(this.value);
    },
    modelValue() {
      this.setValue(this.modelValue);
    }
  },
  methods: {
    defaultTextFormatter(e) {
      return e == null ? e : String(e);
    },
    setValue(e) {
      if (e !== this.valueState) {
        let i = this.valueState;
        this.valueState = e, this.$emit("update:modelValue", this.valueState), this.$emit("valueChange", {
          currentValue: this.valueState,
          previousValue: i
        }), this.afterValueChange();
      }
    },
    onInput(e) {
      this.textState = e.target.value;
    },
    focus() {
      this.$refs.inputRef && this.$refs.inputRef.focus(), this.focused = !0, this.$emit("focus"), this.afterFocus();
    },
    blur() {
      this.$refs.inputRef && this.$refs.inputRef.blur(), this.focused = !1, this.$emit("blur"), this.afterBlur();
    },
    getSelectionStart() {
      return this.getSelectionRange().start;
    },
    getSelectionRange() {
      let e = 0, i = 0, s = this.$refs.inputRef;
      return typeof s.selectionStart == "number" && (e = s.selectionStart, i = s.selectionEnd), {
        start: e,
        end: i
      };
    },
    setSelectionRange(e, i) {
      let s = this.$refs.inputRef;
      if (s.setSelectionRange)
        s.setSelectionRange(e, i);
      else if (s.createTextRange) {
        var l = s.createTextRange();
        l.collapse(), l.moveEnd("character", i), l.moveStart("character", e), l.select();
      }
    },
    renderInput() {
      const e = {
        class: this.inputClasses,
        style: this.inputStyle,
        value: this.text,
        id: this.inputId,
        disabled: this.disabled ? "disabled" : null,
        readonly: this.readonly || !this.editable ? "readonly" : null,
        tabindex: this.tabindex,
        placeholder: this.placeholder,
        onInput: this.onInput,
        onFocus: this.focus,
        onBlur: this.blur
      };
      return createVNode(Fragment, null, [!this.multiline && createVNode("input", mergeProps({
        ref: "inputRef",
        autocomplete: "off"
      }, e), null), this.multiline && createVNode("textarea", mergeProps({
        ref: "inputRef",
        autocomplete: "off"
      }, e), null), createVNode("input", {
        class: "textbox-value",
        type: "hidden",
        value: this.valueState,
        disabled: this.disabled ? "disabled" : null
      }, null)]);
    },
    renderAddon() {
      return createVNode(Fragment, null, [this.$slots.default && this.$slots.default(), this.iconCls && createVNode("span", {
        ref: "addonRef",
        class: this.addonClasses
      }, [createVNode("span", {
        class: this.addonIconClasses
      }, null)])]);
    },
    renderOthers() {
      return null;
    },
    renderField() {
      return createVNode("span", {
        class: this.baseClasses
      }, [this.renderInput(), this.renderAddon(), this.renderOthers()]);
    }
  }
}), ComboBase = {
  name: "ComboBase",
  extends: InputBase,
  props: {
    hasDownArrow: {
      type: Boolean,
      default: !0
    },
    arrowIconCls: {
      type: String,
      default: "combo-arrow"
    },
    arrowAlign: {
      type: String,
      default: "right"
    },
    panelAlign: {
      type: String,
      default: "left"
    },
    panelStyle: Object,
    multiple: {
      type: Boolean,
      default: !1
    },
    separator: {
      type: String,
      default: ","
    },
    delay: {
      type: Number,
      default: 200
    },
    cls: String
  },
  data() {
    return {
      panelClosed: !0,
      panelLeft: 0,
      panelTop: 0,
      scrollTop: 0
    };
  },
  computed: {
    baseClasses() {
      return ["textbox f-inline-row combo f-field", this.cls, {
        "textbox-disabled": this.disabled,
        "textbox-readonly": this.readonly,
        "textbox-focused": this.focused,
        "textbox-invalid": this.invalidState
      }];
    },
    arrowClasses() {
      return ["textbox-addon f-column f-noshrink", {
        "f-order0": this.arrowAlign == "left",
        "f-order6": this.arrowAlign == "right"
      }];
    }
  },
  mounted() {
    domHelper.bind(document, "click", this.onDocumentClick), domHelper.bind(document, "mousewheel", this.onDocumentMouseWheel);
  },
  beforeUnmount() {
    this.$refs.panelRef && this.$el.appendChild(this.$refs.panelRef), domHelper.unbind(document, "click", this.onDocumentClick), domHelper.unbind(document, "mousewheel", this.onDocumentMouseWheel);
  },
  methods: {
    onDocumentClick(e) {
      if (!this.disabled && !this.editable && domHelper.isChild(e.target, this.$refs.inputRef))
        return e.stopPropagation(), this.togglePanel(), !1;
      if (this.$refs.panelRef) {
        if (e.stopPropagation(), domHelper.isChild(e.target, this.$el))
          return !1;
        domHelper.isChild(e.target, this.$refs.panelRef) || this.closePanel();
      }
    },
    onDocumentMouseWheel(e) {
      this.$refs.panelRef && (e.stopPropagation(), domHelper.isChild(e.target, this.$refs.panelRef) || this.closePanel());
    },
    togglePanel() {
      this.disabled || this.readonly || (this.panelClosed ? this.openPanel() : this.closePanel(), this.focus());
    },
    alignPanel() {
      let e = domHelper.getViewport(), i = domHelper.offset(this.$el), s = domHelper.outerWidth(this.$el), l = domHelper.outerWidth(this.$refs.panelRef), r = domHelper.outerHeight(this.$el), a = domHelper.outerHeight(this.$refs.panelRef), n = i.left;
      this.panelAlign == "right" && (n += s - l), n + l > e.width + domHelper.getScrollLeft() && (n = e.width + domHelper.getScrollLeft() - l), n < 0 && (n = 0);
      let o = i.top + r;
      o + a > e.height + domHelper.getScrollTop() && (o = i.top - a), o < domHelper.getScrollTop() && (o = i.top + r), this.panelTop = o, this.panelLeft = n;
    },
    openPanel() {
      this.panelClosed && (this.panelClosed = !1, this.alignPanel(), this.$nextTick(() => {
        document.body.appendChild(this.$refs.panelRef);
        let e = domHelper.outerWidth(this.$el);
        this.panelStyle ? (this.panelStyle.width || (this.$refs.panelRef.style.width = e + "px"), this.panelStyle.minWidth || (this.$refs.panelRef.style.minWidth = e + "px")) : this.$refs.panelRef.style.width = e + "px", this.alignPanel(), this.$refs.panelRef.scrollTop = this.scrollTop;
      }));
    },
    closePanel() {
      this.panelClosed || (this.scrollTop = this.$refs.panelRef.scrollTop, this.panelClosed = !0);
    },
    renderArrow() {
      return this.hasDownArrow ? createVNode("span", {
        ref: "arrowRef",
        class: this.arrowClasses,
        onClick: this.togglePanel
      }, [createVNode("span", {
        class: this.arrowIconCls + " textbox-icon f-full"
      }, null)]) : null;
    },
    renderPanel() {
      if (this.panelClosed)
        return null;
      const e = Object.assign({}, this.panelStyle, {
        left: this.panelLeft + "px",
        top: this.panelTop + "px"
      });
      return createVNode("div", {
        ref: "panelRef",
        class: "panel-body panel-body-noheader combo-panel combo-p",
        style: e
      }, [createVNode("div", {
        className: "f-column",
        style: {
          height: "100%",
          overflow: "hidden"
        }
      }, [createVNode("div", {
        className: "f-full f-column scroll-body"
      }, [this.renderContent()]), this.$slots.footer && this.$slots.footer()])]);
    },
    renderContent() {
      return null;
    },
    renderOthers() {
      return createVNode(Fragment, null, [this.renderArrow(), this.renderPanel()]);
    }
  }
};
class DateHelper {
  parseSelections(i) {
    let s = [], l = i.split(/[^A-Za-z]/), r = 0, a = 0;
    for (let n of l)
      n ? (a += n.length, s.push([r, a]), r = a + 1, a = r) : (r++, a++);
    return s;
  }
  parseDate(i, s) {
    if (!i)
      return null;
    let l = s.split(/[^A-Za-z]/).filter((o) => o), r = i.split(/[^A-Za-z0-9]/).filter((o) => o), a = /* @__PURE__ */ new Date();
    a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0);
    let n = {
      dd: (o) => a.setDate(o),
      d: (o) => a.setDate(o),
      MM: (o) => a.setMonth(+o - 1),
      M: (o) => a.setMonth(+o - 1),
      yyyy: (o) => a.setFullYear(o),
      yy: (o) => {
        o = +o;
        let d = (/* @__PURE__ */ new Date()).getFullYear();
        o + 2e3 - d < 20 ? o += 2e3 : o += 1900, a.setFullYear(o);
      },
      HH: (o) => a.setHours(o),
      H: (o) => a.setHours(o),
      mm: (o) => a.setMinutes(o),
      ss: (o) => a.setSeconds(o),
      SSS: (o) => a.setMilliseconds(o),
      SS: (o) => a.setMilliseconds(o),
      S: (o) => a.setMilliseconds(o)
    };
    for (let o = 0; o < l.length; o++) {
      let d = l[o], u = r[o], c = n[d];
      c && c(+u || 0);
    }
    return a;
  }
  formatDate(i, s) {
    if (!i)
      return "";
    let l = (a) => a < 10 ? "0" + a : a, r = {
      dd: () => l(i.getDate()),
      d: () => i.getDate(),
      MM: () => l(i.getMonth() + 1),
      M: () => i.getMonth() + 1,
      yyyy: () => i.getFullYear(),
      yy: () => String(i.getFullYear()).substr(2, 2),
      HH: () => l(i.getHours()),
      mm: () => l(i.getMinutes()),
      ss: () => l(i.getSeconds()),
      SSS: () => l(i.getMilliseconds()),
      SS: () => l(i.getMilliseconds()),
      S: () => i.getMilliseconds()
    };
    return s.replace(/dd|d|M{1,4}|yyyy|yy|HH|mm|ss|S{1,3}|E{3,4}/g, (a) => {
      let n = r[a];
      return n ? n() : a;
    });
  }
}
const dateHelper = new DateHelper();
class TreeHelper {
  constructor() {
    this.cascadeCheck = !0, this.$vue = null;
  }
  setCheckState(i, s) {
    this.$vue, i.checkState = s;
  }
  checkNode(i, s) {
    i.checkState != "checked" && (this.setCheckState(i, "checked"), this.cascadeCheck && (this.setChildCheckbox(i, i.checkState), this.setParentCheckbox(i)), s(i));
  }
  uncheckNode(i, s) {
    i.checkState != "unchecked" && (this.setCheckState(i, "unchecked"), this.cascadeCheck && (this.setChildCheckbox(i, i.checkState), this.setParentCheckbox(i)), s(i));
  }
  uncheckAllNodes(i, s) {
    let l = !1;
    this.forNodes(i, (r) => {
      r.checkState != "unchecked" && (this.setCheckState(r, "unchecked"), l = !0);
    }), l && s();
  }
  setParentCheckbox(i) {
    let s = i.parent;
    s && (this.setCheckState(s, this.calcNodeState(s)), this.setParentCheckbox(s));
  }
  setChildCheckbox(i, s) {
    if (this.setCheckState(i, s), i.children)
      for (let l of i.children)
        this.setChildCheckbox(l, s);
  }
  adjustCheck(i) {
    this.cascadeCheck && (i.checkState == "checked" ? (this.setChildCheckbox(i, i.checkState), this.setParentCheckbox(i)) : i.checkState == "unchecked" ? (this.setChildCheckbox(i, i.checkState), this.setParentCheckbox(i)) : (this.setCheckState(i, this.calcNodeState(i)), this.setParentCheckbox(i)));
  }
  calcNodeState(i) {
    let s = i.children ? i.children.length : 0;
    if (s) {
      let l = 0, r = 0;
      for (let a of i.children)
        this.setCheckState(a, a.checkState || "unchecked"), a.checkState == "checked" ? l++ : a.checkState == "unchecked" && r++;
      return l == s ? "checked" : r == s ? "unchecked" : "indeterminate";
    }
    return "unchecked";
  }
  forNodes(i, s) {
    i = i || [];
    let l = [];
    for (let r = 0; r < i.length; r++)
      l.push(i[r]);
    for (; l.length; ) {
      let r = l.shift();
      if (s(r) == !1)
        return;
      if (r.children)
        for (let a = r.children.length - 1; a >= 0; a--)
          r.children[a].parent = r, l.unshift(r.children[a]);
    }
  }
  findNode(i, s, l) {
    let r = null;
    return this.forNodes(i, (a) => {
      if (a[s] == l)
        return r = a, !1;
    }), r;
  }
}
const treeHelper = new TreeHelper(), GridColumn = /* @__PURE__ */ defineComponent({
  name: "GridColumn",
  props: {
    field: String,
    title: String,
    width: [Number, String],
    rowspan: {
      type: [Number, String],
      default: 1
    },
    colspan: {
      type: [Number, String],
      default: 1
    },
    hidden: {
      type: Boolean,
      default: !1
    },
    sortable: {
      type: Boolean,
      default: !1
    },
    editable: {
      type: Boolean,
      default: !1
    },
    editRules: [Array, Object, String],
    editMessages: Object,
    order: {
      type: String,
      default: "asc"
    },
    frozen: {
      type: Boolean,
      default: !1
    },
    align: String,
    halign: String,
    sorter: Function,
    headerCls: String,
    headerStyle: Object,
    cellCss: [String, Object, Function],
    expander: {
      type: Boolean,
      default: !1
    },
    filterable: {
      type: Boolean,
      default: !0
    },
    filterOperators: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      grid: null,
      widthState: 0,
      frozenState: this.frozen,
      currOrder: null,
      filterOperator: "contains",
      filterValue: null,
      isFiltering: !1
    };
  },
  watch: {
    filterValue() {
      this.doFilter();
    },
    hidden() {
      this.grid.initColumns();
    }
  },
  mounted() {
    this.widthState = domHelper.toStyleValue(this.width), this.$parent.addColumn(this);
  },
  beforeUnmount() {
    this.$parent.removeColumn(this);
  },
  render() {
    return "";
  },
  methods: {
    doFilter() {
      this.isFiltering || (this.isFiltering = !0, setTimeout(() => {
        this.filterValue == "" || this.filterValue == null ? (this.grid.removeFilterRule(this.field), this.grid.doFilter()) : this.filterOperator && (this.grid.addFilterRule({
          field: this.field,
          op: this.filterOperator,
          value: this.filterValue
        }), this.grid.doFilter()), this.isFiltering = !1;
      }, this.grid.filterDelay));
    }
  }
}), GridHeaderRow = /* @__PURE__ */ defineComponent({
  name: "GridHeaderRow",
  data() {
    return {
      columns: [],
      timer: null
    };
  },
  watch: {
    columns() {
      clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.$parent.$parent.initColumns(), this.$parent.$parent.initHeaderHeight(), this.timer = null;
      });
    }
  },
  mounted() {
    this.$parent.addRow(this);
  },
  beforeUnmount() {
    this.$parent.removeRow(this);
  },
  methods: {
    addColumn(e) {
      const i = this.columns.slice();
      i.push(e), this.columns = i;
    },
    removeColumn(e) {
      const i = this.columns.slice();
      let s = i.indexOf(e);
      s >= 0 && (i.splice(s, 1), this.columns = i);
    }
  },
  render() {
    return createVNode("div", null, [this.$slots.default()]);
  }
}), GridHeaderCell = {
  name: "GridHeaderCell",
  props: {
    column: GridColumn
  },
  render() {
    let e = null;
    return this.column.$slots.header ? e = this.column.$slots.header({
      column: this.column
    }) : e = createVNode("span", null, [this.column.title]), h("div", {
      class: {
        "datagrid-cell": !0,
        "datagrid-sort": this.column.field && this.column.sortable,
        "datagrid-sort-asc": this.column.currOrder == "asc",
        "datagrid-sort-desc": this.column.currOrder == "desc"
      },
      style: {
        "text-align": this.column.halign || this.column.align || null
      }
    }, [e, h("span", {
      class: "datagrid-sort-icon"
    })]);
  }
}, ComboBox = /* @__PURE__ */ defineComponent({
  name: "ComboBox",
  extends: ComboBase,
  components: {
    DataList
  },
  props: {
    value: [String, Number, Array],
    valueField: {
      type: String,
      default: "value"
    },
    textField: {
      type: String,
      default: "text"
    },
    groupField: String,
    limitToList: {
      type: Boolean,
      default: !0
    },
    lazy: {
      type: Boolean,
      default: !1
    },
    virtualScroll: {
      type: Boolean,
      default: !1
    },
    rowHeight: {
      type: Number,
      default: 30
    },
    pageNumber: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    filter: Function
  },
  data() {
    return {
      mappingTexts: {},
      datalistScrollTop: 0,
      scrollPosition: null,
      inputingText: null,
      displayingText: null,
      lastFilterValue: null,
      innerData: [],
      items: [],
      totalState: this.total,
      selection: null,
      timer: null
    };
  },
  computed: {
    text() {
      if (!this.focused) {
        this.valueState != null && this.displayingText == null && this.updateText();
        const e = (this.textFormatter || this.defaultTextFormatter)(this.displayingText);
        this.setText(e);
      }
      return this.textState;
    }
  },
  watch: {
    total(e) {
      this.totalState = e;
    },
    data(e) {
      this.setData(e), this.initTextMapping();
    }
  },
  mounted() {
    domHelper.bind(this.$el, "keydown", this.onKeyDown), this.setData(this.data), this.initTextMapping();
  },
  beforeUnmount() {
    domHelper.unbind(this.$el, "keydown", this.onKeyDown);
  },
  methods: {
    afterValueChange() {
      FieldBase.methods.afterValueChange.call(this), this.updateText();
    },
    afterBlur() {
      FieldBase.methods.afterBlur.call(this), this.onBlur();
    },
    defaultFilter(e, i) {
      return String(i[this.textField]).toLowerCase().indexOf(e.trim().toLowerCase()) !== -1;
    },
    setData(e) {
      e == null && (e = []), this.innerData = Object.assign([], e), this.items = this.innerData, this.updateText();
    },
    setText(e) {
      this.textState = e;
    },
    onInput(e) {
      this.textState = e.target.value, this.focused && (this.inputingText = this.textState, this.panelClosed && this.openPanel(), clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.doFilter(this.textState);
      }, this.delay));
    },
    onKeyDown(e) {
      if (this.panelClosed && e.which == 40) {
        this.openPanel(), e.preventDefault();
        return;
      }
      switch (e.which) {
        case 40:
          this.$refs.datalist.navRow(1), e.preventDefault();
          break;
        case 38:
          this.$refs.datalist.navRow(-1), e.preventDefault();
          break;
        case 13:
          this.$refs.datalist && this.$refs.datalist.highlightRow && (this.$refs.datalist.doEnter(), this.multiple || this.closePanel(), this.textState = this.displayingText), e.preventDefault();
          break;
        case 9:
          this.fixValue(), this.closePanel();
          break;
        case 27:
          this.closePanel(), this.textState = this.displayingText, e.preventDefault();
          break;
      }
    },
    onBlur() {
      this.panelClosed || this.fixValue();
    },
    fixValue() {
      if (this.inputingText == null)
        return;
      let e = this.inputingText.trim();
      if (!e) {
        this.setValue(null), this.clearSelections();
        return;
      }
      if (this.multiple) {
        let i = [], s = [], l = e.split(this.separator).filter((r) => r.trim() != "");
        for (let r of this.valueState || []) {
          let a = this.mappingTexts[r];
          l.indexOf(a) != -1 && (i.push(r), s.push(a));
        }
        this.limitToList || (l = l.filter((r) => s.indexOf(r) == -1), l.length && (i = i.concat(l))), (this.valueState || []).join("") != i.join("") && this.setValue(i);
      } else
        this.inputingText != this.displayingText && (this.clearSelections(), this.setValue(this.limitToList ? null : this.inputingText));
      this.inputingText = null;
    },
    doFilter(e) {
      if (this.lastFilterValue != e) {
        if (e = (e || "").trim(), !this.lazy) {
          if (e) {
            let i = e;
            if (this.multiple) {
              let s = e.split(this.separator);
              i = s[s.length - 1] || "";
            }
            this.items = this.innerData.filter((s) => (this.filter || this.defaultFilter).call(this, i.trim(), s));
          } else
            this.items = this.innerData;
          this.totalState = this.items.length, this.$nextTick(() => {
            this.$refs.datalist && this.$refs.datalist.highlightFirstRow();
          });
        }
        this.lastFilterValue = e, this.$emit("filterChange", {
          pageNumber: 1,
          pageSize: this.pageSize,
          filterValue: e
        });
      }
    },
    openPanel() {
      ComboBase.methods.openPanel.call(this), this.editable && !this.focused && this.doFilter("");
    },
    closePanel() {
      this.panelClosed || (this.scrollPosition = this.$refs.datalist.scrollTop(), this.datalistScrollTop = this.$refs.datalist.scrollTop(), ComboBase.methods.closePanel.call(this));
    },
    onRowClick() {
      this.multiple || this.closePanel();
    },
    onSelectionChange(e) {
      if (this.inputingText = null, e == null) {
        this.setValue(null), this.selection = null;
        return;
      }
      this.multiple ? this.setValue(e.map((i) => i[this.valueField])) : this.setValue(e[this.valueField]);
    },
    onPageChange(e) {
      this.$emit("filterChange", Object.assign(e, {
        filterValue: this.lastFilterValue
      }));
    },
    initTextMapping() {
      if (this.selectionValue)
        if (this.selectionValue instanceof Array)
          this.selectionValue.forEach((e) => {
            let i = e[this.valueField], s = e[this.textField];
            this.mappingTexts[i] = s;
          });
        else {
          let e = this.selectionValue[this.valueField], i = this.selectionValue[this.textField];
          this.mappingTexts[e] = i;
        }
    },
    updateText() {
      if (this.valueState == null)
        this.$refs.datalist && (this.mappingTexts = {}), this.displayingText = null, this.updateSelection(null);
      else {
        let e = {}, i = [];
        if (this.multiple) {
          let s = [];
          for (let l = 0; l < this.valueState.length; l++) {
            let r = this.valueState[l], a = this.findItem(r);
            if (a)
              e[r] = a[this.textField], s.push(a);
            else {
              e[r] = this.mappingTexts[r] || r;
              let n = {};
              n[this.valueField] = r, n[this.textField] = e[r], s.push(n);
            }
            i.push(e[r]);
          }
          this.updateSelection(s);
        } else {
          let s = this.findItem(this.valueState);
          if (s)
            e[this.valueState] = s[this.textField], this.updateSelection(s);
          else {
            e[this.valueState] = this.mappingTexts[this.valueState] || this.valueState;
            let l = {};
            l[this.valueField] = this.valueState, l[this.textField] = e[this.valueState], this.updateSelection(l);
          }
          i.push(e[this.valueState]);
        }
        this.mappingTexts = e, this.displayingText = i.join(this.separator);
      }
    },
    findItem(e) {
      let i = (l, r = null) => {
        r || (r = this.data || []);
        for (let a of r)
          if (a[this.valueField] == l)
            return a;
        return null;
      }, s = i(e);
      if (!s && this.selection) {
        let l = this.selection instanceof Array ? this.selection : [this.selection];
        s = i(e, l);
      }
      return s;
    },
    updateSelection(e) {
      e ? e = e instanceof Array ? e : [e] : e = [];
      const i = this.selection;
      this.multiple ? this.selection = e : this.selection = e[0] || null, this.selection != i && this.$emit("selectionChange", this.selection);
    },
    clearSelections() {
      this.selection && (this.multiple ? this.selection.length && (this.selection = [], this.$emit("selectionChange", this.selection)) : (this.selection = null, this.$emit("selectionChange", this.selection)));
    },
    renderContent() {
      const e = {
        default: (i) => this.$slots.item ? this.$slots.item(i) : i.row[this.textField],
        empty: this.$slots.empty
      };
      return createVNode(DataList, {
        ref: "datalist",
        class: "f-full",
        style: "height:100%",
        itemCls: "combobox-item",
        hoverCls: "combobox-item-hover",
        selectedCls: "combobox-item-selected",
        border: !1,
        data: this.items,
        lazy: this.lazy,
        virtualScroll: this.virtualScroll,
        total: this.totalState,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        rowHeight: this.rowHeight,
        selectionMode: this.multiple ? "multiple" : "single",
        idField: this.valueField,
        selection: this.selection,
        scrollPosition: this.scrollPosition,
        onRowClick: this.onRowClick,
        onSelectionChange: this.onSelectionChange,
        onPageChange: this.onPageChange
      }, e);
    }
  }
}), GridFilterButton = {
  name: "GridFilterButton",
  extends: ComboBox,
  props: {
    arrowIconCls: {
      type: String,
      default: "icon-filter"
    },
    panelStyle: {
      type: Object,
      default: () => ({
        height: "auto",
        width: "150px"
      })
    },
    inputStyle: {
      type: Object,
      default: () => ({
        display: "none"
      })
    },
    editable: {
      type: Boolean,
      default: !1
    },
    column: Object
  },
  mounted() {
    this.$nextTick(() => this.initData());
  },
  methods: {
    initData() {
      if (this.column.filterOperators && this.column.filterOperators.length) {
        let e = this.column.grid.filterOperators, i = this.column.filterOperators.map((l) => ({
          value: l,
          text: e[l].text
        }));
        this.setData(i);
        let s = this.column.grid.getFilterRule(this.column.field);
        s ? this.column.filterOperator = s.op : this.column.filterOperator = null;
      }
    },
    onSelectionChange(e) {
      if (ComboBox.methods.onSelectionChange.call(this, e), !e)
        return;
      let i = e.value;
      if (!i) {
        this.column.filterOperator = null, this.column.filterValue = null, this.column.grid.removeFilterRule(this.column.field);
        return;
      }
      i == "nofilter" ? (this.column.filterOperator = null, this.column.filterValue = null, this.column.grid.removeFilterRule(this.column.field), this.column.grid.doFilter()) : this.column.filterValue != null && this.column.filterValue != "" && (this.column.filterOperator = i, this.column.grid.addFilterRule({
        field: this.column.field,
        op: i,
        value: this.column.filterValue
      }), this.column.grid.doFilter());
    }
  }
}, GridFilterCell = {
  name: "GridFilterCell",
  components: {
    GridFilterButton
  },
  props: {
    column: GridColumn,
    grid: Object
  },
  computed: {
    filterValue() {
      return this.column.filterValue;
    }
  },
  watch: {
    "column.filterValue"(e) {
      this.$refs.input && (this.$refs.input.value = e);
    }
  },
  methods: {
    isOnLeft() {
      return !!(this.column.filterOperators && this.column.filterOperators.length && this.grid.filterBtnPosition == "left");
    },
    isOnRight() {
      return !!(this.column.filterOperators && this.column.filterOperators.length && this.grid.filterBtnPosition == "right");
    }
  },
  render() {
    let e = "";
    this.isOnLeft() && (i = createVNode(GridFilterButton, {
      class: "datagrid-filter-btn datagrid-filter-btn-left f-noshrink",
      column: this.column,
      value: this.column.filterOperator
    }, null));
    let i = "";
    this.isOnRight() && (i = createVNode(GridFilterButton, {
      class: "datagrid-filter-btn datagrid-filter-btn-right f-noshrink",
      column: this.column,
      value: this.column.filterOperator
    }, null));
    let s = null;
    return this.column.$slots.filter ? s = this.column.$slots.filter({
      column: this.column
    }) : s = createVNode("input", {
      ref: "input",
      class: "datagrid-editable-input datagrid-filter f-full",
      value: this.column.filterValue,
      onInput: (l) => {
        this.column.filterValue = l.target.value;
      }
    }, null), h("div", {
      class: "datagrid-filter-c f-row"
    }, [e, s, i]);
  }
}, GridFilterRow = {
  name: "GridFilterRow",
  components: {
    GridFilterCell
  },
  props: {
    columns: Array,
    grid: Object
  },
  methods1: {
    isOnLeft(e) {
      return !!(e.filterOperators && e.filterOperators.length && this.grid.filterBtnPosition == "left");
    },
    isOnRight(e) {
      return !!(e.filterOperators && e.filterOperators.length && this.grid.filterBtnPosition == "right");
    }
  },
  render() {
    return createVNode("tr", {
      class: "datagrid-header-row datagrid-filter-row"
    }, [this.columns.map((e) => createVNode("td", null, [createVNode(GridFilterCell, {
      column: e,
      grid: this.grid
    }, null)]))]);
  }
};
class ResizableClass {
  constructor(i, s = null) {
    this.updateOptions(s), this.$el = i;
  }
  updateOptions(i) {
    let s = Object.assign({
      disabled: !1,
      handles: "all",
      // n, e, s, w, ne, se, sw, nw, all
      edge: 5,
      minWidth: 10,
      minHeight: 10,
      maxWidth: 1e4,
      maxHeight: 1e4,
      resizeStart: () => {
      },
      resizing: () => {
      },
      resizeStop: () => {
      }
    }, this, i || {});
    Object.assign(this, s);
  }
  bindEvents() {
    this.$el._downHandler = (i) => {
      this.onMouseDown(i);
    }, this.$el._moveHandler = (i) => {
      this.onMouseMove(i);
    }, this.$el._leaveHandler = (i) => {
      this.onMouseLeave(i);
    }, domHelper.bind(this.$el, "mousedown", this.$el._downHandler), domHelper.bind(this.$el, "touchstart", this.$el._downHandler), domHelper.bind(this.$el, "mousemove", this.$el._moveHandler), domHelper.bind(this.$el, "touchmove", this.$el._moveHandler), domHelper.bind(this.$el, "mouseleave", this.$el._leaveHandler), domHelper.bind(this.$el, "touchcancel", this.$el._leaveHandler), domHelper.bind(this.$el, "touchend", this.$el._leaveHandler);
  }
  unbindEvents() {
    domHelper.unbind(this.$el, "mousedown", this.$el._downHandler), domHelper.unbind(this.$el, "touchstart", this.$el._downHandler), domHelper.unbind(this.$el, "mousemove", this.$el._moveHandler), domHelper.unbind(this.$el, "touchmove", this.$el._moveHandler), domHelper.unbind(this.$el, "mouseleave", this.$el._leaveHandler), domHelper.unbind(this.$el, "touchcancel", this.$el._leaveHandler), domHelper.unbind(this.$el, "touchend", this.$el._leaveHandler);
  }
  parseEvent(i) {
    return new MyEvent(i);
  }
  onMouseDown(i) {
    if (this.disabled)
      return;
    i = this.parseEvent(i);
    let s = this.getDirection(i);
    if (!s)
      return;
    i.preventDefault();
    let l = getComputedStyle(this.$el);
    this.state = {
      target: this.$el,
      dir: s,
      width: domHelper.outerWidth(this.$el),
      height: domHelper.outerHeight(this.$el),
      startWidth: domHelper.outerWidth(this.$el),
      startHeight: domHelper.outerHeight(this.$el),
      startX: i.pageX,
      startY: i.pageY,
      left: parseInt(l.left) || 0,
      top: parseInt(l.top) || 0,
      startLeft: parseInt(l.left) || 0,
      startTop: parseInt(l.top) || 0
    }, this.isResizing = !0, document.body.style.cursor = s ? s + "-resize" : "", this.bindDocumentEvents(), this.resizeStart(this.state);
  }
  onMouseMove(i) {
    if (this.disabled || this.isResizing)
      return;
    i = this.parseEvent(i);
    let s = this.getDirection(i);
    this.$el.style.cursor = s ? s + "-resize" : "", this.$el.resizeCursor = s ? s + "-resize" : "";
  }
  onMouseLeave() {
    this.disabled || (this.$el.style.cursor = "", this.$el.resizeCursor = "");
  }
  doMove(i) {
    if (this.isResizing)
      return i = this.parseEvent(i), this.doResize(i), this.applySize(), this.resizing(this.state), !1;
  }
  doUp(i) {
    return i = this.parseEvent(i), this.isResizing = !1, document.body.style.cursor = "", this.doResize(i), this.applySize(), this.unbindDocumentEvents(), this.resizeStop(this.state), !1;
  }
  getDirection(i) {
    let s = "", l = domHelper.offset(this.$el), r = domHelper.outerWidth(this.$el), a = domHelper.outerHeight(this.$el);
    i.pageY > l.top && i.pageY < l.top + this.edge ? s += "n" : i.pageY < l.top + a && i.pageY > l.top + a - this.edge && (s += "s"), i.pageX > l.left && i.pageX < l.left + this.edge ? s += "w" : i.pageX < l.left + r && i.pageX > l.left + r - this.edge && (s += "e");
    let n = this.handles.split(",").map((d) => d.trim().toLowerCase());
    if (n.indexOf("all") >= 0 || n.indexOf(s) >= 0)
      return s;
    for (var o = 0; o < s.length; o++) {
      let d = n.indexOf(s.substr(o, 1));
      if (d >= 0)
        return n[d];
    }
    return "";
  }
  doResize(i) {
    let s = this.state;
    if (s.dir.indexOf("e") != -1) {
      let l = s.startWidth + i.pageX - s.startX;
      l = Math.min(
        Math.max(l, this.minWidth),
        this.maxWidth
      ), s.width = l;
    }
    if (s.dir.indexOf("s") != -1) {
      let l = s.startHeight + i.pageY - s.startY;
      l = Math.min(
        Math.max(l, this.minHeight),
        this.maxHeight
      ), s.height = l;
    }
    if (s.dir.indexOf("w") != -1) {
      let l = s.startWidth - i.pageX + s.startX;
      l = Math.min(
        Math.max(l, this.minWidth),
        this.maxWidth
      ), s.width = l, s.left = s.startLeft + s.startWidth - s.width;
    }
    if (s.dir.indexOf("n") != -1) {
      let l = s.startHeight - i.pageY + s.startY;
      l = Math.min(
        Math.max(l, this.minHeight),
        this.maxHeight
      ), s.height = l, s.top = s.startTop + s.startHeight - s.height;
    }
  }
  applySize() {
    this.$el.style.left = this.state.left + "px", this.$el.style.top = this.state.top + "px", this.state.width != this.state.startWidth && (this.$el.style.width = this.state.width + "px"), this.state.height != this.state.startHeight && (this.$el.style.height = this.state.height + "px");
  }
  bindDocumentEvents() {
    this.$el._docMoveHandler = (i) => {
      this.doMove(i);
    }, this.$el._docUpHandler = (i) => {
      this.doUp(i);
    }, domHelper.bind(document, "mousemove", this.$el._docMoveHandler), domHelper.bind(document, "touchmove", this.$el._docMoveHandler), domHelper.bind(document, "mouseup", this.$el._docUpHandler), domHelper.bind(document, "touchend", this.$el._docUpHandler);
  }
  unbindDocumentEvents() {
    domHelper.unbind(document, "mousemove", this.$el._docMoveHandler), domHelper.unbind(document, "touchmove", this.$el._docMoveHandler), domHelper.unbind(document, "mouseup", this.$el._docUpHandler), domHelper.unbind(document, "touchend", this.$el._docUpHandler);
  }
}
const Resizable = {
  name: "Resizable",
  mounted(e, i) {
    e._resizeInstance = new ResizableClass(e, i.value), e._resizeInstance.bindEvents();
  },
  updated(e, i) {
    e._resizeInstance.updateOptions(i.value);
  },
  beforeUnmount(e) {
    e._resizeInstance.unbindEvents();
  }
}, GridHeader = {
  name: "GridHeader",
  components: {
    GridHeaderCell,
    GridFilterRow
  },
  directives: {
    Resizable
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnGroup: Object,
    paddingWidth: {
      type: Number,
      default: 0
    },
    filterable: {
      type: Boolean,
      default: !1
    },
    grid: Object
  },
  data() {
    return {
      heightState: 0,
      scrollLeftState: 0,
      hoverColumn: null,
      dragScope: {}
    };
  },
  computed: {
    filterOnTop() {
      return !!(this.grid.filterable && (this.grid.filterPosition == "both" || this.grid.filterPosition == "top"));
    },
    filterOnBottom() {
      return !!(this.grid.filterable && (this.grid.filterPosition == "both" || this.grid.filterPosition == "bottom"));
    }
  },
  methods: {
    height(e) {
      if (e == null)
        return domHelper.outerHeight(this.$refs.contentRef);
      this.heightState = e && e - 1;
    },
    scrollLeft(e) {
      if (e == null)
        return this.scrollLeftState;
      this.scrollLeftState = e, this.$refs.headerRef.scrollLeft = e;
    },
    onCellClick(e, i) {
      this.$emit("cellClick", {
        column: i,
        originalEvent: e
      });
    },
    getResizableOpts(e) {
      return {
        disabled: !this.grid.columnResizing || !e.field,
        handles: "e",
        resizing: (i) => {
          this.onColumnResizing(e, i);
        },
        resizeStop: (i) => {
          this.onColumnResizeStop(e, i);
        }
      };
    },
    getDraggableOpts(e) {
      return {
        disabled: !this.grid.columnMoving || !e.field,
        revert: !0,
        deltaX: 0,
        deltaY: 0,
        edge: 5,
        scope: this.dragScope,
        proxy: this.$refs.proxy,
        dragStart: (i) => {
          this.onColumnDragStart(e, i);
        }
      };
    },
    getDroppableOpts(e) {
      return {
        field: e.field,
        dragOver: (i) => {
          this.onColumnDragOver(e, i);
        },
        dragLeave: (i) => {
          this.onColumnDragLeave(e, i);
        },
        drop: (i) => {
          this.onColumnDrop(e, i);
        }
      };
    },
    onColumnResizing(e, i) {
      i.target.style.width = null, i.target.style.left = null, i.target.style.top = null, this.grid.resizeColumn(e.field, i.width);
    },
    onColumnResizeStop(e, i) {
      i.target.style.width = null, i.target.style.left = null, i.target.style.top = null, this.grid.resizeColumn(e.field, i.width);
    },
    onColumnDragStart(e, i) {
      Object.assign(this.dragScope, {
        column: e,
        event: i,
        fromIndex: this.grid.allColumns.indexOf(e),
        viewOffset: domHelper.offset(this.grid.$refs.viewRef)
      });
    },
    onColumnDragOver(e, i) {
      if (!i)
        return;
      i.toIndex = this.grid.allColumns.indexOf(e);
      const s = i.fromIndex - i.toIndex;
      i.point = s === 0 ? null : s < 0 ? "after" : "before";
      let l = null;
      if (s !== 0) {
        let r = i.event.target.currDroppable.$el, n = domHelper.offset(r).left - i.viewOffset.left;
        i.toIndex !== 0 && (n -= 1), l = {
          left: domHelper.toStyleValue(s < 0 ? n + domHelper.outerWidth(r) : n),
          top: 0
        };
      }
      this.grid.splitStyle = l;
    },
    onColumnDragLeave() {
      this.grid.splitStyle = null;
    },
    onColumnDrop(e, i) {
      i && (this.dragScope = {}, this.$nextTick(() => {
        i.point && this.grid.moveColumn(i.column.field, e.field, i.point);
      }));
    },
    renderGroupCells() {
      return this.columnGroup ? createVNode("tbody", null, [this.filterOnTop && createVNode(GridFilterRow, {
        columns: this.columns,
        grid: this.grid
      }, null), this.columnGroup.rows.map((e) => createVNode("tr", {
        class: "datagrid-header-row"
      }, [e.columns.map((i) => withDirectives(createVNode("td", {
        rowspan: i.rowspan,
        colspan: i.colspan,
        class: (i.field ? "datagrid-field-td" : "") + (this.hoverColumn == i && i.sortable ? " datagrid-header-over" : ""),
        onMouseenter: () => this.hoverColumn = i,
        onMouseleave: () => this.hoverColumn = null,
        onClick: (s) => this.onCellClick(s, i)
      }, [createVNode(GridHeaderCell, {
        column: i
      }, null)]), [[resolveDirective("resizable"), this.getResizableOpts(i)]]))])), this.filterOnBottom && createVNode(GridFilterRow, {
        columns: this.columns,
        grid: this.grid
      }, null)]) : null;
    },
    renderRowCells() {
      return this.columnGroup ? null : createVNode("tbody", null, [this.filterOnTop && createVNode(GridFilterRow, {
        columns: this.columns,
        grid: this.grid
      }, null), createVNode("tr", {
        class: "datagrid-header-row"
      }, [this.columns.map((e) => withDirectives(createVNode("td", {
        class: "datagrid-field-td" + (this.hoverColumn == e && e.sortable ? " datagrid-header-over" : ""),
        onMouseenter: () => this.hoverColumn = e,
        onMouseleave: () => this.hoverColumn = null,
        onClick: (i) => this.onCellClick(i, e)
      }, [createVNode(GridHeaderCell, {
        column: e
      }, null)]), [[resolveDirective("resizable"), this.getResizableOpts(e)], [resolveDirective("draggable"), this.getDraggableOpts(e)], [resolveDirective("droppable"), this.getDroppableOpts(e)]]))]), this.filterOnBottom && createVNode(GridFilterRow, {
        columns: this.columns,
        grid: this.grid
      }, null)]);
    }
  },
  render() {
    return createVNode("div", {
      class: "datagrid-header f-row f-noshrink"
    }, [createVNode("div", {
      ref: "headerRef",
      class: "datagrid-header-inner f-full",
      style: {
        height: this.heightState + "px"
      }
    }, [createVNode("table", {
      ref: "contentRef",
      class: "datagrid-htable",
      border: "0",
      cellspacing: "0",
      cellpadding: "0"
    }, [createVNode("colgroup", null, [this.columns.map((e) => createVNode("col", {
      style: {
        width: e.widthState
      }
    }, null))]), this.renderGroupCells(), this.renderRowCells()])]), this.paddingWidth && createVNode("div", {
      class: "datagrid-header f-noshrink",
      style: {
        width: this.paddingWidth + "px"
      }
    }, null), createVNode(resolveComponent("DraggableProxy"), {
      ref: "proxy"
    }, {
      default: () => [createVNode("div", {
        class: "datagrid-moving-proxy"
      }, [this.dragScope.column ? this.dragScope.column.title : null])]
    })]);
  }
}, GridBody = {
  name: "GridBody",
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      scrollTopState: 0
    };
  },
  methods: {
    onScroll() {
      this.$emit("bodyScroll", {
        left: this.$refs.bodyRef.scrollLeft,
        top: this.$refs.bodyRef.scrollTop
      });
    },
    scrollTop(e) {
      if (e == null)
        return this.scrollTopState;
      this.scrollTopState = e, this.$refs.bodyRef.scrollTop = e;
    },
    scrollbarWidth() {
      return domHelper.outerWidth(this.$refs.bodyRef) - domHelper.outerWidth(this.$refs.innerRef);
    }
  }
}, GridFooterCell = {
  name: "GridFooterCell",
  props: {
    row: Object,
    column: Object,
    rowIndex: Number
  },
  render() {
    let e = null;
    return this.column.$slots.footer ? e = this.column.$slots.footer({
      row: this.row,
      column: this.column,
      rowIndex: this.rowIndex
    }) : e = this.row[this.column.field], createVNode("div", {
      class: "datagrid-cell",
      style: {
        textAlign: this.column.align || null
      }
    }, [e]);
  }
}, GridFooter = {
  name: "GridFooter",
  components: {
    GridFooterCell
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    paddingWidth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scrollLeftState: 0
    };
  },
  methods: {
    scrollLeft(e) {
      if (e == null)
        return this.scrollLeftState;
      this.scrollLeftState = e, this.$refs.footerRef.scrollLeft = e;
    }
  },
  render() {
    return createVNode("div", {
      class: "datagrid-footer f-row f-noshrink"
    }, [createVNode("div", {
      ref: "footerRef",
      class: "datagrid-footer-inner f-full"
    }, [createVNode("table", {
      class: "datagrid-ftable",
      border: "0",
      cellspacing: "0",
      cellpadding: "0"
    }, [createVNode("colgroup", null, [this.columns.map((e) => createVNode("col", {
      style: {
        width: e.widthState
      }
    }, null))]), createVNode("tbody", null, [this.rows.map((e, i) => createVNode("tr", {
      class: "datagrid-row"
    }, [this.columns.map((s) => createVNode("td", null, [createVNode(GridFooterCell, {
      row: e,
      column: s,
      rowIndex: i
    }, null)]))]))])])]), this.paddingWidth && createVNode("div", {
      class: "datagrid-footer f-noshrink",
      style: {
        width: this.paddingWidth + "px"
      }
    }, null)]);
  }
}, GridView = {
  name: "GridView",
  components: {
    GridHeader,
    GridBody,
    GridFooter
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnGroup: Object,
    viewIndex: {
      type: Number,
      default: 2
    },
    rows: {
      type: Array,
      default: () => []
    },
    footerRows: {
      type: Array,
      default: () => []
    },
    filterable: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      headerPaddingWidth: 0
    };
  },
  computed: {
    viewCls() {
      return "f-column datagrid-view" + this.viewIndex + (this.viewIndex == 2 ? " f-full" : " f-noshrink");
    }
  },
  watch: {
    rows() {
      this.$nextTick(() => {
        this.headerPaddingWidth = this.getHeaderPaddingWidth();
      });
    }
  },
  methods: {
    scrollTop(e) {
      if (e == null)
        return this.$refs.body.scrollTop();
      this.$refs.body.scrollTop(e);
    },
    headerHeight(e) {
      if (e == null)
        return this.$refs.header ? this.$refs.header.height() : 0;
      this.$refs.header && this.$refs.header.height(e);
    },
    getHeaderPaddingWidth() {
      if (this.viewIndex == 2) {
        let e = this.$refs.body ? this.$refs.body.scrollbarWidth() : 0;
        if (e > 0)
          return e;
      }
      return null;
    },
    onBodyScroll(e) {
      this.$refs.header && this.$refs.header.scrollLeft(e.left), this.$refs.footer && this.$refs.footer.scrollLeft(e.left), this.$emit("bodyScroll", e);
    },
    onResize() {
    }
  },
  render() {
    return createVNode("div", {
      class: this.viewCls
    }, [createVNode(GridHeader, {
      ref: "header",
      columnGroup: this.columnGroup,
      columns: this.columns,
      paddingWidth: this.headerPaddingWidth
    }, null), createVNode(GridBody, {
      ref: "body",
      align: "center",
      columns: this.columns,
      rows: this.rows,
      onBodyScroll: this.onBodyScroll
    }, null)]);
  }
}, GridBase = /* @__PURE__ */ defineComponent({
  name: "GridBase",
  extends: ListBase,
  components: {
    GridColumn,
    GridHeaderRow,
    GridHeader,
    GridView
  },
  props: {
    rowHeight: {
      type: Number,
      default: 32
    },
    striped: {
      type: Boolean,
      default: !1
    },
    rowCss: [Object, Function],
    frozenWidth: {
      type: [Number, String],
      default: "200px"
    },
    frozenAlign: {
      type: String,
      default: "left"
    },
    sorts: {
      type: [Object, Array],
      default: () => []
    },
    multiSort: {
      type: Boolean,
      default: !1
    },
    showHeader: {
      type: Boolean,
      default: !0
    },
    showFooter: {
      type: Boolean,
      default: !1
    },
    editMode: String,
    // row, cell
    tipOptions: Object,
    clickToEdit: {
      type: Boolean,
      default: !1
    },
    dblclickToEdit: {
      type: Boolean,
      default: !1
    },
    footerData: {
      type: Array,
      default: () => []
    },
    filterRules: {
      type: Array,
      default: () => []
    },
    columnResizing: {
      type: Boolean,
      default: !1
    },
    columnMoving: {
      type: Boolean,
      default: !1
    },
    cellSpan: {
      type: Function,
      default: () => ({
        rowspan: 1,
        colspan: 1
      })
    }
  },
  data() {
    return {
      leftGroup: null,
      rightGroup: null,
      centerGroup: null,
      leftColumns: [],
      rightColumns: [],
      centerColumns: [],
      columnRefs: [],
      groupRefs: [],
      sortsState: this.sorts,
      editingItem: null,
      headerHeight: 0,
      splitStyle: null
    };
  },
  computed: {
    allColumns() {
      let e = [];
      return this.leftColumns && (e = e.concat(this.leftColumns)), this.centerColumns && (e = e.concat(this.centerColumns)), this.rightColumns && (e = e.concat(this.rightColumns)), e;
    },
    footerRows() {
      return this.footerData instanceof Array ? this.footerData : [this.footerData];
    },
    leftFrozenWidth() {
      let e = this.leftGroup ? this.leftGroup.widthState : 0;
      return e || this.frozenWidth;
    },
    rightFrozenWidth() {
      let e = this.rightGroup ? this.rightGroup.widthState : 0;
      return e || this.frozenWidth;
    }
  },
  watch: {
    groupRefs() {
      this.initColumns(), this.initHeaderHeight();
    },
    columnRefs() {
      this.initColumns(), this.initHeaderHeight();
    },
    filterRules() {
      this.initFilterRules();
    }
  },
  created() {
    this.initColumnSort(), window.EventHub && (window.EventHub.$on("tabSelect", (e) => {
      domHelper.isChild(this.$el, e.$el) && (this.headerHeight || this.initHeaderHeight());
    }), window.EventHub.$on("panelSelect", (e) => {
      domHelper.isChild(this.$el, e.$el) && (this.headerHeight || this.initHeaderHeight());
    }));
  },
  mounted() {
    this.hasDestroyed = !1, this.initFilterRules(), this.$nextTick(() => this.initHeaderHeight()), window.EventHub && window.EventHub.$emit("gridMounted", this);
  },
  beforeUnmount() {
    this.hasDestroyed = !0;
  },
  methods: {
    addColumn(e) {
      this.columnRefs.push(e), this.changeColumns();
    },
    removeColumn(e) {
      let i = this.columnRefs.indexOf(e);
      i >= 0 && (this.columnRefs.splice(i, 1), this.changeColumns());
    },
    addColumnGroup(e) {
      this.groupRefs.push(e), this.changeColumns();
    },
    removeColumnGroup(e) {
      let i = this.columnRefs.indexOf(e);
      i >= 0 && (this.groupRefs.splice(i, 1), this.changeColumns());
    },
    changeColumns() {
      this.hasDestroyed || (clearTimeout(this.columnTimer), this.columnTimer = setTimeout(() => {
        this.initColumns(), this.initHeaderHeight();
      }));
    },
    // initColumns() {
    //     this.leftGroup = null;
    //     this.leftColumns = null;
    //     this.rightGroup = null;
    //     this.rightColumns = null;
    //     this.centerGroup = null;
    //     this.centerColumns = null;
    //     if (this.groupRefs && this.groupRefs.length) {
    //         this.groupRefs.forEach((g) => {
    //             let cc = this.getColumnLayout(g);
    //             let columns = cc[cc.length - 1];
    //             if (g.frozen) {
    //                 if (g.align == 'left') {
    //                     this.leftGroup = g;
    //                     this.leftColumns = columns;
    //                 } else {
    //                     this.rightGroup = g;
    //                     this.rightColumns = columns;
    //                 }
    //             } else {
    //                 this.centerGroup = g;
    //                 this.centerColumns = columns;
    //             }
    //         });
    //     }
    //     if (!this.centerColumns) {
    //         this.centerColumns = this.columnRefs.filter((c) => {
    //             return !c.frozenState;
    //         });
    //         let frozenColumns = this.columnRefs.filter((c) => {
    //             return c.frozenState;
    //         });
    //         if (frozenColumns.length) {
    //             if (this.frozenAlign == 'left') {
    //                 this.leftColumns = frozenColumns;
    //             } else {
    //                 this.rightColumns = frozenColumns;
    //             }
    //         }
    //     }
    //     this.allColumns.forEach(c => c.grid = this);
    //     this.initColumnSort();
    // },
    initColumns() {
      const {
        columnRefs: e,
        groupRefs: i
      } = this;
      let s = {
        leftGroup: null,
        leftColumns: null,
        rightGroup: null,
        rightColumns: null,
        centerGroup: null,
        centerColumns: null
      };
      if (i && i.length && i.forEach((l) => {
        let r = this.getColumnLayout(l), a = r[r.length - 1];
        l.frozen ? l.align == "left" ? (s.leftGroup = l, s.leftColumns = a) : (s.rightGroup = l, s.rightColumns = a) : (s.centerGroup = l, s.centerColumns = a);
      }), !s.centerColumns) {
        s.centerColumns = e.filter((r) => !r.frozenState && !r.hidden);
        let l = e.filter((r) => r.frozenState && !r.hidden);
        l.length && (this.frozenAlign == "left" ? s.leftColumns = l : s.rightColumns = l);
      }
      Object.assign(this, s), this.allColumns.forEach((l) => l.grid = this), this.initColumnSort();
    },
    initHeaderHeight() {
      this.$refs.view1 && this.$refs.view1.headerHeight(null), this.$refs.view2 && this.$refs.view2.headerHeight(null), this.$refs.view3 && this.$refs.view3.headerHeight(null), this.$nextTick(() => {
        let e = this.$refs.view1 ? this.$refs.view1.headerHeight() : 0, i = this.$refs.view2 ? this.$refs.view2.headerHeight() : 0, s = this.$refs.view3 ? this.$refs.view3.headerHeight() : 0;
        this.headerHeight = Math.max(e, i, s), this.$refs.view1 && this.$refs.view1.headerHeight(this.headerHeight), this.$refs.view2 && this.$refs.view2.headerHeight(this.headerHeight), this.$refs.view3 && this.$refs.view3.headerHeight(this.headerHeight);
      });
    },
    initFilterRules() {
      this.filterRules.forEach((e) => {
        let i = this.findColumn(e.field);
        i && (i.filterValue = e.value, i.filterOperator = e.op);
      });
    },
    getColumnLayout(e) {
      let i = [], s = this.getColumnCount(e);
      for (let l = 0; l < e.rows.length; l++)
        i[l] = new Array(s);
      return e.rows.forEach((l, r) => {
        l.columns.filter((a) => !a.hidden).forEach((a) => {
          let n = this.getColumnIndex(i[r]);
          if (n >= 0)
            for (let o = 0; o < a.colspan; o++)
              for (let d = 0; d < a.rowspan; d++)
                i[r + d][n + o] = a || "";
        });
      }), i;
    },
    getColumnCount(e) {
      let i = 0;
      return e.rows[0].columns.filter((s) => !s.hidden).forEach((s) => {
        i += Number(s.colspan);
      }), i;
    },
    getColumnIndex(e) {
      for (let i = 0; i < e.length; i++)
        if (e[i] == null)
          return i;
      return -1;
    },
    onBodyScroll(e) {
      let i = e ? e.top : this.view2.scrollTop();
      this.$refs.view1 && this.$refs.view1.scrollTop(i), this.$refs.view3 && this.$refs.view3.scrollTop(i);
    },
    addSort(e) {
      let i = -1;
      for (let s = 0; s < this.sortsState.length; s++)
        if (this.sortsState[s].field == e.field) {
          i = s;
          break;
        }
      if (i >= 0) {
        let s = this.sortsState[i].order == "asc" ? "desc" : "asc";
        this.multiSort && s == e.order ? this.sortsState.splice(i, 1) : this.sortsState[i].order = s;
      } else
        this.multiSort ? this.sortsState.push({
          field: e.field,
          order: e.order
        }) : this.sortsState = [{
          field: e.field,
          order: e.order
        }];
      this.initColumnSort();
    },
    initColumnSort() {
      this.sortsState = this.sortsState || [], this.sortsState instanceof Array || (this.sortsState = [this.sortsState]), this.multiSort || (this.sortsState = this.sortsState.slice(0, 1));
      for (let e = 0; e < this.allColumns.length; e++) {
        let i = this.allColumns[e];
        i.currOrder = null;
        for (let s = 0; s < this.sortsState.length; s++) {
          let l = this.sortsState[s];
          if (l.field == i.field) {
            i.currOrder = l.order;
            break;
          }
        }
      }
    },
    findColumn(e) {
      let i = this.allColumns;
      for (let s = 0; s < i.length; s++)
        if (i[s].field == e)
          return i[s];
      return null;
    },
    addFilterRule(e) {
      ListBase.methods.addFilterRule.call(this, e);
      let i = this.findColumn(e.field);
      i && (i.filterValue = e.value, i.filterOperator = e.op);
    },
    resizeColumn(e, i) {
      const s = this.findColumn(e);
      s && (s.widthState = domHelper.toStyleValue(i), this.$emit("columnResize", s));
    },
    moveColumn(e, i, s) {
      const l = (this.leftColumns || []).length, r = (this.centerColumns || []).length, a = this.columnRefs.slice(), n = a.findIndex((u) => u.field === e), o = a[n];
      a.splice(n, 1);
      const d = a.findIndex((u) => u.field === i);
      a.splice(d + (s === "before" ? 0 : 1), 0, o);
      for (let u = 0; u < a.length; u++)
        a[u].frozenState = !0;
      for (let u = l; u < l + r; u++)
        a[u].frozenState = !1;
      this.columnRefs = a, this.splitStyle = null, this.$nextTick(() => {
        this.$emit("columnMove", {
          from: this.findColumn(e),
          to: this.findColumn(i),
          point: s
        });
      });
    },
    isEditing(e, i = null) {
      if (this.editMode && this.editingItem) {
        if (this.editMode == "cell" && this.editingItem.column != i)
          return !1;
        if (this.idField) {
          if (this.editingItem.row[this.idField] == e[this.idField])
            return !0;
        } else if (this.editingItem.row == e)
          return !0;
      }
      return !1;
    },
    beginEdit(e, i = null, s = null) {
      if (!this.isEditing(e, i)) {
        if (this.endEdit(), this.editingItem) {
          setTimeout(() => {
            this.editMode == "row" ? this.selectRow(this.editingItem.row) : this.editMode == "cell" && this.selectCell(this.editingItem.row, this.editingItem.column);
          });
          return;
        }
        let l = this.editMode == "row" ? Object.assign({}, e) : e[i.field];
        this.editingItem = {
          row: e,
          column: i,
          originalValue: l,
          element: s
        }, this.$emit("editBegin", this.editingItem);
      }
    },
    endEdit() {
      if (this.editingItem) {
        let e = this.editingItem.element;
        if (e && e.querySelector(".validatebox-invalid") || this.editingItem.invalid)
          return;
        this.$emit("editEnd", this.editingItem), this.editingItem = null;
      }
    },
    cancelEdit() {
      if (this.editingItem) {
        let e = this.editingItem;
        this.editingItem = null, setTimeout(() => {
          this.editMode == "cell" ? e.row[e.column.field] = e.originalValue : Object.assign(e.row, e.originalValue), this.$emit("editCancel", e);
        });
      }
    },
    navRow(e) {
      ListBase.methods.navRow.call(this, e), this.rows.indexOf(this.highlightRow) >= 0 && this.$nextTick(() => {
        let s = this.$refs.view2.$refs.body.$refs.bodyRef, l = s.querySelector(".datagrid-row-over");
        l && domHelper.scrollTo(s, l);
      });
    }
  }
}), GridColumnGroup = /* @__PURE__ */ defineComponent({
  name: "GridColumnGroup",
  props: {
    frozen: {
      type: Boolean,
      default: !1
    },
    align: {
      type: String,
      default: "left"
    },
    width: [Number, String]
  },
  data() {
    return {
      widthState: 0,
      rows: []
    };
  },
  mounted() {
    this.widthState = domHelper.toStyleValue(this.width), this.$parent.addColumnGroup(this);
  },
  beforeUnmount() {
    this.$parent.removeColumnGroup(this);
  },
  methods: {
    addRow(e) {
      this.rows.push(e);
    },
    removeRow(e) {
      let i = this.rows.indexOf(e);
      i >= 0 && this.rows.splice(i, 1);
    }
  },
  render() {
    return createVNode("div", null, [this.$slots.default()]);
  }
}), GridEmpty = {
  name: "GridEmpty",
  props: {
    grid: Object
  },
  render() {
    let e = null;
    return this.grid.$slots.empty && (e = this.grid.$slots.empty()), e ? createVNode("div", {
      class: "datagrid-empty"
    }, [e]) : null;
  }
}, TextBox = {
  name: "TextBox",
  extends: InputBase,
  computed: {
    text() {
      return this.focused ? this.textState : (this.textFormatter || this.defaultTextFormatter)(this.textState);
    }
  },
  methods: {
    setValue(e) {
      this.textState = e, InputBase.methods.setValue.call(this, e);
    },
    onInput(e) {
      this.textState = e.target.value, this.setValue(this.textState);
    }
  }
};
function _isSlot$4(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const GridBodyCell = {
  name: "GridBodyCell",
  props: {
    row: Object,
    column: Object,
    rowIndex: Number
  },
  data() {
    return {
      error: null
    };
  },
  computed: {
    grid() {
      let e = this;
      for (; e.$options.name !== "DataGrid" && e.$options.name !== "TreeGrid"; )
        e = e.$parent;
      return e;
    }
  },
  methods: {
    onKeyDown(e) {
      this.grid.editMode == "cell" && setTimeout(() => {
        e.which == 13 ? (e.stopPropagation(), this.grid.endEdit()) : e.which == 27 && (e.stopPropagation(), this.grid.cancelEdit());
      });
    },
    onValidate(e) {
      if (!this.grid.editingItem)
        return;
      const i = this.column.field;
      let s = e[i];
      s = s ? s[0] : null, this.error = s;
      let l = this.grid.editingItem;
      l.errors = l.errors || {}, Object.assign(l.errors, {
        [i]: e[i]
      });
      let r = 0;
      for (let a in l.errors)
        r += l.errors[a].length;
      l.invalid = r > 0, this.grid.$emit("editValidate", l);
    }
  },
  render() {
    let e = this.$parent.isEditable(this.row, this.column), i = null;
    if (e) {
      this.column.$slots.edit ? (i = this.column.$slots.edit({
        row: this.row,
        column: this.column,
        rowIndex: this.rowIndex,
        error: this.error
      }), i.forEach((l) => {
        l.props.name = this.column.field;
      })) : i = createVNode(TextBox, {
        class: "f-full",
        name: this.column.field,
        value: this.row[this.column.field],
        onValueChange: (l) => {
          this.row[this.column.field] = l.currentValue, this.$refs.form.validate();
        }
      }, null);
      const s = function() {
        return i;
      }();
      i = withDirectives(createVNode(resolveComponent("Form"), {
        ref: "form",
        class: "f-column",
        model: this.row,
        rules: {
          [this.column.field]: this.column.editRules
        },
        messages: {
          [this.column.field]: this.column.editMessages
        },
        onValidate: (l) => {
          this.onValidate(l);
        },
        onSubmit: (l) => l.preventDefault(),
        onKeydown: this.onKeyDown
      }, _isSlot$4(i) ? i : {
        default: () => [s]
      }), [[resolveDirective("tooltip"), Object.assign({
        closed: !this.error,
        content: this.error
      }, this.grid.tipOptions)]]);
    } else
      this.column.$slots.body ? i = this.column.$slots.body({
        row: this.row,
        column: this.column,
        rowIndex: this.rowIndex
      }) : this.column.$slots.cell ? i = this.column.$slots.cell({
        row: this.row,
        column: this.column,
        rowIndex: this.rowIndex
      }) : i = this.row[this.column.field];
    return createVNode("div", {
      class: ["datagrid-cell", {
        "datagrid-editable": e
      }],
      style: {
        textAlign: this.column.align || null
      }
    }, [i]);
  }
}, DataGridRowDetail = {
  name: "DataGridRowDetail",
  props: {
    gridBody: Object,
    row: Object,
    rowIndex: Number
  },
  computed: {
    grid() {
      return this.gridBody.view.grid;
    }
  },
  render() {
    return this.gridBody.view.viewIndex == 2 ? createVNode("div", {
      class: "datagrid-row-detail"
    }, [this.grid.$slots.detail({
      row: this.row,
      rowIndex: this.rowIndex
    })]) : "";
  }
}, DataGridRowGroup = {
  name: "DataGridRowGroup",
  props: {
    row: Object,
    left: Number,
    grid: Object
  },
  render() {
    return h("div", {
      class: "datagrid-group-title",
      style: {
        left: this.left + "px"
      }
    }, [this.grid.$slots.group ? this.grid.$slots.group({
      value: this.row.value,
      rows: this.row.rows
    }) : this.row.value]);
  }
}, DataGridTable = {
  name: "DataGridTable",
  components: {
    GridBodyCell,
    DataGridRowDetail,
    DataGridRowGroup
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    gridBody: Object
  },
  computed: {
    grid() {
      return this.gridBody.view.grid;
    }
  },
  methods: {
    showExpandIcon() {
      if (this.grid.leftColumns) {
        if (this.gridBody.view.viewIndex == 1)
          return !0;
      } else if (this.gridBody.view.viewIndex == 2)
        return !0;
      return !1;
    },
    groupTitleWidth() {
      return domHelper.outerWidth(this.$refs.groupTitleRef);
    },
    titleLeft() {
      return this.gridBody.view.viewIndex == 2 && this.grid.leftColumns && this.grid.view1 ? domHelper.outerWidth(this.grid.$refs.view1.$refs.body.$refs.bodyRef) - this.grid.expanderWidth : null;
    },
    onRowClick(e) {
      this.grid.onRowClick(e);
    },
    onRowDblClick(e) {
      this.grid.$emit("rowDblClick", e);
    },
    onRowContextMenu(e, i) {
      this.grid.$emit("rowContextMenu", {
        row: e,
        originalEvent: i
      });
    },
    onCellClick(e, i, s) {
      let l = domHelper.closest(s.currentTarget, ".datagrid-td"), r = domHelper.closest(l, ".datagrid-row");
      this.grid.onCellClick(e, i, s), (this.grid.clickToEdit || this.grid.dblclickToEdit && this.grid.editingItem) && this.doEdit(e, i, r, l);
    },
    onCellDblClick(e, i, s) {
      let l = domHelper.closest(s.currentTarget, ".datagrid-td"), r = domHelper.closest(l, ".datagrid-row");
      this.grid.$emit("cellDblClick", {
        row: e,
        column: i
      }), this.grid.dblclickToEdit && this.doEdit(e, i, r, l);
    },
    onCellContextMenu(e, i, s) {
      this.grid.$emit("cellContextMenu", {
        row: e,
        column: i,
        originalEvent: s
      });
    },
    onCellKeyDown() {
    },
    doEdit(e, i, s, l) {
      this.grid.beginEdit(e, i, s), setTimeout(() => {
        let r = l.querySelector(".textbox-text");
        r && r.focus();
      });
    },
    onGroupExpanderClick(e, i) {
      i.stopPropagation(), this.grid.toggleGroup(e);
    },
    onDetailExpanderClick(e, i) {
      i.stopPropagation(), this.grid.toggleRow(e);
    },
    getRowIndex(e, i) {
      return this.grid.groupField && (e = i._rowIndex), this.grid.getAbsoluteIndex(e);
    },
    getCss(e, i, s, l) {
      if (e) {
        let r = typeof e == "function" ? e(i, s) : e;
        return l == "class" ? typeof r == "string" ? r : null : typeof r == "object" ? r : null;
      }
      return null;
    },
    getRowClass(e) {
      return this.getCss(this.grid.rowCss, e, null, "class");
    },
    getRowStyle(e) {
      return this.getCss(this.grid.rowCss, e, null, "style");
    },
    getCellClass(e, i) {
      return this.getCss(e.cellCss, i, i[e.field], "class");
    },
    getCellStyle(e, i) {
      return this.getCss(e.cellCss, i, i[e.field], "style");
    },
    isEditable(e, i) {
      return !!(this.grid.isEditing(e, i) && i.editable);
    },
    getCellSpan(e, i, s) {
      return this.grid.cellSpan({
        row: e,
        column: i,
        rowIndex: s
      });
    },
    hasCellSpan(e, i, s) {
      const l = this.getCellSpan(e, i, s);
      return l.rowspan && l.colspan;
    },
    renderGroupRow(e) {
      return !e || !this.grid.isGroupRow(e) ? null : createVNode("tr", {
        class: "datagrid-row datagrid-group-row"
      }, [createVNode("td", {
        class: "datagrid-td-group",
        colspan: this.columns.length
      }, [createVNode("div", {
        class: "datagrid-group f-row"
      }, [this.showExpandIcon() && createVNode("span", {
        class: "datagrid-group-expander f-row f-content-center f-noshrink",
        style: {
          width: this.grid.expanderWidth + "px"
        },
        onClick: (i) => this.onGroupExpanderClick(e.value, i)
      }, [createVNode("span", {
        class: "datagrid-row-expander" + (e.collapsed ? " datagrid-row-expand" : " datagrid-row-collapse")
      }, null)]), createVNode(DataGridRowGroup, {
        grid: this.grid,
        left: -this.titleLeft(),
        row: e
      }, null)])])]);
    },
    renderDefaultRow(e, i) {
      return !e || this.grid.isGroupRow(e) ? null : createVNode("tr", {
        class: "datagrid-row " + this.getRowClass(e) + (this.grid.isHighlighted(e) ? " datagrid-row-over" : "") + (this.grid.isSelected(e) ? " datagrid-row-selected" : "") + (this.grid.striped && this.getRowIndex(i) % 2 ? " datagrid-row-alt" : ""),
        style: this.getRowStyle(e),
        onMouseenter: () => this.grid.highlightRow = e,
        onMouseleave: () => this.grid.highlightRow = null,
        onClick: (s) => this.onRowClick(e, s),
        onDblclick: (s) => this.onRowDblClick(e, s),
        onContextmenu: (s) => this.onRowContextMenu(e, s)
      }, [this.columns.map((s) => createVNode(Fragment, null, [s.expander && createVNode("td", {
        class: "datagrid-td-expander"
      }, [createVNode("div", {
        class: "datagrid-cell f-row f-content-center"
      }, [createVNode("span", {
        class: "datagrid-row-expander" + (this.grid.isRowExpanded(e) ? " datagrid-row-collapse" : " datagrid-row-expand"),
        onClick: (l) => this.onDetailExpanderClick(e, l)
      }, null)])]), !s.expander && this.hasCellSpan(e, s, i) && createVNode("td", {
        class: "datagrid-td " + this.getCellClass(s, e) + (this.grid.isSelected(e, s) ? " datagrid-row-selected" : "") + (this.grid.isHighlighted(e, s) ? " datagrid-row-over" : ""),
        style: this.getCellStyle(s, e),
        rowspan: this.getCellSpan(e, s, i).rowspan,
        colspan: this.getCellSpan(e, s, i).colspan,
        onMouseenter: () => this.grid.highlightCell = {
          row: e,
          column: s
        },
        onMouseleave: () => this.grid.highlightCell = null,
        onClick: (l) => this.onCellClick(e, s, l),
        onDblclick: (l) => this.onCellDblClick(e, s, l),
        onContextmenu: (l) => this.onCellContextMenu(e, s, l),
        onKeydown: (l) => this.onCellKeyDown(e, s, l)
      }, [createVNode(GridBodyCell, {
        row: e,
        column: s,
        rowIndex: this.getRowIndex(i, e)
      }, null)])]))]);
    },
    renderDetailRow(e, i) {
      return this.grid.$slots.detail && this.grid.isRowExpanded(e) && !this.grid.isGroupRow(e) ? createVNode("tr", null, [createVNode("td", {
        colspan: this.columns.length
      }, [createVNode(DataGridRowDetail, {
        gridBody: this.gridBody,
        row: e,
        rowIndex: this.getRowIndex(i, e)
      }, null)])]) : null;
    }
  },
  render() {
    return createVNode("table", {
      class: "datagrid-btable",
      border: "0",
      cellspacing: "0",
      cellpadding: "0"
    }, [createVNode("colgroup", null, [this.columns.map((e) => createVNode("col", {
      style: {
        width: e.widthState
      }
    }, null))]), createVNode("tbody", null, [(this.rows || []).map((e, i) => createVNode(Fragment, null, [this.renderGroupRow(e), this.renderDefaultRow(e, i), this.renderDetailRow(e, i)]))])]);
  }
}, DataGridBody = {
  name: "DataGridBody",
  extends: GridBody,
  components: {
    DataGridTable
  },
  data() {
    return {
      marginTop: 0,
      currRows: []
    };
  },
  computed: {
    view() {
      return this.$parent;
    },
    isVirtualScroll() {
      return !!(this.view.grid.virtualScroll && this.view.viewIndex == 2);
    }
  },
  watch: {
    rows() {
      this.view.grid.virtualScroll ? this.currRows = this.rows.slice(0, this.view.grid.pageSize * 2) : this.currRows = this.rows;
    }
  },
  methods: {
    scrollTop(e) {
      if (e == null)
        return this.isVirtualScroll ? this.$refs.vscroll.relativeScrollTop() : this.$refs.bodyRef.scrollTop;
      this.isVirtualScroll || (this.marginTop = -e);
    },
    scrollbarWidth() {
      return this.$refs.vscroll ? this.$refs.vscroll.scrollbarWidth() : domHelper.outerWidth(this.$refs.bodyRef) - domHelper.outerWidth(this.$refs.innerRef);
    },
    onVirtualScroll(e) {
      this.$emit("bodyScroll", e);
    },
    onVirtualPageChange(e) {
      this.view.grid.onVirtualPageChange(e);
    },
    onVirtualPageUpdate(e) {
      this.currRows = e, this.view.grid.updateFrozenView(this.$refs.vscroll ? this.$refs.vscroll.scrollTop : 0, this.currRows);
    }
  },
  render() {
    return createVNode("div", {
      ref: "bodyRef",
      class: "datagrid-body f-full" + (this.isVirtualScroll ? " datagrid-vbody f-column" : ""),
      style: "margin-top:0",
      onScroll: this.onScroll
    }, [createVNode("div", {
      ref: "innerRef",
      class: "datagrid-body-inner" + (this.isVirtualScroll ? " f-column f-full panel-noscroll" : ""),
      style: {
        marginTop: this.marginTop + "px"
      }
    }, [!this.isVirtualScroll && createVNode(DataGridTable, {
      columns: this.columns,
      rows: this.currRows,
      gridBody: this
    }, null), this.isVirtualScroll && createVNode(resolveComponent("VirtualScroll"), {
      ref: "vscroll",
      class: "f-full",
      data: this.rows,
      total: this.view.grid.total,
      pageSize: this.view.grid.pageSize,
      rowHeight: this.view.grid.rowHeight,
      lazy: this.view.grid.lazy,
      pageNumber: this.view.grid.pageNumber,
      onUpdate: this.onVirtualPageUpdate,
      onBodyScroll: this.onVirtualScroll,
      onPageChange: this.onVirtualPageChange
    }, {
      default: () => [createVNode(DataGridTable, {
        columns: this.columns,
        rows: this.currRows,
        gridBody: this
      }, null)]
    })])]);
  }
}, DataGridView = {
  name: "DataGridView",
  extends: GridView,
  components: {
    DataGridBody
  },
  computed: {
    grid() {
      return this.$parent;
    }
  },
  methods: {
    onHeaderCellClick(e) {
      e.column.sortable && (this.grid.addSort(e.column), this.grid.setData(this.grid.innerData), this.$refs.body.vscroll && this.$refs.body.vscroll.refresh(), this.grid.$emit("sortChange", this.grid.sortsState));
    }
  },
  render() {
    return createVNode("div", {
      class: this.viewCls
    }, [this.grid.showHeader && createVNode(resolveComponent("GridHeader"), {
      ref: "header",
      columnGroup: this.columnGroup,
      columns: this.columns,
      paddingWidth: this.headerPaddingWidth,
      grid: this.grid,
      onCellClick: this.onHeaderCellClick
    }, null), createVNode(DataGridBody, {
      ref: "body",
      align: "center",
      columns: this.columns,
      rows: this.rows,
      onBodyScroll: this.onBodyScroll
    }, null), this.grid.showFooter && createVNode(resolveComponent("GridFooter"), {
      ref: "footer",
      columns: this.columns,
      rows: this.footerRows,
      paddingWidth: this.headerPaddingWidth
    }, null)]);
  }
}, DataGrid = {
  name: "DataGrid",
  extends: GridBase,
  components: {
    Pagination,
    DataGridView,
    GridEmpty
  },
  props: {
    groupField: String,
    expanderWidth: {
      type: Number,
      default: 30
    },
    aggregate: Function
  },
  data() {
    return {
      groupData: [],
      expandedRows: [],
      frozenRows: [],
      splitStyle: null
    };
  },
  watch: {
    rows() {
      this.virtualScroll || (this.frozenRows = this.rows);
    }
  },
  methods: {
    setData(e) {
      e == null && (e = []), ListBase.methods.setData.call(this, e), this.frozenRows = this.virtualScroll ? [] : this.rows;
    },
    setGroupData() {
      if (this.groupField && !this.isGrouped(this.filteredData)) {
        this.groupData = this.makeGroup(this.filteredData), this.filteredData = this.makeGroupedRows();
        let e = 0;
        this.filteredData.forEach((i) => {
          this.isGroupRow(i) || (i._rowIndex = e++);
        });
      }
    },
    setPageData() {
      if (this.groupField) {
        const e = this.makeGroupedRows(), i = (d) => {
          let u = 0, c = 0;
          if (d === 0)
            return 0;
          for (let p = 0; p < e.length && u < d; p++) {
            let f = e[p];
            if (!this.isGroupRow(f))
              u++, c = p;
            else {
              let g = this.getGroup(f.value);
              g && (f.collapsed = g.collapsed);
            }
          }
          return c + 1;
        };
        let s = (this.pageNumberState - 1) * this.pageSizeState, l = s + +this.pageSizeState, r = e.slice(i(s), i(l)), a = e.filter((d) => this.isGroupRow(d));
        this.totalState = e.length - a.length;
        let n = [], o = this.totalState ? Math.ceil(this.totalState / this.pageSizeState) || 1 : 0;
        if (this.pageNumberState === o)
          for (let d = a.length - 1; d >= 0; d--) {
            let u = a[d];
            if (u.collapsed)
              n.unshift(u);
            else
              break;
          }
        this.rows = r.concat(n);
      } else
        ListBase.methods.setPageData.call(this);
    },
    updateFrozenView(e, i) {
      i && (this.frozenRows = i), this.$refs.view1 && this.$refs.view1.scrollTop(e), this.$refs.view3 && this.$refs.view3.scrollTop(e);
    },
    onBodyScroll(e) {
      this.updateFrozenView(e.relativeTop || e.top, e.items);
    },
    getRowIndex(e) {
      let i = this.$refs.view2.$refs.body, s = i.currRows.indexOf(e);
      return s == -1 ? -1 : i.$refs.vscroll ? s + i.$refs.vscroll.startIndex : this.pagination ? s + (this.pageNumberState - 1) * this.pageSizeState : s;
    },
    getAbsoluteIndex(e) {
      let i = this.$refs.view2.$refs.body;
      return i.$refs.vscroll ? e + i.$refs.vscroll.startIndex : this.pagination ? e + (this.pageNumberState - 1) * this.pageSizeState : e;
    },
    scrollTo(e) {
      let i = this.$refs.view2.$refs.body.currRows.indexOf(e);
      if (i >= 0) {
        let s = this.$refs.view2.$refs.body.$refs.bodyRef, l = s.querySelector("table>tbody>tr:nth-child(" + (i + 1) + ")");
        domHelper.scrollTo(s, l), this.updateFrozenView(this.$refs.view2.$refs.body.scrollTop(), this.rows);
      }
    },
    sortData() {
      if (!this.sortsState || !this.sortsState.length)
        return;
      let e = [];
      for (let s = 0; s < this.sortsState.length; s++)
        e.push(this.findColumn(this.sortsState[s].field));
      let i = (s, l) => s == l ? 0 : s > l ? 1 : -1;
      this.innerData.sort((s, l) => {
        let r = 0;
        for (let a = 0; a < this.sortsState.length; a++) {
          let n = this.sortsState[a];
          if (e[a] && e[a].sorter ? r = e[a].sorter(s, l) : r = i(s[n.field], l[n.field]), r = r * (n.order == "asc" ? 1 : -1), r != 0)
            return r;
        }
        return r;
      });
    },
    isGroupRow(e) {
      return !!e._groupRow;
    },
    isGrouped(e) {
      return !!(e && e.length && this.isGroupRow(e[0]));
    },
    getGroup(e, i) {
      i || (i = this.groupData);
      for (let s of i)
        if (s.value == e)
          return s;
      return null;
    },
    makeGroup(e) {
      let i = [];
      for (let s of e)
        if (!this.isGroupRow(s)) {
          let l = this.getGroup(s[this.groupField], i);
          l ? l.rows.push(s) : (l = {
            value: s[this.groupField],
            collapsed: !1,
            rows: [s]
          }, i.push(l));
        }
      return this.aggregate && i.forEach((s) => {
        const l = this.aggregate(s.rows);
        s.rows.push(l);
      }), i;
    },
    makeGroupedRows() {
      let e = [];
      for (let i of this.groupData)
        e.push({
          _groupRow: !0,
          value: i.value,
          rows: i.rows,
          collapsed: i.collapsed
        }), i.collapsed || (e = e.concat(i.rows));
      return e;
    },
    collapseGroup(e) {
      let i = this.getGroup(e);
      i && (i.collapsed = !0, this.rows = this.makeGroupedRows(), this.pagination && !this.lazy && this.setPageData(), this.$emit("groupCollapse", i));
    },
    expandGroup(e) {
      let i = this.getGroup(e);
      i && (i.collapsed = !1, this.rows = this.makeGroupedRows(), this.pagination && !this.lazy && this.setPageData(), this.$emit("groupExpand", i));
    },
    toggleGroup(e) {
      let i = this.getGroup(e);
      i && (i.collapsed ? this.expandGroup(e) : this.collapseGroup(e));
    },
    getExpandedIndex(e) {
      if (this.idField) {
        for (let i = 0; i < this.expandedRows.length; i++)
          if (this.expandedRows[i][this.idField] == e[this.idField])
            return i;
        return -1;
      } else
        return this.expandedRows.indexOf(e);
    },
    isRowExpanded(e) {
      return this.getExpandedIndex(e) != -1;
    },
    collapseRow(e) {
      let i = this.getExpandedIndex(e);
      i >= 0 && (this.expandedRows.splice(i, 1), this.$emit("rowCollapse", e));
    },
    expandRow(e) {
      this.isRowExpanded(e) || (this.expandedRows.push(e), this.$emit("rowExpand", e));
    },
    toggleRow(e) {
      this.isRowExpanded(e) ? this.collapseRow(e) : this.expandRow(e);
    },
    renderPagination(e) {
      return !this.pagination || this.pagePosition != "both" && this.pagePosition != e ? null : createVNode(Pagination, {
        class: "datagrid-pager datagrid-pager-top f-noshrink",
        total: this.totalState,
        pageSize: this.pageSizeState,
        pageNumber: this.pageNumberState,
        layout: this.pageLayout,
        pageList: this.pageList,
        links: this.pageLinks,
        loading: this.loading,
        onPageChange: this.onPageChange
      }, {
        default: () => [this.$slots.tpl && this.$slots.tpl({
          datagrid: this
        })]
      });
    }
  },
  render() {
    let e = "panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column";
    return this.border || (e += " panel-body-noborder"), createVNode("div", {
      class: "f-column panel-noscroll"
    }, [createVNode("div", {
      style: "display:none"
    }, [this.$slots.default()]), createVNode("div", {
      class: e
    }, [this.renderPagination("top"), createVNode("div", {
      ref: "viewRef",
      class: "datagrid-view f-row f-full"
    }, [(this.leftGroup || this.leftColumns) && createVNode(DataGridView, {
      ref: "view1",
      key: "view1",
      viewIndex: 1,
      columnGroup: this.leftGroup,
      columns: this.leftColumns,
      rows: this.frozenRows,
      footerRows: this.footerRows,
      style: {
        width: this.leftFrozenWidth
      }
    }, null), createVNode(DataGridView, {
      ref: "view2",
      key: "view2",
      viewIndex: 2,
      columnGroup: this.centerGroup,
      columns: this.centerColumns,
      rows: this.rows,
      footerRows: this.footerRows,
      onBodyScroll: this.onBodyScroll
    }, null), (this.rightGroup || this.rightColumns) && createVNode(DataGridView, {
      ref: "view3",
      key: "view3",
      viewIndex: 3,
      columnGroup: this.rightGroup,
      columns: this.rightColumns,
      rows: this.frozenRows,
      footerRows: this.footerRows,
      style: {
        width: this.rightFrozenWidth
      }
    }, null), this.splitStyle && createVNode("div", {
      class: "datagrid-split-proxy",
      style: this.splitStyle
    }, null)]), this.renderPagination("bottom")]), this.emptyMsg && !this.rows.length && !this.loading && createVNode("div", {
      class: "datagrid-empty"
    }, [this.emptyMsg]), this.loading && createVNode("div", {
      class: "datagrid-loading f-row"
    }, [createVNode("div", {
      class: "datagrid-mask"
    }, null), createVNode("div", {
      class: "datagrid-mask-msg"
    }, [this.loadMsg])]), !this.rows.length && !this.loading && createVNode(GridEmpty, {
      grid: this
    }, null)]);
  }
}, SpinnerBase = {
  name: "SpinnerBase",
  extends: InputBase,
  props: {
    reversed: {
      type: Boolean,
      default: !1
    },
    spinners: {
      type: Boolean,
      default: !0
    },
    spinAlign: {
      type: String,
      default: "right"
    }
  },
  methods: {
    onClickUp() {
      this.disabled || this.readonly || (this.spinAlign == "left" || this.spinAlign == "right" ? this.doSpinUp() : this.reversed ? this.doSpinDown() : this.doSpinUp());
    },
    onClickDown() {
      this.disabled || this.readonly || (this.spinAlign == "left" || this.spinAlign == "right" ? this.doSpinDown() : this.reversed ? this.doSpinUp() : this.doSpinDown());
    },
    doSpinUp() {
    },
    doSpinDown() {
    },
    renderHorizontal() {
      let e = "spinner-button", i = "spinner-button";
      return this.reversed ? (e += " spinner-button-up", i += " spinner-button-down") : (e += " spinner-button-down", i += " spinner-button-up"), createVNode(Fragment, null, [createVNode("span", {
        class: "textbox-addon spinner-arrow spinner-button-left f-inline-row f-noshrink f-order1",
        onClick: this.onClickDown
      }, [createVNode("span", {
        class: e
      }, null)]), createVNode("span", {
        class: "textbox-addon spinner-arrow spinner-button-right f-inline-row f-noshrink f-order5",
        onClick: this.onClickUp
      }, [createVNode("span", {
        class: i
      }, null)])]);
    },
    renderVertical() {
      let e = "spinner-button", i = "spinner-button";
      return this.reversed ? (e += " spinner-button-up", i += " spinner-button-down") : (e += " spinner-button-down", i += " spinner-button-up"), createVNode(Fragment, null, [createVNode("span", {
        class: "textbox-addon spinner-arrow spinner-button-bottom f-noshrink",
        onClick: this.onClickDown
      }, [createVNode("span", {
        class: e
      }, null)]), createVNode("span", {
        class: "textbox-addon spinner-arrow spinner-button-top f-noshrink",
        onClick: this.onClickUp
      }, [createVNode("span", {
        class: i
      }, null)])]);
    },
    renderDefault() {
      let e = "textbox-addon spinner-button-updown f-column f-noshrink";
      return this.spinAlign == "left" ? e += " f-order1" : this.spinAlign == "right" && (e += " f-order5"), createVNode(Fragment, null, [createVNode("span", {
        class: e
      }, [createVNode("span", {
        class: "spinner-arrow spinner-button-top f-full",
        onClick: this.onClickUp
      }, [createVNode("span", {
        class: "spinner-arrow-up"
      }, null)]), createVNode("span", {
        class: "spinner-arrow spinner-button-bottom f-full",
        onClick: this.onClickDown
      }, [createVNode("span", {
        class: "spinner-arrow-down"
      }, null)])])]);
    },
    renderOthers() {
      return this.spinners ? this.spinAlign === "horizontal" ? this.renderHorizontal() : this.spinAlign === "vertical" ? this.renderVertical() : this.renderDefault() : null;
    }
  }
}, NumberBox = {
  name: "NumberBox",
  extends: SpinnerBase,
  props: {
    value: Number,
    min: Number,
    max: Number,
    increment: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    },
    decimalSeparator: {
      type: String,
      default: "."
    },
    groupSeparator: {
      type: String,
      default: ""
    },
    prefix: {
      type: String,
      default: ""
    },
    suffix: {
      type: String,
      default: ""
    }
  },
  created() {
    this.setValue(this.parser.call(this, this.valueState));
  },
  mounted() {
    domHelper.bind(this.$refs.inputRef, "keypress", this.onKeyPress), domHelper.bind(this.$refs.inputRef, "blur", this.onBlur);
  },
  beforeUnmount() {
    domHelper.unbind(this.$refs.inputRef);
  },
  methods: {
    defaultTextFormatter(e) {
      return this.formatter.call(this, e);
    },
    setValue(e) {
      e = this.parser(e), this.textState = this.formatter(e), InputBase.methods.setValue.call(this, e);
    },
    onKeyPress(e) {
      if (this.focused)
        return e.keyCode == 13 && this.onBlur(), this.filter.call(this, e);
    },
    onBlur() {
      let e = this.parser(this.textState);
      this.setValue(e);
    },
    filter(e) {
      var i = this.text;
      if (e.metaKey || e.ctrlKey || ["46", "8", "13", "0"].indexOf(String(e.which)) !== -1)
        return !0;
      let s = String.fromCharCode(e.which);
      return s ? s == "-" || s == this.decimalSeparator ? i.indexOf(s) == -1 : s == this.groupSeparator ? !0 : "0123456789".indexOf(s) >= 0 : !0;
    },
    formatter(e) {
      if (e == null)
        return null;
      e = parseFloat(e + "");
      let i = this.precision != -1 ? e.toFixed(this.precision) : String(e), s = i, l = "", r = i.indexOf(".");
      if (r >= 0 && (s = i.substring(0, r), l = i.substring(r + 1, i.length)), this.groupSeparator) {
        let a = /(\d+)(\d{3})/;
        for (; a.test(s); )
          s = s.replace(a, "$1" + this.groupSeparator + "$2");
      }
      return l ? this.prefix + s + this.decimalSeparator + l + this.suffix : this.prefix + s + this.suffix;
    },
    parser(e) {
      if (e == null)
        return null;
      e = (e + "").trim(), this.prefix && (e = e.replace(new RegExp("\\" + this.prefix, "g"), "")), this.suffix && (e = e.replace(new RegExp("\\" + this.suffix, "g"), "")), this.groupSeparator && (e = e.replace(new RegExp("\\" + this.groupSeparator, "g"), "")), this.decimalSeparator && (e = e.replace(new RegExp("\\" + this.decimalSeparator, "g"), ".")), e = e.replace(/\s/g, "");
      let i = parseFloat(e);
      return isNaN(i) ? null : (this.precision != -1 && (i = parseFloat(i.toFixed(this.precision))), this.min != null && this.min > i && (i = this.min), this.max != null && this.max < i && (i = this.max), i);
    },
    doSpinUp() {
      let e = (this.valueState || 0) + this.increment;
      this.setValue(this.parser(String(e)));
    },
    doSpinDown() {
      let e = (this.valueState || 0) - this.increment;
      this.setValue(this.parser(String(e)));
    }
  }
}, SwitchButton = {
  name: "SwitchButton",
  extends: FieldBase,
  components: {
    FieldBase
  },
  props: {
    value: {
      type: Boolean,
      default: !1
    },
    modelValue: {
      type: Boolean,
      default: !1
    },
    onText: {
      type: String,
      default: "ON"
    },
    offText: {
      type: String,
      default: "OFF"
    },
    handleText: String,
    disabled: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    inputId: String
  },
  computed: {
    buttonClasses() {
      return ["switchbutton f-inline-row", {
        "switchbutton-readonly": this.readonly,
        "switchbutton-disabled": this.disabled,
        "switchbutton-checked": this.valueState
      }];
    }
  },
  data() {
    return {
      valueState: this.modelValue
    };
  },
  watch: {
    value() {
      this.value !== this.valueState && (this.valueState = this.value);
    },
    modelValue() {
      this.modelValue !== this.valueState && (this.valueState = this.modelValue);
    }
  },
  methods: {
    onClick(e) {
      e.stopPropagation(), !(this.disabled || this.readonly) && (this.valueState = !this.valueState, this.$emit("update:modelValue", this.valueState));
    }
  },
  render() {
    return createVNode("span", {
      class: this.buttonClasses,
      onClick: this.onClick
    }, [createVNode("span", {
      class: "switchbutton-inner"
    }, [createVNode("span", {
      class: "switchbutton-on"
    }, [createVNode("span", {
      class: "f-row f-content-center"
    }, [this.onText])]), createVNode("span", {
      class: "switchbutton-handle"
    }, [createVNode("span", {
      class: "f-row f-content-center"
    }, [this.handleText])]), createVNode("span", {
      class: "switchbutton-off"
    }, [createVNode("span", {
      class: "f-row f-content-center"
    }, [this.offText])]), createVNode("input", {
      class: "switchbutton-value",
      type: "checkbox",
      id: this.inputId
    }, null)])]);
  }
}, CheckBox = {
  name: "CheckBox",
  extends: FieldBase,
  components: {
    FieldBase
  },
  props: {
    value: String,
    name: String,
    disabled: {
      type: Boolean,
      default: !1
    },
    inputId: String,
    multiple: {
      type: Boolean,
      default: !1
    },
    modelValue: [Boolean, Array]
  },
  model: {
    prop: "modelValue",
    event: "modelChange"
  },
  data() {
    return {
      checked: !1,
      values: []
    };
  },
  watch: {
    modelValue() {
      let e = this.checked;
      this.initChecked(), e != this.checked && this.$emit("checkedChange", this.checked);
    }
  },
  mounted() {
    this.initChecked();
  },
  computed: {
    checkClasses() {
      return ["f-full", {
        "checkbox-disabled": this.disabled,
        "checkbox-checked": this.checked
      }];
    }
  },
  methods: {
    initChecked() {
      this.multiple ? (this.modelValue == null ? this.values = [] : this.values = this.modelValue instanceof Array ? this.modelValue : [this.modelValue], this.setChecked(this.values.indexOf(this.value) != -1)) : this.setChecked(this.modelValue);
    },
    setChecked(e) {
      this.$refs.inputRef.checked = e, this.checked = e;
    },
    isChecked() {
      return this.$refs.inputRef ? this.$refs.inputRef.checked : !1;
    },
    onClickButton(e) {
      e.preventDefault(), this.disabled || (this.setChecked(!this.isChecked()), this.updateValues());
    },
    onChange() {
      this.updateValues();
    },
    updateValues() {
      this.checked = this.isChecked(), this.multiple ? (this.checked ? this.values.push(this.value) : this.values = this.values.filter((e) => e != this.value), this.$emit("update:modelValue", this.values)) : this.$emit("update:modelValue", this.checked), this.$emit("checkedChange", this.checked);
    }
  },
  render() {
    return createVNode("span", {
      class: ["f-inline-row checkbox", {
        "checkbox-invalid": this.invalidState
      }]
    }, [createVNode("span", {
      class: this.checkClasses,
      onClick: this.onClickButton
    }, [this.checked && createVNode("svg", {
      class: "checkbox-inner",
      "xml:space": "preserve",
      focusable: "false",
      version: "1.1",
      viewBox: "0 0 24 24"
    }, [createVNode("path", {
      d: "M4.1,12.7 9,17.6 20.3,6.3",
      fill: "none",
      stroke: "white"
    }, null)])]), createVNode("div", {
      class: "checkbox-value"
    }, [createVNode("input", {
      ref: "inputRef",
      id: this.inputId,
      type: "checkbox",
      name: this.name,
      disabled: this.disabled,
      onChange: this.onChange
    }, null)])]);
  }
}, RadioButton = {
  name: "RadioButton",
  extends: FieldBase,
  components: {
    FieldBase
  },
  props: {
    value: String,
    name: String,
    inputId: String,
    disabled: {
      type: Boolean,
      default: !1
    },
    modelValue: String
  },
  model: {
    prop: "modelValue",
    event: "modelChange"
  },
  data() {
    return {
      checked: !1
    };
  },
  watch: {
    modelValue() {
      this.initValue();
    }
  },
  computed: {
    radioClasses() {
      return ["f-full", {
        "radiobutton-disabled": this.disabled,
        "radiobutton-checked": this.checked
      }];
    }
  },
  mounted() {
    this.initValue();
  },
  methods: {
    initValue() {
      let e = this.value == this.modelValue;
      this.setChecked(e);
    },
    onClickButton() {
      this.select();
    },
    onChange() {
      this.select();
    },
    isChecked() {
      return this.$refs.inputRef ? this.$refs.inputRef.checked : !1;
    },
    setChecked(e) {
      this.$refs.inputRef.checked = e, this.checked = e;
    },
    select() {
      this.disabled || (this.setChecked(!0), this.$emit("update:modelValue", this.value));
    }
  },
  render() {
    return createVNode("span", {
      class: ["f-inline-row radiobutton", {
        "radiobutton-invalid": this.invalidState
      }]
    }, [createVNode("span", {
      class: this.radioClasses,
      onClick: this.onClickButton
    }, [this.checked && createVNode("span", {
      class: "radiobutton-inner"
    }, null)]), createVNode("div", {
      class: "radiobutton-value"
    }, [createVNode("input", {
      ref: "inputRef",
      id: this.inputId,
      type: "radio",
      name: this.name,
      disabled: this.disabled,
      onChange: this.onChange
    }, null)])]);
  }
}, TreeNodeTitle = {
  name: "TreeNodeTitle",
  props: {
    tree: Object,
    node: Object
  },
  render() {
    let e = this.node.text;
    return this.tree.$slots.default && (e = this.tree.$slots.default({
      node: this.node
    })), createVNode("span", {
      class: "tree-title"
    }, [e]);
  }
}, Form = {
  name: "Form",
  props: {
    model: Object,
    rules: Object,
    messages: Object,
    labelPosition: {
      type: String,
      default: "before"
    },
    labelAlign: {
      type: String,
      default: "left"
    },
    labelWidth: {
      type: [Number, String],
      default: 80
    },
    floatingLabel: {
      type: Boolean,
      default: !1
    },
    errorType: {
      type: String,
      default: "label"
    },
    tooltipPosition: {
      type: String,
      default: "right"
    }
  },
  data() {
    return {
      fields: [],
      errors: {}
    };
  },
  computed: {
    valid() {
      let e = 0;
      for (let i in this.errors)
        e += this.errors[i].length;
      return e == 0;
    },
    invalid() {
      return !this.valid;
    }
  },
  methods: {
    fieldAdd(e) {
      this.fields.push(e), e.validateOnCreate && this.validateField(e);
    },
    fieldRemove(e) {
      let i = this.fields.indexOf(e);
      i >= 0 && this.fields.splice(i, 1);
    },
    fieldFocus() {
    },
    fieldBlur(e) {
      e.validateOnBlur && this.validateField(e);
    },
    fieldChange(e) {
      e.validateOnChange && this.validateField(e);
    },
    validate(e) {
      let i = this.fields.length, s = 0;
      this.fields.forEach((l) => {
        this.validateField(l, () => {
          s++, s >= i && e && e(this.getErrors());
        });
      });
    },
    validateField(field, callback) {
      let name = field.fieldName, vtotal = 1, vcount = 0, validity = () => {
        let e = this.errors[name].length == 0;
        this.fields.filter((i) => i.fieldName == name).forEach((i) => i.setValid(e)), vcount++, vcount >= vtotal && (this.errors = Object.assign({}, this.errors), this.$emit("validate", this.errors), callback && callback());
      }, setMessage = (e, i) => {
        i = i || [];
        for (var s = 0; s < i.length; s++)
          e = e.replace(new RegExp("\\{" + s + "\\}", "g"), i[s]);
        this.errors[name].push(e);
      }, doValidate = (vtype, vparam) => {
        if (!vtype) {
          validity();
          return;
        }
        let value = this.model[name];
        if (vtype != "required" && window.ValidateRules.required.validator(value) == !1) {
          validity();
          return;
        }
        if (vparam && vparam.validator) {
          let e = vparam.validator(value);
          e instanceof Promise ? e.then((i) => {
            i || setMessage(vparam.message), validity();
          }) : (e || setMessage(vparam.message), validity());
          return;
        }
        let parts = /([a-zA-Z_]+)(.*)/.exec(vtype);
        vtype = parts[1];
        let paramStr = parts[2] || "", rule = window.ValidateRules[vtype];
        if (rule) {
          let message = window.Locale.t("Rules." + vtype, rule.message);
          this.messages && this.messages[name] && (message = this.messages[name][vtype] || message);
          let param = vparam || eval(paramStr) || [], result = rule.validator(value, param);
          result instanceof Promise ? result.then((e) => {
            e || setMessage(message, param), validity();
          }) : (result || setMessage(message, param), validity());
        } else
          validity();
      };
      if (!this.rules)
        return;
      this.errors[name] = [];
      let rule = this.rules[name];
      if (!rule) {
        doValidate();
        return;
      }
      if (rule instanceof Array) {
        vtotal = rule.length;
        for (let e = 0; e < rule.length; e++)
          doValidate(rule[e]);
      } else if (typeof rule == "string")
        vtotal = 1, doValidate(rule);
      else {
        vtotal = Object.keys(rule).length;
        for (let e in rule) {
          let i = rule[e];
          doValidate(e, i);
        }
      }
    },
    hasError(e) {
      return this.getError(e) != null;
    },
    getError(e) {
      let i = this.errors[e];
      return i ? i[0] : null;
    },
    getErrors(e) {
      if (e) {
        let i = this.errors[e];
        return i.length ? i : null;
      } else {
        if (this.valid)
          return null;
        {
          let i = {};
          for (let s in this.errors)
            this.errors[s].length && (i[s] = this.errors[s]);
          return i;
        }
      }
    },
    getValue(e) {
      return this.model[e];
    },
    isFocused(e) {
      const i = this.fields.filter((s) => s.fieldName == e);
      return i.length && i[0].focused || !1;
    }
  },
  render() {
    return createVNode("form", null, [this.$slots.default()]);
  }
}, TooltipContent = {
  name: "TooltipContent",
  props: {
    tooltipIdIndex: Number,
    target: HTMLElement,
    content: [String, Object],
    component: [String, Object, Function],
    propsData: Object,
    store: Object,
    tooltipCls: String,
    tooltipStyle: Object,
    zIndex: {
      type: Number,
      default: 11e6
    },
    position: {
      type: String,
      default: "bottom"
    },
    trackMouse: {
      type: Boolean,
      default: !1
    },
    trackMouseX: {
      type: Number,
      default: 0
    },
    trackMouseY: {
      type: Number,
      default: 0
    },
    deltaX: {
      type: Number,
      default: 0
    },
    deltaY: {
      type: Number,
      default: 0
    },
    valign: {
      type: String,
      default: "middle"
    },
    showDelay: {
      type: Number,
      default: 200
    },
    hideDelay: {
      type: Number,
      default: 200
    },
    closed: {
      type: Boolean,
      default: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    tooltipShow: Function,
    tooltipHide: Function
  },
  data() {
    return {
      closedState: this.closed,
      contentState: this.content,
      left: 0,
      top: 0,
      targetWidth: 0,
      targetHeight: 0,
      tipWidth: 0,
      tipHeight: 0,
      showTimer: null,
      hideTimer: null
    };
  },
  watch: {
    closed() {
      this.setClosed(this.closed);
    },
    content() {
      this.contentState = this.content, this.$refs.tooltipRef && this.$nextTick(() => {
        this.setClosed(this.closedState);
      });
    }
  },
  computed: {
    tooltipClasses() {
      return ["tooltip", "tooltip-" + this.position, this.tooltipCls];
    },
    tooltipStyles() {
      return [this.tooltipStyle, {
        left: this.left + "px",
        top: this.top + "px",
        display: "block",
        zIndex: this.zIndex
      }];
    }
  },
  mounted() {
    window.EventHub.$on("tooltipUpdate", (e) => {
      this.tooltipIdIndex == e.tooltipIdIndex && (this.contentState = e.content, this.setClosed(this.closedState));
    }), window.EventHub.$on("tooltipShow", (e) => {
      this.tooltipIdIndex == e.tooltipIdIndex && this.show();
    }), window.EventHub.$on("tooltipHide", (e) => {
      this.tooltipIdIndex == e.tooltipIdIndex && this.hide();
    });
  },
  methods: {
    onMouseEnter() {
      this.show();
    },
    onMouseLeave() {
      this.hide();
    },
    getPosition(e = "bottom") {
      e = e || "bottom";
      let i = 0, s = 0, l = domHelper.offset(this.target), r = this.targetWidth, a = this.targetHeight, n = this.tipWidth, o = this.tipHeight;
      switch (this.trackMouse ? (i = this.trackMouseX + this.deltaX, s = this.trackMouseY + this.deltaY, r = a = 0) : (i = l.left + this.deltaX, s = l.top + this.deltaY), e) {
        case "right":
          i += r + 12 + (this.trackMouse ? 12 : 0), this.valign == "middle" && (s -= (o - a) / 2);
          break;
        case "left":
          i -= n + 12 + (this.trackMouse ? 12 : 0), this.valign == "middle" && (s -= (o - a) / 2);
          break;
        case "top":
          i -= (n - r) / 2, s -= o + 12 + (this.trackMouse ? 12 : 0);
          break;
        case "bottom":
          i -= (n - r) / 2, s += a + 12 + (this.trackMouse ? 12 : 0);
          break;
      }
      return {
        left: i,
        top: s
      };
    },
    reposition() {
      if (!this.$refs.tooltipRef)
        return;
      let e = domHelper.getViewport(), i = this.getPosition(this.position);
      if (this.position == "top" && i.top < domHelper.getScrollTop() ? i = this.getPosition("bottom") : this.position == "bottom" && i.top + this.tipHeight > e.height + domHelper.getScrollTop() && (i = this.getPosition("top")), i.left < domHelper.getScrollLeft())
        if (this.position == "left")
          i = this.getPosition("right");
        else {
          let a = this.tipWidth / 2 + i.left - domHelper.getScrollLeft();
          this.$refs.arrowOuterRef.style.left = a + "px", this.$refs.arrowInnerRef.style.left = a + "px", i.left = domHelper.getScrollLeft();
        }
      else if (i.left + this.tipWidth > e.width + domHelper.getScrollLeft())
        if (this.position == "right")
          i = this.getPosition("left");
        else {
          let a = i.left;
          i.left = e.width + domHelper.getScrollLeft() - this.tipWidth, a = this.tipWidth / 2 - (i.left - a), this.$refs.arrowOuterRef.style.left = a + "px", this.$refs.arrowInnerRef.style.left = a + "px";
        }
      this.left = i.left, this.top = i.top;
      let s = "border-" + this.position + "-color", l = this.$refs.tooltipRef.style.borderColor, r = this.$refs.tooltipRef.style.backgroundColor;
      this.$refs.arrowOuterRef.style[s] = l, this.$refs.arrowInnerRef.style[s] = r;
    },
    setClosed(e) {
      this.closedState = e, this.closedState ? this.tooltipHide && this.tooltipHide() : this.$nextTick(() => {
        this.targetWidth = domHelper.outerWidth(this.target), this.targetHeight = domHelper.outerHeight(this.target), this.tipWidth = domHelper.outerWidth(this.$refs.tooltipRef), this.tipHeight = domHelper.outerHeight(this.$refs.tooltipRef), this.reposition(), this.tooltipShow && this.tooltipShow();
      });
    },
    show() {
      this.disabled || !this.contentState && !this.component || (this.clearTimeouts(), this.showTimer = setTimeout(() => {
        this.setClosed(!1);
      }, this.showDelay));
    },
    hide() {
      this.clearTimeouts(), this.hideTimer = setTimeout(() => {
        this.setClosed(!0);
      }, this.hideDelay);
    },
    clearTimeouts() {
      clearTimeout(this.showTimer), clearTimeout(this.hideTimer);
    }
  },
  render() {
    return this.closedState || !this.contentState ? null : createVNode("div", {
      ref: "tooltipRef",
      tabindex: "-1",
      class: this.tooltipClasses,
      style: this.tooltipStyles,
      onMouseenter: this.onMouseEnter,
      onMouseleave: this.onMouseLeave
    }, [createVNode("div", {
      class: "tooltip-content"
    }, [this.contentState]), createVNode("div", {
      ref: "arrowOuterRef",
      class: "tooltip-arrow-outer"
    }, null), createVNode("div", {
      ref: "arrowInnerRef",
      class: "tooltip-arrow"
    }, null)]);
  }
};
let getOptions = (e, i) => {
  let s = typeof i == "object" ? Object.assign({}, i) : {
    content: String(i)
  };
  return Object.assign({
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    target: e
  }, s);
}, bindEvents = (e, i = "", s = "") => {
  let l = (r, a, n) => {
    e[r] ? e[r] != a && (e[r].split(" ").forEach((o) => {
      domHelper.unbind(e, o, n);
    }), e[r] = a, e[r].split(" ").forEach((o) => {
      domHelper.bind(e, o, n);
    })) : (e[r] = a, e[r].split(" ").forEach((o) => {
      domHelper.bind(e, o, n);
    }));
  };
  l("_showEvent", i, e._activeHandler), l("_hideEvent", s, e._deactiveHandler);
};
window.TooltipIdIndex = window.TooltipIdIndex || 1;
const Tooltip = {
  name: "Tooltip",
  mounted(e, i) {
    e._activeHandler = function() {
      if (e._tip)
        Object.assign(e._tip.props, e._opts), window.EventHub.$emit("tooltipUpdate", e._tip.props);
      else {
        const s = createVNode(TooltipContent, {
          ...e._opts,
          store: e._opts.store,
          tooltipIdIndex: window.TooltipIdIndex++
        });
        e._tip = s, render(s, document.querySelector("body"));
      }
      window.EventHub.$emit("tooltipShow", e._tip.props);
    }, e._deactiveHandler = function() {
      e._tip && (window.EventHub.$emit("tooltipHide", e._tip.props), e._tip = null);
    }, e._opts = getOptions(e, i.value), bindEvents(e, e._opts.showEvent, e._opts.hideEvent);
  },
  updated(e, i) {
    e._opts = getOptions(e, i.value), e._tip && (Object.assign(e._tip.props, e._opts), window.EventHub.$emit("tooltipUpdate", e._tip.props)), bindEvents(e, e._opts.showEvent, e._opts.hideEvent);
  },
  beforeUnmount(e) {
    e._tip && (e._tip = null), bindEvents(e, "", "");
  }
};
function _isSlot$3(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const TreeNodeEditor = {
  name: "TreeNodeEditor",
  components: {
    Form
  },
  directives: {
    Tooltip
  },
  props: {
    tree: Object,
    node: Object
  },
  data() {
    return {
      width: 50,
      error: null
    };
  },
  mounted() {
    this.autoSizeInput();
    const e = this.getInput();
    domHelper.bind(e, "keydown", this.onKeyDown), this.$refs.form.validate(), this.$nextTick(() => e.focus());
  },
  beforeUnmount() {
    domHelper.unbind(this.getInput(), "keydown", this.onKeyDown);
  },
  methods: {
    onKeyDown(e) {
      e.keyCode == 13 ? this.tree.endEdit() : e.keyCode == 27 && this.tree.cancelEdit(), setTimeout(() => this.autoSizeInput());
    },
    getInput() {
      return this.$el.querySelector(".textbox-text");
    },
    autoSizeInput() {
      const e = this.getInput();
      if (!e)
        return;
      let i = getComputedStyle(e), s = document.createElement("span");
      Object.assign(s.style, {
        position: "absolute",
        top: -9999,
        left: -9999,
        width: "auto",
        fontFamily: i.fontFamily,
        fontSize: i.fontSize,
        fontWeight: i.fontWeight,
        whiteSpace: "nowrap"
      }), s.innerHTML = e.value, document.body.appendChild(s);
      let r = ((a) => {
        a = a || "";
        var n = a.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return s.innerHTML = n, domHelper.outerWidth(s);
      })(e.value);
      document.body.removeChild(s), this.width = r + 50;
    }
  },
  render() {
    let e = null;
    return this.tree.$slots.editor ? (e = this.tree.$slots.editor(this.node), e[0].data.class = "f-full") : e = createVNode(resolveComponent("TextBox"), {
      class: "f-full",
      name: "text",
      value: this.node.text,
      onValueChange: (i) => {
        this.node.text = i.currentValue, this.$refs.form.validate();
      }
    }, null), withDirectives(createVNode(Form, {
      ref: "form",
      class: "tree-title tree-editing f-inline-row",
      style: {
        width: this.width + "px"
      },
      model: this.node,
      rules: {
        text: this.tree.editRules
      },
      onValidate: (i) => {
        i && i.text.length ? (this.tree.editingItem.invalid = !0, this.error = i.text[0]) : (this.tree.editingItem.invalid = !1, this.error = null);
      },
      onSubmit: (i) => i.preventDefault()
    }, _isSlot$3(e) ? e : {
      default: () => [e]
    }), [[resolveDirective("tooltip"), Object.assign({
      closed: !this.error,
      content: this.error
    }, this.tree.tipOptions)]]);
  }
};
class DraggableClass {
  constructor(i, s = null) {
    this.updateOptions(s), this.$el = i;
  }
  updateOptions(i) {
    let s = Object.assign({
      scope: null,
      handle: null,
      disabled: !1,
      revert: !1,
      deltaX: null,
      deltaY: null,
      edge: 0,
      delay: 100,
      axis: null,
      // v or h
      cursor: "move",
      proxy: null,
      dragStart: () => {
      },
      drag: () => {
      },
      dragEnd: () => {
      }
    }, this, i || {});
    Object.assign(this, s);
  }
  bindEvents() {
    this.$el._downHandler = (i) => {
      this.onMouseDown(i);
    }, this.$el._moveHandler = (i) => {
      this.onMouseMove(i);
    }, this.$el._leaveHandler = (i) => {
      this.onMouseLeave(i);
    }, domHelper.bind(this.$el, "mousedown", this.$el._downHandler), domHelper.bind(this.$el, "touchstart", this.$el._downHandler), domHelper.bind(this.$el, "mousemove", this.$el._moveHandler), domHelper.bind(this.$el, "touchmove", this.$el._moveHandler), domHelper.bind(this.$el, "mouseleave", this.$el._leaveHandler), domHelper.bind(this.$el, "touchcancel", this.$el._leaveHandler), domHelper.bind(this.$el, "touchend", this.$el._leaveHandler);
  }
  unbindEvents() {
    domHelper.unbind(this.$el, "mousedown", this.$el._downHandler), domHelper.unbind(this.$el, "touchstart", this.$el._downHandler), domHelper.unbind(this.$el, "mousemove", this.$el._moveHandler), domHelper.unbind(this.$el, "touchmove", this.$el._moveHandler), domHelper.unbind(this.$el, "mouseleave", this.$el._leaveHandler), domHelper.unbind(this.$el, "touchcancel", this.$el._leaveHandler), domHelper.unbind(this.$el, "touchend", this.$el._leaveHandler);
  }
  parseEvent(i) {
    return new MyEvent(i);
  }
  getHandle() {
    return this.handle ? this.handle instanceof Element ? this.handle : this.$el.querySelector(this.handle) : this.$el;
  }
  checkArea(i) {
    let s = this.getHandle(), l = domHelper.offset(s), r = domHelper.outerWidth(s), a = domHelper.outerHeight(s), n = i.pageY - l.top, o = l.left + r - i.pageX, d = l.top + a - i.pageY, u = i.pageX - l.left;
    return Math.min(n, o, d, u) > this.edge;
  }
  doMove(i) {
    i = this.parseEvent(i), this.state.pageX = i.pageX, this.state.pageY = i.pageY;
    let s = i.pageX, l = i.pageY, r = this.state.startX, a = this.state.startY;
    return Math.sqrt((s - r) * (s - r) + (l - a) * (l - a)) > 3 && !this.isDragging ? (this.isDragging = !0, this.proxy ? this.proxy.closed = !1 : this.$el.style.position = "absolute", this.doDrag(i), this.applyDrag(), this.dragStart(this.state), !1) : (this.isDragging && (this.doDrag(i), this.applyDrag(), this.checkDrag(i), this.drag(this.state)), !1);
  }
  doUp(i) {
    if (!this.isDragging) {
      this.clearDragging();
      return;
    }
    return i = this.parseEvent(i), this.doMove(i), this.revert ? this.checkDrop(i) ? this.restorePosition() : this.revertPosition() : (this.$el.style.position = "absolute", this.$el.style.left = this.state.left + "px", this.$el.style.top = this.state.top + "px", this.checkDrop(i)), this.clearDragging(), this.dragEnd(this.state), !1;
  }
  doDrag(i) {
    let s = this.state, l = 0, r = 0;
    this.proxy ? (this.proxy.reverting = !1, this.deltaX != null ? l = i.pageX + this.deltaX : l = i.pageX - s.offsetWidth, this.deltaY != null ? r = i.pageY + this.deltaY : r = i.pageY - s.offsetHeight) : (l = s.startLeft + i.pageX - s.startX, r = s.startTop + i.pageY - s.startY), this.$el.parentNode != document.body && (l += this.$el.parentNode.scrollLeft, r += this.$el.parentNode.scrollTop), this.axis == "h" ? s.left = l : (this.axis == "v" || (s.left = l), s.top = r);
  }
  applyDrag() {
    this.proxy ? (this.proxy.left = this.state.left, this.proxy.top = this.state.top) : (this.$el.style.left = this.state.left + "px", this.$el.style.top = this.state.top + "px"), document.body.style.cursor = this.cursor;
  }
  clearDragging() {
    this.unbindDocumentEvents(), this.isDragging = !1, setTimeout(() => {
      document.body.style.cursor = "";
    });
  }
  findDroppable(i) {
    for (let s = DraggableClass.droppables.length - 1; s >= 0; s--) {
      let l = DraggableClass.droppables[s];
      if (l.disabled || l.$el == this.$el)
        continue;
      let r = domHelper.offset(l.$el), a = domHelper.outerWidth(l.$el), n = domHelper.outerHeight(l.$el);
      if (i.pageX > r.left && i.pageX < r.left + a && i.pageY > r.top && i.pageY < r.top + n && l.checkDrop(this.scope))
        return l;
    }
    return null;
  }
  checkDrag(i) {
    let s = this.findDroppable(i);
    this.currDroppable && this.currDroppable != s && this.entered && (this.entered = !1, this.currDroppable.dragLeave(this.scope), this.currDroppable = null), s && (this.currDroppable = s, this.entered || (this.entered = !0, s.dragEnter(this.scope)), s.dragOver(this.scope));
  }
  checkDrop(i) {
    let s = this.findDroppable(i);
    return s ? (this.revert && this.restorePosition(), this.removeProxy(), this.entered = !1, s.drop(this.scope), !0) : (this.revert || this.removeProxy(), !1);
  }
  removeProxy() {
    this.proxy && (this.proxy.reverting = !1, this.proxy.closed = !0);
  }
  revertPosition() {
    this.proxy ? this.state.startX != this.state.left || this.state.startY != this.state.top ? (this.proxy.reverting = !0, this.proxy.left = this.state.startX - this.state.offsetWidth, this.proxy.top = this.state.startY - this.state.offsetHeight) : this.proxy.closed = !0 : (this.$el._transitionendHandler = () => {
      domHelper.removeClass(this.$el, "draggable-reverting"), this.$el.style.position = this.state.startPosition, domHelper.unbind(this.$el, "transitionend");
    }, domHelper.bind(this.$el, "transitionend", this.$el._transitionendHandler), domHelper.addClass(this.$el, "draggable-reverting"), this.$el.style.left = this.state.startLeft + "px", this.$el.style.top = this.state.startTop + "px");
  }
  restorePosition() {
    this.$el.position = this.state.startPosition, this.$el.style.left = this.state.startLeft + "px", this.$el.style.top = this.state.startTop + "px";
  }
  onMouseDown(i) {
    if (this.disabled || (i = this.parseEvent(i), this.checkArea(i) == !1))
      return;
    i.preventDefault();
    let s = this.getHandle(), l = getComputedStyle(this.$el), r = domHelper.position(this.$el), a = domHelper.offset(this.$el);
    this.state = {
      target: this,
      startPosition: l.position,
      startLeft: r.left,
      startTop: r.top,
      left: r.left,
      top: r.top,
      startX: i.pageX,
      startY: i.pageY,
      width: domHelper.outerWidth(this.$el),
      height: domHelper.outerHeight(this.$el),
      offsetWidth: i.pageX - a.left,
      offsetHeight: i.pageY - a.top
    }, s.style.cursor = "", this.bindDocumentEvents();
  }
  onMouseMove(i) {
    if (this.disabled || this.isDragging)
      return;
    i = this.parseEvent(i);
    let s = this.getHandle();
    this.checkArea(i) ? s.style.cursor = this.cursor : s.style.cursor = this.$el.resizeCursor || "";
  }
  onMouseLeave() {
    if (this.disabled)
      return;
    let i = this.getHandle();
    i.style.cursor = "";
  }
  bindDocumentEvents() {
    this.$el._docMoveHandler = (i) => this.doMove(i), this.$el._docUpHandler = (i) => this.doUp(i), domHelper.bind(document, "mousemove", this.$el._docMoveHandler), domHelper.bind(document, "touchmove", this.$el._docMoveHandler), domHelper.bind(document, "mouseup", this.$el._docUpHandler), domHelper.bind(document, "touchend", this.$el._docUpHandler);
  }
  unbindDocumentEvents() {
    domHelper.unbind(document, "mousemove", this.$el._docMoveHandler), domHelper.unbind(document, "touchmove", this.$el._docMoveHandler), domHelper.unbind(document, "mouseup", this.$el._docUpHandler), domHelper.unbind(document, "touchend", this.$el._docUpHandler);
  }
}
DraggableClass.droppables = [];
const Draggable = {
  name: "Draggable",
  mounted(e, i) {
    e._dragInstance = new DraggableClass(e, i.value), e._dragInstance.bindEvents();
  },
  updated(e, i) {
    e._dragInstance.updateOptions(i.value);
  },
  beforeUnmount(e) {
    e._dragInstance.unbindEvents();
  }
};
class DroppableClass {
  constructor(i, s = null) {
    this.updateOptions(s), this.$el = i;
  }
  updateOptions(i) {
    let s = Object.assign({
      scope: null,
      disabled: !1,
      dragEnter: () => {
      },
      dragOver: () => {
      },
      dragLeave: () => {
      },
      drop: () => {
      }
    }, this, i || {});
    Object.assign(this, s);
  }
  checkDrop(i = null) {
    if (!i || !this.scope || typeof this.scope == "string" && this.scope == i)
      return !0;
    if (this.scope instanceof Array) {
      for (let s = 0; s < this.scope.length; s++)
        if (this.scope[s] == i)
          return !0;
    }
    return !1;
  }
}
const Droppable = {
  name: "Droppable",
  mounted(e, i) {
    e._dropInstance = new DroppableClass(e, i.value), DraggableClass.droppables.push(e._dropInstance);
  },
  updated(e, i) {
    e._dropInstance.updateOptions(i.value);
  },
  beforeUnmount(e) {
    let i = DraggableClass.droppables.indexOf(e._dropInstance);
    i >= 0 && DraggableClass.droppables.splice(i, 1), e._dropInstance = null;
  }
}, TreeNodeIcon = {
  name: "TreeNodeIcon",
  props: {
    tree: Object,
    node: Object
  },
  render() {
    return this.tree.$slots.icon({
      node: this.node
    });
  }
}, TreeNode = {
  name: "TreeNode",
  components: {
    TreeNodeTitle,
    TreeNodeEditor,
    TreeNodeIcon
  },
  directives: {
    SlideUpDown,
    Draggable,
    Droppable
  },
  props: {
    tree: Object,
    node: Object,
    pnode: Object,
    depth: {
      type: Number,
      default: 0
    },
    nodeCls: String
  },
  data() {
    return {
      loading: !1,
      innerNode: this.node,
      dndCls: null
    };
  },
  created() {
    this.node.parent = this.pnode;
  },
  computed: {
    indentWidth() {
      return this.isLeaf ? (this.depth + 1) * 16 : this.depth * 16;
    },
    nodeClasses() {
      return ["tree-node f-row f-vcenter", this.dndCls, this.node.nodeCls, {
        "tree-node-hover": this.node == this.tree.highlightNode,
        "tree-node-selected": this.isSelected,
        "tree-node-disabled": this.node.disabled
      }];
    },
    hitClasses() {
      return ["tree-hit", {
        "tree-expanded": this.isExpanded,
        "tree-collapsed": this.isCollapsed
      }];
    },
    iconClasses() {
      return ["tree-icon tree-folder", this.node.iconCls, {
        "tree-folder-open": this.isExpanded,
        "tree-file": this.isLeaf,
        "tree-loading": this.loading
      }];
    },
    checkboxClasses() {
      let i = ["unchecked", "checked", "indeterminate"].indexOf(this.node.checkState);
      return i == -1 && (i = 0), "tree-checkbox tree-checkbox" + i;
    },
    isExpanded() {
      return !this.node.state || this.node.state == "open";
    },
    isCollapsed() {
      return !!(this.node.state && this.node.state == "closed");
    },
    isSelected() {
      return this.node == this.tree.selectionState;
    },
    isLeaf() {
      return this.node.state == "closed" ? !1 : this.node.children && this.node.children.length ? (this.loading = !1, !1) : !this.loading;
    }
  },
  methods: {
    getDraggableOpts() {
      return {
        disabled: this.tree.dnd ? this.node.disabled : !0,
        revert: !0,
        deltaX: 0,
        deltaY: 0,
        edge: 5,
        scope: this.tree.dragScope,
        proxy: this.tree.$refs.proxy,
        dragStart: (e) => {
          this.onDragStart(e);
        },
        dragEnd: (e) => {
          this.onDragEnd(e);
        }
      };
    },
    getDroppableOpts() {
      return {
        disabled: this.tree.dnd ? this.node.disabled || this.node.dropDisabled : !0,
        node: this.node,
        dragOver: (e) => {
          this.onDragOver(e);
        },
        dragLeave: (e) => {
          this.onDragLeave(e);
        },
        drop: (e) => {
          this.onDrop(e);
        }
      };
    },
    onDragStart(e) {
      Object.assign(this.tree.dragScope, {
        node: this.node,
        event: e,
        obj: this
      }), this.tree.dragCls = "tree-dnd-no", treeHelper.forNodes([this.node], (i) => {
        i.dropDisabled = !0;
      });
    },
    onDragEnd() {
      treeHelper.forNodes(this.tree.innerData, (e) => {
        e.dropDisabled = !1;
      });
    },
    onDragOver(e) {
      if (this.node.dropDisabled) {
        this.tree.dragCls = "tree-dnd-no";
        return;
      }
      this.tree.dragCls = "tree-dnd-yes";
      const i = e.event, s = i.target.currDroppable.$el, l = domHelper.offset(s).top, r = l + domHelper.outerHeight(s), a = i.pageY;
      a > l + (r - l) / 2 ? r - a < 5 ? (e.point = "bottom", this.dndCls = "tree-node-bottom") : (e.point = "append", this.dndCls = "tree-node-append") : a - l < 5 ? (e.point = "top", this.dndCls = "tree-node-top") : (e.point = "append", this.dndCls = "tree-node-append");
    },
    onDragLeave() {
      this.dndCls = null, this.tree.dragCls = "tree-dnd-no";
    },
    onDrop(e) {
      this.dndCls = null, this.tree.dragCls = null, e.point && (this.tree.$emit("nodeDrop", {
        from: e.node,
        to: this.node,
        point: e.point
      }), this.tree.moveNode(e.node, this.node, e.point), this.$nextTick(() => {
        const s = e.event.target.$el;
        s.style.left = null, s.style.top = null;
      }));
    },
    toggle(e) {
      e.stopPropagation(), this.isExpanded ? (this.node.state = "closed", this.tree.$emit("nodeCollapse", this.node)) : (this.loading = !0, this.node.state = "open", this.tree.$emit("nodeExpand", this.node));
    },
    onClickNode(e) {
      const {
        clickToEdit: i,
        dblclickToEdit: s,
        editingItem: l
      } = this.tree;
      e.stopPropagation(), this.tree.$emit("nodeClick", this.node), this.tree.selectNode(this.node), (i || s && l) && this.tree.beginEdit(this.node, domHelper.closest(e.target, ".tree-node"));
    },
    onDblClickNode(e) {
      e.stopPropagation(), this.tree.$emit("nodeDblClick", this.node), this.tree.dblclickToEdit && this.tree.beginEdit(this.node, domHelper.closest(e.target, ".tree-node"));
    },
    onCheckNode(e) {
      e.stopPropagation(), this.node.checkState == "checked" ? this.tree.uncheckNode(this.node) : this.tree.checkNode(this.node);
    },
    onNodeContextMenu(e) {
      this.tree.$emit("nodeContextMenu", {
        node: this.node,
        originalEvent: e
      });
    }
  },
  render() {
    return createVNode("li", null, [withDirectives(createVNode("div", {
      class: this.nodeClasses,
      onMouseenter: () => this.tree.highlightNode = this.node,
      onMouseleave: () => this.tree.highlightNode = null,
      onContextmenu: this.onNodeContextMenu,
      onClick: this.onClickNode,
      onDblclick: this.onDblClickNode
    }, [createVNode("span", {
      class: "tree-indent",
      style: {
        width: this.indentWidth + "px"
      }
    }, null), !this.isLeaf && createVNode("span", {
      class: this.hitClasses,
      onClick: this.toggle
    }, null), !this.tree.$slots.icon && createVNode("span", {
      class: this.iconClasses
    }, null), this.tree.$slots.icon && createVNode(TreeNodeIcon, {
      tree: this.tree,
      node: this.node
    }, null), this.tree.checkboxState && createVNode("span", {
      class: this.checkboxClasses,
      onClick: this.onCheckNode
    }, null), !this.tree.isEditing(this.node) && createVNode(TreeNodeTitle, {
      tree: this.tree,
      node: this.node
    }, null), this.tree.isEditing(this.node) && createVNode(TreeNodeEditor, {
      tree: this.tree,
      node: this.node
    }, null)]), [[resolveDirective("draggable"), this.getDraggableOpts()], [resolveDirective("droppable"), this.getDroppableOpts()]]), this.node.children && this.node.children.length > 0 && withDirectives(createVNode("ul", {
      class: "f-block"
    }, [this.node.children.map((e) => createVNode(Fragment, null, [!e.hidden && createVNode(resolveComponent("TreeNode"), {
      node: e,
      pnode: this.node,
      depth: this.depth + 1,
      tree: this.tree
    }, null)]))]), [[resolveDirective("slideUpDown"), {
      animate: this.tree.animate,
      collapsed: this.node.state == "closed",
      disabled: !1
    }]])]);
  }
}, Tree = {
  name: "Tree",
  components: {
    TreeNode
  },
  props: {
    data: Array,
    selection: Object,
    animate: {
      type: Boolean,
      default: !1
    },
    selectLeafOnly: {
      type: Boolean,
      default: !1
    },
    checkbox: {
      type: Boolean,
      default: !1
    },
    cascadeCheck: {
      type: Boolean,
      default: !0
    },
    clickToEdit: {
      type: Boolean,
      default: !1
    },
    dblclickToEdit: {
      type: Boolean,
      default: !1
    },
    dnd: {
      type: Boolean,
      default: !1
    },
    dndCls: String,
    dndStyle: Object,
    editRules: [Array, Object],
    tipOptions: Object,
    filterIncludingChild: {
      type: Boolean,
      default: !1
    },
    filter: {
      type: Function,
      default: (e, i) => {
        if (!e)
          return !0;
        let s = e instanceof Array ? e : [e];
        s = s.map((l) => l.trim()).filter((l) => l);
        for (let l = 0; l < s.length; l++)
          if (i.text.toLowerCase().indexOf(s[l].toLowerCase()) >= 0)
            return !0;
        return !s.length;
      }
    }
  },
  data() {
    return {
      highlightNode: null,
      editingItem: null,
      innerData: [],
      selectionState: this.selection,
      checkboxState: this.checkbox,
      dragScope: {},
      dragCls: null
    };
  },
  computed: {
    tree() {
      return this;
    }
  },
  watch: {
    data(e) {
      this.setData(e);
    },
    selection(e) {
      this.selectNode(e);
    },
    checkbox(e) {
      this.checkboxState = e;
    }
  },
  created() {
    treeHelper.$vue = this;
  },
  mounted() {
    this.setData(this.data), window.EventHub && window.EventHub.$emit("treeMounted", this);
  },
  methods: {
    afterSelectionChange() {
    },
    afterCheckChange() {
    },
    setData(e) {
      e == null && (e = []), this.innerData = Object.assign([], e);
    },
    getCheckedNodes(e = "checked") {
      let i = [];
      return treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.forNodes(this.innerData, (s) => {
        s.checkState == e && i.push(s);
      }), i;
    },
    selectNode(e) {
      e.children && e.children.length && this.selectLeafOnly || this.selectionState != e && (this.selectionState = e, this.$emit("selectionChange", e), this.afterSelectionChange(e));
    },
    checkNode(e) {
      treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.checkNode(e, () => {
        this.$emit("nodeCheck", e), this.$emit("checkChange", this.getCheckedNodes()), this.afterCheckChange(this.getCheckedNodes());
      });
    },
    uncheckNode(e) {
      treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.uncheckNode(e, () => {
        this.$emit("nodeUncheck", e), this.$emit("checkChange", this.getCheckedNodes()), this.afterCheckChange(this.getCheckedNodes());
      });
    },
    uncheckAllNodes() {
      treeHelper.uncheckAllNodes(this.innerData, () => {
        this.$emit("checkChange", []), this.afterCheckChange([]);
      });
    },
    adjustCheck(e) {
      treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.adjustCheck(e);
    },
    showNode(e) {
      e.hidden = !1;
    },
    hideNode(e) {
      e.hidden = !0;
    },
    doFilter(e) {
      let i = [];
      treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.forNodes(this.innerData, (s) => {
        this.filter(e, s) ? (this.showNode(s), i.push(s)) : this.hideNode(s);
      });
      for (let s of i) {
        let l = s.parent;
        for (; l; )
          this.showNode(l), l = l.parent;
        this.filterIncludingChild && s.children && treeHelper.forNodes(s.children, (r) => {
          this.showNode(r);
        });
      }
    },
    isEditing(e) {
      return this.editingItem ? this.editingItem.node == e : !1;
    },
    beginEdit(e, i = null) {
      if (!this.isEditing(e)) {
        if (this.endEdit(), this.editingItem) {
          setTimeout(() => {
            this.selectNode(this.editingItem.node);
          });
          return;
        }
        this.editingItem = {
          node: e,
          originalValue: e.text,
          element: i
        }, this.$emit("editBegin", this.editingItem);
      }
    },
    endEdit() {
      if (this.editingItem) {
        let e = this.editingItem.element;
        if (e && e.querySelector(".validatebox-invalid") || this.editingItem.invalid)
          return;
        this.$emit("editEnd", this.editingItem), this.editingItem = null;
      }
    },
    cancelEdit() {
      this.editingItem && (this.editingItem.node.text = this.editingItem.originalValue, this.$emit("editCancel", this.editingItem), this.editingItem = null);
    },
    moveNode(e, i, s) {
      const l = this.innerData, r = e.parent ? e.parent.children : l, a = r.indexOf(e);
      if (a >= 0) {
        if (r.splice(a, 1), s === "append") {
          const n = (i.children || []).slice();
          n.push(e), i.children = n;
        } else if (s === "top") {
          const n = i.parent ? i.parent.children : l, o = n.indexOf(i);
          o >= 0 && n.splice(o, 0, e);
        } else if (s === "bottom") {
          const n = i.parent ? i.parent.children : l, o = n.indexOf(i);
          o >= 0 && n.splice(o + 1, 0, e);
        }
        this.$emit("nodeMove", {
          from: e,
          to: i,
          point: s,
          data: l
        });
      }
    }
  },
  render() {
    return createVNode("ul", {
      class: "tree"
    }, [this.innerData.map((e) => createVNode(Fragment, null, [!e.hidden && createVNode(TreeNode, {
      node: e,
      tree: this.tree
    }, null)])), this.dnd && createVNode(resolveComponent("DraggableProxy"), {
      ref: "proxy",
      proxyCls: this.dndCls,
      proxyStyle: this.dndStyle
    }, {
      default: () => [createVNode("div", {
        class: "tree-node-proxy"
      }, [createVNode("span", {
        class: ["tree-dnd-icon", this.dragCls]
      }, [createTextVNode(" ")]), createVNode("span", null, [this.dragScope.node ? this.dragScope.node.text : null])])]
    })]);
  }
}, TabPanelHeader = {
  name: "TabPanelHeader",
  props: {
    panel: Object
  },
  render() {
    let e = null;
    this.panel.$slots.header ? e = this.panel.$slots.header() : e = createVNode("span", {
      class: ["tabs-title", {
        "tabs-with-icon": this.panel.iconCls,
        "tabs-closable": this.panel.closable
      }]
    }, [this.panel.title]);
    let i = null;
    this.panel.iconCls && (i = createVNode("span", {
      class: ["tabs-icon", this.panel.iconCls]
    }, null));
    let s = null;
    return this.panel.closable && (s = createVNode("a", {
      href: "javascript:;",
      tabindex: "-1",
      class: "tabs-close",
      onClick: (l) => {
        this.$emit("close", l);
      }
    }, null)), createVNode("span", {
      class: ["tabs-inner f-inline-row f-full", this.panel.headerCls],
      style: [this.panel.headerStyle, {
        width: this.$parent.isHorizontal ? null : domHelper.toStyleValue(this.$parent.tabWidth),
        height: this.$parent.isHorizontal ? domHelper.toStyleValue(this.$parent.tabHeight) : null
      }],
      onContextmenu: (l) => {
        this.panel.$emit("contextMenu", l);
      }
    }, [e, i, s]);
  }
}, Tabs = {
  name: "Tabs",
  components: {
    TabPanelHeader
  },
  props: {
    headerWidth: {
      type: [Number, String],
      default: 150
    },
    headerHeight: {
      type: [Number, String],
      default: 35
    },
    tabWidth: [Number, String],
    tabHeight: {
      type: [Number, String],
      default: 32
    },
    tabPosition: {
      type: String,
      default: "top"
    },
    plain: {
      type: Boolean,
      default: !1
    },
    narrow: {
      type: Boolean,
      default: !1
    },
    justified: {
      type: Boolean,
      default: !1
    },
    border: {
      type: Boolean,
      default: !0
    },
    scrollable: {
      type: Boolean,
      default: !1
    },
    scrollIncrement: {
      type: Number,
      default: 100
    },
    selectedIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      panels: [],
      selectedHis: [],
      scrollDistance: 0,
      maxScrollDistance: 0
    };
  },
  computed: {
    containerClasses() {
      return "tabs-container " + (this.isHorizontal ? "f-row" : "f-column");
    },
    headerClasses() {
      return ["tabs-header f-row f-noshrink", {
        "tabs-header-plain": this.plain,
        "tabs-header-narrow": this.narrow,
        "tabs-header-noborder": !this.border,
        "tabs-header-bottom f-order2": this.tabPosition == "bottom",
        "tabs-header-left f-column": this.tabPosition == "left",
        "tabs-header-right f-column f-order2": this.tabPosition == "right"
      }];
    },
    headerStyle() {
      return {
        width: this.isHorizontal ? domHelper.toStyleValue(this.headerWidth) : null,
        height: this.isHorizontal ? null : domHelper.toStyleValue(this.headerHeight)
      };
    },
    bodyClasses() {
      return ["tabs-panels f-column f-full", {
        "tabs-panels-noborder": !this.border,
        "tabs-panels-top": this.tabPosition == "bottom",
        "tabs-panels-right": this.tabPosition == "left",
        "tabs-panels-left": this.tabPosition == "right"
      }];
    },
    tabsClasses() {
      return ["tabs f-full", {
        "f-row": !this.isHorizontal,
        "f-column": this.isHorizontal,
        "tabs-scrollable": this.isScrollable,
        "tabs-narrow": this.narrow
      }];
    },
    tabsStyle() {
      return this.isScrollable ? {
        left: -this.scrollDistance + "px"
      } : null;
    },
    isHorizontal() {
      return this.tabPosition == "left" || this.tabPosition == "right";
    },
    isScrollable() {
      return this.isHorizontal ? !1 : this.scrollable && !this.justified;
    },
    isScrollerVisible() {
      return this.isScrollable ? this.maxScrollDistance > 0 : !1;
    },
    usedPanels() {
      return this.panels.filter((e) => e.isUsed);
    }
  },
  watch: {
    panels() {
      this.initPanels();
    }
  },
  methods: {
    addPanel(e) {
      const i = this.panels.slice();
      i.push(e), this.panels = i;
    },
    removePanel(e) {
      const i = this.panels.slice();
      let s = i.indexOf(e);
      s >= 0 && (i.splice(s, 1), this.panels = i), this.removeHis(e);
    },
    setMaxScrollDistance() {
      this.$refs.tabsRef || (this.maxScrollDistance = 0);
      let e = this.$refs.tabsRef.scrollWidth, i = this.$refs.tabsWrapRef.offsetWidth;
      this.maxScrollDistance = e > i ? e - i : 0;
    },
    onClickTab(e, i) {
      i.stopPropagation(), e.select();
    },
    onCloseTab(e, i) {
      i.stopPropagation(), e.disabled || e.close();
    },
    initPanels() {
      if (this.panels.length) {
        this.panels.forEach((i) => {
          i.isFirst = !1, i.isLast = !1;
        });
        let e = this.panels.filter((i) => i.isUsed);
        e.length && (e[0].isFirst = !0, e[e.length - 1].isLast = !0), this.initSelectedPanel();
      }
      this.$nextTick(() => this.setScrollers());
    },
    initSelectedPanel() {
      let e = this.getSelectedPanel();
      e || (e = this.selectedHis.pop()), e || (e = this.getPanel(this.selectedIndex)), e && (this.usedPanels.filter((i) => i != e).forEach((i) => i.selectedState = !1), e.selectedState = !0, this.selectedHis = this.selectedHis.filter((i) => this.getPanelIndex(i) != -1), this.removeHis(e), this.addHis(e));
    },
    setScrollers() {
      if (!this.isScrollable)
        return;
      this.setMaxScrollDistance();
      let e = this.getSelectedPanel();
      if (e) {
        let i = domHelper.outerWidth(this.$refs.tabsWrapRef), s = this.getPanelIndex(e), l = this.$refs.tabsRef.children[s], r = domHelper.outerWidth(l, !0), n = domHelper.position(l).left - this.scrollDistance, o = n + r;
        if (n < 0) {
          let d = n - (i - r) / 2;
          this.scrollBy(d);
        } else if (o > i) {
          let d = n - (i - r) / 2;
          this.scrollBy(d);
        } else
          this.scrollBy(0);
      }
    },
    addHis(e) {
      this.selectedHis.push(e);
    },
    removeHis(e) {
      this.selectedHis = this.selectedHis.filter((i) => i != e);
    },
    backHis() {
      let e = this.selectedHis.pop();
      e ? (this.removeHis(e), e.select()) : this.select(0);
    },
    select(e) {
      let i = this.getPanel(e);
      i && i.select();
    },
    unselect(e) {
      let i = this.getPanel(e);
      i && i.unselect();
    },
    getPanel(e) {
      return this.usedPanels[e];
    },
    getPanelIndex(e) {
      let i = this.usedPanels;
      for (let s = 0; s < i.length; s++)
        if (i[s] == e)
          return s;
      return -1;
    },
    getSelectedPanel() {
      let e = this.usedPanels.filter((i) => i.selectedState && !i.disabled);
      return e.length ? e[0] : null;
    },
    scrollBy(e) {
      this.setMaxScrollDistance(), e += this.scrollDistance, e > this.maxScrollDistance && (e = this.maxScrollDistance), e < 0 && (e = 0), this.scrollDistance = e;
    },
    resize() {
      this.setMaxScrollDistance();
    }
  },
  render() {
    return createVNode("div", {
      ref: "containerRef",
      class: this.containerClasses
    }, [createVNode("div", {
      ref: "headerRef",
      class: this.headerClasses,
      style: this.headerStyle
    }, [this.isScrollerVisible && createVNode("div", {
      class: "tabs-scroller-left f-order1",
      onClick: () => this.scrollBy(-this.scrollIncrement)
    }, null), this.isScrollerVisible && createVNode("div", {
      class: "tabs-scroller-right f-order3",
      onClick: () => this.scrollBy(this.scrollIncrement)
    }, null), createVNode("div", {
      ref: "tabsWrapRef",
      class: "tabs-wrap f-column f-full f-order2"
    }, [this.isScrollable && createVNode("ul", {
      class: "tabs tabs-scrollable f-full",
      style: "width:100%"
    }, null), createVNode("ul", {
      ref: "tabsRef",
      class: this.tabsClasses,
      style: this.tabsStyle
    }, [this.usedPanels.map((e) => createVNode("li", {
      class: [{
        "f-inline-row f-full": this.justified,
        "f-noshrink": this.isScrollable,
        "tabs-selected": e.selectedState,
        "tabs-disabled": e.disabled,
        "tabs-first": e.isFirst,
        "tabs-last": e.isLast
      }],
      onClick: (i) => this.onClickTab(e, i)
    }, [createVNode(TabPanelHeader, {
      panel: e,
      onClose: (i) => this.onCloseTab(e, i)
    }, null)]))])]), this.$slots.tools && createVNode("div", {
      class: "tabs-tool f-order4 f-noshrink"
    }, [this.$slots.tools()])]), createVNode("div", {
      class: this.bodyClasses
    }, [this.$slots.default()])]);
  }
}, TabPanel = {
  name: "TabPanel",
  extends: Panel,
  props: {
    selected: {
      type: Boolean,
      default: !1
    },
    showHeader: {
      type: Boolean,
      default: !1
    },
    border: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    closable: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      isFirst: !1,
      isLast: !1,
      isUsed: !0,
      selectedState: this.selected
    };
  },
  computed: {
    tabs() {
      return this.$parent;
    },
    panelClasses() {
      return ["panel f-column", this.panelCls, {
        "f-full": this.selectedState,
        "f-hide": !this.selectedState
      }];
    }
  },
  watch: {
    selected(e) {
      this.selectedState = e;
    }
  },
  mounted() {
    this.$parent.addPanel(this);
  },
  beforeUnmount() {
    this.$parent.removePanel(this);
  },
  methods: {
    select() {
      this.selectedState || this.disabled || (this.tabs.panels.filter((e) => e != this).forEach((e) => e.unselect()), this.selectedState = !0, this.tabs.$emit("tabSelect", this), this.tabs.addHis(this), this.$nextTick(() => {
        this.tabs.setScrollers(), window.EventHub && window.EventHub.$emit("tabSelect", this);
      }));
    },
    unselect() {
      !this.selectedState || this.disabled || (this.selectedState = !1, this.tabs.$emit("tabUnselect", this));
    },
    close() {
      this.disabled || (this.selectedState && (this.selectedState = !1), this.closedState = !0, this.isUsed = !1, this.tabs.$emit("tabClose", this), this.tabs.removeHis(this), this.tabs.backHis(), this.tabs.initPanels(), this.$nextTick(() => {
        this.tabs.setScrollers();
      }));
    }
  }
}, TimeSpinner = {
  name: "TimeSpinner",
  extends: SpinnerBase,
  props: {
    value: String,
    modelValue: String,
    min: String,
    max: String,
    increment: {
      type: Number,
      default: 1
    },
    highlight: {
      type: Number,
      default: 0
    },
    selections: {
      type: Array,
      default: () => [[0, 2], [3, 5], [6, 8]]
    },
    formatter: Function,
    parser: Function,
    format: {
      type: String,
      default: "HH:mm"
    }
  },
  data() {
    return {
      highlightState: this.highlight,
      highlighting: !1
    };
  },
  computed: {
    text() {
      let e = this.focused ? this.textState : (this.textFormatter || this.defaultTextFormatter)(this.valueState);
      return this.focused && this.highlighting && this.$nextTick(() => {
        this.highlightRange(this.highlightState), this.highlighting = !1;
      }), e;
    }
  },
  mounted() {
    const e = this.value !== void 0 ? this.value : this.modelValue;
    this.setValue(e), domHelper.bind(this.$refs.inputRef, "click", this.onClickMe), domHelper.bind(this.$refs.inputRef, "keydown", this.onKeyDown), domHelper.bind(this.$refs.inputRef, "keypress", this.onKeyPress), domHelper.bind(this.$refs.inputRef, "blur", this.onBlur);
  },
  beforeUnmount() {
    domHelper.unbind(this.$refs.inputRef);
  },
  methods: {
    defaultFormatter(e) {
      return dateHelper.formatDate(e, this.format);
    },
    defaultParser(e) {
      let i = this.parseD(e);
      if (i) {
        var s = this.parseD(this.min), l = this.parseD(this.max);
        s && s > i && (i = s), l && l < i && (i = l);
      }
      return i;
    },
    parseD(e) {
      return dateHelper.parseDate(e, this.format);
    },
    onClickMe() {
      let e = this.getSelectionStart();
      for (let i = 0; i < this.selections.length; i++) {
        let s = this.selections[i];
        if (e >= s[0] && e <= s[1]) {
          this.highlightRange(i);
          return;
        }
      }
    },
    onKeyDown(e) {
      e.keyCode == 13 && (e.stopPropagation(), this.value = this.text, this.text = this.value, this.onClickMe(e), this.highlighting = !0);
    },
    onKeyPress(e) {
      if (!this.focused || e.metaKey || e.ctrlKey || ["46", "8", "13", "0"].indexOf(String(e.which)) !== -1)
        return !0;
      let i = String.fromCharCode(e.which);
      return !i || "0123456789".indexOf(i) >= 0;
    },
    onBlur() {
      this.setValue(this.textState);
    },
    setValue(e) {
      e = (this.formatter || this.defaultFormatter)((this.parser || this.defaultParser)(e)), this.textState = e, InputBase.methods.setValue.call(this, e);
    },
    highlightRange(e) {
      this.highlightState = e;
      let i = this.selections[this.highlightState];
      i && (this.setSelectionRange(i[0], i[1]), this.focus());
    },
    doSpin(e) {
      let i = this.selections[this.highlightState];
      if (i) {
        let s = this.textState || "";
        if (s) {
          let l = s.substring(0, i[0]), r = s.substring(i[0], i[1]), a = s.substring(i[1]), n = l + ((parseInt(r, 10) || 0) + this.increment * (e ? -1 : 1)) + a;
          this.setValue(n);
        } else {
          let l = (this.formatter || this.defaultFormatter)(/* @__PURE__ */ new Date());
          this.setValue(l);
        }
        this.focus(), this.highlighting = !0;
      }
    },
    doSpinUp() {
      this.doSpin(!1);
    },
    doSpinDown() {
      this.doSpin(!0);
    }
  }
}, TimeClock = {
  name: "TimeClock",
  props: {
    value: {
      type: Number,
      default: () => 0
    },
    type: {
      type: String,
      default: () => "hour"
    }
  },
  computed: {
    hour24() {
      return this.$parent.$parent.hour24;
    },
    hourDistance() {
      return this.$parent.$parent.hourDistance;
    }
  },
  data() {
    return {
      valueState: 0,
      data: [],
      radius: 0,
      width: 0,
      height: 0
    };
  },
  watch: {
    value() {
      this.valueState = this.value;
    },
    type() {
      this.data = this.getData(this.type);
    }
  },
  mounted() {
    setTimeout(() => {
      this.valueState = this.value, this.data = this.getData(this.type);
      const e = domHelper.outerWidth(this.$refs.elRef), i = domHelper.outerHeight(this.$refs.elRef), s = Math.min(e, i) - 20;
      this.width = s, this.height = s, this.radius = s / 2;
    });
  },
  methods: {
    getData(e = "hour") {
      let i = [];
      if (e == "hour") {
        for (let s = 0; s < 12; s++)
          i.push(String(s));
        i[0] = "12";
      } else {
        for (let s = 0; s < 60; s += 5)
          i.push(s < 10 ? "0" + s : String(s));
        i[0] = "00";
      }
      return i;
    },
    getHour24(e) {
      let i = parseInt(e, 10);
      return i += 12, i == 24 && (i = "00"), i;
    },
    itemClasses(e) {
      return ["item f-column f-content-center", {
        "item-selected": e == this.valueState
      }];
    },
    itemStyle(e, i) {
      const s = this.type, l = this.hourDistance[1] - this.hourDistance[0], r = this.radius - (this.hour24 && this.type == "hour" ? i ? 0 : l : 0), a = parseInt(e, 10) / (s == "hour" ? 12 : 60) * 360 * Math.PI / 180, n = (r - 20) * Math.sin(a), o = -(r - 20) * Math.cos(a);
      return {
        transform: `translate(${n}px,${o}px)`
      };
    },
    clockStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        marginLeft: -this.width / 2 + "px",
        marginTop: -this.height / 2 + "px"
      };
    },
    handStyle() {
      const e = parseInt(this.valueState, 10), s = {
        transform: `rotate(${e / (this.type == "hour" ? 12 : 60) * 360}deg)`
      };
      return this.hour24 && this.type == "hour" && (e == 0 ? s.top = this.hourDistance[0] + "px" : e <= 12 && (s.top = this.hourDistance[1] + "px")), s;
    },
    onItemClick(e, i) {
      i.stopPropagation(), i.preventDefault(), e = parseInt(e, 10), this.valueState = e, this.$emit("select", e);
    }
  },
  render() {
    return createVNode("div", {
      ref: "elRef",
      class: "clock-wrap f-full f-column f-content-center"
    }, [createVNode("div", {
      class: "clock",
      style: this.clockStyle()
    }, [createVNode("div", {
      class: "center"
    }, null), createVNode("div", {
      class: "hand",
      style: this.handStyle()
    }, [createVNode("div", {
      className: "drag"
    }, null)]), this.data.map((e) => createVNode("div", {
      class: this.itemClasses(e),
      style: this.itemStyle(e),
      onClick: (i) => this.onItemClick(e, i)
    }, [e])), this.data.map((e) => createVNode(Fragment, null, [this.hour24 && this.type == "hour" && createVNode("div", null, [createVNode("div", {
      class: this.itemClasses(this.getHour24(e)),
      style: this.itemStyle(this.getHour24(e), !0),
      onClick: (i) => this.onItemClick(this.getHour24(e), i)
    }, [this.getHour24(e)])])]))])]);
  }
}, TimePanel = {
  name: "TimePanel",
  props: {
    value: String,
    ampm: {
      type: Array,
      default: () => ["am", "pm"]
    }
  },
  components: {
    TimeClock
  },
  data() {
    return {
      selectingType: "hour",
      selectingAmpm: "am",
      hour: 0,
      minute: 0
    };
  },
  watch: {
    value() {
      this.setValue(this.value);
    }
  },
  mounted() {
    this.selectingAmpm = this.ampm[0], this.setValue(this.value);
  },
  methods: {
    setValue(e) {
      if (e) {
        const i = e.split(" "), s = i[0].split(":");
        this.hour = parseInt(s[0], 10), this.minute = parseInt(s[1], 10), this.selectingAmpm = i[1];
      }
    },
    getValue() {
      let e = this.getHourStr() + ":" + this.getMinuteStr();
      return this.$parent.hour24 || (e += " " + this.selectingAmpm), e;
    },
    getHourStr() {
      const e = this.hour;
      return e < 10 ? "0" + e : e;
    },
    getMinuteStr() {
      const e = this.minute;
      return e < 10 ? "0" + e : e;
    },
    onAmpmClick(e) {
      this.selectingAmpm = e, this.$emit("change", this.getValue());
    },
    onClockSelect(e) {
      this.selectingType === "hour" ? (this.hour = e, this.$nextTick(() => {
        this.selectingType = "minute";
      })) : this.minute = e, this.$emit("change", this.getValue());
    }
  },
  render() {
    return createVNode("div", {
      class: "timepicker-panel f-column f-full"
    }, [createVNode("div", {
      class: "panel-header f-noshrink f-row f-content-center"
    }, [createVNode("div", {
      class: ["title", {
        "title-selected": this.selectingType == "hour"
      }],
      onClick: () => this.selectingType = "hour"
    }, [this.getHourStr()]), createVNode("div", {
      class: "sep"
    }, [createTextVNode(":")]), createVNode("div", {
      class: ["title", {
        "title-selected": this.selectingType == "minute"
      }],
      onClick: () => this.selectingType = "minute"
    }, [this.getMinuteStr()]), !this.$parent.hour24 && createVNode("div", {
      class: "ampm f-column"
    }, [createVNode("div", {
      class: ["title", {
        "title-selected": this.selectingAmpm == this.ampm[0]
      }],
      onClick: () => this.onAmpmClick(this.ampm[0])
    }, [this.ampm[0]]), createVNode("div", {
      class: ["title", {
        "title-selected": this.selectingAmpm == this.ampm[1]
      }],
      onClick: () => this.onAmpmClick(this.ampm[1])
    }, [this.ampm[1]])])]), createVNode(TimeClock, {
      value: this.selectingType == "hour" ? this.hour : this.minute,
      type: this.selectingType,
      onSelect: this.onClockSelect
    }, null)]);
  }
}, TimePicker = {
  name: "TimePicker",
  extends: ComboBase,
  components: {
    TimePanel
  },
  props: {
    value: String,
    modelValue: String,
    ampm: {
      type: Array,
      default: () => ["am", "pm"]
    },
    hour24: {
      type: Boolean,
      default: () => !1
    },
    hourDistance: {
      type: Array,
      default: () => [20, 50]
    },
    closeText: {
      type: String,
      default: () => window.Locale.t("DateBox.closeText", "Close")
    },
    okText: {
      type: String,
      default: () => window.Locale.t("DateBox.okText", "Ok")
    },
    editable: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      selectingValue: null
    };
  },
  mounted() {
    const e = this.value !== void 0 ? this.value : this.modelValue;
    this.setValue(e);
  },
  methods: {
    setValue(e) {
      this.selectingValue = e, this.textState = e, InputBase.methods.setValue.call(this, e);
    },
    onOk() {
      this.setValue(this.selectingValue), this.closePanel();
    },
    onTimeChange(e) {
      this.selectingValue = e;
    },
    renderPanel() {
      if (this.panelClosed)
        return null;
      const e = Object.assign({}, this.panelStyle, {
        left: this.panelLeft + "px",
        top: this.panelTop + "px"
      });
      return createVNode("div", {
        ref: "panelRef",
        class: "panel-body panel-body-noheader combo-panel combo-p f-column",
        style: e
      }, [this.renderContent()]);
    },
    renderContent() {
      return createVNode(Fragment, null, [createVNode(TimePanel, {
        value: this.valueState,
        ampm: this.ampm,
        onChange: this.onTimeChange
      }, null), createVNode("div", {
        class: "datebox-button f-row"
      }, [createVNode("a", {
        href: "javascript:;",
        class: "datebox-button-a f-full",
        onClick: this.onOk
      }, [this.okText]), createVNode("a", {
        href: "javascript:;",
        class: "datebox-button-a f-full",
        onClick: this.closePanel
      }, [this.closeText])])]);
    }
  }
}, DateTimeSpinner = {
  name: "DateTimeSpinner",
  extends: TimeSpinner,
  props: {
    selections: {
      type: Array,
      default: () => [[0, 2], [3, 5], [6, 10], [11, 13], [14, 16], [17, 19]]
    },
    format: {
      type: String,
      default: "MM/dd/yyyy HH:mm"
    }
  }
}, CollapsedPanel = {
  name: "CollapsedPanel",
  extends: Panel,
  props: {
    region: String
  },
  computed: {
    layout() {
      return this.$parent;
    },
    visible() {
      const e = this.layout.getPanel(this.region);
      return !(!e || !e.collapsedState || !e.expander);
    },
    panelClasses() {
      return ["panel f-column layout-expand", this.panelCls, {
        "layout-expand-east": this.region == "east",
        "layout-expand-west": this.region == "west",
        "layout-expand-south": this.region == "south",
        "layout-expand-north": this.region == "north"
      }];
    },
    panelStyles() {
      const e = this.layout.getPanel(this.region);
      return e ? [this.panelStyle, {
        top: this.region === "west" || this.region === "east" ? this.layout.paddingTop + "px" : this.region === "north" ? 0 : null,
        bottom: this.region === "west" || this.region === "east" ? this.layout.paddingBottom + "px" : this.region === "south" ? 0 : null,
        left: this.region === "west" || this.region === "north" || this.region === "south" ? 0 : null,
        right: this.region === "east" ? 0 : null,
        width: this.region === "west" || this.region === "east" ? e.collapsedSize + "px" : "100%",
        height: this.region === "north" || this.region === "south" ? e.collapsedSize + "px" : null,
        position: "absolute"
      }] : null;
    }
  },
  methods: {
    onPanelClick(e) {
      domHelper.closest(e.target, ".panel-tool") || (e.preventDefault(), e.stopPropagation(), this.expand());
    },
    clickCollapsibleTool() {
      this.expand();
    },
    expand() {
      this.layout.getPanel(this.region).expand();
    }
  },
  render() {
    return this.visible ? createVNode("div", {
      onClick: this.onPanelClick,
      class: this.panelClasses,
      style: this.panelStyles
    }, [this.panelHeader(), this.panelBody(), this.panelFooter()]) : null;
  }
}, Layout = {
  name: "Layout",
  components: {
    CollapsedPanel
  },
  props: {
    layoutCls: String,
    layoutStyle: Object
  },
  data() {
    return {
      panels: [],
      paddings: null,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    };
  },
  computed: {
    layoutClasses() {
      return ["layout", this.layoutCls];
    },
    layoutStyles() {
      return [this.layoutStyle, {
        padding: this.paddings
      }];
    }
  },
  watch: {
    panels() {
      this.updatePaddings(), this.$nextTick(() => this.updatePaddings());
    }
  },
  created() {
    window.EventHub && (window.EventHub.$on("tabSelect", (e) => {
      domHelper.isChild(this.$el, e.$el) && this.updatePaddings();
    }), window.EventHub.$on("panelSelect", (e) => {
      domHelper.isChild(this.$el, e.$el) && this.updatePaddings();
    }));
  },
  methods: {
    addPanel(e) {
      const i = this.panels.slice();
      i.push(e), this.panels = i;
    },
    removePanel(e) {
      const i = this.panels.slice();
      let s = i.indexOf(e);
      s >= 0 && (i.splice(s, 1), this.panels = i);
    },
    getPanel(e) {
      let i = this.panels.filter((s) => s.region == e);
      return i.length ? i[0] : null;
    },
    getPaddingValue(e) {
      let i = this.getPanel(e);
      if (!i)
        return 0;
      let s = 0;
      return i.collapsedState || i.float ? i.expander && (s += i.collapsedSize - 1) : (e == "west" || e == "east" ? s = domHelper.outerWidth(i.$el) : s = domHelper.outerHeight(i.$el), !i.split && i.border && (s -= 1)), s;
    },
    updatePaddings() {
      this.paddingLeft = this.getPaddingValue("west"), this.paddingRight = this.getPaddingValue("east"), this.paddingTop = this.getPaddingValue("north"), this.paddingBottom = this.getPaddingValue("south"), this.paddings = [this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft].map((e) => e + "px").join(" "), this.$emit("resize");
    },
    onClick(e) {
      let i = domHelper.closest(e.target, ".layout-panel");
      this.panels.filter((s) => s.$el != i).forEach((s) => {
        s.isExpanding || s.float && !s.collapsedState && s.collapse();
      });
    },
    collapseTitle(e) {
      if (e == "west" || e == "east")
        return " ";
      const i = this.getPanel(e);
      return i ? i.title : null;
    },
    collapseIconCls(e) {
      return "layout-button-" + {
        east: "left",
        west: "right",
        north: "down",
        south: "up"
      }[e];
    },
    collapsedSize(e) {
      const i = this.getPanel(e);
      return i ? i.collapsedSize : null;
    }
  },
  render() {
    return createVNode("div", {
      ref: "layoutRef",
      class: this.layoutClasses,
      style: this.layoutStyles,
      onClick: this.onClick
    }, [this.$slots.default(), ["west", "east", "north", "south"].map((e) => createVNode(CollapsedPanel, {
      bodyCls: "f-column f-vcenter",
      key: e,
      region: e,
      title: this.collapseTitle(e),
      collapsible: !0,
      collapseIconCls: this.collapseIconCls(e)
    }, {
      default: () => [(e == "west" || e == "east") && createVNode("div", {
        class: "f-vtitle f-full"
      }, [this.getPanel(e) ? this.getPanel(e).title : null])]
    }))]);
  }
}, LayoutPanel = {
  name: "LayoutPanel",
  extends: Panel,
  directives: {
    Resizable
  },
  props: {
    title: String,
    region: {
      type: String,
      default: "center"
    },
    float: {
      type: Boolean,
      default: !1
    },
    split: {
      type: Boolean,
      default: !1
    },
    edge: {
      type: Number,
      default: 5
    },
    animate: {
      type: Boolean,
      default: !0
    },
    collapsible: {
      type: Boolean,
      default: !1
    },
    collapsedSize: {
      type: Number,
      default: 32
    },
    expander: {
      type: Boolean,
      default: !1
    },
    expandIconCls: String,
    collapseIconCls: String
  },
  data() {
    return {
      isExpanding: !1,
      collapseToShrinkBody: !1,
      resizeOpts: null
    };
  },
  mounted() {
    this.setResizeOpts(), this.$parent.addPanel(this), domHelper.bind(this.$el, "transitionend", this.onSlideEnd);
  },
  beforeUnmount() {
    this.$parent.removePanel(this), domHelper.unbind(this.$el);
  },
  computed: {
    layout() {
      return this.$parent;
    },
    panelClasses() {
      return ["panel f-column layout-panel", this.panelCls, {
        "layout-collapsed": this.collapsedState,
        "layout-animate": this.animate,
        "layout-panel-east": this.region == "east",
        "layout-panel-west": this.region == "west",
        "layout-panel-south": this.region == "south",
        "layout-panel-north": this.region == "north",
        "layout-panel-center": this.region == "center",
        "layout-split-east": this.split && this.region == "east",
        "layout-split-west": this.split && this.region == "west",
        "layout-split-south": this.split && this.region == "south",
        "layout-split-north": this.split && this.region == "north",
        "layout-split-center": this.split && this.region == "center"
      }];
    },
    panelStyles() {
      return [this.panelStyle, {
        top: this.top ? this.top + "px" : null,
        bottom: this.bottom ? this.bottom + "px" : null,
        borderWidth: this.split ? this.edge + "px" : null
      }];
    },
    collapsibleClasses() {
      let e = {
        west: "left",
        east: "right",
        north: "up",
        south: "down"
      };
      return this.collapsedState ? this.expandIconCls ? this.expandIconCls : "layout-button-" + e[this.region] : this.collapseIconCls ? this.collapseIconCls : "layout-button-" + e[this.region];
    },
    top() {
      return this.region == "west" || this.region == "east" ? this.layout.paddingTop : null;
    },
    bottom() {
      return this.region == "west" || this.region == "east" ? this.layout.paddingBottom : null;
    }
  },
  watch: {
    collapsed() {
      this.collapsed ? this.collapse() : this.expand();
    }
  },
  methods: {
    setResizeOpts() {
      const e = {
        north: "s",
        south: "n",
        east: "w",
        west: "e"
      }, i = () => {
        this.region == "west" || this.region == "east" ? this.$el.style.left = null : this.$el.style.top = null, this.$parent.updatePaddings();
      };
      this.resizeOpts = {
        // edge: 5,
        edge: this.edge,
        handles: e[this.region] || "",
        disabled: !this.split,
        resizing: i,
        resizeStop: (s) => {
          this.$emit("resizeStop", s), i();
        }
      };
    },
    onSlideEnd() {
      this.layout.updatePaddings(), this.collapsedState ? this.$emit("collapse") : this.$emit("expand");
    },
    clickCollapsibleTool() {
      this.collapse(), this.layout.updatePaddings();
    },
    expand() {
      this.collapsedState = !1, this.isExpanding = !0, this.$nextTick(() => this.isExpanding = !1), this.animate || (this.layout.updatePaddings(), this.$emit("expand"));
    },
    collapse() {
      this.collapsedState = !0, this.animate || (this.layout.updatePaddings(), this.$emit("collapse"));
    }
  },
  render() {
    return this.closedState ? null : withDirectives(createVNode("div", {
      class: this.panelClasses,
      style: this.panelStyles
    }, [this.panelHeader(), this.panelBody(), this.panelFooter()]), [[resolveDirective("resizable"), this.resizeOpts]]);
  }
};
window.MenuZIndex = window.MenuZIndex || 11e4;
const Menu = {
  name: "Menu",
  props: {
    menuCls: String,
    menuStyle: Object,
    menuWidth: [Number, String],
    inline: {
      type: Boolean,
      default: !1
    },
    noline: {
      type: Boolean,
      default: !1
    },
    duration: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      subItems: [],
      left: 0,
      top: 0,
      zIndex: window.MenuZIndex++,
      timer: null,
      closed: !0,
      isDisplaying: !1
    };
  },
  computed: {
    menuWidthState() {
      return domHelper.toStyleValue(this.menuWidth);
    },
    containerClasses() {
      return ["menu-container f-inline-row", {
        "menu-noline": this.noline
      }];
    },
    containerStyle() {
      return {
        width: this.menuWidthState,
        minWidth: this.menuWidthState,
        left: this.left + "px",
        top: this.top + "px",
        zIndex: this.zIndex,
        display: this.inline ? null : this.closed ? "none" : "block"
      };
    },
    menubutton() {
      let e = this.$parent;
      for (; e && e.$options.name != "MenuButton" && e.$options.name != "SplitButton"; )
        e = e.$parent;
      return e;
    }
  },
  mounted() {
    this.inline || (document.body.appendChild(this.$refs.containerRef), domHelper.bind(document, "click", this.onDocumentClick)), this.menubutton && this.menubutton.setMenu(this);
  },
  beforeUnmount() {
    this.inline || (this.$el.appendChild(this.$refs.containerRef), domHelper.unbind(document, "click", this.onDocumentClick));
  },
  methods: {
    addItem(e) {
      this.subItems.push(e);
    },
    removeItem(e) {
      let i = this.subItems.indexOf(e);
      i >= 0 && this.subItems.splice(i, 1);
    },
    afterItemClick() {
    },
    onMouseOver() {
      this.closed = !1, clearTimeout(this.timer);
    },
    onMouseOut() {
      this.delayHide();
    },
    onDocumentClick(e) {
      if (!this.closed) {
        if (domHelper.isChild(e.target, this.$refs.containerRef) || this.isDisplaying)
          return;
        this.hide();
      }
    },
    findItem(e) {
      let i = (l, r = "value") => {
        for (let a of l) {
          if (a[r] == e)
            return a;
          if (a.subMenu && (a = i(a.subMenu.subItems, r), a))
            return a;
        }
        return null;
      }, s = i(this.subItems, "value");
      return s || (s = i(this.subItems, "text")), s;
    },
    unhighlight() {
      this.subItems.forEach((e) => {
        e.unhighlight();
      });
    },
    show(e, i) {
      this.closed = !1, this.left = e, this.top = i, this.zIndex = window.MenuZIndex++, clearTimeout(this.timer), this.isDisplaying = !0, this.$nextTick(() => this.isDisplaying = !1);
    },
    showAt(e, i = "left") {
      this.show(0, 0), this.alignTo(e, i), this.$nextTick(() => {
        this.alignTo(e, i);
      });
    },
    showContextMenu(e, i) {
      this.show(e, i), this.alignContextMenu(), this.$nextTick(() => {
        this.alignContextMenu();
      });
    },
    hide() {
      this.closed = !0;
    },
    delayHide() {
      this.timer = setTimeout(() => {
        this.closed = !0;
      }, this.duration);
    },
    alignTo(e, i = "left") {
      let s = domHelper.getViewport(), l = domHelper.offset(e), r = domHelper.outerWidth(e), a = domHelper.outerHeight(e), n = domHelper.outerWidth(this.$refs.containerRef), o = domHelper.outerHeight(this.$refs.containerRef), d = i == "left" ? l.left : l.left + r - n, u = l.top + a;
      d + n > s.width + domHelper.getScrollLeft() ? d = l.left + r - n : d < 0 && (d = l.left), u + o > s.height + domHelper.getScrollTop() && (u = l.top - o - 1), u < domHelper.getScrollTop() && (u = domHelper.getScrollTop() + 1), this.left = d, this.top = u;
    },
    alignContextMenu() {
      let e = domHelper.getViewport(), i = domHelper.outerWidth(this.$refs.containerRef), s = domHelper.outerHeight(this.$refs.containerRef);
      this.left + i > e.width + domHelper.getScrollLeft() && (this.left -= i), s > e.height + domHelper.getScrollTop() ? this.top = domHelper.getScrollTop() + 1 : this.top + s > e.height + domHelper.getScrollTop() && (this.top = e.height + domHelper.getScrollTop() - s - 1);
    }
  },
  render() {
    return createVNode("span", {
      class: "menu-inline"
    }, [createVNode("div", {
      ref: "containerRef",
      class: this.containerClasses,
      style: this.containerStyle,
      onMouseover: this.onMouseOver,
      onMouseout: this.onMouseOut
    }, [createVNode("div", {
      class: "menu-shadow"
    }, null), createVNode("div", {
      class: "menu f-column f-full " + (this.menuCls || ""),
      style: this.menuStyle
    }, [this.$slots.default()]), createVNode("div", {
      class: "menu-line"
    }, null)])]);
  }
}, SubMenu = {
  name: "SubMenu",
  props: {
    menuCls: String,
    menuStyle: Object,
    menuWidth: [Number, String]
  },
  data() {
    return {
      subItems: [],
      left: 0,
      top: 0,
      zIndex: window.MenuZIndex++
    };
  },
  computed: {
    menu() {
      return this.$parent.menu;
    },
    menuWidthState() {
      return domHelper.toStyleValue(this.menuWidth);
    },
    menuClasses() {
      return ["menu-container", {
        "f-hide": !this.$parent.isActived
      }];
    },
    menuStyles() {
      return {
        width: this.menuWidthState,
        left: this.left + "px",
        top: this.top + "px",
        zIndex: this.zIndex
      };
    }
  },
  mounted() {
    this.$parent.subMenu = this;
  },
  beforeUnmount() {
    this.$parent.subMenu = null;
  },
  methods: {
    addItem(e) {
      this.subItems.push(e);
    },
    removeItem(e) {
      let i = this.subItems.indexOf(e);
      i >= 0 && this.subItems.splice(i, 1);
    },
    unhighlight() {
      this.subItems.forEach((e) => {
        e.unhighlight();
      });
    },
    alignMenu() {
      this.zIndex = window.MenuZIndex++;
      let e = domHelper.getViewport(), i = domHelper.offset(this.$parent.$el), s = domHelper.outerWidth(this.$el), l = domHelper.outerHeight(this.$el), a = domHelper.outerWidth(this.$parent.$el) - 1;
      a + i.left + s > e.width + domHelper.getScrollLeft() && (a = -s - 1);
      let n = -4;
      l > e.height + domHelper.getScrollTop() ? n = -i.top + domHelper.getScrollTop() : n + i.top + l > e.height + domHelper.getScrollTop() && (n = e.height + domHelper.getScrollTop() - i.top - l - 2), this.left = a, this.top = n;
    }
  },
  render() {
    return createVNode("div", {
      class: this.menuClasses,
      style: this.menuStyles
    }, [createVNode("div", {
      class: "menu-shadow"
    }, null), createVNode("div", {
      class: "menu-line"
    }, null), createVNode("div", {
      class: "menu f-column f-full " + (this.menuCls || this.menu.menuCls),
      style: this.menuStyle || this.menu.menuStyle
    }, [this.$slots.default()])]);
  }
}, MenuItem = {
  name: "MenuItem",
  props: {
    value: [Number, String],
    text: String,
    iconCls: String,
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      isActived: !1,
      subMenu: null
    };
  },
  computed: {
    menu() {
      return this.$parent.$options.name == "Menu" ? this.$parent : this.$parent.menu;
    },
    itemClasses() {
      return ["menu-item", {
        "menu-active": this.isActived,
        "menu-item-disabled": this.disabled,
        "menu-active-disabled": this.disabled && this.isActived
      }];
    }
  },
  mounted() {
    this.$parent.addItem(this);
  },
  beforeUnmount() {
    this.$parent.removeItem(this);
  },
  methods: {
    highlight() {
      this.$parent.subItems.forEach((e) => {
        e.unhighlight();
      }), this.isActived = !0, this.subMenu && this.$nextTick(() => this.subMenu.alignMenu());
    },
    unhighlight() {
      this.subMenu && this.subMenu.unhighlight(), this.isActived = !1;
    },
    onClickItem(e) {
      e.stopPropagation(), !this.disabled && (this.menu.$emit("itemClick", this.value || this.text), this.menu.afterItemClick(this.value || this.text), this.subMenu || (this.menu.unhighlight(), this.menu.hide()));
    }
  },
  render() {
    return createVNode("div", {
      class: this.itemClasses,
      onMouseenter: this.highlight,
      onMouseleave: this.unhighlight,
      onClick: this.onClickItem
    }, [!this.$slots.item && createVNode("div", {
      class: "menu-text"
    }, [this.text]), this.$slots.item && this.$slots.item(), this.iconCls && createVNode("div", {
      class: ["menu-icon", this.iconCls]
    }, null), this.subMenu && createVNode("div", {
      class: "menu-rightarrow"
    }, null), this.$slots.default && this.$slots.default()]);
  }
}, MenuSep = {
  name: "MenuSep",
  render() {
    return createVNode("div", {
      class: "menu-sep"
    }, null);
  }
}, MenuButton = {
  name: "MenuButton",
  extends: LinkButton,
  props: {
    menuAlign: {
      type: String,
      default: "left"
    },
    duration: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      menu: null,
      timer: null
    };
  },
  computed: {
    isEmpty() {
      return !this.text && !this.$slots.text;
    },
    innerCls() {
      let e = LinkButton.computed.innerCls.call(this);
      return e += " m-btn m-btn-" + this.size, this.menu && !this.menu.closed && (e += this.plain ? " m-btn-plain-active" : " m-btn-active"), e;
    }
  },
  mounted() {
  },
  methods: {
    setMenu(e) {
      this.menu = e;
    },
    onClick(e) {
      LinkButton.methods.onClick.call(this, e), this.showMenu();
    },
    onMouseEnter() {
      this.disabled || (this.timer = setTimeout(() => {
        this.showMenu();
      }, this.duration));
    },
    onMouseLeave() {
      this.disabled || (clearTimeout(this.timer), this.menu && this.menu.delayHide());
    },
    showMenu() {
      this.disabled || this.menu && this.menu.showAt(this.$refs.btnRef, this.menuAlign);
    },
    renderInner() {
      let e = "";
      return this.isEmpty ? e = "" : this.text ? e = this.text : this.$slots.default && (e = this.$slots.default()), createVNode(Fragment, null, [createVNode("span", {
        class: this.isEmpty ? "l-btn-text l-btn-empty" : "l-btn-text"
      }, [e]), createVNode("span", {
        class: this.btnIconCls
      }, null), createVNode("span", {
        class: "m-btn-downarrow"
      }, null), createVNode("span", {
        class: "m-btn-line"
      }, null), this.$slots.default && this.$slots.default()]);
    }
  },
  render() {
    return createVNode("a", {
      ref: "btnRef",
      href: this.href || "#",
      class: this.innerCls,
      style: Object.assign({}, this.$attrs.style, this.btnStyle),
      onClick: this.onClick,
      onMouseenter: this.onMouseEnter,
      onMouseleave: this.onMouseLeave,
      onFocus: this.focus,
      onBlur: this.blur
    }, [createVNode("span", {
      class: this.btnLeftCls
    }, [this.renderInner()]), this.renderOthers()]);
  }
}, SplitButton = {
  name: "SplitButton",
  extends: MenuButton,
  computed: {
    innerCls() {
      let e = MenuButton.computed.innerCls.call(this);
      return e += " s-btn s-btn-" + this.size, this.menu && !this.menu.closed && (e += this.plain ? " s-btn-plain-active" : " s-btn-active"), e;
    }
  },
  methods: {
    onClick(e) {
      LinkButton.methods.onClick.call(this, e);
    },
    renderInner() {
      let e = "";
      return this.isEmpty ? e = "" : this.text ? e = this.text : this.$slots.default && (e = this.$slots.default()), createVNode(Fragment, null, [createVNode("span", {
        class: this.isEmpty ? "l-btn-text l-btn-empty" : "l-btn-text"
      }, [e]), createVNode("span", {
        class: this.btnIconCls
      }, null), createVNode("span", {
        class: "m-btn-downarrow"
      }, null), createVNode("span", {
        class: "m-btn-line",
        onClick: this.showMenu,
        onMouseenter: this.onMouseEnter,
        onMouseleave: this.onMouseLeave
      }, null), this.$slots.default()]);
    }
  },
  render() {
    return createVNode("a", {
      ref: "btnRef",
      href: this.href || "#",
      class: this.innerCls,
      style: Object.assign({}, this.$attrs.style, this.btnStyle),
      onClick: this.onClick,
      onFocus: this.focus,
      onBlur: this.blur
    }, [createVNode("span", {
      class: this.btnLeftCls
    }, [this.renderInner()]), this.renderOthers()]);
  }
}, PasswordBox = {
  name: "PasswordBox",
  extends: InputBase,
  props: {
    passwordChar: {
      type: String,
      default: "●"
    },
    checkInterval: {
      type: Number,
      default: 200
    },
    lastDelay: {
      type: Number,
      default: 500
    },
    showEye: {
      type: Boolean,
      default: !0
    },
    eyeAlign: {
      type: String,
      default: "right"
    },
    revealed: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      revealedState: this.revealed,
      lastTimer: null,
      cursorPos: -1
    };
  },
  computed: {
    eyeClasses() {
      return ["textbox-addon f-column f-noshrink", {
        "f-order0": this.eyeAlign == "left",
        "f-order6": this.eyeAlign == "right"
      }];
    },
    eyeIconClasses() {
      return ["textbox-icon f-full", {
        "passwordbox-open": this.revealedState,
        "passwordbox-close": !this.revealedState
      }];
    },
    text() {
      return this.focused || (this.textState = this.revealedState ? this.valueState : (this.valueState || "").replace(/./ig, this.passwordChar)), this.focused && this.cursorPos != -1 && this.$nextTick(() => {
        this.setSelectionRange(this.cursorPos, this.cursorPos), this.cursorPos = -1;
      }), this.textState;
    }
  },
  methods: {
    afterFocus() {
      this.processing();
    },
    afterBlur() {
      clearTimeout(this.lastTimer), this.convert(this.textState, !0), this.cursorPos = -1;
    },
    processing() {
      let e = this.textState, i = () => {
        this.focused && (e != this.textState && (e = this.textState, clearTimeout(this.lastTimer), this.convert(this.textState), this.lastTimer = setTimeout(() => {
          this.convert(this.textState, !0);
        }, this.lastDelay)), setTimeout(() => {
          i();
        }, this.checkInterval));
      };
      i();
    },
    convert(e, i = !1) {
      if (this.revealedState) {
        this.setValue(e);
        return;
      }
      if (!e) {
        this.setValue(e);
        return;
      }
      let s = this.passwordChar, l = e.split(""), r = this.valueState ? this.valueState.split("") : [];
      for (let o = 0; o < l.length; o++) {
        let d = l[o];
        d != r[o] && d != s && r.splice(o, 0, d);
      }
      let a = this.getSelectionStart();
      l.length < r.length && r.splice(a, r.length - l.length, "");
      for (var n = 0; n < l.length; n++)
        (i || n != a - 1) && (l[n] = s);
      this.setValue(r.join("")), this.textState = l.join(""), this.cursorPos = a;
    },
    renderOthers() {
      return createVNode(Fragment, null, [this.showEye && createVNode("span", {
        class: this.eyeClasses,
        onClick: () => this.revealedState = !this.revealedState
      }, [createVNode("span", {
        class: this.eyeIconClasses
      }, null)])]);
    }
  }
}, Calendar = {
  name: "Calendar",
  props: {
    weeks: {
      type: Array,
      default: () => window.Locale.t("Calendar.weeks", ["S", "M", "T", "W", "T", "F", "S"])
    },
    months: {
      type: Array,
      default: () => window.Locale.t("Calendar.months", ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
    },
    border: {
      type: Boolean,
      default: !0
    },
    showWeek: {
      type: Boolean,
      default: !1
    },
    weekNumberHeader: {
      type: String,
      default: ""
    },
    firstDay: {
      type: Number,
      default: 0
    },
    year: {
      type: Number,
      default: (/* @__PURE__ */ new Date()).getFullYear()
    },
    month: {
      type: Number,
      default: (/* @__PURE__ */ new Date()).getMonth() + 1
    },
    selection: Date,
    validator: {
      type: Function,
      default: () => !0
    }
  },
  data() {
    return {
      yearState: this.year,
      monthState: this.month,
      highlightDay: null,
      highlightMonth: null,
      headerData: [],
      bodyData: [],
      showMenu: !1,
      selectionState: this.selection
    };
  },
  computed: {
    saIndex() {
      let e = 6 - this.firstDay;
      return e >= 7 && (e -= 7), e;
    },
    suIndex() {
      let e = this.saIndex + 1;
      return e >= 7 && (e -= 7), e;
    }
  },
  watch: {
    year() {
      this.yearState = this.year, this.bodyData = this.getWeeks();
    },
    yearState() {
      this.bodyData = this.getWeeks();
    },
    month() {
      this.monthState = this.month, this.bodyData = this.getWeeks();
    },
    monthState() {
      this.bodyData = this.getWeeks();
    },
    firstDay() {
      this.headerData = this.getHeaderData(), this.bodyData = this.getWeeks();
    },
    selection() {
      this.selectionState = this.selection, this.moveTo(this.selectionState);
    }
  },
  created() {
    this.moveTo(this.selectionState), this.headerData = this.getHeaderData(), this.bodyData = this.getWeeks();
  },
  methods: {
    onDayClick(e) {
      this.isValid(e) && (this.yearState = e[0], this.monthState = e[1], this.selectDate(new Date(e[0], e[1] - 1, e[2])));
    },
    onMonthClick(e, i) {
      i.stopPropagation();
      let s = this.months.indexOf(e);
      s >= 0 && (this.monthState = s + 1, this.showMenu = !1, this.highlightMonth = null);
    },
    isToday(e) {
      let i = /* @__PURE__ */ new Date(), s = i.getFullYear(), l = i.getMonth() + 1, r = i.getDate();
      return s == e[0] && l == e[1] && r == e[2];
    },
    isHighlighted(e) {
      return !!(this.highlightDay && this.highlightDay.join(",") == e.join(","));
    },
    isSelected(e) {
      if (this.selectionState) {
        let i = this.selectionState.getFullYear(), s = this.selectionState.getMonth() + 1, l = this.selectionState.getDate();
        if (i == e[0] && s == e[1] && l == e[2])
          return !0;
      }
      return !1;
    },
    isValid(e) {
      let i = new Date(e[0], e[1] - 1, e[2]);
      return this.validator(i);
    },
    isDiff(e, i) {
      return e != null && i == null || e == null && i != null || e != null && i != null && this.toArray(e).join(",") != this.toArray(i).join(",");
    },
    toDate(e) {
      return new Date(e[0], e[1] - 1, e[2]);
    },
    toArray(e) {
      return [e.getFullYear(), e.getMonth() + 1, e.getDate()];
    },
    calcWeekNumber(e) {
      let i = new Date(e[0][0], e[0][1] - 1, e[0][2]);
      return this.getWeekNumber(i);
    },
    nextYear() {
      this.yearState++;
    },
    prevYear() {
      this.yearState--;
    },
    nextMonth() {
      this.monthState == 12 ? (this.yearState++, this.monthState = 1) : this.monthState++;
    },
    prevMonth() {
      this.monthState == 1 ? (this.yearState--, this.monthState = 12) : this.monthState--;
    },
    getWeekNumber(e) {
      var i = new Date(e.getTime());
      i.setDate(i.getDate() + 4 - (i.getDay() || 7));
      var s = i.getTime();
      return i.setMonth(0), i.setDate(1), Math.floor(Math.round((s - i.getTime()) / 864e5) / 7) + 1;
    },
    getHeaderData() {
      let e = this.weeks.slice(this.firstDay, this.weeks.length), i = this.weeks.slice(0, this.firstDay);
      return e.concat(i);
    },
    getWeeks() {
      let e = [], i = new Date(this.yearState, this.monthState, 0).getDate();
      for (let o = 1; o <= i; o++)
        e.push([this.yearState, this.monthState, o]);
      let s = [], l = [], r = -1;
      for (; e.length > 0; ) {
        let o = e.shift();
        l.push(o);
        let d = new Date(o[0], o[1] - 1, o[2]).getDay();
        r == d ? d = 0 : d == (this.firstDay == 0 ? 7 : this.firstDay) - 1 && (s.push(l), l = []), r = d;
      }
      l.length && s.push(l);
      let a = s[0];
      if (a.length < 7)
        for (; a.length < 7; ) {
          let o = a[0], d = new Date(o[0], o[1] - 1, o[2] - 1);
          a.unshift([d.getFullYear(), d.getMonth() + 1, d.getDate()]);
        }
      else {
        let o = a[0], d = [];
        for (let u = 1; u <= 7; u++) {
          let c = new Date(o[0], o[1] - 1, o[2] - u);
          d.unshift([c.getFullYear(), c.getMonth() + 1, c.getDate()]);
        }
        s.unshift(d);
      }
      let n = s[s.length - 1];
      for (; n.length < 7; ) {
        let o = n[n.length - 1], d = new Date(o[0], o[1] - 1, o[2] + 1);
        n.push([d.getFullYear(), d.getMonth() + 1, d.getDate()]);
      }
      if (s.length < 6) {
        let o = n[n.length - 1], d = [];
        for (let u = 1; u <= 7; u++) {
          let c = new Date(o[0], o[1] - 1, o[2] + u);
          d.push([c.getFullYear(), c.getMonth() + 1, c.getDate()]);
        }
        s.push(d);
      }
      return s;
    },
    moveTo(e) {
      e && (this.yearState = e.getFullYear(), this.monthState = e.getMonth() + 1);
    },
    highlightDate(e) {
      this.highlightDay = e ? this.toArray(e) : null;
    },
    selectDate(e = null) {
      e || (this.highlightDay ? e = this.toDate(this.highlightDay) : e = this.selectionState), this.isDiff(this.selectionState, e) && (this.selectionState = e, this.$emit("selectionChange", this.selectionState));
    },
    navDate(e) {
      let i = this.highlightDay ? this.toDate(this.highlightDay) : this.selectionState;
      i ? i = new Date(i.getFullYear(), i.getMonth(), i.getDate() + e) : i = /* @__PURE__ */ new Date(), this.moveTo(i), this.highlightDate(i);
    },
    renderDays() {
      return createVNode("table", {
        class: "calendar-dtable",
        cellspacing: "0",
        cellpadding: "0",
        border: "0"
      }, [createVNode("thead", null, [createVNode("tr", null, [this.showWeek && createVNode("th", null, [this.weekNumberHeader]), this.headerData.map((e) => createVNode("th", null, [e]))])]), createVNode("tbody", null, [this.bodyData.map((e) => createVNode("tr", null, [this.showWeek && createVNode("td", {
        class: "calendar-week"
      }, [this.calcWeekNumber(e)]), e.map((i, s) => createVNode("td", {
        class: ["calendar-day", {
          "calendar-other-month": i[0] != this.yearState || i[1] != this.monthState,
          "calendar-saturday": s == this.saIndex,
          "calendar-sunday": s == this.suIndex,
          "calendar-today": this.isToday(i),
          "calendar-selected": this.isSelected(i),
          "calendar-disabled": !this.isValid(i),
          "calendar-nav-hover": this.isHighlighted(i)
        }],
        onMouseenter: () => this.highlightDay = this.isValid(i) ? i : null,
        onMouseleave: () => this.highlightDay = null,
        onClick: (l) => this.onDayClick(i, l)
      }, [this.$slots.default && this.$slots.default({
        date: this.toDate(i)
      }), !this.$slots.default && i[2]]))]))])]);
    },
    renderMenu() {
      return this.showMenu ? createVNode("div", {
        class: "calendar-menu f-column"
      }, [createVNode("div", {
        class: "calendar-menu-year-inner"
      }, [createVNode("span", {
        class: "calendar-nav calendar-menu-prev",
        onClick: this.prevYear
      }, null), createVNode("span", null, [withDirectives(createVNode("input", {
        class: "calendar-menu-year",
        type: "text",
        "onUpdate:modelValue": (e) => this.yearState = e
      }, null), [[vModelText, this.yearState]])]), createVNode("span", {
        class: "calendar-nav calendar-menu-next",
        onClick: this.nextYear
      }, null)]), createVNode("div", {
        class: "calendar-menu-month-inner f-full"
      }, [createVNode("div", {
        class: "calendar-content"
      }, [createVNode("table", {
        class: "calendar-mtable"
      }, [createVNode("tbody", null, [[0, 1, 2].map((e) => createVNode("tr", null, [[0, 1, 2, 3].map((i) => createVNode("td", {
        class: ["calendar-nav calendar-menu-month", {
          "calendar-nav-hover": this.highlightMonth == this.months[e * 4 + i],
          "calendar-selected": this.months[this.monthState - 1] == this.months[e * 4 + i]
        }],
        onMouseenter: () => this.highlightMonth = this.months[e * 4 + i],
        onMouseleave: () => this.highlightMonth = null,
        onClick: (s) => this.onMonthClick(this.months[e * 4 + i], s)
      }, [this.months[e * 4 + i]]))]))])])])])]) : null;
    }
  },
  render() {
    return createVNode("div", {
      class: "calendar f-column" + (this.border ? "" : " calendar-noborder")
    }, [createVNode("div", {
      class: "calendar-header f-row f-noshrink"
    }, [createVNode("div", {
      class: "calendar-title f-row f-full f-content-center"
    }, [createVNode("span", {
      class: "calendar-text",
      onClick: () => this.showMenu = !this.showMenu
    }, [this.months[this.monthState - 1], createTextVNode(" "), this.yearState])]), createVNode("div", {
      class: "calendar-nav calendar-prevmonth",
      onClick: this.prevMonth
    }, null), createVNode("div", {
      class: "calendar-nav calendar-nextmonth",
      onClick: this.nextMonth
    }, null), createVNode("div", {
      class: "calendar-nav calendar-prevyear",
      onClick: this.prevYear
    }, null), createVNode("div", {
      class: "calendar-nav calendar-nextyear",
      onClick: this.nextYear
    }, null)]), createVNode("div", {
      class: "calendar-body f-full"
    }, [createVNode("div", {
      class: "calendar-content"
    }, [this.renderDays(), this.renderMenu()])])]);
  }
}, DateBox = {
  name: "DateBox",
  extends: ComboBase,
  components: {
    Calendar
  },
  props: {
    value: Date,
    modelValue: Date,
    format: {
      type: String,
      default: "MM/dd/yyyy"
    },
    currentText: {
      type: String,
      default: () => window.Locale.t("DateBox.currentText", "Today")
    },
    closeText: {
      type: String,
      default: () => window.Locale.t("DateBox.closeText", "Close")
    },
    okText: {
      type: String,
      default: () => window.Locale.t("DateBox.okText", "Ok")
    },
    showWeek: {
      type: Boolean,
      default: !1
    },
    weekNumberHeader: {
      type: String,
      default: ""
    },
    firstDay: {
      type: Number,
      default: 0
    },
    formatter: Function,
    parser: Function,
    validator: {
      type: Function,
      default: () => !0
    },
    reversed: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      timer: null
    };
  },
  computed: {
    text() {
      return !this.focused && this.panelClosed && (this.textState = (this.formatter || this.defaultFormatter)(this.valueState)), this.textState;
    }
  },
  mounted() {
    domHelper.bind(this.$refs.inputRef, "keydown", this.onKeyDown);
  },
  beforeUnmount() {
    domHelper.unbind(this.$refs.inputRef, "keydown", this.onKeyDown);
  },
  methods: {
    afterBlur() {
      if (FieldBase.methods.afterBlur.call(this), !this.panelClosed) {
        if (!this.textState.trim())
          this.setValue(null);
        else if (!this.reversed) {
          const e = (this.parser || this.defaultParser)(this.textState.trim());
          e.getFullYear() || e.setFullYear(1900), this.setValue(e);
        }
      }
    },
    onInput(e) {
      this.textState = e.target.value, this.focused && (this.panelClosed && this.openPanel(), clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.doFilter(this.textState);
      }, this.delay));
    },
    onSelectionChange(e) {
      this.setValue(e), this.closePanel(), this.$emit("selectionChange", e);
    },
    onKeyDown(e) {
      if (this.panelClosed && e.which == 40) {
        this.openPanel(), e.preventDefault();
        return;
      }
      if (!this.panelClosed)
        switch (e.which) {
          case 40:
            this.$refs.calendar.navDate(7), e.preventDefault();
            break;
          case 38:
            this.$refs.calendar.navDate(-7), e.preventDefault();
            break;
          case 37:
            this.$refs.calendar.navDate(-1), e.preventDefault();
            break;
          case 39:
            this.$refs.calendar.navDate(1), e.preventDefault();
            break;
          case 13:
            this.$refs.calendar.selectDate(), this.closePanel(), this.textState = (this.formatter || this.defaultFormatter)(this.valueState), e.preventDefault();
            break;
        }
    },
    defaultFormatter(e) {
      return dateHelper.formatDate(e, this.format);
    },
    defaultParser(e) {
      return dateHelper.parseDate(e, this.format);
    },
    doFilter(e) {
      let i = (this.parser || this.defaultParser)(e);
      i || (i = this.valueState), this.$refs.calendar.moveTo(i), this.$refs.calendar.highlightDate(i);
    },
    selectToday() {
      this.setValue(/* @__PURE__ */ new Date()), this.closePanel();
    },
    renderPanel() {
      if (this.panelClosed)
        return null;
      const e = Object.assign({}, this.panelStyle, {
        left: this.panelLeft + "px",
        top: this.panelTop + "px"
      });
      return createVNode("div", {
        ref: "panelRef",
        class: "panel-body panel-body-noheader combo-panel combo-p f-column",
        style: e
      }, [this.renderContent()]);
    },
    renderContent() {
      return createVNode(Fragment, null, [createVNode(Calendar, {
        ref: "calendar",
        class: "f-full",
        border: !1,
        showWeek: this.showWeek,
        weekNumberHeader: this.weekNumberHeader,
        firstDay: this.firstDay,
        validator: this.validator,
        selection: this.valueState,
        onSelectionChange: this.onSelectionChange
      }, null), createVNode("div", {
        class: "datebox-button f-row"
      }, [createVNode("a", {
        href: "javascript:;",
        class: "datebox-button-a f-full",
        onClick: this.selectToday
      }, [this.currentText]), createVNode("a", {
        href: "javascript:;",
        class: "datebox-button-a f-full",
        onClick: this.closePanel
      }, [this.closeText])])]);
    }
  }
}, DraggableProxy = {
  name: "DraggableProxy",
  props: {
    proxyCls: String,
    proxyStyle: Object
  },
  data() {
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      reverting: !1,
      closed: !0
    };
  },
  computed: {
    proxyClasses() {
      return [this.proxyCls, {
        "draggable-reverting": this.reverting
      }];
    },
    proxyStyles() {
      return [this.proxyStyle, {
        position: "absolute",
        left: this.left + "px",
        top: this.top + "px",
        // width: this.width+'px',
        // height: this.height+'px',
        display: this.closed ? "none" : "block"
      }];
    }
  },
  mounted() {
    document.body.appendChild(this.$refs.proxyRef);
  },
  beforeUnmount() {
    this.$refs.proxyRef && this.$el.appendChild(this.$refs.proxyRef);
  },
  methods: {
    onTransitionEnd() {
      this.reverting = !1, this.closed = !0;
    }
  },
  render() {
    return createVNode("div", {
      style: "display:none"
    }, [createVNode("div", {
      ref: "proxyRef",
      class: this.proxyClasses,
      style: this.proxyStyles,
      onTransitionend: this.onTransitionEnd
    }, [this.$slots.default()])]);
  }
};
window.DialogZIndex = window.DialogZIndex || 9e3;
const Dialog = {
  name: "Dialog",
  extends: Panel,
  directives: {
    Draggable,
    Resizable
  },
  props: {
    title: String,
    border: {
      type: Boolean,
      default: !1
    },
    borderType: {
      type: String,
      default: "thick"
      // thin,thick,none
    },
    closable: {
      type: Boolean,
      default: !0
    },
    dialogCls: String,
    dialogStyle: Object,
    modal: {
      type: Boolean,
      default: !1
    },
    inline: {
      type: Boolean,
      default: !1
    },
    draggable: {
      type: Boolean,
      default: !1
    },
    resizable: {
      type: Boolean,
      default: !1
    },
    draggableOptions: Object,
    resizableOptions: Object
  },
  data() {
    return {
      dragOpts: null,
      resizeOpts: null,
      maskEl: null,
      left: null,
      top: null,
      width: null,
      height: null
    };
  },
  computed: {
    panelStyles() {
      return [this.panelStyle, this.dialogStyle, {
        left: this.left ? this.left + "px" : this.dialogStyle ? this.dialogStyle.left : null,
        top: this.left ? this.top + "px" : this.dialogStyle ? this.dialogStyle.top : null,
        width: this.width ? this.width + "px" : this.dialogStyle ? this.dialogStyle.width : null,
        height: this.height ? this.height + "px" : this.dialogStyle ? this.dialogStyle.height : null
      }];
    },
    panelClasses() {
      let e = "window window-shadow";
      return this.borderType == "none" ? e += " window-thinborder window-noborder" : this.borderType == "thin" && (e += " window-thinborder"), this.inline && (e += " inline"), ["panel f-column", e, this.panelCls, this.dialogCls];
    },
    headerClasses() {
      return Panel.computed.headerClasses.call(this).concat("window-header");
    },
    bodyClasses() {
      let e = "window-body";
      return this.hasHeader || (e += " window-body-noheader"), Panel.computed.bodyClasses.call(this).concat(e);
    },
    footerClasses() {
      return Panel.computed.footerClasses.call(this).concat("window-footer");
    }
  },
  watch: {
    draggable() {
      this.setDragOpts();
    },
    resizable() {
      this.setResizeOpts();
    },
    draggableOptions() {
      this.setDragOpts();
    },
    resizableOptions() {
      this.setResizeOpts();
    },
    closedState() {
      this.$nextTick(() => {
        this.initDialog(), this.setDragOpts(), this.setResizeOpts();
      }), this.closedState ? this.$emit("close") : this.$emit("open");
    }
  },
  mounted() {
    this.setDragOpts(), this.setResizeOpts(), this.initDialog();
  },
  methods: {
    setDragOpts() {
      this.dragOpts = Object.assign({
        edge: 5,
        disabled: !this.draggable,
        handle: this.$refs.headerRef
      }, this.draggableOptions, {
        dragEnd: (e) => {
          this.left = e.left, this.top = e.top, this.draggableOptions && this.draggableOptions.dragEnd && this.draggableOptions.dragEnd(e);
        }
      });
    },
    setResizeOpts() {
      this.resizeOpts = Object.assign({
        edge: 5,
        disabled: !this.resizable
      }, this.resizableOptions, {
        resizeStop: (e) => {
          this.width = e.width, this.height = e.height, this.resizableOptions && this.resizableOptions.resizeStop && this.resizableOptions.resizeStop(e);
        }
      });
    },
    initDialog() {
      this.closedState ? this.closeMask() : this.$refs.panelRef && (this.inline || document.body.appendChild(this.$refs.panelRef), this.openMask(), this.displaying());
    },
    openMask() {
      this.modal && !this.maskEl && (this.maskEl = document.createElement("div"), domHelper.addClass(this.maskEl, "window-mask"), this.inline ? (domHelper.addClass(this.maskEl, "inline"), this.$el.appendChild(this.maskEl)) : document.body.appendChild(this.maskEl));
    },
    closeMask() {
      this.maskEl && (this.inline ? this.$el.removeChild(this.maskEl) : document.body.removeChild(this.maskEl), this.maskEl = null);
    },
    open() {
      this.closedState = !1;
    },
    close() {
      this.closedState = !0;
    },
    displaying() {
      this.moveToTop(), this.left = parseInt(this.$refs.panelRef.style.left) || null, this.top = parseInt(this.$refs.panelRef.style.top) || null, this.left == null && this.hcenter(), this.top == null && this.vcenter();
    },
    moveToTop() {
      this.maskEl && (this.maskEl.style.zIndex = String(window.DialogZIndex++)), this.$refs.panelRef && (this.$refs.panelRef.style.zIndex = String(window.DialogZIndex++));
    },
    hcenter() {
      if (this.$refs.panelRef) {
        let i = domHelper.getViewport().width;
        if (this.inline) {
          let l = domHelper.closest(this.$refs.panelRef, ".dialog-inline");
          i = domHelper.outerWidth(l);
        }
        let s = domHelper.outerWidth(this.$refs.panelRef);
        this.left = (i - s) / 2;
      }
    },
    vcenter() {
      if (this.$refs.panelRef) {
        let i = domHelper.getViewport().height, s = domHelper.getScrollTop();
        if (this.inline) {
          let r = domHelper.closest(this.$refs.panelRef, ".dialog-inline");
          i = domHelper.outerHeight(r), s = 0;
        }
        let l = domHelper.outerHeight(this.$refs.panelRef);
        this.top = (i - l) / 2 + s;
      }
    },
    center() {
      this.hcenter(), this.vcenter();
    }
  },
  render() {
    return createVNode("div", {
      class: "dialog-inline"
    }, [!this.closedState && withDirectives(createVNode("div", {
      ref: "panelRef",
      class: this.panelClasses,
      style: this.panelStyles
    }, [this.panelHeader(), this.panelBody(), this.panelFooter()]), [[resolveDirective("draggable"), this.dragOpts], [resolveDirective("resizable"), this.resizeOpts]])]);
  }
}, Drawer = {
  name: "Drawer",
  extends: Dialog,
  props: {
    borderType: {
      type: String,
      default: "none"
      // thin,thick,none
    },
    collapsed: {
      type: Boolean,
      default: !0
    },
    collapsible: {
      type: Boolean,
      default: !1
    },
    closable: {
      type: Boolean,
      default: !1
    },
    modal: {
      type: Boolean,
      default: !0
    },
    drawerCls: String,
    drawerStyle: Object,
    maskClosable: {
      type: Boolean,
      default: !0
    },
    animate: {
      type: Boolean,
      default: !0
    },
    region: {
      type: String,
      default: "west"
    },
    expandIconCls: String,
    collapseIconCls: String
  },
  data() {
    return {
      isExpanding: !1,
      isChanging: !1,
      collapseToShrinkBody: !1
    };
  },
  computed: {
    panelStyles() {
      return [this.panelStyle, this.drawerStyle, {
        left: this.left ? this.left + "px" : this.drawerStyle ? this.drawerStyle.left : null,
        top: this.left ? this.top + "px" : this.drawerStyle ? this.drawerStyle.top : null,
        width: this.width ? this.width + "px" : this.drawerStyle ? this.drawerStyle.width : null,
        height: this.height ? this.height + "px" : this.drawerStyle ? this.drawerStyle.height : null
      }];
    },
    panelClasses() {
      let e = "drawer window window-shadow";
      return this.borderType == "none" ? e += " window-thinborder window-noborder" : this.borderType == "thin" && (e += " window-thinborder"), this.inline && (e += " inline"), ["panel f-column", e, this.panelCls, this.drawerCls, {
        "layout-collapsed": this.collapsedState,
        "layout-animate": this.animate && !this.isChanging,
        "layout-panel-east": this.region == "east",
        "layout-panel-west": this.region == "west",
        "layout-panel-south": this.region == "south",
        "layout-panel-north": this.region == "north"
      }];
    },
    collapsibleClasses() {
      let e = {
        west: "left",
        east: "right",
        north: "up",
        south: "down"
      };
      return this.collapsedState ? this.expandIconCls ? this.expandIconCls : "layout-button-" + e[this.region] : this.collapseIconCls ? this.collapseIconCls : "layout-button-" + e[this.region];
    }
  },
  watch: {
    region() {
      this.isChanging = !0, setTimeout(() => this.isChanging = !1);
    },
    collapsed() {
      this.collapsed ? this.collapse() : this.expand();
    }
  },
  mounted() {
    this.$refs.panelRef && domHelper.bind(this.$refs.panelRef, "transitionend", this.onSlideEnd);
  },
  beforeUnmount() {
    this.$refs.panelRef && domHelper.unbind(this.$refs.panelRef, "transitionend"), this.$el.appendChild(this.$refs.panelRef), this.close();
  },
  // destroyed() {
  // },
  methods: {
    onSlideEnd() {
      this.collapsedState ? this.$emit("collapse") : this.$emit("expand");
    },
    initDialog() {
      this.closedState ? this.closeMask() : this.$refs.panelRef && (this.inline || document.body.appendChild(this.$refs.panelRef), this.displaying());
    },
    displaying() {
      this.moveToTop();
    },
    clickCollapsibleTool() {
      this.collapse();
    },
    onClickMask() {
      this.maskClosable && this.collapse();
    },
    expand() {
      this.collapsedState = !1, this.isExpanding = !0, this.openMask(), this.$nextTick(() => this.isExpanding = !1), this.animate || this.$emit("expand"), this.maskEl && (domHelper.addClass(this.maskEl, "drawer-mask"), domHelper.bind(this.maskEl, "click", this.onClickMask));
    },
    collapse() {
      this.maskEl && domHelper.unbind(this.maskEl, "click"), this.collapsedState = !0, this.closeMask(), this.animate || this.$emit("collapse");
    }
  }
}, ProgressBar = {
  name: "ProgressBar",
  props: {
    value: {
      type: Number,
      default: 0
    },
    showValue: {
      type: Boolean,
      default: !1
    },
    barCls: String,
    barStyle: Object
  },
  computed: {
    barClasses() {
      return ["progressbar-value f-row f-content-center", this.barCls];
    },
    barStyles() {
      return [this.barStyle, {
        width: this.value + "%"
      }];
    }
  },
  render() {
    return createVNode("div", {
      class: "progressbar f-row"
    }, [createVNode("div", {
      class: this.barClasses,
      style: this.barStyles
    }, [this.showValue && createVNode("span", null, [this.value, createTextVNode("%")]), createVNode("slot", null, null)])]);
  }
}, TreeGridTitle = {
  name: "TreeGridTitle",
  props: {
    row: Object,
    column: Object,
    rowIndex: Number
  },
  render() {
    let e = "";
    return this.column.$slots.body ? e = this.column.$slots.body({
      row: this.row,
      column: this.column,
      rowIndex: this.rowIndex
    }) : this.column.$slots.cell ? e = this.column.$slots.cell({
      row: this.row,
      column: this.column,
      rowIndex: this.rowIndex
    }) : e = this.row[this.column.field], createVNode("span", {
      class: "tree-title"
    }, [e]);
  }
}, TreeGridRow = {
  name: "TreeGridRow",
  components: {
    GridBodyCell,
    TreeGridTitle
  },
  props: {
    gridBody: Object,
    row: Object,
    prow: Object,
    columns: Array,
    depth: Number,
    rowIndex: Number
  },
  data() {
    return {
      loading: !1
    };
  },
  computed: {
    grid() {
      return this.gridBody.view.grid;
    },
    indentWidth() {
      return this.isLeaf ? (this.depth + 1) * 16 : this.depth * 16;
    },
    isExpanded() {
      return !this.row.state || this.row.state == "open";
    },
    isCollapsed() {
      return !!(this.row.state && this.row.state == "closed");
    },
    isLeaf() {
      return this.row.state == "closed" ? !1 : this.row.children && this.row.children.length ? (this.loading = !1, !1) : !this.loading;
    },
    hitClasses() {
      return ["tree-hit", {
        "tree-expanded": this.isExpanded,
        "tree-collapsed": this.isCollapsed
      }];
    },
    iconClasses() {
      return ["tree-icon tree-folder", this.row.iconCls, {
        "tree-folder-open": this.isExpanded,
        "tree-file": this.isLeaf,
        "tree-loading": this.loading
      }];
    },
    checkboxClasses() {
      let i = ["unchecked", "checked", "indeterminate"].indexOf(this.row.checkState);
      return i == -1 && (i = 0), "tree-checkbox tree-checkbox" + i;
    }
  },
  mounted() {
    this.row.parent = this.prow;
  },
  methods: {
    isTreeField(e) {
      return e == this.gridBody.view.grid.treeField;
    },
    isEditable(e, i) {
      return !!(this.grid.isEditing(e, i) && i.editable);
    },
    doEdit(e, i) {
      i = domHelper.closest(i, "td"), this.grid.beginEdit(this.row, e), setTimeout(() => {
        let s = i.querySelector(".textbox-text");
        s && s.focus();
      });
    },
    toggle(e) {
      e.stopPropagation(), this.isExpanded ? (this.row.state = "closed", this.grid.$emit("rowCollapse", this.row)) : (this.loading = !0, this.row.state = "open", this.grid.$emit("rowExpand", this.row));
    },
    onCheckRow(e) {
      e.stopPropagation(), this.row.checkState == "checked" ? this.grid.uncheckRow(this.row) : this.grid.checkRow(this.row);
    },
    onRowClick(e, i) {
      i.stopPropagation(), this.grid.onRowClick(e);
    },
    onRowDblClick(e) {
      this.grid.$emit("rowDblClick", e);
    },
    onRowContextMenu(e, i) {
      this.grid.$emit("rowContextMenu", {
        row: e,
        originalEvent: i
      });
    },
    onCellClick(e, i) {
      this.grid.onCellClick(this.row, e, i), (this.grid.clickToEdit || this.grid.dblclickToEdit && this.grid.editingItem) && this.doEdit(e, i.target);
    },
    onCellDblClick(e, i) {
      this.grid.$emit("cellDblClick", {
        row: this.row,
        column: e
      }), this.grid.dblclickToEdit && this.doEdit(e, i.target);
    },
    onCellContextMenu(e, i) {
      this.grid.$emit("cellContextMenu", {
        row: this.row,
        column: e,
        originalEvent: i
      });
    },
    onCellKeyDown(e, i) {
      this.grid.editMode == "cell" && (i.which == 13 ? (i.stopPropagation(), this.grid.endEdit()) : i.which == 27 && (i.stopPropagation(), this.grid.cancelEdit()));
    }
  },
  render() {
    return createVNode("tr", {
      class: ["datagrid-row", {
        "datagrid-row-over": this.grid.isHighlighted(this.row),
        "datagrid-row-selected": this.grid.isSelected(this.row)
      }],
      onMouseenter: () => this.grid.highlightRow = this.row,
      onMouseleave: () => this.grid.highlightRow = null,
      onClick: (e) => this.onRowClick(this.row, e),
      onDblclick: (e) => this.onRowDblClick(this.row, e),
      onContextmenu: (e) => this.onRowContextMenu(this.row, e)
    }, [this.columns.map((e) => createVNode("td", {
      class: [{
        "datagrid-row-selected": this.grid.isSelected(this.row, e),
        "datagrid-row-over": this.grid.isHighlighted(this.row, e)
      }],
      onMouseenter: () => this.grid.highlightCell = {
        row: this.row,
        column: e
      },
      onMouseleave: () => this.grid.highlightCell = null,
      onClick: (i) => this.onCellClick(e, i),
      onDblclick: (i) => this.onCellDblClick(e, i),
      onContextmenu: (i) => this.onCellContextMenu(e, i),
      onKeydown: (i) => this.onCellKeyDown(e, i)
    }, [(!this.isTreeField(e.field) || this.isEditable(this.row, e)) && createVNode(GridBodyCell, {
      row: this.row,
      column: e
    }, null), this.isTreeField(e.field) && !this.isEditable(this.row, e) && createVNode("div", {
      class: ["datagrid-cell", {
        "datagrid-editable": this.isEditable(this.row, e)
      }],
      style: {
        textAlign: e.align || null
      }
    }, [!this.isEditable(this.row, e) && createVNode(Fragment, null, [createVNode("span", {
      class: "tree-indent",
      style: {
        width: this.indentWidth + "px"
      }
    }, null), !this.isLeaf && createVNode("span", {
      class: this.hitClasses,
      onClick: this.toggle
    }, null), createVNode("span", {
      class: this.iconClasses
    }, null), this.grid.checkbox && createVNode("span", {
      class: this.checkboxClasses,
      onClick: this.onCheckRow
    }, null), createVNode(TreeGridTitle, {
      row: this.row,
      column: e
    }, null)])])]))]);
  }
}, TreeGridChildren = {
  name: "TreeGridChildren",
  components: {
    TreeGridRow
  },
  directives: {
    SlideUpDown
  },
  props: {
    gridBody: Object,
    rows: {
      type: Array,
      default: () => []
    },
    prow: Object,
    columns: Array,
    depth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    grid() {
      return this.gridBody.view.grid;
    }
  },
  render() {
    return createVNode("table", {
      class: "datagrid-btable",
      border: "0",
      cellspacing: "0",
      cellpadding: "0"
    }, [createVNode("colgroup", null, [this.columns.map((e) => createVNode("col", {
      style: {
        width: e.widthState
      }
    }, null))]), createVNode("tbody", null, [(this.rows || []).map((e) => createVNode(Fragment, null, [createVNode(TreeGridRow, {
      gridBody: this.gridBody,
      row: e,
      prow: this.prow,
      columns: this.columns,
      depth: this.depth
    }, null), e.children && e.children.length > 0 && createVNode("tr", {
      class: "treegrid-tr-tree"
    }, [createVNode("td", {
      colspan: this.columns.length,
      style: "border:0"
    }, [withDirectives(createVNode("div", null, [createVNode(resolveComponent("TreeGridChildren"), {
      gridBody: this.gridBody,
      rows: e.children,
      prow: e,
      columns: this.columns,
      depth: this.depth + 1
    }, null)]), [[resolveDirective("slideUpDown"), {
      animate: this.grid.animate,
      collapsed: e.state == "closed",
      disabled: !1
    }]])])])]))])]);
  }
}, TreeGridBody = {
  name: "TreeGridBody",
  extends: GridBody,
  components: {
    TreeGridChildren
  },
  computed: {
    view() {
      return this.$parent;
    }
  },
  render() {
    return createVNode("div", {
      ref: "bodyRef",
      class: "datagrid-body f-full",
      onScroll: this.onScroll
    }, [createVNode("div", {
      ref: "innerRef",
      class: "datagrid-body-inner"
    }, [createVNode(TreeGridChildren, {
      gridBody: this,
      rows: this.rows,
      columns: this.columns
    }, null)])]);
  }
}, TreeGridView = {
  name: "TreeGridView",
  extends: GridView,
  components: {
    TreeGridBody
  },
  computed: {
    grid() {
      return this.$parent;
    }
  },
  methods: {
    onHeaderCellClick(e) {
      e.column.sortable && (this.grid.addSort(e.column), this.grid.setData(this.grid.innerData), this.grid.$emit("sortChange", this.grid.sortsState));
    }
  },
  render() {
    return createVNode("div", {
      class: this.viewCls
    }, [this.grid.showHeader && createVNode(resolveComponent("GridHeader"), {
      ref: "header",
      columnGroup: this.columnGroup,
      columns: this.columns,
      paddingWidth: this.headerPaddingWidth,
      grid: this.grid,
      onCellClick: this.onHeaderCellClick
    }, null), createVNode(TreeGridBody, {
      ref: "body",
      align: "center",
      columns: this.columns,
      rows: this.rows,
      onBodyScroll: this.onBodyScroll
    }, null), this.grid.showFooter && createVNode(resolveComponent("GridFooter"), {
      ref: "footer",
      columns: this.columns,
      rows: this.footerRows,
      paddingWidth: this.headerPaddingWidth
    }, null)]);
  }
}, TreeGrid = {
  name: "TreeGrid",
  extends: GridBase,
  components: {
    Pagination,
    TreeGridView,
    GridEmpty
  },
  props: {
    idField: String,
    treeField: String,
    selectionMode: {
      type: String,
      default: "single"
    },
    checkbox: {
      type: Boolean,
      default: !1
    },
    cascadeCheck: {
      type: Boolean,
      default: !0
    },
    animate: {
      type: Boolean,
      default: !1
    }
  },
  mounted() {
    treeHelper.$vue = this;
  },
  methods: {
    getCheckedRows(e = "checked") {
      let i = [];
      return treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.forNodes(this.innerData, (s) => {
        s.checkState == e && i.push(s);
      }), i;
    },
    checkRow(e) {
      treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.checkNode(e, () => {
        this.$emit("rowCheck", e);
      });
    },
    uncheckRow(e) {
      treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.uncheckNode(e, () => {
        this.$emit("rowUncheck", e);
      });
    },
    uncheckAllRows() {
      treeHelper.uncheckAllNodes(this.innerData, () => {
      });
    },
    adjustCheck(e) {
      treeHelper.cascadeCheck = this.cascadeCheck, treeHelper.adjustCheck(e);
    },
    sortData() {
      if (!this.sortsState || !this.sortsState.length)
        return;
      let e = [];
      for (let l = 0; l < this.sortsState.length; l++)
        e.push(this.findColumn(this.sortsState[l].field));
      let i = (l, r) => l == r ? 0 : l > r ? 1 : -1, s = (l) => {
        l.sort((r, a) => {
          let n = 0;
          for (let o = 0; o < this.sortsState.length; o++) {
            let d = this.sortsState[o];
            if (e[o] && e[o].sorter ? n = e[o].sorter(r, a) : n = i(r[d.field], a[d.field]), n = n * (d.order == "asc" ? 1 : -1), n != 0)
              return n;
          }
          return n;
        }), l.forEach((r) => {
          r.children && r.children.length && s(r.children);
        });
      };
      s(this.innerData);
    }
  },
  render() {
    return createVNode("div", {
      class: "f-column panel-noscroll"
    }, [createVNode("div", {
      style: "display:none"
    }, [this.$slots.default()]), createVNode("div", {
      class: ["panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column", {
        "panel-body-noborder": !this.border
      }]
    }, [this.pagination && (this.pagePosition == "both" || this.pagePosition == "top") && createVNode(Pagination, {
      class: "datagrid-pager datagrid-pager-top f-noshrink",
      total: this.totalState,
      pageSize: this.pageSizeState,
      pageNumber: this.pageNumberState,
      loading: this.loading,
      onPageChange: this.onPageChange
    }, null), createVNode("div", {
      ref: "viewRef",
      class: "datagrid-view f-row f-full"
    }, [(this.leftGroup || this.leftColumns) && createVNode(TreeGridView, {
      ref: "view1",
      key: "view1",
      viewIndex: 1,
      columnGroup: this.leftGroup,
      columns: this.leftColumns,
      rows: this.rows,
      footerRows: this.footerRows,
      style: {
        width: this.leftFrozenWidth
      }
    }, null), createVNode(TreeGridView, {
      ref: "view2",
      key: "view2",
      viewIndex: 2,
      columnGroup: this.centerGroup,
      columns: this.centerColumns,
      rows: this.rows,
      footerRows: this.footerRows,
      onBodyScroll: this.onBodyScroll
    }, null), (this.rightGroup || this.rightColumns) && createVNode(TreeGridView, {
      ref: "view3",
      key: "view3",
      viewIndex: 3,
      columnGroup: this.rightGroup,
      columns: this.rightColumns,
      rows: this.rows,
      footerRows: this.footerRows,
      style: {
        width: this.rightFrozenWidth
      }
    }, null), this.splitStyle && createVNode("div", {
      class: "datagrid-split-proxy",
      style: this.splitStyle
    }, null)]), this.pagination && (this.pagePosition == "both" || this.pagePosition == "bottom") && createVNode(Pagination, {
      class: "datagrid-pager f-noshrink",
      total: this.totalState,
      pageSize: this.pageSizeState,
      pageNumber: this.pageNumberState,
      loading: this.loading,
      pageChange: this.onPageChange
    }, null)]), this.loading && createVNode("div", {
      class: "datagrid-loading f-row"
    }, [createVNode("div", {
      class: "datagrid-mask"
    }, null), createVNode("div", {
      class: "datagrid-mask-msg"
    }, [this.loadMsg])]), !this.rows.length && !this.loading && createVNode(GridEmpty, {
      grid: this
    }, null)]);
  }
}, Slider = {
  name: "Slider",
  directives: {
    Draggable
  },
  props: {
    value: [Number, Array],
    modelValue: [Number, Array],
    mode: {
      type: String,
      default: "h"
    },
    reversed: {
      type: Boolean,
      default: !1
    },
    showTip: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    range: {
      type: Boolean,
      default: !1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    rule: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      valueState: this.value !== void 0 ? this.value : this.modelValue
    };
  },
  computed: {
    sliderClasses() {
      return ["slider", {
        "slider-disabled": this.disabled,
        "f-row slider-v": this.mode == "v",
        "f-column slider-h": this.mode == "h"
      }];
    },
    value1() {
      return this.valueState instanceof Array ? this.valueState[0] : this.valueState;
    },
    value2() {
      return this.range && this.valueState ? this.valueState[1] : null;
    },
    displayingRule() {
      let e = this.mode == "h" ? this.rule : this.rule.slice(0).reverse();
      return this.reversed && (e = e.slice(0).reverse()), e;
    },
    dragOpts1() {
      return {
        disabled: this.disabled,
        axis: this.mode,
        cursor: "pointer",
        drag: this.onDragHandle
      };
    },
    dragOpts2() {
      return {
        disabled: this.disabled,
        axis: this.mode,
        cursor: "pointer",
        drag: (e) => {
          this.onDragHandle(e, !0);
        }
      };
    }
  },
  methods: {
    setValue(e) {
      this.valueState = e, this.$emit("update:modelValue", this.valueState);
    },
    getPosStyle(e) {
      let i = this.value2pos(e);
      return this.mode == "h" ? {
        left: i + "%"
      } : {
        top: i + "%"
      };
    },
    getRuleValueStyle(e) {
      let i = e * 100 / (this.displayingRule.length - 1) + "%";
      return this.mode == "h" ? {
        left: i
      } : {
        top: i
      };
    },
    value2pos(e) {
      let i = (e - this.min) * 100 / (this.max - this.min);
      return this.mode == "v" && (i = 100 - i), this.reversed && (i = 100 - i), i;
    },
    pos2value(e) {
      let i = this.mode == "h" ? domHelper.outerWidth(this.$refs.sliderRef) : domHelper.outerHeight(this.$refs.sliderRef);
      return e = this.mode == "h" ? this.reversed ? i - e : e : this.reversed ? e : i - e, +(this.min + (this.max - this.min) * (e / i)).toFixed(0);
    },
    setPos(e, i = !1) {
      let s = this.pos2value(e), l = Math.abs(s % this.step);
      if (l < this.step / 2 ? s -= l : s = s - l + this.step, this.range) {
        let r = this.value1, a = this.value2;
        i ? (s < r && (s = r), a = s) : (s > a && (s = a), r = s), this.setValue([r, a]);
      } else
        this.setValue(s);
      return s;
    },
    onDragHandle(e, i = !1) {
      if (!this.disabled) {
        if (this.mode == "h") {
          let s = domHelper.outerWidth(this.$refs.sliderRef);
          e.left < 0 && (e.left = 0), e.left > s && (e.left = s);
        } else {
          let s = domHelper.outerHeight(this.$refs.sliderRef);
          e.top < 0 && (e.top = 0), e.top > s && (e.top = s);
        }
        if (this.mode == "h") {
          let s = domHelper.outerWidth(this.$refs.sliderRef), l = this.setPos(e.left, i);
          e.left = this.value2pos(l) * s / 100;
        } else {
          let s = domHelper.outerHeight(this.$refs.sliderRef), l = this.setPos(e.top, i);
          e.top = this.value2pos(l) * s / 100;
        }
        e.target.applyDrag();
      }
    },
    doDown(e) {
      if (this.disabled)
        return;
      e = new MyEvent(e);
      let i = domHelper.offset(this.$refs.sinnerRef), s = this.mode == "h" ? e.pageX - i.left : e.pageY - i.top, l = this.pos2value(s), r = Math.abs(l % this.step);
      if (r < this.step / 2 ? l -= r : l = l - r + this.step, this.range) {
        let a = this.value1, n = this.value2, o = (a + n) / 2;
        l < a ? a = l : l > n ? n = l : l < o ? a = l : n = l, this.setValue([a, n]);
      } else
        this.setValue(l);
    }
  },
  render() {
    return createVNode("div", {
      ref: "sliderRef",
      class: this.sliderClasses
    }, [createVNode("div", {
      ref: "sinnerRef",
      class: "slider-inner",
      onTouchstart: this.doDown,
      onMousedown: this.doDown
    }, [withDirectives(createVNode("a", {
      href: "javascript:;",
      class: "slider-handle",
      style: this.getPosStyle(this.value1)
    }, null), [[resolveDirective("draggable"), this.dragOpts1]]), this.showTip && createVNode("span", {
      class: "slider-tip",
      style: this.getPosStyle(this.value1)
    }, [this.value1]), this.range && createVNode(Fragment, null, [withDirectives(createVNode("a", {
      href: "javascript:;",
      class: "slider-handle",
      style: this.getPosStyle(this.value2)
    }, null), [[resolveDirective("draggable"), this.dragOpts2]]), this.showTip && createVNode("span", {
      class: "slider-tip",
      style: this.getPosStyle(this.value2)
    }, [this.value2])])]), this.rule.length > 0 && createVNode(Fragment, null, [createVNode("div", {
      class: "slider-rule"
    }, [this.displayingRule.map((e, i) => createVNode("span", {
      style: this.getRuleValueStyle(i)
    }, null))]), createVNode("div", {
      class: "slider-rulelabel"
    }, [this.displayingRule.map((e, i) => createVNode(Fragment, null, [e != "|" && createVNode("span", {
      style: this.getRuleValueStyle(i)
    }, [e])]))])])]);
  }
}, TagBox = {
  name: "TagBox",
  extends: ComboBox,
  props: {
    hasDownArrow: {
      type: Boolean,
      default: !1
    },
    multiple: {
      type: Boolean,
      default: !0
    },
    limitToList: {
      type: Boolean,
      default: !1
    },
    tagCss: [Function, String, Object]
  },
  computed: {
    text() {
      return this.focused || this.valueState != null && this.displayingText == null && this.updateText(), this.textState;
    }
  },
  mounted() {
    this.textState = "", this.$nextTick(() => {
      this.autoSizeInput();
    });
  },
  methods: {
    afterValueChange() {
      ComboBox.methods.afterValueChange.call(this), this.closePanel();
    },
    afterBlur() {
      ComboBox.methods.afterBlur.call(this), this.textState = "", this.$nextTick(() => {
        this.autoSizeInput();
      });
    },
    onInput(e) {
      this.textState = e.target.value, this.focused && (this.inputingText = this.textState, this.limitToList && (this.openPanel(), clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.doFilter(this.textState);
      }, this.delay)), this.autoSizeInput());
    },
    onKeyDown(e) {
      ComboBox.methods.onKeyDown.call(this, e), e.which == 13 ? this.doEnter() : e.which == 27 && (this.textState = "", this.autoSizeInput());
    },
    doEnter() {
      if (this.autoSizeInput(), this.limitToList)
        this.doFilter("");
      else {
        const e = this.textState.trim();
        if (e) {
          let i = [].concat(this.valueState);
          i.push(e), this.setValue(i);
        }
      }
      this.textState = "", this.autoSizeInput();
    },
    getCss(e, i, s) {
      if (e) {
        let l = typeof e == "function" ? e(i) : e;
        return s == "class" ? typeof l == "string" ? l : null : typeof l == "object" ? l : null;
      }
      return null;
    },
    getTagClass(e) {
      return this.getCss(this.tagCss, e, "class");
    },
    getTagStyle(e) {
      return this.getCss(this.tagCss, e, "style");
    },
    fixValue() {
      this.autoSizeInput();
    },
    removeTag(e) {
      let i = this.valueState.filter((s, l) => l != e);
      this.setValue(i);
    },
    autoSizeInput() {
      if (!this.$refs.inputRef)
        return;
      let e = this.$refs.inputRef, i = getComputedStyle(e), s = document.createElement("span");
      Object.assign(s.style, {
        position: "absolute",
        top: -9999,
        left: -9999,
        width: "auto",
        fontFamily: i.fontFamily,
        fontSize: i.fontSize,
        fontWeight: i.fontWeight,
        whiteSpace: "nowrap"
      }), s.innerHTML = this.text, document.body.appendChild(s);
      let l = (a) => {
        a = a || "";
        var n = a.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return s.innerHTML = n, domHelper.outerWidth(s);
      }, r = this.text ? l(this.text) : l(this.placeholder);
      document.body.removeChild(s), this.$refs.inputRef.style.width = r + 20 + "px", this.panelClosed || this.$nextTick(() => this.alignPanel());
    },
    renderLabels() {
      return createVNode("span", {
        class: "tagbox-labels f-full f-order3"
      }, [(this.selection || []).map((e, i) => createVNode("span", {
        class: ["tagbox-label f-order3 f-noshrink", this.getTagClass(e)],
        style: this.getTagStyle(e)
      }, [e[this.textField], createVNode("a", {
        href: "javascript:;",
        class: "tagbox-remove",
        onClick: () => this.removeTag(i)
      }, null)])), this.renderInput()]);
    },
    renderField() {
      return createVNode("span", {
        class: ["combo tagbox f-field", this.baseClasses],
        onClick: () => this.$refs.inputRef.focus()
      }, [this.renderLabels(), this.renderAddon(), this.renderOthers()]);
    }
  }
};
function _isSlot$2(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const SearchBox = {
  name: "SearchBox",
  extends: InputBase,
  props: {
    menuAlign: {
      type: String,
      default: "left"
    },
    category: String,
    buttonAlign: {
      type: String,
      default: "right"
    },
    buttonIconCls: {
      type: String,
      default: "icon-search"
    }
  },
  data() {
    return {
      hasMenu: !0,
      menu: null,
      menuBtnText: null,
      menuBtnIcon: null,
      categoryState: this.category
    };
  },
  watch: {
    category(e) {
      this.categoryState = e;
    }
  },
  computed: {
    text() {
      return this.focused ? this.textState : (this.textFormatter || this.defaultTextFormatter)(this.textState);
    },
    baseClasses() {
      const e = InputBase.computed.baseClasses();
      return ["searchbox"].concat(e);
    },
    mbClasses() {
      return ["f-noshrink textbox-button textbox-button-" + this.menuAlign, {
        "f-order0": this.menuAlign == "left",
        "f-order7": this.menuAlign == "right"
      }];
    },
    buttonClasses() {
      return ["textbox-addon f-column f-noshrink", {
        "f-order0": this.buttonAlign == "left",
        "f-order6": this.buttonAlign == "right"
      }];
    }
  },
  mounted() {
    domHelper.bind(this.$el, "keydown", this.onKeyDown), this.$refs.mb ? this.menu = this.$refs.mb.menu : this.hasMenu = !1, this.initMenu();
  },
  beforeUnmount() {
    domHelper.unbind(this.$el, "keydown", this.onKeyDown);
  },
  methods: {
    onInput(e) {
      this.textState = e.target.value, this.setValue(this.textState);
    },
    onKeyDown(e) {
      e.which == 13 && (e.stopPropagation(), e.preventDefault(), this.doSearch());
    },
    setValue(e) {
      this.textState = e, InputBase.methods.setValue.call(this, e);
    },
    doSearch() {
      this.disabled || this.readonly || this.$emit("search", {
        value: this.valueState,
        category: this.categoryState
      });
    },
    initMenu() {
      this.menu && (this.setCategory(this.categoryState), this.menu.afterItemClick = (e) => {
        !this.disabled && !this.readonly && this.setCategory(e);
      });
    },
    setCategory(e) {
      let i = this.menu.findItem(e);
      i || (i = this.menu.subItems[0]), this.categoryState = i.value || i.text, this.menuBtnText = i.text, this.menuBtnIcon = i.iconCls;
    },
    renderOthers() {
      let e = null;
      return this.$slots.default && this.$slots.default().forEach((i) => {
        i.type.name == "Menu" && (e = i);
      }), createVNode(Fragment, null, [e && createVNode(resolveComponent("MenuButton"), {
        ref: "mb",
        class: this.mbClasses,
        text: this.menuBtnText,
        iconCls: this.menuBtnIcon,
        disabled: this.disabled
      }, _isSlot$2(e) ? e : {
        default: () => [e]
      }), createVNode("span", {
        class: this.buttonClasses
      }, [createVNode("span", {
        class: "textbox-icon f-full " + this.buttonIconCls,
        onClick: this.doSearch
      }, null)])]);
    }
  }
};
function _isSlot$1(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
window.FormFieldIdIndex = window.FormFieldIdIndex || 1;
const FormField = {
  name: "FormField",
  props: {
    name: String,
    label: String,
    labelPosition: String,
    labelAlign: String,
    labelFor: String,
    labelWidth: [Number, String]
  },
  computed: {
    form() {
      let e = this.$parent;
      for (; e && e.$options.name != "Form"; )
        e = e.$parent;
      return e;
    },
    fieldClasses() {
      const e = this.labelPosition || this.form.labelPosition, i = this.form.floatingLabel, s = this.form.getError(this.name), l = this.form.getValue(this.name), r = this.form.isFocused(this.name);
      return ["form-field f-column", {
        "form-field-haserror": s && this.form.errorType === "label",
        "form-field-empty": l == null || String(l).trim().length === 0,
        "form-field-focused": r,
        "form-floating-label": i && e === "top"
      }];
    },
    innerClasses() {
      const e = this.labelPosition || this.form.labelPosition;
      return ["f-full", {
        "f-row f-vcenter": e !== "top",
        "f-column": e === "top"
      }];
    }
  },
  created() {
    this.inputId = "form-field-inputid-" + window.FormFieldIdIndex++;
  },
  render() {
    const e = (r) => {
      const a = this.labelPosition || this.form.labelPosition;
      if (a != r)
        return null;
      const n = this.labelAlign || this.form.labelAlign, o = this.labelWidth || this.form.labelWidth, d = ["f-noshrink", {
        "textbox-label-after": a === "after",
        "textbox-label-top": a === "top"
      }], u = "width:" + domHelper.toStyleValue(o), c = this.$slots.label ? this.$slots.label() : this.label;
      return createVNode(resolveComponent("Label"), {
        for: this.labelFor || this.inputId,
        align: n,
        class: d,
        style: u
      }, _isSlot$1(c) ? c : {
        default: () => [c]
      });
    }, i = () => {
      const r = this.form.getError(this.name);
      if (this.form.errorType != "label" || !r)
        return null;
      const a = this.labelPosition || this.form.labelPosition, n = this.labelWidth || this.form.labelWidth;
      let o = null;
      return this.label && a === "before" && (o = "margin-left:" + domHelper.toStyleValue(n)), createVNode("div", {
        class: "form-field-error",
        style: o
      }, [r]);
    };
    let s = this.$slots.default(), l = !1;
    if (s.forEach((r) => {
      r.props && (r.props.inputId = this.inputId, r.props.disabled && (l = !0));
    }), this.form.errorType != "label") {
      const r = this.form.getError(this.name), a = {
        closed: !1,
        disabled: l,
        content: r,
        position: this.form.tooltipPosition
      };
      s = withDirectives(createVNode("span", {
        class: "f-full f-column"
      }, [s]), [[resolveDirective("tooltip"), a]]);
    }
    return h("div", {
      class: this.fieldClasses
    }, [h("div", {
      class: this.innerClasses
    }, [e("top"), e("before"), s, e("after")]), i()]);
  }
}, SideMenuIcon = {
  name: "SideMenuIcon",
  props: {
    sidemenu: Object,
    menu: Object,
    header: {
      type: Boolean,
      default: !0
    }
  },
  render() {
    return this.sidemenu.$slots.icon({
      menu: this.menu,
      header: this.header,
      collapsed: this.sidemenu.collapsed
    });
  }
};
function _isSlot(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !isVNode(e);
}
const SideMenuItems = {
  name: "SideMenuItems",
  components: {
    Accordion,
    AccordionPanel,
    Tree,
    SideMenuIcon
  },
  props: {
    sidemenu: Object,
    tip: Boolean,
    data: [Array, Object],
    width: null
  },
  data() {
    return {
      innerData: this.data
    };
  },
  computed: {
    border() {
      return this.tip ? !0 : this.sidemenu.border;
    },
    multiple() {
      return this.tip ? !1 : this.sidemenu.multiple;
    }
  },
  watch: {
    data() {
      this.setData(this.data);
    }
  },
  created() {
    this.setData(this.data);
  },
  methods: {
    setData(e) {
      if (this.tip) {
        let i = Object.assign({}, e);
        i.state = "open", this.innerData = [i];
      } else
        this.innerData = e;
    },
    onPanelSelect(e) {
      let i = this.$refs.accordion.getPanelIndex(e);
      i >= 0 && (this.data[i].state = "open");
    },
    onPanelUnselect(e) {
      let i = this.$refs.accordion.getPanelIndex(e);
      i >= 0 && (this.data[i].state = "closed");
    }
  },
  render() {
    let e;
    return createVNode("div", {
      class: "sidemenu f-column f-full",
      style: {
        width: this.width ? this.width + "px" : null
      }
    }, [createVNode(Accordion, {
      ref: "accordion",
      class: "f-full",
      border: this.border,
      animate: this.sidemenu.animate,
      multiple: this.multiple,
      onPanelSelect: this.onPanelSelect,
      onPanelUnselect: this.onPanelUnselect
    }, _isSlot(e = this.innerData.map((i) => createVNode(AccordionPanel, {
      title: i.text,
      iconCls: this.tip ? null : i.iconCls,
      collapsed: i.state == "closed"
    }, {
      default: () => [createVNode(Tree, {
        data: i.children,
        selection: this.sidemenu.selectionState,
        selectLeafOnly: !0,
        animate: this.sidemenu.animate,
        onSelectionChange: this.sidemenu.onSelectionChange,
        onNodeClick: this.sidemenu.onNodeClick
      }, null), !this.tip && this.sidemenu.$slots.icon && createVNode(SideMenuIcon, {
        sidemenu: this.sidemenu,
        menu: i,
        header: !0
      }, null)]
    }))) ? e : {
      default: () => [e]
    })]);
  }
}, SideMenu = {
  name: "SideMenu",
  components: {
    SideMenuItems,
    SideMenuIcon
  },
  props: {
    data: Array,
    selection: Object,
    collapsed: {
      type: Boolean,
      default: !1
    },
    border: {
      type: Boolean,
      default: !0
    },
    animate: {
      type: Boolean,
      default: !0
    },
    multiple: {
      type: Boolean,
      default: !0
    },
    floatMenuWidth: {
      type: Number,
      default: 200
    },
    floatMenuPosition: {
      type: String,
      default: "right"
    }
  },
  data() {
    return {
      // selection: null,
      selectionState: this.selection,
      tipClosed: !0,
      innerData: []
    };
  },
  watch: {
    data(e) {
      this.setData(e);
    },
    selection(e) {
      this.selectItem(e);
    }
  },
  computed: {
    sidemenu() {
      return this;
    }
  },
  mounted() {
    this.setData(this.data);
  },
  methods: {
    setData(e) {
      e == null && (e = []), this.innerData = Object.assign([], e), treeHelper.$vue = this, treeHelper.forNodes(this.innerData, (i) => {
        i.iconCls || (i.iconCls = "sidemenu-default-icon"), i.children && (i.nodeCls = "tree-node-nonleaf", i.state || (i.state = "closed"), i.state == "open" ? i.nodeCls = "tree-node-nonleaf" : i.nodeCls = "tree-node-nonleaf tree-node-nonleaf-collapsed");
      });
    },
    getTipOpts(e) {
      return {
        position: this.floatMenuPosition,
        tooltipCls: "sidemenu-tooltip",
        valign: "top",
        propsData: {
          sidemenu: this,
          data: e,
          tip: !0,
          width: this.floatMenuWidth
        },
        component: SideMenuItems,
        content: createVNode(SideMenuItems, {
          sidemenu: this,
          data: e,
          tip: !0,
          width: this.floatMenuWidth
        }, null),
        closed: e.tipClosed != null ? e.tipClosed : !0,
        tooltipShow: () => {
          e.tipClosed = !1;
        },
        tooltipHide: () => {
          e.tipClosed = !0;
        }
      };
    },
    selectItem(e) {
      if (e != this.selectionState) {
        let i = null;
        for (treeHelper.forNodes(this.innerData, (s) => {
          (s.children || []).forEach((l) => {
            l == e && (i = s);
          });
        }); i; )
          i.state = "open", i = i.parent;
        this.selectionState = e;
      }
    },
    onSelectionChange(e) {
      this.selectionState = e, this.$emit("selectionChange", this.selectionState);
    },
    onNodeClick(e) {
      e.children ? (e.state = e.state == "closed" ? "open" : "closed", e.state == "open" ? e.nodeCls = "tree-node-nonleaf" : e.nodeCls = "tree-node-nonleaf tree-node-nonleaf-collapsed") : (this.$emit("itemClick", e), this.innerData.forEach((i) => i.tipClosed = !0));
    }
  },
  render() {
    return createVNode("div", {
      class: "f-column"
    }, [this.collapsed && createVNode("div", {
      class: "sidemenu sidemenu-collapsed f-full"
    }, [createVNode("div", {
      class: ["accordion", {
        "accordion-noborder": !this.border
      }]
    }, [this.innerData.map((e) => withDirectives(createVNode("div", {
      class: "panel-header accordion-header"
    }, [!this.$slots.icon && createVNode(Fragment, null, [createVNode("div", {
      class: "panel-title panel-with-icon"
    }, null), createVNode("div", {
      class: ["panel-icon", e.iconCls]
    }, null)]), this.$slots.icon && createVNode(SideMenuIcon, {
      sidemenu: this.sidemenu,
      menu: e,
      header: !0
    }, null)]), [[resolveDirective("tooltip"), this.getTipOpts(e)]]))])]), !this.collapsed && createVNode(SideMenuItems, {
      sidemenu: this.sidemenu,
      data: this.innerData
    }, null)]);
  }
}, MessagerContent = {
  name: "MessagerContent",
  props: {
    messagerType: String,
    title: String,
    icon: String,
    msg: String,
    value: String,
    buttons: Array
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  computed: {
    messagerIcon() {
      return this.icon ? "messager-" + this.icon : null;
    },
    dialog() {
      return this.$parent;
    }
  },
  mounted() {
    this.$refs.input ? setTimeout(() => {
      this.$refs.input.focus();
    }, 300) : this.$refs.buttons && this.$refs.buttons.length && setTimeout(() => {
      this.$refs.buttons[0].focus();
    }, 300);
  },
  methods: {
    closeDialog(e) {
      this.messagerType == "prompt" && e && e.value == !0 ? this.dialog.resultValue = this.inputValue : this.dialog.resultValue = e ? e.value : null, this.dialog.close();
    }
  },
  render() {
    return createVNode("div", {
      class: "f-column f-full"
    }, [createVNode("div", {
      class: "messager-body f-full f-column"
    }, [createVNode("div", {
      class: "f-row f-full"
    }, [this.messagerIcon && createVNode("div", {
      class: "f-noshrink messager-icon " + this.messagerIcon
    }, null), createVNode("div", {
      class: "f-full"
    }, [this.msg])]), this.messagerType == "prompt" && createVNode("div", {
      style: "margin-top:20px"
    }, [withDirectives(createVNode("input", {
      ref: "input",
      class: "messager-input",
      "onUpdate:modelValue": (e) => this.inputValue = e
    }, null), [[vModelText, this.inputValue]])])]), this.buttons && createVNode("div", {
      class: "dialog-button messager-button f-noshrink"
    }, [this.buttons.map((e) => createVNode(LinkButton, {
      ref: "buttons",
      text: e.text,
      onClick: () => this.closeDialog(e)
    }, null))])]);
  }
}, MessagerDialog = {
  name: "MessagerDialog",
  extends: Dialog,
  props: {
    component: {
      type: [String, Object],
      default: () => MessagerContent
    },
    messagerIdIndex: Number,
    messagerType: String,
    closeMe: Function,
    dialogStyle: {
      type: Object,
      default: () => ({
        width: "360px",
        minHeight: "130px"
      })
    },
    modal: {
      type: Boolean,
      default: !0
    },
    closed: {
      type: Boolean,
      default: !0
    },
    title: String,
    msg: String,
    icon: String,
    value: String,
    buttons: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      resultValue: null
    };
  },
  computed: {
    messagerIcon() {
      return this.icon ? "messager-" + this.icon : null;
    }
  },
  mounted() {
    window.EventHub.$on("messagerOpen", (e) => {
      this.messagerIdIndex == e.messagerIdIndex && this.open();
    }), window.EventHub.$on("messagerClose", (e) => {
      this.messagerIdIndex == e.messagerIdIndex && this.close();
    }), window.EventHub.$on("messagerPosition", (e) => {
      this.messagerIdIndex == e.messagerIdIndex && (this.top = e.top, e.outerHeight = domHelper.outerHeight(this.$refs.panelRef));
    });
  },
  methods: {
    close() {
      Dialog.methods.close.call(this), this.closeMe(this.resultValue);
    },
    panelBody() {
      return withDirectives(createVNode("div", {
        ref: "bodyRef",
        class: ["f-column ", this.bodyClasses],
        style: this.bodyStyle
      }, [createVNode(MessagerContent, {
        messagerType: this.messagerType,
        title: this.title,
        msg: this.msg,
        value: this.value,
        icon: this.icon,
        buttons: this.buttons
      }, null)]), [[resolveDirective("slideUpDown"), {
        animate: this.animateState,
        collapsed: this.collapsedState,
        disabled: !this.collapseToShrinkBody
      }]]);
    }
  }
};
window.MessagerIdIndex = window.MessagerIdIndex || 1;
class Messager {
  constructor() {
    this.ok = window.Locale.t("Messager.ok", "Ok"), this.cancel = window.Locale.t("Messager.cancel", "Cancel"), this.template = null, this.dialogs = [];
  }
  alert(i) {
    return (!i.buttons || !i.buttons.length) && (i.buttons = [{
      text: this.ok,
      value: !0
    }]), this.openDialog(i, "alert");
  }
  confirm(i) {
    return i.icon || (i.icon = "question"), (!i.buttons || !i.buttons.length) && (i.buttons = [{
      text: this.ok,
      value: !0
    }, {
      text: this.cancel,
      value: !1
    }]), this.openDialog(i, "confirm");
  }
  prompt(i) {
    return i.icon || (i.icon = "question"), (!i.buttons || !i.buttons.length) && (i.buttons = [{
      text: this.ok,
      value: !0
    }, {
      text: this.cancel,
      value: !1
    }]), this.openDialog(i, "prompt");
  }
  // setPositions() {
  //     const dialogs = this.dialogs.filter(d => d.messagerType == 'tip');
  //     let top = 20 + document.body.scrollTop + document.documentElement.scrollTop;
  //     dialogs.forEach(dlg => {
  //         dlg.top = top;
  //         top += 10 + domHelper.outerHeight(dlg.$refs.panelRef);
  //     })
  // }
  setPositions() {
    const i = this.dialogs.filter((l) => l.messagerType == "tip");
    let s = 20 + document.body.scrollTop + document.documentElement.scrollTop;
    i.forEach((l) => {
      l.top = s, window.EventHub.$emit("messagerPosition", l), s += 10 + l.outerHeight;
    });
  }
  tip(i) {
    typeof i == "string" && (i = {
      msg: i
    }), i.timeout == null && (i.timeout = 2e3);
    let s = 0;
    const l = this.dialogs.filter((a) => a.messagerType == "tip");
    if (l.length) {
      const a = l[l.length - 1];
      s = a.top + a.outerHeight;
    }
    const r = this.openDialog(Object.assign({
      borderType: "none",
      dialogCls: "messager-tip f-animate",
      dialogStyle: {
        top: s + "px",
        height: "auto"
      },
      buttons: null,
      modal: !1
    }, i), "tip");
    return setTimeout(() => this.setPositions()), r;
  }
  openDialog(i, s = "alert") {
    i.messagerType = s, i.messagerIdIndex = window.MessagerIdIndex++;
    const r = (() => {
      const a = document.createElement("div");
      document.body.appendChild(a);
      const n = (d) => {
        const u = this.dialogs.findIndex((c) => c.messagerIdIndex == i.messagerIdIndex);
        if (u >= 0) {
          const c = this.dialogs[u];
          this.dialogs.splice(u, 1), window.EventHub.$emit("messagerClose", c), setTimeout(() => {
            render(null, a), document.body.removeChild(a), c.props.result && c.props.result(d), this.setPositions();
          });
        }
      }, o = createVNode(MessagerDialog, {
        ...i,
        closeMe: n,
        onClose: () => {
          n();
        }
      });
      return render(o, a), {
        closeMe: n,
        messagerType: i.messagerType,
        messagerIdIndex: i.messagerIdIndex,
        props: o.props
      };
    })();
    this.dialogs.push(r), i.timeout && setTimeout(() => {
      r.closeMe();
    }, i.timeout), window.EventHub.$emit("messagerOpen", r.props);
  }
  // openDialog(options, type = 'alert') {
  //     options.messagerType = type;
  //     if (options.template || this.template) {
  //         options.component = {
  //             template: options.template || this.template,
  //             extends: MessagerContent
  //         };
  //     }
  //     const MessageDialogConstructor = window.Vue.extend(MessagerDialog);
  //     let dialog = new MessageDialogConstructor({
  //         propsData: options
  //     });
  //     dialog.$mount();
  //     document.body.appendChild(dialog.$el);
  //     dialog.open();
  //     dialog.$on('close', () => {
  //         const index = this.dialogs.indexOf(dialog);
  //         if (index >= 0) {
  //             this.dialogs.splice(index, 1);
  //         }
  //         dialog.$nextTick(() => {
  //             document.body.removeChild(dialog.$el);
  //             dialog.$destroy();
  //             if (options.result) {
  //                 options.result(dialog.resultValue);
  //             }
  //             this.setPositions();
  //         });
  //     });
  //     this.dialogs.push(dialog);
  //     if (options.timeout) {
  //         setTimeout(() => {
  //             dialog.close();
  //         }, options.timeout)
  //     }
  //     return dialog;
  // }
  closeAll() {
    this.dialogs.forEach((i) => i.closeMe()), this.dialogs = [];
  }
}
const ComboTree = {
  name: "ComboTree",
  extends: ComboBase,
  props: {
    data: Array,
    value: [String, Number, Array],
    valueField: {
      type: String,
      default: "id"
    },
    textField: {
      type: String,
      default: "text"
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    editable: {
      type: Boolean,
      default: !1
    },
    cascadeText: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      innerData: this.data,
      mappingTexts: {},
      displayingText: null,
      inputingText: null,
      updatingText: !1,
      selection: null,
      timer: null,
      trees: []
    };
  },
  computed: {
    text() {
      return this.focused || (this.valueState != null && this.displayingText == null && this.updateText(), this.textState = (this.textFormatter || this.defaultTextFormatter)(this.displayingText)), this.textState;
    },
    tree: {
      cache: !1,
      get() {
        for (let e = 0; e < this.trees.length; e++) {
          const i = this.trees[e];
          if (domHelper.isChild(i.$el, this.$refs.panelRef))
            return i;
        }
        return null;
      }
    }
  },
  watch: {
    data() {
      this.innerData = this.data;
    }
  },
  created() {
    treeHelper.$vue = this;
  },
  mounted() {
    window.EventHub.$on("treeMounted", (e) => {
      this.trees.push(e);
    });
  },
  methods: {
    afterValueChange() {
      FieldBase.methods.afterValueChange.call(this), this.updatingText || this.updateText();
    },
    afterBlur() {
      FieldBase.methods.afterBlur.call(this), this.onBlur();
    },
    setTree() {
      this.tree && (this.tree.checkboxState = this.multiple, this.tree.innerData = this.innerData, this.tree.afterSelectionChange = (e) => {
        this.selection = e, this.multiple || (this.setValue(e[this.valueField]), this.closePanel());
      }, this.tree.afterCheckChange = (e) => {
        if (this.multiple && !this.updatingText) {
          let i = e.map((s) => s[this.valueField]);
          this.setValue(i);
        }
      }, this.$nextTick(() => {
        this.$refs.panelRef.scrollTop = this.scrollTop;
      }), treeHelper.cascadeCheck = this.tree.cascadeCheck);
    },
    onInput(e) {
      this.textState = e.target.value, this.focused && (this.inputingText = this.textState, this.panelClosed && this.openPanel(), clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.doFilter(this.textState);
      }, this.delay));
    },
    onBlur() {
      if (this.inputingText == null)
        return;
      let e = this.inputingText.trim();
      if (!e) {
        this.setValue(null);
        return;
      }
      if (this.multiple) {
        let i = [], s = e.split(this.separator);
        for (let l of this.value) {
          let r = this.mappingTexts[l];
          s.indexOf(r) != -1 && i.push(l);
        }
        this.value.length != i.length && this.setValue(i);
      } else
        this.inputingText != this.displayingText && this.setValue(null);
      this.inputingText = null;
    },
    doFilter(e) {
      if (this.tree)
        if (e)
          if (this.multiple) {
            let i = e.trim().split(this.separator), s = i[i.length - 1];
            this.tree.doFilter(s);
          } else
            this.tree.doFilter(e);
        else
          this.tree.doFilter("");
    },
    openPanel() {
      ComboBase.methods.openPanel.call(this), this.$nextTick(() => {
        this.setTree(), this.updateText(), this.editable && this.doFilter("");
      });
    },
    updateText() {
      if (this.tree, this.updatingText = !0, this.valueState == null)
        this.mappingTexts = {}, this.displayingText = null, this.selection = null, this.multiple && treeHelper.uncheckAllNodes(this.innerData, () => {
        });
      else {
        let e = {}, i = [];
        if (this.multiple) {
          treeHelper.uncheckAllNodes(this.innerData, () => {
          });
          for (let l of this.valueState) {
            let r = treeHelper.findNode(this.innerData, this.valueField, l);
            r && treeHelper.checkNode(r, () => {
            });
          }
          let s = [];
          treeHelper.forNodes(this.innerData, (l) => {
            l.checkState == "checked" && (s.push(l[this.valueField]), e[l[this.valueField]] = l[this.textField], i.push(l[this.textField]));
          }), this.valueState.filter((l) => s.indexOf(l) == -1).forEach((l) => {
            s.push(l), e[l] = this.mappingTexts[l] || l, i.push(e[l]);
          }), this.setValue(s);
        } else {
          let s = treeHelper.findNode(this.innerData, this.valueField, this.valueState);
          if (s) {
            if (e[this.valueState] = s[this.textField], this.tree && (this.tree.selectionState = s), this.cascadeText) {
              let l = [], r = s;
              for (; r; )
                r.state = "open", l.push(r[this.textField]), r = r.parent;
              e[this.valueState] = l.reverse().join("/");
            }
          } else
            e[this.valueState] = this.mappingTexts[this.valueState] || this.valueState;
          i.push(e[this.valueState]);
        }
        this.mappingTexts = e, this.displayingText = i.join(this.separator);
      }
      this.updatingText = !1;
    },
    // renderPanel() {
    //     if (this.panelClosed) {
    //         return null;
    //     }
    //     const style = Object.assign({}, this.panelStyle, {
    //         left: this.panelLeft + 'px',
    //         top: this.panelTop + 'px'
    //     })
    //     return (
    //         <div ref="panelRef"
    //             class="panel-body panel-body-noheader combo-panel combo-p f-row"
    //             style={style}>
    //             {this.renderContent()}
    //         </div>
    //     )
    // },
    renderContent() {
      return this.$slots.tree();
    }
  }
}, ComboGrid = {
  name: "ComboGrid",
  extends: ComboBase,
  props: {
    data: Array,
    value: [String, Number, Array],
    valueField: {
      type: String,
      default: "id"
    },
    textField: {
      type: String,
      default: "text"
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    editable: {
      type: Boolean,
      default: !1
    },
    limitToList: {
      type: Boolean,
      default: !0
    }
  },
  data() {
    return {
      innerData: this.data,
      mappingTexts: {},
      displayingText: null,
      inputingText: null,
      datagridScrollTop: 0,
      timer: null,
      grids: []
    };
  },
  computed: {
    text() {
      return this.focused || (this.valueState != null && this.displayingText == null && this.updateText(), this.textState = (this.textFormatter || this.defaultTextFormatter)(this.displayingText)), this.textState;
    },
    datagrid: {
      cache: !1,
      get() {
        for (let e = 0; e < this.grids.length; e++) {
          const i = this.grids[e];
          if (domHelper.isChild(i.$el, this.$refs.panelRef))
            return i;
        }
        return null;
      }
    }
  },
  watch: {
    data() {
      this.innerData = this.data, this.datagrid && this.datagrid.setData(this.innerData);
    }
  },
  mounted() {
    domHelper.bind(this.$el, "keydown", this.onKeyDown), window.EventHub.$on("gridMounted", (e) => {
      this.grids.push(e);
    });
  },
  beforeUnmount() {
    domHelper.unbind(this.$el, "keydown", this.onKeyDown);
  },
  methods: {
    afterValueChange() {
      FieldBase.methods.afterValueChange.call(this), this.updateText();
    },
    afterBlur() {
      FieldBase.methods.afterBlur.call(this), this.onBlur();
    },
    setGrid() {
      this.datagrid && (this.datagrid.selectionModeState = this.multiple ? "multiple" : "single", this.datagrid.setData(this.innerData), this.datagrid.afterSelectionChange = (e) => {
        if (e)
          if (this.multiple) {
            let i = e.map((s) => s[this.valueField]);
            this.setValue(i);
          } else
            this.setValue(e[this.valueField]), this.closePanel();
        else
          this.setValue(null);
      });
    },
    onInput(e) {
      this.textState = e.target.value, this.focused && (this.inputingText = this.textState, this.panelClosed && this.openPanel(), clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.doFilter(this.textState);
      }, this.delay));
    },
    onBlur() {
      this.panelClosed || this.fixValue();
    },
    fixValue() {
      if (this.inputingText == null)
        return;
      let e = this.inputingText.trim();
      if (!e) {
        this.setValue(null);
        return;
      }
      if (this.multiple) {
        let i = [], s = e.split(this.separator);
        for (let l of this.value) {
          let r = this.mappingTexts[l];
          s.indexOf(r) != -1 && i.push(l);
        }
        this.value.length != i.length && this.setValue(i);
      } else
        this.limitToList || this.setValue(this.inputingText);
      this.inputingText = null;
    },
    onKeyDown(e) {
      if (this.panelClosed && e.which == 40) {
        this.openPanel(), e.preventDefault();
        return;
      }
      if (this.datagrid)
        switch (e.which) {
          case 40:
            this.datagrid.navRow(1), e.preventDefault();
            break;
          case 38:
            this.datagrid.navRow(-1), e.preventDefault();
            break;
          case 13:
            this.datagrid && this.datagrid.highlightRow && (this.datagrid.doEnter(), this.multiple || this.closePanel(), this.textState = this.displayingText), e.preventDefault();
            break;
          case 9:
            this.fixValue(), this.closePanel();
            break;
          case 27:
            this.closePanel(), this.textState = this.displayingText, e.preventDefault();
            break;
        }
    },
    doFilter(e) {
      this.$emit("filterChange", {
        filterValue: e
      });
    },
    openPanel() {
      ComboBase.methods.openPanel.call(this), this.$nextTick(() => {
        this.setGrid(), this.updateText(), this.$nextTick(() => {
          this.datagrid.$refs.view2.$refs.body.$refs.bodyRef.scrollTop = this.datagridScrollTop;
        }), this.editable && this.doFilter("");
      });
    },
    closePanel() {
      this.panelClosed || (this.datagridScrollTop = this.datagrid.$refs.view2.$refs.body.scrollTop(), ComboBase.methods.closePanel.call(this));
    },
    findRow(e) {
      for (let i of this.data)
        if (i[this.valueField] == e)
          return i;
      return null;
    },
    updateText() {
      if (this.datagrid, this.valueState == null)
        this.mappingTexts = {}, this.displayingText = null, this.datagrid && this.datagrid.setSelectionValue(null);
      else {
        let e = {}, i = [], s = [];
        if (this.multiple) {
          for (let l of this.valueState) {
            let r = this.findRow(l);
            r ? (e[l] = r[this.textField], s.push(r)) : e[l] = this.mappingTexts[l] || l, i.push(e[l]);
          }
          this.datagrid && this.datagrid.setSelectionValue(s);
        } else {
          let l = this.findRow(this.valueState);
          l ? (e[this.valueState] = l[this.textField], s.push(l)) : e[this.valueState] = this.mappingTexts[this.valueState] || this.valueState, i.push(e[this.valueState]), this.datagrid && this.datagrid.setSelectionValue(s.length ? s[0] : null);
        }
        this.mappingTexts = e, this.displayingText = i.join(this.separator);
      }
    },
    // renderPanel() {
    //     if (this.panelClosed) {
    //         return null;
    //     }
    //     const style = Object.assign({}, this.panelStyle, {
    //         left: this.panelLeft + 'px',
    //         top: this.panelTop + 'px'
    //     })
    //     return (
    //         <div ref="panelRef"
    //             class="panel-body panel-body-noheader combo-panel combo-p f-row"
    //             style={style}>
    //             {this.renderContent()}
    //         </div>
    //     )
    // },
    renderContent() {
      return this.$slots.grid();
    }
  }
}, DateTimeBox = {
  name: "DateTimeBox",
  extends: DateBox,
  components: {
    Calendar,
    TimeSpinner
  },
  props: {
    format: {
      type: String,
      default: "MM/dd/yyyy HH:mm"
    },
    timeFormat: {
      type: String,
      default: "HH:mm"
    }
  },
  data() {
    return {
      timeValue: dateHelper.formatDate(/* @__PURE__ */ new Date(), this.timeFormat)
    };
  },
  methods: {
    onSelectionChange(e) {
      this.$emit("selectionChange", e);
    },
    doFilter(e) {
      DateBox.methods.doFilter.call(this, e);
      let i = (this.parser || this.defaultParser)(e);
      i || (i = this.valueState), this.timeValue = dateHelper.formatDate(i, this.timeFormat);
    },
    selectOk() {
      let e = this.$refs.calendar.selectionState;
      e || (e = /* @__PURE__ */ new Date());
      let i = dateHelper.parseDate(this.timeValue, this.timeFormat);
      e.setHours(i.getHours()), e.setMinutes(i.getMinutes()), e.setSeconds(i.getSeconds()), this.setValue(e), this.closePanel();
    }
  }
};
class EventHub {
  constructor() {
    this.events = /* @__PURE__ */ new Map();
  }
  $on(i, s) {
    const l = this.events.get(i);
    l && l.push(s) || this.events.set(i, [s]);
  }
  $off(i, s) {
    const l = this.events.get(i);
    l && l.splice(l.indexOf(s) >>> 0, 1);
  }
  $emit(i, s) {
    (this.events.get(i) || []).slice().map((l) => {
      l(s);
    }), (this.events.get("*") || []).slice().map((l) => {
      l(i, s);
    });
  }
}
const components = [
  VirtualScroll,
  Panel,
  Dialog,
  Drawer,
  Accordion,
  AccordionPanel,
  Tabs,
  TabPanel,
  Layout,
  LayoutPanel,
  LinkButton,
  ButtonGroup,
  FileButton,
  MenuButton,
  SplitButton,
  Pagination,
  DataList,
  GridBase,
  GridColumn,
  GridColumnGroup,
  GridHeaderRow,
  DataGrid,
  TreeGrid,
  TextBox,
  PasswordBox,
  Addon,
  Label,
  NumberBox,
  TimeSpinner,
  TimePicker,
  DateTimeSpinner,
  ComboBox,
  ComboTree,
  ComboGrid,
  SwitchButton,
  CheckBox,
  RadioButton,
  Tree,
  Menu,
  MenuItem,
  SubMenu,
  MenuSep,
  Calendar,
  DateBox,
  DateTimeBox,
  DraggableProxy,
  ProgressBar,
  Slider,
  TagBox,
  SearchBox,
  Form,
  FormField,
  SideMenu,
  MessagerDialog
], directives = [
  Tooltip,
  Draggable,
  Droppable,
  Resizable
], install = function(e, i = {}) {
  window.Vue = e, Locale.use(i.locale), Object.assign(window.ValidateRules, i.rules || {}), components.forEach((s) => {
    e.component(s.name, s);
  }), directives.forEach((s) => {
    e.directive(s.name, s);
  }), window.$messager = new Messager(), e.config.globalProperties.$messager = window.$messager, window.EventHub = new EventHub();
};
window.Locale = Locale;
window.ValidateRules = ValidateRules;
typeof window < "u" && window.Vue && install(window.Vue);
const EasyUI = {
  install
};
export {
  Accordion,
  AccordionPanel,
  Addon,
  ButtonGroup,
  Calendar,
  CheckBox,
  ComboBase,
  ComboBox,
  ComboGrid,
  ComboTree,
  DataGrid,
  DataList,
  DateBox,
  DateTimeBox,
  DateTimeSpinner,
  Dialog,
  Draggable,
  DraggableProxy,
  Drawer,
  Droppable,
  FieldBase,
  FileButton,
  Form,
  FormField,
  GridBase,
  GridColumn,
  GridColumnGroup,
  GridHeaderRow,
  InputBase,
  Label,
  Layout,
  LayoutPanel,
  LinkButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuSep,
  Messager,
  MessagerDialog,
  NumberBox,
  Pagination,
  Panel,
  PasswordBox,
  ProgressBar,
  RadioButton,
  Resizable,
  SearchBox,
  SideMenu,
  Slider,
  SplitButton,
  SubMenu,
  SwitchButton,
  TabPanel,
  Tabs,
  TagBox,
  TextBox,
  TimePicker,
  TimeSpinner,
  Tooltip,
  Tree,
  TreeGrid,
  VirtualScroll,
  dateHelper,
  EasyUI as default,
  domHelper,
  treeHelper
};
//# sourceMappingURL=v3-easyui.js.map
