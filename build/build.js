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
  setup(e, { expose: V, emit: F }) {
    const n = F, l = e, h = C(16), p = i(null);
    i(l.modelValue);
    const a = i(l.modelValue), r = i(!l.readMode), k = i(!1), b = i(!1), u = i(!1), m = () => {
      k.value = a.value.includes("image/"), b.value = a.value.includes("text/");
    };
    m();
    const L = (t) => {
      let s = t.target;
      if (s.files && s.files[0]) {
        const c = new FileReader();
        c.onload = (v) => {
          if (a.value = v.target.result, m(), l.resource) {
            u.value = !0, n("uploading");
            let w = JSON.parse(JSON.stringify(l.resourceData));
            w.files = s.files[0], I(l.resource, w).then((f) => {
              a.value = f.data, u.value = !1, n("upload-success", f);
            }).catch((f) => {
              u.value = !1, n("upload-error", f);
            });
          }
        }, c.readAsDataURL(s.files[0]);
      }
    }, N = M(() => {
      const t = ["lkt-field", "lkt-field-file"];
      return l.palette && t.push(`lkt-field--${l.palette}`), l.disabled && t.push("is-disabled"), t.push(l.modelValue ? "is-filled" : "is-empty"), t.join(" ");
    }), S = M(() => !l.disabled && !l.readonly && r.value);
    y(() => l.readMode, (t) => r.value = !t), y(() => l.modelValue, (t) => {
      a.value = t, m();
    }), y(a, () => n("update:modelValue", a.value));
    const D = () => {
      S.value && p.value.click();
    };
    return V({
      //@ts-ignore
      click: () => p.value.click()
    }), (t, s) => {
      const c = R("lkt-loader");
      return d(), o("div", {
        class: _(N.value),
        "data-disabled": e.disabled
      }, [
        O(t.$slots, "prefix"),
        B("input", {
          type: "file",
          ref: (v) => p.value = v,
          name: e.name,
          id: x(h),
          disabled: e.disabled || !r.value,
          readonly: e.readonly || !r.value,
          placeholder: e.placeholder,
          accept: e.accept,
          onChange: L
        }, null, 40, U),
        e.label ? T((d(), o("label", {
          key: 0,
          for: x(h),
          innerHTML: e.label
        }, null, 8, $)), [
          [j, !e.disabled && !e.readonly]
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
}), Z = {
  install: (e) => {
    e.component("lkt-field-file") === void 0 && e.component("lkt-field-file", K);
  }
};
export {
  Z as default
};
