import React from "react";
import { useParams } from "react-router-dom";

function ArticlePage() {
  const { slug } = useParams();
  return <div>ArticlePage</div>;
}

export default ArticlePage;
