═══════════════════════════════════════════════════════════════════════════════
                    DASHBOARD DE TOKENS - FRONTEND
═══════════════════════════════════════════════════════════════════════════════

UBICACIÓN DEL PROYECTO:
C:\Users\lpoggio\Documents\OpenCode\frontend


───────────────────────────────────────────────────────────────────────────────────────────────
COMANDOS PARA INICIAR EL FRONTEND
───────────────────────────────────────────────────────────────────────────────────────────────

1. Instalar dependencias (solo la primera vez):
   npm install

2. Iniciar servidor de desarrollo:
   npm run dev

3. Compilar para producción:
   npm run build

4. Previsualizar build de producción:
   npm run preview


───────────────────────────────────────────────────────────────────────────────────────────────
TECNOLOGÍAS UTILIZADAS
───────────────────────────────────────────────────────────────────────────────────────────────

LENGUAJE:
- JavaScript/JSX (React 18.2.0)

LIBRERÍAS:
- React 18.2.0      - Librería principal de UI
- React DOM 18.2.0  - Renderizado del DOM
- Recharts 2.10.0   - Gráficos interactivos (PieChart, BarChart)
- Vite 5.0.0       - Build tool y dev server

DESARROLLO:
- @vitejs/plugin-react - Plugin de Vite para React


───────────────────────────────────────────────────────────────────────────────────────────────
DISEÑO Y ESTILOS
───────────────────────────────────────────────────────────────────────────────────────────────

SISTEMA DE DISEÑO: Fluid AI Enterprise v1.0.0

TIPOGRAFÍA:
- Familia principal: 'Inter', 'SF Pro Display', sans-serif
- Encabezados: 24px (h1), 18px (h2)
- Cuerpo: 14px
- Captions: 12px

PALETA DE COLORES:
- Primary: #5E5CE6 (púrpura enterprise)
- Primary Hover: #4B49C1
- Background principal: #F4F7FB
- Tarjetas: #FFFFFF
- Texto heading: #1A1C2E
- Texto body: #4A4D66
- Texto muted: #8E92B2
- Éxito: #34C759
- Advertencia: #FF9500
- Error: #FF3B30
- Info: #007AFF

RADIOS:
- Large: 16px (cards principales)
- Medium: 12px
- Small: 8px
- Pill: 100px

SOMBRAS:
- Cards: 0 4px 20px rgba(0, 0, 0, 0.04)


───────────────────────────────────────────────────────────────────────────────────────────────
ESTRUCTURA DEL PROYECTO
───────────────────────────────────────────────────────────────────────────────────────────────

frontend/
├── node_modules/      - Dependencias instaladas
├── src/
│   ├── main.jsx   - Punto de entrada
│   └── App.jsx   - Componente principal (todo el código)
├── index.html     - HTML base
├── package.json  - Configuración de dependencias
├── vite.config.js - Configuración de Vite
└── README.txt  - Este archivo


───────────────────────────────────────────────────────────────────────────────────────────────
COMPONENTES IMPLEMENTADOS
───────────────────────────────────────────────────────────────────────────────────────────────

1. Sidebar Izquierdo (historial de chats):
   - Ancho: 260px
   - Desplegable/plegable con animación (botón ◀/▶)
   - Botón "Nuevo Chat"
   - Lista de chats con opción de eliminar (✕)
   - Scroll cuando hay muchos chats

2. Área Central (ventana de chat):
   - Encabezado con título y cantidad de mensajes
   - Lista de mensajes (burbujas de usuario e IA)
   - Input para escribir mensajes
   - Botón "Enviar"

3. Panel Derecho (métricas):
   - Ancho: 600px (expandible)
   - Tarjeta: Uso de Tokens (gráfico circular)
   - Tarjeta: Consumo (gráfico semanal/tendencia)
   - Tarjeta: Estadísticas
   - 3 Tarjetas en blanco (reservadas para métricas adicionales)


───────────────────────────────────────────────────────────────────────────────────────────────
CÓMO CONECTAR AL BACKEND
───────────────────────────────────────────────────────────────────────────────────────────────

El proyecto está configurado para conectar con un backend Python.

DATOS A CONSUMIR (endpoints sugeridos):

1. Chats:
   GET /chats - Lista de historial de chats
   POST /chats - Crear nuevo chat
   DELETE /chats/{id} - Eliminar chat

2. Mensajes:
   GET /chats/{id}/messages - Mensajes de un chat
   POST /chats/{id}/messages - Enviar mensaje

3. Métricas:
   GET /metrics/usage - Uso de tokens
   GET /metrics/weekly - Consumo semanal
   GET /metrics/monthly - Consumo mensual

4. Chat con IA (streaming):
   POST /chat - Enviar mensaje y recibir respuesta

PROXY CONFIGURADO:
En vite.config.js ya está configurado el proxy:
  proxy: { '/api': 'http://localhost:8000' }

Para usar desde el frontend:
  fetch('/api/tokens')  ->  http://localhost:8000/tokens


───────────────────────────────────────────────────────────────────────────────────────────────
DATOS ACTUALES (MOCK)
────────────────────────────────────────���─��────────────────────────────────────────────────────

Los datos en el código son de ejemplo (mock). Para production:

- Reemplazar mockChats con datos del backend
- Reemplazar mockData con datos reales de la API
- Implementar streaming de mensajes para el chat con IA


───────────────────────────────────────────────────────────────────────────────────────────────
RECOMENDACIONES PARA PROYECTO ESCALABLE
───────────────────────────────────────────────────────────────────────────────────────────────

1. SEPARAR COMPONENTES:
   - Mover componentes a /src/components/
   - Crear Sidebar, ChatWindow, Cards, etc.

2. CREAR HOOKS PERSONALIZADOS:
   - useChats, useMessages, useMetrics

3. MANEJO DE ESTADO:
   - Considerar Zustand o React Context

4. AGREGAR TYPE CHECKING:
   - Instalar TypeScript: npm install typescript

5. TESTS:
   - Instalar Vitest: npm install vitest
   - Instalar @testing-library/react


═══════════════════════════════════════════════════════════════════════════════