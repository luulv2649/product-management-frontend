import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import ProductManagement from '../../pages/ProductManagement';
import { productAPI } from '../../services/api';
import { toast } from 'react-toastify';

const Layout = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await productAPI.searchProducts(keyword);

      if (response.success) {
        setSearchResults(response.data);
        toast.success(`Tìm thấy ${response.data.length} sản phẩm`);
      }
    } catch (error) {
      toast.error(`Lỗi khi tìm kiếm: ${error.message}`);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
      <Router>
        <div className="app-layout">
          <Sidebar />

          <div className="main-content">
            <Header
                onSearch={handleSearch}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
            />

            <main className="page-content">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/products"
                    element={
                      <ProductManagement
                          searchResults={searchResults}
                          isSearching={isSearching}
                          searchKeyword={searchKeyword}
                      />
                    }
                />
              </Routes>
            </main>
          </div>

          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
        </div>
      </Router>
  );
};

export default Layout;