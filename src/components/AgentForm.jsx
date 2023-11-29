import { useState } from "react";
import { notifyError, notifySuccess } from "../utils/notifier";
import { Toaster } from "react-hot-toast";
import { BASE_URL } from "../http/axiosInterceptors";
import { useSelector } from "react-redux";
import axios from "axios";

const AgentForm = () => {
  const token = useSelector((state) => state.auth.token);

  const [agentData, setAgentData] = useState({
    photo: null,
    fullname: "",
    mobile: "",
    email: "",
    aadharCard: "",
    dateOfBirth: "", // Use lowercase 'Date' here
    gender: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle special cases like checkbox or radio
    const updatedValue = type === "checkbox" ? e.target.checked : value;

    setAgentData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();

      // Append each form field to the FormData object
      Object.entries(agentData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Make the Axios POST request
      const response = await axios.post(
        `${BASE_URL}/user/agent/create`,
        formData,
        {
          headers: {
            Authorization: token,
            "content-type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Agent added succesfully");
      console.log(response.data);
      window.scrollTo(0, 0);
    } catch (error) {
      notifyError(error.response.data.message);
      console.error(error.response.data.message);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !agentData.fullname ||
      !agentData.email ||
      !agentData.password ||
      !agentData.mobile ||
      !agentData.address ||
      !agentData.dateOfBirth ||
      !agentData.photo
    ) {
      notifyError("Please fill in all required field");
      return;
    } else {
      handleFormSubmit();
    }
  };

  return (
    <>
      <div className="mb-3 mt-2 p-2">
        <h1 className="text-xl font-bold md:text-2xl">Student form</h1>
        <p className="text-sm text-gray-600 font-normal">Agent Signup</p>
      </div>
      <form className="w-full h-full p-2">
        <div className="flex font-light flex-col gap-2">
          {/* basic information */}
          <div className="flex flex-col">
            <label className="text-xs mb-1 text-gray-700 required--field ">
              Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/png, image/jpeg"
              className="file-input file-input-sm file-input-bordered w-full max-w-xs md:file-input-md md:max-w-none"
              onChange={(e) =>
                setAgentData({ ...agentData, photo: e.target.files[0] })
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs mb-1 text-gray-700 required--field ">
              Fullname
            </label>
            <input
              name="fullname"
              value={agentData.firstname}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Peter"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label className="text-xs mb-1 text-gray-700 required--field ">
              Password
            </label>
            <input
              name="password"
              value={agentData.password}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              type="password"
              placeholder="atleast 1 capital, 1 number, 1 special charecter"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-xs mb-1 text-gray-700 required--field ">
              Email
            </label>
            <input
              name="email"
              value={agentData.email}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              type="email"
              placeholder="peter@email.com"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label className="text-xs mb-1 text-gray-700 required--field ">
              Mobile
            </label>
            <input
              name="mobile"
              value={agentData.mobile}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              type="number"
              placeholder="9988776611"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-xs mb-1 text-gray-700 required--field ">
              Date Of Birth
            </label>
            <input
              name="dateOfBirth"
              value={agentData.dateOfBirth}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              type="date"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-xs mb-1 text-gray-700 required--field ">
              Address
            </label>
            <input
              name="address"
              value={agentData.address}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              type="text"
              placeholder="Street Area City Pin"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="btn w-fit px-10 my-4 btn-sm btn-active btn-success text-white md:btn-md"
        >
          {"Signup"}
        </button>
      </form>
      <Toaster />
    </>
  );
};

export default AgentForm;
