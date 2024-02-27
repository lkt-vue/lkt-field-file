<script lang="ts">
export default {name: "LktFieldFile", inheritAttrs: false}
</script>

<script lang="ts" setup>
import {generateRandomString} from "lkt-string-tools";
import {computed, ref, watch} from "vue";
import {httpCall, HTTPResponse} from "lkt-http-client";

const emit = defineEmits(['update:modelValue', 'uploading', 'upload-success', 'upload-error']);

const props = defineProps({
    modelValue: {type: String, default: ''},
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
    editable = ref(!props.readMode),
    previewImage = ref(false),
    previewText = ref(false),
    uploading = ref(false);

const checkWhatShouldPreview = () => {
    previewImage.value = value.value.includes('image/');
    previewText.value = value.value.includes('text/');
}

checkWhatShouldPreview();

const onChange = (e: Event) => {
    let input = e.target;
    // @ts-ignore
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
            // @ts-ignore
            value.value = event.target.result;
            checkWhatShouldPreview();
            if (props.resource) {
                uploading.value = true;
                emit('uploading');
                let params = JSON.parse(JSON.stringify(props.resourceData));
                // @ts-ignore
                params.files = input.files[0];

                httpCall(props.resource, params).then((r: HTTPResponse) => {
                    // @todo check with uploaded file
                    // @ts-ignore
                    value.value = r.data;
                    uploading.value = false;
                    emit('upload-success', r);
                }).catch(r => {
                    uploading.value = false;
                    emit('upload-error', r);
                })
            }
        };
        // @ts-ignore
        reader.readAsDataURL(input.files[0]);
    }
}

const classes = computed(() => {
        const r = ['lkt-field', 'lkt-field-file'];

        if (props.palette) r.push(`lkt-field--${props.palette}`);
        if (props.disabled) r.push('is-disabled');
        r.push(!!props.modelValue ? 'is-filled' : 'is-empty');

        return r.join(' ');
    }),
    canChangeFile = computed(() => {
        return !props.disabled && !props.readonly && editable.value;
    });

watch(() => props.readMode, (v) => editable.value = !v)
watch(() => props.modelValue, (v) => {
    value.value = v
    checkWhatShouldPreview();
})
watch(value, () => emit('update:modelValue', value.value));

const onClickUploadButton = () => {
    if (!canChangeFile.value) return;
    //@ts-ignore
    inputElement.value.click();
}

defineExpose({
    //@ts-ignore
    click: () => inputElement.value.click(),
})
</script>


<template>
    <div :class="classes" :data-disabled="disabled">
        <slot name="prefix"></slot>
        <input type="file"
               v-bind:ref="(el:any) => inputElement = el"
               v-bind:name="name"
               v-bind:id="Identifier"
               v-bind:disabled="disabled || !editable"
               v-bind:readonly="readonly || !editable"
               v-bind:placeholder="placeholder"
               v-bind:accept="accept"
               v-on:change="onChange"
        >
        <label v-if="label" :for="Identifier" v-html="label" v-show="!disabled && !readonly"></label>
        <div class="lkt-field-file-preview">
            <lkt-loader v-if="uploading"></lkt-loader>
            <img class="lkt-field-file-preview-img" v-else-if="previewImage" :src="value"/>
            <span class="lkt-field-file-preview-txt" v-else-if="previewText">txt</span>
            <span class="lkt-field-file-preview-txt" v-else-if="value">file</span>

            <div class="lkt-field-upload-button" v-if="canChangeFile" v-on:click.prevent.stop="onClickUploadButton">

            </div>
        </div>
    </div>
</template>