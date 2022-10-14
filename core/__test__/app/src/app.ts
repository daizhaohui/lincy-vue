import {createApp} from '../../../src';
import appConfig from './app.config';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import Root from './app.vue';
import PHeader from './pages/header/index.vue';
import './locales/index.js';
import clipboard from '../../../src/directives/clipboard';
import debounce from '../../../src/directives/debounce';
import inputFilter from '../../../src/directives/inputFilter';


const options:any = {
    appConfig,
    components:[],
    rootComponent:Root,
};

const app = createApp(options);
app.use(Antd);
app.component('p-header',PHeader);

// directived
app.directive(clipboard.name,clipboard.implement);
app.directive(debounce.name,debounce.implement);
app.directive(inputFilter.name,inputFilter.implement);

app.mount('#app');


