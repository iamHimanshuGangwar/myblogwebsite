import React, { useEffect, useState } from 'react';
import { assets, dashboard_data } from '../../assets/assets';
import BlogTable from '../../components/BlogTable';

const DashBoard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comment: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    // Replace this with actual API call if available
    setDashboardData(dashboard_data);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats = [
    { label: 'Blogs', value: dashboardData.blogs, icon: assets.dashboard_icon_1 },
    { label: 'Comments', value: dashboardData.comment, icon: assets.dashboard_icon_2 },
    { label: 'Drafts', value: dashboardData.drafts, icon: assets.dashboard_icon_3 },
  ];

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      {/* --- Stats Cards --- */}
      <div className="flex flex-wrap gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 p-6 min-w-[14rem] rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all cursor-pointer border border-gray-100 dark:border-gray-700"
          >
            <img src={stat.icon} alt={stat.label} className="w-14 h-14" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Latest Blogs Table --- */}
      <div>
        <div className="flex items-center gap-3 mb-6 text-gray-900 dark:text-white">
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" className="w-6 h-6" />
          <p className="font-bold text-lg">Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow-md rounded-2xl scrollbar-hide bg-white dark:bg-gray-800">
          <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <thead className="text-xs text-gray-800 dark:text-gray-300 text-left uppercase bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 font-bold">
              <tr>
                <th scope="col" className="px-6 py-4">#</th>
                <th scope="col" className="px-6 py-4">Blog Title</th>
                <th scope="col" className="px-6 py-4 max-sm:hidden">Date</th>
                <th scope="col" className="px-6 py-4 max-sm:hidden">Status</th>
                <th scope="col" className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTable key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400 font-medium">
                    No recent blogs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
