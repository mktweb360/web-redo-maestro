# URLs SEO planas para tienda

## Objetivo
- Categorías: `dominio/mantas-bebe`, `dominio/mochilas-infantiles`, etc.
- Productos: `dominio/manta-arrullo-volantes-rosa`, `dominio/bolsa-playa-vichy`, etc.
- Mantener `/tienda` como página general del catálogo.

## Cambios
1. Crear una ruta raíz dinámica que identifique si el nombre corresponde a una categoría o a un producto y muestre la página adecuada.
2. Mantener intactas las páginas corporativas y el blog; sus URLs fijas tendrán prioridad.
3. Actualizar todos los enlaces internos, migas de pan, metadatos y canonical para usar las nuevas URLs planas.
4. Convertir las URLs antiguas `/tienda/categoria/...` y `/tienda/...` en redirecciones permanentes hacia las nuevas, evitando errores y pérdida de autoridad SEO.
5. Verificar categorías, productos, navegación, metadatos y móvil.

## Detalle técnico
- Una sola ruta `/$slug` resolverá categorías y productos para evitar dos rutas dinámicas en conflicto.
- Los slugs actuales se conservarán porque ya describen claramente cada intención de búsqueda.
