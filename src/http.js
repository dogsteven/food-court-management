import axios from 'axios'

let serverURL = "http://localhost/api/"

export default {
    server: {
        /**
         * 
         * @param {string} route 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        get(route, config = null) {
            return axios.get(serverURL + route, config)
        },

        /**
         * 
         * @param {string} route 
         * @param {any?} data 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        post(route, data = null, config = null) {
            return axios.post(serverURL + route, data, config)
        },

        /**
         * 
         * @param {string} route 
         * @param {any?} data 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        put(route, data = null, config = null) {
            return axios.put(serverURL + route, data, config)
        },

        /**
         * 
         * @param {string} route 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        delete(route, config) {
            return axios.delete(serverURL + route, config)
        }
    },

    axios: axios
}