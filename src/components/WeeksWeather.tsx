import { useAppDispatch, useAppSelector } from "@/hooks/hooksForStores";
import { fetchWeeksWeatherThunk } from "@/store/slices/weather7Days.slice";
import { FunctionComponent, useEffect } from "react";

interface WeeksWeatherProps {

}

const WeeksWeather: FunctionComponent<WeeksWeatherProps> = () => {
    const dispatch = useAppDispatch();
    const { weather, loading, error } = useAppSelector((state) => state.weatherForWeek);
    useEffect(()=>{
        dispatch(fetchWeeksWeatherThunk({ lat: 50.45, lon: 30.52 }))
    },[])
    return (
        <div>
            {weather.map((el)=>(
                <div key={el.date}>{el.date}</div>
            ))}
        </div>
    );
}

export default WeeksWeather;
