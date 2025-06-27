<template>
  <div class="modal-background" v-if="show" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ modoEdicion ? 'Editar Falta' : 'Nueva Falta' }}</h2>
        <button class="close-button" @click="closeModal">
          <span class="material-icons">close</span>
        </button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <div class="float-label-group">
              <input
                type="number"
                id="id"
                v-model="formData.id"
                readonly
                class="readonly-field"
                placeholder=" "
              />
              <label for="id">ID</label>
            </div>
          </div>
          
          <div class="form-group">
            <div class="float-label-group">
              <input
                type="text"
                id="tipoFalta"
                v-model="formData.tipoFalta"
                required
                placeholder=" "
              />
              <label for="tipoFalta">Tipo Falta</label>
            </div>
          </div>
          
          <div class="form-group">
            <div class="float-label-group">
              <input
                type="text"
                id="descripcion"
                v-model="formData.descripcion"
                required
                placeholder=" "
              />
              <label for="descripcion">Descripción</label>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-button" @click="closeModal">Cancelar</button>
            <button type="submit" class="submit-button">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'NuevoFaltaModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tiposCasos: {
      type: Array,
      default: () => []
    },
    tipoSeleccionado: {
      type: Object,
      default: null
    },
    modoEdicion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        id: '',
        tipoFalta: '',
        descripcion: ''
      }
    };
  },
  mounted() {
    this.generarNuevoId();
  },
  watch: {
    show(newVal) {
      if (newVal === true) {
        if (this.modoEdicion && this.tipoSeleccionado) {
          // Si estamos en modo edición, cargamos los datos del tipo seleccionado
          this.formData = {
            id: this.tipoSeleccionado.id,
            tipoFalta: this.tipoSeleccionado.tipoFalta,
            descripcion: this.tipoSeleccionado.descripcion
          };
        } else {
          // Si estamos creando uno nuevo, primero limpiamos completamente el formulario
          this.resetForm();
          // Luego generamos un nuevo ID
          this.generarNuevoId();
        }
      }
    }
  },
  methods: {
    closeModal() {
      // Solo emitimos el evento de cierre
      this.$emit('close');
      // Reseteamos el formulario después de cerrar
      setTimeout(() => this.resetForm(), 100);
    },
    handleSubmit() {
      // Valida que los campos requeridos estén completos
      if (!this.formData.tipoFalta || this.formData.tipoFalta.trim() === '') {
        alert('Por favor complete el Tipo de Falta');
        return;
      }
      
      if (!this.formData.descripcion || this.formData.descripcion.trim() === '') {
        alert('Por favor complete la descripción');
        return;
      }
      
      // Guardamos los datos antes de resetear
      const datosTipoCaso = { 
        id: parseInt(this.formData.id),
        tipoFalta: this.formData.tipoFalta.trim(),
        descripcion: this.formData.descripcion.trim()
      };
      
      // Primero cerramos el modal (esto oculta el modal)
      this.$emit('close');
      
      // Luego emitimos el evento correspondiente según el modo
      setTimeout(() => {
        if (this.modoEdicion) {
          this.$emit('update', datosTipoCaso);
        } else {
          this.$emit('submit', datosTipoCaso);
        }
      }, 50);
    },
    
    generarNuevoId() {
      // Si no hay tipos de casos, el nuevo ID será 1
      if (!this.tiposCasos || this.tiposCasos.length === 0) {
        this.formData.id = 1;
        return;
      }
      
      // Encuentra el ID más alto y añade 1
      const maxId = Math.max(...this.tiposCasos.map(tipo => tipo.id));
      this.formData.id = maxId + 1;
    },
    resetForm() {
      this.formData = {
        id: '',
        tipoFalta: '',
        descripcion: ''
      };
    }
  }
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #3f51b5;
  font-size: 20px;
  font-weight: 500;
}

.close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: #f5f5f5;
}

.close-button .material-icons {
  font-size: 24px;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}



.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;
}

/* Float Label */
.float-label-group {
  position: relative;
  width: 100%;
}

.float-label-group input,
.float-label-group select,
.float-label-group textarea {
  width: 100%;
  height: 50px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;
}

.float-label-group label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #666;
  transition: all 0.2s;
  background-color: transparent;
  z-index: 1;
  letter-spacing: 0.2px;
  pointer-events: none;
}

/* Estilo cuando el campo está enfocado o tiene contenido */
.float-label-group input:focus,
.float-label-group textarea:focus,
.float-label-group select:focus,
.float-label-group input:not(:placeholder-shown),
.float-label-group textarea:not(:placeholder-shown),
.float-label-group select:not([value=""]) {
  padding-top: 18px;
  padding-bottom: 2px;
  background-color: #fff;
}

.float-label-group input:focus,
.float-label-group textarea:focus,
.float-label-group select:focus {
  border-color: #3f51b5;
  box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.1);
}

/* Cuando el campo está enfocado o tiene contenido, la etiqueta flota arriba */
.float-label-group input:focus + label,
.float-label-group input:not(:placeholder-shown) + label,
.float-label-group textarea:focus + label,
.float-label-group textarea:not(:placeholder-shown) + label,
.float-label-group select:focus + label,
.float-label-group select:not([value=""]) + label {
  top: 8px;
  font-size: 11px;
  color: #3f51b5;
  font-weight: 500;
  transform: translateY(0);
}

.float-label-group input.readonly-field {
  background-color: #f0f0f0;
  color: #555;
  cursor: default;
  padding-top: 18px;
  padding-bottom: 2px;
}

.float-label-group input.readonly-field + label {
  top: 8px;
  font-size: 11px;
  color: #555;
  transform: translateY(0);
}

.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  border-color: #3f51b5;
  outline: none;
  box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
}

.readonly-field {
  background-color: #f5f5f5;
  cursor: not-allowed;
  color: #666;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
}

.cancel-button {
  padding: 10px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: #e0e0e0;
}

.submit-button {
  padding: 10px 20px;
  background-color: #3f51b5;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(63, 81, 181, 0.3);
}

.submit-button:hover {
  background-color: #303f9f;
  box-shadow: 0 3px 8px rgba(63, 81, 181, 0.4);
}
</style>
