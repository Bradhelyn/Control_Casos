<template>
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2>{{ isEditing ? 'Editar Recomendación' : 'Nueva Recomendación' }}</h2>
        <button class="close-button" @click="closeModal">
          <span class="material-icons">close</span>
        </button>
      </div>

      <div class="modal-content">
        <div class="form-section">
          <h3>Información básica</h3>
          <div class="form-grid">
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="recomendacion-id" v-model="formData.id" readonly class="readonly-field" placeholder=" ">
                <label for="recomendacion-id">ID</label>
              </div>
            </div>
            
            <div class="form-group">
              <div class="float-label-select">
                <select id="recomendacion-estado" v-model="formData.estado" @change="validateField('estado')">
                  <option value=""></option>
                  <option v-for="option in estados" :key="option.value" :value="option.value">{{ option.label }}</option>
                </select>
                <label for="recomendacion-estado">Estado</label>
              </div>
            </div>

            <div class="form-group full-width">
              <div class="float-label-group">
                <input type="text" id="recomendacion-titulo" v-model="formData.titulo" @blur="validateField('titulo')" placeholder=" ">
                <label for="recomendacion-titulo">Título</label>
              </div>
            </div>
            
            <div class="form-group">
              <div class="float-label-select">
                <select id="recomendacion-tipo" v-model="formData.tipo" @change="validateField('tipo')">
                  <option value=""></option>
                  <option v-for="option in tiposRecomendacion" :key="option.value" :value="option.value">{{ option.label }}</option>
                </select>
                <label for="recomendacion-tipo">Tipo de Recomendación</label>
              </div>
            </div>
            
            <div class="form-group">
              <div class="float-label-select">
                <select id="recomendacion-unidad" v-model="formData.unidad" @change="validateField('unidad')">
                  <option value=""></option>
                  <option v-for="option in unidades" :key="option.value" :value="option.value">{{ option.label }}</option>
                </select>
                <label for="recomendacion-unidad">Unidad a la que va dirigida</label>
              </div>
            </div>
            
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="recomendacion-contacto" v-model="formData.contacto" @blur="validateField('contacto')" placeholder=" ">
                <label for="recomendacion-contacto">Contacto</label>
              </div>
            </div>
            
            <div class="form-group full-width">
              <div class="float-label-group float-label-textarea">
                <textarea id="recomendacion-respuesta" v-model="formData.respuesta" @blur="validateField('respuesta')" rows="4" placeholder=" "></textarea>
                <label for="recomendacion-respuesta">Respuesta</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <div class="footer-content">
          <span v-if="showValidationMessage && errors.length > 0" class="validation-message">* Campos obligatorios</span>
          <div class="buttons-container">
            <button class="cancel-button" @click="closeModal">
              <span class="material-icons">close</span>
              <span>Cancelar</span>
            </button>
            <button class="submit-button" @click="submitForm">
              <span class="material-icons">save</span>
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuevaRecomendacionModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    recomendacionData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        id: '',
        titulo: '',
        estado: '',
        tipo: '',
        unidad: '',
        contacto: '',
        respuesta: '',
        fechaRegistro: '',
        usuarioRegistro: 'Usuario Actual'
      },
      isEditing: false,
      tiposRecomendacion: [
        { value: 'Preventiva', label: 'Preventiva' },
        { value: 'Correctiva', label: 'Correctiva' },
        { value: 'Mejora', label: 'Mejora' },
        { value: 'Regulatoria', label: 'Regulatoria' }
      ],
      unidades: [
        { value: 'Operaciones', label: 'Operaciones' },
        { value: 'Tecnología', label: 'Tecnología' },
        { value: 'Finanzas', label: 'Finanzas' },
        { value: 'Recursos Humanos', label: 'Recursos Humanos' },
        { value: 'Legal', label: 'Legal' },
        { value: 'Auditoría', label: 'Auditoría' }
      ],
      estados: [
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'En proceso', label: 'En proceso' },
        { value: 'Completada', label: 'Completada' },
        { value: 'Rechazada', label: 'Rechazada' }
      ],
      errors: [],
      showValidationMessage: false
    };
  },
  methods: {
    generateTempId() {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 900) + 100;
      return `R-${year}-${random}`;
    },
    validateField(fieldName) {
      const value = this.formData[fieldName];
      const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
      
      const errorIndex = this.errors.indexOf(fieldName);
      if (isEmpty && errorIndex === -1) {
        this.errors.push(fieldName);
      } else if (!isEmpty && errorIndex !== -1) {
        this.errors.splice(errorIndex, 1);
      }
      
      return !isEmpty;
    },
    validateForm() {
      this.errors = [];
      
      // Lista de campos obligatorios
      const requiredFields = ['titulo', 'estado', 'tipo'];
      
      requiredFields.forEach(field => {
        if (!this.validateField(field)) {
          this.errors.push(field);
        }
      });
      
      return this.errors.length === 0;
    },
    submitForm() {
      this.showValidationMessage = true;
      if (!this.validateForm()) {
        return;
      }
      
      // Agregar fecha actual
      this.formData.fechaRegistro = new Date().toISOString().split('T')[0];
      
      // Emitir el evento con los datos
      this.$emit('submit', { ...this.formData });
      this.resetForm();
      this.closeModal();
    },
    resetForm() {
      this.formData = {
        id: this.generateTempId(),
        titulo: '',
        estado: '',
        tipo: '',
        unidad: '',
        contacto: '',
        respuesta: '',
        fechaRegistro: '',
        usuarioRegistro: 'Usuario Actual'
      };
      this.errors = [];
      this.showValidationMessage = false;
    },
    closeModal() {
      this.$emit('close');
    },
    
    resetForm() {
      this.formData = {
        id: '',
        titulo: '',
        estado: '',
        tipo: '',
        dirigidoA: '',
        contacto: '',
        respuesta: '',
        fechaRegistro: '',
        usuarioRegistro: 'Usuario Actual'
      };
      this.isEditing = false;
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.show) {
        this.closeModal();
      }
    });
  },
  watch: {
    show(newVal) {
      if (newVal && this.recomendacionData) {
        // Estamos editando una recomendación existente
        this.formData = {...this.recomendacionData};
        this.isEditing = true;
      } else if (newVal && !this.recomendacionData) {
        // Estamos creando una nueva recomendación
        this.formData.id = this.generateTempId();
        this.isEditing = false;
      }
    },
    
    recomendacionData(newVal) {
      if (newVal && this.show) {
        this.formData = {...newVal};
        this.isEditing = true;
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
}

.modal-container {
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  animation: slide-in 0.2s ease-out;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  font-size: 18px;
  color: #3f51b5;
  font-weight: 600;
  margin: 0;
}

.close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background-color: #f5f5f5;
}

.modal-content {
  padding: 20px;
  overflow-y: auto;
  max-height: calc(90vh - 130px);
}

.form-section h3 {
  font-size: 16px;
  color: #555;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group.full-width {
  grid-column: span 2;
}

.float-label-group {
  position: relative;
  margin-bottom: 0;
}

.float-label-select {
  position: relative;
  margin-bottom: 0;
}

.float-label-group input,
.float-label-group textarea,
.float-label-select select {
  width: 100%;
  height: 50px;
  padding: 20px 12px 5px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: white;
  z-index: 1;
}

.float-label-textarea textarea {
  height: auto;
  padding-top: 24px;
}

.float-label-group label,
.float-label-select label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #666;
  font-weight: 400;
  transition: all 0.2s ease;
  z-index: 2;
  letter-spacing: 0.2px;
  pointer-events: none;
  padding: 0 5px;
}

