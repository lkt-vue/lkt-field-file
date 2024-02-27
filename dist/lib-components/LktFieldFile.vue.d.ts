declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    resource: {
        type: StringConstructor;
        default: string;
    };
    resourceData: {
        type: ObjectConstructor;
        default: () => {};
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    palette: {
        type: StringConstructor;
        default: string;
    };
    readMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowReadModeSwitch: {
        type: BooleanConstructor;
        default: boolean;
    };
    tabindex: {
        type: NumberConstructor;
        default: undefined;
    };
    mandatory: {
        type: BooleanConstructor;
        default: boolean;
    };
    reset: {
        type: BooleanConstructor;
        default: boolean;
    };
    resetMessage: {
        type: StringConstructor;
        default: string;
    };
    mandatoryMessage: {
        type: StringConstructor;
        default: string;
    };
    infoMessage: {
        type: StringConstructor;
        default: string;
    };
    errorMessage: {
        type: StringConstructor;
        default: string;
    };
    switchEditionMessage: {
        type: StringConstructor;
        default: string;
    };
}, {
    click: () => any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    uploading: (...args: any[]) => void;
    "upload-success": (...args: any[]) => void;
    "upload-error": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    resource: {
        type: StringConstructor;
        default: string;
    };
    resourceData: {
        type: ObjectConstructor;
        default: () => {};
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    palette: {
        type: StringConstructor;
        default: string;
    };
    readMode: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowReadModeSwitch: {
        type: BooleanConstructor;
        default: boolean;
    };
    tabindex: {
        type: NumberConstructor;
        default: undefined;
    };
    mandatory: {
        type: BooleanConstructor;
        default: boolean;
    };
    reset: {
        type: BooleanConstructor;
        default: boolean;
    };
    resetMessage: {
        type: StringConstructor;
        default: string;
    };
    mandatoryMessage: {
        type: StringConstructor;
        default: string;
    };
    infoMessage: {
        type: StringConstructor;
        default: string;
    };
    errorMessage: {
        type: StringConstructor;
        default: string;
    };
    switchEditionMessage: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onUploading?: ((...args: any[]) => any) | undefined;
    "onUpload-success"?: ((...args: any[]) => any) | undefined;
    "onUpload-error"?: ((...args: any[]) => any) | undefined;
}, {
    name: string;
    label: string;
    reset: boolean;
    disabled: boolean;
    readonly: boolean;
    mandatory: boolean;
    placeholder: string;
    tabindex: number;
    resource: string;
    accept: string;
    modelValue: string;
    resourceData: Record<string, any>;
    palette: string;
    readMode: boolean;
    allowReadModeSwitch: boolean;
    resetMessage: string;
    mandatoryMessage: string;
    infoMessage: string;
    errorMessage: string;
    switchEditionMessage: string;
}, {}>, {
    prefix?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
