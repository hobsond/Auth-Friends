import React, {useState} from 'react';
import './App.css';
import {Route,Switch,Redirect,Link} from 'react-router-dom'
import {newToken, axiosWithAuth } from './utils/axiosAuth'
import {context as Context} from './utils/context'
import {FunctionContext} from './utils/functionContext'
import PrivateRoute from './utils/PrivateRoute'
import Login from './components/Login'
import Landing from './components/Landing'
import UserHome from './components/UserHome'





function App(props) {
  const [friends,setFriends] = useState([])
  const [searchedFriend,setSearched] = useState('')
  const [loggedIn,setLoggedIn]=useState(false)

  const inital={
    username:'',
    password:''
  }
  const [inputValue,setInputValue]=useState(inital)

  const changeHandle= evt =>{
    setInputValue({...inputValue,[evt.target.name] : evt.target.value })
  }


  const getFriends = ()=>{
    axiosWithAuth().get("http://localhost:5000/api/friends")
    .then(res=>{
      setFriends(res.data)
    })
  
    .catch(err=>err)
  }

  const findFriend = id=>{
    axiosWithAuth().get(`http://localhost:5000/api/friends/${id}`)
    .then(res=>{
      console.log(res.data)
      setSearched(res.data)
    })
    .catch(err=>console.log(err))
  }
  const addFriend = obj=>{
    axiosWithAuth().post('http://localhost:5000/api/friends',obj)
    .then(res=>{
      setFriends(res.data)
      console.log(res.data)

    })
    .catch(err=>console.log(err))
  }
  const updateFriend = (id,obj)=>{
    axiosWithAuth().put(`http://localhost:5000/api/friends/${id}`,obj)
    .then(res=>{
      getFriends()
    } )
    .catch(err=>console.log(err))
  }
  const deleteFriend = id =>{
    axiosWithAuth().delete(`http://localhost:5000/api/friends/${id}`)
    .then(res=>getFriends())
    .catch(err=>console.log(err))
  }
  const logout = evt=>{
    evt.preventDefault()
    localStorage.removeItem('token')
  }
  return (
    <div className="App">
      <nav>
        
        {!localStorage.getItem('token') ?
          <Link to='/login'>Login</Link>
        :
        <a onClick={logout}>Logout</a>}

      </nav>
      <FunctionContext.Provider value={
        {
          friends,
          searchedFriend,
          getFriends,
          findFriend,
          addFriend,
          updateFriend,
          deleteFriend,
        }
        
        }>

      <Context.Provider value={{inital,inputValue,changeHandle,setInputValue}}> 

      <Switch>

        
        
          <PrivateRoute components={UserHome} path='/home'/>


          <Route value={inputValue} component={Login } path='/login'/>

        <Route path ='/' >
          <Landing />
        </Route>
      </Switch>

      </Context.Provider>

      </FunctionContext.Provider>



      
    </div>
  );
}

export default App;
