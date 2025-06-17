// API Constants
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_TYPES: '/products/types',
  PRODUCT_SEARCH: '/products/search',
  PRODUCT_STATISTICS: '/products/statistics',
  PRODUCT_PAGINATED: '/products/paginated',
};

// Product Types
export const PRODUCT_TYPES = [
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

// Notification Status
export const NOTIFICATION_STATUS = {
  ENABLED: 1,
  DISABLED: 0,
};

// Pagination
export const PAGINATION_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIR: 'desc',
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    CREATE: 'Tạo sản phẩm thành công!',
    UPDATE: 'Cập nhật sản phẩm thành công!',
    DELETE: 'Xóa sản phẩm thành công!',
    TOGGLE_NOTIFICATION: 'Cập nhật thông báo thành công!',
  },
  ERROR: {
    CREATE: 'Lỗi khi tạo sản phẩm',
    UPDATE: 'Lỗi khi cập nhật sản phẩm',
    DELETE: 'Lỗi khi xóa sản phẩm',
    FETCH: 'Lỗi khi tải dữ liệu',
    NETWORK: 'Không thể kết nối đến server',
  },
};

// Form Validation
export const VALIDATION_RULES = {
  URL: {
    REQUIRED: 'URL không được để trống',
    INVALID: 'URL không hợp lệ',
    MAX_LENGTH: 255,
  },
  TYPE: {
    REQUIRED: 'Vui lòng chọn loại sản phẩm',
  },
};