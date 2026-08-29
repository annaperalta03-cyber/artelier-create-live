# Limpieza técnica y sistema visual global de ARTELIER

## Objetivo
Corregir la estructura técnica y unificar el sistema visual existente sin rediseñar secciones, cambiar contenido válido ni alterar la identidad editorial actual.

## Qué se conservará
- Estructura y composición actuales de todas las páginas.
- Paleta crema, negro, chartreuse/amarillo, tomate, cobalto y rosa; no se añadirán colores.
- Tipografías Fraunces, Archivo y Caveat.
- Esquinas rectas, bloques editoriales, texturas y recursos artísticos existentes.
- Rutas, nombres y funciones que ya trabajan correctamente.

## Correcciones técnicas
1. **Fragancia faltante**
   - Incorporar la imagen subida de **The Secret Garden** mediante el sistema de assets.
   - Restaurar la tarjeta faltante en la colección existente, con el mismo selector de onzas, precio y acción de carrito que las demás fragancias.
   - Mantener el catálogo como reemplazo de las tarjetas originales, sin crear una segunda cuadrícula.

2. **Rutas y estados de error**
   - Mantener todas las rutas internas verificadas: inicio, talleres, kits, materiales, Olfactory, calculadoras, eventos, nosotros, contacto, carrito, checkout y pedido.
   - Añadir límites de error y contenido no encontrado donde corresponda a la ruta dinámica de talleres.
   - Evitar el falso estado de éxito en `/pedido/$numero`: si el pedido no existe en el navegador, mostrar un estado claro con acciones válidas en vez de afirmar que fue recibido.
   - Marcar carrito y checkout como páginas no indexables sin cambiar su función.

3. **Controles e interacciones**
   - Mantener funcionales filtros, selectores, calculadoras, cantidades, carrito y checkout.
   - Corregir estados `hover`, `focus-visible`, `active` y selección de forma consistente.
   - Hacer accesible por teclado la acción de agregar al carrito que hoy depende de hover en desktop/tablet.
   - Añadir estados vacíos defensivos a catálogos filtrados.
   - Corregir etiquetas ARIA y estados expandidos del menú móvil.
   - Cambiar el icono de búsqueda que actualmente solo navega a Materiales por una acción/etiqueta honesta, sin fingir una búsqueda inexistente.
   - Hacer que el formulario de contacto navegue de forma fiable a WhatsApp incluso en navegadores que bloquean ventanas emergentes.
   - No fingir una suscripción real: el formulario de newsletter mostrará claramente un estado funcional local mientras no exista integración de correo.

4. **Enlaces externos**
   - Centralizar y validar WhatsApp, Instagram y comunidad.
   - No inventar datos. Los valores actuales son placeholders (`18090000000`, Instagram genérico y chat de WhatsApp genérico), por lo que quedarán identificados como bloqueo de publicación hasta recibir las URLs reales.

## Sistema visual global
1. **Tipografía**
   - Definir una escala coherente para H1, H2, H3, cuerpo, etiquetas y texto auxiliar.
   - Aumentar aproximadamente 10–15% las etiquetas y textos auxiliares demasiado pequeños.
   - Eliminar letter-spacing negativo de las utilidades display y mantener tracking legible.
   - Limitar anchos de párrafo largos, especialmente en Nosotros y footer.

2. **Bordes, espacios y estructura**
   - Consolidar dos niveles semánticos: borde editorial fuerte y divisor sutil.
   - Mantener radios rectos.
   - Normalizar paddings de encabezados, secciones, controles y gaps sin cambiar la composición.
   - Corregir el offset rígido del filtro sticky de Talleres.

3. **Accesibilidad y contraste**
   - Añadir un foco global visible y de alto contraste para enlaces, botones y campos.
   - Sustituir opacidades demasiado bajas en texto por tokens legibles.
   - Asegurar objetivos táctiles mínimos para iconos y controles de cantidad.
   - Añadir estados seleccionados con `aria-pressed` donde aplique.
   - Mantener soporte para movimiento reducido y permitir pausar el marquee mediante interacción.

4. **Responsive**
   - Corregir el desbordamiento horizontal detectado en Homepage móvil/tablet, Talleres desktop y Calculadoras móvil.
   - Revisar títulos largos, filas de calculadora, etiquetas rotadas y elementos que rompen contenedores.
   - Mantener el menú compacto hasta `xl`, pero garantizar tamaños táctiles y comportamiento correcto en tablet.

## Verificación final
- Probar todas las rutas en desktop (1280 px), tablet (768 px) y móvil (390 px).
- Recorrer filtros, cards, selector de fragancias, calculadoras, carrito, checkout, pedido y formulario de contacto.
- Confirmar una sola H1 por página, ausencia de pantallas en blanco, errores 500 y desbordamiento horizontal.
- Revisar consola, errores de runtime, solicitudes fallidas y build final.
- Entregar una lista exacta de archivos y correcciones realizadas antes de iniciar otra fase.

## Fuera de alcance de esta fase
- Rediseñar secciones individuales.
- Crear un panel administrativo o backend.
- Cambiar textos, nombres, rutas o lógica de negocio que ya funciona.
- Inventar datos reales para WhatsApp, Instagram o la comunidad.
