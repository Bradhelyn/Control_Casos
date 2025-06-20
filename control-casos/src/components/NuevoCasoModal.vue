<template>
  <div class="modal-overlay" v-if="show" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Nuevo Caso</h2>
        <button class="close-button" @click="closeModal">
          <span class="material-icons">close</span>
        </button>
      </div>
      
      <div class="modal-content">
        <div class="form-section">
          <h3>Información Básica</h3>
          
          <div class="form-grid">
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="id" v-model="formData.id" readonly class="readonly-field" placeholder=" ">
                <label for="id">ID</label>
              </div>
            </div>
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="noComunicacion" v-model="formData.noComunicacion" @blur="validateField('noComunicacion')" placeholder=" ">
                <label for="noComunicacion">No. Comunicación</label>
              </div>
            </div>


            <!-- Campo vacío para mantener la alineación en la cuadrícula -->
            <div class="form-group"></div>
            <div class="form-group full-width">
              <div class="float-label-group">
                <input type="text" id="titulo" v-model="formData.titulo" @blur="validateField('titulo')" placeholder=" ">
                <label for="titulo">Asunto</label>
              </div>
            </div>
            
          
            
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="emisor" v-model="formData.emisorComunicacion" @blur="validateField('emisorComunicacion')" placeholder=" ">
                <label for="emisor">Emisor Comunicación</label>
              </div>
            </div>
            
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="receptor" v-model="formData.receptorDestinatario" @blur="validateField('receptorDestinatario')" placeholder=" ">
                <label for="receptor">Monto Detectado</label>
              </div>
            </div>
            
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="asunto" v-model="formData.asuntoInvestigado" @blur="validateField('asuntoInvestigado')" placeholder=" ">
                <label for="asunto">Destinatario Comunicación</label>
              </div>
            </div>
            
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="destinatario" v-model="formData.destinatarioComunicacion" @blur="validateField('destinatarioComunicacion')" placeholder=" ">
                <label for="destinatario">Monto Investigado</label>
              </div>
            </div>
            

            <div class="form-group">
              <div class="float-label-group">
                <input type="date" id="fechaComunicacion" v-model="formData.fechaComunicacion" @blur="validateField('fechaComunicacion')" placeholder=" ">
                <label for="fechaComunicacion">Fecha de Comunicación</label>
              </div>
            </div>

            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="asuntoRespondido" v-model="formData.asuntoRespondido" @blur="validateField('asuntoRespondido')" placeholder=" ">
                <label for="asuntoRespondido">Monto Recuperado</label>
              </div>
            </div>
            
           
            <div class="form-group">
              <div class="float-label-group">
                <input type="date" id="fechaRecibido" v-model="formData.fechaRecibido" @blur="validateField('fechaRecibido')" placeholder=" ">
                <label for="fechaRecibido">Fecha Recibido</label>
              </div>
            </div>
            
            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="asuntoPericial" v-model="formData.asuntoPericial" @blur="validateField('asuntoPericial')" placeholder=" ">
                <label for="asuntoPericial">Monto Perdida</label>
              </div>
            </div>
            
           
            <div class="form-group">
              <SearchableSelect 
                :options="oficinas" 
                v-model="formData.oficina" 
                @update:modelValue="validateField('oficina')"
                label="Oficina"
                :hasError="showValidationMessage && errors.includes('oficina')"
              />
            </div>


            <div class="form-group">
              <div class="float-label-group">
                <input type="text" id="cuentaAfectada" v-model="formData.cuentaAfectada" @blur="validateField('cuentaAfectada')" placeholder=" ">
                <label for="cuentaAfectada">Cuenta Afectada</label>
              </div>
            </div>
            
            <div class="form-group">
              <SearchableSelect 
                :options="tiposCaso" 
                v-model="formData.tipoCaso" 
                @update:modelValue="validateField('tipoCaso')"
                label="Tipo de Caso"
                :hasError="showValidationMessage && errors.includes('tipoCaso')"
              />
            </div>
            
            <div class="form-group">
              <SearchableSelect 
                :options="mediosRecepcion" 
                v-model="formData.medioRecepcion" 
                @update:modelValue="validateField('medioRecepcion')"
                label="Medio de Recepción"
                :hasError="showValidationMessage && errors.includes('medioRecepcion')"
              />
            </div>
            
            <div class="form-group">
              <SearchableSelect 
                :options="estados" 
                v-model="formData.estado" 
                @update:modelValue="validateField('estado')"
                label="Estado"
                :hasError="showValidationMessage && errors.includes('estado')"
              />
            </div>
            
            <div class="form-group full-width">
              <div class="float-label-group float-label-textarea">
                <textarea id="referencia" v-model="formData.referenciaComunicacion" @blur="validateField('referenciaComunicacion')" rows="3" placeholder=" "></textarea>
                <label for="referencia">Referencia o Comunicación</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <div class="footer-content">
          <span v-if="showValidationMessage && errors.length > 0" class="validation-message">* Campos obligatorios</span>
          <div class="buttons-container">
            <button class="cancel-button" @click="closeModal">Cancelar</button>
            <button class="submit-button" @click="submitForm">
              <span class="material-icons">save</span>
              Guardar Caso
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchableSelect from './SearchableSelect.vue';

