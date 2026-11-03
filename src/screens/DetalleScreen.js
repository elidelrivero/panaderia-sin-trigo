import { useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PanIlustracion from '../components/PanIlustracion';
import { Boton, Contador, SelloSinGluten } from '../components/ui';
import { obtenerProducto } from '../data/products';
import { useTienda } from '../context/TiendaContext';
import { colores, espacio, fuentes, tipografia } from '../theme';
import { dineroCorto } from '../utils/format';

export default function DetalleScreen({ route, navigation }) {
  const producto = obtenerProducto(route.params.id);
  const { agregar } = useTienda();
  const [tamanoId, setTamanoId] = useState(producto.tamanos[0].id);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const tamano = producto.tamanos.find((t) => t.id === tamanoId);

  // Compartir el producto ayuda a que la panadería llegue a más clientes.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          accessibilityLabel="Compartir"
          hitSlop={10}
          onPress={() =>
            Share.share({
              message: `Encontré ${producto.nombre.toLowerCase()} 100 % sin gluten en Panadería Sin Trigo, desde ${dineroCorto(producto.tamanos[0].precio)}. ¡Aparta el tuyo!`,
            }).catch(() => {})
          }
        >
          <Ionicons name="share-outline" size={22} color={colores.morado} />
        </Pressable>
      ),
    });
  }, [navigation, producto]);

  function alAgregar() {
    agregar(producto.id, tamanoId, cantidad);
    setAgregado(true);
    setCantidad(1);
  }

  return (
    <SafeAreaView style={estilos.pantalla} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: espacio.xl }}>
        <View style={estilos.imagen}>
          <PanIlustracion ilustracion={producto.ilustracion} tamano={230} />
        </View>

        <View style={estilos.contenido}>
          <SelloSinGluten grande />
          <Text style={[tipografia.h1, { marginTop: espacio.m }]}>{producto.nombre}</Text>
          <Text style={[tipografia.cuerpo, { marginTop: espacio.s }]}>{producto.descripcion}</Text>

          <Text style={[tipografia.h2, estilos.subtitulo]}>Tamaño</Text>
          {producto.tamanos.map((t) => {
            const activo = t.id === tamanoId;
            return (
              <Pressable
                key={t.id}
                accessibilityRole="radio"
                accessibilityState={{ checked: activo }}
                onPress={() => {
                  setTamanoId(t.id);
                  setAgregado(false);
                }}
                style={[estilos.opcion, activo && estilos.opcionActiva]}
              >
                <Ionicons
                  name={activo ? 'radio-button-on' : 'radio-button-off'}
                  size={20}
                  color={activo ? colores.morado : colores.cacaoSuave}
                />
                <View style={{ flex: 1 }}>
                  <Text style={tipografia.etiqueta}>{t.nombre}</Text>
                  <Text style={tipografia.cuerpoSuave}>{t.porciones}</Text>
                </View>
                <Text style={tipografia.precio}>{dineroCorto(t.precio)}</Text>
              </Pressable>
            );
          })}

          <Text style={[tipografia.h2, estilos.subtitulo]}>Ingredientes</Text>
          <Text style={tipografia.cuerpo}>
            {producto.ingredientes.join(', ').replace(/^./, (c) => c.toUpperCase())}.
          </Text>

          <Text style={[tipografia.h2, estilos.subtitulo]}>Alérgenos</Text>
          <View style={estilos.alergenos}>
            {producto.alergenos.length ? (
              producto.alergenos.map((a) => (
                <View key={a} style={estilos.alergeno}>
                  <Text style={estilos.alergenoTexto}>{a}</Text>
                </View>
              ))
            ) : (
              <Text style={tipografia.cuerpo}>No contiene huevo, leche, soya ni frutos secos.</Text>
            )}
          </View>
          <View style={estilos.aviso}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colores.verde} />
            <Text style={[tipografia.cuerpoSuave, { flex: 1, color: colores.verde }]}>
              Elaborado en una cocina exclusiva sin gluten. Apto para personas celíacas.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Barra fija para agregar al carrito */}
      <View style={estilos.barra}>
        {agregado ? (
          <View style={estilos.confirmacion}>
            <Ionicons name="checkmark-circle" size={22} color={colores.verde} />
            <Text style={[tipografia.etiqueta, { flex: 1 }]}>Agregado al carrito</Text>
            <Pressable onPress={() => setAgregado(false)} hitSlop={8}>
              <Text style={estilos.enlace}>Agregar más</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Tabs', { screen: 'Carrito' })} hitSlop={8}>
              <Text style={estilos.enlace}>Ver carrito</Text>
            </Pressable>
          </View>
        ) : (
          <View style={estilos.agregar}>
            <Contador valor={cantidad} onCambiar={(d) => setCantidad((c) => Math.max(1, c + d))} />
            <View style={{ flex: 1 }}>
              <Boton titulo={`Agregar ${dineroCorto(tamano.precio * cantidad)}`} onPress={alAgregar} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.azucar },
  imagen: {
    backgroundColor: colores.harina,
    alignItems: 'center',
    paddingVertical: espacio.xl,
  },
  contenido: { padding: espacio.xl },
  subtitulo: { marginTop: espacio.xl, marginBottom: espacio.s },
  opcion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.m,
    padding: espacio.l,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 16,
    marginBottom: espacio.s,
    backgroundColor: colores.blanco,
  },
  opcionActiva: { borderColor: colores.morado, borderWidth: 2, backgroundColor: colores.moradoClaro },
  alergenos: { flexDirection: 'row', flexWrap: 'wrap', gap: espacio.s },
  alergeno: {
    backgroundColor: colores.cempasuchilClaro,
    borderRadius: 12,
    paddingHorizontal: espacio.m,
    paddingVertical: espacio.xs,
  },
  alergenoTexto: { fontFamily: fuentes.textoMedio, fontSize: 14, color: colores.cacao },
  aviso: {
    flexDirection: 'row',
    gap: espacio.s,
    marginTop: espacio.l,
    padding: espacio.m,
    borderRadius: 12,
    backgroundColor: colores.verdeClaro,
  },
  barra: {
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.azucar,
    paddingHorizontal: espacio.xl,
    paddingVertical: espacio.m,
  },
  agregar: { flexDirection: 'row', alignItems: 'center', gap: espacio.m },
  confirmacion: { flexDirection: 'row', alignItems: 'center', gap: espacio.m, minHeight: 52 },
  enlace: { fontFamily: fuentes.textoNegrita, color: colores.morado, fontSize: 15 },
});
