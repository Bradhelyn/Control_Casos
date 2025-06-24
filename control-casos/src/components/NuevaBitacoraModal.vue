<template>
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2>{{ isEditing ? 'Editar' : 'Nueva' }} Bitácora</h2>
        <button class="close-button" @click="closeModal">
          <span class="material-icons">close</span>
        </button>
      </div>
      
      <div class="modal-content">
        <div class="form-section">
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              v-model="formData.descripcion"
              rows="5"
              placeholder="Ingrese la descripción..."
              @blur="validateField('descripcion')"
              :class="{ 'input-error': showValidationMessage && errors.includes('descripcion') }"
            ></textarea>
            <div class="validation-message" v-if="showValidationMessage && errors.includes('descripcion')">
              Este campo es obligatorio
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="cancel-button" @click="closeModal">
          <span class="material-icons">close</span> Cancelar
        </button>
        <button class="submit-button" @click="submitForm">
          <span class="material-icons">check</span> Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuevaBitacoraModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    bitacoraData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        descripcion: '',
        fechaRegistro: '',
        usuarioRegistro: 'Usuario Actual' // En una implementación real, obtendríamos el usuario actual
      },
      showValidationMessage: false,
      errors: [],
      isEditing: false
    };
  },
  methods: {
    initForm() {
      if (this.bitacoraData) {
        this.formData = { ...this.bitacoraData };
        this.isEditing = true;
      } else {
        this.resetForm();
        this.isEditing = false;
      }
    },
    
    closeModal() {
      this.$emit('close');
    },
    resetForm() {
      this.formData = {
        descripcion: '',
        fechaRegistro: '',
        usuarioRegistro: 'Usuario Actual'
      };
      this.showValidationMessage = false;
      this.errors = [];
    },
    validateField(field) {
      if (field === 'descripcion' && !this.formData.descripcion.trim()) {
        if (!this.errors.includes('descripcion')) {
          this.errors.push('descripcion');
        }
      } else if (field === 'descripcion' && this.formData.descripcion.trim()) {
        const index = this.errors.indexOf('descripcion');
        if (index !== -1) {
          this.errors.splice(index, 1);
        }
      }
    },
    validateForm() {
      this.errors = [];
      if (!this.formData.descripcion.trim()) {
        this.errors.push('descripcion');
      }
      this.showValidationMessage = this.errors.length > 0;
      return this.errors.length === 0;
    },
    submitForm() {
      if (this.validateForm()) {
        const nuevaEntrada = {
          descripcion: this.formData.descripcion.trim(),
          fechaRegistro: new Date().toISOString(),
          usuarioRegistro: this.formData.usuarioRegistro
        };
        
        this.$emit('submit', nuevaEntrada);
        this.closeModal();
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
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
}

.close-button:hover {
  color: #333;
  background-color: #f5f5f5;
}

.modal-content {
  padding: 20px;
  flex: 1;
}

.form-section {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  transition: border-color 0.2s;
  font-family: inherit;
}

textarea:focus {
  outline: none;
  border-color: #3f51b5;
  box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
}

textarea.input-error {
  border-color: #f44336;
  background-color: rgba(244, 67, 54, 0.05);
}

.validation-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid #e0e0e0;
  gap: 12px;
}

.cancel-button {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}

.submit-button {
  display: flex;
  align-items: center;
  padding: 8px 24px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #303f9f;
}

.cancel-button .material-icons,
.submit-button .material-icons {
  font-size: 18px;
  margin-right: 6px;
}
</style>
