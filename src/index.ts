import { App } from 'vue';

import { default as fileField } from './lib-components/LktFieldFile.vue';
import "./../lkt-field-file.css"

const LktFieldFile = {
  install: (app: App) => {
    // Register plugin components
    if (app.component('lkt-field-file') === undefined) app.component('lkt-field-file', fileField);
  },
};

export default LktFieldFile;
