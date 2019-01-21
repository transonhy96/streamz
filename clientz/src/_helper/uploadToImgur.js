import axios from 'axios';
import {apiPath} from '../config';

export default function uploadImg(file) {
  
      const formData =  new FormData();
      formData.append('image', file);
     return axios.post('https://api.imgur.com/3/image',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + apiPath.imgurAccessToken,
          Accept: 'application/json'
        }
      } );
}