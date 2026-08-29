import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-slate-300 py-4 mt-auto border-t border-slate-800 shadow-inner fixed bottom-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium tracking-wide gap-1">
          © {new Date().getFullYear()} CryptoVault. Crafted by{" "}
          <span className="text-blue-400 font-bold">Gautam</span>
        </div>

        <div className="flex gap-5 text-xl">
          <a
            href="https://github.com/Gautam-G-404"
            className="hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/gautam-404-/"
            className="hover:text-blue-400 hover:scale-110 transition-all duration-300"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
