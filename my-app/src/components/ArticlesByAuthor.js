import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ArticlesByAuthor() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();
  let token = localStorage.getItem('token');
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  let { currentUser } = useSelector(state => state.userAuthoruserAuthorLoginReducer);

  const getArticlesOfCurrentAuthor = async () => {
    try {
      let res = await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`);
      setArticlesList(res.data.payload);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getArticlesOfCurrentAuthor();
  }, []);

  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">
                  {article.content.substring(0, 80) + "...."}
                </p>
                <span onClick={() => readArticleByArticleId(article)}>Read More</span>
                <div className="card-footer">
                  <small className="text-boody-secondary">Last updated on {article.dateofModification}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesByAuthor;
