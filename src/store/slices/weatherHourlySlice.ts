import { getHourlyForecast } from "@/services/weather";
import { IHourlyForecastItem } from "@/shared/types/weather.interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IHourlyWeatherState {
    loading: boolean;
    error: string | null;
    items: IHourlyForecastItem[];
}

const initialState: IHourlyWeatherState = {
    loading: false,
    error: null,
    items: [],
};
export const fetchHourlyWeatherThunk = createAsyncThunk<
    IHourlyForecastItem[], // що повертає
    { lat: number; lon: number; date: string } // аргументи
>(
    "weatherHourly/fetchWeatherHoutly",
    async ({ lat, lon, date }) => {

        const result = await getHourlyForecast(lat, lon, date);

        return  result ;
    }
);
const slice = createSlice({
    name: "weatherHourly",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHourlyWeatherThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHourlyWeatherThunk.fulfilled, (state, action) => {
                state.loading = false;

                state.items = action.payload;
            })
            .addCase(fetchHourlyWeatherThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch weather";
            });
    }
})

export default slice.reducer