import React from 'react';
import noPage from "../../images/noPage404.png";

function NoPage() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <img src={noPage} alt="logoFooter" className="max-w-full max-h-full object-contain" />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-xl font-bold bg-black bg-opacity-50">
        <span>The page you were looking for was not found</span>
      </div>
    </div>
  )
}

export default NoPage;