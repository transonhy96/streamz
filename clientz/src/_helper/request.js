import axios from 'axios';
import { apiPath } from "../config";
export default function request(method, path, data) {

    let mannothot = {};

    if(method =="GET"){
        mannothot = {
            method,
            url: apiPath.api + path,
            headers: { "x-access-token": localStorage.getItem('token') }
        }
    }
    else{
        mannothot = {
            method,
            url: apiPath.api + path,
            data,
            headers: { "x-access-token": localStorage.getItem('token') }
        }
    }
   return axios(mannothot);

}