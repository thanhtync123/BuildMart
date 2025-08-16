import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Customer from './pages/Customer';
import Category from './pages/Category';
function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="flex h-screen w-64 flex-col bg-white shadow">
          <div className="border-b p-4 text-xl font-bold">AdminLTE</div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/customers"
                  className="block rounded px-2 py-2 hover:bg-gray-200"
                >
                  Khách hàng
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="block rounded px-2 py-2 hover:bg-gray-200"
                >
                  Danh mục
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex items-center justify-between bg-white p-4 shadow">
            <div className="text-lg font-semibold">Dashboard</div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin</span>
              <img
                src="https://i.pravatar.cc/32"
                alt="avatar"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </header>
          {/* Content */}
          <main className="p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="rounded bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-bold">
                      Welcome to Admin Panel
                    </h2>
                    <p className="text-gray-600">
                      This is a simple admin dashboard layout using Tailwind
                      CSS.
                    </p>
                  </div>
                }
              />
              <Route path="/customers" element={<Customer />} />
              <Route path="/categories" element={<Category />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
