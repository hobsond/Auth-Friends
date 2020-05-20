import React,{useContext} from 'react'
import {FunctionContext} from '../utils/functionContext'

export default function Friend(props) {
    const {deleteFriend} = useContext(FunctionContext)
    const { info} = props
    return (
        <div>
            <h4>{info.name} </h4>
            <p> Age :{info.age} </p>
            <p> Email :{info.email} </p>

            <button onClick={()=>deleteFriend(info.id)}>Delete Friend</button>
        </div>
    )
}
