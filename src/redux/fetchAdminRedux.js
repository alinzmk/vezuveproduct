import { getDashAdmin } from "./features/admindash/dashAdminSlice"
import { getDocAdmin } from "./features/admindoc/docAdminSlice"
import { getMarketReqAdmin } from "./features/adminmarketreq/marketreqAdminSlice"
import { getPlanAdmin } from "./features/adminplan/planAdminSlice"
import { getProductAdmin } from "./features/adminproduct/productAdminSlice"
import { getTaskAdmin } from "./features/admintask/taskAdminSlice"

export const fetchAdminRedux = () => {
    return dispatch => {
        dispatch(getPlanAdmin())
        dispatch(getDashAdmin())
        dispatch(getProductAdmin())
        dispatch(getTaskAdmin())
        dispatch(getDocAdmin())
        dispatch(getMarketReqAdmin())
    }
}

export default fetchAdminRedux