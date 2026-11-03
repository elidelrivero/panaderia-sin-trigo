import { useWindowDimensions } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { colores } from '../theme';

const COLORES = [colores.morado, colores.cempasuchil, '#E4007C', colores.verde];

// Una banderita de papel picado con orilla en zigzag y figuras recortadas.
function Bandera({ x, color, fondo }) {
  const w = 44;
  const h = 46;
  let zigzag = `M${x},6 L${x + w},6 L${x + w},${h}`;
  for (let i = 0; i < 6; i += 1) {
    const px = x + w - (i * w) / 6;
    zigzag += ` L${px - w / 12},${h - 5} L${px - w / 6},${h}`;
  }
  zigzag += ' Z';

  return (
    <G>
      <Path d={zigzag} fill={color} />
      {/* recortes: flor central, rombos y puntitos */}
      <Circle cx={x + w / 2} cy={24} r={6} fill={fondo} />
      <Circle cx={x + w / 2} cy={24} r={2.4} fill={color} />
      <Path d={`M${x + 9},16 l4,-4 l4,4 l-4,4 Z`} fill={fondo} />
      <Path d={`M${x + w - 17},16 l4,-4 l4,4 l-4,4 Z`} fill={fondo} />
      <Path d={`M${x + 9},34 l4,-4 l4,4 l-4,4 Z`} fill={fondo} />
      <Path d={`M${x + w - 17},34 l4,-4 l4,4 l-4,4 Z`} fill={fondo} />
      <Rect x={x + w / 2 - 1.5} y={10} width={3} height={4} fill={fondo} />
      <Rect x={x + w / 2 - 1.5} y={34} width={3} height={4} fill={fondo} />
    </G>
  );
}

export default function PapelPicado({ fondo = colores.azucar }) {
  const { width } = useWindowDimensions();
  const paso = 52;
  const cantidad = Math.ceil(width / paso) + 1;

  return (
    <Svg width={width} height={52}>
      <Line x1="0" y1="6" x2={width} y2="6" stroke={colores.cacao} strokeWidth="1.5" />
      {Array.from({ length: cantidad }).map((_, i) => (
        <Bandera key={i} x={i * paso + 4} color={COLORES[i % COLORES.length]} fondo={fondo} />
      ))}
    </Svg>
  );
}
