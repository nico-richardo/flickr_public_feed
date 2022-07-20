import { get } from 'axios';
import Endpoints from '../endpoints.js';

const service = {
    get: () => {
        // create a promise for the axios request
        const promise = get(Endpoints.PUBLIC_FEED + '?jsoncallback=data&format=json', {
            headers: { "Access-Control-Allow-Origin": "*" }
        });

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then((response) => {
            console.log(response);
            return response;
        })

        // return it
        return dataPromise
    }
}

export default service;