import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Tables from "./Tables";
import TableDetails from "./TableDetails";
import Menu from "./Menu";
import MenuManagement from "./MenuManagement"; // Menü Yönetimi Sayfası
import PosPage from "./PosPage"; // POS ödeme sayfası

function App() {
  const [orders, setOrders] = useState({}); // Masalara ait siparişleri saklayacağız
  const [menuItems, setMenuItems] = useState([]); // Menüdeki ürünleri saklamak için
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables" element={<Tables />} />
        
        <Route
          path="/table/:id"
          element={<TableDetails orders={orders} setOrders={setOrders} />}
        />
        <Route
          path="/menu/:id"
          element={<Menu orders={orders} setOrders={setOrders} menuItems={menuItems} />}
        />
        {/* Menü Yönetimi Sayfası */}
        <Route
          path="/menu-management"
          element={<MenuManagement menuItems={menuItems} setMenuItems={setMenuItems} />}
        />
        {/* POS Ödeme Sayfası */}
        <Route 
          path="/pos/:id" 
          element={<PosPage orders={orders} setOrders={setOrders} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
