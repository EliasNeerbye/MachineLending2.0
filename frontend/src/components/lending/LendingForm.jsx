import { useState, useEffect } from 'react';
import { getAllMachines } from '../../services/machineService';
import { getAllPeople } from '../../services/personService';
import { lendMachine } from '../../services/lendingService';
import { useNavigate } from 'react-router-dom';

const LendingForm = () => {
  const [machines, setMachines] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    machineId: '',
    personId: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [machinesRes, peopleRes] = await Promise.all([
          getAllMachines(),
          getAllPeople(),
        ]);
        
        const availableMachines = (machinesRes.machines || []).filter(
          (machine) => machine.status === 'available'
        );
        
        setMachines(availableMachines);
        setPeople(peopleRes.people || []);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await lendMachine(formData);
      navigate('/lendings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create lending');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Lend a Machine</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {machines.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          No available machines to lend.
        </div>
      )}

      {people.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          No people registered in the system. Please add a person first.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="machineId">
            Machine *
          </label>
          <select
            id="machineId"
            name="machineId"
            value={formData.machineId}
            onChange={handleChange}
            required
            disabled={machines.length === 0}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a machine</option>
            {machines.map((machine) => (
              <option key={machine._id} value={machine._id}>
                {machine.machineName} - {machine.brand} {machine.model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="personId">
            Person *
          </label>
          <select
            id="personId"
            name="personId"
            value={formData.personId}
            onChange={handleChange}
            required
            disabled={people.length === 0}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a person</option>
            {people.map((person) => (
              <option key={person._id} value={person._id}>
                {person.firstName} {person.lastName} - {person.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="startDate">
            Start Date *
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading || machines.length === 0 || people.length === 0}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Lend Machine'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/lendings')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LendingForm;