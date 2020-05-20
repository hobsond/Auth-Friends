import React, {useState} from 'react';
import './App.css';
import {Route,Switch,Redirect,Link} from 'react-router-dom'
import {newToken, axiosWithAuth } from './utils/axiosAuth'
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

  // const login= (evt)=>{
  //   evt.preventDefault()
    
  //   newToken(inputValue)
  //   setLoggedIn(true)
  //   setInputValue(inital)
    
  //   // return <Redirect to='/:id/Home'
  // }

  const getFriends = ()=>{
    axiosWithAuth().get("http://localhost:5000/api/friends")
    .then(res=>{
      console.log(res)
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
    axiosWithAuth().get('http://localhost:5000/api/friends',obj)
    .then(res=>{
      setFriends(res.data)
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

  return (
    <div className="App">
      <nav>
        <Link to='/login'>Login</Link>
        <Link to='/'>Home</Link>
      </nav>
      <Switch>
        <PrivateRoute path={`/home`} components={UserHome} />

        <Route path='/login'>
          <Login 
          // login={login}
           value={inputValue} 
           changeHandle={changeHandle} />
        </Route>

        <Route path ='/' >
          <Landing />
        </Route>
      </Switch>

      
    </div>
  );
}

export default App;
