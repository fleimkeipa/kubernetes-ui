import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router); // Add Router on app
app.mount('#app'); // mount app specify DOM
