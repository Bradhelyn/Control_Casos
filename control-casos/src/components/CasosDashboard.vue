<template>
  <div class="casos-dashboard" :class="{ 'collapsed': dashboardCollapsed }">
    <div class="dashboard-header">
      <div class="title-container">
        <img src="@/assets/logo-control-casos.svg" alt="Logo Control de Casos" class="dashboard-logo"/>
        <h1>Control de Casos</h1>
      </div>
      <button class="toggle-dashboard-btn" @click="toggleDashboard" :title="dashboardCollapsed ? 'Expandir Dashboard' : 'Colapsar Dashboard'">
        <span class="material-icons">{{ dashboardCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left' }}</span>
      </button>
      <div class="actions-container">
        <div class="info-cards">
          <div class="info-card">
            <div class="info-card-content">
              <span class="info-number">24</span>
              <span class="info-label">Casos Activos</span>
            </div>
            <div class="info-icon active">
              <span class="material-icons">play_arrow</span>
            </div>
          </div>
          <div class="info-card">
            <div class="info-card-content">
              <span class="info-number">158</span>
              <span class="info-label">Total de Casos</span>
            </div>
            <div class="info-icon total">
              <span class="material-icons">folder_special</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Botón de nuevo caso movido a los filtros -->
    
    <div class="cases-table-container">
      <div class="filters">
        <div class="search-field">
          <span class="material-icons">search</span>
          <input type="text" placeholder="Buscar caso..." v-model="searchQuery" />
        </div>
        <div class="filter-options">
          <button class="filter-button">
            <span class="material-icons">filter_list</span>
            Filtros
          </button>
          <select class="status-filter" v-model="statusFilter">
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="closed">Cerrados</option>
            <option value="pending">Pendientes</option>
          </select>
          
          <button class="nuevo-caso-button">
            <div class="button-content">
              <div class="icon-circle">
                <span class="material-icons">add</span>
              </div>
              <span class="button-text">Nuevo Caso</span>
            </div>
            <div class="button-shine"></div>
          </button>
        </div>
      </div>
      
      <table class="cases-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Fecha Apertura</th>
            <th>Responsable</th>
            <th>No. Comunicacion</th>
            <th>Oficina</th>
            <th>Tipo de caso</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="caso in filteredCasos" :key="caso.id">
            <td>{{ caso.id }}</td>
            <td>{{ caso.titulo }}</td>
            <td>{{ formatDate(caso.fechaApertura) }}</td>
            <td>{{ caso.responsable }}</td>
            <td>{{ caso.numeroComunicacion || '-' }}</td>
            <td>{{ caso.oficina || '-' }}</td>
            <td>{{ caso.tipoCaso || '-' }}</td>
            <td>
              <span class="status-badge" :class="getStatusClass(caso.estado)">
                {{ caso.estado }}
              </span>
            </td>
            <td>
              <div class="actions">
                <button class="icon-button" title="Editar">
                  <span class="material-icons">edit</span>
                </button>
                <button class="icon-button" title="Ver detalles">
                  <span class="material-icons">visibility</span>
                </button>
                <button class="icon-button" title="Eliminar">
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </td>
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
  name: 'CasosDashboard',
  data() {
    return {
      dashboardCollapsed: false,
      searchQuery: '',
      statusFilter: 'all',
      currentPage: 1,
      totalPages: 5,
      casos: [
        {
          id: 'C-2023-001',
          titulo: 'Investigación de robo en oficinas centrales',
          fechaApertura: new Date(2023, 0, 15),
          responsable: 'Juan Pérez',
          estado: 'Activo'
        },
        {
          id: 'C-2023-002',
          titulo: 'Auditoría de seguridad informática',
          fechaApertura: new Date(2023, 1, 22),
          responsable: 'María Gómez',
          estado: 'Cerrado'
        },
        {
          id: 'C-2023-003',
          titulo: 'Verificación de documentos financieros',
          fechaApertura: new Date(2023, 2, 10),
          responsable: 'Carlos Rodríguez',
          estado: 'Pendiente'
        },
        {
          id: 'C-2023-004',
          titulo: 'Investigación de fraude interno',
          fechaApertura: new Date(2023, 3, 5),
          responsable: 'Ana López',
          estado: 'Activo'
        },
        {
          id: 'C-2023-005',
          titulo: 'Peritaje informático en caso judicial',
          fechaApertura: new Date(2023, 4, 18),
          responsable: 'Roberto Sánchez',
          estado: 'En proceso'
        }
      ]
    };
  },
  computed: {
    filteredCasos() {
      // Aplicar filtro de búsqueda
      let result = this.casos;
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(caso => 
          caso.id.toLowerCase().includes(query) ||
          caso.titulo.toLowerCase().includes(query) ||
          caso.responsable.toLowerCase().includes(query)
        );
      }
      
      // Aplicar filtro de estado
      if (this.statusFilter !== 'all') {
        const mapFilter = {
          'active': 'Activo',
          'closed': 'Cerrado',
          'pending': 'Pendiente'
        };
        result = result.filter(caso => 
          caso.estado.toLowerCase() === mapFilter[this.statusFilter].toLowerCase()
        );
      }
      
      return result;
    }
  },
  methods: {
    toggleDashboard() {
      this.dashboardCollapsed = !this.dashboardCollapsed;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES');
    },
    getStatusClass(status) {
      const statusMap = {
        'Activo': 'active',
        'Cerrado': 'closed',
        'Pendiente': 'pending',
        'En proceso': 'in-progress'
      };
      
      return statusMap[status] || 'default';
    }
  }
};
</script>

