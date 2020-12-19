import { api } from '../helper'

export const webServices = {
    getCovidDetails,
}

async function getCovidDetails() {
    return new Promise((resolve, reject) => {
        api.get("/summary")
            .then(response => {
                return resolve(response.data)
            })
            .catch(function (error) {
                return reject(error)
            })
    })
}