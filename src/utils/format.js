const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export function dinero(cantidad) {
  return `$${cantidad.toLocaleString('es-MX')} MXN`;
}

export function dineroCorto(cantidad) {
  return `$${cantidad.toLocaleString('es-MX')}`;
}

// Devuelve los próximos `n` días (a partir de mañana) para apartar el pedido.
export function proximosDias(n = 7) {
  const dias = [];
  const hoy = new Date();
  for (let i = 1; i <= n; i += 1) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    dias.push({
      // Fecha local en formato AAAA-MM-DD (sin convertir a UTC).
      iso: `${d.getFullYear()}-${mm}-${dd}`,
      diaSemana: DIAS[d.getDay()].slice(0, 3),
      numero: d.getDate(),
      mes: MESES[d.getMonth()].slice(0, 3),
    });
  }
  return dias;
}

export function fechaLarga(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  const fecha = new Date(a, m - 1, d);
  return `${DIAS[fecha.getDay()]} ${d} de ${MESES[m - 1]}`;
}

export const HORARIOS = ['9:00', '11:00', '13:00', '15:00', '17:00', '19:00'];

export function generarFolio() {
  return `ST-${Math.floor(1000 + Math.random() * 9000)}`;
}