<style scoped>
.casos-dashboard {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

.casos-dashboard.collapsed .cases-table-container {
  display: none;
}

.toggle-dashboard-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #3f51b5;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  margin-left: 15px;
}

.toggle-dashboard-btn:hover {
  background-color: #303f9f;
  transform: scale(1.05);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title-container {
  display: flex;
  align-items: center;
}

.dashboard-logo {
  height: 42px;
  margin-right: 16px;
}

h1 {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  color: #3f51b5;
}

.actions-container {
  display: flex;
  gap: 20px;
  align-items: center;
}

.info-cards {
  display: flex;
  gap: 16px;
}

.info-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  min-width: 180px;
}

.info-card-content {
  display: flex;
  flex-direction: column;
}

.info-number {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.info-label {
  font-size: 13px;
  color: #666;
  margin-top: 2px;
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.info-icon.active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.info-icon.total {
  background-color: #e3f2fd;
  color: #1976d2;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

/* Eliminado el contenedor flotante que ya no se utiliza */

.nuevo-caso-button {
  background: linear-gradient(135deg, #3F51B5 0%, #2979ff 100%);
  color: white;
  border: none;
  border-radius: 22px;
  padding: 0;
  font-weight: 500;
  box-shadow: 0 3px 8px rgba(63, 81, 181, 0.4);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  height: 44px;
  min-width: 150px;
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 3px 8px rgba(63, 81, 181, 0.4);
  }
  50% {
    box-shadow: 0 3px 15px rgba(41, 121, 255, 0.6);
  }
  100% {
    box-shadow: 0 3px 8px rgba(63, 81, 181, 0.4);
  }
}

.button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  animation: shine 4s infinite;
}

@keyframes shine {
  0% { left: -100%; opacity: 0.7; }
  20% { left: 100%; opacity: 0.7; }
  100% { left: 100%; opacity: 0; }
}

.nuevo-caso-button:hover {
  box-shadow: 0 6px 20px rgba(41, 121, 255, 0.6);
  transform: translateY(-2px) scale(1.02);
  background: linear-gradient(135deg, #4557c0 0%, #1e88ff 100%);
}

.nuevo-caso-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(63, 81, 181, 0.4);
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 15px;
  gap: 8px;
}

.icon-circle {
  background-color: rgba(255, 255, 255, 0.25);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-text {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.action-button .material-icons {
  margin-right: 8px;
  font-size: 20px;
}

.cases-table-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  overflow-x: auto;
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

.status-filter {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
}

.cases-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 20px;
  table-layout: fixed;
  min-width: 1400px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.cases-table th {
  text-align: left;
  padding: 12px 16px;
  background-color: #f1f5ff;
  font-weight: 600;
  color: #3f51b5;
  border-bottom: 2px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  white-space: nowrap;
  position: relative;
}

/* Establecer anchos específicos para cada columna */
.cases-table th:nth-child(1) { width: 100px; } /* ID - aumentado para evitar que se achique */
.cases-table th:nth-child(2) { width: 250px; } /* Título */
.cases-table th:nth-child(3) { width: 150px; } /* Fecha Apertura */
.cases-table th:nth-child(4) { width: 180px; } /* Responsable */
.cases-table th:nth-child(5) { width: 160px; } /* No. Comunicacion */
.cases-table th:nth-child(6) { width: 150px; } /* Oficina */
.cases-table th:nth-child(7) { width: 180px; } /* Tipo de caso */
.cases-table th:nth-child(8) { width: 120px; } /* Estado */
.cases-table th:nth-child(9) { width: 140px; } /* Acciones */

.cases-table th:last-child {
  border-right: none;
}

.cases-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 60px;
  box-sizing: border-box;
  vertical-align: middle;
}

.cases-table td:last-child {
  border-right: none;
  padding: 0;
}

.cases-table tr:hover {
  background-color: #f8f9fd;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
}

.status-badge.active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status-badge.closed {
  background-color: #e0e0e0;
  color: #5f5f5f;
}

.status-badge.pending {
  background-color: #fff8e1;
  color: #ff8f00;
}

.status-badge.in-progress {
  background-color: #e3f2fd;
  color: #1976d2;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.icon-button {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  color: #3f51b5; /* Color de iconos para que sean visibles */
}

.icon-button:hover {
  background-color: #f5f5f5;
  color: #1a237e; /* Color más oscuro al pasar el mouse */
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
