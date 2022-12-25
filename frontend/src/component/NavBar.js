import React ,{useContext}from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserContext} from "../App"
const NavBar = () => {
  const navigate=useNavigate();
  const {state,dispatch}=useContext(UserContext) 
  const routingList=()=>{
    if(state){
      return [
        <Link  className="nav-link active" to="/profile" > 
        <i className=" material-icons material-symbols-outlined" style={{float:"left"}}>person</i>
        Profile</Link>,
        <Link  className="nav-link active" to="/create" >
          <i className="material-icons material-symbols-outlined" style={{float:"left"}}>add_box</i>
          Create</Link>,
        <Link  className="nav-link active" to="/home">
          <i className="material-icons" style={{float:"left"}}>home</i>Home</Link>,
          <Link  className="nav-link active" to="/searchUser">
          <i className="material-icons" style={{float:"left"}}>search</i>Search</Link>,
        <button type="submit" className="btn btn-primary ms-auto" style={{float:"right"}} onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          navigate("/signin")
        }}>
            Logout
          </button>


      ]
    }else{
      return [
        <Link className="nav-link" to="/signin" style={{float:"left"}}>SignIn</Link>,
        
        <Link  className="nav-link" to="/signup" style={{float:"right"}}>SignUp</Link>
      ]
    }
  }
  return (
    <nav  className="navbar navbar-expand-lg navbar-light bg-light">
  <div  className="container-fluid" >
    <Link  className="navbar-brand" to={state?"/home":"/signin"}>INSTAGRAM</Link>
    {/* <div  className="collapse " id="navbarNavAltMarkup"> */}
      <div  className="navbar-nav" style={{display:'contents'}}>
        {routingList()}
      </div>
    {/* </div> */}
  </div>
</nav>
  );
};
export default NavBar;
