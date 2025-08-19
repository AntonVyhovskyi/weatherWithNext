import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

// Використовуємо замість useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Використовуємо замість useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;