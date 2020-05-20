import React from 'react'
import {newToken} from '../utils/axiosAuth'


export default function Login(props) {
    const login= (evt)=>{
        evt.preventDefault()
        
        newToken(props.value)
       this.props.history.push('/')
        
        // return <Redirect to='/:id/Home'
      }
    return (
        <form onSubmit={props.login}>
            <input
            placeholder='username'
             name='username' onChange={props.changeHandle} value={props.value.username} type='text'/>

            <input
            placeholder='password'
            name='password'  onChange={props.changeHandle} value={props.value.password} type='password'/>
            
            <button onClick={login}>login</button>

        </form>
    )
}
