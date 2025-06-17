import React, {useEffect, useState} from 'react';
import {Bell, BellOff, Edit, ExternalLink, Eye, Filter, Plus, Search, Trash2} from 'lucide-react';
import {useProducts} from '../hooks/useProducts';
import ProductForm from '../components/Product/ProductForm';
import ProductDetailModal from '../components/Product/ProductDetailModal';
import ProductFilter from '../components/Product/ProductFilter';
import Loading from '../components/Common/Loading';
import Pagination from '../components/Common/Pagination';

const ProductManagement = () => {
  const {
    products,
    loading,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleNotification,
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState({
    type: null,
    isNotify: null,
    sortBy: 'createdAt',
    sortDir: 'desc',
    page: 0,
    size: 10,
  });

  // Load products khi component mount hoặc filters thay đổi
  useEffect(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  // Handle form submit
  const handleFormSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Form submit error:', error);
    }
  };

  // Handle close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Handle view detail
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await deleteProduct(id);
    }
  };

  // Handle toggle notification
  const handleToggleNotification = async (id) => {
    await toggleNotification(id);
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  // Handle pagination change
  const handlePaginationChange = (newPagination) => {
    setFilters(prev => ({
      ...prev,
      ...newPagination,
    }));
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      type: null,
      isNotify: null,
      sortBy: 'createdAt',
      sortDir: 'desc',
      page: 0,
      size: 10,
    });
    setSearchKeyword('');
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchKeyword);
  };

  // Open external URL
  const openUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
      <div className="product-management">
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">Quản lý sản phẩm</h1>
            <p className="page-subtitle">
              Tổng cộng {pagination.totalElements} sản phẩm
            </p>
          </div>

          <div className="page-actions">
            <button
                onClick={() => setShowFilter(!showFilter)}
                className={`btn btn-secondary ${showFilter ? 'active' : ''}`}
            >
              <Filter size={20}/>
              Bộ lọc & Phân trang
            </button>

            <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary"
            >
              <Plus size={20}/>
              Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="toolbar-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <Search className="search-icon" size={20}/>
              <input
                  type="text"
                  placeholder="Tìm kiếm theo URL..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="search-input"
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Tìm kiếm
            </button>
          </form>

          {showFilter && (
              <div className="filter-section">
                <ProductFilter
                    filters={filters}
                    pagination={pagination}
                    onFilterChange={handleFilterChange}
                    onPaginationChange={handlePaginationChange}
                    onClearFilters={handleClearFilters}
                />
              </div>
          )}
        </div>

        {/* Products Table */}
        <div className="table-container">
          {loading && <Loading/>}

          {!loading && products.length === 0 && (
              <div className="empty-state">
                <p>Không có sản phẩm nào được tìm thấy.</p>
                <button
                    onClick={() => setShowForm(true)}
                    className="btn btn-primary"
                >
                  <Plus size={16}/>
                  Thêm sản phẩm đầu tiên
                </button>
              </div>
          )}

          {!loading && products.length > 0 && (
              <div className="table-wrapper">
                <table className="products-table">
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>URL</th>
                    <th>Loại</th>
                    <th>Thông báo</th>
                    <th>Ngày tạo</th>
                    <th>Ngày cập nhật</th>
                    <th>Thao tác</th>
                  </tr>
                  </thead>
                  <tbody>
                  {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <span className="product-id">#{product.id}</span>
                        </td>
                        <td>
                          <div className="url-cell">
                        <span
                            className="product-url"
                            title={product.url}
                        >
                          {product.url.length > 50
                              ? `${product.url.substring(0, 50)}...`
                              : product.url
                          }
                        </span>
                            <button
                                onClick={() => openUrl(product.url)}
                                className="external-link-btn"
                                title="Mở liên kết"
                            >
                              <ExternalLink size={14}/>
                            </button>
                          </div>
                        </td>
                        <td>
                      <span className={`type-badge ${product.type || 'default'}`} style={{color: "red"}}>
                        {product.type || 'Không xác định'}
                      </span>
                        </td>
                        <td>
                          <button
                              onClick={() => handleToggleNotification(product.id)}
                              className={`notification-toggle ${
                                  product.isNotify === 1 ? 'active' : 'inactive'
                              }`}
                              title={product.isNotify === 1 ? 'Tắt thông báo' : 'Bật thông báo'}
                              disabled={loading}
                          >
                            {product.isNotify === 1 ? (
                                <>
                                  <Bell size={16}/>
                                  <span>Bật</span>
                                </>
                            ) : (
                                <>
                                  <BellOff size={16}/>
                                  <span>Tắt</span>
                                </>
                            )}
                          </button>
                        </td>
                        <td>
                      <span className="date-text">
                        {new Date(product.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                        </td>
                        <td>
                      <span className="date-text">
                        {new Date(product.updatedAt).toLocaleDateString('vi-VN')}
                      </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                                onClick={() => handleViewDetail(product)}
                                className="action-btn view"
                                title="Xem chi tiết"
                            >
                              <Eye size={16}/>
                            </button>
                            <button
                                onClick={() => handleEditProduct(product)}
                                className="action-btn edit"
                                title="Chỉnh sửa"
                                disabled={loading}
                            >
                              <Edit size={16}/>
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="action-btn delete"
                                title="Xóa"
                                disabled={loading}
                            >
                              <Trash2 size={16}/>
                            </button>
                          </div>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}

          {/* Pagination */}
          {!loading && pagination.totalPages > 1 && (
              <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  totalElements={pagination.totalElements}
                  pageSize={pagination.size}
                  onPageChange={handlePageChange}
              />
          )}
        </div>

        {/* Product Form Modal */}
        <ProductForm
            isOpen={showForm}
            onClose={handleCloseForm}
            onSubmit={handleFormSubmit}
            initialData={editingProduct}
            loading={loading}
        />

        {/* Product Detail Modal */}
        <ProductDetailModal
            isOpen={showDetail}
            onClose={() => setShowDetail(false)}
            product={selectedProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onToggleNotification={handleToggleNotification}
        />
      </div>
  );
};

export default ProductManagement;