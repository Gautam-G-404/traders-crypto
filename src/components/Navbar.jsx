import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-blue-950 p-3 sm:p-4 shadow-md">
      <div className="text-xl sm:text-3xl text-blue-500 font-bold tracking-wide">
        CryptoVault
      </div>

      <div className="flex gap-2 sm:gap-4">
        <Link
          to="/"
          className="py-2 px-3 sm:px-6 text-sm sm:text-base bg-blue-600 text-white rounded-lg sm:rounded-xl text-center active:scale-95 transition-transform hover:bg-blue-500"
        >
          Home
        </Link>
        <Link
          to="/WatchList"
          className="py-2 px-3 sm:px-6 text-sm sm:text-base bg-blue-600 text-white rounded-lg sm:rounded-xl text-center active:scale-95 transition-transform hover:bg-blue-500"
        >
          WatchList
        </Link>
        <Link
          to="/portfolio"
          className="py-2 px-3 sm:px-6 text-sm sm:text-base bg-blue-600 text-white rounded-lg sm:rounded-xl text-center active:scale-95 transition-transform hover:bg-blue-500"
        >
          Portfolio
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
