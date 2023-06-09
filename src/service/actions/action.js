import {data} from '../../data'

export const FETCH = 'FETCH';

export const fetch = () => {
    return {
        type: FETCH,
        payload: data,
    }
}