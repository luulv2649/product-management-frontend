import React from 'react';
import { Package, Bell, BellOff, TrendingUp } from 'lucide-react';
import { useStatistics } from '../hooks/useProducts'; // Sửa import path
import Loading from '../components/Common/Loading';

const Dashboard = () => {
  const { statistics, loading, error } = useStatistics();

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Lỗi khi tải thống kê: {error}</div>;

  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: statistics?.totalProducts || 0,
      icon: Package,
      color: 'blue',
    },
    {
      title: 'Thông báo đang bật',
      value: statistics?.activeNotifications || 0,
      icon: Bell,
      color: 'green',
    },
    {
      title: 'Thông báo đang tắt',
      value: statistics?.inactiveNotifications || 0,
      icon: BellOff,
      color: 'orange',
    },
    {
      title: 'Tỷ lệ thông báo',
      value: statistics?.totalProducts > 0 
        ? `${Math.round((statistics.activeNotifications / statistics.totalProducts) * 100)}%`
        : '0%',
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Tổng quan hệ thống quản lý sản phẩm</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2 className="section-title">Thông tin hệ thống</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3>Về ứng dụng</h3>
              <p>Hệ thống quản lý và theo dõi sản phẩm với khả năng thông báo tự động.</p>
            </div>
            <div className="info-card">
              <h3>Tính năng chính</h3>
              <ul>
                <li>Quản lý danh sách sản phẩm</li>
                <li>Phân loại sản phẩm theo type</li>
                <li>Cấu hình thông báo cho từng sản phẩm</li>
                <li>Tìm kiếm và lọc sản phẩm</li>
                <li>Thống kê tổng quan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;