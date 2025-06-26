<template>
  <div class="theme-toggle">
    <button 
      class="theme-toggle-button" 
      :class="{ 'active': currentTheme === 'light' }"
      @click="changeTheme('light')"
    >
      Light
    </button>
    <button 
      class="theme-toggle-button" 
      :class="{ 'active': currentTheme === 'dark' }"
      @click="changeTheme('dark')"
    >
      Dark
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme';
import { onMounted, ref } from 'vue';

const { currentTheme, setTheme } = useTheme();

// Función para cambiar el tema y mostrar en consola para depuración
const changeTheme = (theme) => {
  console.log(`Cambiando tema a: ${theme}`);
  setTheme(theme);
  console.log(`Tema actual después del cambio: ${currentTheme.value}`);
};

// Al montar el componente, verificamos que se haya cargado correctamente el tema
onMounted(() => {
  console.log(`Tema inicial: ${currentTheme.value}`);
});
</script>

<style scoped>
/* Los estilos están en style.css global */
</style>
