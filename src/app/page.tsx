"use client";
import BasicFullInfo from "@/components/BasicFullInfo";
import HourlyWeather from "@/components/HoyrlyWeather";
import SearchCity from "@/components/SearchCity";

import WeeksWeather from "@/components/WeeksWeather";
import { backgroundsConst, backgroundsNightConst } from "@/constants/backgrounds";
import { useAppDispatch, useAppSelector } from "@/hooks/hooksForStores";
import { getHourlyForecast } from "@/services/weather";
import { setCoordinates } from "@/store/slices/weathersBasicInfo.slice";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi"

export default function Home() {
  const [isSearch, setisSearch] = useState<boolean>(false);
  const {weathercode, is_day} = useAppSelector(s=>s.fullInfoFurDay.weather)
  const dispatch = useAppDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        dispatch(setCoordinates({ lat: pos.coords.latitude, lon: pos.coords.longitude }));
        getHourlyForecast( pos.coords.latitude, pos.coords.longitude, "2025-08-17" ).then(res=>console.log(res)
        )
      },
      (err) => {
        console.error("Cannot get location", err);
      }
    );
  }, [dispatch])
  
  return (
    <div className={` pb-10 min-h-screen ${is_day ? backgroundsConst[weathercode] : backgroundsNightConst[weathercode]}`}>
      <div className="p-2 border-2 border-amber-50 rounded-full hover:bg-amber-50/20 cursor-pointer transition-colors duration-300 absolute right-5 top-5" onClick={()=>setisSearch(true)}><FiSearch size={16} color='white'/></div>
      {isSearch && <SearchCity close={setisSearch}/>}
      <div className="max-w-[1000px] min-w-[320px] mx-auto pt-25 px-10">
        <BasicFullInfo/>
        <HourlyWeather/>
      <WeeksWeather />
      </div>
      
    </div>
  );
}
