import React ,{useState,useEffect,useContext}from 'react'
import {UserContext} from "../App"
import {useNavigate,Link} from "react-router-dom"

const Home = () => {
    const navigate=useNavigate();
    const [data,setData]=useState([])
    const{state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch("/allpost",{
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])
    const likePost=(id)=>{
        fetch("/likes",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId:id
            })
        }).then(res=>res.json())
          .then(response=>{
            const newData=data.map(item=>{
                if(item._id===response._id){
                    return response
                }else{
                    return item
                }
            })
            setData(newData)
            console.log("response",response,"data",data)
          })
    }
    const unLikePost=(id)=>{
        fetch("/unLike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               postId:id
            })
        }).then(res=>res.json())
          .then(response=>{
            const newData=data.map(item=>{
                if(item._id===response._id){
                    return response
                }else{
                    return item
                }
            })
            setData(newData)
            console.log("response2",response)
          })
    }
    
   const comments=(item)=>{
    dispatch({type:"comment",payload:item})
    navigate("/comment")
    
   }
   const deletePost=(postId)=>{
    console.log("deleted",typeof(postId))
    fetch(`/delete/${postId}`,{
        method:"delete",
        headers:{
            "Authorization":"bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData=data.filter(item=>{
            if(item._id!==result._id){
                return item
            }
        })
        setData(newData)
    })

   }
    return (
        <div>
            {
                data.map(item=>{
                    return(
                        <div className="card" style={{width:"18rem",margin:"18px auto"}}>
                <h5 className="card-title"><Link to={"/userProfile/"+item.postedby._id}>{item.postedby.name}</Link>
                {item.postedby._id===state._id && <i className="material-icons" type="submit" style={{float:"right"}} onClick={()=>deletePost(item._id)}>delete</i>
                }
                </h5>
                <div className="card-body">
                <img className="card-img-top" src={item.picture} />

                    <p className="card-text">{item.body}</p>
                   {item.likes.includes(state._id)?
                   <i className="material-icons material-symbols-outlined" style={{color:"black"}} type="submit" onClick={()=>unLikePost(item._id)}>favorite</i> :
                   <i className="material-icons" type="submit" style={{color:"red"}} onClick={()=>likePost(item._id)}>favorite</i>}
                   <i className="material-icons" type="submit"  onClick={()=>comments(item)}>comment</i>
                   
                </div>
                
            </div>

                    )
                })
            }
            
           
        </div>

    )

}

export default Home;