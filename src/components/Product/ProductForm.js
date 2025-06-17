import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import { useProductTypes } from '../../hooks/useProducts';

const ProductForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData = null, 
  loading = false 
}) => {
  const { types } = useProductTypes();
  const [formData, setFormData] = useState({
    url: '',
    type: '',
    isNotify: 1,
  });
  const [errors, setErrors] = useState({});

  // Load initial data khi edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        url: initialData.url || '',
        type: initialData.type || '',
        isNotify: initialData.isNotify || 1,
      });
    } else {
      setFormData({
        url: '',
        type: '',
        isNotify: 1,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseInt(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error khi user nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.url.trim()) {
      newErrors.url = 'URL không được để trống';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'URL không hợp lệ';
    }

    if (!formData.type) {
      newErrors.type = 'Vui lòng chọn loại sản phẩm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check valid URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      handleReset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      url: '',
      type: '',
      isNotify: 1,
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {initialData ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
          </h2>
          <button 
            onClick={onClose} 
            className="modal-close-button"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {/* URL Field */}
          <div className="form-group">
            <label htmlFor="url" className="form-label">
              URL sản phẩm <span className="required">*</span>
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className={`form-input ${errors.url ? 'error' : ''}`}
              placeholder="https://example.com/product"
              disabled={loading}
            />
            {errors.url && (
              <span className="error-message">{errors.url}</span>
            )}
          </div>

          {/* Type Field */}
          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Loại sản phẩm <span className="required">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={`form-select ${errors.type ? 'error' : ''}`}
              disabled={loading}
            >
              <option value="">Chọn loại sản phẩm</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <span className="error-message">{errors.type}</span>
            )}
          </div>

          {/* Notification Field */}
          <div className="form-group">
            <label htmlFor="isNotify" className="form-label">
              Trạng thái thông báo
            </label>
            <select
              id="isNotify"
              name="isNotify"
              value={formData.isNotify}
              onChange={handleInputChange}
              className="form-select"
              disabled={loading}
            >
              <option value={1}>Bật thông báo</option>
              <option value={0}>Tắt thông báo</option>
            </select>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary"
              disabled={loading}
            >
              <RotateCcw size={16} />
              Đặt lại
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              <Save size={16} />
              {loading 
                ? (initialData ? 'Đang cập nhật...' : 'Đang thêm...') 
                : (initialData ? 'Cập nhật' : 'Thêm mới')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;