import React from 'react';

export default function StartStreamBtn() {
  return (
    <a
      href="/stream"
      className="relative flex items-center h-12 px-6 overflow-hidden rounded-full duration-300 transition-all group space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600"
    >
      <span className="relative text-sm text-white">Stream NOW!</span>
      <div className="flex items-center -space-x-3 translate-x-3">
        <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}
