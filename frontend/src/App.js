import React from "react";
import Reports from "./pages/Reports";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";

import Home from "./pages/Home";

import ResumePage from "./pages/ResumePage";

import MockInterviewPage from "./pages/MockInterviewPage";

import Login from "./pages/Login";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<SplashScreen />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/resume"
          element={<ResumePage />}
        />

        <Route
          path="/mock"
          element={<MockInterviewPage />}
        />

        <Route
        path="/reports"
        element={<Reports />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;