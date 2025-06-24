<template>
  <div class="bitacora-dashboard" :class="{ 'collapsed': dashboardCollapsed }">
    <div class="dashboard-header">
      <div class="title-container">
        <img src="@/assets/Forense.png" alt="Logo Control de Casos" class="dashboard-logo"/>
        <h1>Bitácora</h1>
      </div>
      <button class="toggle-dashboard-btn" @click="toggleDashboard" :title="dashboardCollapsed ? 'Expandir Dashboard' : 'Colapsar Dashboard'">
        <span class="material-icons">{{ dashboardCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left' }}</span>
      </button>
    </div>
    
    <div class="cases-table-container">
      <div class="filters">
        <div class="search-field">
          <span class="material-icons">search</span>
          <input type="text" placeholder="Buscar en bitácora..." v-model="searchQuery" />
        </div>
        <div class="filter-options">
          <button class="filter-button">
            <span class="material-icons">filter_list</span>
            Filtros
          </button>
          <button class="nuevo-caso-button" @click="abrirNuevoRegistroModal()">
            <div class="button-content">
              <div class="icon-circle">
                <span class="material-icons">add</span>
              </div>
              <span class="button-text">Nuevo Registro</span>
            </div>
            <div class="button-shine"></div>
          </button>
        </div>
      </div>
      
      <table class="bitacora-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Fecha de Registro</th>
            <th>Usuario Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="registro in filteredRegistros" :key="registro.id">
            <td>{{ registro.descripcion }}</td>
            <td>{{ formatDate(registro.fechaRegistro) }}</td>
            <td>{{ registro.usuarioRegistro }}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination">
        <button class="pagination-button" :disabled="currentPage === 1">
          <span class="material-icons">chevron_left</span>
        </button>
        <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="pagination-button" :disabled="currentPage === totalPages">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BitacoraDashboard',
  data() {
    return {
      dashboardCollapsed: false,
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      showNuevoRegistroModal: false,
      registros: [
        {
          id: 1,
          descripcion: 'Se inició el análisis del caso forense',
          fechaRegistro: '2025-05-15T10:30:00',
          usuarioRegistro: 'Carlos Mendez'
        },
        {
          id: 2,
          descripcion: 'Revisión de evidencias digitales',
          fechaRegistro: '2025-05-16T14:20:00',
          usuarioRegistro: 'Ana Garcia'
        },
        {
          id: 3,
          descripcion: 'Entrevista con testigo principal',
          fechaRegistro: '2025-05-17T09:45:00',
          usuarioRegistro: 'Juan Rodriguez'
        },
        {
          id: 4,
          descripcion: 'Análisis de documentos encontrados',
          fechaRegistro: '2025-05-18T11:15:00',
          usuarioRegistro: 'Maria Perez'
        },
        {
          id: 5,
          descripcion: 'Recolección de pruebas adicionales',
          fechaRegistro: '2025-05-20T16:30:00',
          usuarioRegistro: 'Carlos Mendez'
        }
      ]
    };
  },
  computed: {
    filteredRegistros() {
      if (!this.searchQuery) {
        return this.registros;
      }
      
      const searchLower = this.searchQuery.toLowerCase();
      return this.registros.filter(registro => {
        return (
          registro.descripcion.toLowerCase().includes(searchLower) ||
          registro.usuarioRegistro.toLowerCase().includes(searchLower)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredRegistros.length / this.itemsPerPage);
    }
  },
  methods: {
    abrirNuevoRegistroModal() {
      this.showNuevoRegistroModal = true;
    },
    toggleDashboard() {
      this.dashboardCollapsed = !this.dashboardCollapsed;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    },
    agregarNuevoRegistro(nuevoRegistro) {
      const id = Math.max(0, ...this.registros.map(r => r.id)) + 1;
      this.registros.push({
        id,
        ...nuevoRegistro,
        fechaRegistro: new Date().toISOString()
      });
    }
  }
};
</script>

<style scoped>
.bitacora-dashboard {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

.bitacora-dashboard.collapsed .cases-table-container {
  display: none;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.title-container {
  display: flex;
  align-items: center;
}

.dashboard-logo {
  height: 40px;
  margin-right: 15px;
}

.title-container h1 {
  font-size: 24px;
  margin: 0;
  color: #3f51b5;
}

.toggle-dashboard-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.toggle-dashboard-btn:hover {
  background-color: #f5f5f5;
}

.cases-table-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
  overflow: auto;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-field {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px 12px;
  width: 300px;
}

.search-field .material-icons {
  color: #666;
  margin-right: 8px;
}

.search-field input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
}

.filter-options {
  display: flex;
  align-items: center;
  gap: 15px;
}

.filter-button {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
}

.filter-button .material-icons {
  margin-right: 8px;
  font-size: 20px;
}

/* Estilos para el botón de nuevo registro */
.nuevo-caso-button {
  background-color: #3f51b5;
  border: none;
  border-radius: 4px;
  padding: 0;
  height: 36px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(63, 81, 181, 0.3);
}

.button-content {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 100%;
  color: white;
}

.icon-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.button-text {
  font-weight: 500;
  font-size: 14px;
}

.button-shine {
  position: absolute;
  top: 0;
  left: -50px;
  width: 30px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  transform: skewX(-25deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% { left: -50px; }
  40% { left: 100%; }
  100% { left: 100%; }
}

/* Estilos para la tabla de bitácora */
.bitacora-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 20px;
  table-layout: fixed;
  border: 2px solid #3f51b5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.bitacora-table th {
  text-align: left;
  padding: 12px 16px;
  background-color: #f1f5ff;
  font-weight: 600;
  color: #3f51b5;
  border-bottom: 2px solid #3f51b5;
  border-right: 1px solid #e2e8f0;
  white-space: nowrap;
  position: relative;
}

/* Establecer anchos específicos para cada columna */
.bitacora-table th:nth-child(1) { width: 60%; } /* Descripción */
.bitacora-table th:nth-child(2) { width: 20%; } /* Fecha de Registro */
.bitacora-table th:nth-child(3) { width: 20%; } /* Usuario Registro */

.bitacora-table th:last-child {
  border-right: none;
}

.bitacora-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 60px;
  box-sizing: border-box;
  vertical-align: middle;
}

.bitacora-table td:last-child {
  border-right: none;
}

.bitacora-table tr:hover {
  background-color: #f8f9fd;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding-top: 20px;
}

.pagination-button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: default;
}

.pagination-button:not(:disabled):hover {
  background-color: #f5f5f5;
}

.page-info {
  margin: 0 16px;
  color: #666;
}
</style>
