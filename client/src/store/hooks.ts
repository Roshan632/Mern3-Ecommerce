import {  useDispatch, useSelector } from "react-redux";
import type { AppDispatch,RootState } from "./store";
import type {TypedUseSelectorHook} from 'react-redux'



export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// useAppDispatch = useDispatch + type
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
// useAppSelector = useSelector + type