import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Profile from "./components/pages/Profile/Profile";
import CreateWorkout from "./components/pages/CreateWorkout/CreateWorkout";
import FindWorkout from "./components/pages/FindWorkouts/FindWorkout";
import YourWorkouts from "./components/pages/YourWorkouts/YourWorkouts";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import Progress from "./components/pages/Progress/Progress";
import Register from "./components/pages/Register/Register";
import NotFound from "./components/pages/NotFound/NotFound";
import Login from "./components/pages/Login/Login";
import { RotatingLines } from "react-loader-spinner";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
    setIsLoading(false); // Set loading to false after we've checked for token
  }, []);

  if (isLoading) {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/login" />
          }
        />
        <Route path="/" element={!isLoggedIn && <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/your-workouts"
          element={isLoggedIn ? <YourWorkouts /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-workout"
          element={isLoggedIn ? <CreateWorkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-workout/:workout_id"
          element={isLoggedIn ? <CreateWorkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-workout/:workout_id/:importParam"
          element={isLoggedIn ? <CreateWorkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/find-workouts"
          element={isLoggedIn ? <FindWorkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <ContactUs /> : <Navigate to="/login" />}
        />
        <Route
          path="/progress"
          element={isLoggedIn ? <Progress /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
