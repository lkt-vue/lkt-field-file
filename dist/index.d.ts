import { App, Component } from 'vue';
import "./../lkt-field-file.css";
declare const LktFieldFile: {
    install: (app: App) => void;
};
export default LktFieldFile;
export declare const setFileUploadIconSlot: (component: string | Component) => boolean;
