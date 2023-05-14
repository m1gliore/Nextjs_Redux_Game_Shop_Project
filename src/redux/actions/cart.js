// import {createAsyncThunk} from '@reduxjs/toolkit';
//
// export const addProduct = createAsyncThunk('cart/addProduct', async (product) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     return {
//         ...product,
//         quantity: 2,
//     }
// })
import { createAction } from '@reduxjs/toolkit';

export const addProduct = createAction('cart/addProduct')