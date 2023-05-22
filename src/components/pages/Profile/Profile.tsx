import React, { useEffect, useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import "./Profile.css";
import Header from "../../layout/Header";
import ProfileModal from "./ProfileModal";
import Footer from "../../layout/Footer";
import getUserData from "../../../services/getUserData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setUser } from "../../../redux/reducers/userSlice";
import getLikesAmount from "../../../services/getLikesAmount";
import getWorkoutsAmount from "../../../services/getWorkoutAmount";

const Profile = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.data);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = localStorage.getItem("accessToken");
  const [totalLikes, setTotalLikes] = useState<number>();
  const [totalWorkouts, setTotalWorkouts] = useState<number>();

  useEffect(() => {
    reloadUserData();
    fetchWorkoutCount();
    fetchLikeCount();
  }, []);

  console.log("totalLikes:", totalLikes, "totalWorkouts", totalWorkouts);

  const reloadUserData = async () => {
    if (accessToken) {
      const reloadData = await getUserData(accessToken);
      dispatch(setUser(reloadData));
    }
  };

  const fetchWorkoutCount = async () => {
    const likesAmount = await getWorkoutsAmount();
    setTotalWorkouts(likesAmount.count);
  };

  const fetchLikeCount = async () => {
    const workoutAmount = await getLikesAmount();
    setTotalLikes(workoutAmount.totalLikes);
  };

  return (
    <Container fluid className="image-background p-0">
      <div className="second-layer">
        <div className="header-correction">
          <Header></Header>
        </div>
        <Row className="profile-image-row d-flex justify-content-center">
          <Card className="profile-card">
            <Card.Img
              className="d-none d-sm-block card-profile-img"
              variant="top"
              src={userData?.avatar}
            />
            <Card.Body>
              <Card.Title>
                <span className="highlight">Name:</span>{" "}
                <span>{userData?.username}</span>
              </Card.Title>
              <Card.Text>
                <Row className="d-flex justify-content-between profile-row mt-3">
                  <span className="highlight">Workout Likes:</span>
                  <span className="ml-auto">{totalLikes}</span>
                </Row>

                <Row className="d-flex justify-content-between profile-row mt-3">
                  <span className="highlight">Workouts:</span>{" "}
                  <span>{totalWorkouts}</span>
                </Row>
              </Card.Text>
              <PencilSquare
                onClick={handleShow}
                className="ml-auto mt-4 edit-btn"
                size={30}
              ></PencilSquare>
            </Card.Body>
          </Card>
        </Row>
        <div className="footer-div">{/*     <Footer /> */}</div>
      </div>
      {userData && (
        <ProfileModal
          show={show}
          handleClose={handleClose}
          userImage={userData?.avatar}
          userName={userData?.username}
          userId={userData._id}
          reloadData={reloadUserData}
        ></ProfileModal>
      )}
    </Container>
  );
};

export default Profile;
