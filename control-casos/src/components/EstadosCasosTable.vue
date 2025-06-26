<template>
  <div class="estados-casos-container">
    <!-- Modal de confirmación para eliminación -->
    <div class="confirmation-modal" v-if="showConfirmationDialog" @click.self="cancelarEliminacion">
      <div class="confirmation-content">
        <div class="confirmation-header">
          <div class="confirmation-icon">
            <span class="material-icons">help</span>
          </div>
          <p>¿Está seguro(a) que desea eliminar este registro?</p>
        </div>
        <div class="confirmation-buttons">
          <button class="cancel-button" @click="cancelarEliminacion">No</button>
          <button class="confirm-button" @click="confirmarEliminacion">Yes</button>
        </div>
      </div>
    </div>
    <!-- Modal para nuevo/editar estado de caso -->
    <NuevoEstadoCasoModal 
      :show="showNuevoEstadoCasoModal" 
      :estados-casos="estadosCasos" 
      :estado-seleccionado="estadoSeleccionado"
      :modo-edicion="modoEdicion"
      @close="showNuevoEstadoCasoModal = false" 
      @submit="agregarNuevoEstadoCaso"
      @update="actualizarEstadoCaso" 
    />
    
    <div class="table-container">
      <div class="filters">
        <div class="search-field">
          <span class="material-icons">search</span>
          <input type="text" placeholder="Buscar estado de caso..." v-model="searchQuery" />
        </div>
        
        <div class="filter-options">
          <button class="nuevo-estado-button" @click="openNuevoEstadoCasoModal()">
            <div class="button-content">
              <div class="icon-circle">
                <span class="material-icons">add</span>
              </div>
              <span class="button-text">Nuevo Estado</span>
            </div>
            <div class="button-shine"></div>
          </button>
        </div>
      </div>
      
      <table class="estados-table">
        <thead>
          <tr>
            <th class="column-id">ID</th>
            <th class="column-descripcion">Descripción</th>
            <th class="column-porciento">Porciento</th>
            <th class="column-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estado in filteredEstados" :key="estado.id">
            <td>{{ estado.id }}</td>
            <td>{{ estado.descripcion }}</td>
            <td>{{ estado.porciento ? estado.porciento + '%' : '0%' }}</td>
            <td>
              <div class="action-icons">
                <span
                  class="material-icons action-icon edit-icon"
                  @click="editarEstadoCaso(estado)"
                  >edit</span
                >
                <span
                  class="material-icons action-icon delete-icon"
                  @click="eliminarEstadoCaso(estado.id)"
                  >delete</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination">
        <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">
          <span class="material-icons">chevron_left</span>
        </button>
        <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NuevoEstadoCasoModal from './NuevoEstadoCasoModal.vue';

