import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUserData, getUserPlan, getUserPortfolio, getUserProducts, getUserTasks } from "../../../admin/AdminApiService";

const initialState = {
  taskadmin: [],
};

export const getTaskAdmin = createAsyncThunk('getTaskAdmin', async() => {
  const accessToken = (sessionStorage.getItem("token"))
  const userID = parseInt(sessionStorage.getItem("selectedCustomer"))
  try {
    const result = await getUserTasks(accessToken, userID);
    return result
  } catch (error) {
      console.log(error)
  }
})

export const taskAdminSlice = createSlice({
  name: "taskadmin",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskAdmin.fulfilled, (state, action)=>{
        state.taskadmin = action.payload
    })
    .addCase(getTaskAdmin.rejected, (state, action) => {
      state.taskadmin = null; // Clear the dash state on rejection
    });
  }
})

export default taskAdminSlice.reducer;