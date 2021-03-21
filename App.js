import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./features/Sidebar";
import Chat from "./features/Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Login from "./features/Login";
import { auth } from "./features/firebase";
import { login, logout } from "./features/userSlice";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout);
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar></Sidebar>
          <Chat></Chat>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
