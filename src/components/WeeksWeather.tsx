import { useAppDispatch, useAppSelector } from "@/hooks/hooksForStores";
import { fetchWeeksWeatherThunk } from "@/store/slices/weather7Days.slice";
import { FunctionComponent, useEffect } from "react";
import WeatherIcon from "./WeatherIcon";
import { fetchFullInfoWeatherForOneDayThunk } from "@/store/slices/weathersBasicInfo.slice";



const WeeksWeather: FunctionComponent = () => {
    const {lat, lon} = useAppSelector(s=>s.fullInfoFurDay.coordinates)
    const dispatch = useAppDispatch();
    const { weather } = useAppSelector((state) => state.weatherForWeek);
    useEffect(()=>{
        dispatch(fetchWeeksWeatherThunk({ lat, lon}))
    },[lat, lon, dispatch]) 
    const changeDayHandler = ({ lt, ln, date, hour }: { lt: number; ln: number; date: string; hour: string }) => {
        dispatch(fetchFullInfoWeatherForOneDayThunk({lat: lt, lon: ln, date, hour}))
    }
    return (
        <div className="w-full flex flex-col gap-5 pt-12">
            {weather.map((el)=>(
                <div onClick={()=>{changeDayHandler({lt: lat, ln: lon, date: el.fullDate, hour: '14:00'})}} 
                className="w-full p-3 rounded-xl border-2 border-amber-50 text-amber-50 flex items-center justify-between bg-black/5 hover:bg-black/30 transition-colors duration-300 cursor-pointer"
                 key={el.date} >
                    <div>{el.date}</div>
                    <div>{el.min}/{el.max}</div>
                    <WeatherIcon  size={30} is_day={true} code={el.weatherCode}/>
                    <div>{el.wind}</div>
                    </div>
            ))}
        </div>
    );
}

export default WeeksWeather;
