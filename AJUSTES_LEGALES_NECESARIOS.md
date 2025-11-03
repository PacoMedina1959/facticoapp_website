# 🔒 Análisis de Ajustes Legales Necesarios para Fáctico Web

**Fecha de análisis**: 29 de octubre de 2025  
**Documentos base**: Sugerencias legales proporcionadas  

---

## 📊 Estado Actual - Elementos a Revisar

### 1. ⚠️ PUBLICIDAD COMPARATIVA (Alto riesgo)

#### **Ubicaciones identificadas:**

**`index.html`:**
- Línea 171: *"💡 La competencia cobra 30-50€/mes extra por esto"*
- Línea 236: *"💡 La competencia te obliga a configurar todo manualmente"*
- Línea 326-327: *"💰 Holded cobra 99€/mes extra por gestión de equipo. Quipu y Anfix tienen funciones muy limitadas."*
- Líneas 454-461: Tabla comparativa "Fáctico vs Competencia" (Holded, Quipu, Anfix)

**`precios.html`:**
- Líneas 136-143: Tabla "Comparación con la competencia" (Holded, Quipu, Anfix)

#### **Problemas legales:**
- ❌ Menciones directas a competidores sin verificación de fecha
- ❌ Expresiones despectivas: "te obliga", "muy limitadas"
- ❌ Afirmaciones absolutas sin fuente verificable
- ❌ No se indica fecha de verificación de datos

#### **Acción requerida:**
- ✅ Suavizar el lenguaje
- ✅ Añadir nota al pie: *"Datos verificados a octubre 2025. Sujeto a cambios."*
- ✅ Eliminar expresiones despectivas
- ✅ Hacer comparaciones más genéricas o documentadas

---

### 2. ⚠️ PROMESAS COMERCIALES (Riesgo medio)

#### **Expresiones problemáticas identificadas:**

**"100% gratis" / "Completamente GRATIS":**
- `index.html` línea 55: *"¡Completamente GRATIS!"*
- `index.html` línea 72: *"100% gratis"*
- `index.html` línea 151: *"100% Gratis"*
- `index.html` línea 737: *"100% funcional gratis"*
- `precios.html` línea 41: *"100% GRATIS"*

**"Sin límites":**
- `index.html` línea 152: *"Sin límites, sin tarjetas, sin sorpresas"*
- `precios.html` línea 42: *"Sin límites, sin tarjetas, sin sorpresas"*
- `precios.html` línea 67: *"Sin límites, sin restricciones"*

**"Más rápido del mercado":**
- `index.html` línea 127: *"El proceso más rápido del mercado"*

#### **Problema legal:**
- ❌ Promesas absolutas que podrían no cumplirse
- ❌ Sin disclaimers o condiciones
- ❌ "Sin límites" podría ser engañoso si hay límites técnicos

#### **Acción requerida:**
- ✅ Cambiar a: *"Uso gratuito sin suscripción mensual"*
- ✅ Cambiar a: *"Sin límites de facturas en el modelo gratuito"*
- ✅ Cambiar a: *"Diseñado para minimizar el tiempo de configuración"*
- ✅ Añadir disclaimer: *"Los tiempos pueden variar según el perfil del usuario"*

---

### 3. ⚠️ CUMPLIMIENTO NORMATIVO (Riesgo alto si no se documenta)

#### **Afirmaciones identificadas:**

**`index.html` y guías:**
- Se menciona VeriFactu, cumplimiento con RD 1007/2023
- No hay documento descargable de "Declaración Responsable"
- No hay referencia visible a proceso de verificación AEAT

#### **Problema legal:**
- ❌ No hay declaración responsable pública
- ❌ Se dan por hecho cumplimientos sin documentación oficial

#### **Acción requerida:**
- ✅ Crear documento: **"Declaración de Cumplimiento RD 1007/2023"** (PDF descargable)
- ✅ Añadir enlace visible en footer
- ✅ Cambiar texto a: *"Desarrollado conforme a RD 1007/2023, en proceso de verificación AEAT"*
- ✅ Referenciar artículos 8 y 9 del reglamento (integridad, trazabilidad)

---

### 4. ⚠️ POLÍTICAS LEGALES (Riesgo alto - RGPD/LSSI)

#### **Estado actual:**

Búsqueda de archivos legales:
```bash
# Resultado esperado:
# - Aviso_Legal.html
# - Politica_Privacidad.html
# - Terminos_y_Condiciones.html
# - Politica_Cookies.html (?)
```

#### **Verificación necesaria:**
- [ ] ¿Existen los archivos en `/frontend/public/` o raíz del sitio?
- [ ] ¿Están enlazados desde footer de TODAS las páginas?
- [ ] ¿Incluyen datos completos del responsable (nombre, NIF, dirección, email)?
- [ ] ¿Política de privacidad detalla ARSOPL (derechos RGPD)?
- [ ] ¿Existe banner de cookies con opción de rechazo?

#### **Acción requerida:**
- ✅ Verificar existencia de archivos legales
- ✅ Asegurar enlaces desde footer de index.html, precios.html y todas las guías
- ✅ Revisar contenido de políticas (completitud RGPD)
- ✅ Implementar banner de cookies si no existe

---

### 5. ⚠️ MARCA FÁCTICO (Riesgo bajo pero recomendado)

#### **Estado actual:**
- No se observa símbolo ™ o ® junto al nombre "Fáctico"

