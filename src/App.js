import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import './App.css';
import ChatPage from "./pages/chatPage/ChatPage";
import HomePage from "./pages/homePage/HomePage";
import { getLoggedInStatus } from "./redux/auth/authService";
import { SET_LOGIN } from "./redux/auth/authSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loggedInStatus() {
      const status = await getLoggedInStatus();
      await dispatch(SET_LOGIN(status))
    };
    loggedInStatus();
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
