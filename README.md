# 💰 Details of My Economy

Una aplicación web moderna para el seguimiento de finanzas personales, construida con **Astro**, **TypeScript** y **Tailwind CSS**. Gestiona tus ingresos y gastos, visualiza datos con gráficos interactivos y obtén insights de tus hábitos financieros.

## ✨ Características

- 📊 **Visualización de datos**: Gráficos interactivos con Chart.js
- 💵 **Gestión de transacciones**: Añade, edita y elimina ingresos y gastos
- 🏷️ **Categorización**: Organiza tus transacciones por categorías personalizadas
- 📈 **Resumen financiero**: Ve tus totales de ingresos, gastos y balance en tiempo real
- 💾 **Almacenamiento local**: Todos tus datos se guardan de forma segura en tu navegador
- 🎨 **Interfaz moderna**: Diseño responsive con Tailwind CSS
- 🤖 **Asistente financiero**: Análisis y consejos basados en IA (integración con Ollama)
- 📱 **Responsive**: Funciona perfectamente en dispositivos móviles y de escritorio

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ o superior
- npm, pnpm o yarn

### Instalación

1. Clona el repositorio:

```bash
git clone <repository-url>
cd details-of-my-economy
```

2. Instala las dependencias:

```bash
npm install
# o
pnpm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:4321`

## 📋 Comandos Disponibles

| Comando           | Descripción                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo               |
| `npm run build`   | Construye la aplicación para producción        |
| `npm run preview` | Previsualiza la build de producción localmente |
| `npm run astro`   | Ejecuta comandos CLI de Astro                  |

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Icons/          # Iconos SVG
│   ├── ListView.astro/ # Componentes de lista de transacciones
│   ├── share/          # Componentes compartidos (Nav, Pagination, etc.)
│   ├── FinanceForm.astro
│   ├── FinanceCharts.astro
│   └── FinancialAssistant.astro
├── layouts/            # Layouts de página
│   ├── Layout.astro
│   └── Layout.Dashboard.astro
├── pages/              # Rutas (file-based routing)
│   ├── dashboard/      # Páginas del dashboard
│   │   ├── index.astro
│   │   ├── ingresos.astro
│   │   ├── gastos.astro
│   │   ├── graficos.astro
│   │   └── asistente.astro
│   └── index.astro
├── types/              # Definiciones TypeScript
│   ├── finance.ts
│   ├── chart.d.ts
│   └── global.d.ts
├── utils/              # Utilidades y helpers
│   ├── ollama/         # Integración con Ollama AI
│   ├── chart.ts
│   ├── config.ts
│   ├── lib.ts
│   ├── storage.ts
│   └── transactions.ts
├── styles/             # Estilos globales
│   └── global.css
└── assets/             # Recursos estáticos
```

## 📊 Categorías de Transacciones

### Ingresos

- 💼 Salario
- 💻 Freelance
- 📈 Inversiones
- 💰 Otros ingresos

### Gastos

- 🍕 Comida
- 🚗 Transporte
- 🏠 Vivienda
- 🎮 Entretenimiento
- 🏥 Salud
- 🛍️ Compras
- 📦 Otros gastos

## 🔧 Tecnologías Utilizadas

- **[Astro](https://astro.build)** - Framework web moderno
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript tipado
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Chart.js](https://www.chartjs.org/)** - Librería de gráficos
- **[Toastify.js](https://apvarun.github.io/toastify-js/)** - Notificaciones elegantes
- **localStorage** - Persistencia de datos en el navegador

## 🎨 Personalización

### Añadir Nuevas Categorías

1. Edita `src/utils/config.ts` y añade tu categoría:

```typescript
export const Categories = {
  incomes: {
    // ... categorías existentes
    new_category: "Nueva Categoría",
  },
};
```

2. Añade la configuración de color:

```typescript
export const categoryConfig: CategoryConfig = {
  // ... configuraciones existentes
  new_category: { label: "Nueva Categoría", color: "#FF6B6B" },
};
```

### Personalizar Estilos

Los estilos globales se encuentran en `src/styles/global.css`. Incluye clases personalizadas como:

- `.btn`, `.btn-primary` - Botones
- `.card` - Tarjetas
- `.form-input`, `.form-label` - Elementos de formulario

## 💾 Gestión de Datos

La aplicación utiliza **localStorage** para almacenar todos los datos localmente en tu navegador. Esto significa que:

- ✅ Tus datos son 100% privados
- ✅ No requiere backend ni servidor
- ✅ Funciona offline
- ⚠️ Los datos están vinculados a tu navegador específico
- ⚠️ Limpiar los datos del navegador eliminará tus transacciones

### Sistema de Eventos

La aplicación usa un sistema de eventos personalizado para mantener la UI sincronizada:

```typescript
// Escuchar cambios
window.addEventListener(EVENT_NAME.TRANSACTIONS_UPDATED, () => {
  // Actualizar UI
});

// Emitir cambios
window.dispatchEvent(new CustomEvent(EVENT_NAME.TRANSACTIONS_UPDATED));
```

## 🤖 Asistente Financiero (IA)

La aplicación incluye un asistente financiero con IA que puede analizar tus transacciones y proporcionar consejos personalizados. Requiere configurar [Ollama](https://ollama.ai/) localmente:

1. Instala Ollama
2. Descarga un modelo (ej: `ollama pull llama2`)
3. El asistente estará disponible en `/dashboard/asistente`

## 🌐 Deployment

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `dist/` y pueden ser desplegados en cualquier servicio de hosting estático:

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub
