import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  
  { label: "Products", to: "/admin/products" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Users", to: "/admin/users" },
];

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 bg-gray-900 text-white md:block">
          <div className="border-b border-white/10 px-6 py-5">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
          <nav className="space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b bg-white px-4 py-4 shadow-sm md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
              <Link to="/" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                Back to shop
              </Link>
            </div>
            <nav className="mt-4 flex gap-2 overflow-x-auto md:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="shrink-0 rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
