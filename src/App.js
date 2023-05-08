//2:02
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from './component/navBar/NavBar';
import LeftBar from './component/leftBar/LeftBar'; //change convention if won't work
import RightBar from './component/rightBar/RightBar';
import "./style.scss"
import { useContext } from 'react';
// import { DarkModeContextProvider } from './context/darkModeContext';

import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from './context/authContext';



function App() {

  // const currentUser = false;
  const {currentUser} = useContext(AuthContext)

  const {darkMode}=useContext(DarkModeContext)
  

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{flex:6}}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/Login" />
    } else {
      return children
    }
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]

    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    }
  ]);
  return (
    // <DarkModeContextProvider>
    <div>
      <RouterProvider router={router} />
    </div>
    // </DarkModeContextProvider>
  );
}

export default App;
