import { useState } from "react";
import { notifyError, notifySuccess } from "../utils/notifier";
import { Toaster } from "react-hot-toast";
import { BASE_URL } from "../http/axiosInterceptors";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";

const StudentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const location = useLocation().search;

  const token =
    useSelector((state) => state.auth.token) || location.split("=")[1];

  const [studentData, setStudentData] = useState({
    photo: null,
    firstname: "",
    middlename: "",
    lastname: "",
    phone: "",
    email: "",
    aadharCard: "",
    dateOfBirth: "", // Use lowercase 'Date' here
    gender: "",
    buidlingHouseNo: "",
    streetColony: "",
    cityVillageSuburb: "",
    tehsilBlock: "",
    district: "",
    pincode: "",
    schoolCollegeName: "",
    schoolCollegeAddress: "",
    qualification: "",
    mediumOfSchool: "",
    stream: "",
    occupation: "",
    physicallyChalleneged: "",
    natureOfDisability: "",
    proofOfIdentity: "",
  });

  const qualificationOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
    { value: "FYToTY", label: "FY to TY" },
    { value: "Diploma", label: "Diploma" },
    { value: "Graduate", label: "Graduate" },
    { value: "PostGraduate", label: "Post Graduate" },
    { value: "Others", label: "Others" },
  ];

  const occupationOptions = [
    "School Student",
    "Collegian",
    "Teacher",
    "Employee",
    "Self Employed",
    "Housewife",
    "Unemployed",
    "Retired",
    "Farmer",
    "Govt/Semi-Govt Employee",
    "Industrial Worker",
    "Building Construction Worker",
    "Senior Citizen",
    "Trader",
    "Other",
    "Applicant of Competitive Exams",
  ];

  //   const token = useSelector((state) => state.auth.token);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle special cases like checkbox or radio
    const updatedValue = type === "checkbox" ? e.target.checked : value;

    setStudentData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();

      // Append each form field to the FormData object
      Object.entries(studentData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Make the Axios POST request
      const response = await axios.post(
        `${BASE_URL}/student/create`,
        formData,
        {
          headers: {
            Authorization: token,
            "content-type": "multipart/form-data",
          },
        }
      );
      notifySuccess("Student added succesfully");
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

    // Validation for current step
    switch (currentStep) {
      case 1:
        if (
          !studentData.photo ||
          !studentData.firstname ||
          !studentData.lastname ||
          !studentData.phone ||
          !studentData.email ||
          !studentData.aadharCard ||
          !studentData.dateOfBirth ||
          !studentData.gender
        ) {
          notifyError("Please fill in all required field");
          return;
        }
        break;
      case 2:
        if (
          !studentData.buidlingHouseNo ||
          !studentData.streetColony ||
          !studentData.tehsilBlock ||
          !studentData.cityVillageSuburb ||
          !studentData.district ||
          !studentData.pincode
        ) {
          notifyError("Please fill in all required fields.");
          return;
        }
        break;
      case 3:
        if (
          !studentData.schoolCollegeName ||
          !studentData.schoolCollegeAddress ||
          !studentData.qualification ||
          !studentData.mediumOfSchool
        ) {
          notifyError("Please fill in all required fields.");
          return;
        }
        break;
      case 4:
        if (
          !studentData.occupation ||
          !studentData.physicallyChalleneged ||
          !studentData.natureOfDisability ||
          !studentData.proofOfIdentity
        ) {
          notifyError("Please fill in all required fields.");
          return;
        }
        break;
      default:
        break;
    }

    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      handleFormSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <>
      <div className="mb-3 mt-2 p-2">
        <h1 className="text-xl font-bold md:text-2xl">Student form</h1>
        <p className="text-sm text-gray-600 font-normal">
          {currentStep === 1
            ? `Basic details (${currentStep}/4)`
            : currentStep === 2
            ? `Address correspondence (${currentStep}/4)`
            : currentStep === 3
            ? `Educational details (${currentStep}/4)`
            : `Other details (${currentStep}/4)`}
        </p>
      </div>
      <form className="w-full h-full p-2">
        {currentStep === 1 && (
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
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(e) =>
                  setStudentData({ ...studentData, photo: e.target.files[0] })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Firstname
              </label>
              <input
                name="firstname"
                value={studentData.firstname}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="Peter"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Middlename
              </label>
              <input
                name="middlename"
                value={studentData.middlename}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="Benjamin"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Lastname
              </label>
              <input
                name="lastname"
                value={studentData.lastname}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="Parker"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Phone number
              </label>
              <input
                name="phone"
                value={studentData.phone}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="number"
                placeholder="9988776611"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Email
              </label>
              <input
                name="email"
                value={studentData.email}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="email"
                placeholder="peter@email.com"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Aadhar card number
              </label>
              <input
                name="aadharCard"
                value={studentData.aadharCard}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="12 digit number"
                maxLength={12}
                minLength={12}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Date of Birth
              </label>
              <input
                name="dateOfBirth"
                value={studentData.dateOfBirth}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="date"
                placeholder="Date Of Birth"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Select Gender
              </label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    className="radio radio-sm"
                    checked={studentData.gender === "Male"}
                    onChange={handleChange}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    className="radio radio-sm"
                    checked={studentData.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn w-fit px-10 my-4 btn-sm btn-active btn-neutral"
            >
              {"Next"}
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <>
            <div>
              <div className="flex flex-col mb-2">
                <label className="text-xs mb-1 text-gray-700 required--field ">
                  Building/ House no.
                </label>
                <input
                  name="buidlingHouseNo"
                  value={studentData.buidlingHouseNo}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  placeholder="Building/ House no."
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="text-xs mb-1 text-gray-700 required--field ">
                  Colony/ Street
                </label>
                <input
                  name="streetColony"
                  value={studentData.streetColony}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  placeholder="Colony/ Street"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="text-xs mb-1 text-gray-700 required--field ">
                  Tehsil/ Block
                </label>
                <input
                  name="tehsilBlock"
                  value={studentData.tehsilBlock}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  placeholder="Tehsil/ Block"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="text-xs mb-1 text-gray-700 required--field ">
                  City/ Village/ Suburb
                </label>
                <input
                  name="cityVillageSuburb"
                  value={studentData.cityVillageSuburb}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  placeholder="City/ Village/ Suburb"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="text-xs mb-1 text-gray-700 required--field ">
                  District
                </label>
                <input
                  name="district"
                  value={studentData.district}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  type="text"
                  placeholder="District"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label className="text-xs mb-1 text-gray-700 required--field ">
                  Pincode
                </label>
                <input
                  name="pincode"
                  value={studentData.pincode}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  type="number"
                  placeholder="Pincode"
                />
              </div>
            </div>
            <button
              onClick={handlePrevious}
              type="button"
              className="btn px-10 my-4 btn-sm btn-outline mx-2"
            >
              {"Previous"}
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn px-10 my-4 btn-sm btn-active btn-neutral mx-2"
            >
              {"Next"}
            </button>
          </>
        )}

        {currentStep === 3 && (
          <>
            {/* ... (your form structure for educational details) */}

            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                School/ College name
              </label>
              <input
                name="schoolCollegeName"
                value={studentData.schoolCollegeName}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="School/ College name"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                School/ College address
              </label>
              <input
                name="schoolCollegeAddress"
                value={studentData.schoolCollegeAddress}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="School/ College address"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Qualification
              </label>
              <select
                value={studentData.qualification}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    qualification: e.target.value,
                  })
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value="">
                  Select qualification
                </option>
                {qualificationOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Select medium of school/ college
              </label>
              <select
                value={studentData.mediumOfSchool}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    mediumOfSchool: e.target.value,
                  })
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value="">
                  Select medium of school/ college
                </option>
                <option>Marathi</option>
                <option>Semi Marathi</option>
                <option>Hindi</option>
                <option>Semi Hindi</option>
                <option>English</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Stream {"(for college students)"}
              </label>
              <select
                value={studentData.stream}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    stream: e.target.value,
                  })
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value="">
                  Select stream
                </option>
                <option>Science</option>
                <option>Commerce</option>
                <option>Arts</option>
                <option>Engineering</option>
                <option>Management</option>
                <option>Other</option>
              </select>
            </div>

            <button
              onClick={handlePrevious}
              type="button"
              className="btn px-10 my-4 btn-sm btn-outline mx-2"
            >
              {"Previous"}
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn px-10 my-4 btn-sm btn-neutral mx-2"
            >
              {"Next"}
            </button>
          </>
        )}

        {currentStep === 4 && (
          <>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Occupation
              </label>
              <select
                value={studentData.occupation}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    occupation: e.target.value,
                  })
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value="">
                  Select Occupation
                </option>
                {occupationOptions?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 mb-2 flex-col">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Are you physically challenged?
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="physicallyChalleneged"
                  value="yes"
                  className="radio radio-sm"
                  checked={studentData.physicallyChalleneged === "yes"}
                  onChange={handleChange}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="physicallyChalleneged"
                  value="no"
                  className="radio radio-sm"
                  checked={studentData.physicallyChalleneged === "no"}
                  onChange={handleChange}
                />
                <span>No</span>
              </label>
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Nature of disability
              </label>
              <input
                name="natureOfDisability"
                value={studentData.natureOfDisability}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                type="text"
                placeholder="Nature of disability"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs mb-1 text-gray-700 required--field ">
                Proof of identity submitted
              </label>
              <select
                value={studentData.proofOfIdentity}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    proofOfIdentity: e.target.value,
                  })
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled value="">
                  Select option
                </option>
                <option>School / College Id</option>
                <option>Aadhar card</option>
                <option>Voter Id</option>
                <option>Passport</option>
                <option>Other</option>
              </select>
            </div>
            <button
              onClick={handlePrevious}
              type="button"
              className="btn px-10 my-4 btn-sm btn-outline mx-2"
            >
              {"Previous"}
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn px-10 text-white my-4 btn-sm btn-active btn-success mx-2"
            >
              {"Submit"}
            </button>
          </>
        )}
      </form>
      <Toaster />
    </>
  );
};

export default StudentForm;
