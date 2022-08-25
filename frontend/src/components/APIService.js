import axios from 'axios'

export default class APIService {
    

    static LoginUser(body) {

      return fetch('http://127.0.0.1:8000/api/users/login/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }


    static RegisterUser(body) {

      return fetch('http://127.0.0.1:8000/api/users/register/', {
        'method':'POST',
        headers: {
            'Content-Type':'application/json',
            
          }, 
          body:JSON.stringify(body)

      }).then(resp => resp.json())

    }


    static RegisterFile(formData, token) {

      const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }}

      return axios.post('http://127.0.0.1:8000/api/files/register/', formData, config)

      }


}