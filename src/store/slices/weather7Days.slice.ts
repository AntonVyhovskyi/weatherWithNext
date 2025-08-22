import { get7DayForecast } from "@/services/weather";
import { IShortInfoAboutOneDay } from "@/shared/types/weather.interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
    loading: boolean;
    error: string | null;
    weather: IShortInfoAboutOneDay[];
}

const initialState: WeatherState = {
    loading: false,
    error: null,
    weather: [],
};

export const fetchWeeksWeatherThunk = createAsyncThunk(
    "weather/fetchForecast",
    async ({ lat, lon }: { lat: number; lon: number;}) => {
        
        return await get7DayForecast(lat, lon);
    }
)

const weather7DaysSlice = createSlice({
    name: "weather7Days",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeeksWeatherThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeeksWeatherThunk.fulfilled, (state, action: PayloadAction<IShortInfoAboutOneDay[]>) => {
                state.loading = false;
                state.weather = action.payload;
            })
            .addCase(fetchWeeksWeatherThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch forecast";
            });
    },
})




export default weather7DaysSlice.reducer;