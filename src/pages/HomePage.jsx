import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../redux/slices/cryptoSlice";
import CoinCard from "../components/CoinCard";
import SkeletonCard from "../components/SkeletonCard";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.crypto);
  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);
  const [search, setSearch] = useState("");

  const filteredCoins = items.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-xl sm:text-4xl font-bold text-blue-500 mt-5 line-clamp-1">
          Live Crypto Market
        </h1>
        <input
          className="h-10 w-50 sm:w-90 p-3 rounded-xl bg-blue-500 text-black font-bold"
          placeholder="🔍 SEARCH COINS..."
          value={search}
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {status === "loading" && (
        <div className="flex gap-5 flex-wrap mb-5 mt-5 justify-center">
          {[...Array(12)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      {status === "failed" && (
        <h2 className="text-white text-2xl p-5">Error: {error} </h2>
      )}
      {status === "succeeded" && filteredCoins.length > 0 && (
        <div className="flex gap-5 flex-wrap mb-5 mt-5 justify-center">
          {filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
