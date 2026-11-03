import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Boton, Chip } from '../components/ui';
import { ENVIO_DOMICILIO } from '../data/products';
import { useTienda } from '../context/TiendaContext';
import { colores, espacio, fuentes, tipografia } from '../theme';
import { dineroCorto, generarFolio, HORARIOS, proximosDias } from '../utils/format';

const TARJETA_PRUEBA = { numero: '4242 4242 4242 4242', vence: '12/29', cvv: '123' };

function soloDigitos(texto) {
  return texto.replace(/\D/g, '');
}

function Campo({ etiqueta, error, ...props }) {
  return (
    <View style={{ marginBottom: espacio.m }}>
      <Text style={[tipografia.etiqueta, { marginBottom: espacio.xs }]}>{etiqueta}</Text>
      <TextInput
        placeholderTextColor={colores.cacaoSuave}
        style={[estilos.input, error && { borderColor: colores.rojo }]}
        {...props}
      />
      {error && <Text style={estilos.error}>{error}</Text>}
    </View>
  );
}

export default function CheckoutScreen({ navigation }) {
  const { lineas, subtotal, confirmarPedido } = useTienda();
  const dias = useMemo(() => proximosDias(7), []);

  const [entrega, setEntrega] = useState('tienda');
  const [direccion, setDireccion] = useState('');
  const [dia, setDia] = useState(dias[0].iso);
  const [hora, setHora] = useState(null);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tarjeta, setTarjeta] = useState({ numero: '', vence: '', cvv: '' });
  const [errores, setErrores] = useState({});
  const [pagando, setPagando] = useState(false);

  const envio = entrega === 'domicilio' ? ENVIO_DOMICILIO : 0;
  const total = subtotal + envio;

  function formatearNumero(texto) {
    const d = soloDigitos(texto).slice(0, 16);
    return d.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  function formatearVence(texto) {
    const d = soloDigitos(texto).slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  }

  function validar() {
    const e = {};
    if (entrega === 'domicilio' && direccion.trim().length < 8) e.direccion = 'Escribe calle, número y colonia.';
    if (!hora) e.hora = 'Elige una hora de entrega.';
    if (nombre.trim().length < 3) e.nombre = 'Escribe tu nombre completo.';
    if (soloDigitos(telefono).length !== 10) e.telefono = 'El teléfono debe tener 10 dígitos.';
    if (soloDigitos(tarjeta.numero).length !== 16) e.numero = 'El número de tarjeta debe tener 16 dígitos.';
    const [mm] = tarjeta.vence.split('/');
    if (!/^\d{2}\/\d{2}$/.test(tarjeta.vence) || Number(mm) < 1 || Number(mm) > 12) e.vence = 'Usa el formato MM/AA.';
    if (soloDigitos(tarjeta.cvv).length !== 3) e.cvv = 'El CVV tiene 3 dígitos.';
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  function pagar() {
    if (!validar()) return;
    setPagando(true);
    // Pago simulado: se espera un momento como si respondiera un banco.
    setTimeout(async () => {
      const pedido = {
        folio: generarFolio(),
        creado: new Date().toISOString(),
        entrega,
        direccion: entrega === 'domicilio' ? direccion.trim() : null,
        dia,
        hora,
        nombre: nombre.trim(),
        telefono: soloDigitos(telefono),
        tarjeta: soloDigitos(tarjeta.numero).slice(-4),
        articulos: lineas.map((l) => ({
          nombre: l.producto.nombre,
          tamano: l.tamano.nombre,
          cantidad: l.cantidad,
          subtotal: l.subtotal,
        })),
        subtotal,
        envio,
        total,
        estado: 'Apartado',
      };
      await confirmarPedido(pedido);
      setPagando(false);
      navigation.replace('Confirmacion', { pedido });
    }, 1200);
  }

  return (
    <SafeAreaView style={estilos.pantalla} edges={['bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: espacio.xl }} keyboardShouldPersistTaps="handled">
          <Text style={tipografia.h2}>¿Cómo lo quieres recibir?</Text>
          <View style={estilos.fila}>
            <Chip texto="Recoger en tienda" activo={entrega === 'tienda'} onPress={() => setEntrega('tienda')} />
            <Chip
              texto={`A domicilio +${dineroCorto(ENVIO_DOMICILIO)}`}
              activo={entrega === 'domicilio'}
              onPress={() => setEntrega('domicilio')}
            />
          </View>
          {entrega === 'tienda' ? (
            <View style={estilos.nota}>
              <Ionicons name="location-outline" size={18} color={colores.morado} />
              <Text style={[tipografia.cuerpoSuave, { flex: 1 }]}>Calle Azahar 12, Col. Centro. Abierto de 8:00 a 20:00.</Text>
            </View>
          ) : (
            <Campo
              etiqueta="Dirección de entrega"
              placeholder="Calle, número y colonia"
              value={direccion}
              onChangeText={setDireccion}
              error={errores.direccion}
            />
          )}

          <Text style={[tipografia.h2, estilos.subtitulo]}>Día</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: espacio.s }}>
            {dias.map((d) => {
              const activo = d.iso === dia;
              return (
                <Pressable
                  key={d.iso}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: activo }}
                  onPress={() => setDia(d.iso)}
                  style={[estilos.dia, activo && estilos.diaActivo]}
                >
                  <Text style={[estilos.diaSemana, activo && { color: colores.blanco }]}>{d.diaSemana}</Text>
                  <Text style={[estilos.diaNumero, activo && { color: colores.blanco }]}>{d.numero}</Text>
                  <Text style={[estilos.diaSemana, activo && { color: colores.blanco }]}>{d.mes}</Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Text style={[tipografia.h2, estilos.subtitulo]}>Hora</Text>
          <View style={estilos.horas}>
            {HORARIOS.map((h) => (
              <Chip key={h} texto={h} activo={h === hora} onPress={() => setHora(h)} />
            ))}
          </View>
          {errores.hora && <Text style={estilos.error}>{errores.hora}</Text>}

          <Text style={[tipografia.h2, estilos.subtitulo]}>Tus datos</Text>
          <Campo etiqueta="Nombre" placeholder="Nombre y apellido" value={nombre} onChangeText={setNombre} error={errores.nombre} />
          <Campo
            etiqueta="Teléfono"
            placeholder="10 dígitos"
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={(t) => setTelefono(soloDigitos(t).slice(0, 10))}
            error={errores.telefono}
          />

          <View style={estilos.pagoTitulo}>
            <Text style={tipografia.h2}>Pago</Text>
            <Pressable onPress={() => setTarjeta(TARJETA_PRUEBA)} hitSlop={8}>
              <Text style={estilos.enlace}>Usar tarjeta de prueba</Text>
            </Pressable>
          </View>
          <View style={estilos.demo}>
            <Ionicons name="information-circle-outline" size={18} color={colores.cacao} />
            <Text style={[tipografia.cuerpoSuave, { flex: 1, color: colores.cacao }]}>
              Pago de demostración: no se realiza ningún cargo.
            </Text>
          </View>
          <Campo
            etiqueta="Número de tarjeta"
            placeholder="0000 0000 0000 0000"
            keyboardType="number-pad"
            value={tarjeta.numero}
            onChangeText={(t) => setTarjeta({ ...tarjeta, numero: formatearNumero(t) })}
            error={errores.numero}
          />
          <View style={estilos.fila}>
            <View style={{ flex: 1 }}>
              <Campo
                etiqueta="Vence"
                placeholder="MM/AA"
                keyboardType="number-pad"
                value={tarjeta.vence}
                onChangeText={(t) => setTarjeta({ ...tarjeta, vence: formatearVence(t) })}
                error={errores.vence}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Campo
                etiqueta="CVV"
                placeholder="123"
                keyboardType="number-pad"
                secureTextEntry
                value={tarjeta.cvv}
                onChangeText={(t) => setTarjeta({ ...tarjeta, cvv: soloDigitos(t).slice(0, 3) })}
                error={errores.cvv}
              />
            </View>
          </View>

          <View style={estilos.resumen}>
            <View style={estilos.resumenFila}>
              <Text style={tipografia.cuerpo}>Subtotal</Text>
              <Text style={tipografia.cuerpo}>{dineroCorto(subtotal)}</Text>
            </View>
            <View style={estilos.resumenFila}>
              <Text style={tipografia.cuerpo}>Envío</Text>
              <Text style={tipografia.cuerpo}>{envio ? dineroCorto(envio) : 'Gratis'}</Text>
            </View>
            <View style={[estilos.resumenFila, { marginTop: espacio.s }]}>
              <Text style={tipografia.h2}>Total</Text>
              <Text style={[tipografia.h2, { color: colores.morado }]}>{dineroCorto(total)}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={estilos.barra}>
          {Object.keys(errores).length > 0 && (
            <Text style={[estilos.error, { textAlign: 'center', marginBottom: espacio.s }]}>
              Revisa los campos marcados en rojo.
            </Text>
          )}
          <Boton titulo={`Pagar y apartar ${dineroCorto(total)}`} icono="lock-closed-outline" onPress={pagar} cargando={pagando} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colores.azucar },
  subtitulo: { marginTop: espacio.xl, marginBottom: espacio.m },
  fila: { flexDirection: 'row', gap: espacio.s, marginTop: espacio.m, flexWrap: 'wrap' },
  nota: {
    flexDirection: 'row',
    gap: espacio.s,
    marginTop: espacio.m,
    padding: espacio.m,
    borderRadius: 12,
    backgroundColor: colores.moradoClaro,
  },
  dia: {
    width: 64,
    paddingVertical: espacio.m,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.borde,
    backgroundColor: colores.blanco,
    alignItems: 'center',
  },
  diaActivo: { backgroundColor: colores.morado, borderColor: colores.morado },
  diaSemana: { fontFamily: fuentes.textoMedio, fontSize: 12, color: colores.cacaoSuave },
  diaNumero: { fontFamily: fuentes.titulo, fontSize: 22, color: colores.cacao, marginVertical: 2 },
  horas: { flexDirection: 'row', flexWrap: 'wrap', gap: espacio.s },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 12,
    paddingHorizontal: espacio.m,
    backgroundColor: colores.blanco,
    fontFamily: fuentes.texto,
    fontSize: 16,
    color: colores.cacao,
  },
  error: { fontFamily: fuentes.textoMedio, fontSize: 13, color: colores.rojo, marginTop: espacio.xs },
  pagoTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: espacio.xl,
  },
  enlace: { fontFamily: fuentes.textoNegrita, color: colores.morado, fontSize: 14 },
  demo: {
    flexDirection: 'row',
    gap: espacio.s,
    marginVertical: espacio.m,
    padding: espacio.m,
    borderRadius: 12,
    backgroundColor: colores.cempasuchilClaro,
  },
  resumen: {
    marginTop: espacio.l,
    padding: espacio.l,
    borderRadius: 16,
    backgroundColor: colores.harina,
    gap: espacio.xs,
  },
  resumenFila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  barra: {
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    paddingHorizontal: espacio.xl,
    paddingVertical: espacio.m,
    backgroundColor: colores.azucar,
  },
});
