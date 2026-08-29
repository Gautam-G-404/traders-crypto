import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import WatchListPage from "./pages/WatchListPage";
import Footer from "./components/Footer";
import PortfolioPage from "./pages/PortfolioPage";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-black">
      <Navbar />
      <main className="grow pb-24 pt-24">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
