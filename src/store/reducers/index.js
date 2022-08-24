import * as actionType from './actionType';
const initialState = {
    attractionArr: [],
    wishesArr: [],
    // user: null,
    user: {
        Id: 1, Name: "שילת בידני", Email: "shilat@gmail.com", Password: "1111",
         Phone: "0533160663", Status: 1
    },
    userList: [],
    //order: null,
    loading: false
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
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
            const x = state.attractionArr.find(x=>x.Id==action.payload.AttractionId);
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
            const array = [...state.wishesArr];
            console.log(array)
            array.splice(action.payload, 1);
            return {
                ...state,
                wishesArr: [...array]
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
            for (let index = 0; index < vec.length; index++) {
                if (vec.find(x => x.id == action.payload.id)) {
                    vec[index] = action.payload;
                    break;
                }
            }
            return {
                ...state,
                attractionArr: [...vec]
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