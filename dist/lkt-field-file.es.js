import { defineComponent as b, ref as i, computed as S, openBlock as f, createElementBlock as u, normalizeClass as k, renderSlot as M, createElementVNode as v, unref as c, withDirectives as B, vShow as F, createCommentVNode as V } from "vue";
import { generateRandomString as p } from "lkt-string-tools";
import { httpCall as w } from "lkt-http-client";
const C = ["data-disabled"], L = ["name", "id", "disabled", "readonly", "placeholder", "accept"], N = ["for", "innerHTML"], x = { name: "LktFieldFile", inheritAttrs: !1 }, D = /* @__PURE__ */ b({
  ...x,
  props: {
    modelValue: { type: Object, default: () => ({ id: "", text: "" }) },
    name: { type: String, default: p(16) },
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
  setup(e, { emit: m }) {
    const n = m, t = e, o = p(16);
    i(null), i(t.modelValue);
    const y = i(t.modelValue);
    i(!t.readMode);
    const g = (l) => {
      let a = l.target;
      if (a.files && a.files[0]) {
        let s = new FileReader();
        s.onload = (O) => {
          n("uploading");
          let r = JSON.parse(JSON.stringify(t.resourceData));
          r.files = a.files[0], w(t.resource, r).then((d) => {
            n("upload-success", d), y.value = d.data;
          }).catch((d) => {
            n("upload-error", d);
          });
        }, s.readAsDataURL(a.files[0]);
      }
    }, h = S(() => {
      const l = ["lkt-field", "lkt-field-file"];
      return t.palette && l.push(`lkt-field--${t.palette}`), t.disabled && l.push("is-disabled"), l.push(t.modelValue ? "is-filled" : "is-empty"), l.join(" ");
    });
    return (l, a) => (f(), u("div", {
      class: k(h.value),
      "data-disabled": e.disabled
    }, [
      M(l.$slots, "prefix"),
      v("input", {
        type: "file",
        name: e.name,
        id: c(o),
        disabled: e.disabled,
        readonly: e.readonly,
        placeholder: e.placeholder,
        ref: "field",
        accept: e.accept,
        onChange: g
      }, null, 40, L),
      e.label ? B((f(), u("label", {
        key: 0,
        for: c(o),
        innerHTML: e.label
      }, null, 8, N)), [
        [F, !e.disabled && !e.readonly]
      ]) : V("", !0)
    ], 10, C));
  }
});
const A = {
  install: (e) => {
    e.component("lkt-field-file", D);
  }
};
export {
  A as default
};
