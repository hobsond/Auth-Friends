import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
export const axiosWithAuth= ()=>{
    const token = localStorage.getItem('token')
   return axios.create({
        headers:{
            authorization: token,
        }
    })
}

export const newToken = (init)=>{
    axios.post('http://localhost:5000/api/login',init)
          .then(res=>{
              localStorage.setItem('token', res.data.payload)
              localStorage.setItem('user',init.username)
          })
          .catch(err=>err)
}
