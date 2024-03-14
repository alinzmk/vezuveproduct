import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profiledata/profileSlice";
import planReducer from "../features/plandata/planSlice";
import dashReducer from "../features/dashdata/dashSlice";
import taskReducer from "../features/taskdata/taskSlice";
import productReducer from "../features/productdata/productSlice";
import docReducer from "../features/docdata/docSlice";
import userAdminReducer from "../features/adminuser/userAdminSlice";
import planAdminReducer from "../features/adminplan/planAdminSlice";
import dashAdminReducer from "../features/admindash/dashAdminSlice";
import productAdminReducer from "../features/adminproduct/productAdminSlice";
import taskAdminReducer from "../features/admintask/taskAdminSlice";
import docAdminReducer from "../features/admindoc/docAdminSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    plan: planReducer,
    dash: dashReducer,
    task: taskReducer,
    product: productReducer,
    doc: docReducer,
    useradmin: userAdminReducer,
    planadmin: planAdminReducer,
    dashadmin: dashAdminReducer,
    productadmin: productAdminReducer,
    taskadmin: taskAdminReducer,
    docadmin: docAdminReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;