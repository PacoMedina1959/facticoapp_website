#!/usr/bin/env python3
"""
Script para limpiar logos PNG eliminando píxeles blancos y dejando solo transparencia.
Convierte todos los píxeles blancos/grises claros en transparentes.
"""

from PIL import Image
import sys

def clean_logo(input_path, output_path, threshold=240):
    """
    Limpia un logo PNG eliminando píxeles blancos.
    
    Args:
        input_path: Ruta del logo original
        output_path: Ruta del logo limpio
        threshold: Umbral RGB (0-255). Píxeles más claros que esto se vuelven transparentes
    """
    # Abrir imagen
    img = Image.open(input_path)
    
    # Convertir a RGBA si no lo es
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Obtener datos de píxeles
    data = img.getdata()
    
    # Nueva lista de píxeles
    new_data = []
    
    for item in data:
        # item = (R, G, B, A)
        r, g, b, a = item
        
        # Si el píxel es muy claro (cercano a blanco), hacerlo transparente
        if r >= threshold and g >= threshold and b >= threshold:
            # Transparente completo
            new_data.append((255, 255, 255, 0))
        else:
            # Mantener el píxel original
            new_data.append(item)
    
    # Aplicar nuevos datos
    img.putdata(new_data)
    
    # Guardar
    img.save(output_path, 'PNG', optimize=True)
    
    print(f"✅ Logo limpio guardado en: {output_path}")
    print(f"   Threshold usado: {threshold} (píxeles más claros = transparentes)")
    print(f"   Tamaño: {img.size[0]}x{img.size[1]}")

if __name__ == '__main__':
    input_file = 'assets/images/logo_7.png'
    output_file = 'assets/images/logo_7_clean.png'
    
    print(f"🧹 Limpiando logo...")
    print(f"   Input:  {input_file}")
    print(f"   Output: {output_file}")
    
    clean_logo(input_file, output_file, threshold=240)
    
    print("\n📝 Ahora:")
    print("   1. Verifica el logo limpio abriendo: assets/images/logo_7_clean.png")
    print("   2. Si se ve bien, renómbralo a logo_7.png")
    print("   3. Súbelo a Fáctico")

