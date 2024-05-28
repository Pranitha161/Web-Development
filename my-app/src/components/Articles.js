import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { axiosWithtoken } from "../axioswithtoken";

function Articles(){
    const [articleList,setArticlesList]=useState([]);
    let navigate=useNavigate()
    const readArticleByArticleId=(articleobj)=>{
        navigate(`../article/${articleobj.articleId}`,{state:articleobj})
    }
    const getArticles=async()=>{
        let res=await axiosWithtoken.get('http://localhost:4000/user-api/article')
        setArticlesList(res.data.payload)
    }
    useEffect(()=>{
        getArticles()
    },[])

    return (
        <div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
           {articleList.map((article)=>(
            <div className="col" key={article.articleId}>
                <div className="card h-100">
                    <div className=" card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.content.substring(0,80)+" .... "}</p>
                    </div>
                    <button onClick={()=>readArticleByArticleId(article)}><span>Read more</span></button>
                    </div> 
                    <div className="card-footer">
                        <small className="text-body-secondary">Last Update on {article.dateofModification}</small>
                    </div>
                </div>
           ))}
           
           </div>
           
        </div>
    )
}
export default Articles;