import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Menu({ orders, setOrders }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({});
  const [menuItems, setMenuItems] = useState([]); // Menü öğelerini state'e al

  const categories = ["Yemek", "İçecek", "Tatlı", "Salata"];

  // localStorage'dan menü öğelerini al
  useEffect(() => {
    const storedMenuItems = JSON.parse(localStorage.getItem("menuItems"));
    if (storedMenuItems) {
      setMenuItems(storedMenuItems);
    }
  }, []);

  const handleIncrease = (itemName) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }));
  };

  const handleDecrease = (itemName) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemName]: Math.max((prev[itemName] || 0) - 1, 0),
    }));
  };

  const handleAddToOrder = () => {
    const newOrders = Object.entries(selectedItems)
      .filter(([_, quantity]) => quantity > 0)
      .map(([name, quantity]) => {
        const item = menuItems.find((menuItem) => menuItem.name === name);
        return { name, quantity, price: item.price };
      });

    if (newOrders.length > 0) {
      setOrders((prev) => ({
        ...prev,
        [id]: [...(prev[id] || []), ...newOrders],
      }));
    }

    navigate(`/table/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Masa {id} - Menü</h1>

      {menuItems.length > 0 ? (
        <div>
          {categories.map((category) => (
            <div key={category} className="mb-6">
              <h2 className="text-2xl font-bold">{category}</h2>
              <div className="grid grid-cols-2 gap-4">
                {menuItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div key={item.name} className="w-48 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.price}₺</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => handleDecrease(item.name)} className="px-2 py-1 bg-gray-300 rounded">
                          -
                        </button>
                        <span className="px-4">{selectedItems[item.name] || 0}</span>
                        <button onClick={() => handleIncrease(item.name)} className="px-2 py-1 bg-gray-300 rounded">
                          +
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Menüde öğe bulunmamaktadır.</p>
      )}

      <button onClick={handleAddToOrder} className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition">
        Adisyona Ekle
      </button>
    </div>
  );
}

export default Menu;
