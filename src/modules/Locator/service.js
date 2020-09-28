import request from 'src/utils/fetch';
import queryString from 'query-string';
import {PLUGIN_NAME} from 'src/config/development';


/**
 * Fetch category data
 * @returns {*}
 */
export const getLocation = () =>{
    // console.log('Service call')
    return new Promise((resolve, reject) => {
        let baseURL = 'http://mdbsapi.daviserve.com/js/locations.json';
        fetch(baseURL, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.code) {
              reject(new Error(data.message));
            } else {
              resolve(data.locations);
            //   console.log('dataaaa',data)
            }
          })
          .catch((error) => {
            return error;
          });
      });
}
