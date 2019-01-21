import axios from 'axios';
import {apiPath} from '../config';

export default function login(user){
    
    return axios.post(`${apiPath.api}/channels/authenticate/login`,user);
    
}