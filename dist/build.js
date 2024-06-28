import { defineComponent as T, ref as o, computed as v, watch as S, resolveComponent as j, openBlock as a, createElementBlock as d, normalizeClass as A, renderSlot as H, createElementVNode as D, unref as E, withDirectives as J, vShow as $, createCommentVNode as m, createBlock as b, resolveDynamicComponent as L, withModifiers as z } from "vue";
import { generateRandomString as N } from "lkt-string-tools";
import { httpCall as P } from "lkt-http-client";
const y = class y {
};
y.uploadFileSlot = "", y.debugEnabled = !1;
let n = y;
const W = ["data-disabled"], q = ["name", "id", "disabled", "readonly", "placeholder", "accept"], G = ["for", "innerHTML"], K = { class: "lkt-field-file-preview" }, Q = ["src"], X = {
  key: 2,
  class: "lkt-field-file-preview-txt"
}, Y = {
  key: 3,
  class: "lkt-field-file-preview-txt"
}, Z = {
  key: 4,
  class: "lkt-field-file-preview-empty"
}, ee = { name: "LktFieldFile", inheritAttrs: !1 }, le = /* @__PURE__ */ T({
  ...ee,
  props: {
    modelValue: { type: String, default: "" },
    name: { type: String, default: N(16) },
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
  setup(e, { expose: R, emit: U }) {
    const r = U, l = e, w = N(16), h = o(null);
    o(l.modelValue);
    const i = o(l.modelValue), u = o(!l.readMode), F = o(!1), M = o(!1), c = o(!1), k = () => {
      F.value = i.value.includes("image/"), M.value = i.value.includes("text/");
    };
    k();
    const _ = (t) => {
      let s = t.target;
      if (s.files && s.files[0]) {
        const f = new FileReader();
        f.onload = (g) => {
          if (i.value = g.target.result, k(), l.resource) {
            c.value = !0, r("uploading");
            let V = JSON.parse(JSON.stringify(l.resourceData));
            V.files = s.files[0], P(l.resource, V).then((p) => {
              i.value = p.data, c.value = !1, r("upload-success", p);
            }).catch((p) => {
              c.value = !1, r("upload-error", p);
            });
          }
        }, f.readAsDataURL(s.files[0]);
      }
    }, I = v(() => {
      const t = ["lkt-field", "lkt-field-file"];
      return l.palette && t.push(`lkt-field--${l.palette}`), l.disabled && t.push("is-disabled"), t.push(l.modelValue ? "is-filled" : "is-empty"), t.join(" ");
    }), B = v(() => !l.disabled && !l.readonly && u.value);
    S(() => l.readMode, (t) => u.value = !t), S(() => l.modelValue, (t) => {
      i.value = t, k();
    }), S(i, () => r("update:modelValue", i.value));
    const O = () => {
      B.value && h.value.click();
    }, C = v(() => !!n.uploadFileSlot), x = v(() => n.uploadFileSlot);
    return R({
      //@ts-ignore
      click: () => h.value.click()
    }), (t, s) => {
      const f = j("lkt-loader");
      return a(), d("div", {
        class: A(I.value),
        "data-disabled": e.disabled
      }, [
        H(t.$slots, "prefix"),
        D("input", {
          type: "file",
          ref: (g) => h.value = g,
          name: e.name,
          id: E(w),
          disabled: e.disabled || !u.value,
          readonly: e.readonly || !u.value,
          placeholder: e.placeholder,
          accept: e.accept,
          onChange: _
        }, null, 40, q),
        e.label ? J((a(), d("label", {
          key: 0,
          for: E(w),
          innerHTML: e.label
        }, null, 8, G)), [
          [$, !e.disabled && !e.readonly]
        ]) : m("", !0),
        D("div", K, [
          c.value ? (a(), b(f, { key: 0 })) : F.value ? (a(), d("img", {
            key: 1,
            class: "lkt-field-file-preview-img",
            src: i.value
          }, null, 8, Q)) : M.value ? (a(), d("span", X, "txt")) : i.value ? (a(), d("span", Y, "file")) : (a(), d("span", Z, [
            C.value ? (a(), b(L(x.value), { key: 0 })) : m("", !0)
          ])),
          B.value ? (a(), d("div", {
            key: 5,
            class: "lkt-field-upload-button",
            onClick: z(O, ["prevent", "stop"])
          }, [
            C.value ? (a(), b(L(x.value), { key: 0 })) : m("", !0)
          ])) : m("", !0)
        ])
      ], 10, W);
    };
  }
}), oe = {
  install: (e) => {
    e.component("lkt-field-file") === void 0 && e.component("lkt-field-file", le);
  }
}, de = (e) => (n.uploadFileSlot = e, !0);
export {
  oe as default,
  de as setFileUploadIconSlot
};
