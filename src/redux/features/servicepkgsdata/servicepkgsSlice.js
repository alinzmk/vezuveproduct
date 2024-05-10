import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPackages, getAllPartnerData } from "../../../ApiService";

const initialState = {
  servicepkgs: [],
};

export const getServicepkgsData = createAsyncThunk('getServicepkgsData', async() => {
  const accessToken = (sessionStorage.getItem("token"))

  try {
    const result = await getAllPackages(accessToken);
    return result.packages
  } catch (error) {
      console.log(error)
  }
})

export const packageSlice = createSlice({
  name: "servicepkgs",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getServicepkgsData.fulfilled, (state, action)=>{
        state.servicepkgs = action.payload
    })
    .addCase(getServicepkgsData.rejected, (state, action) => {
      state.servicepkgs = null;
    });
  }
})


export default packageSlice.reducer;
