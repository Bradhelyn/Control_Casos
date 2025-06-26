<template>
  <header class="header">
    <div class="header-container">
      <!-- Banner con logo y título con fondo azul oscuro -->
      <div class="logo-title-section">
        <div class="brand-container">
          <!-- Logo SVG -->
          <div class="logo-super-big">
            <img src="@/assets/logo-escudo-forense.svg" alt="Logo Control de Casos" />
          </div>
          <h1 class="app-title">CONTROL DE CASOS</h1>
        </div>
      </div>

     

      <!-- Íconos de acciones -->
      <div class="action-icons">
        <div class="header-actions">
          <!-- Botón de búsqueda (lupa) -->
          <button class="action-button" @click.stop="toggleSearch">
            <span class="material-icons">search</span>
          </button>
          
          <!-- Campo de búsqueda expandible -->
          <div v-if="isSearchActive" class="search-field">
            <input 
              ref="searchInput"
              v-model="searchQuery" 
              @keyup.enter="performSearch"
              class="search-input" 
              placeholder="Buscar caso o expediente..."
              @click.stop
            />
            <button class="close-search-button" @click.stop="toggleSearch">
              <span class="material-icons">close</span>
            </button>
          </div>
          
          <!-- Botón de configuración (engranaje) con menú desplegable -->
          <div ref="settingsDropdown" class="settings-dropdown">
            <button class="action-button" @click.stop="toggleSettingsMenu($event)">
              <span class="material-icons">settings</span>
            </button>

            <!-- Menú desplegable de configuración -->
            <div v-show="isSettingsMenuOpen" class="dropdown-menu settings-menu" @click.stop>
              <div class="dropdown-header">Settings</div>
              
              <div class="dropdown-item theme-selector">
                <span class="setting-label">Color Scheme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>

          <!-- Botón de usuario (círculo) con menú desplegable -->
          <div class="user-dropdown">
            <button class="user-avatar" @click="toggleUserMenu">
              <img v-if="userPhotoUrl" :src="userPhotoUrl" alt="Usuario" class="user-photo">
              <span v-else class="material-icons profile-placeholder">person</span>
            </button>
            
            <!-- Menú desplegable con opciones -->
            <div v-if="isUserMenuOpen" class="dropdown-menu">
              <div class="dropdown-item">
                <span class="material-icons">lock</span>
                <span>Privacy</span>
              </div>
              
              <div class="dropdown-item" @click="openPhotoUpload">
                <span class="material-icons">add_a_photo</span>
                <span>Cambiar foto</span>
              </div>
              
              <div v-if="userPhotoUrl" class="dropdown-item" @click="removePhoto">
                <span class="material-icons">no_photography</span>
                <span>Eliminar foto</span>
              </div>
              
              <div class="dropdown-item">
                <span class="material-icons">logout</span>
                <span>Logout</span>
              </div>
              
              <!-- Input oculto para la subida de foto -->
              <input 
                ref="photoInput" 
                type="file" 
                @change="handlePhotoUpload" 
                accept="image/*" 
                style="display:none;"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ThemeToggle from './ThemeToggle.vue';

export default {
  name: 'NavHeader',
  components: {
    ThemeToggle
  },
  data() {
    return {
      isSearchActive: false,
      searchQuery: '',
      isUserMenuOpen: false,
      isSettingsMenuOpen: false,
      userPhotoUrl: null
    };
  },
  mounted() {
    // Agregar listener para cerrar el menú al hacer clic fuera
    document.addEventListener('click', this.handleOutsideClick);
    
    // Intentar cargar la foto del usuario desde localStorage
    const savedPhoto = localStorage.getItem('userPhoto');
    if (savedPhoto) {
      this.userPhotoUrl = savedPhoto;
    }
  },
  beforeDestroy() {
    // Limpiar listener cuando se destruye el componente
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    toggleSettingsMenu(event) {
      // Prevenir propagación del evento
      if (event) {
        event.stopPropagation();
      }
      
      // Cambiar el estado del menú
      this.isSettingsMenuOpen = !this.isSettingsMenuOpen;
      console.log('Menú de configuración:', this.isSettingsMenuOpen ? 'abierto' : 'cerrado');
      
      // Si abrimos settings, cerrar menú de usuario si está abierto
      if (this.isSettingsMenuOpen && this.isUserMenuOpen) {
        this.isUserMenuOpen = false;
      }
      
      // Asegurar que el menú sea visible en el siguiente ciclo de renderizado
      this.$nextTick(() => {
        if (this.isSettingsMenuOpen) {
          const menu = this.$refs.settingsDropdown.querySelector('.settings-menu');
          if (menu) {
            // Forzar la visibilidad del menú
            menu.style.display = 'block';
            menu.style.visibility = 'visible';
            menu.style.opacity = '1';
            menu.style.zIndex = '3000'; // Asegurar que esté por encima de otros elementos
            console.log('Menú de configuración aplicados estilos de visibilidad');
          } else {
            console.warn('No se encontró el elemento del menú de configuración');
          }
        }
      });
    },
    toggleSearch() {
      this.isSearchActive = !this.isSearchActive;
      if (this.isSearchActive) {
        // Focus en el campo de búsqueda cuando se activa
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      } else {
        this.searchQuery = '';
      }
    },
    performSearch() {
      if (this.searchQuery.trim() !== '') {
        console.log('Buscando:', this.searchQuery);
        this.$emit('search', this.searchQuery);
      }
    },
    // Métodos para el botón de usuario
    toggleUserMenu(event) {
      // Evitar que el evento se propague al documento
      if (event) {
        event.stopPropagation();
      }
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    handleOutsideClick(event) {
      // Cerrar el menú de usuario si se hace clic fuera de él
      const userDropdown = this.$el.querySelector('.user-dropdown');
      if (this.isUserMenuOpen && userDropdown && !userDropdown.contains(event.target)) {
        this.isUserMenuOpen = false;
      }

      // Cerrar el menú de configuración si se hace clic fuera de él
      const settingsDropdown = this.$el.querySelector('.settings-dropdown');
      if (this.isSettingsMenuOpen && settingsDropdown && !settingsDropdown.contains(event.target)) {
        this.isSettingsMenuOpen = false;
      }
    },
    openPhotoUpload() {
      // Abrir el selector de archivos cuando se hace clic en "Upload photo"
      this.$refs.photoInput.click();
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.userPhotoUrl = e.target.result;
          // Guardar en localStorage
          localStorage.setItem('userPhoto', this.userPhotoUrl);
          this.isUserMenuOpen = false; // Cerrar el menú después de seleccionar la imagen
          // Emitir evento para informar al componente padre sobre la nueva foto
          this.$emit('photo-changed', this.userPhotoUrl);
        };
        reader.readAsDataURL(file);
      }
    },
    removePhoto() {
      // Eliminar la foto de perfil
      this.userPhotoUrl = null;
      // Eliminar del localStorage
      localStorage.removeItem('userPhoto');
      // Cerrar el menú
      this.isUserMenuOpen = false;
      // Emitir evento
      this.$emit('photo-removed');
    }
  }
}
</script>

