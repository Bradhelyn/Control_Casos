<template>
  <aside class="sidebar" :class="{collapsed: isCollapsed}">
    <div class="sidebar-toggle">
      <button @click="toggleSidebar" class="toggle-btn">
        <span class="material-icons">{{ isCollapsed ? 'menu_open' : 'menu' }}</span>
      </button>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        <div class="sidebar-title">DASHBOARDS</div>
        <ul>
          <li :class="{active: activeDashboard === 'home'}" @click="navigateTo('home')">
            <span class="material-icons">home</span>
            <span class="menu-text">Home</span>
          </li>
          <li :class="{active: activeDashboard === 'casos'}" @click="navigateTo('casos')">
            <span class="material-icons">schedule</span>
            <span class="menu-text">Casos</span>
          </li>
          <li :class="{active: activeDashboard === 'tipos-casos'}" @click="navigateTo('tipos-casos')">
            <span class="material-icons">category</span>
            <span class="menu-text">Tipos de Casos</span>
          </li>
          <li :class="{active: activeDashboard === 'estados-casos'}" @click="navigateTo('estados-casos')">
            <span class="material-icons">insights</span>
            <span class="menu-text">Estados de Casos</span>
          </li>
          <li :class="{active: activeDashboard === 'estados-recomendaciones'}" @click="navigateTo('estados-recomendaciones')">
            <span class="material-icons">assignment_turned_in</span>
            <span class="menu-text">Estados de Recomendaciones</span>
          </li>
          <li :class="{active: activeDashboard === 'tipos-recomendaciones'}" @click="navigateTo('tipos-recomendaciones')">
            <span class="material-icons">description</span>
            <span class="menu-text">Tipos de Recomendaciones</span>
          </li>
          <li :class="{active: activeDashboard === 'medios-recepcion'}" @click="navigateTo('medios-recepcion')">
            <span class="material-icons">input</span>
            <span class="menu-text">Medios de Recepción</span>
          </li>
          <li :class="{active: activeDashboard === 'faltas'}" @click="navigateTo('faltas')">
            <span class="material-icons">warning</span>
            <span class="menu-text">Faltas</span>
          </li>
        </ul>
      </div>
      
      <div class="sidebar-section">
        <div class="sidebar-title">APPS</div>
        <ul>
          <li @click="toggleSubMenu('blog')">
            <div class="sidebar-item">
              <span class="material-icons">chat_bubble_outline</span>
              <span class="menu-text">Blog</span>
              <span class="material-icons arrow" :class="{rotated: openMenus.blog}">keyboard_arrow_down</span>
            </div>
          </li>
          <li @click="toggleSubMenu('chat')">
            <div class="sidebar-item">
              <span class="material-icons">forum</span>
              <span class="menu-text">Chat</span>
            </div>
          </li>
          <li @click="toggleSubMenu('files')">
            <div class="sidebar-item">
              <span class="material-icons">folder</span>
              <span class="menu-text">Files</span>
            </div>
          </li>
          <li @click="toggleSubMenu('mail')">
            <div class="sidebar-item">
              <span class="material-icons">email</span>
              <span class="menu-text">Mail</span>
              <span class="material-icons arrow" :class="{rotated: openMenus.mail}">keyboard_arrow_down</span>
            </div>
          </li>
          <li @click="toggleSubMenu('tasks')">
            <div class="sidebar-item">
              <span class="material-icons">check_box</span>
              <span class="menu-text">Task List</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">UI KIT</div>
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      openMenus: {
        blog: false,
        mail: false
      },
      activeDashboard: 'casos',
      isCollapsed: false,
    };
  },

  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleSubMenu(menu) {
      this.openMenus[menu] = !this.openMenus[menu];
    },
    toggleMenu(menu) {
      this.openMenus[menu] = !this.openMenus[menu];
    },
    logout() {
      // Acción de cierre de sesión
      alert('Sesión cerrada');
    },
    navigateTo(dashboard) {
      this.activeDashboard = dashboard;
      // Emite evento para que el componente padre sepa qué vista mostrar
      this.$emit('dashboard-changed', dashboard);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
.sidebar {
  width: 260px;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Arial, sans-serif;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  padding-left: 0;
  overflow-y: auto;
  transition: width 0.3s ease;
}
.sidebar.collapsed {
  width: 60px;
}
.sidebar-nav {
  flex: 1;
  padding: 15px 0 0 0;
  overflow-y: auto;
}
.sidebar-section {
  margin-bottom: 24px;
}
.sidebar-title {
  font-size: 13px;
  font-weight: 600;
  color: #72757a;
  margin: 0 0 10px 20px;
  letter-spacing: 0.5px;
}
.sidebar-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-section li {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 2px 0;
}
.sidebar-section li.active {
  background: #f5f5f5;
  color: #3f51b5;
  position: relative;
}
.sidebar-section li.active:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #3f51b5;
}
.sidebar-section li:hover {
  background: #f5f5f5;
  color: #3f51b5;
}
.sidebar-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
}
.material-icons {
  font-size: 20px;
  margin-right: 8px;
  color: #666;
}
.sidebar-toggle {
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
}
.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background 0.3s ease;
}
.toggle-btn:hover {
  background: #f0f0f0;
}
.toggle-btn .material-icons {
  margin-right: 0;
  color: #3f51b5;
}
.arrow {
  margin-left: auto;
  font-size: 18px;
  transition: transform 0.3s ease;
  color: #aaa;
}
.arrow.rotated {
  transform: rotate(180deg);
}
.submenu {
  padding-left: 15px;
  margin-top: 3px;
  transition: all 0.3s ease;
  max-height: 0;
  overflow: hidden;
}
.submenu.open {
  max-height: 500px;
}
.submenu li {
  font-size: 14px;
  color: #555;
  background: none;
  padding: 8px 10px 8px 48px;
  margin: 0;
}
.submenu li.active {
  color: #3f51b5;
  background: #f0f0f0;
}
.menu-text {
  flex: 1;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.3s ease;
}

.collapsed .menu-text,
.collapsed .arrow {
  opacity: 0;
  visibility: hidden;
}

.collapsed .sidebar-title {
  opacity: 0;
  height: 0;
  margin: 0;
  overflow: hidden;
}

.collapsed .sidebar-section li {
  padding: 15px 0;
  display: flex;
  justify-content: center;
}

.collapsed .material-icons {
  margin-right: 0;
}
</style>
