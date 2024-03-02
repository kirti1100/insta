import InstagramIcon from '@mui/icons-material/Instagram';
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "../NavBar.css";

const NavBar1 = () => {
  const navigate = useNavigate();
  const [result,setResult]=useState([]);
  const [isOpen,setIsOpen]=useState(false);
  const { state, value1, dispatched1 } = useContext(UserContext);

  useEffect(()=>{
    if(state){
      setResult(navList);
    }else{
      setResult(removeNav);
    }
  },[state]);
  const navList = [
         {
          path:"/home",
          icon:"home",
          name: "Home"

         },
         {
          path:"/searchUser",
          icon:"search",
          name: "search"

         },
         {
          path:"/explore",
          icon:"explore",
          name: "explore"

         },
         {
          path:"/reels",
          icon:"movie",
          name: "Reels"

         },
         {
          path:"/messages",
          icon:"message",
          name: "messages"

         },
         {
          path:"/notification",
          icon:"favorite",
          name: "notification"

         },
         {
          path:"/create",
          icon:"add_box",
          name: "Create"

         },
         {
          path:"/profile",
          icon:"person",
          name: "Profile"

         }
  ]
  const removeNav=[
    {
      path:"/signin",
      icon:"person",
      name: "signin"

     },
     {
      path:"/signup",
      icon:"person",
      name: "signup"

     }
  ]
  // const routingList = () => {
  //   if (state) {
  //     return [
  //       <Link className="nav-link" to="/home">
  //         <i className="material-icons" style={{ float: "left"}}>
  //           home
  //         </i>
  //         Home
  //       </Link>,
  //       <Link className="nav-link active" to="/searchUser">
  //         <i className="material-icons search" style={{ float: "left" }}>
  //           search
  //         </i>
  //         Search
  //       </Link>,
  //       <Link className="nav-link active" to="/explore">
  //       <i className="material-icons sidenav-trigger show-on-large"  data-target= "slide-out" style={{ float: "left" }}>
  //         explore
  //       </i>
  //       explore
  //     </Link>,
  //       <Link className="nav-link active" to="/reels">
  //       <i className="material-icons" style={{ float: "left" }}>
  //         movie
  //       </i>
  //       reels
  //     </Link>,
  //     <Link className="nav-link active" to="/messages">
  //     <i className="material-icons" style={{ float: "left" }}>
  //       message
  //     </i>
  //     messages
  //   </Link>,
  //   <Link className="nav-link active" to="/notification">
  //   <i className="material-icons" style={{ float: "left" }}>
  //   favorite
  //   </i>
  //   Notification
  // </Link>,
  //     <Link className="nav-link active" to="/create">
  //     <i
  //       className="material-icons material-symbols-outlined"
  //       style={{ float: "left" }}
  //     >
  //       add_box
  //     </i>
  //     Create
  //   </Link>,
  //       <Link className="nav-link active" to="/profile">
  //         <i
  //           className=" material-icons material-symbols-outlined"
  //           style={{ float: "left" }}
  //         >
  //           person
  //         </i>
  //         Profile
  //       </Link>,
        

  //       <button
  //         type="submit"
  //         className="btn btn-primary"
  //         style={{ float: "left" }}
  //         onClick={() => {
  //           localStorage.clear();
  //           dispatch({ type: "CLEAR" });
  //           navigate("/signin");
  //         }}
  //       >
  //         Logout
  //       </button>,
  //     ];
  //   } else {
  //     return [
  //       <Link className="nav-link" to="/signin" style={{ float: "left" }}>
  //         SignIn
  //       </Link>,

  //       <Link className="nav-link" to="/signup" style={{ float: "right" }}>
  //         SignUp
  //       </Link>,
  //     ];
  //   }
  // };
  const toggle1=()=>{
    dispatched1({type:"toggle" ,payload:isOpen});
    setIsOpen(!isOpen);
    console.log("nav bard",value1);
  }
  return (
    <div class="wrapper">
      <div class="sidebar" style={{width: isOpen? "220px" : "90px"}}>
        <h4 style={{display: isOpen? "block" : "none"}}>instagram</h4>
        <i className="material-icons" style={{ padding : "0px 40px", color: "white",display: isOpen? "none" : "block"}}><InstagramIcon/></i>
        <div className='status' style={{width:isOpen? "220px" : "90px"}}></div>
        <div class="routinglist"> 
          {
            result.map((item,index)=>(
              
             <div className="nav-link" >
              <i className="material-icons navicon " onClick={toggle1} style={{ float: "left", padding: "10px"}}>
                {item.icon}
              </i>
              <Link className="nav-link navname"  onClick={toggle1} to={item.path} key={index} style={{display: isOpen? "block" : "none"}}>
              {item.name}
            </Link>
            </div>
            
            ))
          }
          </div>
      </div>
    </div>
  );
};
export default NavBar1;
