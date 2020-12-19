import axios from "axios"

const baseURL = "https://api.covid19api.com"

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
})


export { api }