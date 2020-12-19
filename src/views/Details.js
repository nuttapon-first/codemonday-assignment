import React, { Component } from "react";
import { connect } from 'react-redux'
import { getCovidDetails, sortData, filterCountries } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAlphaDown, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { dataServices } from "../services";

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: ""
        }

        this.sortDataFunction = this.sortDataFunction.bind(this)
        this.searchFunction = this.searchFunction.bind(this)
    }

    componentDidMount() {
        this.props.getCovidDetails()
    }

    sortDataFunction(key) {
        const data = {
            inputArray: Object.assign([], this.props.covidReducer.summary.Countries),
            key: key,
        }
        this.props.sortData(data)
    }

    searchFunction(e) {
        this.setState({
            searchText: e
        }, () => {
            this.props.filterCountries(this.state.searchText)
        })

    }

    render() {
        const props = this.props
        return (
            <div className="center-page">
                {
                    props.covidReducer.isFetching ? <div>Loading...</div> : null
                }
                {
                    !props.covidReducer.isFetching && !props.covidReducer.isError ?
                        <div>
                            <input onChange={(e) => this.searchFunction(e.target.value)} value={this.state.searchText} className="input-custom" placeholder="Search countries ......." />
                            <table className="responsiveTable">

                                <thead>
                                    <tr>
                                        <th>Country <FontAwesomeIcon icon={faSortAlphaDown} onClick={() => this.sortDataFunction('Country')} /></th>
                                        <th style={{ textAlign: "right" }}>Total confirmed <FontAwesomeIcon icon={faSortAmountDown} onClick={() => this.sortDataFunction('TotalConfirmed')} /></th>
                                        <th style={{ textAlign: "right" }}>Total recovered <FontAwesomeIcon icon={faSortAmountDown} onClick={() => this.sortDataFunction('TotalRecovered')} /></th>
                                        <th style={{ textAlign: "right" }}>Total death <FontAwesomeIcon icon={faSortAmountDown} onClick={() => this.sortDataFunction('TotalDeaths')} /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.covidReducer.summary.Countries.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.Country}</td>
                                                    <td style={{ textAlign: "right" }}>{val.TotalConfirmed === 0 ? 'unreported' : dataServices.addCommas(val.TotalConfirmed)}</td>
                                                    <td style={{ textAlign: "right" }}>{val.TotalRecovered === 0 ? 'unreported' : dataServices.addCommas(val.TotalRecovered)}</td>
                                                    <td style={{ textAlign: "right" }}>{val.TotalDeaths === 0 ? 'unreported' : dataServices.addCommas(val.TotalDeaths)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> : null
                }
            </div>


        );
    }
}

const mapStateToProps = (state) => ({
    covidReducer: state.covid
})

const mapDispatchToProps = {
    filterCountries,
    getCovidDetails,
    sortData
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);