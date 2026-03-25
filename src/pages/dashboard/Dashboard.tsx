import {
    Briefcase,
    FileText,
    Hammer,
    Clock,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';

const Dashboard = () => {
    // Dummy data for now
    const activeProjects = [
        { id: 1, name: 'Billboard Campaign', client: 'Coca-Cola', status: 'In Progress', deadline: '2025-12-01' },
        { id: 2, name: 'Website Redesign', client: 'Local Gym', status: 'Design Phase', deadline: '2025-11-30' },
        { id: 3, name: 'Vinyl Cut', client: 'Coffee Shop', status: 'Production', deadline: '2025-11-25' },
    ];

    const pendingInvoices = [
        { id: 101, client: 'Coca-Cola', amount: 5000, date: '2025-11-20' },
        { id: 102, client: 'Local Gym', amount: 1200, date: '2025-11-18' },
    ];

    const productionQueue = [
        { id: 3, name: 'Vinyl Cut', client: 'Coffee Shop', type: 'Vinyl', priority: 'High' },
        { id: 4, name: 'LED Screen Setup', client: 'Event Corp', type: 'Installation', priority: 'Medium' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Projects</p>
                            <p className="text-2xl font-bold text-gray-800">{activeProjects.length}</p>
                        </div>
                        <Briefcase className="w-8 h-8 text-blue-500 opacity-50" />
                    </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
                            <p className="text-2xl font-bold text-gray-800">{pendingInvoices.length}</p>
                        </div>
                        <FileText className="w-8 h-8 text-yellow-500 opacity-50" />
                    </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-sm border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Production Queue</p>
                            <p className="text-2xl font-bold text-gray-800">{productionQueue.length}</p>
                        </div>
                        <Hammer className="w-8 h-8 text-red-500 opacity-50" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Active Projects List */}
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Active Projects</h2>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
                    </div>
                    <div className="space-y-4">
                        {activeProjects.map((project) => (
                            <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                <div>
                                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                                    <p className="text-sm text-gray-500">{project.client}</p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {project.status}
                                    </span>
                                    <p className="mt-1 text-xs text-gray-500 flex items-center justify-end">
                                        <Clock className="w-3 h-3 mr-1" /> {project.deadline}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Production Queue */}
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Production Queue</h2>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
                    </div>
                    <div className="space-y-4">
                        {productionQueue.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 border-l-4 border-l-red-400">
                                <div>
                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.client}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {item.priority}
                                    </span>
                                    <p className="mt-1 text-xs text-gray-500">{item.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
