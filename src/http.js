import axios from 'axios'

export default {
    server: {
        serverURL: "http://localhost/api/",
        /**
         * 
         * @param {string} route 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        get(route, config = null) {
            return axios.get(this.serverURL + route, config)
        },

        /**
         * 
         * @param {string} route 
         * @param {any?} data 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        post(route, data = null, config = null) {
            return axios.post(this.serverURL + route, data, config)
        },

        /**
         * 
         * @param {string} route 
         * @param {any?} data 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        put(route, data = null, config = null) {
            return axios.put(this.serverURL + route, data, config)
        },

        /**
         * 
         * @param {string} route 
         * @param {import('axios').AxiosRequestConfig} config 
         */
        delete(route, config) {
            return axios.delete(this.serverURL + route, config)
        }
    },

    axios: axios
}