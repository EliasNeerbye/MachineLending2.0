import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { getAllMachines } from '../services/machineService';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMachines: 0,
    availableMachines: 0,
    lendedMachines: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { machines } = await getAllMachines();
        
        if (machines) {
          const totalMachines = machines.length;
          const availableMachines = machines.filter(m => m.status === 'available').length;
          const lendedMachines = machines.filter(m => m.status === 'lended').length;
          
          setStats({
            totalMachines,
            availableMachines,
            lendedMachines
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">
            Machine Lending System
          </h1>
          <p className="text-gray-600">
            Manage your equipment lending efficiently
          </p>
        </div>

        {user ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-center">Total Machines</h3>
                <p className="text-4xl font-bold text-blue-600 text-center">{stats.totalMachines}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-center">Available</h3>
                <p className="text-4xl font-bold text-green-600 text-center">{stats.availableMachines}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-center">Currently Lent</h3>
                <p className="text-4xl font-bold text-yellow-600 text-center">{stats.lendedMachines}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/machines" 
                className="bg-blue-100 hover:bg-blue-200 p-6 rounded-lg shadow-sm border border-blue-200 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">Manage Machines</h3>
                <p className="text-gray-600">View, add, update, and delete machines</p>
              </Link>
              
              <Link 
                to="/people" 
                className="bg-green-100 hover:bg-green-200 p-6 rounded-lg shadow-sm border border-green-200 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">Manage People</h3>
                <p className="text-gray-600">View, add, update, and delete borrowers</p>
              </Link>
              
              <Link 
                to="/lendings" 
                className="bg-yellow-100 hover:bg-yellow-200 p-6 rounded-lg shadow-sm border border-yellow-200 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">Manage Lendings</h3>
                <p className="text-gray-600">Create and manage lending records</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-6 text-lg">
              Please log in to access the machine lending system.
            </p>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded inline-block"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;