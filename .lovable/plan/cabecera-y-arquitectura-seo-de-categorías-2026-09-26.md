# Cabecera y arquitectura SEO de categorías

## Resultado
- Reorganizar la cabecera con la marca a la izquierda y toda la navegación a la derecha, conservando su versión móvil.
- Sustituir los filtros por parámetros por páginas reales para Mantas, Mochilas, Bolsos, Paseo, Neceseres y Celebraciones.
- Mantener la tienda general en `/tienda` y enlazar cada categoría mediante URLs descriptivas.

## Contenido de cada categoría
- Título y texto introductorio propios orientados a la intención de búsqueda.
- Metadatos únicos: título, descripción, Open Graph y Twitter.
- Malla de productos filtrada, ordenación por precio y enlaces internos entre categorías.
- Navegación jerárquica desde las fichas de producto hacia su categoría.

## Verificación
- Comprobar todas las nuevas direcciones, los enlaces, la cabecera y la adaptación móvil.
- Confirmar que no hay errores ni desbordamientos visuales.

## Detalles técnicos
- Crear una ruta dinámica `/tienda/categoria/$categoria` respaldada por una configuración cerrada de slugs y textos SEO.
- Actualizar los enlaces existentes para dejar de depender de `?categoria=`.
- Conservar `/tienda` como catálogo completo y evitar contenido duplicado entre URLs.
