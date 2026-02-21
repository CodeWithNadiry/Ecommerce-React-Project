import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 ">
      
      {/* Icon */}
      <HiOutlineExclamationCircle 
        size={80} 
        className="text-[#0A6085] mb-4"
      />

      {/* 404 Text */}
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      <h2 className="text-2xl font-semibold mt-2 text-gray-700">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 bg-[#0A6085] hover:bg-[#084c69] text-white px-6 py-2 rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;