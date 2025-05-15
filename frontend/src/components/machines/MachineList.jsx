import { useState, useEffect } from 'react';
import { getAllMachines, deleteMachine } from '../../services/machineService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  const fetchMachines = async () => {
    try {
      setLoading(true);
      const data = await getAllMachines();
      setMachines(data.machines || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch machines');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this machine?')) {
      try {
        await deleteMachine(id);
        fetchMachines();
      } catch (err) {
        setError('Failed to delete machine');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading machines...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Machines</h2>
        {user?.role === 'admin' && (
          <Link
            to="/machines/new"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Machine
          </Link>
        )}
      </div>

      {machines.length === 0 ? (
        <p className="text-gray-500">No machines found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Brand</th>
                <th className="py-2 px-4 border-b">Model</th>
                <th className="py-2 px-4 border-b">Serial Number</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => (
                <tr key={machine._id}>
                  <td className="py-2 px-4 border-b">{machine.machineName}</td>
                  <td className="py-2 px-4 border-b">{machine.brand}</td>
                  <td className="py-2 px-4 border-b">{machine.model}</td>
                  <td className="py-2 px-4 border-b">{machine.serialNumber}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      machine.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : machine.status === 'lended' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {machine.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <Link
                        to={`/machines/${machine._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        View
                      </Link>
                      {user?.role === 'admin' && (
                        <>
                          <Link
                            to={`/machines/edit/${machine._id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(machine._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MachineList;