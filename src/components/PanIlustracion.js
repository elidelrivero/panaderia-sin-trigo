import Svg, { Circle, Ellipse, G, Path } from 'react-native-svg';

// Pan de muerto dibujado con SVG: costra, cubierta de azúcar,
// "huesitos" y la bolita de arriba. Los colores vienen de cada producto.
function Pan({ cubierta, costra, relleno }) {
  const huesoArco = [
    [23, 72], [31, 58], [44, 48], [60, 44], [76, 48], [89, 58], [97, 72],
  ];
  const huesoFrente = [[60, 80], [60, 70], [60, 61], [60, 52]];

  return (
    <G>
      <Ellipse cx="60" cy="86" rx="48" ry="6" fill="#3B2416" opacity="0.12" />
      <Path d="M12,82 C12,20 108,20 108,82 C84,88 36,88 12,82 Z" fill={costra} />
      <Path d="M16,79 C16,26 104,26 104,79 C82,84 38,84 16,79 Z" fill={cubierta} opacity="0.92" />
      {relleno && (
        <Path d="M14,74 C40,79 80,79 106,74 L107,80 C82,86 38,86 13,80 Z" fill={relleno} />
      )}
      {[...huesoArco, ...huesoFrente].map(([x, y], i) => (
        <G key={i}>
          <Circle cx={x} cy={y} r="5.6" fill={costra} />
          <Circle cx={x - 1.5} cy={y - 1.5} r="2" fill={cubierta} opacity="0.85" />
        </G>
      ))}
      <Circle cx="60" cy="33" r="9.5" fill={costra} />
      <Circle cx="57.5" cy="30.5" r="4" fill={cubierta} opacity="0.85" />
    </G>
  );
}

export default function PanIlustracion({ ilustracion, tamano = 120 }) {
  const { cubierta, costra, relleno, mini } = ilustracion;
  const alto = (tamano * 95) / 120;

  if (mini) {
    return (
      <Svg width={tamano} height={alto} viewBox="0 0 120 95">
        <G transform="translate(-4 24) scale(0.62)">
          <Pan cubierta={cubierta} costra={costra} />
        </G>
        <G transform="translate(50 24) scale(0.62)">
          <Pan cubierta="#6B3B22" costra="#8E5226" />
        </G>
        <G transform="translate(23 2) scale(0.62)">
          <Pan cubierta={cubierta} costra={costra} relleno="#FFF6E0" />
        </G>
      </Svg>
    );
  }

  return (
    <Svg width={tamano} height={alto} viewBox="0 0 120 95">
      <Pan cubierta={cubierta} costra={costra} relleno={relleno} />
    </Svg>
  );
}
