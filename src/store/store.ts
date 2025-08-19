import { configureStore } from "@reduxjs/toolkit";
import weatherForWeekReducer from "@/store/slices/weather7Days.slice";
import weathersBasicInfo from "@/store/slices/weathersBasicInfo.slice"
import hourlyWeather from "@/store/slices/weatherHourlySlice"

export const store = configureStore({
  reducer: {
    weatherForWeek: weatherForWeekReducer,
    fullInfoFurDay: weathersBasicInfo,
    hourlyWeather
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;