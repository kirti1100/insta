import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext, baseURL } from "../App";

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const { value, dispatched } = useContext(UserContext)
    const [comment, setComment] = useState("")
    const [data1, setData1] = useState(value)
    useEffect(() => {
        fetch(baseURL + "/allpost", {
            method: "get",
            headers: {
                "Authorization": "bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log("check home date, result", result);
                setData(result.posts)
            })
    }, [])
    const likePost = (id) => {
        fetch(baseURL + "/likes", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(response => {
                const newData = data.map(item => {
                    if (item._id === response._id) {
                        return response
                    } else {
                        return item
                    }
                })
                setData(newData)
                console.log("response", response, "data", data,"state",state)
            })
    }
    const unLikePost = (id) => {
        console.log("unlike triggered");
        fetch(baseURL + "/unLike", {

            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(response => {
                const newData = data.map(item => {
                    if (item._id === response._id) {
                        return response
                    } else {
                        return item
                    }
                })
                setData(newData)
                console.log("response2", response)
            })
    }

    const comments = (item) => {
        dispatched({ type: "comment", payload: item })
        console.log("home item",item);
        navigate("/comment")

    }
    const deletePost = (postId) => {
        console.log("deleted", typeof (postId))
        fetch(baseURL + `/delete/${postId}`, {
            method: "delete",
            headers: {
                "Authorization": "bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    if (item._id !== result._id) {
                        return item
                    }
                })
                setData(newData)
            })

    }
    const addComment = (event, value) => {
        event.preventDefault()
        if (value) {
            //commentPost(data1._id, value);
            document.getElementById('formExample').value = ''
        }
    }
    return (
        <>
            <>{console.log("data checking", data)}</>
            {
                data ? <div>
                    {
                        data.map(item => {
                            return (
                                <div className='status' style={{ width: "30rem", margin: "15px auto" }}>
                                    <div style={{ width: "30rem", margin: "15px auto" }}>
                                        <div style={{marginBottom:"30px"}}>
                                            <img style={{ width: "30px", height: "24px", borderRadius: "30px", float: "left" }} src={item.postedby.picture} />
                                            {item.postedby._id !== state._id ?
                                                <Link to={"/userProfile/" + item.postedby._id} style={{ color: "black", float: "left", marginLeft: "4px" }}>{item.postedby.name}</Link>
                                                : <Link to={"/profile"} style={{ color: "black", float: "left", marginLeft: "4px" }}>{item.postedby.name}</Link>}
                                            <i className="material-icons material-symbols-outlined" type="submit" style={{ float: "right" }}>more_horiz</i>
                                            {item.postedby._id === state._id && <i className="material-icons" type="submit" style={{ float: "right" }} onClick={() => deletePost(item._id)}>delete</i>
                                            }
                                        </div>
                                        <div className="card" style={{ width: "30rem", margin: "15px auto" }}>
                                            <div className="card-body">
                                                <img className="card-img-top" src={item.picture} />
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                                    {item.likes.includes(state._id) ?
                                                        <i className="material-icons material-symbols-outlined" style={{ color: "red", float: "left" }} type="submit" onClick={() => unLikePost(item._id)}>favorite</i> :
                                                        <i className="material-icons material-symbols-outlined" type="submit" style={{ color: "black", outlineColor: "black", float: "left" }} onClick={() => likePost(item._id)}>favorite_border</i>
                                                    }
                                                    <i className="material-icons material-symbols-outlined" type="submit" onClick={() => comments(item)} style={{ float: "left" }}>comment</i>
                                                    <i className="material-icons material-symbols-outlined" type="submit" style={{ float: "left" }}>near_me</i>
                                                    <i className="material-icons material-symbols-outlined" type="submit" style={{ float: "right" }}>turned_in_not</i>
                                        </div>
                                        <div style={{width: "30rem",textAlign:"left",display:"flex" }} >
                                            {(item.likes).length}likes
                                        </div>
                                        <div style={{width: "30rem",textAlign:"left",display:"flex" }}>
                                            {item.postedby._id !== state._id ?
                                                <Link to={"/userProfile/" + item.postedby._id} style={{ color: "black" }}><b>{item.postedby.name}</b></Link>
                                                : <Link to={"/profile"} style={{ color: "black" }}><b>{item.postedby.name}</b></Link>}
                                            <p className="card-text" style={{marginLeft:"4px"}}>{item.body}</p>
                                    </div>
                                    <div style={{width: "30rem",textAlign:"left",display:"flex" }} >
                                            <h6 onClick={() => comments(item)}>View all {(item.comments).length} comments</h6>
                                    </div>
                                    <div style={{width: "30rem",textAlign:"left"}} >
                                    <input style={{border:"0px", outline:"0"}} type="text" id='formExample' placeholder='Add a comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                                    <button className="primary" style={{ float:"right",border:"0px", outline:"0",backgroundColor:"transparent"}} onClick={(event) => { addComment(event, comment) }} >Post</button>
                                        </div>
                                        
                                    </div>
                                    
                                    
                                </div>
                            )
                        })

                    }


                </div> : <h1>Loading</h1>

            }

        </>
    )

}

export default Home;