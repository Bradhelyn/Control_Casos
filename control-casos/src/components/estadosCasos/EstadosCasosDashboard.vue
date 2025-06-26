<template>
  <div class="estados-casos-dashboard">
    <div class="nav-header">
      <div class="left-section">
        <img src="@/assets/Forense.png" alt="Logo Control de Casos" class="header-logo"/>
        <span class="header-title">Control de Estados de Casos</span>
      </div>
      <div class="right-section">
        <div class="info-card">
          <div class="info-card-content">
            <span class="info-number">{{ totalEstados }}</span>
            <span class="info-label">Total de Estados</span>
          </div>
          <div class="info-icon total">
            <span class="material-icons">assignment</span>
          </div>
        </div>
      </div>
    </div>
    
    <EstadosCasosTable @update-total="actualizarTotal" />
  </div>
</template>

<script>
import EstadosCasosTable from './EstadosCasosTable.vue';

export default {
  name: 'EstadosCasosDashboard',
  components: {
    EstadosCasosTable
  },
  data() {
    return {
      totalEstados: 0
    };
  },
  methods: {
    actualizarTotal(total) {
      this.totalEstados = total;
    }
  }
};
</script>

<style scoped>
.estados-casos-dashboard {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
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

.info-icon.total {
  background-color: #e3f2fd;
  color: #1976d2;
}
</style>
