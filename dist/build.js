import { defineComponent as j, ref as i, computed as v, watch as w, onMounted as J, resolveComponent as _, openBlock as a, createElementBlock as d, normalizeClass as $, renderSlot as z, createElementVNode as T, unref as D, withDirectives as A, vShow as G, createCommentVNode as m, createBlock as M, resolveDynamicComponent as E, withModifiers as q } from "vue";
import { generateRandomString as L } from "lkt-string-tools";
import { httpCall as N, createHTTPGetResource as K } from "lkt-http-client";
const y = class y {
};
y.uploadFileSlot = "", y.debugEnabled = !1;
let n = y;
const Q = ["data-disabled"], X = ["name", "id", "disabled", "readonly", "placeholder", "accept"], Y = ["for", "innerHTML"], Z = { class: "lkt-field-file-preview" }, ee = ["src"], le = {
  key: 2,
  class: "lkt-field-file-preview-txt"
}, te = {
  key: 3,
  class: "lkt-field-file-preview-txt"
}, ae = {
  key: 4,
  class: "lkt-field-file-preview-empty"
}, oe = /* @__PURE__ */ j({
  __name: "LktFieldFile",
  props: {
    modelValue: { type: String, default: "" },
    name: { type: String, default: L(16) },
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
  setup(l, { expose: U, emit: H }) {
    const u = H, t = l, F = L(16), h = i(null), x = i(t.modelValue), o = i(t.modelValue), r = i(!t.readMode), k = i(!1), g = i(!1), c = i(!1), S = () => {
      k.value = o.value.includes("image/"), g.value = o.value.includes("text/");
    }, I = (e) => {
      k.value = e.includes("image/"), g.value = e.includes("text/");
    };
    S();
    const O = (e) => {
      let s = e.target;
      if (s.files && s.files[0]) {
        const f = new FileReader();
        f.onload = (b) => {
          if (o.value = b.target.result, S(), t.resource) {
            c.value = !0, u("uploading");
            let R = JSON.parse(JSON.stringify(t.resourceData));
            R.files = s.files[0], N(t.resource, R).then((p) => {
              o.value = p.data, c.value = !1, u("upload-success", p);
            }).catch((p) => {
              c.value = !1, u("upload-error", p);
            });
          }
        }, f.readAsDataURL(s.files[0]);
      }
    }, P = v(() => {
      const e = ["lkt-field", "lkt-field-file"];
      return t.palette && e.push(`lkt-field--${t.palette}`), t.disabled && e.push("is-disabled"), e.push(t.modelValue ? "is-filled" : "is-empty"), e.join(" ");
    }), B = v(() => !t.disabled && !t.readonly && r.value);
    w(() => t.readMode, (e) => r.value = !e), w(() => t.modelValue, (e) => {
      o.value = e, S();
    }), w(o, () => u("update:modelValue", o.value));
    const W = () => {
      B.value && h.value.click();
    }, C = v(() => !!n.uploadFileSlot), V = v(() => n.uploadFileSlot);
    return U({
      //@ts-ignore
      click: () => h.value.click()
    }), J(() => {
      x.value.length > 0 && (async () => {
        let e = await N(K({
          url: x.value,
          anonymous: !0
        }));
        I(e.contentType);
      })();
    }), (e, s) => {
      const f = _("lkt-loader");
      return a(), d("div", {
        class: $(P.value),
        "data-disabled": l.disabled
      }, [
        z(e.$slots, "prefix"),
        T("input", {
          type: "file",
          ref: (b) => h.value = b,
          name: l.name,
          id: D(F),
          disabled: l.disabled || !r.value,
          readonly: l.readonly || !r.value,
          placeholder: l.placeholder,
          accept: l.accept,
          onChange: O
        }, null, 40, X),
        l.label ? A((a(), d("label", {
          key: 0,
          for: D(F),
          innerHTML: l.label
        }, null, 8, Y)), [
          [G, !l.disabled && !l.readonly]
        ]) : m("", !0),
        T("div", Z, [
          c.value ? (a(), M(f, { key: 0 })) : k.value ? (a(), d("img", {
            key: 1,
            class: "lkt-field-file-preview-img",
            src: o.value
          }, null, 8, ee)) : g.value ? (a(), d("span", le, "txt")) : o.value ? (a(), d("span", te, "file")) : (a(), d("span", ae, [
            C.value ? (a(), M(E(V.value), { key: 0 })) : m("", !0)
          ])),
          B.value ? (a(), d("div", {
            key: 5,
            class: "lkt-field-upload-button",
            onClick: q(W, ["prevent", "stop"])
          }, [
            C.value ? (a(), M(E(V.value), { key: 0 })) : m("", !0)
          ])) : m("", !0)
        ])
      ], 10, Q);
    };
  }
}), ne = {
  install: (l) => {
    l.component("lkt-field-file") === void 0 && l.component("lkt-field-file", oe);
  }
}, ue = (l) => (n.uploadFileSlot = l, !0);
export {
  ne as default,
  ue as setFileUploadIconSlot
};
