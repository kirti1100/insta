import React ,{useState,useContext}from 'react'
import {UserContext} from "../App"
const Comments=()=>{
    const{state}=useContext(UserContext)
    const [data,setData]=useState(state)
    const commentPost=(id,text)=>{
        fetch("/comment",{
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
            if(state._id===response._id){
                return setData(response)
            }else{
                return setData(state)
            }
          })
    }
    const addComment=(event)=>{
        event.preventDefault()
        commentPost(state._id,event.target[0].value)
    }
    const deleteComment=(commentId)=>{
        fetch(`/deleteComment/${commentId}`,{
            method:"delete",
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("result",result)
            if(state._id===result._id){
                setData(result)
            }else{
                setData(state)
            }
        })
    }
    return(
        <>
         <div className="card" style={{width:"18rem",margin:"18px auto"}}>
            <h5 className="card-title">Comments</h5>
            <div className="card-body">
                {
                data.comments.map(record=>{
                    return(
                        <h6><span>{record.postedby.name} </span>{record.text}
                        {record.postedby._id === state.postedby._id &&
                        <i className="material-icons" type="submit" style={{float:"right"}} onClick={()=>deleteComment(record._id)}>delete</i>}
                        </h6>
                    )
                })
                
            }
            </div>
            <div className='card-footer'>
                    <form onSubmit={(event)=>{
                        addComment(event)
                        
                    }}>
                       <input type="text" placeholder='Add a comment' />
                    </form>
              </div>
              </div></>
    )
}
export default Comments