import { WiDaySunny, WiNightClear, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

interface WeatherIconProps {
  code: number;
  is_day: boolean;
  size?: number;
  color?: string;
}

export default function WeatherIcon({ code, is_day, size = 48, color = '#ffffff' }: WeatherIconProps) {
  switch (code) {
    case 0:
      return is_day ? <WiDaySunny size={size} color={color}/> : <WiNightClear size={size} color={color}/>;
    case 1:
    case 2:
    case 3:
      return <WiCloud size={size} color={color}/>;
    case 45:
    case 48:
      return <WiCloud size={size} color={color}/>; // туман
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
      return <WiRain size={size} color={color}/>; // дощ
    case 66:
    case 67:
      return <WiRain size={size} color={color}/>; // град
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return <WiSnow size={size} color={color}/>; // сніг
    case 95:
    case 96:
    case 99:
      return <WiThunderstorm size={size} color={color}/>; // гроза
    default:
      return is_day ? <WiDaySunny size={size} color={color}/> : <WiNightClear size={size} color={color}/>;
  }
}