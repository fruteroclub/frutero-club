# Frutero Club - Landing Page Components

## 🚀 Estructura Modular

La landing page de Frutero Club está construida de manera completamente modular, con cada sección del diseño como un componente independiente. Esto permite:

- **Fácil mantenimiento**: Cada componente es independiente
- **Reutilización**: Los componentes pueden usarse en diferentes páginas
- **Escalabilidad**: Fácil agregar nuevas secciones
- **Testing**: Cada componente puede testearse individualmente

## 📁 Estructura de Componentes

### 🎯 Secciones Principales

```
src/components/sections/
├── hero-section.tsx          # Sección principal con mascota y título
├── stats-section.tsx         # Estadísticas y números de impacto
├── journey-section.tsx       # Las 4 fases del journey (Hacker → Founder)
├── testimonials-section.tsx  # Historias reales de transformación
├── network-section.tsx       # Red de builders, comunidades y partnerships
├── benefits-section.tsx      # Beneficios exclusivos para miembros
├── events-section.tsx        # Eventos que transforman carreras
├── pulpa-section.tsx         # Sistema de tokens $PULPA
├── application-section.tsx   # Proceso de aplicación y requisitos
├── faq-section.tsx          # Preguntas frecuentes con acordeón
└── footer-section.tsx       # Footer completo con CTA final
```

### 🧩 Componentes Auxiliares

```
src/components/stats/
└── stat-card.tsx            # Tarjeta individual de estadística
```

## 🎨 Paleta de Colores

La landing page utiliza una paleta de colores personalizada:

```css
--primary: oklch(0.75 0.18 45) /* Naranja vibrante */ --accent: oklch(0.75 0.15 130)
  /* Verde aguacate */ --secondary: oklch(0.7 0.2 350) /* Rosa coral */
  --foreground: oklch(0.15 0.02 0) /* Negro/gris oscuro */ --background: oklch(0.98 0.005 85)
  /* Crema/blanco */;
```

## 📄 Páginas Individuales

Cada sección tiene su propia página para desarrollo y testing:

```
src/app/sections/
├── hero/page.tsx
├── stats/page.tsx
├── journey/page.tsx
├── testimonials/page.tsx
├── network/page.tsx
├── benefits/page.tsx
├── events/page.tsx
├── pulpa/page.tsx
├── application/page.tsx
├── faq/page.tsx
└── footer/page.tsx
```

### 🔗 URLs de Acceso

- **Home completa**: `/`
- **Hero**: `/sections/hero`
- **Stats**: `/sections/stats`
- **Journey**: `/sections/journey`
- **Testimonials**: `/sections/testimonials`
- **Network**: `/sections/network`
- **Benefits**: `/sections/benefits`
- **Events**: `/sections/events`
- **Pulpa**: `/sections/pulpa`
- **Application**: `/sections/application`
- **FAQ**: `/sections/faq`
- **Footer**: `/sections/footer`

## 🎯 Características de Cada Sección

### 1. **HeroSection**

- Mascota aguacate animada
- Título con palabras destacadas ("Builders", "Founders")
- CTA principal
- Responsive design

### 2. **StatsSection**

- 6 tarjetas de estadísticas
- Iconos emotivos
- Animaciones hover
- Grid responsive

### 3. **JourneySection**

- 4 fases del journey (Plantando semillas, Cultivando, Incubando, Floreciendo)
- Mascotas para cada fase (🥑🍒🍌🍎)
- Layout alternado
- Duración de cada fase

### 4. **TestimonialsSection**

- 3 testimonios reales
- Avatares personalizados
- Logros destacados
- Cards con hover effects

### 5. **NetworkSection**

- Tabs interactivos
- Builders destacados
- Comunidades aliadas
- Partnerships estratégicos

### 6. **BenefitsSection**

- 6 beneficios exclusivos
- Iconos representativos
- Colores diferenciados
- CTA adicional

### 7. **EventsSection**

- Evento featured "Coworking Frutal"
- Grid de próximos eventos
- Información detallada (fechas, premios, disponibilidad)
- Mascotas de frutas

### 8. **PulpaSection**

- Sistema de tokens $PULPA explicado
- 4 beneficios principales
- Token central con mascotas (🍉🍍)
- Información adicional (rangos, misiones, leaderboard)

### 9. **ApplicationSection**

- Dos columnas: requisitos y proceso
- Eligibilidad claramente definida
- Pasos del proceso de aplicación
- Estadísticas del proceso

### 10. **FAQSection**

- Acordeón interactivo
- 7 preguntas frecuentes
- Animaciones smooth
- Sección de ayuda adicional

### 11. **FooterSection**

- CTA final "Hackea tu destino"
- Links organizados por categorías
- Botón "Volver al inicio"
- Copyright y detalles

## 🛠️ Uso de Componentes

### Importar una sección:

```tsx
import HeroSection from '@/components/sections/hero-section'
```

### Usar en una página:

```tsx
export default function MyPage() {
  return (
    <PageWrapper>
      <HeroSection />
    </PageWrapper>
  )
}
```

## 🎨 Personalización

### Cambiar colores:

Modificar las variables CSS en `src/styles/globals.css`:

```css
:root {
  --primary: tu-color-naranja;
  --accent: tu-color-verde;
  /* ... */
}
```

### Agregar nueva sección:

1. Crear componente en `src/components/sections/`
2. Crear página en `src/app/sections/`
3. Importar en `src/app/page.tsx`

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
bun install

# Ejecutar desarrollo
bun dev

# Build para producción
bun build
```

## 📱 Responsive Design

Todos los componentes están optimizados para:

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

## 🎯 Tecnologías Utilizadas

- **Next.js 15**: Framework React
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utilitarios
- **Bun**: Runtime y package manager
- **Shadcn/ui**: Componentes base

## 🎪 Características Avanzadas

### ⚡ Interactividad

- **Tabs dinámicos** en NetworkSection
- **Acordeón expandible** en FAQSection
- **Animaciones hover** en todas las tarjetas
- **Scroll suave** al inicio desde footer

### 🎨 Diseño Visual

- **Gradientes personalizados**
- **Mascotas de frutas** como elementos decorativos
- **Micro-animaciones** para mejor UX
- **Sistema de colores** consistente

### 📊 Datos Dinámicos

- **Estadísticas actualizables**
- **Eventos con fechas dinámicas**
- **Testimonios reales**
- **Información de aplicación** actualizable

---

¡Listo para crear la mejor landing page para Frutero Club! 🥑🚀

### 🎯 Estructura Completa de la Landing Page

```
1. Hero → 2. Stats → 3. Journey → 4. Testimonials
    ↓
5. Network → 6. Benefits → 7. Events → 8. Pulpa
    ↓
9. Application → 10. FAQ → 11. Footer
```

**Total**: 11 secciones modulares, 100% responsive, completamente funcional.
