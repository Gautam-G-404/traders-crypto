import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoins = createAsyncThunk("crypto/fetchCoins", async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true",
  );
  const data = await response.json();
  return data;
});
const getInitialWatchList = () => {
  const savedData = localStorage.getItem("cryptoWatchList");
  return savedData ? JSON.parse(savedData) : [];
};

const getInitialBalance = () => {
  const savedBalance = localStorage.getItem("cryptoBalance");
  return savedBalance !== null ? JSON.parse(savedBalance) : 10000;
};

const getInitialPortfolio = () => {
  const savedPortfolio = localStorage.getItem("cryptoPortfolio");
  return savedPortfolio ? JSON.parse(savedPortfolio) : [];
};

const mySlice = createSlice({
  name: "cryptoSlice",
  initialState: {
    items: [],
    status: "idle",
    error: null,

    watchList: getInitialWatchList(),
    walletBalance: getInitialBalance(),
    portfolio: getInitialPortfolio(),
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
    addToWatchList: (state, action) => {
      const exists = state.watchList.find(
        (coin) => coin.id === action.payload.id,
      );
      if (!exists) {
        state.watchList.push(action.payload);
      } else {
        state.watchList = state.watchList.filter(
          (coin) => coin.id !== action.payload.id,
        );
      }
      localStorage.setItem("cryptoWatchList", JSON.stringify(state.watchList));
    },
    buyCoin: (state, action) => {
      const { coin, amountSpent } = action.payload;

      if (state.walletBalance >= amountSpent) {
        state.walletBalance -= amountSpent;
        localStorage.setItem(
          "cryptoBalance",
          JSON.stringify(state.walletBalance),
        );

        const quantity = amountSpent / coin.current_price;
        const existingCoinIndex = state.portfolio.findIndex(
          (item) => item.id === coin.id,
        );

        if (existingCoinIndex >= 0) {
          const prevItem = state.portfolio[existingCoinIndex];
          const totalSpent = prevItem.amountSpent + amountSpent;
          const totalQuantity = prevItem.quantity + quantity;

          prevItem.amountSpent = totalSpent;
          prevItem.quantity = totalQuantity;
          prevItem.buyPrice = totalSpent / totalQuantity;
        } else {
          state.portfolio.push({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            amountSpent: amountSpent,
            quantity: quantity,
            buyPrice: coin.current_price,
          });
        }

        localStorage.setItem(
          "cryptoPortfolio",
          JSON.stringify(state.portfolio),
        );
      } else {
        alert("Low Balance, Please reset your portfolio🔄️");
      }
    },
    sellCoin: (state, action) => {
      const { coin } = action.payload;
      state.walletBalance += coin.current_price * coin.quantity;
      state.portfolio = state.portfolio.filter((item) => item.id != coin.id);
      localStorage.setItem("cryptoPortfolio", JSON.stringify(state.portfolio));
      localStorage.setItem(
        "cryptoBalance",
        JSON.stringify(state.walletBalance),
      );
    },
    resetBalance: (state) => {
      state.walletBalance = 10000;
      state.portfolio = [];
      localStorage.setItem("cryptoPortfolio", JSON.stringify(state.portfolio));
      localStorage.setItem(
        "cryptoBalance",
        JSON.stringify(state.walletBalance),
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearItems, addToWatchList, buyCoin, sellCoin, resetBalance } =
  mySlice.actions;

export default mySlice.reducer;
