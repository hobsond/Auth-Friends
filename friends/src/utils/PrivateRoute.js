import React from 'react'
import {Route,Redirect} from 'react-router-dom'
const PrivateRoute = ({components:Components,...rest})=>(
    <Route {...rest} render={
        props=>localStorage.getItem('token')? (
        <Components {...props} />) :
        (<Redirect to='/login' />)
    } />
)

export default PrivateRoute