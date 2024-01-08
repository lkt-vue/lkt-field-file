import { defineComponent as E, ref as i, computed as M, watch as y, resolveComponent as R, openBlock as d, createElementBlock as o, normalizeClass as _, renderSlot as O, createElementVNode as B, unref as x, withDirectives as T, vShow as j, createCommentVNode as g, createBlock as A, withModifiers as H } from "vue";
import { generateRandomString as C } from "lkt-string-tools";
import { httpCall as I } from "lkt-http-client";
const J = ["data-disabled"], U = ["name", "id", "disabled", "readonly", "placeholder", "accept"], $ = ["for", "innerHTML"], z = { class: "lkt-field-file-preview" }, P = ["src"], W = {
  key: 2,
  class: "lkt-field-file-preview-txt"
}, q = {
  key: 3,
  class: "lkt-field-file-preview-txt"
}, G = { name: "LktFieldFile", inheritAttrs: !1 }, K = /* @__PURE__ */ E({
  ...G,
  props: {
    modelValue: { type: String, default: "" },
    name: { type: String, default: C(16) },
    label: { type: String, default: "" },
    resource: { type: String, default: "" },
    resourceData: { type: Object, default: () => ({}) },
    accept: { type: String, default: "*/*" },
    placeholder: { type: String, default: "" },
    palette: { type: String, default: "" },
    readMode: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    allowReadModeSwitch: { type: Boolean, default: !1 },
    tabindex: { type: Number, default: void 0 },
    mandatory: { type: Boolean, default: !1 },
    reset: { type: Boolean, default: !1 },
    resetMessage: { type: String, default: "" },
    mandatoryMessage: { type: String, default: "" },
    infoMessage: { type: String, default: "" },
    errorMessage: { type: String, default: "" },
    switchEditionMessage: { type: String, default: "" }
  },
  emits: ["update:modelValue", "uploading", "upload-success", "upload-error"],
  setup(l, { expose: V, emit: F }) {
    const n = F, e = l, h = C(16), p = i(null);
    i(e.modelValue);
    const a = i(e.modelValue), r = i(!e.readMode), k = i(!1), b = i(!1), u = i(!1), m = () => {
      k.value = a.value.includes("image/"), b.value = a.value.includes("text/");
    };
    m();
    const L = (t) => {
      let s = t.target;
      if (s.files && s.files[0]) {
        const c = new FileReader();
        c.onload = (v) => {
          if (a.value = v.target.result, m(), e.resource) {
            u.value = !0, n("uploading");
            let w = JSON.parse(JSON.stringify(e.resourceData));
            w.files = s.files[0], I(e.resource, w).then((f) => {
              a.value = f.data, u.value = !1, n("upload-success", f);
            }).catch((f) => {
              u.value = !1, n("upload-error", f);
            });
          }
        }, c.readAsDataURL(s.files[0]);
      }
    }, N = M(() => {
      const t = ["lkt-field", "lkt-field-file"];
      return e.palette && t.push(`lkt-field--${e.palette}`), e.disabled && t.push("is-disabled"), t.push(e.modelValue ? "is-filled" : "is-empty"), t.join(" ");
    }), S = M(() => !e.disabled && !e.readonly && r.value);
    y(() => e.readMode, (t) => r.value = !t), y(() => e.modelValue, (t) => {
      a.value = t, m();
    }), y(a, () => n("update:modelValue", a.value));
    const D = () => {
      !S.value || p.value.click();
    };
    return V({
      click: () => p.value.click()
    }), (t, s) => {
      const c = R("lkt-loader");
      return d(), o("div", {
        class: _(N.value),
        "data-disabled": l.disabled
      }, [
        O(t.$slots, "prefix"),
        B("input", {
          type: "file",
          ref: (v) => p.value = v,
          name: l.name,
          id: x(h),
          disabled: l.disabled || !r.value,
          readonly: l.readonly || !r.value,
          placeholder: l.placeholder,
          accept: l.accept,
          onChange: L
        }, null, 40, U),
        l.label ? T((d(), o("label", {
          key: 0,
          for: x(h),
          innerHTML: l.label
        }, null, 8, $)), [
          [j, !l.disabled && !l.readonly]
        ]) : g("", !0),
        B("div", z, [
          u.value ? (d(), A(c, { key: 0 })) : k.value ? (d(), o("img", {
            key: 1,
            class: "lkt-field-file-preview-img",
            src: a.value
          }, null, 8, P)) : b.value ? (d(), o("span", W, "txt")) : a.value ? (d(), o("span", q, "file")) : g("", !0),
          S.value ? (d(), o("div", {
            key: 4,
            class: "lkt-field-upload-button",
            onClick: H(D, ["prevent", "stop"])
          })) : g("", !0)
        ])
      ], 10, J);
    };
  }
});
const Z = {
  install: (l) => {
    l.component("lkt-field-file", K);
  }
};
export {
  Z as default
};
