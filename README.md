# VASEN Estética — Plataforma Integral de Gestión y Reservas

![Vasen Aesthetics](https://images.unsplash.com/photo-1570172234562-f67f74585ec7?auto=format&fit=crop&q=80&w=1200)

**VASEN Estética** es una solución web de alto nivel diseñada para una clínica de estética moderna. Combina una experiencia de usuario (UX) premium para los pacientes con herramientas robustas de gestión administrativa y médica en tiempo real.

---

## 🚀 Tecnologías Utilizadas

La plataforma utiliza el **MERN Stack** moderno, optimizado para escalabilidad y rendimiento:

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router & Server Components).
- **Estilos**: Vanilla CSS Modules (diseño custom, premium y sin dependencias pesadas).
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) para micro-interacciones suaves.
- **Iconografía**: [Lucide React](https://lucide.dev/).
- **Gráficos**: [Recharts](https://recharts.org/) para analíticas en el panel administrador.
- **Validaciones**: React Hook Form & Custom Validation logic.

### Backend
- **Framework**: [NestJS](https://nestjs.com/) (Arquitectura modular escalable).
- **Base de Datos**: [MongoDB](https://www.mongodb.com/) con [Mongoose](https://mongoosejs.com/).
- **Autenticación**: [Passport.js](https://www.passportjs.org/) & JWT (JSON Web Tokens).
- **Seguridad**: `bcryptjs` para hashing de contraseñas.

---

## ✨ Funcionalidades Clave

### 1. Landing Page Premium
- Diseño minimalista y elegante enfocado en la marca.
- Secciones interactivas para Tratamientos, Nosotros y Horarios.
- Navegación optimizada (Smooth scrolling & cross-page routing).

### 2. Sistema de Reservas Inteligente (Wizard)
- Flujo de reserva en 5 pasos (Especialidad -> Profesional -> Fecha/Hora -> Datos -> Confirmación).
- **Lógica de Slots en tiempo real**: El backend calcula automáticamente los turnos disponibles basándose en el horario laboral del profesional y los turnos existentes, evitando superposiciones.

### 3. Panel de Administración (Dashboard)
- **Analíticas**: Gráficos interactivos de turnos por día para monitorear la demanda.
- **Gestión de Staff**: CRUD completo de profesionales con funcionalidad de **Soft-Delete** (Activar/Desactivar).
- **Catálogo de Servicios**: Gestión dinámica de especialidades y sus descripciones.
- **Historial Global**: Visualización de todos los turnos del centro con filtros por estado.

### 4. Panel Médico (Personalizado)
- Vista de agenda simplificada para cada profesional.
- Gestión de estado: Los médicos pueden marcar pacientes como **Completado** o **Ausente**, actualizando las métricas de la clínica.

---

## 🛠️ Instalación y Configuración

### Requisitos Previos
- [Node.js](https://nodejs.org/) (v18 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) corriendo localmente o una URI de Atlas.

### 1. Clonar el repositorio
```bash
git clone https://github.com/Aletiscornia96/vasen-Ai.git
cd vasen-Ai
```

### 2. Configurar el Backend
```bash
cd backend
npm install
# Iniciar servidor
npm run start
# Sembrar base de datos inicial (Admin & Docs)
npx ts-node src/seed.ts
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🔑 Cuentas de Prueba (Pre-configuradas)

| Rol | Email | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin@vasen.com` | `vasen2026` |
| **Médica** | `maria@vasen.com` | `vasen2026` |

---

## 🎨 Diseño y UX
La estética de VASEN se basa en una paleta orgánica:
- **Verde Oliva** (#7D8465) para elegancia y calma.
- **Crema Seda** (#FDFBF7) para fondos limpios.
- **Tipografía**: Fuentes serif para elegancia y sans-serif para legibilidad moderna.

---
Proyecto desarrollado para **Vasen Estética**. 2026.
