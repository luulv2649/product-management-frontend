import axios from 'axios';

// Cấu hình base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8888/api';

// Tạo axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.error || 
                          error.response.data?.message || 
                          'Có lỗi xảy ra từ server';
      throw new Error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Không thể kết nối đến server');
    } else {
      // Something else happened
      throw new Error('Có lỗi xảy ra');
    }
  }
);

// Product API methods
export const productAPI = {
  // Lấy tất cả sản phẩm
  getAllProducts: () => apiClient.get('/products'),

  // Lấy sản phẩm theo ID
  getProductById: (id) => apiClient.get(`/products/${id}`),

  // Tạo sản phẩm mới
  createProduct: (productData) => apiClient.post('/products', productData),

  // Cập nhật sản phẩm
  updateProduct: (id, productData) => apiClient.put(`/products/${id}`, productData),

  // Xóa sản phẩm
  deleteProduct: (id) => apiClient.delete(`/products/${id}`),

  // Lấy sản phẩm theo type
  getProductsByType: (type) => apiClient.get(`/products/type/${type}`),

  // Toggle notification
  toggleNotification: (id) => apiClient.patch(`/products/${id}/toggle-notification`),

  // Lấy sản phẩm với pagination
  getProductsWithPagination: (params) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    });
    return apiClient.get(`/products/paginated?${queryParams.toString()}`);
  },

  // Lấy danh sách types
  getDistinctTypes: () => apiClient.get('/products/types'),

  // Tìm kiếm sản phẩm
  searchProducts: (keyword) => apiClient.get(`/products/search?keyword=${encodeURIComponent(keyword)}`),

  // Lấy thống kê
  getStatistics: () => apiClient.get('/products/statistics'),
};

export default apiClient;