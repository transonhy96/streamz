import axios from 'axios';

export default function uploadImg(file) {
  
      const formData =  new FormData();
      formData.append('image', file);
     return axios.post('https://api.imgur.com/3/image',
      formData,
      {
        headers: {
          Authorization: 'Bearer 2d8b7066653c254948b1f5a0cb0e8be1a1b0d84d' ,
          Accept: 'application/json'
        }
      } );
}