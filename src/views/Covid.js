import React, { Component } from "react";
import { connect } from 'react-redux'
import moment from 'moment'
import { getCovidDetails } from '../actions'
import { dataServices } from "../services";

class Covid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: moment(new Date()).format('DD/MM/YYYY')
        }


    }
    componentDidMount() {
        this.props.getCovidDetails()
    }
    render() {
        const props = this.props
        return (
            <div>
                {
                    props.covidReducer.isFetching ? <div>Loading...</div> : null
                }
                {
                    !props.covidReducer.isFetching && !props.covidReducer.isError ?
                        < div >
                            <div className="title-head">Covid-19 Situation Reports</div>
                            <div className="title-date">Date: {this.state.date}</div>
                            <div className="space-top">
                                <div class="grid-container center-page">
                                    <div className="card" style={{backgroundColor: "#BA55D3"}}>
                                        <div className="container">
                                            <h4><b>Coronavirus Cases</b></h4>
                                            <p>{dataServices.addCommas(this.props.covidReducer.summary.Global.TotalConfirmed)}</p>
                                            <p>(+ {dataServices.addCommas(this.props.covidReducer.summary.Global.NewConfirmed)})</p>
                                        </div>
                                    </div>
                                    <div className="card" style={{backgroundColor: "#FF0000"}}>
                                        <div className="container">
                                            <h4><b>Deaths</b></h4>
                                            <p>{dataServices.addCommas(this.props.covidReducer.summary.Global.TotalDeaths)}</p>
                                            <p>(+ {dataServices.addCommas(this.props.covidReducer.summary.Global.NewDeaths)})</p>
                                        </div>
                                    </div>
                                    <div className="card" style={{backgroundColor: "#66CC33"}}>
                                        <div className="container">
                                            <h4><b>Recovered</b></h4>
                                            <p>{dataServices.addCommas(this.props.covidReducer.summary.Global.TotalRecovered)}</p>
                                            <p>(+ {dataServices.addCommas(this.props.covidReducer.summary.Global.NewRecovered)})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div > : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    covidReducer: state.covid
})

const mapDispatchToProps = {
    getCovidDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Covid);