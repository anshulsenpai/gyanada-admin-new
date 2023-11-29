import { useState, useEffect } from "react";
import Table from "./Table"; // Import your Table component
import { userRequest } from "../http/axiosInterceptors";
import { studentColumns } from "../const/const";

const StudentTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Assuming your API uses 1-based indexing
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchPageData = async (page) => {
    try {
      // Update the API endpoint to include the necessary parameters
      const response = await userRequest.get(
        `/user/student/all?page=${page}&limit=10&search=${search}`
      );
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage, search]); // This effect will run whenever currentPage changes

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="input w-full max-w-xs mt-6 shadow-sm"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table
        columns={studentColumns}
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default StudentTable;
