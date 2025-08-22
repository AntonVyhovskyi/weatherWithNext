import { getCurrentWeatherFull } from "@/services/weather";
import { IFullBasicInfoWeatherForOneDay } from "@/shared/types/weather.interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IFullInfo {
    loading: boolean;
    error: string | null;
    coordinates: {
        lat: number,
        lon: number
    }
    weather: IFullBasicInfoWeatherForOneDay;
}



const initialState: IFullInfo = {
    loading: true,
    error: null,
    coordinates: { lat: 0, lon: 0 },
    weather: {
        temperature: 0,
        wind: 0,
        weathercode: 0,
        time: '',
        date: '',
        precipitation: 0,
        relativehumidity: 0,
        cloudcover: 0,
        city: '',
        is_day: true
    }
}


export const fetchFullInfoWeatherForOneDayThunk = createAsyncThunk(
    "weather/fetchWeather",
    async ({ lat, lon, date, hour }: { lat: number; lon: number; date?: string; hour?: string }) => {
        let today
        if (hour && date) {
            debugger
             today = await getCurrentWeatherFull({ lat, lon, date, hour});
             
        } else {
            today = await getCurrentWeatherFull({ lat, lon});
        }


        return { today };
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCoordinates(state, action: PayloadAction<{ lat: number; lon: number }>) {
            state.coordinates = action.payload;
        },
        setTimeFurBasicInfo(state, action: PayloadAction<{ time: string; wind: number, weathercode: number, is_day: boolean, temperature: number }>) {
            const {time, wind, weathercode, is_day, temperature} = action.payload
            state.weather = {...state.weather, time, wind, weathercode, is_day, temperature}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFullInfoWeatherForOneDayThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFullInfoWeatherForOneDayThunk.fulfilled, (state, action) => {
                state.loading = false;

                state.weather = action.payload.today;
            })
            .addCase(fetchFullInfoWeatherForOneDayThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch weather";
            });
    },
});


export const { setCoordinates, setTimeFurBasicInfo } = weatherSlice.actions;
export default weatherSlice.reducer;