# Script para reorganizar componentes en carpetas

# Layout components
Copy-Item -Path "src\components\NavHeader.vue" -Destination "src\components\layout\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\Sidebar.vue" -Destination "src\components\layout\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\ThemeToggle.vue" -Destination "src\components\layout\" -ErrorAction SilentlyContinue

# Casos components
Copy-Item -Path "src\components\CasosDashboard.vue" -Destination "src\components\casos\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\NuevoCasoModal.vue" -Destination "src\components\casos\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\NuevaAsignacionModal.vue" -Destination "src\components\casos\" -ErrorAction SilentlyContinue

# TiposCasos components
Copy-Item -Path "src\components\TiposCasosDashboard.vue" -Destination "src\components\tiposCasos\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\TiposCasosTable.vue" -Destination "src\components\tiposCasos\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\NuevoTipoCasoModal.vue" -Destination "src\components\tiposCasos\" -ErrorAction SilentlyContinue

# EstadosCasos components
Copy-Item -Path "src\components\EstadosCasosDashboard.vue" -Destination "src\components\estadosCasos\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\EstadosCasosTable.vue" -Destination "src\components\estadosCasos\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\NuevoEstadoCasoModal.vue" -Destination "src\components\estadosCasos\" -ErrorAction SilentlyContinue

# EstadoRecomendaciones components
Copy-Item -Path "src\components\EstadoRecomendacionesDashboard.vue" -Destination "src\components\estadoRecomendaciones\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\EstadoRecomendacionesTable.vue" -Destination "src\components\estadoRecomendaciones\" -ErrorAction SilentlyContinue

# Bitacora components
Copy-Item -Path "src\components\BitacoraDashboard.vue" -Destination "src\components\bitacora\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\NuevaBitacoraModal.vue" -Destination "src\components\bitacora\" -ErrorAction SilentlyContinue

# Common components
Copy-Item -Path "src\components\SearchableSelect.vue" -Destination "src\components\common\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\ConfirmDeleteModal.vue" -Destination "src\components\common\" -ErrorAction SilentlyContinue
Copy-Item -Path "src\components\NuevaRecomendacionModal.vue" -Destination "src\components\common\" -ErrorAction SilentlyContinue

Write-Host "Componentes copiados a sus respectivas carpetas con éxito."
