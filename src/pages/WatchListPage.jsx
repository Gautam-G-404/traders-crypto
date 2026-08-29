import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CoinCard from "../components/CoinCard";

const WatchListPage = () => {
  const watchList = useSelector((state) => state.crypto.watchList) || [];

  return (
    <div className="h-screen w-full bg-black">
      <h1 className="text-center text-xl sm:text-4xl text-blue-500 font-bold mt-5">
        WatchList
      </h1>
      {watchList.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-2 sm:mt-5 gap-5">
          <h2 className="text-xl sm:text-4xl text-amber-300 font-bold">
            No coins are added to your watchList...🌻🌻
          </h2>
          <Link
            className="bg-green-500 active:scale-95 cursor-pointer text-xl font-bold rounded-2xl p-1 sm:p-2"
            to="/"
          >
            Explore Coins🪙
          </Link>
        </div>
      ) : (
        <div className="flex gap-5 flex-wrap mt-5 mb-5 justify-center">
          {watchList.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchListPage;
