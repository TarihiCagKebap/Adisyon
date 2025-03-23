import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function TableDetails({ orders, setOrders }) {
  const { id } = useParams();
  const tableOrders = orders[id] || [];
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Toplam tutarı hesapla
  const totalAmount = tableOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Ödeme ekranını aç
  const handleOpenPayment = () => {
    setShowPaymentModal(true);
  };

  // Nakit ödeme seçildiğinde hesabı kapat
  const handleCashPayment = () => {
    closeBill();
  };

  // Kart seçildiğinde pos makinesi sayfasına yönlendir
  const handleCardPayment = () => {
    navigate(`/pos/${id}`); // Pos makinesi sayfasına yönlendirme
  };

  // Adisyonu kapatma işlemi
  const closeBill = () => {
    const updatedOrders = { ...orders };
    delete updatedOrders[id];
    setOrders(updatedOrders);
    setShowPaymentModal(false); // Modal'ı kapat
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Masa {id}</h1>

      {tableOrders.length === 0 ? (
        <Link to={`/menu/${id}`} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
          Menü
        </Link>
      ) : (
        <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Adisyon</h2>
          <ul>
            {tableOrders.map((item, index) => (
              <li key={index} className="text-lg">
                {item.name} x {item.quantity} = {item.price * item.quantity}₺
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <p className="text-lg font-bold">Toplam: {totalAmount}₺</p> {/* Toplam tutar */}

          {/* Ödeme Seçeneği Butonu */}
          <button onClick={handleOpenPayment} className="mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
            Hesabı Kapat
          </button>
        </div>
      )}

      <Link to={`/menu/${id}`} className="mt-4 text-blue-600 hover:underline text-lg font-semibold">
        Menüden ekle
      </Link>
      
      <Link to="/tables"  className="mt-6 text-white bg-red-600 hover:bg-red-700 py-3 px-6 rounded-lg text-lg font-semibold transition duration-200 ease-in-out">
        Masalar Sayfasına Dön
      </Link>

      {/* Ödeme Modalı */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Ödeme Yöntemi Seçin</h2>
            <button
              onClick={handleCashPayment}
              className="bg-green-500 text-white px-6 py-3 rounded-lg w-full mb-4 hover:bg-green-700 transition"
            >
              Nakit Ödeme
            </button>
            <button
              onClick={handleCardPayment}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition"
            >
              Kart ile Ödeme
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="mt-4 text-red-600 hover:underline"
            >
              İptal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableDetails;
