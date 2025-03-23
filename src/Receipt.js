import React from "react";
import { useParams } from "react-router-dom";

const Receipt = ({ orders = {} }) => { // Varsayılan olarak boş obje
  const { id } = useParams();
  const tableOrders = orders[id] || []; // Eğer `orders[id]` yoksa boş dizi ata
  
  // Toplam tutarı hesapla
  const total = tableOrders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-2xl font-bold">Fiş - Masa {id}</h2>
      <ul>
        {tableOrders.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name} x{item.quantity}</span>
            <span>{item.price * item.quantity}₺</span>
          </li>
        ))}
      </ul>
      <hr className="my-2" />
      <h3 className="text-xl font-bold">Toplam: {total}₺</h3>
    </div>
  );
};

export default Receipt;
