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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);
  console.log("isLoggedIn:", isLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/profile"
          element={
            isLoggedIn ? <Profile /> : <Navigate to="/login" replace={true} />
          }
        />

        <Route
          path="/your-workouts"
          element={
            isLoggedIn ? (
              <YourWorkouts />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/create-workout"
          element={
            isLoggedIn ? (
              <CreateWorkout />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />
        <Route
          path="/create-workout/:workout_id"
          element={
            isLoggedIn ? (
              <CreateWorkout />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/find-workouts"
          element={
            isLoggedIn ? (
              <FindWorkout />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        />

        <Route
          path="/contact"
          element={
            isLoggedIn ? <ContactUs /> : <Navigate to="/login" replace={true} />
          }
        />

        <Route
          path="/progress"
          element={
            isLoggedIn ? <Progress /> : <Navigate to="/login" replace={true} />
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
