<template>
  <div class="layout-container">
    <NavHeader />
    <div class="app-container">
      <Sidebar @dashboard-changed="changeDashboard" />
      <main class="main-content">
        <!-- Contenido principal de la aplicación -->
        <component :is="currentDashboard" v-if="currentDashboard"></component>
      </main>
    </div>
  </div>
</template>

<script>
import NavHeader from './components/layout/NavHeader.vue';
import Sidebar from './components/layout/Sidebar.vue';
import CasosDashboard from './components/casos/CasosDashboard.vue';
import TiposCasosDashboard from './components/tiposCasos/TiposCasosDashboard.vue';
import EstadosCasosDashboard from './components/estadosCasos/EstadosCasosDashboard.vue';
import EstadoRecomendacionesDashboard from './components/estadoRecomendaciones/EstadoRecomendacionesDashboard.vue';


export default {
  name: 'App',
  components: {
    NavHeader,
    Sidebar,
    CasosDashboard,
    TiposCasosDashboard,
    EstadosCasosDashboard,
    EstadoRecomendacionesDashboard
  },
  data() {
    return {
      currentDashboard: 'CasosDashboard'
    };
  },
  methods: {
    changeDashboard(dashboard) {
      // Convertir el nombre del dashboard a formato de componente (primera letra mayúscula + Dashboard)
      if (dashboard === 'tipos-casos') {
        this.currentDashboard = 'TiposCasosDashboard';
      } else if (dashboard === 'estados-casos') {
        this.currentDashboard = 'EstadosCasosDashboard';
      } else if (dashboard === 'estados-recomendaciones') {
        this.currentDashboard = 'EstadoRecomendacionesDashboard';
      } else {
        const componentName = dashboard.charAt(0).toUpperCase() + dashboard.slice(1) + 'Dashboard';
        this.currentDashboard = componentName;
      }
    }
  }
};
</script>

<style>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw !important;
}

.app-container {
  display: flex;
  flex: 1;
  height: calc(100vh - 100px); /* Restando la altura del NavHeader */
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: var(--bg-primary); /* Usar variables del tema */
  color: var(--text-primary); /* Usar variables del tema */
  transition: background-color 0.3s, color 0.3s; /* Transición suave */
}

h2 {
  margin-bottom: 20px;
  color: var(--text-primary);
}

p {
  color: var(--text-secondary);
}


/* Importar Google Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Estilos del encabezado */
.header {
  background-color: #3F51B5;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0;
  background-color: #373aa9;
}

/* Secciones del encabezado */
.left-section, .right-section {
  display: flex;
  align-items: center;
  height: 100%;
}

.left-section {
  flex: 1;
  justify-content: flex-start;
  padding-left: 20px;
}

.right-section {
  flex: 1;
  justify-content: flex-end;
  padding-right: 20px;
}

/* Logo y título */
.logo-section {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo {
  height: 80px;
  width: auto;
  margin-right: 15px;
}

.app-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
  color: #FFFFFF;
  text-transform: uppercase;
  font-family: 'Segoe UI', Arial, sans-serif;
}

/* Botón de regreso amarillo */
.back-button {
  width: 28px;
  height: 28px;
  background-color: #FFD600;
  color: #333;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #FFC400;
}

.back-button .material-icons {
  font-size: 16px;
}



/* Iconos de acción */
.action-icons {
  display: flex;
  align-items: center;
  margin-left: auto;
}

/* Estilos para el buscador */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.search-active {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
}

.search-input-container {
  position: absolute;
  right: 100%;
  top: 0;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 250px;
  height: 38px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 14px;
  height: 100%;
  color: #333;
}

.search-button {
  background: none;
  border: none;
  color: #373aa9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;
  height: 100%;
}

.icon-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.icon-button:hover {
  background-color: rgba(255,255,255,0.1);
}

.notification-button {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #F44336;
  color: white;
  font-size: 10px;
  min-width: 16px;
  height: 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 12px;
  border: 1px solid rgba(255,255,255,0.3);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Estilos para el botón de usuario y menú desplegable */
.user-dropdown {
  position: relative;
  margin-left: 16px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  cursor: pointer;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 0;
  margin: 0;
}

.user-photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  margin: 0;
  padding: 0;
}

.user-avatar .material-icons {
  color: #757575;
  font-size: 22px;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  width: 220px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  overflow: hidden;
  padding: 8px 0;
  animation: dropdownFade 0.2s ease;
}

@keyframes dropdownFade {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item .material-icons {
  margin-right: 16px;
  font-size: 20px;
  color: #444;
  opacity: 0.8;
}

.dropdown-item span:not(.material-icons) {
  font-size: 14px;
  font-weight: 400;
  color: #333;
}
</style>
