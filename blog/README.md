# Fáctico Blog

Blog oficial de Fáctico - Facturación con IA que se instala en tu móvil.

## 🚀 Desarrollo Local

### Prerrequisitos
- Ruby 3.1+
- Bundler

### Instalación
```bash
# Instalar dependencias
bundle install

# Servidor de desarrollo
bundle exec jekyll serve

# El sitio estará disponible en http://localhost:4000/blog/
```

### Estructura
```
blog/
├── _posts/           # Artículos en Markdown
├── _layouts/         # Plantillas HTML
├── _includes/        # Componentes reutilizables
├── css/             # Estilos CSS
├── js/              # JavaScript
├── _config.yml      # Configuración Jekyll
└── index.html       # Página principal
```

## 📝 Escribir Artículos

### Crear nuevo artículo
```bash
# Crear archivo en _posts/
touch _posts/YYYY-MM-DD-titulo-del-articulo.md
```

### Front Matter requerido
```yaml
---
layout: post
title: "Título del Artículo"
description: "Descripción para SEO"
author: "Francisco Medina"
category: "Tutorial"
tags: ["tag1", "tag2", "tag3"]
date: 2025-01-15
---
```

## 🎨 Personalización

### Estilos
- **CSS principal:** `css/blog.css`
- **Variables:** Definidas en `:root`
- **Responsive:** Media queries incluidas

### Layouts
- **default.html:** Layout base
- **post.html:** Layout para artículos

## 📦 Despliegue

### GitHub Pages
El blog se despliega automáticamente en GitHub Pages cuando se hace push a la rama `main`.

### URL de producción
- **Blog:** https://facticoapp.es/blog/
- **Artículos:** https://facticoapp.es/blog/YYYY/MM/DD/titulo/

## 🔧 Comandos Útiles

```bash
# Limpiar y reconstruir
bundle exec jekyll clean
bundle exec jekyll build

# Verificar sitio
bundle exec jekyll doctor

# Servidor con drafts
bundle exec jekyll serve --drafts
```

## 📚 Recursos

- **Jekyll Docs:** https://jekyllrb.com/docs/
- **Markdown:** https://www.markdownguide.org/
- **Liquid:** https://shopify.github.io/liquid/

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu artículo
3. Escribe tu artículo en Markdown
4. Haz commit y push
5. Abre un Pull Request

## 📧 Contacto

- **Email:** administrador@facticoapp.es
- **Web:** https://facticoapp.es
- **GitHub:** https://github.com/facticoapp