/* Estilos para campos con contenido o en foco */
.float-label-group input:focus + label,
.float-label-group input:not(:placeholder-shown) + label,
.float-label-group textarea:focus + label,
.float-label-group textarea:not(:placeholder-shown) + label,
.float-label-select select:focus + label,
.float-label-select select:not([value=""]) + label {
  top: 8px;
  font-size: 11px;
  color: #3f51b5;
  transform: translateY(0);
  background-color: transparent;
  padding: 0 5px;
  z-index: 2;
}

/* Estilos para campos readonly */
.float-label-group .readonly-field {
  background-color: #f0f0f0;
  color: #555;
  cursor: default;
  padding-top: 18px;
  padding-bottom: 2px;
}

.float-label-group .readonly-field + label {
  top: 8px;
  font-size: 11px;
  color: #555;
  transform: translateY(0);
}

/* Estilos para el select */
.float-label-select select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 24px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6"><path d="M0,0 L12,0 L6,6 Z" fill="%23666"/></svg>'); 
  background-repeat: no-repeat;
  background-position: right 10px center;
}

/* Estilos para campos con foco */
.float-label-group input:focus,
.float-label-select select:focus,
.float-label-group textarea:focus {
  outline: none;
  border-color: #3f51b5;
  background-color: white;
  box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.1);
}

.modal-footer {
  display: flex;
  padding: 20px;
  border-top: 1px solid #f0f0f0;
  align-items: center;
}

.footer-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons-container {
  display: flex;
  gap: 15px;
  margin-left: auto;
  align-items: center;
}

.validation-message {
  color: #f44336;
  font-size: 14px;
}

.cancel-button {
  padding: 10px 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  height: 40px;
}

.cancel-button:hover {
  background-color: #f5f5f5;
  border-color: #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
}

.submit-button {
  padding: 10px 20px;
  background-color: #3f51b5;
  border: none;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(63,81,181,0.2);
  height: 40px;
}

.submit-button:hover {
  background-color: #303f9f;
  box-shadow: 0 3px 6px rgba(63,81,181,0.3);
}

.input-error {
  border-color: #f44336 !important;
  background-color: rgba(244, 67, 54, 0.05) !important;
  border-width: 2px !important;
}

.input-error + label {
  color: #f44336 !important;
}
</style>
