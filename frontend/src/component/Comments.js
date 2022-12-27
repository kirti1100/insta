import React ,{useContext, useState}from 'react'
import {UserContext,baseURL} from "../App"
import { Link } from 'react-router-dom'
const Comments=()=>{
    const{value}=useContext(UserContext)
    const{state}=useContext(UserContext)
    const [data,setData]=useState(value)
    const commentPost=(id,text)=>{
        console.log("comment post call",value)
        fetch(baseURL+"/comment",{
            method:"put",
           
            headers:{
                "Content-Type":"application/json",
                "Authorization":"bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId:id,
               text:text
            })
        }).then(res=>res.json())
          .then(response=>{
            console.log("comment fetchresponse",response)
            return setData(response);
          })
    }
    const addComment=(event)=>{
        event.preventDefault()
        console.log("add cmomment call",state)
        commentPost(data._id,event.target[0].value)
        document.getElementById('formExample').value=''
    }
    const deleteComment=(commentId)=>{
        console.log("commmentid",commentId,value)
        fetch(baseURL+`/deleteComment/${commentId}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:data._id
             })
        }).then(res=>res.json())
        .then(result=>{
            console.log("result",result)
            setData(result)
            
        })
    }
    return(
        <>
        
         <div className="card" style={{width:"18rem",margin:"18px auto"}}>
         <Link to="/profile">
                <i className=" material-icons material-symbols-outlined" style={{ color:  "black",float:"left",marginTop:"20px"}}>arrow_back</i>
                </Link>
            <h5 className="card-title" style={{textAlign:"center"}}>Comments</h5>
            <div className="card-body">
                {
                data.comments.map(record=>{
                    return(
                        <h6><span>{record.postedby.name} </span>{record.text}
                        {record.postedby._id === state._id &&
                        <i className="material-icons" type="submit" style={{float:"right"}} onClick={()=>deleteComment(record._id)}>delete</i>}
                        </h6>
                    )
                })
                
            }
            </div>
            <div className='card-footer'>
                    <form onSubmit={(event)=>{
                        console.log("checckkkkk")
                        addComment(event)
                        
                    }}>
                       <input type="text" id='formExample' placeholder='Add a comment' />
                    </form>
              </div>
              </div></>
    )
}
export default Comments