import { ref, onMounted, watch } from 'vue';

// Crear una única instancia del estado del tema para toda la aplicación
const currentTheme = ref(localStorage.getItem('theme') || 'light');

// Función para aplicar el tema inmediatamente al cargar
function applyThemeToDOM(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Añadir/quitar la clase .dark al body para compatibilidad con otros componentes
  if (theme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  
  // Guardar en localStorage
  localStorage.setItem('theme', theme);
  
  // Actualizar la referencia reactiva
  currentTheme.value = theme;
  
  console.log('Tema aplicado:', theme);
}

// Aplicar el tema inicial inmediatamente (sin esperar a que Vue monte)
(() => {
  let initialTheme = localStorage.getItem('theme');
  
  if (!initialTheme) {
    // Si no hay tema guardado, usar la preferencia del sistema
    const prefersDark = window.matchMedia && 
                        window.matchMedia('(prefers-color-scheme: dark)').matches;
    initialTheme = prefersDark ? 'dark' : 'light';
  }
  
  // Aplicar inmediatamente para evitar parpadeo
  applyThemeToDOM(initialTheme);
})();

export function useTheme() {
  // Apply theme to document
  const applyTheme = (theme) => {
    applyThemeToDOM(theme);
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  // Set specific theme
  const setTheme = (theme) => {
    if (theme !== 'light' && theme !== 'dark') return;
    applyTheme(theme);
  };

  // Initialize theme listeners
  onMounted(() => {
    // Escuchar cambios en las preferencias del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Usar el método addEventListener o addListener según la compatibilidad
    const listener = (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
    } else if (mediaQuery.addListener) {
      // Fallback para navegadores más antiguos
      mediaQuery.addListener(listener);
    }
  });
  

  return {
    currentTheme,
    toggleTheme,
    setTheme
  };
}
