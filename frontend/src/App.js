import React ,{createContext,useReducer,useEffect,useContext}from 'react'
import NavBar from './component/NavBar'
import Home from './component/Home'
import Profile from './component/Profile'
import SignIn from './component/SignIn'
import SignUp from './component/SignUp'
import CreatPost  from './component/CreatPost'
import UserProfile  from './component/UserProfile'
import './App.css'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {intialState,reducer} from "./reducers/userReducer";
import Comments from './component/Comments'
import AddProfile  from './component/AddProfile'

export const UserContext = createContext();


const Routing=()=>{
  const {state,dispatch}=useContext(UserContext);
  const navigate=useNavigate();
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem("user"))
      
      if(user){
        dispatch({type:"USER",payload:user})
        console.log("page refresh",state)
        navigate("/home")
      }else{
          navigate("/signin")
      }
      //eslint-disable-next-line
  },[])
  return(
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route exact path="/profile" element={<Profile />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/create" element={<CreatPost/>}/>
      <Route path="/comment" element={<Comments/>}/>
      <Route path="/userProfile/:userId" element={<UserProfile/>}/>
      <Route path="/addProfile" element={<AddProfile/>}/>
    </Routes>
  )
}


function App() {
  const[state,dispatch]=useReducer(reducer,intialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    <ToastContainer/>
    </BrowserRouter>
    </UserContext.Provider>
    
  )
}

export default App;
