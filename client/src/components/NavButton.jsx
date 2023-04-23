import React from 'react';

function NavButton({ title, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && 'bg-[#D9103B]'
      } px-4 py-2 rounded hover:bg-gray-100 font-bold text-white`}
    >
      {title}
    </button>
  );
}

export default NavButton;
