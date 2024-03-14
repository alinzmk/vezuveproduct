import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProducts } from "../../../ApiService";

const initialState = {
  product: [],
};

export const getProductData = createAsyncThunk('getProductData', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  console.log(accessToken)
  try {
    const result = await getUserProducts(accessToken);
    return result.userProducts
  } catch (error) {
      console.log(error)
  }
})

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProductData.fulfilled, (state, action)=>{
        state.product = action.payload
    })
    .addCase(getProductData.rejected, (state, action) => {
      state.product = null; // Clear the product state on rejection
    });
  }
})


export default productSlice.reducer;
