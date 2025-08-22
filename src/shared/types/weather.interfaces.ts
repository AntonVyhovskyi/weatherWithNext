export interface IShortInfoAboutOneDay {
  date: string;
  min: number;
  max: number;
  weatherCode: number;
  wind: number;
  time: string;
  fullDate: string
}


export interface CityCoordinates {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface IFullBasicInfoWeatherForOneDay {
  temperature: number;
  wind: number;
  weathercode: number;
  time: string;
  date: string;
  precipitation: number; // мм
  relativehumidity: number; // %
  cloudcover: number; // %
  city: string,
  is_day: boolean
}

export interface IHourlyForecastItem {
  time: string;        
  temperature: number;
  weathercode: number; 
  is_day: boolean;
  wind: number;
}