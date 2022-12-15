import * as actionType from './actionType';
const initialState = {
    attractionArr: [],
    wishesArr: [],
    categoriesArr: [],
    // user: null,
user : {
    Id: 43, Name : "שלומי שבו", Email: "ahuvael02@gmail.com",
    Password: "hjk123", Phone: "0521234123",  Status: 1,Active: true,
},
    userList: [],
    ordersArr: [],
    loading: false
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
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
            const x = state.attractionArr.find(x => x.Id == action.payload.AttractionId);
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
            const array = state.wishesArr.filter(x => x.Id != action.payload);
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

        // case "UPDATE_AMOUNT":
        //     let arr = [...state.cart];
        //     arr.find(x => x.id == action.payload.id).amount += action.payload.amount;   
        //     console.log(arr) 
        //     return {
        //         ...state,
        //         cart: [...arr]
        //     }

        case actionType.ATTRACTION_UPDATED:
            const vec = [...state.attractionArr];
            console.log(action.payload)
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
                const a3 = a2.filter(x => x.Id != action.payload)
                return {
                    ...state,
                    ordersArr: [...a3]
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
            // if (!action.payload.Status)
            //     return;
            console.log(action.payload)
            return {
                ...state,
                categoriesArr: [...state.categoriesArr, action.payload]
            }
        // case "ZEROING_CART":
        // return{
        //     ...state,
        //     cart: []
        // }
    }
    return state;
}
export default storeReducer;