#### **Acción requerida:**
- ✅ Registrar marca en OEPM (clases 9 y 42)
- ✅ Añadir ™ (si en trámite) o ® (si registrada)
- ✅ Incluir en footer: *"Fáctico™ es una marca registrada de [Tu nombre/empresa]"*

---

### 6. ⚠️ LICENCIA DE SOFTWARE (Riesgo bajo si es código cerrado)

#### **Estado actual:**
- No se menciona licencia de uso en web promocional
- No hay descargo de responsabilidad

#### **Acción requerida:**
- ✅ Decidir licencia (MIT, GPL, propietaria, etc.)
- ✅ Añadir sección "Licencia" en footer o página dedicada
- ✅ Incluir disclaimer: *"El desarrollador no se hace responsable de daños derivados del uso del software, conforme a la licencia [nombre]."*

---

## 📋 Plan de Implementación Propuesto

### **Fase 1: Correcciones de texto (2 horas)**
1. Suavizar lenguaje comparativo en `index.html` y `precios.html`
2. Eliminar expresiones absolutas ("100% gratis" → "Uso gratuito")
3. Añadir disclaimers de verificación de datos

### **Fase 2: Documentos legales (4 horas)**
1. Crear/revisar **Aviso Legal** (datos responsable, LSSI)
2. Crear/revisar **Política de Privacidad** (RGPD completo)
3. Crear/revisar **Términos y Condiciones** (uso del servicio)
4. Crear **Política de Cookies** (si no existe)
5. Crear **Declaración Responsable RD 1007/2023** (PDF)

### **Fase 3: Footer y enlaces (1 hora)**
1. Añadir sección "Legal" en footer con enlaces a:
   - Aviso Legal
   - Política de Privacidad
   - Términos y Condiciones
   - Política de Cookies
   - Declaración Responsable (PDF)
2. Replicar footer en todas las páginas

### **Fase 4: Banner de cookies (2 horas)**
1. Implementar banner RGPD-compliant
2. Opciones: Aceptar / Rechazar / Configurar
3. Integrar con Google Analytics (si se usa)

### **Fase 5: Marca y licencia (30 min)**
1. Añadir ™ o ® junto a "Fáctico"
2. Incluir nota de marca registrada en footer
3. Añadir sección "Licencia de Software"

---

## 🎯 Prioridades (ordenadas por riesgo legal)

### 🔴 **Prioridad ALTA (hacer YA):**
1. **Políticas RGPD/LSSI** (sanciones de hasta 20M€)
2. **Declaración Responsable RD 1007/2023** (requisito normativo)
3. **Suavizar comparativas** (evitar demandas por competencia desleal)

### 🟡 **Prioridad MEDIA (hacer en 1-2 semanas):**
1. **Ajustar promesas comerciales** (evitar publicidad engañosa)
2. **Banner de cookies** (obligatorio si se usan)
3. **Marca registrada** (protección IP)

### 🟢 **Prioridad BAJA (hacer cuando se pueda):**
1. **Licencia de software** (aclaración para usuarios)

---

## 📄 Plantillas de Texto Sugeridas

### Para comparativas:
**❌ ANTES:**
> "La competencia te obliga a configurar todo manualmente"

**✅ DESPUÉS:**
> "En la mayoría de soluciones del mercado, la configuración inicial requiere múltiples pasos. Fáctico lo simplifica en 8 preguntas guiadas."

---

### Para promesas:
**❌ ANTES:**
> "100% gratis, sin límites, sin sorpresas"

**✅ DESPUÉS:**
> "Uso gratuito sin suscripción mensual. Sin límites de facturas ni caducidad. Todas las funcionalidades incluidas."

---

### Para cumplimiento:
**❌ ANTES:**
> "Cumple totalmente con la normativa AEAT y VeriFactu"

**✅ DESPUÉS:**
> "Desarrollado conforme a los requisitos del RD 1007/2023. Sistema de registros encadenados con integridad y trazabilidad según artículos 8 y 9 del reglamento. En proceso de verificación oficial ante la AEAT."

---

## 🔍 Verificaciones Pendientes

- [ ] ¿Existen archivos legales actuales? (buscar en `/`)
- [ ] ¿El footer de `index.html` enlaza a políticas?
- [ ] ¿Hay banner de cookies implementado?
- [ ] ¿Se usa Google Analytics u otras cookies? (revisar en `js/main.js`)
- [ ] ¿Fáctico está registrado como marca?

---

## ✅ Checklist Final

### Textos web:
- [ ] Comparativas suavizadas con nota de verificación
- [ ] Promesas comerciales ajustadas (sin "100%", "sin límites")
- [ ] Disclaimer de cumplimiento normativo prudente
- [ ] Marca ™ o ® añadida

### Documentos legales:
- [ ] Aviso Legal completo (LSSI)
- [ ] Política de Privacidad completa (RGPD)
- [ ] Términos y Condiciones
- [ ] Política de Cookies
- [ ] Declaración Responsable RD 1007/2023 (PDF)

### Implementación:
- [ ] Footer con enlaces legales en TODAS las páginas
- [ ] Banner de cookies funcional
- [ ] Documentos descargables en `/assets/pdfs/`

---

**Siguiente paso recomendado:**  
1. Verificar archivos legales existentes  
2. Priorizar corrección de textos (Fase 1)  
3. Crear/actualizar documentos legales (Fase 2)  

---

**Nota:** Este análisis se ha realizado sobre la versión actual del sitio web. Se recomienda consultar con un abogado especializado en derecho digital para validar los cambios propuestos antes de implementarlos en producción.



