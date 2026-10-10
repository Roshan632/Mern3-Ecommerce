import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { Status } from "../globals/types/type";
import type { AppDispatch } from "./store";
import  { API, APIWITHTOKEN } from "../http";


interface ICategory{
    id : string, 
    categoryName : string
}
interface ICategoryInitialState{
    items : ICategory[], 
    status : Status
}

const initialState:ICategoryInitialState = {
    items : [], 
    status : Status.LOADING
}
const categorySlice = createSlice({
    name : "categories", 
    initialState, 
    reducers : {
        setItems(state:ICategoryInitialState,action:PayloadAction<ICategory[]>){
            state.items = action.payload
        }, 
         addCategoryToItems(state:ICategoryInitialState,action:PayloadAction<ICategory>){
            state.items.push(action.payload)
        },
        setStatus(state:ICategoryInitialState,action:PayloadAction<Status>){
            state.status = action.payload
        }, 
        setDeleteCategoryItem(state:ICategoryInitialState,action:PayloadAction<string>){
            const index = state.items.findIndex(item=>item.id == action.payload)
            if(index !== -1){
            state.items.splice(index,1)
            }
            }, 
        resetStatus(state:ICategoryInitialState){
            state.status = Status.LOADING ; 
        }
    }
})
export const {setItems,setStatus,setDeleteCategoryItem,addCategoryToItems,resetStatus} = categorySlice.actions
export default categorySlice.reducer

export function addCategory(categoryName:string){
    return async function addCategoryThunk(dispatch:AppDispatch): Promise<boolean>{
        try {
            const response = await APIWITHTOKEN.post("/category",{categoryName})
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(addCategoryToItems(response.data.data))
                toast.success(response.data?.message ?? "Category added successfully")
                return true
            }else{
                dispatch(setStatus(Status.ERROR))
                toast.error(response.data?.message ?? "Failed to add category")
                return false
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            toast.error("Failed to add category")
            return false
        }
    }
}

export function fetchCategoryItems(){
    return async function fetchCategoryItemsThunk(dispatch:AppDispatch){
        try {
            const response = await API.get("/category")
            if(response.status === 200){
                dispatch(setItems(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}



export function handleCategoryItemDelete(categoryId:string){
    return async function handleCategoryItemDeleteThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.delete("/category/" + categoryId)
            if(response.status >= 200 && response.status < 300){
                dispatch(setDeleteCategoryItem(categoryId))
                dispatch(setStatus(Status.SUCCESS))
                toast.success(response.data?.message || "Category deleted successfully")
            }else{
                dispatch(setStatus(Status.ERROR))
                toast.error(response.data?.message || "Failed to delete category")
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            const message = axios.isAxiosError(error) ? error.response?.data?.message : undefined
            toast.error(message || "Failed to delete category")
        }
    }
}