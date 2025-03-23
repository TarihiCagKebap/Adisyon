import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/assets/home.png")' }}

    >
        <div className="flex flex-col items-start absolute left-0 top-1/8 space-y-8 pl-10">
        {/* Masalar Butonu */}
        <Link
          to="/tables"
          className="flex items-center justify-center w-[500px] h-[500px] bg-red-500 text-white text-5xl font-bold rounded-lg shadow-lg transition-all hover:opacity-80"
          style={{ width: "300px", height: "300px" }}
        >
          MASALAR
        </Link>

        {/* Menü Yönetimi Butonu */}
        <Link
          to="/menu-management"
          className="flex items-center justify-center w-[300px] h-[300px] bg-blue-500 text-white text-5xl font-bold rounded-lg shadow-lg transition-all hover:opacity-80"
          style={{ width: "300px", height: "300px" }}
        >
          MENÜ EKLE
        </Link>

        {/* Günlük Gelir Butonu */}
        <Link
          to="/daily-revenue"
          className="flex items-center justify-center w-[300px] h-[300px] bg-green-500 text-white text-5xl font-bold rounded-lg shadow-lg transition-all hover:opacity-80"
          style={{ width: "300px", height: "300px" }}
        >
          GÜNLÜK GELİR TAKİP
        </Link>
      </div>
    </div>
  );
}

export default Home;
