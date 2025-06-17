import { useState, useEffect, useCallback } from 'react';
import { productAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  // Lấy danh sách sản phẩm
  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productAPI.getProductsWithPagination({
        page: 0,
        size: 10,
        sortBy: 'createdAt',
        sortDir: 'desc',
        ...params,
      });

      if (response.success && response.data) {
        setProducts(response.data.content || []);
        setPagination({
          page: response.data.number || 0,
          size: response.data.size || 10,
          totalElements: response.data.totalElements || 0,
          totalPages: response.data.totalPages || 0,
        });
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Lỗi khi tải sản phẩm: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Tạo sản phẩm mới
  const createProduct = useCallback(async (productData) => {
    try {
      setLoading(true);
      const response = await productAPI.createProduct(productData);
      
      if (response.success) {
        toast.success(response.message || 'Tạo sản phẩm thành công!');
        await fetchProducts(); // Refresh danh sách
        return response.data;
      }
    } catch (err) {
      toast.error(`Lỗi khi tạo sản phẩm: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  // Cập nhật sản phẩm
  const updateProduct = useCallback(async (id, productData) => {
    try {
      setLoading(true);
      const response = await productAPI.updateProduct(id, productData);
      
      if (response.success) {
        toast.success(response.message || 'Cập nhật sản phẩm thành công!');
        await fetchProducts(); // Refresh danh sách
        return response.data;
      }
    } catch (err) {
      toast.error(`Lỗi khi cập nhật sản phẩm: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  // Xóa sản phẩm
  const deleteProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await productAPI.deleteProduct(id);
      
      if (response.success) {
        toast.success(response.message || 'Xóa sản phẩm thành công!');
        await fetchProducts(); // Refresh danh sách
      }
    } catch (err) {
      toast.error(`Lỗi khi xóa sản phẩm: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProducts]);

  // Toggle notification
  const toggleNotification = useCallback(async (id) => {
    try {
      const response = await productAPI.toggleNotification(id);
      
      if (response.success) {
        toast.success(response.message || 'Cập nhật thông báo thành công!');
        
        // Cập nhật local state
        setProducts(prev => prev.map(product => 
          product.id === id 
            ? { ...product, isNotify: response.data.isNotify }
            : product
        ));
      }
    } catch (err) {
      toast.error(`Lỗi khi cập nhật thông báo: ${err.message}`);
    }
  }, []);

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleNotification,
  };
};

// Hook cho statistics
export const useStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productAPI.getStatistics();
      
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (err) {
      setError(err.message);
      toast.error(`Lỗi khi tải thống kê: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics,
  };
};

// Hook cho product types
export const useProductTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTypes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productAPI.getDistinctTypes();
      
      if (response.success) {
        setTypes(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching product types:', err);
      // Fallback types
      setTypes(['electronics', 'clothing', 'books', 'home', 'sports']);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  return { types, loading, refetch: fetchTypes };
};