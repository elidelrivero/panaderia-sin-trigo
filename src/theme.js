// Paleta inspirada en el propio pan de muerto y en la ofrenda:
// azúcar (fondo), cacao (texto), morado de altar (marca),
// cempasúchil (acento), costra horneada y verde de "sin gluten".
export const colores = {
  azucar: '#FFFDF8',
  harina: '#F6EFE4',
  cacao: '#3B2416',
  cacaoSuave: '#7A6253',
  morado: '#4E2A5C',
  moradoClaro: '#EFE6F2',
  cempasuchil: '#F2A007',
  cempasuchilClaro: '#FFF1D2',
  costra: '#B9732F',
  verde: '#2F7D5B',
  verdeClaro: '#E3F2EA',
  rojo: '#B3261E',
  borde: '#E7DCCB',
  blanco: '#FFFFFF',
};

export const fuentes = {
  titulo: 'YoungSerif_400Regular',
  texto: 'WorkSans_400Regular',
  textoMedio: 'WorkSans_500Medium',
  textoNegrita: 'WorkSans_600SemiBold',
};

export const espacio = { xs: 4, s: 8, m: 12, l: 16, xl: 24, xxl: 32 };

export const tipografia = {
  display: { fontFamily: fuentes.titulo, fontSize: 32, lineHeight: 38, color: colores.cacao },
  h1: { fontFamily: fuentes.titulo, fontSize: 26, lineHeight: 32, color: colores.cacao },
  h2: { fontFamily: fuentes.titulo, fontSize: 20, lineHeight: 26, color: colores.cacao },
  cuerpo: { fontFamily: fuentes.texto, fontSize: 15, lineHeight: 22, color: colores.cacao },
  cuerpoSuave: { fontFamily: fuentes.texto, fontSize: 14, lineHeight: 20, color: colores.cacaoSuave },
  etiqueta: { fontFamily: fuentes.textoNegrita, fontSize: 13, lineHeight: 18, color: colores.cacao },
  precio: { fontFamily: fuentes.textoNegrita, fontSize: 16, color: colores.morado },
};
