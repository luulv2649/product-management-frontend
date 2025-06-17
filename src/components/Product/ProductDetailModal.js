import React from 'react';
import { X, Edit, Trash2, Bell, BellOff, ExternalLink, Calendar, Tag, Hash } from 'lucide-react';

const ProductDetailModal = ({
                                isOpen,
                                onClose,
                                product,
                                onEdit,
                                onDelete,
                                onToggleNotification
                            }) => {
    if (!isOpen || !product) return null;

    const handleEdit = () => {
        onEdit(product);
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            onDelete(product.id);
            onClose();
        }
    };

    const handleToggleNotification = () => {
        onToggleNotification(product.id);
    };

    const openUrl = () => {
        window.open(product.url, '_blank');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content detail-modal">
                <div className="modal-header">
                    <h2 className="modal-title">Chi tiết sản phẩm</h2>
                    <button
                        onClick={onClose}
                        className="modal-close-button"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="detail-section">
                        <div className="detail-item">
                            <div className="detail-label">
                                <Hash size={16} />
                                <span>ID</span>
                            </div>
                            <div className="detail-value">
                                <span className="product-id-badge">#{product.id}</span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-label">
                                <ExternalLink size={16} />
                                <span>URL</span>
                            </div>
                            <div className="detail-value">
                                <div className="url-container">
                  <span className="url-text" title={product.url}>
                    {product.url}
                  </span>
                                    <button
                                        onClick={openUrl}
                                        className="btn btn-secondary btn-sm"
                                    >
                                        <ExternalLink size={14} />
                                        Mở liên kết
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-label">
                                <Tag size={16} />
                                <span>Loại sản phẩm</span>
                            </div>
                            <div className="detail-value">
                <span className={`type-badge ${product.type || 'default'}`}>
                  {product.type || 'Không xác định'}
                </span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-label">
                                {product.isNotify === 1 ? <Bell size={16} /> : <BellOff size={16} />}
                                <span>Thông báo</span>
                            </div>
                            <div className="detail-value">
                                <button
                                    onClick={handleToggleNotification}
                                    className={`notification-toggle ${
                                        product.isNotify === 1 ? 'active' : 'inactive'
                                    }`}
                                >
                                    {product.isNotify === 1 ? (
                                        <>
                                            <Bell size={16} />
                                            <span>Đang bật</span>
                                        </>
                                    ) : (
                                        <>
                                            <BellOff size={16} />
                                            <span>Đang tắt</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-label">
                                <Calendar size={16} />
                                <span>Ngày tạo</span>
                            </div>
                            <div className="detail-value">
                <span className="date-text">
                  {new Date(product.createdAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                  })}
                </span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-label">
                                <Calendar size={16} />
                                <span>Ngày cập nhật</span>
                            </div>
                            <div className="detail-value">
                <span className="date-text">
                  {new Date(product.updatedAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                  })}
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        onClick={handleEdit}
                        className="btn btn-primary"
                    >
                        <Edit size={16} />
                        Chỉnh sửa
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn btn-danger"
                    >
                        <Trash2 size={16} />
                        Xóa
                    </button>
                    <button
                        onClick={onClose}
                        className="btn btn-secondary"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;