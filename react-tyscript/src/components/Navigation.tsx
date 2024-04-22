import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white">
          <Link to="/" className="text-xl font-bold">
            Alpha Stock
          </Link>
        </div>
        <button className="block lg:hidden text-white focus:outline-none" onClick={toggleMenu}>
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 6h18v2H3V6zm18 5H3v2h18v-2zm0 5H3v2h18v-2z"
            />
          </svg>
        </button>
        <ul
          className={`${
            isOpen ? 'block' : 'hidden'
          } lg:flex lg:justify-end lg:items-center lg:w-auto w-full`}
        >
          <li>
            <Link to="/" className={`text-white hover:text-gray-300 ${location.pathname === '/' ? 'font-bold' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/stockdata" className={`text-white hover:text-gray-300 ml-4 ${location.pathname === '/stockdata' ? 'font-bold' : ''}`}>
              Intraday
            </Link>
          </li>
          <li>
            <Link to="/dailydata" className={`text-white hover:text-gray-300 ml-4 ${location.pathname === '/dailydata' ? 'font-bold' : ''}`}>
              Daily
            </Link>
          </li>
          <li>
            <Link to="/weeklydata" className={`text-white hover:text-gray-300 ml-4 ${location.pathname === '/weeklydata' ? 'font-bold' : ''}`}>
              Weekly
            </Link>
          </li>
          <li>
            <Link to="/marketstatus" className={`text-white hover:text-gray-300 ml-4 ${location.pathname === '/marketstatus' ? 'font-bold' : ''}`}>
              Market Status
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
