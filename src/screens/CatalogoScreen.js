import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductoFila } from '../components/ProductoCard';
import { Chip } from '../components/ui';
import { categorias, productos } from '../data/products';
import { colores, espacio, tipografia } from '../theme';

export default function CatalogoScreen({ navigation }) {
  const [categoria, setCategoria] = useState('todos');
  const lista = categoria === 'todos' ? productos : productos.filter((p) => p.categoria === categoria);

  return (
    <SafeAreaView style={estilos.pantalla} edges={['top']}>
      <FlatList
        data={lista}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ paddingHorizontal: espacio.xl, paddingBottom: espacio.xxl }}
        ListHeaderComponent={
          <View>
            <Text style={[tipografia.h1, { marginTop: espacio.l }]}>Catálogo</Text>
            <Text style={tipografia.cuerpoSuave}>Todo nuestro pan es sin gluten.</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={estilos.chips}
            >
              {categorias.map((c) => (
                <Chip key={c.id} texto={c.nombre} activo={c.id === categoria} onPress={() => setCategoria(c.id)} />
              ))}
            </ScrollView>
          </View>
        }
        renderItem={({ item }) => (
          <ProductoFila producto={item} onPress={() => navigation.navigate('Detalle', { id: item.id })} />
        )}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.azucar },
  chips: { gap: espacio.s, paddingVertical: espacio.l },
});