export default {
  name: 'NuevoCasoModal',
  components: {
    SearchableSelect
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      errors: [],
      showValidationMessage: false,
      formData: {
        id: this.generateTempId(),
        titulo: '',
        noComunicacion: '',
        emisorComunicacion: '',
        receptorDestinatario: '',
        asuntoInvestigado: '',
        destinatarioComunicacion: '',
        asuntoRespondido: '',
        fechaComunicacion: '',
        asuntoPericial: '',
        fechaRecibido: '',
        asuntoPendiente: '',
        cuentaAfectada: '',
        oficina: '',
        tipoCaso: '',
        medioRecepcion: '',
        estado: '',
        referenciaComunicacion: ''
      },
      oficinas: [
        { value: 'Central', label: 'Central' },
        { value: 'Regional Norte', label: 'Regional Norte' },
        { value: 'Regional Sur', label: 'Regional Sur' },
        { value: 'Regional Este', label: 'Regional Este' },
        { value: 'Regional Oeste', label: 'Regional Oeste' },
        { value: 'Sucursal Metropolitana', label: 'Sucursal Metropolitana' },
        { value: 'Oficina Provincial', label: 'Oficina Provincial' }
      ],
      tiposCaso: [
        { value: 'Investigación', label: 'Investigación' },
        { value: 'Auditoría', label: 'Auditoría' },
        { value: 'Verificación', label: 'Verificación' },
        { value: 'Peritaje', label: 'Peritaje' },
        { value: 'Consulta', label: 'Consulta' },
        { value: 'Revisión', label: 'Revisión' },
        { value: 'Certificación', label: 'Certificación' }
      ],
      mediosRecepcion: [
        { value: 'Correo electrónico', label: 'Correo electrónico' },
        { value: 'Físico', label: 'Físico' },
        { value: 'Sistema', label: 'Sistema' },
        { value: 'Portal Web', label: 'Portal Web' },
        { value: 'Telefonía', label: 'Telefonía' },
        { value: 'Fax', label: 'Fax' }
      ],
      estados: [
        { value: 'Activo', label: 'Activo' },
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'En proceso', label: 'En proceso' },
        { value: 'Cerrado', label: 'Cerrado' },
        { value: 'Archivado', label: 'Archivado' },
        { value: 'Suspendido', label: 'Suspendido' },
        { value: 'En revisión', label: 'En revisión' }
      ]
    };
  },
  mounted() {
    this.formData.id = this.generateTempId();
    // Validar todos los campos al montar el componente para mostrar los errores desde el inicio
    this.$nextTick(() => {
      this.validateForm();
    });
  },
  methods: {
    // Validar un campo específico
    validateField(fieldName) {
      const value = this.formData[fieldName];
      const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
      
      // Añadir o quitar el campo del array de errores
      const errorIndex = this.errors.indexOf(fieldName);
      if (isEmpty && errorIndex === -1) {
        this.errors.push(fieldName);
      } else if (!isEmpty && errorIndex !== -1) {
        this.errors.splice(errorIndex, 1);
      }
      
      // Aplicar o quitar la clase de error
      this.$nextTick(() => {
        const element = document.getElementById(fieldName);
        if (element) {
          if (isEmpty) {
            element.classList.add('input-error');
          } else {
            element.classList.remove('input-error');
          }
        }
      });
      
      return !isEmpty;
    },
    
    validateForm() {
      this.errors = [];
      
      // Lista de todos los campos obligatorios con sus respectivos IDs de elemento
      const requiredFields = {
        titulo: { label: 'Asunto', id: 'titulo' },
        noComunicacion: { label: 'No. Comunicación', id: 'noComunicacion' },
        emisorComunicacion: { label: 'Emisor Comunicación', id: 'emisor' },
        receptorDestinatario: { label: 'Monto Detectado', id: 'receptor' },
        asuntoInvestigado: { label: 'Destinatario Comunicación', id: 'asunto' },
        destinatarioComunicacion: { label: 'Monto Investigado', id: 'destinatario' },
        fechaComunicacion: { label: 'Fecha de Comunicación', id: 'fechaComunicacion' },
        asuntoRespondido: { label: 'Monto Recuperado', id: 'asuntoRespondido' },
        fechaRecibido: { label: 'Fecha Recibido', id: 'fechaRecibido' },
        asuntoPericial: { label: 'Monto Perdida', id: 'asuntoPericial' },
        asuntoPendiente: { label: 'Asunto Pendiente', id: 'asuntoPendiente' },
        oficina: { label: 'Oficina', id: 'oficina', isSelect: true },
        tipoCaso: { label: 'Tipo de Caso', id: 'tipoCaso', isSelect: true },
        medioRecepcion: { label: 'Medio de Recepción', id: 'medioRecepcion', isSelect: true },
        estado: { label: 'Estado', id: 'estado', isSelect: true },
        cuentaAfectada: { label: 'Cuenta Afectada', id: 'cuentaAfectada' },
        referenciaComunicacion: { label: 'Referencia o Comunicación', id: 'referencia' }
      };
      
      // Verificar cada campo
      for (const [field, info] of Object.entries(requiredFields)) {
        const value = this.formData[field];
        const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
        
        // Añadir o quitar el campo del array de errores
        const errorIndex = this.errors.indexOf(field);
        if (isEmpty && errorIndex === -1) {
          this.errors.push(field);
        } else if (!isEmpty && errorIndex !== -1) {
          this.errors.splice(errorIndex, 1);
        }
        
        if (!info.isSelect) {
          // Para elementos input normales
          this.$nextTick(() => {
            const element = document.getElementById(info.id);
            if (element) {
              if (isEmpty) {
                element.classList.add('input-error');
              } else {
                element.classList.remove('input-error');
              }
            }
          });
        }
        // Para los componentes SearchableSelect la validación visual se hace con la prop :hasError
      }
    },
    
    generateTempId() {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 900) + 100; // Genera un número de 3 dígitos
      return `C-${year}-${random}`;
    },
    closeModal() {
      this.resetForm();
      this.showValidationMessage = false;
      this.$emit('close');
    },
    submitForm() {
      this.showValidationMessage = true;
      this.validateForm();
      
      // Forzar actualización de la UI para mostrar errores
      this.$forceUpdate();
      
      // Si hay errores, no continuar con el envío
      if (this.errors.length > 0) {
        return;
      }
      
      // Si pasa la validación, enviar el formulario
      this.$emit('submit', this.formData);
      this.resetForm();
      this.closeModal();
    },
    resetForm() {
      this.formData = {
        id: this.generateTempId(),
        titulo: '',
        noComunicacion: '',
        emisorComunicacion: '',
        receptorDestinatario: '',
        asuntoInvestigado: '',
        destinatarioComunicacion: '',
        asuntoRespondido: '',
        fechaComunicacion: '',
        asuntoPericial: '',
        fechaRecibido: '',
        asuntoPendiente: '',
        cuentaAfectada: '',
        oficina: '',
        tipoCaso: '',
        medioRecepcion: '',
        estado: '',
        referenciaComunicacion: ''
      };

      this.errors = [];
      this.showValidationMessage = false;
      
      // Validar todos los campos para marcar los errores después de resetear
      this.$nextTick(() => {
        this.validateForm();
      });
    }
  }
};
</script>

