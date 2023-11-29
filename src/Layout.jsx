import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "./redux/authSlice";
import { notifySuccess } from "./utils/notifier";
import { useEffect, useState } from "react";
import { userRequest } from "./http/axiosInterceptors";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [greeting, setGreeting] = useState("");
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    const shouldLogout = window.confirm("Do you want to logout?");

    if (shouldLogout) {
      dispatch(logout());
      notifySuccess("You are logged out!");
      navigate("/login");
    }
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          setTimeout(() => navigate("/login"), 2000);
        } else {
          const response = await userRequest.get("/my-profile");
          dispatch(setUser(response.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [token]);

  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-full min-h-screen h-full flex justify-between overflow-hidden bg-gray-100">
      <nav className="max-w-[247px] w-full min-h-screen bg-orange-100 flex flex-col items-center p-4">
        <div className="w-28 mb-10">
          <img src={logo} alt="logo" />
        </div>
        {/* nav link list */}
        <ul className="w-full">
          <li>
            <NavLink
              className="w-full flex justify-start items-center gap-3 mb-4 py-2 px-4 rounded-lg hover:bg-white duration-200 ease"
              to="/"
            >
              <i className="fas fa-chart-bar icon text-lg text-indigo-950"></i>
              <span className="text-gray-800 font-semibold">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="w-full flex justify-start items-center gap-3 mb-4 py-2 px-4 rounded-lg hover:bg-white duration-200 ease"
              to="/agent-manager"
            >
              <i className="fa-solid fa-user-large text-lg text-indigo-950"></i>
              <span className="text-gray-800 font-semibold">Agent Manager</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="w-full flex justify-start items-center gap-3 mb-4 py-2 px-4 rounded-lg hover:bg-white duration-200 ease"
              to="/student-manager"
            >
              <i className="fa-solid fa-user-graduate text-lg text-indigo-950"></i>
              <span className="text-gray-800 font-semibold">
                Student Manager
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="w-full flex justify-start items-center gap-3 mb-4 py-2 px-4 rounded-lg hover:bg-white duration-200 ease"
              to="/events"
            >
              <i className="fa-solid fa-calendar-days text-lg text-indigo-950"></i>
              <span className="text-gray-800 font-semibold">Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="w-full flex justify-start items-center gap-3 mb-4 py-2 px-4 rounded-lg hover:bg-white duration-200 ease"
              to="/profile"
            >
              <i className="fa-solid fa-user text-lg text-indigo-950"></i>
              <span className="text-gray-800 font-semibold">Profile</span>
            </NavLink>
          </li>
          <li>
            <button
              className="w-full flex justify-start items-center gap-3 mb-4 py-2 px-4 rounded-lg hover:bg-white duration-200 ease"
              onClick={() => handleLogout()}
            >
              <i className="fa-solid fa-right-from-bracket text-lg text-indigo-950"></i>
              <span className="text-gray-800 font-semibold">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className="w-full h-full">
        <header className="w-full h-20 header--shadow sticky top-0 p-4 flex justify-between items-center bg-white">
          <h1 className="text-xl font-semibold text-gray-700">{greeting}</h1>
          <div>
            <Link
              className="btn btn-sm btn-neutral"
              to="/profile"
            >
              <i className="fa-regular fa-user"></i>
              {user.fullname ? (
                <span className="ml-2">{user.fullname}</span>
              ) : (
                <span className="loading loading-dots ml-4 loading-xs">L</span>
              )}
            </Link>
          </div>
        </header>
        <div className="w-full min-h-screen h-full p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
