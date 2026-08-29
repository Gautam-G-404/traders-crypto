import { ResponsiveContainer } from "recharts";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AreaChart, Area, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchList, buyCoin } from "../redux/slices/cryptoSlice";
import { useState } from "react";
import toast from "react-hot-toast";
const CoinCard = ({ coin }) => {
  const chartData =
    coin.sparkline_in_7d?.price.map((priceVal) => ({
      price: priceVal,
    })) || [];
  const dispatch = useDispatch();
  const watchList = useSelector((state) => state.crypto.watchList) || [];
  const isSaved = watchList.some((item) => item.id === coin.id);

  const isNegative = coin.price_change_percentage_24h < 0;
  const strokeColor = isNegative ? "#ef4444" : "#22c55e";
  const gradientId = `colorPrice_${coin.id}`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const handleBuy = () => {
    const amount = Number(buyAmount);
    if (amount > 0) {
      dispatch(buyCoin({ coin, amountSpent: amount }));
      toast.success(`Successfully bought ${coin.name}!`, {
        style: {
          borderRadius: "10px",
          background: "#1e293b",
          color: "#fff",
        },
      });

      setIsModalOpen(false);
      setBuyAmount("");
    }
  };
  return (
    <>
      <div className="relative flex flex-col justify-between overflow-hidden h-60 w-50 sm:h-70 sm:w-60 bg-blue-900 rounded px-2 py-1 hover:shadow-lg hover:shadow-slate-700/20 hover:-translate-y-1 transition-all duration-300">
        <button
          onClick={() => {
            dispatch(addToWatchList(coin));
            if (!isSaved) {
              toast.success(`${coin.name} added to Watchlist!`, {
                style: {
                  borderRadius: "10px",
                  background: "#1e293b",
                  color: "#fff",
                },
              });
            } else {
              toast.error(`${coin.name} removed from Watchlist!`, {
                style: {
                  borderRadius: "10px",
                  background: "#1e293b",
                  color: "#fff",
                },
              });
            }
          }}
          className="absolute bg-black top-4 right-4 text-2xl transition-colors duration-200 mt-6 rounded-xl h-8 w-8 cursor-pointer"
        >
          {isSaved ? (
            <FaStar className="text-yellow-400" />
          ) : (
            <FaRegStar className="text-slate-400 hover:text-yellow-400" />
          )}
        </button>
        <div className="flex justify-between gap-2">
          <img src={coin.image} alt={coin.name} className="w-16 h-16 mb-4" />
          <h2 className="line-clamp-2 text-xl font-bold text-white">
            {coin.name}
          </h2>
        </div>
        <p className="text-gray-400 uppercase text-sm sm:mb-2">{coin.symbol}</p>
        <div className="h-20 w-full mt-auto mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                }}
                itemStyle={{ color: strokeColor, fontWeight: "bold" }}
                labelStyle={{ display: "none" }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Price",
                ]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={strokeColor}
                strokeWidth={2.5}
                fill={`url(#${gradientId})`}
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center sm:mt-6">
          <div className="flex flex-col items-center ml-2">
            <span className="text-2xl font-bold text-white">
              ${(coin.current_price || 0).toLocaleString()}
            </span>
            <span
              className={`text-sm font-semibold mt-1 ${coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}
            >
              {isNegative ? "▼" : "▲"}{" "}
              {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-lg active:scale-95 transition-all cursor-pointer"
          >
            Buy
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-slate-800 p-6 rounded-2xl max-w-sm w-full border border-slate-700 shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold text-white mb-2">
              Buy {coin.name}
            </h3>
            <p className="text-slate-400 mb-6 flex justify-between">
              Current Price:{" "}
              <span className="text-white font-semibold">
                ${coin.current_price.toLocaleString()}
              </span>
            </p>

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Amount (in USD)
            </label>
            <input
              type="number"
              placeholder="e.g. 500"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 mb-6"
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
                className="px-5 py-2 rounded-lg font-semibold text-slate-300 hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                className="px-5 py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95"
              >
                Confirm Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinCard;