<style>
/* Importar Google Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

/* Estilos del encabezado (exactamente como en la referencia) */
/* La clase logo-title-section se define más abajo */

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px; /* Espaciado uniforme entre los botones */
}

.header-container {
  display: flex;
  align-items: center;
  height: 50px !important; /* Altura más reducida */
  padding: 0;
  background-color: #373aa9; /* Azul exacto como la imagen de referencia */
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* Sección con fondo azul para el logo y título */
.logo-title-section {
  height: 100%;
  background-color: #2e3c7e; /* Azul oscuro */
  color: white;
  display: flex;
  align-items: center;
  padding: 0 10px;
  min-width: 280px; /* Ancho mínimo garantizado */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Contenedor para el logo y el título juntos */
.brand-container {
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 15px;
}

/* Logo grande y simple */
.logo-big {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 15px;
  padding: 0;
  height: 100%;
}

.logo-super-big {
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-super-big img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  transition: transform 0.3s ease;
}

.logo-super-big img:hover {
  transform: scale(1.05);
}

/* Título de la aplicación */
.app-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  letter-spacing: 1px;
  white-space: nowrap;
  margin-left: 10px;
}

/* Botón de regreso amarillo (circular) */
.back-button-container {
  margin-left: 10px;
  margin-right: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #2196F3; /* Color azul en vez de amarillo */
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 2px rgba(0,0,0,0.1);
}

.back-button:hover {
  background-color: #FFD54F;
}

.back-button .material-icons {
  font-size: 24px;
  color: #333;
}

/* Íconos de acción (estilo Material Design exacto) */
.action-icons {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 16px;
}

/* Estilos para el campo de búsqueda como en la imagen */
.search-field {
  background-color: #f0f0f2;
  border-radius: 50px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  min-width: 200px;
  height: 40px;
  margin-right: 16px;
  cursor: text;
}

.search-icon {
  color: #9aa0a6;
  font-size: 20px;
  margin-right: 8px;
}

.search-text {
  color: #9aa0a6;
  font-size: 16px;
  font-weight: 400;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 15px;
  width: calc(100% - 30px); /* Dejar espacio para el botón de cierre */
  color: #333;
  font-family: inherit;
}

.close-search-button {
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 8px;
}

.close-search-button .material-icons {
  font-size: 20px;
  color: #666;
  transition: color 0.2s ease;
}

.close-search-button:hover .material-icons {
  color: #333;
}

.action-icon {
  background: none;
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  margin-left: 4px;
  transition: background-color 0.2s;
}

.action-icon:hover {
  background-color: rgba(255,255,255,0.1);
}

.notification-badge {
  position: absolute;
  top: 6px;
  right: 6px;
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

/* Estilos para el botón de usuario y menú desplegable */
.user-dropdown {
  position: relative;
  margin-left: 16px;
}

/* Botones de acción */
.action-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  margin: 0 4px;
}

.action-button .material-icons {
  font-size: 20px;
}

/* Botón de usuario */
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e89bb4; /* Color rosa como en la imagen */
  cursor: pointer;
  border: none;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.user-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-placeholder {
  color: white;
  font-size: 22px;
}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  width: 220px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  z-index: 2001;
  overflow: hidden;
  padding: 10px 0;
  animation: dropdownFade 0.2s ease;
  display: block;
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
  background-color: #f9f9fb;
}

.dropdown-item .material-icons {
  margin-right: 16px;
  font-size: 20px;
  color: #444;
  opacity: 0.8;
}

.dropdown-item span:not(.material-icons) {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* Estilos para menú de configuración */
.settings-dropdown {
  position: relative;
  z-index: 2000;
}

.dropdown-header {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
  margin-bottom: 6px;
}

.theme-selector {
  flex-direction: column;
  align-items: flex-start;
}

.setting-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.settings-menu {
  min-width: 240px;
  pointer-events: auto;
  visibility: visible;
  opacity: 1;
}

/* Estilo para los iconos de acción */
.action-icons {
  display: flex;
  align-items: center;
}
</style>
