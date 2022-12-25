import React ,{useEffect, useState} from 'react'
import { baseURL } from '../App'
import {Link } from 'react-router-dom'
const SearchUser=()=>{
    const [data,setData]=useState([])
    const [name,setName]=useState(null)
    useEffect(()=>{
        if(name){
            fetch(baseURL+'/search',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({query:name})
            }).then(res=>res.json())
            .then(users=>{
                setData(users.post)
               console.log(data)
            
            })
        }

    },[name])
    const getName=(name)=>{
        console.log(name)
        if(name===''){
            setData([])
        }
        setName(name) 
       
          
    }
   return(
    <>
    <div className='card' style={{ maxWidth: "550px", margin: "0px auto", height:"100%"}}>
      <div className='card-title' style={{textAlign:"center"}}><h1>Search</h1></div>
    <nav  className="navbar navbar-expand-lg navbar-light bg-light">
     <div  className="container-fluid" >
     <i className="material-icons" style={{float:"left"}}>search</i>
     <input type="search" className="search" placeholder="search here" onChange={(e)=>{getName(e.target.value)}} style={{width:"100%",display:"flex"}}/>
     </div>
     </nav>
     <div className='card-body'>
           <h3 style={{float:"top-left"}}>Recent</h3>
           {data? data.map(item=>{
            console.log("data",data)
            return(
                
                <ul className='collection'>
                    <Link to={"/userProfile/"+item._id} style={{color:"black"}}>
                    <li >
                    {item.email}
                    </li>
                    </Link>
                   
                   
                     
                </ul>
            )
           }): <h6 style={{textAlign:'center'}}> No recent search</h6>}
           
           
     </div>
    </div>
    
    </>
   )
}
export default SearchUser;