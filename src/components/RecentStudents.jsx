import { useState, useEffect } from "react";
import Table from "./Table"; // Import your Table component
import { userRequest } from "../http/axiosInterceptors";
import { studentColumns } from "../const/const";

const RecentStudents = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Assuming your API uses 1-based indexing
  const [totalPages, setTotalPages] = useState(1);

  const fetchPageData = async (page) => {
    try {
      // Update the API endpoint to include the necessary parameters
      const response = await userRequest.get(
        `/user/student?search=&selectedFilter=&filterValue=&page=${page}&limit=6`
      );
      setData(response.data.data.students);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage]); // This effect will run whenever currentPage changes

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Table
      columns={studentColumns}
      data={data}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default RecentStudents;
