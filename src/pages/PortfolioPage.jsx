import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCoins,
  sellCoin,
  resetBalance,
} from "../redux/slices/cryptoSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const walletBalance = useSelector((state) => state.crypto.walletBalance);
  const portfolio = useSelector((state) => state.crypto.portfolio);
  const liveMarketData = useSelector((state) => state.crypto.items);
  const status = useSelector((state) => state.crypto.status);

  useEffect(() => {
    if (status === "idle" || liveMarketData.length === 0) {
      dispatch(fetchCoins());
    }
  }, [dispatch, status, liveMarketData.length]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6">
      <div className="bg-liner-to-r from-blue-900 to-slate-800 border border-blue-500/30 w-full max-w-3xl rounded-2xl p-8 mt-4 mb-10 shadow-2xl shadow-blue-900/20 text-center transform hover:scale-105 transition-all duration-300">
        <h2 className="text-slate-400 text-lg font-medium tracking-widest uppercase mb-2">
          Available Balance
        </h2>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-600">
          $
          {walletBalance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>
      </div>
      <div className="w-full flex justify-between m-1">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 self-start md:ml-10">
          My Holdings
        </h2>
        <button
          className="px-1 sm:px-4 bg-red-500 active:scale-95 rounded-2xl cursor-pointer"
          onClick={() => {
            dispatch(resetBalance());
            toast.success("Portfolio Reset!!", {
              style: {
                borderRadius: "10px",
                background: "#1e293b",
                color: "#fff",
              },
            });
          }}
        >
          Reset Portfolio🔄️
        </button>
      </div>

      {portfolio.length > 0 ? (
        <div className="flex gap-5 flex-wrap justify-center w-full">
          {portfolio.map((coin) => {
            const liveCoinInfo = liveMarketData.find(
              (item) => item.id === coin.id,
            );
            const livePrice = liveCoinInfo
              ? liveCoinInfo.current_price
              : coin.buyPrice;

            const currentValue = (coin.quantity || 0) * (livePrice || 0);
            const profitLoss = currentValue - (coin.amountSpent || 0);
            const profitLossPercentage = coin.amountSpent
              ? (profitLoss / coin.amountSpent) * 100
              : 0;
            const isProfit = profitLoss >= 0;

            return (
              <div
                key={coin.id}
                className="bg-slate-800 border border-slate-700 rounded-xl p-5 h-60 w-full sm:w-80 sm:h-70 overflow-hidden flex flex-col gap-4 hover:shadow-lg hover:shadow-blue-900/20 transition-all"
              >
                <div className="flex items-center gap-4 border-b border-slate-700 pb-1 sm:pb-3">
                  <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                  <div className="w-full flex justify-between p-1">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {coin.name}
                      </h3>
                      <p className="text-sm text-slate-400 uppercase">
                        {(coin.quantity || 0).toFixed(4)} {coin.symbol}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          dispatch(
                            sellCoin({
                              coin: { ...coin, current_price: livePrice },
                            }),
                          );
                          toast.success(`${coin.name} sold successfully`, {
                            style: {
                              borderRadius: "10px",
                              background: "#1e293b",
                              color: "#fff",
                            },
                          });
                        }}
                        className={`p-2 sm:px-4 cursor-pointer font-bold ${isProfit ? "bg-green-500" : "bg-red-500"} rounded-2xl active:scale-95`}
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm bg-slate-900/50 p-1 sm:p-2 rounded-lg border border-slate-700/50">
                  <div className="flex flex-col">
                    <span className="text-slate-500 font-medium">
                      Buy Price
                    </span>
                    <span className="text-slate-300">
                      $
                      {(coin.buyPrice || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-slate-500 font-medium">
                      Live Price
                    </span>
                    <span className="text-blue-400 font-semibold">
                      $
                      {(livePrice || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6,
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between sm:items-end sm:mt-1">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-sm">Invested</span>
                    <span className="text-white font-semibold">
                      $
                      {(coin.amountSpent || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-slate-400 text-sm">
                      Current Value
                    </span>
                    <span
                      className={`font-bold text-lg ${isProfit ? "text-green-500" : "text-red-500"}`}
                    >
                      $
                      {currentValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span
                      className={`text-sm font-semibold ${isProfit ? "text-green-500" : "text-red-500"}`}
                    >
                      {isProfit ? "▲" : "▼"} ${Math.abs(profitLoss).toFixed(2)}{" "}
                      ({Math.abs(profitLossPercentage).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-10 flex flex-col">
          <h2 className="text-2xl text-slate-400 font-semibold mb-2">
            Portfolio is empty...
          </h2>
          <p className="text-slate-500">
            Go roam and have something from the market....
          </p>
          <div className="mt-5 flex justify-between">
            <Link
              className="bg-green-500 active:scale-95 cursor-pointer text-xl font-bold rounded-2xl p-1 sm:p-2"
              to="/"
            >
              Explore Coins🪙
            </Link>
            <Link
              className="bg-blue-400 active:scale-95 cursor-pointer text-xl font-bold rounded-2xl p-1 sm:p-2"
              to="/watchlist"
            >
              Saved Coins🪙
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
