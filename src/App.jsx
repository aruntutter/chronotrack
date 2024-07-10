import React from "react";
import SignUp from "./components/auth/signUp/SignUp";
import SignIn from "./components/auth/signIn/SignIn";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostHome from "./components/postHome/PostHome";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posthome" element={<PostHome />} />
      </Routes>
    </Router>
  );
};

export default App;
