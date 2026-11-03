import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, YoungSerif_400Regular } from '@expo-google-fonts/young-serif';
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
} from '@expo-google-fonts/work-sans';

import { TiendaProvider, useTienda } from './src/context/TiendaContext';
import { colores, fuentes } from './src/theme';
import InicioScreen from './src/screens/InicioScreen';
import CatalogoScreen from './src/screens/CatalogoScreen';
import DetalleScreen from './src/screens/DetalleScreen';
import CarritoScreen from './src/screens/CarritoScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ConfirmacionScreen from './src/screens/ConfirmacionScreen';
import PedidosScreen from './src/screens/PedidosScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colores.morado,
    background: colores.azucar,
    card: colores.azucar,
    text: colores.cacao,
    border: colores.borde,
  },
};

const ICONOS = {
  Inicio: 'home',
  Catalogo: 'grid',
  Carrito: 'bag-handle',
  Pedidos: 'receipt',
};

// Pestañas inferiores: Inicio, Catálogo, Carrito y Mis pedidos.
function Pestanas() {
  const { totalPiezas } = useTienda();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colores.morado,
        tabBarInactiveTintColor: colores.cacaoSuave,
        tabBarLabelStyle: { fontFamily: fuentes.textoMedio, fontSize: 11, lineHeight: 14 },
        tabBarStyle: {
          backgroundColor: colores.azucar,
          borderTopColor: colores.borde,
          // En web no hay área segura inferior: se da un poco más de alto para que no se corten las etiquetas.
          ...(Platform.OS === 'web' && { height: 62, paddingBottom: 8 }),
        },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? ICONOS[route.name] : `${ICONOS[route.name]}-outline`} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Catalogo" component={CatalogoScreen} options={{ title: 'Catálogo' }} />
      <Tab.Screen
        name="Carrito"
        component={CarritoScreen}
        options={{
          tabBarBadge: totalPiezas > 0 ? totalPiezas : undefined,
          tabBarBadgeStyle: { backgroundColor: colores.cempasuchil, color: colores.cacao, fontFamily: fuentes.textoNegrita },
        }}
      />
      <Tab.Screen name="Pedidos" component={PedidosScreen} options={{ title: 'Mis pedidos' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fuentesListas] = useFonts({
    YoungSerif_400Regular,
    WorkSans_400Regular,
    WorkSans_500Medium,
    WorkSans_600SemiBold,
  });

  if (!fuentesListas) return null;

  return (
    <SafeAreaProvider>
      <TiendaProvider>
        <NavigationContainer theme={tema}>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerTintColor: colores.morado,
              headerTitleStyle: { fontFamily: fuentes.titulo, color: colores.cacao },
              headerStyle: { backgroundColor: colores.azucar },
              headerShadowVisible: false,
              headerBackTitle: 'Atrás',
            }}
          >
            <Stack.Screen name="Tabs" component={Pestanas} options={{ headerShown: false }} />
            <Stack.Screen name="Detalle" component={DetalleScreen} options={{ title: '' }} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Apartar pedido' }} />
            <Stack.Screen
              name="Confirmacion"
              component={ConfirmacionScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TiendaProvider>
    </SafeAreaProvider>
  );
}
