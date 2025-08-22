import { useAppDispatch, useAppSelector } from "@/hooks/hooksForStores";
import { fetchHourlyWeatherThunk } from "@/store/slices/weatherHourlySlice";
import { FunctionComponent, useEffect, useRef } from "react";
import WeatherIcon from "./WeatherIcon";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { current } from "@reduxjs/toolkit";
import { fetchFullInfoWeatherForOneDayThunk, setTimeFurBasicInfo } from "@/store/slices/weathersBasicInfo.slice";

interface HourlyWeatherProps {

}

const HourlyWeather: FunctionComponent<HourlyWeatherProps> = () => {
    const { items, loading, error } = useAppSelector(s => s.hourlyWeather)
    const { coordinates: { lon, lat }, weather: { date, time } } = useAppSelector(s => s.fullInfoFurDay)
    const dispatch = useAppDispatch()
    const containerRef = useRef<HTMLDivElement>(null)
    const currentHourRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (lon && lat && date) {
            dispatch(fetchHourlyWeatherThunk({ lat, lon, date }))
        }
    }, [lon, lat, date])

    useEffect(() => {
        if (currentHourRef.current) {
            currentHourRef.current.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            })
        }
    }, [items])

    const getHours = (thisTime: string) => {
        const result = new Date(thisTime).getHours()
        return result
    }

    if (loading) {
        return (
            <div className="w-full flex gap-3 overflow-x-auto pb-4 scrollbar-hide scroll-smooth pt-5"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    maskImage: 'linear-gradient(to right, transparent, black 30px, black calc(100% - 30px), transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 30px, black calc(100% - 30px), transparent)',
                }}>
                {Array.from({ length: 24 }).map((_, idx) => (
                    <div key={idx} className="p-2 border-2 border-amber-50 rounded-md flex flex-col items-center text-amber-50 font-bold">
                        <Skeleton width={30} height={20} />
                        <Skeleton circle width={30} height={30} />
                        <Skeleton width={30} height={20} />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center w-full">Error: {error}</div>;
    }
    return (
        <div className="w-full overflow-hidden pt-5" ref={containerRef} >
            <div className="flex gap-3 overflow-x-auto overflow-y-hidden pb-4 hourly-scroll"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, black 30px, black calc(100% - 30px), transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 30px, black calc(100% - 30px), transparent)",
                }}>
                {items.map(el => {
                    const isCurrentHour = getHours(el.time) === getHours(`${date}T${time}`);
                    
                    return (
                        <div
                            ref={isCurrentHour ? currentHourRef : null}
                            key={el.time}
                            className={`p-2 border-2 border-amber-50 rounded-md flex flex-col items-center text-amber-50 font-bold 
              ${isCurrentHour ? 'bg-white/20' : 'bg-white/5'}  hover:bg-white/20 transition-colors duration-300 cursor-pointer`}
                            onClick={() => dispatch(setTimeFurBasicInfo({ time: el.time.slice(11, 16), weathercode: el.weathercode, is_day: el.is_day, wind: el.wind, temperature: el.temperature }))}
                        >
                            <div>{getHours(el.time)}</div>
                            <WeatherIcon size={30} code={el.weathercode} is_day={el.is_day} />
                            <div>{el.temperature}°</div>
                        </div>
                    )
                })}
            </div>

        </div >
    );
}

export default HourlyWeather;