import { BASE_URL } from "../http/axiosInterceptors";

const View = ({ data }) => {
  return (
    <div>
      <img
        src={`http://192.168.213.134:8080/uploads/${data.photo.filename}`}
        alt={data.photo.filename}
      />
    </div>
  );
};

export default View;
