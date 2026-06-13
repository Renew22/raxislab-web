# 🧭 ANÁLISIS ESTRATÉGICO — RaxisLab Web
## Qué se nos escapa y cómo avanzar inteligentemente

---

## 📊 ESTADO ACTUAL DEL SITIO

### Lo que YA tenemos (bien hecho):
- ✅ 17 páginas públicas completas y funcionales
- ✅ 6 casos de éxito reales con drawer de detalle
- ✅ Calculadora ROI interactiva (Chart.js)
- ✅ Calculadora de precios con combos
- ✅ IA Studio con 5 demos interactivas
- ✅ 8 recursos gratuitos descargables
- ✅ FAQ, Ayuda, Privacidad, Términos, Cookies
- ✅ The Lab (panel CRM básico con auth PIN)
- ✅ Blog estructurado
- ✅ Identidad visual sólida y consistente

---

## 🚨 LO QUE SE NOS ESCAPA — Prioridades críticas

### 1. PORTAL DE CLIENTES (lo más importante ahora mismo)

**El problema actual:**
- "The Lab" existe pero es un CRM básico solo para René (admin)
- Los clientes NO tienen acceso a ver SU trabajo
- No hay forma de que un cliente vea sus métricas, contenidos o avances
- Todo el reporting se hace por WhatsApp/email de forma manual
- No hay un espacio donde el cliente viva la experiencia de ser cliente de RaxisLab

**Lo que necesitamos:**
```
client-portal.html          → Dashboard personalizado por cliente
  ├── Login con código único (sin contraseña compleja)
  ├── Panel de proyecto activo
  │   ├── Fase actual + progreso visual
  │   ├── Tareas completadas / en curso / pendientes
  │   └── Próximos entregables con fecha
  ├── Contenidos programados
  │   ├── Calendario de publicaciones del mes
  │   ├── Preview de cada post (imagen + copy + hashtags)
  │   └── Estado: pendiente aprobación / aprobado / publicado
  ├── Métricas en tiempo real (iframe Looker Studio por cliente)
  ├── Historial de trabajos realizados
  ├── Facturas y documentos
  └── Canal de mensajes directo con René
```

**Por qué es urgente:**
- Profesionaliza enormemente la experiencia del cliente
- Reduce el tiempo de comunicación manual (menos WhatsApp, menos emails)
- El cliente siente que está en control y ve el valor continuamente
- Es un diferenciador brutal vs otras agencias/freelancers
- Reduce el churn (clientes que se van)

---

### 2. ONBOARDING DIGITAL DE CLIENTES NUEVOS

**El problema:**
- No hay proceso digital cuando llega un cliente nuevo
- Todo el onboarding es manual (llamadas, emails, PDF adjuntos)
- No hay forma de capturar la información inicial del cliente de forma estructurada

**Lo que necesitamos:**
```
onboarding.html             → Formulario de onboarding inteligente
  ├── Paso 1: Información del negocio (nombre, sector, ciudad, web)
  ├── Paso 2: Accesos (GA4, Meta Business, Instagram, Google Ads)
  ├── Paso 3: Objetivos y KPIs esperados
  ├── Paso 4: Tono de marca y referencias visuales
  ├── Paso 5: Competidores principales
  └── Confirmación + next steps automáticos
```

---

### 3. SISTEMA DE APROBACIÓN DE CONTENIDOS

**El problema:**
- El flujo actual para aprobar contenido: WhatsApp → ida y vuelta → confusión
- No hay trazabilidad de qué se aprobó, cuándo, y con qué cambios

**Lo que necesitamos:**
- Panel donde el cliente ve el contenido antes de publicar
- Botones: Aprobar ✅ / Solicitar cambio ✏️ / Rechazar ❌
- Campo de notas por post
- Historial de aprobaciones

---

### 4. MÉTRICAS Y REPORTES AUTOMÁTICOS

**El problema:**
- Los informes se hacen manualmente cada mes
- No hay forma de que el cliente vea sus métricas en cualquier momento

**Lo que necesitamos:**
- Dashboard de métricas por cliente (aunque sea con iframe de Looker Studio)
- Resumen mensual automático generado con IA
- Comparativa mes anterior vs mes actual

---

### 5. BLOG CON CONTENIDO REAL

**El problema:**
- blog.html existe pero no tiene artículos reales
- El blog es la mayor fuente de SEO orgánico y credibilidad
- Sin contenido real, no posiciona en Google

