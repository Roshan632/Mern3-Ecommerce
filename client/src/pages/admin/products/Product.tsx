import { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import ProductTable from "./components/ProductTable";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProducts } from "../../../store/adminProductSlice";
import { fetchCategoryItems } from "../../../store/adminCategorySlice";


function AdminProduct(){
   const dispatch = useAppDispatch()
   const {products} = useAppSelector((store)=>store.adminProducts)
   const {items: categories} = useAppSelector((store)=>store.categories)
    useEffect(()=>{
        dispatch(fetchProducts())
        dispatch(fetchCategoryItems())
    },[dispatch])
    return(

        <AdminLayout>
            <ProductTable products={products} categories={categories} />
        </AdminLayout>
    )
}

export default AdminProduct