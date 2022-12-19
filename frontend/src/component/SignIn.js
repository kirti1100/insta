import React, { useState ,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import {UserContext} from '../App';
import {toast} from "react-toastify"
const SignIn = () => {
  const {state,dispatch}=useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  const regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const postData = (event) => {
    event.preventDefault();
    if(!regex.test(email)){
      return window.alert("invalid email")
    }
    console.log("hello");
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        if(data.error){
          toast(data.error, { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'top-right' })

        }else{
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          console.log("state value",data.user)
          toast("loged in", { hideProgressBar: true, autoClose: 2000, type: 'success' ,position:'top-right' })
          navigate("/profile")
        }
        console.log(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card ">
        <h1>Instagram</h1>
        <form>
          <div className="mb-3">
            <label  className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
            />
            <label className="form-check-label">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={(event)=>postData(event)}>
            Submit
          </button>
        </form>
        <div>
            <h6><Link to='/signup'>Dont have a account?</Link></h6>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
