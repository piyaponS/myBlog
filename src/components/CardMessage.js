import { Card, Row, Col, Button } from "react-bootstrap";
import Avatar from "react-nice-avatar";
import classes from "./CardMessage.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { favoriteArticle } from "../features/articles/articlesSlice";
import { resetArticles } from "../features/articles/articlesSlice";

function CardMessage(props) {
  const { user } = useSelector((state) => state.auth);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [favorited, setFavorited] = useState(props.favorited);
  const [favoritesCount, setFavoritesCount] = useState(props.favoritesCount);
  const dispatch = useDispatch();
  const springPropsButton = useSpring({
    scale: favoritesCount.includes(user._id) ? 1.1 : 1,
  });

  const navigate = useNavigate();
  const convertTime = (time) => {
    const date = new Date(time);
    const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return dateTimeFormat.format(date);
  };

  useEffect(() => {
    dispatch(resetArticles());

    setFavorited(props.favorited);
    setFavoritesCount(props.favoritesCount);
  }, [props.favorited, props.favoritesCount]);

  const clickProfileHandler = () => {
    user._id === props.userId
      ? navigate(`/auth/profile/${user._id}`)
      : navigate(`/auth/profile/friends/${props.userId}`);
  };
  const favoriteHandler = async () => {
    if (buttonDisabled) {
      return;
    }
    setButtonDisabled(true);

    const updatedFavoritesCount = favoritesCount.includes(user._id)
      ? favoritesCount.filter((id) => id !== user._id)
      : [...favoritesCount, user._id];

    setFavorited(
      favoritesCount.includes(user._id) ? favorited - 1 : favorited + 1
    );
    setFavoritesCount(updatedFavoritesCount);

    try {
      await dispatch(
        favoriteArticle({
          _id: props.id,
          userId: user._id,
        })
      );
    } catch (error) {
    } finally {
      setButtonDisabled(false);
    }
  };

  const clickArticleHandler = () => {
    navigate(`/auth/article/${props.slug}`);
  };

  return (
    <Card style={{ width: "70%" }} className="mt-4 ms-5">
      <Card.Header>
        <Row>
          <Col sm="1">
            <div onClick={clickProfileHandler}>
              <Avatar
                style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
                faceColor={props.faceColor}
                hairStyle={props.hairStyle}
                hatStyle={props.hatStyle}
                glassesStyle={props.glassesStyle}
                eyeBrowStyle={props.eyeBrowStyle}
                eyeStyle={props.eyeStyle}
                earSize={props.earSize}
                noseStyle={props.noseStyle}
                mouthStyle={props.mouthStyle}
                shirtStyle={props.shirtStyle}
                hairColor={props.hairColor}
                shirtColor={props.shirtColor}
                bgColor={props.bgColor}
                className="mt-2"
              />
            </div>
          </Col>

          <Col sm="9">
            <Row>
              <p style={{ margin: "0", padding: "0" }}>
                <span
                  className={classes.hoverLetter}
                  onClick={clickProfileHandler}
                >
                  {props.name}
                </span>
              </p>
            </Row>
            <Row>{convertTime(props.createdAt)}</Row>
          </Col>
          <Col sm="2">
            <animated.div style={springPropsButton}>
              <Button
                variant="dark"
                className="mt-2 ms-4"
                size="md"
                style={{ width: "70%" }}
                onClick={favoriteHandler}
              >
                <FaHeart
                  className="mb-1 me-1"
                  style={{
                    color: favoritesCount.includes(user._id) ? "red" : "",
                  }}
                />{" "}
                {favorited}
              </Button>
            </animated.div>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ cursor: "pointer" }} onClick={clickArticleHandler}>
          {props.description}
        </Card.Title>
        <Card.Text>{props.body}</Card.Text>
        <Card.Text>{props.taglist}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <p>Comment</p>
      </Card.Footer>
    </Card>
  );
}

export default CardMessage;