<style scoped>
/* Estilo específico para campos con error en componentes SearchableSelect */
.selected-value.input-error {
  border-color: #f44336 !important;
  border-width: 2px !important;
  background-color: rgba(244, 67, 54, 0.05) !important;
}
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
  max-width: 800px;
  max-height: 90vh;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slide-up 0.3s ease;
}

@keyframes slide-up {
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

.float-label-group input,
.float-label-group select,
.float-label-group textarea {
  width: 100%;
  height: 50px;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  background-color: #fafafa;
  z-index: 1;
}

.float-label-textarea textarea {
  height: auto;
  padding-top: 24px;
}

.float-label-group label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 14px;
  color: #666;
  font-weight: 400;
  transition: all 0.2s ease;
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

.float-label-select select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 24px; /* Espacio para el ícono de flecha */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6"><path d="M0,0 L12,0 L6,6 Z" fill="%23666"/></svg>'); 
  background-repeat: no-repeat;
  background-position: right 10px center;
}

.float-label-group input:focus,
.float-label-group select:focus,
.float-label-group textarea:focus {
  outline: none;
  border-color: #3f51b5;
  background-color: white;
  box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-footer {
  display: flex;
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
}

.footer-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.validation-message {
  color: #f44336;
  font-size: 14px;
  font-weight: 500;
  margin-right: auto;
}

.cancel-button {
  padding: 8px 16px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  color: #555;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-button:hover {
  background-color: #f5f5f5;
}

.submit-button {
  padding: 8px 16px;
  background-color: #3f51b5;
  border: none;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.submit-button:hover {
  background-color: #303f9f;
}

.input-error {
  border-color: #f44336 !important;
  background-color: rgba(244, 67, 54, 0.05) !important;
  border-width: 2px !important;
}

.input-error + label {
  color: #f44336 !important;
}

.submit-button .material-icons {
  font-size: 18px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.full-width {
    grid-column: span 1;
  }
}
</style>
