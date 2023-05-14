import React from "react";
import Header from "../components/Header";
import Message from "../components/Message";
import CardMessage from "../components/CardMessage";
import { useSelector, useDispatch } from "react-redux";

function AuthPage() {
  const { article, loading, success, error, message } = useSelector(
    (state) => state.article
  );

  return (
    <>
      <Header />
      <Message />
      <div>
        {article.length > 0 &&
          article.map((article) => {
            return (
              <CardMessage
                key={article._id}
                id={article._id}
                title={article.title}
                description={article.description}
                body={article.body}
                taglist={article.taglist}
              />
            );
          })}
      </div>
    </>
  );
}

export default AuthPage;
