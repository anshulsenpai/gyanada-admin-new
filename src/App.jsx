/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { userRequest } from "./http/axiosInterceptors";
import RecentStudents from "./components/RecentStudents";

const App = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAgents: 0,
    totalStudents: 0,
    totalEvents: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const response = await userRequest.get("/dashboard");
        setDashboardData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen h-full">
        {/* breadcrum */}
        <div className="mb-6">
          <h1>
            <NavLink to="/">
              <i className="fa-solid fa-house text-sm text-gray-600"></i>
            </NavLink>
            {" > "}
            <NavLink to="/" className="text-sm text-gray-600">
              Dashboard
            </NavLink>
          </h1>
        </div>
        <main className="w-full h-full">
          {/* Total agents, total students, birthdays today */}
          <div className="stats shadow w-full mb-6">
            <div className="stat place-items-center">
              <div className="stat-title">Agents</div>
              <div className="stat-value">{dashboardData.totalAgents}</div>
              <div className="stat-desc">Total agents registered</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Students</div>
              <div className="stat-value text-secondary">
                {dashboardData.totalStudents}
              </div>
              <div className="stat-desc text-secondary">
                Total students added
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Events</div>
              <div className="stat-value">{dashboardData.totalEvents}</div>
              <div className="stat-desc">What's special today</div>
            </div>
          </div>
          <h1 className="mb-4 font-semibold">Recently added students</h1>
          {/* recently added students */}
          <RecentStudents />
        </main>
      </div>
      <Toaster />
    </>
  );
};

export default App;
