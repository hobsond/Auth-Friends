import React,{useContext,useEffect,useState} from 'react'
import {FunctionContext} from '../utils/functionContext'

import Friend from './friend'

export default function UserHome(props) {
    const [showAdd,setShowAdd] = useState(false)
    const [value,setValue]=useState({
        name:'',
        email:'',
        age:''
    })

    const {friends,searchedFriends,getFriends,addFriend} = useContext(FunctionContext)
    useEffect(()=>{
        getFriends()
    },[friends])

    const showBtn= evt=>{
        evt.preventDefault()
        setShowAdd(!showAdd)
    }

    const changeHandle = evt=>{
    setValue({...value,[evt.target.name] :evt.target.value})
    }

    const newFriend= evt=>{
        evt.preventDefault()
        addFriend(value)
        
    }
    
    return (
        <div>
            <div>
            <button onClick={showBtn}>Add Friends</button>
            {showAdd ? 
            <form onSubmit={newFriend} >
                <input type='text' onChange={changeHandle} name='name' placeholder='username' />
                <input type='text'  onChange={changeHandle} name='age' placeholder='age' />
                <input type='text'  onChange={changeHandle} name='email'placeholder='email' />


                <button onClick={newFriend}>Add</button>
            </form>
            :
            null
            
        }
         </div>
            <div>
                {friends.map((item,index)=>{
                    return <Friend key={index} info={item} {...props} />
                })}

            </div>
        </div>
    )
}
