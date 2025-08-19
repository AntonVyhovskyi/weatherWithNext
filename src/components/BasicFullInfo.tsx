import { useAppDispatch, useAppSelector } from "@/hooks/hooksForStores";
import { fetchFullInfoWeatherForOneDayThunk } from "@/store/slices/weathersBasicInfo.slice";
import { FunctionComponent, useEffect, useRef } from "react";
import WeatherIcon from "./WeatherIcon";
import "react-loading-skeleton/dist/skeleton.css";

import { BiSolidMapPin } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import { WiStrongWind} from "react-icons/wi";

interface BasicFullInfoProps {

}

const BasicFullInfo: FunctionComponent<BasicFullInfoProps> = () => {

    const {
        loading,
        error,
        coordinates: {
            lat,
            lon
        },
        weather: {
            temperature,
            wind,
            weathercode,
            time,
            date,
            precipitation,
            relativehumidity,
            cloudcover,
            city,
            is_day
        }
    } = useAppSelector(s => s.fullInfoFurDay)

    const fullinfo = useAppSelector(s => s.fullInfoFurDay)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (lat && lon) {
            dispatch(fetchFullInfoWeatherForOneDayThunk({ lat, lon }));
        }
    }, [lat, lon]);

    useEffect(() => {
        console.log(fullinfo);
    }, [fullinfo])
    if (loading) {
        return (
            <div className="text-white flex flex-col gap-3 items-center">
                <Skeleton width={200} height={30} />
                <Skeleton width={120} height={20} />
                <Skeleton circle width={150} height={150}
                    baseColor="transparent"   
                    highlightColor="transparent"
                    className="border-4 border-white rounded-md" />
                <Skeleton width={100} height={40} />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-400">⚠️ {error}</div>;
    }

    return (
        <div className="text-white flex flex-col gap-3 items-center">
            <h2 className="flex items-center gap-2 text-2xl font-bold"><BiSolidMapPin size={25} color="white" />{city}</h2>
            <div className="font-bold">{`${date[8]}${date[9]}.${date[5]}${date[6]}.${date[0]}${date[1]}${date[2]}${date[3]}`}</div>

            <div className="h-[150px] flex justify-center items-center">
                <WeatherIcon code={weathercode} is_day={is_day} size={200} />
            </div>
            <div className="text-4xl font-extrabold">
                {temperature}°
            </div>
            <div className="flex gap-2 items-center text-2xl">
                <WiStrongWind size={50}/> {wind} km/h
            </div>




        </div>
    );
}

export default BasicFullInfo;