<template>
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Nueva Asignación</h2>
        <button class="close-button" @click="closeModal">
          <span class="material-icons">close</span>
        </button>
      </div>

      <div class="modal-content">
        <div class="form-section">
          <div class="form-group">
            <label>Usuario a Asignar</label>
            <div class="custom-select">
              <select v-model="formData.usuario" @change="validateField('usuario')">
                <option value=""></option>
                <option v-for="usuario in usuarios" :key="usuario.value" :value="usuario.value">
                  {{ usuario.label }}
                </option>
              </select>
              <div class="select-arrow">
                <span class="material-icons">keyboard_arrow_down</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Observaciones</label>
            <textarea 
              v-model="formData.observaciones" 
              @blur="validateField('observaciones')"
              rows="4" 
              placeholder=""
            ></textarea>
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
  name: 'NuevaAsignacionModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    asignacionData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        id: '',
        usuario: '',
        observaciones: '',
        fechaRegistro: '',
        usuarioRegistro: 'Usuario Actual' // Reemplazar con el usuario actual del sistema
      },
      usuarios: [
        { value: 'usuario1', label: 'Usuario 1' },
        { value: 'usuario2', label: 'Usuario 2' },
        { value: 'usuario3', label: 'Usuario 3' }
      ],
      errors: [],
      isEditing: false,
      showValidationMessage: false
    };
  },
  methods: {
    generateTempId() {
      return 'ASIG-' + new Date().getTime().toString().slice(-6);
    },
    validateField(fieldName) {
      // Simple validation for required fields
      if (fieldName === 'usuario' && !this.formData.usuario) {
        if (!this.errors.includes('usuario')) this.errors.push('usuario');
      } else if (this.errors.includes('usuario')) {
        this.errors = this.errors.filter(error => error !== 'usuario');
      }
    },
    validateForm() {
      this.errors = [];
      
      if (!this.formData.usuario) {
        this.errors.push('usuario');
      }
      
      this.showValidationMessage = this.errors.length > 0;
      return this.errors.length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        const asignacionData = {...this.formData};
        
        if (!this.isEditing) {
          asignacionData.id = this.generateTempId();
          asignacionData.fechaRegistro = new Date().toISOString();
        }
        
        this.$emit('save-asignacion', asignacionData, this.isEditing);
        this.closeModal();
      }
    },
    resetForm() {
      this.formData = {
        id: '',
        usuario: '',
        observaciones: '',
        fechaRegistro: '',
        usuarioRegistro: 'Usuario Actual' // Reemplazar con usuario actual
      };
      this.errors = [];
      this.showValidationMessage = false;
    },
    closeModal() {
      this.resetForm();
      this.$emit('close');
    }
  },
  watch: {
    show(newVal) {
      if (newVal && this.asignacionData) {
        this.isEditing = true;
        this.formData = {...this.asignacionData};
      } else if (newVal) {
        this.isEditing = false;
        this.resetForm();
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
}

.modal-container {
  width: 450px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #fff;
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
  background-color: #f8f9fa;
}

.form-section {
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.custom-select {
  position: relative;
  width: 100%;
}

.custom-select select {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
}

.select-arrow {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 40px;
  padding-right: 10px;
  pointer-events: none;
}

.select-arrow .material-icons {
  font-size: 20px;
  color: #666;
}

.button-icon {
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  resize: none;
  min-height: 100px;
}

.modal-footer {
  display: flex;
  padding: 20px;
  background-color: #f8f9fa;
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
  justify-content: flex-end;
  gap: 15px;
  margin-left: auto;
  align-items: center;
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

.input-error + .validation-message {
  color: #f44336;
  font-size: 14px;
}
</style>
