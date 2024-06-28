import {App, Component} from 'vue';

import { default as fileField } from './lib-components/LktFieldFile.vue';
import "./../lkt-field-file.css"
import {Settings} from "./settings/Settings";

const LktFieldFile = {
  install: (app: App) => {
    // Register plugin components
    if (app.component('lkt-field-file') === undefined) app.component('lkt-field-file', fileField);
  },
};

export default LktFieldFile;



export const setFileUploadIconSlot = (component: string|Component) => {
  Settings.uploadFileSlot = component;
  return true;
}