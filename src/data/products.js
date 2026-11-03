// Catálogo de ejemplo (datos mock). En una versión real vendría de una API.
// "ilustracion" define los colores con los que se dibuja cada pan.

export const BASE_SIN_GLUTEN =
  'Mezcla de harina de arroz, fécula de papa y almidón de tapioca';

export const categorias = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'tradicional', nombre: 'Tradicionales' },
  { id: 'relleno', nombre: 'Rellenos' },
  { id: 'mini', nombre: 'Minis' },
];

export const productos = [
  {
    id: 'tradicional',
    nombre: 'Pan de muerto tradicional',
    categoria: 'tradicional',
    resumen: 'Azahar, ralladura de naranja y azúcar.',
    descripcion:
      'La receta de siempre, sin gluten. Miga suave con agua de azahar y naranja, cubierto de mantequilla y azúcar.',
    destacado: true,
    tamanos: [
      { id: 'ind', nombre: 'Individual', porciones: '1 persona', precio: 45 },
      { id: 'med', nombre: 'Mediano', porciones: '4 a 6 personas', precio: 160 },
      { id: 'fam', nombre: 'Familiar', porciones: '8 a 10 personas', precio: 280 },
    ],
    ingredientes: [BASE_SIN_GLUTEN, 'huevo', 'mantequilla', 'azúcar', 'agua de azahar', 'ralladura de naranja', 'levadura', 'goma xantana'],
    alergenos: ['Huevo', 'Leche'],
    ilustracion: { cubierta: '#FFFFFF', costra: '#C98538' },
  },
  {
    id: 'nata',
    nombre: 'Relleno de nata',
    categoria: 'relleno',
    resumen: 'Nata fresca batida con vainilla.',
    descripcion:
      'Nuestro pan tradicional abierto por la mitad y relleno de nata con vainilla. Se mantiene en refrigeración.',
    destacado: true,
    tamanos: [
      { id: 'ind', nombre: 'Individual', porciones: '1 persona', precio: 65 },
      { id: 'med', nombre: 'Mediano', porciones: '4 a 6 personas', precio: 210 },
    ],
    ingredientes: [BASE_SIN_GLUTEN, 'huevo', 'mantequilla', 'nata', 'vainilla', 'azúcar', 'levadura', 'goma xantana'],
    alergenos: ['Huevo', 'Leche'],
    ilustracion: { cubierta: '#FFFFFF', costra: '#C98538', relleno: '#FFF6E0' },
  },
  {
    id: 'chocolate',
    nombre: 'Relleno de chocolate',
    categoria: 'relleno',
    resumen: 'Ganache de chocolate de mesa.',
    descripcion:
      'Relleno de ganache hecho con chocolate de mesa oaxaqueño y un toque de canela. Cubierto con azúcar y cacao.',
    destacado: false,
    tamanos: [
      { id: 'ind', nombre: 'Individual', porciones: '1 persona', precio: 70 },
      { id: 'med', nombre: 'Mediano', porciones: '4 a 6 personas', precio: 230 },
    ],
    ingredientes: [BASE_SIN_GLUTEN, 'huevo', 'mantequilla', 'chocolate de mesa', 'crema', 'canela', 'azúcar', 'levadura', 'goma xantana'],
    alergenos: ['Huevo', 'Leche', 'Soya'],
    ilustracion: { cubierta: '#6B3B22', costra: '#8E5226', relleno: '#5A2E1A' },
  },
  {
    id: 'cempasuchil',
    nombre: 'Pan de cempasúchil',
    categoria: 'tradicional',
    resumen: 'Azúcar teñida con flor de cempasúchil.',
    descripcion:
      'Edición de temporada: la masa lleva infusión de flor de cempasúchil y se cubre con azúcar dorada de pétalos.',
    destacado: true,
    tamanos: [
      { id: 'ind', nombre: 'Individual', porciones: '1 persona', precio: 55 },
      { id: 'med', nombre: 'Mediano', porciones: '4 a 6 personas', precio: 190 },
    ],
    ingredientes: [BASE_SIN_GLUTEN, 'huevo', 'mantequilla', 'flor de cempasúchil comestible', 'azúcar', 'levadura', 'goma xantana'],
    alergenos: ['Huevo', 'Leche'],
    ilustracion: { cubierta: '#F6B73C', costra: '#C98538' },
  },
  {
    id: 'vegano',
    nombre: 'Pan de muerto vegano',
    categoria: 'tradicional',
    resumen: 'Sin gluten, sin huevo y sin lácteos.',
    descripcion:
      'Para quienes además evitan huevo y lácteos. Hecho con aceite de girasol y bebida de avena certificada sin gluten.',
    destacado: false,
    tamanos: [
      { id: 'ind', nombre: 'Individual', porciones: '1 persona', precio: 55 },
      { id: 'med', nombre: 'Mediano', porciones: '4 a 6 personas', precio: 185 },
    ],
    ingredientes: [BASE_SIN_GLUTEN, 'bebida de avena certificada sin gluten', 'aceite de girasol', 'azúcar', 'agua de azahar', 'levadura', 'goma xantana'],
    alergenos: [],
    ilustracion: { cubierta: '#F3E3C8', costra: '#B9732F' },
  },
  {
    id: 'minis',
    nombre: 'Caja de minis',
    categoria: 'mini',
    resumen: 'Seis panecitos: tradicional, nata y chocolate.',
    descripcion:
      'Seis panes pequeños surtidos para compartir o regalar. Vienen en caja de cartón reciclado lista para llevar.',
    destacado: false,
    tamanos: [
      { id: 'c6', nombre: 'Caja de 6', porciones: '6 piezas', precio: 170 },
      { id: 'c12', nombre: 'Caja de 12', porciones: '12 piezas', precio: 320 },
    ],
    ingredientes: [BASE_SIN_GLUTEN, 'huevo', 'mantequilla', 'nata', 'chocolate de mesa', 'azúcar', 'levadura', 'goma xantana'],
    alergenos: ['Huevo', 'Leche', 'Soya'],
    ilustracion: { cubierta: '#FFFFFF', costra: '#C98538', mini: true },
  },
];

export const garantias = [
  {
    titulo: 'Cocina 100 % sin gluten',
    texto: 'En nuestro obrador no entra trigo, cebada ni centeno. No hay riesgo de contaminación cruzada.',
  },
  {
    titulo: 'Ingredientes certificados',
    texto: 'Usamos harinas y aditivos con certificado sin gluten de cada proveedor.',
  },
  {
    titulo: 'Lotes analizados',
    texto: 'Cada lote se analiza y contiene menos de 20 ppm de gluten, el límite para celíacos.',
  },
];

export const ENVIO_DOMICILIO = 45;

export function obtenerProducto(id) {
  return productos.find((p) => p.id === id);
}
