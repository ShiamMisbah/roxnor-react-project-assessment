import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";

const initialState: Product = {
    id: 0,
    title: '',
    category: '',
    price: 0,
    rating: 0,
    stock: 0,
    description: '',
    images: []
}

const productSlice = createSlice({
    name: "singleProduct",
    initialState,
    reducers: {
        currentProduct: (state, action: PayloadAction<Product>) => {
            state.id = action.payload.id
            state.title = action.payload.title
            state.category = action.payload.category;
            state.price = action.payload.price;
            state.stock = action.payload.stock;
            state.rating = action.payload.rating;
            state.description = action.payload.description;
            state.images = action.payload.images;
        }
    }
})

export const {currentProduct} = productSlice.actions

export default productSlice.reducer