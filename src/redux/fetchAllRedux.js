import { getProfileData } from '../redux/features/profiledata/profileSlice';
import { getPlanData } from '../redux/features/plandata/planSlice';
import { getDashData } from '../redux/features/dashdata/dashSlice';
import { getTaskData } from '../redux/features/taskdata/taskSlice';
import { getProductData } from '../redux/features/productdata/productSlice';
import { getDocData } from '../redux/features/docdata/docSlice';

export const fetchAllRedux = () => {
    return dispatch => {
        dispatch(getProfileData())
        dispatch(getPlanData())
        dispatch(getDashData())
        dispatch(getTaskData())
        dispatch(getProductData())
        dispatch(getDocData())
    }
}

export default fetchAllRedux
