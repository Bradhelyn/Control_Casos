<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-icons">
       
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        <div class="sidebar-title">DASHBOARDS</div>
        <ul>
         
          <li :class="{active: activeDashboard === 'sales'}" @click="navigateTo('sales')">
            <span class="material-icons">home</span>
            Home
          </li>
          <li :class="{active: activeDashboard === 'casos'}" @click="navigateTo('casos')">
            <span class="material-icons">bolt</span>
             Casos
          </li>
        </ul>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">APPS</div>
        <ul>
          <li>
            <div class="sidebar-item" @click="toggleMenu('blog')">
              <span class="material-icons">chat_bubble_outline</span>
              Blog
              <span class="material-icons arrow">{{ openMenus.blog ? 'expand_less' : 'expand_more' }}</span>
            </div>
            <ul v-if="openMenus.blog" class="submenu">
              <li>Sub Blog 1</li>
              <li>Sub Blog 2</li>
            </ul>
          </li>
          <li>
            <div class="sidebar-item" @click="toggleMenu('chat')">
              <span class="material-icons">question_answer</span>
              Chat
            </div>
          </li>
          <li>
            <div class="sidebar-item">
              <span class="material-icons">folder_open</span>
              Files
            </div>
          </li>
          <li>
            <div class="sidebar-item" @click="toggleMenu('mail')">
              <span class="material-icons">mail_outline</span>
              Mail
              <span class="material-icons arrow">{{ openMenus.mail ? 'expand_less' : 'expand_more' }}</span>
            </div>
            <ul v-if="openMenus.mail" class="submenu">
              <li>Inbox</li>
              <li>Sent</li>
            </ul>
          </li>
          <li>
            <div class="sidebar-item">
              <span class="material-icons">check_box</span>
              Task List
            </div>
          </li>
        </ul>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">UI KIT</div>
        <ul>
          <li>
            <div class="sidebar-item">
              <span class="material-icons">image</span>
              Form Layout
            </div>
          </li>
          <li>
            <div class="sidebar-item">
              <span class="material-icons">check_box</span>
              Input
            </div>
          </li>
          <li>
            <div class="sidebar-item">
              <span class="material-icons">view_in_ar</span>
              Button
            </div>
          </li>
        </ul>
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
        mail: false,
      },
      activeDashboard: 'casos',
    };
  },
  methods: {
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
  border-right: 1.5px solid #f1f1f1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 18px 16px 18px;
  border-bottom: 1px solid #f1f1f1;
}
.logo {
  height: 38px;
}
.sidebar-icons {
  display: flex;
  align-items: center;
  gap: 14px;
}
.user-icon, .logout-icon {
  font-size: 28px;
  color: #3a3a3a;
  cursor: pointer;
}
.logout-icon {
  color: #1e88e5;
}
.sidebar-nav {
  flex: 1;
  padding: 18px 0 0 0;
  overflow-y: auto;
}
.sidebar-section {
  margin-bottom: 26px;
}
.sidebar-title {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 20px;
  letter-spacing: 1px;
}
.sidebar-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-section li {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  color: #4a4a4a;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}
.sidebar-section li.active, .sidebar-section li:hover {
  background: #e3f2fd;
  color: #1e88e5;
}
.sidebar-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
}
.material-icons {
  font-size: 22px;
  margin-right: 10px;
}
.arrow {
  margin-left: auto;
  font-size: 20px;
}
.submenu {
  padding-left: 34px;
  margin-top: 3px;
}
.submenu li {
  font-size: 15px;
  color: #1e88e5;
  background: none;
  padding: 6px 0;
  border-radius: 0;
}
</style>
