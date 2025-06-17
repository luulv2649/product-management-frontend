import React from 'react';
import { Edit, Trash2, Bell, BellOff, ExternalLink } from 'lucide-react';

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  onToggleNotification,
  loading = false 
}) => {
  const handleToggleNotification = () => {
    onToggleNotification(product.id);
  };

  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      onDelete(product.id);
    }
  };

  const openUrl = () => {
    window.open(product.url, '_blank');
  };

  return (
    <div className="product-card">
      <div className="product-card-header">
        <div className="product-type-badge">
          {product.type || 'Không xác định'}
        </div>
        <div className="product-actions">
          <button
            onClick={handleToggleNotification}
            className={`action-button ${product.isNotify === 1 ? 'active' : 'inactive'}`}
            title={product.isNotify === 1 ? 'Tắt thông báo' : 'Bật thông báo'}
            disabled={loading}
          >
            {product.isNotify === 1 ? <Bell size={16} /> : <BellOff size={16} />}
          </button>
          <button
            onClick={handleEdit}
            className="action-button edit"
            title="Chỉnh sửa"
            disabled={loading}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="action-button delete"
            title="Xóa"
            disabled={loading}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="product-card-body">
        <div className="product-url-container">
          <p className="product-url" title={product.url}>
            {product.url}
          </p>
          <button
            onClick={openUrl}
            className="external-link-button"
            title="Mở liên kết"
          >
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <div className="product-card-footer">
        <div className="product-dates">
          <span className="date-label">Tạo:</span>
          <span className="date-value">
            {new Date(product.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>
        {product.updatedAt !== product.createdAt && (
          <div className="product-dates">
            <span className="date-label">Cập nhật:</span>
            <span className="date-value">
              {new Date(product.updatedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;