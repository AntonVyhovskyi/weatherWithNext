import { FaTshirt, FaUmbrella, FaSnowflake, FaWind } from "react-icons/fa";
import { GiWinterGloves } from "react-icons/gi";

interface Props {
  temperature: number;
  weatherCode: number;
  wind: number;
}

const WeatherClothesAdvisor: React.FC<Props> = ({ temperature, weatherCode, wind }) => {
  const blocks = [];

  // Temperature
  if (temperature > 25) {
    blocks.push({
      icon: <FaTshirt className="text-yellow-400 w-5 h-5" />,
      title: "Clothes",
      desc: "T-shirt, shorts, light shoes",
    });
  } else if (temperature > 15) {
    blocks.push({
      icon: <FaTshirt className="text-green-400 w-5 h-5" />,
      title: "Clothes",
      desc: "T-shirt, light pants or jeans",
    });
  } else if (temperature > 5) {
    blocks.push({
      icon: <GiWinterGloves className="text-blue-400 w-5 h-5" />,
      title: "Clothes",
      desc: "Light jacket, pants, sneakers",
    });
  } else {
    blocks.push({
      icon: <FaSnowflake className="text-blue-500 w-5 h-5" />,
      title: "Clothes",
      desc: "Warm coat, hat, gloves, winter boots",
    });
  }

  // Rain check
  if ([51, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
    blocks.push({
      icon: <FaUmbrella className="text-indigo-400 w-5 h-5" />,
      title: "Rain",
      desc: "Take an umbrella",
    });
  }

  // Wind check
  if (wind > 25) {
    blocks.push({
      icon: <FaWind className="text-sky-400 w-5 h-5" />,
      title: "Wind",
      desc: "Wear windproof clothes",
    });
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {blocks.map((b, i) => (
        <div key={i} className="p-3 rounded-xl bg-white/10 text-white w-40">
          <div className="flex items-center gap-2 font-semibold">{b.icon} {b.title}</div>
          <p className="text-sm mt-1">{b.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherClothesAdvisor;