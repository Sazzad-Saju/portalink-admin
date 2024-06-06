import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import axios from './util/axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import ValidationErrors from "@/components/shared/ValidationErrors";
import router from './router';
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import './assets/scss/pim.scss';
import './assets/scss/main.scss';
import './assets/css/custom.css';
import validationErrors from "@/mixins/validationErrors";
import helperMixins from "@/mixins/helperMixins";

window.$ = window.jQuery = require('jquery')
window._ = require('lodash')

const app = createApp(App)
app.config.globalProperties.$moment=moment
app.mixin(validationErrors);
app.mixin(helperMixins);
app.component('v-errors', ValidationErrors);
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.use(VueSweetalert2)

app.mount('#app')