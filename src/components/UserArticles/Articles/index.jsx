import React from 'react';
import Article from '../../Article';
import Banner from '../../Banner';

const Articles = ({ articles, nextUrl, prevUrl, handlePagination, deleteArticle, editArticle }) => (
  <div>
    <Banner
      backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-gift.jpg)`}
      title="My articles"
      subTitle="Here is articles, created on you"
    />

    <main className="main-content bg-gray">
      <div className="row">
        <div className="col-12 col-lg-6 offset-lg-3">
          {
            articles && articles.map(article => (
              <div key={article.id}>
                <Article article={article} />
                <div className="text-center">
                  <button onClick={() => editArticle(article)} className="btn btn-warning mr-5">Edit article</button>
                  <button onClick={() => deleteArticle(article.id)} className="btn btn-danger">Delete article</button>
                </div>
                <hr />
              </div>
            ))
          }

          <nav className="flexbox mt-50 mb-50">
            <a className={`btn btn-white ${prevUrl ? '' : 'disabled'}`} href="#" onClick={() => handlePagination(prevUrl)}>
              <i className="ti-arrow-left fs-9 ml-4" /> Older
            </a>
            <a className={`btn btn-white ${nextUrl ? '' : 'disabled'}`} href="#" onClick={() => handlePagination(nextUrl)}>
              Newer <i className="ti-arrow-right fs-9 mr-4" />
            </a>
          </nav>
        </div>
      </div>
    </main>
  </div>
);

export default Articles;
