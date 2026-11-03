import { Pressable, StyleSheet, Text, View } from 'react-native';
import PanIlustracion from './PanIlustracion';
import { colores, espacio, fuentes, tipografia } from '../theme';
import { dineroCorto } from '../utils/format';

function precioDesde(producto) {
  return Math.min(...producto.tamanos.map((t) => t.precio));
}

// Fila del catálogo: ilustración a la izquierda y datos a la derecha.
export function ProductoFila({ producto, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [estilos.fila, pressed && { opacity: 0.8 }]}
    >
      <View style={estilos.filaImagen}>
        <PanIlustracion ilustracion={producto.ilustracion} tamano={84} />
      </View>
      <View style={estilos.filaInfo}>
        <Text style={tipografia.h2}>{producto.nombre}</Text>
        <Text style={[tipografia.cuerpoSuave, { marginTop: 2 }]} numberOfLines={2}>
          {producto.resumen}
        </Text>
        <Text style={estilos.alergenos}>
          {producto.alergenos.length ? `Contiene ${producto.alergenos.join(', ').toLowerCase()}` : 'Sin huevo ni lácteos'}
        </Text>
        <Text style={[tipografia.precio, { marginTop: espacio.s }]}>Desde {dineroCorto(precioDesde(producto))}</Text>
      </View>
    </Pressable>
  );
}

// Tarjeta vertical para el carrusel de destacados del inicio.
export function ProductoDestacado({ producto, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [estilos.destacado, pressed && { opacity: 0.8 }]}
    >
      <View style={estilos.destacadoImagen}>
        <PanIlustracion ilustracion={producto.ilustracion} tamano={120} />
      </View>
      <Text style={[tipografia.etiqueta, { fontSize: 15 }]} numberOfLines={2}>
        {producto.nombre}
      </Text>
      <Text style={[tipografia.precio, { fontSize: 14, marginTop: 4 }]}>
        Desde {dineroCorto(precioDesde(producto))}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    gap: espacio.l,
    paddingVertical: espacio.l,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  filaImagen: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colores.harina,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filaInfo: { flex: 1, justifyContent: 'center' },
  alergenos: { fontFamily: fuentes.texto, fontSize: 12, color: colores.cacaoSuave, marginTop: espacio.xs },
  destacado: { width: 156 },
  destacadoImagen: {
    height: 140,
    borderRadius: 20,
    backgroundColor: colores.harina,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: espacio.s,
  },
});

export { precioDesde };
