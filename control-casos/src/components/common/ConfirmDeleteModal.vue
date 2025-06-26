<template>
  <div v-if="show" class="confirm-modal-overlay">
    <div class="confirm-modal">
      <div class="confirm-icon">
        <span class="material-icons question-icon">help_outline</span>
      </div>
      
      <div class="confirm-message">
        {{ message }}
      </div>
      
      <div class="confirm-buttons">
        <button class="btn-cancel" @click="onCancel">
          No
        </button>
        <button class="btn-confirm" @click="onConfirm">
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDeleteModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '¿Está seguro(a) que desea eliminar este registro?'
    }
  },
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
    onCancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.confirm-modal {
  background-color: #1e3a5f;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: white;
}

.confirm-icon {
  margin-bottom: 12px;
}

.question-icon {
  background-color: transparent;
  border-radius: 50%;
  font-size: 40px;
  padding: 5px;
  color: white;
}

.confirm-message {
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 1.4;
}

.confirm-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-cancel, .btn-confirm {
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  min-width: 80px;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-cancel {
  background-color: #455a79;
  color: white;
}

.btn-confirm {
  background-color: #03a9f4;
  color: white;
}

.btn-cancel:hover {
  background-color: #374961;
}

.btn-confirm:hover {
  background-color: #0288d1;
}
</style>
