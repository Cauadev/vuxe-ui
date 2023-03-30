import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Ripple from './directives/Ripple.ts'


const app = createApp(App);
app.directive('ripple', Ripple);

app.mount('#app');
