import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, FileText, Briefcase } from 'lucide-react';
import { useClient } from '../../hooks/useClients';

const ClientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { client, loading, error } = useClient(id);

    // Dummy projects for now until we implement Projects module
    const projects = [
        { id: 101, name: 'Billboard Campaign', status: 'In Progress', date: '2025-11-01' },
        { id: 102, name: 'Office Vinyls', status: 'Completed', date: '2025-10-15' },
    ];

    if (loading) return <div className="p-8 text-center">Loading client details...</div>;
    if (error || !client) return <div className="p-8 text-center text-red-600">{error || "Client not found"}</div>;

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate('/clients')}
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Clients
            </button>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{client.company}</h1>
                            <p className="text-gray-500">{client.name}</p>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                            Edit Client
                        </button>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">Contact Info</h2>
                        <div className="flex items-center text-gray-600">
                            <Phone className="w-5 h-5 mr-3 text-gray-400" />
                            {client.phone || 'N/A'}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Mail className="w-5 h-5 mr-3 text-gray-400" />
                            {client.email || 'N/A'}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FileText className="w-5 h-5 mr-3 text-gray-400" />
                            {client.taxId || 'N/A'}
                        </div>
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                            {client.mapLink ? (
                                <a href={client.mapLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                    {client.location || 'View on Map'}
                                </a>
                            ) : (
                                <span>{client.location || 'N/A'}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Project History</h2>
                        <div className="space-y-3">
                            {projects.map((project) => (
                                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                                        <div>
                                            <p className="font-medium text-gray-900">{project.name}</p>
                                            <p className="text-xs text-gray-500">{project.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDetail;