**Lo que necesitamos:**
- 10-15 artículos reales publicados
- Temas: Meta Ads para peluquerías, SEO local, cómo grabar Reels...
- Cada artículo como lead magnet hacia contact.html

---

### 6. COOKIE BANNER REAL

**El problema:**
- cookies.html existe pero no hay un banner real en el sitio
- Es obligatorio por RGPD tener el consentimiento activo

**Lo que necesitamos:**
- Banner de cookies que aparece la primera vez
- Opciones: Aceptar todo / Solo necesarias / Gestionar
- Guardar preferencia en localStorage
- Activar GA4/Meta Pixel solo si se acepta

---

## 🎯 ROADMAP RECOMENDADO

### FASE 1 — AHORA (esta semana) ← Lo más impactante
```
1. Portal de cliente básico (login por código + dashboard visual)
2. Cookie banner real (obligatorio legal + profesional)
3. Onboarding form para clientes nuevos
```

### FASE 2 — PRÓXIMO MES
```
4. Sistema de aprobación de contenidos
5. 5 artículos reales en el blog
6. Conectar formulario de contacto a n8n (webhook real)
7. Meta OG tags en todas las páginas
```

### FASE 3 — ESCALADO
```
8. Panel de métricas por cliente (Looker Studio embebido)
9. Sistema de facturación ligero (PDF automático)
10. Chat/mensajería cliente-René dentro del portal
11. Notificaciones por email cuando hay contenido para aprobar
```

---

## 🏗️ ARQUITECTURA DEL PORTAL DE CLIENTES

### Cómo funciona sin servidor (solo localStorage + Table API):

```
Flujo de acceso:
1. René añade un cliente desde The Lab (como admin)
2. El sistema genera un código único de acceso (ej: CLLX-2025-ART)
3. René le envía el código al cliente por WhatsApp/email
4. El cliente va a: raxislab.com/client-portal.html
5. Introduce su código → ve SU dashboard personalizado

Datos del portal (usando la Table API del proyecto):
- Tabla "clients": nombre, código_acceso, sector, fase_actual, color
- Tabla "tasks": cliente_id, título, estado, fecha_entrega
- Tabla "content": cliente_id, plataforma, copy, imagen_url, fecha_publicación, estado_aprobación
- Tabla "metrics": cliente_id, mes, impresiones, clicks, leads, roas
- Tabla "messages": cliente_id, autor, texto, timestamp
```

### Ventajas de esta arquitectura:
- Funciona como sitio estático (sin servidor)
- René gestiona todo desde The Lab (admin)
- Cada cliente ve solo SUS datos
- Escalable a cualquier número de clientes
- Se puede conectar a n8n para automatizar notificaciones

---

## 💡 IDEA ADICIONAL — "RaxisLab Academy"

Tienes todo el conocimiento para crear una mini academia:
```
academy.html
├── Cursos gratuitos (los recursos actuales expandidos)
├── Workshops en vídeo (grabados con tu cámara)
├── Comunidad de alumnos
└── Acceso premium para clientes activos
```
Esto monetiza el conocimiento PASIVAMENTE y atrae leads cualificados.

---

## 🔧 DETALLES TÉCNICOS PENDIENTES

| Tarea | Impacto | Dificultad | Prioridad |
|-------|---------|------------|-----------|
| Cookie banner | 🔴 Legal | Baja | URGENTE |
| Portal clientes | 🔴 Negocio | Media | ALTA |
| Onboarding form | 🟡 Ops | Baja | ALTA |
| Blog contenido real | 🟡 SEO | Media | MEDIA |
| Meta OG tags | 🟡 Marketing | Baja | MEDIA |
| GA4 real integrado | 🟡 Datos | Baja | MEDIA |
| Formulario → n8n | 🟡 Ops | Media | MEDIA |
| Aprobación contenidos | 🟢 Cliente | Alta | BAJA |
| Sistema facturas | 🟢 Admin | Alta | BAJA |

---

## 📌 MI RECOMENDACIÓN INMEDIATA

**Empezar por el Portal de Clientes** porque:
1. Es lo que convierte a RaxisLab de "freelancer" a "agencia profesional"
2. Impacta directamente en la retención de clientes
3. Ahorra horas semanales de comunicación manual
4. Es un argumento de venta ("tienes tu propio dashboard")
5. Técnicamente es viable con la Table API que ya tenemos

**¿Empezamos con el Portal de Clientes?**

---
*Análisis generado: 1 de marzo de 2026 · RaxisLab Strategy*
