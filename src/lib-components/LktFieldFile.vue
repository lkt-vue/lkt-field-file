<script lang="ts">
export default {name: "LktFieldFile", inheritAttrs: false}
</script>

<script lang="ts" setup>
import {generateRandomString} from "lkt-string-tools";
import {computed, ref} from "vue";
import {httpCall} from "lkt-http-client";

const emit = defineEmits(['update:modelValue', 'uploading', 'upload-success', 'upload-error']);

const props = defineProps({
    modelValue: {type: Object, default: () => ({id: '', text: ''})},
    name: {type: String, default: generateRandomString(16)},
    label: {type: String, default: ''},
    resource: {type: String, default: ''},
    resourceData: {type: Object, default: () => ({})},
    accept: {type: String, default: '*/*'},
    placeholder: {type: String, default: '',},
    palette: {type: String, default: ''},
    readMode: {type: Boolean, default: false},
    disabled: {type: Boolean, default: false},
    readonly: {type: Boolean, default: false},
    allowReadModeSwitch: {type: Boolean, default: false},
    tabindex: {type: Number, default: undefined},
    mandatory: {type: Boolean, default: false},
    reset: {type: Boolean, default: false},
    resetMessage: {type: String, default: ''},
    mandatoryMessage: {type: String, default: ''},
    infoMessage: {type: String, default: ''},
    errorMessage: {type: String, default: ''},
    switchEditionMessage: {type: String, default: ''},
});

// Constant data
const Identifier = generateRandomString(16);


// Components refs
const inputElement = ref(null);

// Reactive data
const originalValue = ref(props.modelValue),
    value = ref(props.modelValue),
    editable = ref(!props.readMode);

const onChange = (e) => {
    let input = e.target;
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (event) => {
            emit('uploading');
            let params = JSON.parse(JSON.stringify(props.resourceData));
            params.files = input.files[0];
            httpCall(props.resource, params).then(r => {
                emit('upload-success', r);
                value.value = r.data;
            }).catch(r => {
                emit('upload-error', r);
            })
        };
        reader.readAsDataURL(input.files[0]);
    }
}

const classes = computed(() => {
    const r = ['lkt-field', 'lkt-field-file'];

    if (props.palette) r.push(`lkt-field--${props.palette}`);
    if (props.disabled) r.push('is-disabled');
    r.push(!!props.modelValue ? 'is-filled' : 'is-empty');

    return r.join(' ');
});
</script>


<template>
    <div :class="classes" :data-disabled="disabled">
        <slot name="prefix"></slot>
        <input type="file"
               :name="name"
               :id="Identifier"
               :disabled="disabled"
               :readonly="readonly"
               :placeholder="placeholder"
               ref="field"
               :accept="accept"
               @change="onChange"
        >
        <label v-if="label" :for="Identifier" v-html="label" v-show="!disabled && !readonly"></label>
    </div>
</template>