import { useAppDispatch } from "@/hooks/hooksForStores";
import { searchCities } from "@/services/weather";
import { CityCoordinates } from "@/shared/types/weather.interfaces";
import { setCoordinates } from "@/store/slices/weathersBasicInfo.slice";

import { FunctionComponent, useEffect, useState } from "react";

interface SearchCityProps {
    close: (v: boolean) => void
}

const SearchCity: FunctionComponent<SearchCityProps> = ({ close }) => {
    const [input, setinput] = useState<string>('');
    const [inputFocus, setinputFocus] = useState<boolean>(false);
    const [cities, setcities] = useState<CityCoordinates[]>([]);
    const dispatch = useAppDispatch()

    const changeCityHundler = (lat: number, lon: number) => {
        dispatch(setCoordinates({ lat, lon }))
        close(false)
        console.log(lat, lon);
        

    }
    useEffect(() => {
        searchCities(input).then((res) => {
            setcities(res)

        })
    }, [input])
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="absolute w-full h-full backdrop-blur-xs" onClick={() => close(false)}></div>


            <div className="relative border-1 rounded-2xl p-5 border-amber-50 bg-black/30 z-10 text-white flex flex-col gap-3">
                <h2>Search city</h2>
                <input className="border-b-1 border-white outline-none" type="text" onChange={(e) => { setinput(e.target.value) }}
                    onFocus={() => setinputFocus(true)}
                    onBlur={() => setinputFocus(false)}
                />

                {inputFocus && input &&
                    <ul className=" flex flex-col gap-3">
                        {cities.map(el => (
                            <li className="p-1 rounded-lg hover:bg-white/10 cursor-pointer" key={`${el.lat}:${el.lon}`} onMouseDown={() => {
                                changeCityHundler(el.lat, el.lon)
                            }}>{el.name}, {el.country}</li>
                        ))}
                    </ul>
                }</div>

        </div>
    );
}

export default SearchCity;