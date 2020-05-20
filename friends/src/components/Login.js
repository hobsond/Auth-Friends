import React from 'react'
import {newToken} from '../utils/axiosAuth'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'

const Form = styled.form `
    background:white;
    display:flex;
    flex-direction:column;
    width:60%;
    margin:0 auto;
    margin-top:5%;
    padding:2%;
    border-radius:1rem;
    box-shadow:0 0 1rem darkgray;
    h2{
        color:white;
    }
    div{
        background:rgba(0,0,0,.3);
        padding:10%;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        border-radius:1rem

    }

    input{
        margin:.2rem 0;
        text-align:center;
        width:90;
        margin:.9rem auto;
        padding:2%;
        border-radius:2rem;

    }

    button{
        width:60%;
        margin:0 auto;
        border-radius:1rem;
        margin-top:1rem;
        padding:.5rem;
        font-size:1.3rem;
        letter-spacing:.1rem;

    }


`

export default function Login(props) {

    const login= (evt)=>{
        evt.preventDefault()
        
        newToken(props.value)
    //    props.history.push('/home')
        
        return <Redirect to='/Home'/>
      }
    return (
        <Form onSubmit={props.login}>
            <h2>Login Today</h2>
            <div> 
            <input
            placeholder='username'
             name='username' onChange={props.changeHandle} value={props.value.username} type='text'/>

            <input
            placeholder='password'
            name='password'  onChange={props.changeHandle} value={props.value.password} type='password'/>
            
            <button onClick={login}>login</button>
            </div>

        </Form>
    )
}
