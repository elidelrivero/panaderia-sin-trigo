import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores, espacio, fuentes } from '../theme';

// Botón principal (morado) o secundario (con borde).
export function Boton({ titulo, onPress, variante = 'principal', deshabilitado, cargando, icono }) {
  const secundario = variante === 'secundario';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={deshabilitado || cargando}
      style={({ pressed }) => [
        estilos.boton,
        secundario ? estilos.botonSecundario : estilos.botonPrincipal,
        (deshabilitado || cargando) && estilos.botonDeshabilitado,
        pressed && { opacity: 0.85 },
      ]}
    >
      {cargando ? (
        <ActivityIndicator color={colores.blanco} />
      ) : (
        <View style={estilos.botonContenido}>
          {icono && (
            <Ionicons name={icono} size={18} color={secundario ? colores.morado : colores.blanco} />
          )}
          <Text style={[estilos.botonTexto, secundario && { color: colores.morado }]}>{titulo}</Text>
        </View>
      )}
    </Pressable>
  );
}

// Selector de cantidad con botones − y +.
export function Contador({ valor, onCambiar, minimo = 1 }) {
  return (
    <View style={estilos.contador}>
      <Pressable
        accessibilityLabel="Quitar uno"
        onPress={() => onCambiar(-1)}
        disabled={valor <= minimo}
        style={[estilos.contadorBoton, valor <= minimo && { opacity: 0.35 }]}
      >
        <Ionicons name="remove" size={18} color={colores.morado} />
      </Pressable>
      <Text style={estilos.contadorValor}>{valor}</Text>
      <Pressable accessibilityLabel="Agregar uno" onPress={() => onCambiar(1)} style={estilos.contadorBoton}>
        <Ionicons name="add" size={18} color={colores.morado} />
      </Pressable>
    </View>
  );
}

// Sello que identifica que el producto es sin gluten.
export function SelloSinGluten({ grande }) {
  return (
    <View style={[estilos.sello, grande && estilos.selloGrande]}>
      <Ionicons name="checkmark-circle" size={grande ? 18 : 14} color={colores.verde} />
      <Text style={[estilos.selloTexto, grande && { fontSize: 14 }]}>Sin gluten</Text>
    </View>
  );
}

export function Chip({ texto, activo, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: activo }}
      onPress={onPress}
      style={[estilos.chip, activo && estilos.chipActivo]}
    >
      <Text style={[estilos.chipTexto, activo && { color: colores.blanco }]}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    minHeight: 52,
    borderRadius: 26,
    paddingHorizontal: espacio.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPrincipal: { backgroundColor: colores.morado },
  botonSecundario: { borderWidth: 1.5, borderColor: colores.morado, backgroundColor: 'transparent' },
  botonDeshabilitado: { opacity: 0.45 },
  botonContenido: { flexDirection: 'row', alignItems: 'center', gap: espacio.s },
  botonTexto: { fontFamily: fuentes.textoNegrita, fontSize: 16, color: colores.blanco },
  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 22,
    backgroundColor: colores.blanco,
  },
  contadorBoton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  contadorValor: { minWidth: 24, textAlign: 'center', fontFamily: fuentes.textoNegrita, fontSize: 16, color: colores.cacao },
  sello: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: colores.verdeClaro,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  selloGrande: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  selloTexto: { fontFamily: fuentes.textoNegrita, fontSize: 12, color: colores.verde },
  chip: {
    paddingHorizontal: espacio.l,
    paddingVertical: espacio.s,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.blanco,
  },
  chipActivo: { backgroundColor: colores.morado, borderColor: colores.morado },
  chipTexto: { fontFamily: fuentes.textoMedio, fontSize: 14, color: colores.cacao },
});
