import Endpoints from '../endpoints.js';
import fetchJsonp from "fetch-jsonp";

const service = {
    get: () => {

        const dataPromise = fetchJsonp(Endpoints.PUBLIC_FEED + '?jsoncallback=data&format=json', {
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