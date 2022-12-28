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
import {intialState,userReducer} from "./reducers/userReducer";
import { initialvalue,postReducer } from './reducers/postReducer'
import Comments from './component/Comments'
import AddProfile  from './component/AddProfile';
import SearchUser from './component/SearchUser';
import MyPost from './component/MyPosts';
import FollowersList from './component/FollowersList'
import UserPost from './component/UserPost'
export const UserContext = createContext();
export const baseURL= process.env.REACT_APP_SERVER_URL

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
      <Route path="/searchUser" element={<SearchUser/>}/>
      <Route path="/myposts" element={<MyPost/>}/>
      <Route path="/userposts/:userId" element={<UserPost/>}/>
      <Route path="/followers" element={<FollowersList/>}/>

    </Routes>
  )
}


function App() {
  const[state,dispatch]=useReducer( userReducer,intialState)
  const [value,dispatched]=useReducer(postReducer,initialvalue)
  return (
    <UserContext.Provider value={{state,dispatch,value,dispatched}}>
    <BrowserRouter>
    <NavBar />
    <Routing />
    <ToastContainer/>
    </BrowserRouter>
    </UserContext.Provider>
    
  )
}

export default App;