export default {
  name: 'EstadosCasosTable',
  components: {
    NuevoEstadoCasoModal
  },
  mounted() {
    // Añadir listener para cerrar el dropdown cuando se hace clic fuera
    document.addEventListener('click', this.handleOutsideClick);
    
    // Emitir el total de estados inicialmente al montar el componente
    this.$emit('update-total', this.estadosCasos.length);
  },
  unmounted() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      first: 0,
      itemsPerPage: 5, // Límite de 5 registros por página
      showNuevoEstadoCasoModal: false,
      dropdownOpen: false,
      modoEdicion: false,
      estadoSeleccionado: null,
      showConfirmationDialog: false,
      idSeleccionadoParaEliminar: null,
      estadosCasos: [
        { id: 1, descripcion: 'Abierto', porciento: 10 },
        { id: 2, descripcion: 'En Proceso', porciento: 45 },
        { id: 3, descripcion: 'En Espera', porciento: 75 },
        { id: 4, descripcion: 'Resuelto', porciento: 100 },
        { id: 5, descripcion: 'Cerrado', porciento: 100 },
      ]
    };
  },
  computed: {
    displayedPageNumbers() {
      const pages = [];
      const maxVisible = 5;
      
      if (this.totalPages <= maxVisible) {
        // Show all pages if totalPages <= maxVisible
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Complex logic for showing pages with current page in the middle if possible
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let endPage = startPage + maxVisible - 1;
        
        if (endPage > this.totalPages) {
          endPage = this.totalPages;
          startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
      }
      
      return pages;
    },
    totalEstados() {
      return this.estadosCasos.length;
    },
    filteredEstados() {
      if (!this.searchQuery) {
        // Calcular el índice del primer elemento a mostrar
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        // Retornar la porción de la lista correspondiente a la página actual
        return this.estadosCasos.slice(startIndex, startIndex + this.itemsPerPage);
      }
      
      // Filtrar estados por la consulta de búsqueda
      const filtered = this.estadosCasos.filter(estado =>
        estado.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      
      // Para búsquedas, mostrar solo los resultados de la página actual
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return filtered.slice(startIndex, startIndex + this.itemsPerPage);
    },
    totalItems() {
      if (!this.searchQuery) {
        return this.estadosCasos.length;
      }
      return this.estadosCasos.filter(estado =>
        estado.descripcion.toLowerCase().includes(this.searchQuery.toLowerCase())
      ).length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage) || 1;
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
      this.first = 0;
    },
    estadosCasos: {
      handler(newValue) {
        // Emitir evento al componente padre con el total actualizado
        this.$emit('update', this.estadosCasos);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    goToFirstPage() {
      if (this.currentPage > 1) {
        this.currentPage = 1;
        this.first = 0;
      }
    },
    goToLastPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage = this.totalPages;
        this.first = (this.totalPages - 1) * this.itemsPerPage;
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.first = (page - 1) * this.itemsPerPage;
    },

    onRowsPerPageChange() {
      this.first = 0;
      this.currentPage = 1;
    },

    openNuevoEstadoCasoModal() {
      // Aseguramos que estamos en modo creación, no edición
      this.modoEdicion = false;
      this.estadoSeleccionado = null;
      this.showNuevoEstadoCasoModal = true;
    },
  
    // Alias para mantener compatibilidad con posibles llamadas existentes
    abrirNuevoEstadoCasoModal() {
      this.openNuevoEstadoCasoModal();
    },
    
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    
    selectOption(option) {
      this.itemsPerPage = option;
      this.dropdownOpen = false;
      this.onRowsPerPageChange();
    },
    
    handleOutsideClick(event) {
      const dropdown = this.$el.querySelector('.custom-dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        this.dropdownOpen = false;
      }
    },
    
    editarEstadoCaso(estado) {
      // Establecer el modo edición y guardar el estado seleccionado
      this.modoEdicion = true;
      this.estadoSeleccionado = {...estado}; // Clonar el objeto para evitar referencias
      
      // Mostrar el modal
      this.showNuevoEstadoCasoModal = true;
    },
    
    actualizarEstadoCaso(estadoActualizado) {
      // Verificar que no exista otro estado con la misma descripción (excepto el mismo)
      const descripcionExistente = this.estadosCasos.find(estado => 
        estado.id !== estadoActualizado.id && 
        estado.descripcion.toLowerCase() === estadoActualizado.descripcion.toLowerCase());
        
      if (descripcionExistente) {
        alert('Ya existe otro estado de caso con esta descripción');
        return;
      }
      
      // Actualizar el estado en la lista
      const index = this.estadosCasos.findIndex(estado => estado.id === estadoActualizado.id);
      
      if (index !== -1) {
        // Crear una nueva array para mantener la reactividad
        const nuevosEstadosCasos = [...this.estadosCasos];
        nuevosEstadosCasos[index] = estadoActualizado;
        this.estadosCasos = nuevosEstadosCasos;
        this.$emit('update', this.estadosCasos);
      }
    },
    
    agregarNuevoEstadoCaso(nuevoEstado) {
      // Primero, verificar que no existe ya un estado con esa descripción
      const descripcionExistente = this.estadosCasos.find(estado => 
        estado.descripcion.toLowerCase() === nuevoEstado.descripcion.toLowerCase());
        
      if (descripcionExistente) {
        alert('Ya existe un estado de caso con esta descripción');
        return;
      }
      
      // Añadir el nuevo estado a la lista
      const nuevosEstadosCasos = [...this.estadosCasos, nuevoEstado];
      
      // Ordenar por ID
      nuevosEstadosCasos.sort((a, b) => a.id - b.id);
      
      // Actualizar el array y emitir el evento
      this.estadosCasos = nuevosEstadosCasos;
      this.$emit('update', this.estadosCasos);
      
      // Emitir el nuevo total
      this.$emit('update-total', this.estadosCasos.length);
    },
    
    eliminarEstadoCaso(id) {
      // Guardar el ID para usarlo en confirmarEliminacion
      this.idSeleccionadoParaEliminar = id;
      this.showConfirmationDialog = true;
    },
    
    cancelarEliminacion() {
      // Cancelar la eliminación
      this.showConfirmationDialog = false;
      this.idSeleccionadoParaEliminar = null;
    },
    
    confirmarEliminacion() {
      // Eliminar el estado con el ID guardado
      if (this.idSeleccionadoParaEliminar) {
        // Filtrar la lista para excluir el estado que queremos eliminar
        this.estadosCasos = this.estadosCasos.filter(e => e.id !== this.idSeleccionadoParaEliminar);
        
        // Actualizar la vista emitiendo el evento
        this.$emit('update', this.estadosCasos);
        
        // Emitir el nuevo total
        this.$emit('update-total', this.estadosCasos.length);
      }
      
      // Ocultar el diálogo y resetear el ID
      this.showConfirmationDialog = false;
      this.idSeleccionadoParaEliminar = null;
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
};
</script>

<style scoped>
.tipos-casos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}

.left-section {
  display: flex;
  align-items: center;
}

.header-logo {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}

.header-title {
  color: #3f51b5;
  font-size: 18px;
  font-weight: 600;
}

.right-section {
  display: flex;
  align-items: center;
}

.count-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-radius: 4px;
}

.count-number {
  font-size: 20px;
  font-weight: 600;
  color: #333333;
}

.count-label {
  font-size: 12px;
  color: #666666;
}

.table-container {
  width: 100%;
  max-width: 800px; /* Limita la anchura para centralizar */
  margin: 0 auto;
  border: 2px solid #3f51b5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(63, 81, 181, 0.2);
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #ffffff;
}

.search-field {
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px 15px;
  width: 300px;
  border: none;
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

.nuevo-estado-button {
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

.nuevo-tipo-button:hover {
  box-shadow: 0 6px 20px rgba(41, 121, 255, 0.6);
  transform: translateY(-2px) scale(1.02);
  background: linear-gradient(135deg, #4557c0 0%, #1e88ff 100%);
}

.nuevo-tipo-button:active {
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
  z-index: 1;
  position: relative;
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

.icon-circle .material-icons {
  color: white;
  font-size: 16px;
}

.button-text {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: white;
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

.action-icons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.action-icon {
  color: #3f51b5;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.2s ease;
}

.action-icon:hover {
  color: #2979ff;
  transform: scale(1.1);
}

.edit-icon:hover {
  color: #3949ab;
}

.delete-icon:hover {
  color: #f44336;
}

/* Estilos para el modal de confirmación */
.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.confirmation-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 90%;
}

.confirmation-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.confirmation-icon {
  margin-right: 15px;
}

.confirmation-icon .material-icons {
  font-size: 24px;
  color: #616161;
}

.confirmation-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button {
  background-color: #f5f5f5;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button {
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

/* Estilos para la tabla */
.estados-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  margin-bottom: 0;
  border: none;
}

.estados-table th {
  text-align: center;
  padding: 15px 10px;
  background-color: #e8eeff;
  font-weight: 600;
  color: #3f51b5;
  border: 1px solid #d0d8ff;
  white-space: nowrap;
}

/* Estilos para las columnas específicas */
.column-id {
  width: 80px;
}

.column-descripcion {
  width: calc(100% - 200px); /* La descripción ocupará el espacio restante */
}

.column-acciones {
  width: 120px;
}

.estados-table td {
  padding: 15px 10px;
  border: 1px solid #e2e8f0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 60px;
  vertical-align: middle;
  font-size: 14px;
}

.estados-table td:last-child {
  text-align: center;
}

.estados-table tr:hover {
  background-color: #f5f7ff;
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
  color: #3f51b5;
}

.icon-button:hover {
  background-color: #f5f5f5;
  color: #1a237e;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-top: 1px solid #d0d8ff;
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

.pagination-container {
  margin-top: 15px;
  display: flex;
  justify-content: center;
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

.custom-dropdown {
  position: relative;
  margin-left: 20px;
}

.dropdown-selected {
  width: 75px;
  height: 40px;
  border: 1px solid #6366f1;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
}

.dropdown-selected .pi-chevron-down {
  color: #6366f1;
  font-size: 12px;
}

.dropdown-panel {
  position: absolute;
  top: 100%;
  left: 0;
  width: 75px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  z-index: 100;
  overflow: hidden;
  display: flex;
  border: 1px solid #e2e8f0;
}

.dropdown-options {
  flex-grow: 1;
  max-height: 150px;
  overflow-y: auto;
}

/* Ocultar scrollbar pero mantener funcionalidad */
.dropdown-options::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.dropdown-item {
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item.selected {
  background-color: #f0f0f0;
}

/* Scrollbar decorativa */
.scrollbar {
  width: 5px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 5px 3px;
}

.scrollbar-thumb {
  width: 5px;
  height: 30%;
  background-color: #d1d1d1;
  border-radius: 10px;
  margin-top: 10px;
}

.custom-paginator {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15px auto;
  padding: 10px 0;
  gap: 15px;
}



.page-nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #5f6c85;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 30px;
  height: 40px;
  padding: 0;
  margin: 0 3px;
}

.page-nav-btn:hover {
  color: #111827;
}

.page-nav-btn:disabled {
  color: #d1d5db;
  cursor: default;
}

.double-arrow {
  font-size: 18px;
}

.single-arrow {
  font-size: 22px;
  font-weight: 300;
}

.page-numbers {
  display: flex;
  gap: 15px;
  align-items: center;
  margin: 0 5px;
}

.page-number {
  width: 38px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #5f6c85;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number:hover {
  background-color: #f3f4f6;
}

.page-number.active {
  background-color: #111827;
  color: white;
  font-weight: 600;
}



:deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
  background-color: #eaecf0;
  color: #111827;
}

:deep(.p-paginator-page:not(.p-highlight):hover),
:deep(.p-paginator-first:hover),
:deep(.p-paginator-prev:hover),
:deep(.p-paginator-next:hover),
:deep(.p-paginator-last:hover) {
  background-color: #eaecf0;
}
</style>
