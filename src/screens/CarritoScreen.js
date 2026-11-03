import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PanIlustracion from '../components/PanIlustracion';
import { Boton, Contador } from '../components/ui';
import { productos } from '../data/products';
import { useTienda } from '../context/TiendaContext';
import { colores, espacio, tipografia } from '../theme';
import { dineroCorto } from '../utils/format';

export default function CarritoScreen({ navigation }) {
  const { lineas, subtotal, cambiarCantidad, quitar, agregar } = useTienda();

  if (lineas.length === 0) {
    return (
      <SafeAreaView style={[estilos.pantalla, estilos.vacio]} edges={['top']}>
        <PanIlustracion ilustracion={productos[0].ilustracion} tamano={140} />
        <Text style={[tipografia.h2, { marginTop: espacio.l, textAlign: 'center' }]}>Tu carrito está vacío</Text>
        <Text style={[tipografia.cuerpoSuave, { textAlign: 'center', marginTop: espacio.xs, marginBottom: espacio.xl }]}>
          Elige tus panes de muerto y apártalos para el día que quieras.
        </Text>
        <Boton titulo="Ver catálogo" onPress={() => navigation.navigate('Catalogo')} />
      </SafeAreaView>
    );
  }

  // Sugerencias: productos que aún no están en el carrito (venta cruzada).
  const enCarrito = new Set(lineas.map((l) => l.productoId));
  const sugerencias = productos.filter((p) => !enCarrito.has(p.id)).slice(0, 2);

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: espacio.xl }}>
        <Text style={tipografia.h1}>Carrito</Text>

        {lineas.map((l) => (
          <View key={l.clave} style={estilos.linea}>
            <View style={estilos.lineaImagen}>
              <PanIlustracion ilustracion={l.producto.ilustracion} tamano={60} />
            </View>
            <View style={{ flex: 1, gap: espacio.s }}>
              <View style={estilos.lineaTitulo}>
                <View style={{ flex: 1 }}>
                  <Text style={tipografia.etiqueta}>{l.producto.nombre}</Text>
                  <Text style={tipografia.cuerpoSuave}>
                    {l.tamano.nombre}, {dineroCorto(l.tamano.precio)} c/u
                  </Text>
                </View>
                <Pressable accessibilityLabel={`Quitar ${l.producto.nombre}`} onPress={() => quitar(l.clave)} hitSlop={8}>
                  <Ionicons name="trash-outline" size={20} color={colores.cacaoSuave} />
                </Pressable>
              </View>
              <View style={estilos.lineaTitulo}>
                <Contador valor={l.cantidad} minimo={0} onCambiar={(d) => cambiarCantidad(l.clave, d)} />
                <Text style={tipografia.precio}>{dineroCorto(l.subtotal)}</Text>
              </View>
            </View>
          </View>
        ))}

        {sugerencias.length > 0 && (
          <View style={{ marginTop: espacio.xl }}>
            <Text style={tipografia.h2}>Completa tu ofrenda</Text>
            {sugerencias.map((p) => (
              <View key={p.id} style={estilos.sugerencia}>
                <PanIlustracion ilustracion={p.ilustracion} tamano={44} />
                <View style={{ flex: 1 }}>
                  <Text style={tipografia.etiqueta}>{p.nombre}</Text>
                  <Text style={tipografia.cuerpoSuave}>
                    {p.tamanos[0].nombre}, {dineroCorto(p.tamanos[0].precio)}
                  </Text>
                </View>
                <Pressable
                  accessibilityLabel={`Agregar ${p.nombre}`}
                  onPress={() => agregar(p.id, p.tamanos[0].id, 1)}
                  style={estilos.sugerenciaBoton}
                >
                  <Ionicons name="add" size={20} color={colores.blanco} />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={estilos.barra}>
        <View style={estilos.total}>
          <Text style={tipografia.cuerpo}>Subtotal</Text>
          <Text style={[tipografia.h2, { color: colores.morado }]}>{dineroCorto(subtotal)}</Text>
        </View>
        <Boton titulo="Elegir día de entrega" icono="calendar-outline" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.azucar },
  vacio: { alignItems: 'center', justifyContent: 'center', padding: espacio.xl },
  linea: {
    flexDirection: 'row',
    gap: espacio.m,
    paddingVertical: espacio.l,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  lineaImagen: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colores.harina,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineaTitulo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: espacio.s },
  sugerencia: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.m,
    marginTop: espacio.m,
    padding: espacio.m,
    borderRadius: 16,
    backgroundColor: colores.cempasuchilClaro,
  },
  sugerenciaBoton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colores.morado,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barra: {
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingHorizontal: espacio.xl,
    paddingVertical: espacio.m,
    gap: espacio.m,
    backgroundColor: colores.azucar,
  },
  total: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
