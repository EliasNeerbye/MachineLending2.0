import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMachine, createMachine, updateMachine } from '../../services/machineService';

const MachineForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    machineName: '',
    brand: '',
    model: '',
    serialNumber: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchMachine = async () => {
      if (isEditing) {
        try {
          setLoading(true);
          const response = await getMachine(id);
          const { machineName, brand, model, serialNumber } = response.machine;
          setFormData({ machineName, brand, model, serialNumber });
        } catch (err) {
          setError('Failed to fetch machine data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchMachine();
  }, [id, isEditing]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isEditing) {
        await updateMachine(id, formData);
      } else {
        await createMachine(formData);
      }
      navigate('/machines');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && isEditing) {
    return <div className="text-center py-4">Loading machine data...</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Machine' : 'Add New Machine'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="machineName">
            Machine Name *
          </label>
          <input
            id="machineName"
            name="machineName"
            type="text"
            value={formData.machineName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="brand">
            Brand *
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="model">
            Model *
          </label>
          <input
            id="model"
            name="model"
            type="text"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="serialNumber">
            Serial Number *
          </label>
          <input
            id="serialNumber"
            name="serialNumber"
            type="text"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Machine' : 'Add Machine')}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/machines')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MachineForm;