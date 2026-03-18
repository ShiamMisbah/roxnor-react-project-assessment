import { configureStore } from "@reduxjs/toolkit";
import { productApiSlice } from "./product/productApiSlice";
import productsReducer from "./product/productSlice"

export const store = configureStore({
    reducer: {
        singleProduct: productsReducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(productApiSlice.middleware)
    } 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch