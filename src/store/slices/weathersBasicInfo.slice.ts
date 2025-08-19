import { getCurrentWeatherFull } from "@/services/weather";
import { IFullBasicInfoWeatherForOneDay } from "@/shared/types/weather.interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { error } from "node:console";

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
    async ({ lat, lon }: { lat: number; lon: number }) => {
        
        const today = await getCurrentWeatherFull({lat, lon});

        return { today };
    }
);

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCoordinates(state, action: PayloadAction<{ lat: number; lon: number }>) {
            state.coordinates = action.payload;
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


export const { setCoordinates } = weatherSlice.actions;
export default weatherSlice.reducer;