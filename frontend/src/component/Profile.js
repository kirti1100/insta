import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext, baseURL } from "../App"
const Profile = () => {
    const {state,dispatch}=useContext(UserContext)
    const [posts,setPosts]=useState(null)
    useEffect(()=>{
        fetch(baseURL+"/mypost",{
           
            headers:{
                "Authorization":"bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("posts",state)
            setPosts(result.myposts)
        })
    },[])
    return (
        <>
        <>{console.log("state posts",state)}</>
        { posts ? <div style={{ maxWidth: "550px", margin: "0px auto" }}>
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px"
        }}>
            <div>
               <Link to="/addProfile">
                <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src={state.picture}/>
                </Link>           
            </div>
            <div>
                <h3>{state.name}</h3>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    width: "108%"
                }}>
                    <Link to="/myposts" style={{color:"black"}}><h5>{posts.length} posts</h5></Link>
                    <Link to="/followers" ><h5>{state.followers.length} followers </h5></Link>
                    <h5>{state.following.length} following</h5>
                </div>
                <div>
                    <h5>Big Sur</h5>
                    <h5>welcome to my profile</h5>
                </div>


            </div>

        </div>
        <div className='status'>
            {/* <figure className="figure">
            <img style={{ width: "100px", height: "100px", borderRadius: "50px" }} src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60" />
            <figcaption className="figure-caption">looks</figcaption>
            </figure> */}
        </div>
        <div className='gallery'>
            {
                posts.map(item=>{
                    return(
                        <Link to={"/myposts"}>
                        <img key={item._id} className="item" src={item.picture} alt={item.title}/>
                        </Link>
                    )
                })
            }
        </div>
    </div> : <h1>Loading.......</h1>}
    </>
        
    )

}
export default Profile;