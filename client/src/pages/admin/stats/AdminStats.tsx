import AdminLayout from "../AdminLayout"
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  ChevronRight, 
  Activity 
} from "lucide-react"

function AdminStats() {
  // Mock performance metrics for immediate visualization layout
  const performanceKPIs = [
    { title: "Total Revenue", value: "Rs. 248,530", trend: "+12.5%", isPositive: true, subtext: "vs. last month", icon: DollarSign, color: "bg-emerald-500" },
    { title: "Active Orders", value: "142", trend: "+8.2%", isPositive: true, subtext: "34 processing", icon: ShoppingBag, color: "bg-blue-500" },
    { title: "New Customers", value: "1,248", trend: "-2.4%", isPositive: false, subtext: "vs. last week", icon: Users, color: "bg-violet-500" },
    { title: "Conversion Rate", value: "3.42%", trend: "+4.1%", isPositive: true, subtext: "Optimized performance", icon: TrendingUp, color: "bg-amber-500" },
  ]

  const recentOrders = [
    { id: "ORD-9482", customer: "Aashish Shrestha", items: "3 Products", total: "Rs. 4,500", status: "Delivered", time: "20 mins ago" },
    { id: "ORD-9481", customer: "Pooja Sharma", items: "1 Product", total: "Rs. 1,200", status: "Processing", time: "1 hour ago" },
    { id: "ORD-9480", customer: "Rohan Adhikari", items: "5 Products", total: "Rs. 12,850", status: "On the way", time: "3 hours ago" },
  ]

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/40 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
        
        {/* Top Welcoming Workspace Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Welcome back, Admin 👋
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Here's what is happening across your e-commerce ecosystem today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/30 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-900/30">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              Live System Analytics Active
            </span>
          </div>
        </div>

        {/* Dashboard Performance Metrics Grid Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceKPIs.map((kpi, idx) => {
            const IconComponent = kpi.icon
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/80 hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl text-white ${kpi.color} shadow-sm shadow-black/5`}>
                    <IconComponent size={20} />
                  </div>
                  <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    kpi.isPositive 
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" 
                      : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                  }`}>
                    {kpi.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {kpi.trend}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    {kpi.title}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-1">
                    {kpi.value}
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {kpi.subtext}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Core Administrative Columns (Split Manifest Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Large Column: Recent Order Stream Activity */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/80 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Store Orders</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Live monitoring incoming activity streams</p>
              </div>
              <button className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition flex items-center gap-0.5">
                View All <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="divide-y divide-gray-150 dark:divide-gray-700 px-6">
              {recentOrders.map((order) => (
                <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:bg-teal-50 dark:group-hover:bg-teal-950/20 group-hover:text-teal-600 transition">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white block">
                        {order.customer}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {order.id} • {order.items}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="sm:text-right">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white block">{order.total}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{order.time}</span>
                    </div>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      order.status === "Delivered" 
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
                        : order.status === "Processing"
                        ? "bg-sky-50 text-sky-700 ring-sky-600/10 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20"
                        : "bg-amber-50 text-amber-700 ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Smaller Column: System Overview & Status Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/60 dark:border-gray-700/80 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">System Operations</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Quick management status overview</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-50 dark:bg-teal-950/40 text-teal-600 rounded-lg">
                    <Activity size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white block">API Gateway</span>
                    <span className="text-xs text-gray-400">Response time: 42ms</span>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-50 dark:bg-teal-950/40 text-teal-600 rounded-lg">
                    <Users size={18} />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white block">Database Cluster</span>
                    <span className="text-xs text-gray-400">0.02% load index</span>
                  </div>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Navigation Shortcuts</h4>
                <div className="space-y-2">
                    <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        Manage Catalog
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        System Settings
                    </button>
                </div>
            </div>
        </div>
        </div>
      </div>
    </AdminLayout>
  )
}


export default AdminStats