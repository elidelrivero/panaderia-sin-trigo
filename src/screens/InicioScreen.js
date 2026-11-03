import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PapelPicado from '../components/PapelPicado';
import PanIlustracion from '../components/PanIlustracion';
import { ProductoDestacado } from '../components/ProductoCard';
import { Boton, SelloSinGluten } from '../components/ui';
import { garantias, productos } from '../data/products';
import { colores, espacio, fuentes, tipografia } from '../theme';

const PASOS = [
  { icono: 'basket-outline', texto: 'Elige tus panes y el tamaño.' },
  { icono: 'calendar-outline', texto: 'Escoge el día y la hora de entrega.' },
  { icono: 'bag-check-outline', texto: 'Recógelo recién horneado o recíbelo en casa.' },
];

export default function InicioScreen({ navigation }) {
  const destacados = productos.filter((p) => p.destacado);
  const abrir = (id) => navigation.navigate('Detalle', { id });

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: espacio.xxl }}>
        <PapelPicado fondo={colores.azucar} />

        {/* Portada: lo primero que ve el cliente es el pan y la garantía */}
        <View style={estilos.portada}>
          <Text style={estilos.marca}>Panadería Sin Trigo</Text>
          <Text style={tipografia.display}>Pan de muerto sin gluten, para que nadie se quede sin probarlo</Text>
          <View style={estilos.portadaImagen}>
            <PanIlustracion ilustracion={productos[0].ilustracion} tamano={220} />
          </View>
          <SelloSinGluten grande />
          <Text style={[tipografia.cuerpo, { marginTop: espacio.m }]}>
            Aparta tu pan hoy y recógelo recién horneado el día que elijas. La producción de temporada es limitada.
          </Text>
          <View style={{ marginTop: espacio.l }}>
            <Boton titulo="Ver el pan de temporada" icono="storefront-outline" onPress={() => navigation.navigate('Catalogo')} />
          </View>
        </View>

        <View style={estilos.seccion}>
          <Text style={[tipografia.h2, estilos.margenLateral]}>Los favoritos de la temporada</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={estilos.carrusel}
          >
            {destacados.map((p) => (
              <ProductoDestacado key={p.id} producto={p} onPress={() => abrir(p.id)} />
            ))}
          </ScrollView>
        </View>

        <View style={[estilos.seccion, estilos.margenLateral]}>
          <Text style={tipografia.h2}>Cómo funciona la preventa</Text>
          {PASOS.map((paso, i) => (
            <View key={paso.icono} style={estilos.paso}>
              <View style={estilos.pasoNumero}>
                <Text style={estilos.pasoNumeroTexto}>{i + 1}</Text>
              </View>
              <Ionicons name={paso.icono} size={22} color={colores.morado} />
              <Text style={[tipografia.cuerpo, { flex: 1 }]}>{paso.texto}</Text>
            </View>
          ))}
        </View>

        <View style={[estilos.seccion, estilos.margenLateral, estilos.confianza]}>
          <Text style={[tipografia.h2, { color: colores.blanco }]}>Hecho para personas celíacas</Text>
          {garantias.map((g) => (
            <View key={g.titulo} style={estilos.garantia}>
              <Ionicons name="shield-checkmark" size={22} color={colores.cempasuchil} />
              <View style={{ flex: 1 }}>
                <Text style={[tipografia.etiqueta, { color: colores.blanco, fontSize: 15 }]}>{g.titulo}</Text>
                <Text style={[tipografia.cuerpoSuave, { color: '#E2D5E7' }]}>{g.texto}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.azucar },
  margenLateral: { marginHorizontal: espacio.xl },
  portada: { paddingHorizontal: espacio.xl, paddingTop: espacio.l },
  marca: {
    fontFamily: fuentes.textoNegrita,
    fontSize: 15,
    color: colores.morado,
    marginBottom: espacio.s,
  },
  portadaImagen: {
    alignItems: 'center',
    marginVertical: espacio.l,
    paddingVertical: espacio.l,
    backgroundColor: colores.cempasuchilClaro,
    borderRadius: 140,
  },
  seccion: { marginTop: espacio.xxl },
  carrusel: { paddingHorizontal: espacio.xl, gap: espacio.l, paddingTop: espacio.m },
  paso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espacio.m,
    marginTop: espacio.m,
  },
  pasoNumero: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colores.cempasuchil,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pasoNumeroTexto: { fontFamily: fuentes.textoNegrita, color: colores.cacao, fontSize: 13 },
  confianza: {
    backgroundColor: colores.morado,
    borderRadius: 24,
    padding: espacio.xl,
  },
  garantia: { flexDirection: 'row', gap: espacio.m, marginTop: espacio.l },
});
