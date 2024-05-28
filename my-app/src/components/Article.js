import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { axiosWithtoken } from "../axioswithtoken";
// import { axiosWithtoken } from "../axioswithtoken";


function Article(){
    const {state}=useLocation();
    let navigate=useNavigate()
    let token=localStorage.getItem('token')
    const axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
      })
    let {register,handleSubmit}=useForm();
    let [comment,setComment]=useState("");
    let {currentUser}=useSelector((state)=>state.userAuthoruserAuthorLoginReducer);
    let [currentArticle,setCurrentArticle]=useState(state);
    let [articleEditStatus,setArticleEditStatus]=useState(false);
    const writeComment=async(commentobj)=>{
        commentobj.username=currentUser.username;
        let res=axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,commentobj);
        if(res.data.Message==="Comment successfully added"){
            console.log("successfull")
            setComment(res.data.Message)
        }

    }
    const enableedit=()=>{
        setArticleEditStatus(true)
    }
    const deleteArticle=async()=>{
        let art={...currentArticle};
        delete art._id;
        console.log(art)
        let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
        if(res.data.Message==='article deleted'){
            setCurrentArticle({...currentArticle,status:res.data.payload})
        }
       
    }
    const restoreArticle=async()=>{
        let art={...currentArticle}
        delete art._id;
        let res=await axiosWithToken.put(`http://localhost:4000/author-api/article/${currentArticle.articleId}`,art)
        if(res.data.Message==='article restored'){
            setCurrentArticle({...currentArticle,status:res.data.payload})
        }
        
    }
    const modifiedArticle=async(editedArticle)=>{
        let modifiedArticle={...state,...editedArticle}
        modifiedArticle.dateofModification=new Date();
        delete modifiedArticle._id;
        console.log(modifiedArticle)
        let res=await axiosWithToken.put("http://localhost:4000/author-api/article",modifiedArticle);
        if(res.data.Message=== "Article modified"){
            setArticleEditStatus(false)
            navigate(`/authorprofile/article/${modifiedArticle.articleId}`,{state:res.data.article})
        }
        
    }
   
   
    
    return(
        <div>
           {articleEditStatus === false ? (
                <>
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="display-3">{currentArticle.title}</p>
                            <span className="py-3">
                                <small>Created on: {currentArticle.dateofCreation}</small>
                                <small>Modified on: {currentArticle.dateofModification}</small>
                            </span>
                            {currentUser.usertype === 'author' && (
                                <>
                                    <button className="btn btn-primary" onClick={enableedit}>Edit</button>
                                    {state.status===true?(
                                    <button type="submit" className="btn btn-primary" onClick={deleteArticle}>Delete</button>):(
                                    <button type="submit" className="btn btn-warning" onClick={restoreArticle}>Restore</button>)}
                                </>
                            )}
                            <div>
                                <p className="lead mt-3" style={{ whiteSpace: "pre-line" }}>{currentArticle.content}</p>
                                <div className="comments my-4">
                                    {currentArticle.comments.length === 0 ? (
                                        <p className="display-3">No comments yet...</p>
                                    ) : (
                                        currentArticle.comments.map((commentobj, ind) => (
                                            <div key={ind} className="bg-light p-3">
                                                <p className="fs-4">{commentobj.username}</p>
                                                <p>{commentobj.comment}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {currentUser.usertype === 'user' && (
                                    <form onSubmit={handleSubmit(writeComment)}>
                                        <input type="text" {...register("comment")} className="form-control" placeholder="Write comment here..." />
                                        <button type="submit" className="btn btn-success">Add comment</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSubmit(modifiedArticle)}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" {...register("title", { required: true })} defaultValue={state.title} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="category">Category</label>
                        <select className="form-select" id="category" {...register("category", { required: true })} defaultValue={state.category}>
                            <option value="programming">Programming</option>
                            <option value="AI&ML">AI&ML</option>
                            <option value="database">Database</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea className="form-control" {...register("content", { required: true })} defaultValue={state.content}></textarea>
                    </div>
                    <button className="btn btn-success" type="submit">Save</button>
                </form>
            )}
        
        </div>
    )
}
export default Article;
