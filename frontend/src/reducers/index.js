import { combineReducers } from "redux";
import auth from './auth'
import {feedReducer} from './feed'
import user from './user'

export default combineReducers({
    auth,
    feeds: feedReducer,
    user: user,
})

export const reaplaceItem = (collection, item ) => {
    const index  = collection.findIndex((entry) => entry.id === item.id);
    return [...collection.slice(0, index), item, ...collection.slice(index + 1)]
}