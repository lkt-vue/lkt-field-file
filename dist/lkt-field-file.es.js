import { defineComponent as D, ref as d, computed as M, watch as v, resolveComponent as E, openBlock as i, createElementBlock as o, normalizeClass as R, renderSlot as _, createElementVNode as B, unref as C, withDirectives as O, vShow as T, createCommentVNode as y, createBlock as j, withModifiers as A } from "vue";
import { generateRandomString as V } from "lkt-string-tools";
import { httpCall as H } from "lkt-http-client";
const I = ["data-disabled"], J = ["name", "id", "disabled", "readonly", "placeholder", "accept"], U = ["for", "innerHTML"], $ = { class: "lkt-field-file-preview" }, z = ["src"], P = {
  key: 2,
  class: "lkt-field-file-preview-txt"
}, W = {
  key: 3,
  class: "lkt-field-file-preview-txt"
}, q = { name: "LktFieldFile", inheritAttrs: !1 }, G = /* @__PURE__ */ D({
  ...q,
  props: {
    modelValue: { type: String, default: "" },
    name: { type: String, default: V(16) },
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
  setup(l, { emit: x }) {
    const n = x, e = l, g = V(16), h = d(null);
    d(e.modelValue);
    const a = d(e.modelValue), r = d(!e.readMode), k = d(!1), b = d(!1), u = d(!1), p = () => {
      k.value = a.value.includes("image/"), b.value = a.value.includes("text/");
    };
    p();
    const F = (t) => {
      let s = t.target;
      if (s.files && s.files[0]) {
        const c = new FileReader();
        c.onload = (m) => {
          if (a.value = m.target.result, p(), e.resource) {
            u.value = !0, n("uploading");
            let w = JSON.parse(JSON.stringify(e.resourceData));
            w.files = s.files[0], H(e.resource, w).then((f) => {
              a.value = f.data, u.value = !1, n("upload-success", f);
            }).catch((f) => {
              u.value = !1, n("upload-error", f);
            });
          }
        }, c.readAsDataURL(s.files[0]);
      }
    }, L = M(() => {
      const t = ["lkt-field", "lkt-field-file"];
      return e.palette && t.push(`lkt-field--${e.palette}`), e.disabled && t.push("is-disabled"), t.push(e.modelValue ? "is-filled" : "is-empty"), t.join(" ");
    }), S = M(() => !e.disabled && !e.readonly && r.value);
    v(() => e.readMode, (t) => r.value = !t), v(() => e.modelValue, (t) => {
      a.value = t, p();
    }), v(a, () => n("update:modelValue", a.value));
    const N = () => {
      !S.value || h.value.click();
    };
    return (t, s) => {
      const c = E("lkt-loader");
      return i(), o("div", {
        class: R(L.value),
        "data-disabled": l.disabled
      }, [
        _(t.$slots, "prefix"),
        B("input", {
          type: "file",
          ref: (m) => h.value = m,
          name: l.name,
          id: C(g),
          disabled: l.disabled || !r.value,
          readonly: l.readonly || !r.value,
          placeholder: l.placeholder,
          accept: l.accept,
          onChange: F
        }, null, 40, J),
        l.label ? O((i(), o("label", {
          key: 0,
          for: C(g),
          innerHTML: l.label
        }, null, 8, U)), [
          [T, !l.disabled && !l.readonly]
        ]) : y("", !0),
        B("div", $, [
          u.value ? (i(), j(c, { key: 0 })) : k.value ? (i(), o("img", {
            key: 1,
            class: "lkt-field-file-preview-img",
            src: a.value
          }, null, 8, z)) : b.value ? (i(), o("span", P, "txt")) : a.value ? (i(), o("span", W, "file")) : y("", !0),
          S.value ? (i(), o("div", {
            key: 4,
            class: "lkt-field-upload-button",
            onClick: A(N, ["prevent", "stop"])
          })) : y("", !0)
        ])
      ], 10, I);
    };
  }
});
const Y = {
  install: (l) => {
    l.component("lkt-field-file", G);
  }
};
export {
  Y as default
};
