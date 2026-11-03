import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerProducto } from '../data/products';

const CLAVE_PEDIDOS = '@sintrigo/pedidos';

const TiendaContext = createContext(null);

// Estado global de la app: carrito (en memoria) y pedidos (guardados en el teléfono).
export function TiendaProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(CLAVE_PEDIDOS)
      .then((valor) => {
        if (valor) setPedidos(JSON.parse(valor));
      })
      .catch(() => {});
  }, []);

  // Una línea del carrito = producto + tamaño. Si ya existe, se suma la cantidad.
  function agregar(productoId, tamanoId, cantidad = 1) {
    setCarrito((actual) => {
      const clave = `${productoId}-${tamanoId}`;
      const existe = actual.find((l) => l.clave === clave);
      if (existe) {
        return actual.map((l) => (l.clave === clave ? { ...l, cantidad: l.cantidad + cantidad } : l));
      }
      return [...actual, { clave, productoId, tamanoId, cantidad }];
    });
  }

  function cambiarCantidad(clave, delta) {
    setCarrito((actual) =>
      actual
        .map((l) => (l.clave === clave ? { ...l, cantidad: l.cantidad + delta } : l))
        .filter((l) => l.cantidad > 0)
    );
  }

  function quitar(clave) {
    setCarrito((actual) => actual.filter((l) => l.clave !== clave));
  }

  // Líneas con los datos completos del producto y el subtotal calculado.
  const lineas = useMemo(
    () =>
      carrito.map((l) => {
        const producto = obtenerProducto(l.productoId);
        const tamano = producto.tamanos.find((t) => t.id === l.tamanoId);
        return { ...l, producto, tamano, subtotal: tamano.precio * l.cantidad };
      }),
    [carrito]
  );

  const totalPiezas = lineas.reduce((suma, l) => suma + l.cantidad, 0);
  const subtotal = lineas.reduce((suma, l) => suma + l.subtotal, 0);

  async function confirmarPedido(pedido) {
    const nuevos = [pedido, ...pedidos];
    setPedidos(nuevos);
    setCarrito([]);
    try {
      await AsyncStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(nuevos));
    } catch (e) {
      // Si falla el guardado, el pedido sigue visible durante la sesión.
    }
  }

  const valor = {
    lineas,
    totalPiezas,
    subtotal,
    agregar,
    cambiarCantidad,
    quitar,
    pedidos,
    confirmarPedido,
  };

  return <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>;
}

export function useTienda() {
  return useContext(TiendaContext);
}
