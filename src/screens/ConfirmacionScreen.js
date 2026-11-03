import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PapelPicado from '../components/PapelPicado';
import { Boton } from '../components/ui';
import { colores, espacio, fuentes, tipografia } from '../theme';
import { dineroCorto, fechaLarga } from '../utils/format';

export default function ConfirmacionScreen({ route, navigation }) {
  const { pedido } = route.params;
  const enTienda = pedido.entrega === 'tienda';

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top', 'bottom']}>
      <PapelPicado fondo={colores.azucar} />
      <ScrollView contentContainerStyle={estilos.contenido}>
        <View style={estilos.icono}>
          <Ionicons name="checkmark" size={44} color={colores.blanco} />
        </View>
        <Text style={[tipografia.h1, { textAlign: 'center' }]}>Tu pan está apartado</Text>
        <Text style={[tipografia.cuerpoSuave, { textAlign: 'center', marginTop: espacio.xs }]}>
          Gracias, {pedido.nombre.split(' ')[0]}. Puedes consultarlo cuando quieras en Mis pedidos.
        </Text>

        <View style={estilos.folio}>
          <Text style={tipografia.cuerpoSuave}>Folio del pedido</Text>
          <Text style={estilos.folioTexto}>{pedido.folio}</Text>
          <Text style={tipografia.cuerpoSuave}>
            {enTienda ? 'Muéstralo al recoger en tienda.' : 'Tenlo a la mano al recibir tu pedido.'}
          </Text>
        </View>

        <View style={estilos.dato}>
          <Ionicons name="calendar-outline" size={20} color={colores.morado} />
          <Text style={[tipografia.cuerpo, { flex: 1 }]}>
            {fechaLarga(pedido.dia).replace(/^./, (c) => c.toUpperCase())} a las {pedido.hora}
          </Text>
        </View>
        <View style={estilos.dato}>
          <Ionicons name={enTienda ? 'storefront-outline' : 'bicycle-outline'} size={20} color={colores.morado} />
          <Text style={[tipografia.cuerpo, { flex: 1 }]}>
            {enTienda ? 'Recoger en Calle Azahar 12, Col. Centro' : `Entrega en ${pedido.direccion}`}
          </Text>
        </View>
        <View style={estilos.dato}>
          <Ionicons name="card-outline" size={20} color={colores.morado} />
          <Text style={[tipografia.cuerpo, { flex: 1 }]}>
            Pagado {dineroCorto(pedido.total)} con tarjeta terminación {pedido.tarjeta}
          </Text>
        </View>

        <View style={{ marginTop: espacio.xl, gap: espacio.m, alignSelf: 'stretch' }}>
          <Boton titulo="Ver mis pedidos" onPress={() => navigation.navigate('Tabs', { screen: 'Pedidos' })} />
          <Boton titulo="Volver al inicio" variante="secundario" onPress={() => navigation.navigate('Tabs', { screen: 'Inicio' })} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.azucar },
  contenido: { padding: espacio.xl, alignItems: 'center' },
  icono: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colores.verde,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: espacio.l,
  },
  folio: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: espacio.xl,
    padding: espacio.xl,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colores.cempasuchil,
    backgroundColor: colores.cempasuchilClaro,
  },
  folioTexto: { fontFamily: fuentes.titulo, fontSize: 40, color: colores.morado, marginVertical: espacio.xs },
  dato: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.m,
    alignSelf: 'stretch',
    paddingVertical: espacio.m,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
});
