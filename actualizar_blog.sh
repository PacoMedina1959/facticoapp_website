#!/bin/bash

# Script para actualizar el blog
# Genera el sitio con Jekyll y copia el HTML a la ubicación correcta

echo "🔨 Generando blog con Jekyll..."
cd blog
bundle exec jekyll build

echo "📦 Copiando archivos generados..."
# Limpiar destino
rm -rf ../blog-public
mkdir -p ../blog-public

# Copiar contenido generado
cp -r _site/* ../blog-public/

echo "✅ Blog generado en blog-public/"
echo ""
echo "📋 Para subir los cambios:"
echo "   git add blog-public/"
echo "   git commit -m 'Actualizar blog'"
echo "   git push origin main"
