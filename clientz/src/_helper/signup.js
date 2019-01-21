import axios from 'axios';
import {apiPath} from '../config';

export default function signup(newUser){
    
    return axios.post(`${apiPath.api}/channels/signup`,newUser);
    
}