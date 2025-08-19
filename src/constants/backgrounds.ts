export const backgroundsConst: { [key: number]: string } = {
  0: "bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-400", // ясне сонце
  1: "bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-300", // майже ясно
  2: "bg-gradient-to-r from-blue-200 via-sky-300 to-yellow-200", // частково хмарно
  3: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700", // хмарно

  45: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600", // туман
  48: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700", // туман/паморозь

  51: "bg-gradient-to-r from-sky-200 via-sky-300 to-blue-400", // легкий дощ
  53: "bg-gradient-to-r from-sky-300 via-blue-400 to-blue-500", // помірний дощ
  55: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800", // сильний дощ

  56: "bg-gradient-to-r from-cyan-200 via-blue-300 to-blue-500", // легкий крижаний дощ
  57: "bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-700", // сильний крижаний дощ

  61: "bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-700", // слабкий дощ
  63: "bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-800", // помірний
  65: "bg-gradient-to-r from-blue-700 via-indigo-800 to-gray-900", // сильний

  66: "bg-gradient-to-r from-cyan-400 via-cyan-600 to-blue-700", // слабкий град
  67: "bg-gradient-to-r from-gray-600 via-gray-800 to-black", // сильний град

  71: "bg-gradient-to-r from-white via-blue-100 to-cyan-200", // легкий сніг
  73: "bg-gradient-to-r from-cyan-100 via-cyan-200 to-blue-300", // помірний сніг
  75: "bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-600", // сильний сніг
  77: "bg-gradient-to-r from-white via-cyan-200 to-blue-400", // снігові зерна

  80: "bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-700", // слабкий зливовий дощ
  81: "bg-gradient-to-r from-blue-500 via-indigo-700 to-indigo-900", // помірний
  82: "bg-gradient-to-r from-indigo-700 via-indigo-800 to-black", // сильний

  85: "bg-gradient-to-r from-sky-200 via-sky-400 to-blue-500", // слабкий сніговий шквал
  86: "bg-gradient-to-r from-blue-300 via-blue-500 to-indigo-700", // сильний

  95: "bg-gradient-to-r from-orange-400 via-red-600 to-purple-800", // гроза
  96: "bg-gradient-to-r from-red-600 via-purple-700 to-black", // гроза з градом (слабка)
  99: "bg-gradient-to-r from-red-800 via-purple-900 to-black", // гроза з градом (сильна)
};

export const backgroundsNightConst: { [key: number]: string } = {
  0: "bg-gradient-to-r from-indigo-900 via-blue-950 to-black", // ясна ніч
  1: "bg-gradient-to-r from-indigo-800 via-blue-900 to-black", // майже ясно
  2: "bg-gradient-to-r from-indigo-700 via-blue-800 to-gray-900", // частково хмарно
  3: "bg-gradient-to-r from-gray-700 via-gray-800 to-black", // хмарно

  45: "bg-gradient-to-r from-gray-600 via-gray-700 to-black", // туман
  48: "bg-gradient-to-r from-gray-700 via-gray-800 to-black", // туман/паморозь

  51: "bg-gradient-to-r from-blue-700 via-indigo-800 to-black", // легкий дощ
  53: "bg-gradient-to-r from-blue-800 via-indigo-900 to-black", // помірний дощ
  55: "bg-gradient-to-r from-indigo-900 via-blue-950 to-black", // сильний дощ

  56: "bg-gradient-to-r from-cyan-700 via-blue-800 to-indigo-900", // легкий крижаний дощ
  57: "bg-gradient-to-r from-cyan-800 via-indigo-900 to-black", // сильний крижаний дощ

  61: "bg-gradient-to-r from-blue-700 via-indigo-800 to-black", // слабкий дощ
  63: "bg-gradient-to-r from-blue-800 via-indigo-900 to-black", // помірний
  65: "bg-gradient-to-r from-indigo-900 via-black to-black", // сильний

  66: "bg-gradient-to-r from-cyan-700 via-indigo-800 to-black", // слабкий град
  67: "bg-gradient-to-r from-gray-800 via-gray-900 to-black", // сильний град

  71: "bg-gradient-to-r from-gray-200 via-blue-300 to-indigo-700", // легкий сніг
  73: "bg-gradient-to-r from-cyan-200 via-blue-400 to-indigo-800", // помірний сніг
  75: "bg-gradient-to-r from-blue-400 via-indigo-700 to-black", // сильний сніг
  77: "bg-gradient-to-r from-gray-300 via-cyan-300 to-blue-500", // снігові зерна

  80: "bg-gradient-to-r from-blue-600 via-indigo-800 to-black", // слабкий зливовий дощ
  81: "bg-gradient-to-r from-indigo-700 via-indigo-900 to-black", // помірний
  82: "bg-gradient-to-r from-indigo-900 via-black to-black", // сильний

  85: "bg-gradient-to-r from-blue-400 via-indigo-700 to-black", // слабкий сніговий шквал
  86: "bg-gradient-to-r from-blue-500 via-indigo-800 to-black", // сильний

  95: "bg-gradient-to-r from-purple-800 via-indigo-900 to-black", // гроза
  96: "bg-gradient-to-r from-red-800 via-purple-900 to-black", // гроза з градом (слабка)
  99: "bg-gradient-to-r from-red-900 via-black to-black", // гроза з градом (сильна)
};