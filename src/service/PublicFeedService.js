import Endpoints from '../endpoints.js';
import fetchJsonp from "fetch-jsonp";

const service = {
    get: (filter) => {
console.log("request")
        let url = Endpoints.PUBLIC_FEED + '?jsoncallback=data&format=json'
        if(filter) {
            url += filter
        }
        const dataPromise = fetchJsonp(url, {
            jsonpCallbackFunction: 'data',
        })
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log('parsed json', json);
                const response = json;
                const data = response.items;
                return data;
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })

        // return it
        return dataPromise
    }
}

export default service;