import * as actionType from './actionType';
const initialState = {
    attractionArr: [],
    wishesArr: [],
    categoriesArr: [],
    loginApp:false,
    user: null,
    userList: [],
    ordersArr: [],
    statisticts: null,
    loading: false
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CHANGE_LOGIN_APP:
            return {
                ...state,
                loginApp: action.payload
            }
        case actionType.SAVE_ALL_STATISTICTS:
            return {
                ...state,
                statisticts: action.payload
            }
        case actionType.SAVE_ALL_USERS:
            return {
                ...state,
                userList: action.payload
            }
        case actionType.SAVE_ALL_ATTRACTIONS:
            return {
                ...state,
                attractionArr: action.payload
            }

        case actionType.ATTRACTION_ADDED:
            return {
                ...state,
                attractionArr: [...state.attractionArr, action.payload]
            }

        case actionType.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case actionType.CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }

        case actionType.ADDED_ATTRACTION_TO_WISH_LIST:
            const x = state.attractionArr.find(x => x.Id === action.payload.AttractionId);
            return {
                ...state,
                wishesArr: [...state.wishesArr, x]
            }

        case actionType.WISH_LIST_ACCEPTED:
            return {
                ...state,
                wishesArr: action.payload
            }

        case actionType.ATTRACTION_DELETED_FROM_WISH_LIST:
            const array = state.wishesArr.filter(x => x.Id !== action.payload);
            return {
                ...state,
                wishesArr: array
            }
        case actionType.ATTRACTION_DELETED:
            const a = [...state.attractionArr];
            a.splice(action.payload, 1);
            return {
                ...state,
                attractionArr: [...a]
            }
        case actionType.ATTRACTION_UPDATED:
            const vec = [...state.attractionArr];
            const findIndex = vec.findIndex(x => x.Id === action.payload.Id);
            vec[findIndex] = action.payload;
            return {
                ...state,
                attractionArr: [...vec]
            }
        case actionType.SAVE_ALL_ORDERS:
            return {
                ...state,
                ordersArr: action.payload
            }
        case actionType.ORDER_DELETED:
            const a2 = [...state.ordersArr];
            const a3 = a2.filter(x => x.Id != action.payload);
            return {
                ...state,
                ordersArr: [...a3]
            }
        case actionType.ORDER_UPDATED:
            const v = [...state.ordersArr];
            const index = v.findIndex(x => x.Id === action.payload.Id);
            v[index] = action.payload;
            return {
                ...state,
                ordersArr: [...v]
            }
        case actionType.ORDER_ADDED:
            action.payload.Attraction = {...state.attractionArr.find(x=>x.Id==action.payload.AttractionId)}
            return {
                ...state,
                ordersArr: [...state.ordersArr, action.payload]
            }
        case actionType.SAVE_ALL_CATEGORIES:
            return {
                ...state,
                categoriesArr: action.payload
            }
        case actionType.CATEGORY_ADDED:
            return {
                ...state,
                categoriesArr: [...state.categoriesArr, action.payload]
            }
        case actionType.CATEGORY_CHANGED:
            return {
                ...state,
                categoriesArr: [...state.categoriesArr, action.payload]
            }
        case actionType.DELETE_CATEGORY:
            const c = [...state.categoriesArr.filter(x => x.Id !== action.payload.Id)];
            return {
                ...state,
                categoriesArr: [...c]
            }
        default:
            break;
    }
    return state;
}
export default storeReducer;