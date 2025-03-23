import React, { useState, useEffect } from "react";

function MenuManagement() {
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "Yemek",
    image: null,
  });
  const [menuItems, setMenuItems] = useState([]);  // menuItems state'ini tanımladık

  const categories = ["Yemek", "İçecek", "Tatlı", "Salata"];

  // MenuItems'ı localStorage'dan al
  useEffect(() => {
    const storedMenuItems = JSON.parse(localStorage.getItem("menuItems"));
    if (storedMenuItems) {
      setMenuItems(storedMenuItems);
    }
  }, []);

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category && newItem.image) {
      const formData = new FormData();
      formData.append("file", newItem.image);

      const imageUrl = URL.createObjectURL(newItem.image);
      
      const updatedMenuItems = [
        ...menuItems,
        { ...newItem, price: Number(newItem.price), imageUrl },
      ];
      setMenuItems(updatedMenuItems);

      // Yeni menüyü localStorage'a kaydet
      localStorage.setItem("menuItems", JSON.stringify(updatedMenuItems));

      setNewItem({ name: "", price: "", category: "Yemek", image: null });
    }
  };

  const handleDeleteItem = (name) => {
    const updatedMenuItems = menuItems.filter((item) => item.name !== name);
    setMenuItems(updatedMenuItems);

    // Menüden silinen öğeyi localStorage'tan da sil
    localStorage.setItem("menuItems", JSON.stringify(updatedMenuItems));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Menü Yönetimi</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ürün Adı"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ekle
        </button>
      </div>

      <div className="w-1/2 bg-white p-4 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Mevcut Menü</h2>
        {menuItems.length > 0 ? (
          categories.map((category) => (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-bold">{category}</h3>
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.name} className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="ml-4">{item.name} - {item.price}₺</span>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.name)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Sil
                    </button>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p>Menüde öğe yok.</p>
        )}
      </div>
    </div>
  );
}

export default MenuManagement;
