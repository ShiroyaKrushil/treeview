import { FETCH } from '../actions/action'

const initialValues = {};

const Reducer = (state = initialValues, action) => {
    switch (action.type) {
        case FETCH: return action.payload
        default: return state
    }
}

export default Reducer;