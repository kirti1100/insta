import React ,{useState,useEffect,useContext}from 'react'
import {UserContext,baseURL} from "../App"
import {useParams} from "react-router-dom"
const UserProfile = () => {
    const {state,dispatch}=useContext(UserContext)
    const [profile,setProfile]=useState(null)
    const {userId}=useParams()
    useEffect(()=>{
        fetch(baseURL+`/user/${userId}`,{
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("result",result)
            setProfile(result)
        })
    },[])

    const followers=()=>{
        fetch(baseURL+"/follow",{
            method:"put",
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                followId:userId
            })
        }).then(res=>res.json())
        .then(result=>{
            dispatch({type:"UPDATED",payload:{followers:result.logedinUser.followers, following: result.logedinUser.following}})
            localStorage.setItem("user",JSON.stringify(result.logedinUser))
            console.log("result",result,"profile",profile)
            setProfile((prevState)=>{
               return{
                ...prevState,
                user:result.user
               } 
            })
            
        })
    }

    const unFollow=()=>{
        fetch(baseURL+"/unFollow",{
            method:"put",
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                unFollowId:userId
            })
        }).then(res=>res.json())
        .then(result=>{
            dispatch({type:"UPDATED",payload:{followers:result.logedinUser.followers, following: result.logedinUser.following}})
            localStorage.setItem("user",JSON.stringify(result.logedinUser))
            console.log("result",result,"profile",profile)
            setProfile((prevState)=>{
               return{
                ...prevState,
                user:result.user
               } 
            })
            
        })
    }
    return (
        <>
        {profile? <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src="https://images.unsplash.com/photo-1530577197743-7adf14294584?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div>
                    <h3>{profile.user.name}</h3>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "108%"
                    }}>
                        <h5>{profile.post.length} posts</h5>
                        <h5>{profile.user.followers.length} followers</h5>
                        <h5>{profile.user.following.length} following</h5>
                    </div>
                    <div>
                        <h5>Big Sur</h5>
                        <h5>welcome to my profile</h5>
                    </div>
                    {profile.user.followers.includes(state._id)?<button type="submit" className="btn btn-primary" onClick={()=>unFollow()}>
                       UnFollow
                    </button>:<button type="submit" className="btn btn-primary" onClick={()=>followers()}>
                       Follow
                    </button>}
                    
                    

                </div>

            </div>
            <div className='status'>
                <figure className="figure">
                <img style={{ width: "100px", height: "100px", borderRadius: "50px" }} src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" />
                <figcaption className="figure-caption">looks</figcaption>
                </figure>
                <figure className="figure">
                <img style={{ width: "100px", height: "100px", borderRadius: "50px" }} src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" />
                <figcaption className="figure-caption">looks</figcaption>
                </figure>
                <figure className="figure">
                <img style={{ width: "100px", height: "100px", borderRadius: "50px" }} src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" />
                <figcaption className="figure-caption">looks</figcaption>
                </figure>
                <figure className="figure">
                <img style={{ width: "100px", height: "100px", borderRadius: "50px" }} src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" />
                <figcaption className="figure-caption">looks</figcaption>
                </figure>
            </div>
            <div className='gallery'>
                {
                    profile.post.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.picture} alt={item.title}/>
                        )
                    })
                }
            </div>
        </div>:<h2>LOADING!....</h2>}</>
        
    )

}
export default UserProfile;