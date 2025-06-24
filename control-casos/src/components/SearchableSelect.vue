<template>
  <div class="searchable-select-container" :class="{ 'is-open': isOpen }">
    <div class="float-label-group float-label-select" @click="toggleDropdown">
      <div class="selected-value" tabindex="0" @blur="handleBlur" :class="{ 'input-error': hasError }">
        <span v-if="selectedOption">{{ selectedOption.label }}</span>
        <span v-else class="placeholder"></span>
      </div>

      <label>{{ label }}</label>
      <div class="select-arrow"></div>
    </div>
       
    <div v-show="isOpen" class="dropdown-container">
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          v-model="searchQuery" 
          placeholder="Buscar..." 
          @click.stop 
          @input="filterOptions"
          ref="searchInput"
        />
      </div>
      <div class="options-container">
        <div 
          v-for="option in filteredOptions" 
          :key="option.value" 
          class="option-item"
          :class="{ 'is-selected': isSelected(option) }"
          @click.stop="selectOption(option)"
        >
          {{ option.label }}
        </div>
        <div v-if="filteredOptions.length === 0" class="no-results">
          No se encontraron resultados
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchableSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    hasError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      searchQuery: '',
      filteredOptions: [],
      selectedOption: null
    };
  },
  created() {
    this.filteredOptions = [...this.options];
    this.updateSelectedOption();
    
    // Añadir evento global para cerrar el dropdown cuando se hace clic fuera
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    // Limpiar el event listener global
    document.removeEventListener('click', this.closeDropdown);
  },
  watch: {
    value() {
      this.updateSelectedOption();
    },
    options: {
      handler() {
        this.filteredOptions = [...this.options];
        this.updateSelectedOption();
      },
      deep: true
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      this.searchQuery = '';
      this.filteredOptions = [...this.options];
      
      if (this.isOpen) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      }
    },
    closeDropdown(event) {
      // No cerrar si el clic fue en el componente
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    handleBlur(event) {
      // Usar un timeout para permitir que el clic en una opción se procese primero
      setTimeout(() => {
        const focusedElement = document.activeElement;
        if (!this.$el.contains(focusedElement)) {
          this.isOpen = false;
        }
      }, 100);
    },
    filterOptions() {
      if (!this.searchQuery) {
        this.filteredOptions = [...this.options];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      this.filteredOptions = this.options.filter(option => 
        option.label.toLowerCase().includes(query)
      );
    },
    selectOption(option) {
      this.selectedOption = option;
      this.$emit('input', option.value);
      this.isOpen = false;
    },
    isSelected(option) {
      return this.selectedOption && this.selectedOption.value === option.value;
    },
    updateSelectedOption() {
      this.selectedOption = this.options.find(option => option.value === this.value) || null;
    }
  }
};
</script>

<style scoped>
.searchable-select-container {
  position: relative;
  width: 100%;
}

.float-label-group {
  position: relative;
  width: 100%;
  cursor: pointer;
}

.selected-value {
  width: 100%;
  height: 50px;
  padding: 18px 12px 2px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  background-color: #fafafa;
  display: flex;
  align-items: center;
}

.selected-value:focus {
  outline: none;
  border-color: #3f51b5;
  box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.1);
  background-color: #fff;
}

.selected-value.input-error {
  border-color: #f44336 !important;
  background-color: rgba(244, 67, 54, 0.05) !important;
  border-width: 2px !important;
}

.is-open .selected-value {
  border-color: #3f51b5;
  box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.1);
  background-color: #fff;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.placeholder {
  color: transparent;
}

.float-label-group label {
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 11px;
  color: #3f51b5;
  font-weight: 500;
  transition: all 0.2s ease;
  z-index: 1;
  letter-spacing: 0.2px;
  pointer-events: none;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #666;
  transition: transform 0.3s ease;
}

.is-open .select-arrow {
  transform: translateY(-50%) rotate(180deg);
}

.dropdown-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #3f51b5;
  border-top: none;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 250px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.search-container {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
}

.search-input:focus {
  outline: none;
  border-color: #3f51b5;
}

.options-container {
  overflow-y: auto;
  max-height: 200px;
}

.option-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.option-item:hover {
  background-color: #f5f5f5;
}

.is-selected {
  background-color: #e8eaf6;
  color: #3f51b5;
  font-weight: 500;
}

.no-results {
  padding: 12px;
  text-align: center;
  color: #999;
  font-style: italic;
}
</style>