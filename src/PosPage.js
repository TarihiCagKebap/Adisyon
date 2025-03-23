import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function PosPage({ orders, setOrders }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePaymentComplete = () => {
    alert("Ödeme başarılı!");
    
    // İlgili masaya ait siparişleri sil
    const updatedOrders = { ...orders };
    delete updatedOrders[id];
    setOrders(updatedOrders);

    navigate("/tables"); // Masalar sayfasına dön
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Masa {id} - Kart ile Ödeme</h1>
      <p className="text-lg mb-4">Lütfen kartınızı POS makinesine okutun.</p>
      <button 
        onClick={handlePaymentComplete} 
        className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
      >
        Ödemeyi Tamamla
      </button>
      <Link to="/tables" className="mt-6 text-red-600 hover:underline text-lg font-semibold">
        Geri Dön
      </Link>
    </div>
  );
}

export default PosPage;
