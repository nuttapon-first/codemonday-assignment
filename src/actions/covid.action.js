import { covidConstants } from '../constants'
import { webServices } from '../services'


export const setStateToFetching = () => ({
    type: covidConstants.FETCHING_DATA,
})

export const fetchingSuccess = (data) => ({
    type: covidConstants.FETCHING_DATA_SUCCESS,
    result: data
})

export const fetchingError = () => ({
    type: covidConstants.FETCHING_DATA_ERROR,
})

export const getCovidDetails = () => {
    return (dispatch) => {
        dispatch(setStateToFetching())
        webServices.getCovidDetails()
            .then((res) => {
                dispatch(fetchingSuccess(res))
            }).catch((err) => {
                console.log(err)
                dispatch(fetchingError())
            })
    }
}

export const sortData = (data) => ({
    type: covidConstants.SORT_DATA,
    result: data
})

export const filterCountries = (data) => ({
    type: covidConstants.FILTER_COUNTRIES,
    searchText: data
})