import React from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';

const ProductFilter = ({
                         filters,
                         onFilterChange,
                         onClearFilters,
                         pagination,
                         onPaginationChange
                       }) => {
  const types = [
    { value: 'FUJI', label: 'FUJI' },
    { value: 'FUJI_SEARCH', label: 'FUJI_SEARCH' },
    { value: 'MONORATO', label: 'MONORATO' },
    { value: 'POPMART_GLOBAL', label: 'POPMART_GLOBAL' },
    { value: 'YODOBASHI', label: 'YODOBASHI' },
    { value: 'NOJIMA', label: 'NOJIMA' },
    { value: 'KOJIMA', label: 'KOJIMA' },
    { value: 'POPMART', label: 'POPMART' },
    { value: 'RAKUTEN', label: 'RAKUTEN' },
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value === '' ? null : value,
      page: 0, // Reset to first page when filter changes
    });
  };

  const hasActiveFilters = Object.values(filters).some(value =>
      value !== null && value !== undefined && value !== ''
  );

  const pageSizeOptions = [
    { value: 5, label: '5 / trang' },
    { value: 10, label: '10 / trang' },
    { value: 20, label: '20 / trang' },
    { value: 50, label: '50 / trang' },
    { value: 100, label: '100 / trang' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Ngày tạo' },
    { value: 'updatedAt', label: 'Ngày cập nhật' },
    { value: 'url', label: 'URL' },
    { value: 'type', label: 'Loại sản phẩm' },
    { value: 'id', label: 'ID' },
  ];

  const sortDirections = [
    { value: 'desc', label: 'Mới nhất trước' },
    { value: 'asc', label: 'Cũ nhất trước' },
  ];

  return (
      <div className="product-filter">
        <div className="filter-header">
          <div className="filter-title">
            <Filter size={20} />
            <span>Bộ lọc & Phân trang</span>
          </div>
          {hasActiveFilters && (
              <button
                  onClick={onClearFilters}
                  className="clear-filters-button"
                  title="Xóa tất cả bộ lọc"
              >
                <X size={16} />
                Xóa bộ lọc
              </button>
          )}
        </div>

        <div className="filter-content">
          {/* Filter Section */}
          <div className="filter-section">
            <h4 className="filter-section-title">
              <Filter size={16} />
              Bộ lọc
            </h4>

            <div className="filter-grid">
              {/* Filter by Type */}
              <div className="filter-group">
                <label className="filter-label">Loại sản phẩm:</label>
                <div className="select-wrapper">
                  <select
                      value={filters.type || ''}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="filter-select"
                  >
                    <option value="">Tất cả loại</option>
                    {types.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>

              {/* Filter by Notification Status */}
              <div className="filter-group">
                <label className="filter-label">Trạng thái thông báo:</label>
                <div className="select-wrapper">
                  <select
                      value={filters.isNotify || ''}
                      onChange={(e) => handleFilterChange('isNotify', e.target.value)}
                      className="filter-select"
                  >
                    <option value="">Tất cả</option>
                    <option value="1">Đang bật</option>
                    <option value="0">Đang tắt</option>
                  </select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Sorting Section */}
          <div className="filter-section">
            <h4 className="filter-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M7 12h10m-7 6h4"/>
              </svg>
              Sắp xếp
            </h4>

            <div className="filter-grid">
              {/* Sort By */}
              <div className="filter-group">
                <label className="filter-label">Sắp xếp theo:</label>
                <div className="select-wrapper">
                  <select
                      value={filters.sortBy || 'createdAt'}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="filter-select"
                  >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>

              {/* Sort Direction */}
              <div className="filter-group">
                <label className="filter-label">Thứ tự:</label>
                <div className="select-wrapper">
                  <select
                      value={filters.sortDir || 'desc'}
                      onChange={(e) => handleFilterChange('sortDir', e.target.value)}
                      className="filter-select"
                  >
                    {sortDirections.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Section */}
          <div className="filter-section">
            <h4 className="filter-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Phân trang
            </h4>

            <div className="filter-grid">
              {/* Page Size */}
              <div className="filter-group">
                <label className="filter-label">Số lượng hiển thị:</label>
                <div className="select-wrapper">
                  <select
                      value={filters.size || 10}
                      onChange={(e) => handleFilterChange('size', parseInt(e.target.value))}
                      className="filter-select"
                  >
                    {pageSizeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>

              {/* Current Page Info */}
              <div className="filter-group">
                <label className="filter-label">Thông tin trang:</label>
                <div className="pagination-info-display">
                <span className="info-text">
                  Trang {(pagination?.page || 0) + 1} / {pagination?.totalPages || 1}
                </span>
                  <span className="info-subtext">
                  Tổng {pagination?.totalElements || 0} sản phẩm
                </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="filter-section">
            <h4 className="filter-section-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Tác vụ nhanh
            </h4>

            <div className="quick-actions">
              <button
                  onClick={() => {
                    handleFilterChange('sortBy', 'createdAt');
                    handleFilterChange('sortDir', 'desc');
                    handleFilterChange('size', 10);
                  }}
                  className="quick-action-btn"
              >
                Mặc định
              </button>

              <button
                  onClick={() => {
                    handleFilterChange('isNotify', '1');
                    handleFilterChange('sortBy', 'createdAt');
                    handleFilterChange('sortDir', 'desc');
                  }}
                  className="quick-action-btn"
              >
                Chỉ thông báo bật
              </button>

              <button
                  onClick={() => {
                    handleFilterChange('sortBy', 'updatedAt');
                    handleFilterChange('sortDir', 'desc');
                    handleFilterChange('size', 20);
                  }}
                  className="quick-action-btn"
              >
                Cập nhật gần đây
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductFilter;