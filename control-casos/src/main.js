import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// PrimeVue core sin CSS (usaremos nuestros propios estilos)
import PrimeVue from 'primevue/config'

// Importar el sistema de temas
import { useTheme } from './composables/useTheme'

// PrimeVue components
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Badge from 'primevue/badge'
import Avatar from 'primevue/avatar'

const app = createApp(App);

// Registro de PrimeVue
app.use(PrimeVue);

// Registro de componentes
app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('Menu', Menu);
app.component('Badge', Badge);
app.component('Avatar', Avatar);

app.mount('#app');
