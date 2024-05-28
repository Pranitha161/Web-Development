import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Addarticle() {
  const { register, handleSubmit } = useForm();
  let [err,setErr]=useState("");
    let {currentUser}=useSelector((state)=>state.userAuthoruserAuthorLoginReducer)
    let navigate=useNavigate()
    let token=localStorage.getItem('token')
    const axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
      })
 const postNewArticle=async(article)=>{
    article.dateofCreation=new Date();
    article.dateofModification=new Date();
    article.articleId=Date.now();
    article.username=currentUser.username;
    article.comments=[];
    article.status=true;
    console.log(article)
  
    let res=await axiosWithToken.post('http://localhost:4000/author-api/article',article)
    if(res.data.Message==="New Article created"){
        navigate(`/authorprofile/articles-by-author/${currentUser.username}`)
    }else{
        setErr(res.data.Message)
    }
 }

  return (
    <div className="container mt-5">
      <h1 className="display-4 text-center text-success">Add Article</h1>
      <form className="w-50 mx-auto mt-4" onSubmit={handleSubmit(postNewArticle)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Article Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          />
        </div>
        <div className='mb-3'>
            <label htmlFor='category' className='form-label'>Select a category</label>
            <select {...register("category")} id='category' className='form-select'>
                <option value="programming">Programming</option>
                <option value="AI&ML">AI&ML</option>
                <option value="database">Database</option>
            </select>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            {...register("content", { required: true })}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Post</button>
        
      </form>
    </div>
  );
}

export default Addarticle;
