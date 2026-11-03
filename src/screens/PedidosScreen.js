import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Boton } from '../components/ui';
import { useTienda } from '../context/TiendaContext';
import { colores, espacio, fuentes, tipografia } from '../theme';
import { dineroCorto, fechaLarga } from '../utils/format';

function TarjetaPedido({ pedido }) {
  const piezas = pedido.articulos.reduce((s, a) => s + a.cantidad, 0);
  return (
    <View style={estilos.tarjeta}>
      <View style={estilos.cabecera}>
        <Text style={estilos.folio}>{pedido.folio}</Text>
        <View style={estilos.estado}>
          <Text style={estilos.estadoTexto}>{pedido.estado}</Text>
        </View>
      </View>
      <View style={estilos.dato}>
        <Ionicons name="calendar-outline" size={16} color={colores.morado} />
        <Text style={tipografia.cuerpo}>
          {fechaLarga(pedido.dia).replace(/^./, (c) => c.toUpperCase())}, {pedido.hora}
        </Text>
      </View>
      <View style={estilos.dato}>
        <Ionicons name={pedido.entrega === 'tienda' ? 'storefront-outline' : 'bicycle-outline'} size={16} color={colores.morado} />
        <Text style={tipografia.cuerpo}>{pedido.entrega === 'tienda' ? 'Recoger en tienda' : 'Entrega a domicilio'}</Text>
      </View>
      <View style={estilos.articulos}>
        {pedido.articulos.map((a, i) => (
          <Text key={i} style={tipografia.cuerpoSuave}>
            {a.cantidad} × {a.nombre} ({a.tamano.toLowerCase()})
          </Text>
        ))}
      </View>
      <View style={estilos.pie}>
        <Text style={tipografia.cuerpoSuave}>{piezas} {piezas === 1 ? 'pieza' : 'piezas'}</Text>
        <Text style={tipografia.precio}>{dineroCorto(pedido.total)}</Text>
      </View>
    </View>
  );
}

export default function PedidosScreen({ navigation }) {
  const { pedidos } = useTienda();

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top']}>
      <FlatList
        data={pedidos}
        keyExtractor={(p) => p.folio + p.creado}
        contentContainerStyle={{ padding: espacio.xl, gap: espacio.l, flexGrow: 1 }}
        ListHeaderComponent={<Text style={tipografia.h1}>Mis pedidos</Text>}
        ListEmptyComponent={
          <View style={estilos.vacio}>
            <Ionicons name="receipt-outline" size={48} color={colores.cacaoSuave} />
            <Text style={[tipografia.h2, { marginTop: espacio.m }]}>Aún no tienes pedidos</Text>
            <Text style={[tipografia.cuerpoSuave, { textAlign: 'center', marginVertical: espacio.s }]}>
              Cuando apartes tu pan, aquí verás el folio y la fecha de entrega.
            </Text>
            <Boton titulo="Ver catálogo" onPress={() => navigation.navigate('Catalogo')} />
          </View>
        }
        renderItem={({ item }) => <TarjetaPedido pedido={item} />}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.azucar },
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: espacio.xxl },
  tarjeta: {
    padding: espacio.l,
    borderRadius: 20,
    backgroundColor: colores.blanco,
    borderWidth: 1,
    borderColor: colores.borde,
    gap: espacio.s,
  },
  cabecera: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  folio: { fontFamily: fuentes.titulo, fontSize: 20, color: colores.morado },
  estado: { backgroundColor: colores.verdeClaro, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  estadoTexto: { fontFamily: fuentes.textoNegrita, fontSize: 12, color: colores.verde },
  dato: { flexDirection: 'row', alignItems: 'center', gap: espacio.s },
  articulos: { paddingTop: espacio.s, borderTopWidth: 1, borderTopColor: colores.borde },
  pie: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
