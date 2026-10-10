import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Status } from "../globals/types/type";
import type { AppDispatch,RootState } from "./store";
import { APIWITHTOKEN } from "../http";
import type { IProduct } from "../pages/admin/products/components/ProductModal";

export interface IProductAdmin{
    id : string, 
    productName : string, 
    productPrice : number, 
    productTotalStock : number, 
    productDescription : string, 
    productImageUrl : string, 
    createAt : string, 
    categoryId : string
    discount : number, 

    Category : {
        categoryName : string
    }
}

interface IInitialState{
    products : IProductAdmin[], 
     status : Status, 
    product : null | IProductAdmin
}
const initialState:IInitialState = {
    products : [], 
    status : Status.LOADING, 
    product : null
}

const productSlice = createSlice({
    name : "adminProducts", 
    initialState, 
    reducers : {
        setStatus(state:IInitialState,action:PayloadAction<Status>){
            state.status = action.payload
        }, 
        setProducts(state:IInitialState,action:PayloadAction<IProductAdmin[]>){
            state.products = action.payload
        }, 
        addProductToProducts(state:IInitialState,action:PayloadAction<IProductAdmin>){
            state.products.push(action.payload)
        },
            setDeleteProduct(state:IInitialState, action:PayloadAction<string>){
                const index = state.products.findIndex(p=>p.id == action.payload)
                if(index !== -1) state.products.splice(index,1)
            },
            updateProductItem(state:IInitialState, action:PayloadAction<IProductAdmin>){
                const index = state.products.findIndex(p=>p.id == action.payload.id)
                if(index !== -1) state.products[index] = action.payload
            },
        setProduct(state:IInitialState,action:PayloadAction<IProductAdmin | null>){
            state.product = action.payload
        },  
    }
})

export const {setStatus,setProducts,addProductToProducts,setDeleteProduct,updateProductItem,setProduct} = productSlice.actions
export default productSlice.reducer 

export function fetchProducts(){
    return async function fetchProductsThunk(dispatch:AppDispatch){
      try {
        const response = await APIWITHTOKEN.get("/product")
        if(response.status === 200){
        
            dispatch(setProducts(response.data.data))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
      } catch (error) {
        dispatch(setStatus(Status.ERROR))
      }
       }
}
export function addProduct(data :IProduct){
    return async function addProduct(dispatch:AppDispatch){
      try {
                const formData = new FormData()
                formData.append("productName", data.productName)
                formData.append("productPrice", String(data.productPrice))
                formData.append("productTotalStock", String(data.productTotalStock))
                formData.append("productDescription", data.productDescription)
                formData.append("categoryId", data.categoryId)
                formData.append("discount", String(data.discount ?? 0))
                if(data.productImage) formData.append("productImage", data.productImage)

                const response = await APIWITHTOKEN.post("/product",formData,{
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        })
        if(response.status === 200){
            dispatch(setStatus(Status.SUCCESS))
            dispatch(addProductToProducts(response.data.data))
        }else{
            dispatch(setStatus(Status.ERROR))
        }
      } catch (error) {
        dispatch(setStatus(Status.ERROR))
      }
    }
}
export function fetchProductAdmin(id:string){
    return async function fetchProductAdminThunk(dispatch:AppDispatch,getState:()=>RootState){
        dispatch(setStatus(Status.LOADING))

        const store = getState()
        const productExists = store.adminProducts.products.find((product:IProductAdmin)=>product.id == id) 
     
        if(productExists){
            dispatch(setProduct(productExists))
            dispatch(setStatus(Status.SUCCESS))
        }else{
            try {
                const response = await APIWITHTOKEN.get("/product/" + id)
                if(response.status === 200){
                    const productData = Array.isArray(response.data?.data)
                        ? response.data.data[0] ?? null
                        : response.data?.data ?? response.data?.product ?? null

                    dispatch(setStatus(Status.SUCCESS))
                    dispatch(setProduct(productData))
                }else{
                    dispatch(setStatus(Status.ERROR))
                }
            } catch (error) {
                console.log(error)
                dispatch(setStatus(Status.ERROR))
            }
        }
    }
}
export function handleDeleteProduct(id:string){
    return async function handleDeleteProductThunk(dispatch:AppDispatch){
        try {
            const response = await APIWITHTOKEN.delete("/product/" + id)
            if(response.status >=200 && response.status < 300){
                dispatch(setDeleteProduct(id))
                dispatch(setStatus(Status.SUCCESS))
                toast.success(response.data?.message ?? "Deleted successfully")
            }else{
                dispatch(setStatus(Status.ERROR))
                toast.error(response.data?.message ?? "Failed to delete product")
            }
        } catch (error:any) {
            dispatch(setStatus(Status.ERROR))
            toast.error(error?.response?.data?.message ?? "Failed to delete product")
        }
    }
}

export function updateProduct(id:string,data:Partial<IProduct>){
    return async function updateProductThunk(dispatch:AppDispatch,getState:()=>RootState){
        try {
            const response = await APIWITHTOKEN.patch("/product/" + id, data)
            if(response.status >=200 && response.status < 300){
                // backend may or may not return updated entity. handle both cases.
                const updated = response.data?.data ?? response.data ?? null
                if(updated){
                    dispatch(updateProductItem(updated))
                }else{
                    // optimistic merge with existing item in store
                    const store = getState()
                    const existing = store.adminProducts.products.find(p=>p.id == id)
                    if(existing){
                        const merged = {...existing, ...data} as IProductAdmin
                        dispatch(updateProductItem(merged))
                    }
                }
                dispatch(setStatus(Status.SUCCESS))
                toast.success(response.data?.message ?? "Product updated successfully")
            }else{
                dispatch(setStatus(Status.ERROR))
                toast.error(response.data?.message ?? "Failed to update product")
            }
        } catch (error:any) {
            dispatch(setStatus(Status.ERROR))
            toast.error(error?.response?.data?.message ?? "Failed to update product")
        }
    }
}