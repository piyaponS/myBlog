import React, { useEffect } from "react";
import Header from "../components/Header";
import Message from "../components/Message";
import CardMessage from "../components/CardMessage";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import classes from "./AuthPage.module.css";

function AuthPage() {
  const { article, loading, error, message } = useSelector(
    (state) => state.article
  );

  useEffect(() => {
    if (error) {
      console.error(message);
    }
  });

  return (
    <>
      <Header />
      <Message />
      {loading ? (
        <div className={classes.spinner}>
          <Spinner size="lg" animation="border" />
        </div>
      ) : (
        <div>
          {article.length > 0 &&
            article.map((article) => {
              return (
                <CardMessage
                  key={article._id}
                  id={article._id}
                  name={article.name}
                  title={article.title}
                  description={article.description}
                  body={article.body}
                  taglist={article.taglist}
                  faceColor={article.faceColor}
                  hairStyle={article.hairStyle}
                  hatStyle={article.hatStyle}
                  glassesStyle={article.glassesStyle}
                  eyeBrowStyle={article.eyeBrowStyle}
                  eyeStyle={article.eyeStyle}
                  earSize={article.earSize}
                  noseStyle={article.noseStyle}
                  mouthStyle={article.mouthStyle}
                  shirtStyle={article.shirtStyle}
                  hairColor={article.hairColor}
                  shirtColor={article.shirtColor}
                  bgColor={article.bgColor}
                />
              );
            })}
        </div>
      )}
    </>
  );
}

export default AuthPage;
