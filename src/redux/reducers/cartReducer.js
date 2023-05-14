import { createSlice } from '@reduxjs/toolkit';
import { addProduct } from '../actions/cart';
import {HYDRATE} from "next-redux-wrapper";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => {
                return { ...state, ...action.payload.cart }
            })
            .addCase(addProduct, (state, action) => {
                state.isLoading = false
                state.quantity++
                // state.products.push(action.payload)
                // state.total += action.payload.price * action.payload.quantity
            })
    },
})

export default cartSlice