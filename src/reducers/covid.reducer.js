import { covidConstants } from '../constants'
import { dataServices } from '../services'

const initialState = {
    summary: {
        Message: "",
        Global: {
            NewConfirmed: 0,
            TotalConfirmed: 0,
            NewDeaths: 0,
            TotalDeaths: 0,
            NewRecovered: 0,
            TotalRecovered: 0
        },
        Countries: []
    },
    summaryDefault: {
        Message: "",
        Global: {
            NewConfirmed: 0,
            TotalConfirmed: 0,
            NewDeaths: 0,
            TotalDeaths: 0,
            NewRecovered: 0,
            TotalRecovered: 0
        },
        Countries: []
    },
    isFetching: false,
    isError: false,
    isToggleCountries: false,
    isToggleConfirm: false,
    isToggleDeaths: false,
    isToggleRecovered: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case covidConstants.FETCHING_DATA:
            return {
                ...state,
                isFetching: true,
                isError: false
            }

        case covidConstants.FETCHING_DATA_SUCCESS:
            return {
                ...state,
                summary: action.result,
                summaryDefault: action.result,
                isFetching: false,
                isError: false
            }

        case covidConstants.FETCHING_DATA_ERROR:
            return {
                ...state,
                isFetching: false,
                isError: true
            }

        case covidConstants.SORT_DATA:
            let toggle = false
            if (action.result.key === 'TotalConfirmed') {
                toggle = state.isToggleConfirm
                state.isToggleConfirm = !state.isToggleConfirm
            } else if (action.result.key === 'TotalRecovered') {
                toggle = state.isToggleRecovered
                state.isToggleRecovered = !state.isToggleRecovered
            } else if (action.result.key === 'TotalDeaths') {
                toggle = state.isToggleDeaths
                state.isToggleDeaths = !state.isToggleDeaths
            } else if (action.result.key === 'Country') {
                toggle = state.isToggleCountries
                state.isToggleCountries = !state.isToggleCountries
            }

            const sortCountries = dataServices.sortData(action.result.inputArray, action.result.key, toggle)
            return {
                ...state,
                summary: {
                    ...state.summary,
                    Countries: sortCountries
                },
                isFetching: false,
                isError: false
            }

        case covidConstants.FILTER_COUNTRIES:
            const filterountries = state.summaryDefault.Countries.filter((row) =>
                row.Country.toLowerCase().indexOf(action.searchText.toLowerCase()) > -1
            )
            return {
                ...state,
                summary: {
                    ...state.summary,
                    Countries: filterountries
                },
                isFetching: false,
                isError: false
            }

        default:
            return state
    }
}