import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserData, getProductDetailLink } from "../../../admin/AdminApiService";

const initialState = {
  productdetailadmin: [],
};

export const getProductDetailAdmin = createAsyncThunk('getProductDetailAdmin', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  const customerID = sessionStorage.getItem("selectedCustomer")
  try {
    const result = await getProductDetailLink(accessToken, customerID);
    return result
  } catch (error) {
      console.log(error)
  }
})

export const productdetailAdminSlice = createSlice({
  name: "productdetailadmin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetailAdmin.fulfilled, (state, action)=>{
        state.productdetailadmin = action.payload
    })
    .addCase(getProductDetailAdmin.rejected, (state, action) => {
      state.productdetailadmin = null; // Clear the dash state on rejection
    });
  }
})


export default productdetailAdminSlice.reducer;
