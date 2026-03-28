import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store.ts";
import { login, getProfile } from "../store/slices/userSlice.ts";
import LoginPopup from "./LoginPopup.tsx";

export default function Navbar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotles", path: "/rooms" },
    { name: "Experiences", path: "/experiences" },
    { name: "Contact", path: "/contact" },
  ];

  const ref = useRef<HTMLDivElement | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") {
        setIsScrolled(true);
      } else {
        setIsScrolled(window.scrollY > 10);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const handleLoginSubmit = (credentials: {
    email: string;
    password: string;
  }) => {
    dispatch(login(credentials))
      .unwrap()
      .then(() => {
        dispatch(getProfile());
        setIsLoginOpen(false);
      })
      .catch(() => {
        // keep modal open for retry
      });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
          isScrolled
            ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
            : "py-4 md:py-6"
        }`}
        ref={ref}
      >
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="hotel_booking_logo"
            className={`h-9 ${isScrolled && "invert opacity-80"}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </a>
          ))}
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            } transition-all`}
            onClick={() => navigate("/owner")}
          >
            Dashboard
          </button>
        </div>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4">
          <img
            src={assets.searchIcon}
            alt="search_icon"
            className={`${
              isScrolled ? "invert" : ""
            } h-7 transition-all duration-300`}
          />
          {user ? (
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                onClick={() => navigate("/my-bookings")}
              >
                <img
                  src={user.image || assets.userIcon}
                  alt="user avatar"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="hidden text-white lg:inline">
                  {user.username}
                </span>
              </button>
            </div>
          ) : (
            <button
              className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
                isScrolled ? "text-white bg-black" : "bg-white text-black"
              }`}
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}

        <div className="flex items-center gap-3 lg:hidden">
          {user && (
            <button
              className="px-3 py-2 text-sm font-semibold text-slate-900 transition hover:text-slate-700"
              onClick={() => navigate("/my-bookings")}
            >
              My bookings
            </button>
          )}
          <img
            src={assets.menuIcon}
            alt="menu_icon"
            className={`${isScrolled ? "invert" : ""} h-4 cursor-pointer`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col lg:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={assets.closeIcon}
              alt="close_icon"
              className="h-6.5 cursor-pointer"
            />
          </button>

          {navLinks.map((link, i) => (
            <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}

          {user && (
            <button
              className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
              onClick={() => navigate("/owner")}
            >
              Dashboard
            </button>
          )}

          {!user && (
            <button
              className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSubmit={handleLoginSubmit}
      />
    </>
  );
}
