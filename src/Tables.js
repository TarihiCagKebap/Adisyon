import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Tables() {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : {};
  });

  const [tableCount, setTableCount] = useState(() => {
    const savedTableCount = localStorage.getItem("tableCount");
    return savedTableCount ? parseInt(savedTableCount) : 20; // Varsayılan masa sayısı 20
  });

  const toggleTableStatus = (table) => {
    const updatedOrders = { ...orders };
    if (updatedOrders[table] && updatedOrders[table].length > 0) {
      delete updatedOrders[table]; // Masayı boş yapmak için siliyoruz.
    } else {
      updatedOrders[table] = ["Sipariş eklendi"]; // Masayı dolu yapmak için örnek sipariş ekliyoruz.
    }
    setOrders(updatedOrders);
  };

  const addTable = () => {
    setTableCount((prevCount) => prevCount + 1);
  };

  const deleteTable = (table) => {
    if (window.confirm(`Masa ${table} silinecek. Emin misin?`)) {
      const updatedOrders = { ...orders };
      delete updatedOrders[table]; // Siparişleri de kaldırıyoruz.
      setOrders(updatedOrders);
      
      // Masa sayısını azaltıyoruz
      if (table === tableCount) {
        setTableCount((prevCount) => prevCount - 1);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("tableCount", tableCount);
  }, [tableCount]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Sabit Başlık */}
      <div className="w-full bg-red-500 text-white py-4 flex justify-center fixed top-0 left-0 z-10">
        <h1 className="text-4xl font-bold">MASALAR</h1>
      </div>

      {/* Kaydırılabilir Masalar */}
      <div className="grid grid-cols-4 gap-6 mt-20 overflow-y-auto h-[80vh] pt-10 pb-16">
        {Array.from({ length: tableCount }, (_, index) => {
          const table = index + 1;
          const hasOrder = orders[table] && orders[table].length > 0;
          return (
            <div key={table} className="relative">
              <Link
                to={`/table/${table}`}
                className={`w-80 h-80 ${
                  hasOrder ? "bg-orange-500" : "bg-green-500"
                } text-white text-2xl font-bold rounded-lg shadow-lg flex items-center justify-center transition-all`}
              >
                Masa {table}
              </Link>
              
              {/* Durum Güncelle Butonu */}
              <button
                onClick={() => toggleTableStatus(table)}
                className="absolute top-2 right-2 bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center"
              >
                <span className="text-xs">Durum</span>
              </button>

              {/* Masa Sil Butonu */}
              <button
                onClick={() => deleteTable(table)}
                className="absolute bottom-2 right-2 bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center"
              >
                <span className="text-xs">Sil</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Masa Ekleme Butonu */}
      <button
        onClick={addTable}
        className="mt-6 mb-4 text-white bg-green-600 hover:bg-green-700 py-3 px-6 rounded-lg text-lg font-semibold transition duration-200 ease-in-out"
      >
        Masa Ekle
      </button>

      <Link
        to="/"
        className="mb-6 text-white bg-blue-600 hover:bg-blue-700 py-3 px-6 rounded-lg text-lg font-semibold transition duration-200 ease-in-out"
      >
        Geri Dön
      </Link>
    </div>
  );
}

export default Tables;
