import React ,{useContext}from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserContext} from "../App"
const NavBar = () => {
  const navigate=useNavigate();
  const {state,dispatch}=useContext(UserContext) 
  const routingList=()=>{
    if(state){
      return [
        <Link  className="nav-link active" to="/profile">Profile</Link>,
        <Link  className="nav-link active" to="/create" >Create Post</Link>,
        <Link  className="nav-link active" to="/home" >Home</Link>,
       <Link  className="nav-link active" to="/addProfile" >photo</Link>,
        <button type="submit" className="btn btn-primary" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          navigate("/signin")
        }}>
            Logout
          </button>


      ]
    }else{
      console.log("else",state)
      return [
        <Link className="nav-link" to="/signin">SignIn</Link>,
        
        <Link  className="nav-link" to="/signup">SignUp</Link>
      ]
    }
  }
  return (
    <nav  className="navbar navbar-expand-lg navbar-light bg-light">
  <div  className="container-fluid">
    <Link  className="navbar-brand" to={state?"/home":"/signin"}>INSTAGRAM</Link>
    <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span  className="navbar-toggler-icon"></span>
    </button>
    <div  className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div  className="navbar-nav">
        {routingList()}
      </div>
    </div>
  </div>
</nav>
  );
};
export default NavBar;
