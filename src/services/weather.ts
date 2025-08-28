import { CityCoordinates, IFullBasicInfoWeatherForOneDay, IHourlyForecastItem, IShortInfoAboutOneDay } from "@/shared/types/weather.interfaces";
import axios from "axios";

export async function get7DayForecast(lat: number, lon: number): Promise<IShortInfoAboutOneDay[]> {
    const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude: lat,
            longitude: lon,
            daily: "temperature_2m_min,temperature_2m_max,weathercode,windspeed_10m_max",
            timezone: "auto",
        },
    });
    const daily = res.data.daily;

    return daily.time.map((t: string, i: number) => {
        const dateObj = new Date(t);

        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");

        return {
            date: dateObj.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
            }),

            min: Math.round(daily.temperature_2m_min[i]),
            max: Math.round(daily.temperature_2m_max[i]),
            weatherCode: daily.weathercode[i],
            wind: Math.round(daily.windspeed_10m_max[i]),
            time: `${hours}:${minutes}`,            // HH:MM
            fullDate: t.slice(0, 10),
        }
    });
};




export async function searchCities(query: string): Promise<CityCoordinates[]> {
    const res = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
        params: { name: query, count: 5, language: "en" }, // максимум 5 варіантів
    });

    if (!res.data.results || res.data.results.length === 0) {
        return [];
    }

    return res.data.results.map((city: {name: string, country: string, latitude:number, longitude: number}) => ({
        name: city.name,
        country: city.country ? city.country : '',
        lat: city.latitude,
        lon: city.longitude,
    }));
}

interface IWeatherOptions {
    lat: number;
    lon: number;
    date?: string; // YYYY-MM-DD, 
    hour?: string; // HH:MM, 
}

export async function getCurrentWeatherFull({
    lat,
    lon,
    date,
    hour,
}: IWeatherOptions): Promise<IFullBasicInfoWeatherForOneDay> {
    // 1️⃣ Якщо hour заданий, беремо погодинний прогноз
    const useHourly = !!hour;

    // Якщо погодинний прогноз, обов'язково потрібна дата
    if (useHourly && !date) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        date = `${year}-${month}-${day}`;
    }

    const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude: lat,
            longitude: lon,
            current_weather: !useHourly, // true якщо поточна погода
            hourly: useHourly
                ? "temperature_2m,weathercode,relativehumidity_2m,precipitation,cloudcover,windspeed_10m,is_day"
                : "relativehumidity_2m,precipitation,cloudcover",
            start_date: useHourly ? date : undefined,
            end_date: useHourly ? date : undefined,
            timezone: "auto",
        },
    });

    // 2️⃣ Реверсна геокодировка через Nominatim
     let cityName = "Your City)";
    try {
        const cityRes = await axios.get(`/api/reverse?lat=${lat}&lon=${lon}`);
        cityName =
            cityRes.data?.address?.city ||
            cityRes.data?.address?.town ||
            cityRes.data?.address?.village ||
            "Unknown";
    } catch {
        // Якщо reverse API падає — просто залишаємо cityName = "Unknown"
    }

    if (useHourly) {
        const targetTime = `${date}T${hour}`;
        const idx = res.data.hourly.time.findIndex((t: string) => {
            if (!targetTime) return false;
            // обрізаємо до хвилин
            return t.slice(0, 16) === targetTime; // YYYY-MM-DDTHH:MM
        });
        debugger
        if (idx === -1) throw new Error("Time not found in hourly forecast");

        return {
            temperature: res.data.hourly.temperature_2m[idx],
            wind: res.data.hourly.windspeed_10m[idx],
            weathercode: res.data.hourly.weathercode[idx],
            time: `${hour}`,
            date: `${date}`,
            precipitation: res.data.hourly.precipitation[idx],
            relativehumidity: res.data.hourly.relativehumidity_2m[idx],
            cloudcover: res.data.hourly.cloudcover[idx],
            city: cityName,
            is_day: res.data.hourly.is_day[idx] === 1,
        };
    } else {
        const current = res.data.current_weather


        const splitedTime = res.data.current_weather.time.split('T');
        const nowDate = splitedTime[0]
        const nowTime = splitedTime[1]
        const idx = res.data.hourly.time.findIndex((t: string) => t[11] === current.time[11] && t[12] === current.time[12]);
        return {
            temperature: current.temperature,
            wind: current.windspeed,
            weathercode: current.weathercode,
            time: nowTime,
            date: nowDate,
            precipitation: res.data.hourly.precipitation[idx],
            relativehumidity: res.data.hourly.relativehumidity_2m[idx],
            cloudcover: res.data.hourly.cloudcover[idx],
            city: cityName,
            is_day: current.is_day === 1,
        };
    }
}

export async function getHourlyForecast(
    lat: number,
    lon: number,
    date: string // "YYYY-MM-DD"
): Promise<IHourlyForecastItem[]> {
    const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude: lat,
            longitude: lon,
            hourly: "temperature_2m,weathercode,is_day,windspeed_10m",
            start_date: date,
            end_date: date,
            timezone: "auto",
        },
    });

    const hourly = res.data.hourly;

    return hourly.time.map((t: string, idx: number) => ({
        time: t,
        temperature: hourly.temperature_2m[idx],
        weathercode: hourly.weathercode[idx],
        is_day: hourly.is_day[idx],
        wind: hourly.windspeed_10m[idx]
    }));
}