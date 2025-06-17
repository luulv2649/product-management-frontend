import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = ({ onSearch, searchKeyword, setSearchKeyword }) => {
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchKeyword);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">Quản lý sản phẩm</h1>
        </div>
        
        <div className="header-center">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm theo URL..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="search-input"
              />
            </div>
            <button type="submit" className="search-button">
              Tìm kiếm
            </button>
          </form>
        </div>
        
        <div className="header-right">
          <button className="header-icon-button">
            <Bell size={20} />
          </button>
          <button className="header-icon-button">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;