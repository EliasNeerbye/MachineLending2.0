import { useState, useEffect } from 'react';
import axios from 'axios';
import { finishLending, updateLendingStatus } from '../../services/lendingService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LendingList = () => {
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchLendings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/lendings');
      setLendings(response.data.lendings || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch lendings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLendings();
  }, []);

  const handleFinishLending = async (id) => {
    if (window.confirm('Are you sure you want to mark this lending as completed?')) {
      try {
        await finishLending(id);
        fetchLendings();
      } catch (err) {
        setError('Failed to finish lending');
        console.error(err);
      }
    }
  };

  const handleCancelLending = async (id) => {
    if (window.confirm('Are you sure you want to cancel this lending?')) {
      try {
        await updateLendingStatus(id, 'canceled');
        fetchLendings();
      } catch (err) {
        setError('Failed to cancel lending');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading lendings...</div>;
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
        <h2 className="text-2xl font-bold">Machine Lendings</h2>
        <Link
          to="/lendings/new"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          New Lending
        </Link>
      </div>

      {lendings.length === 0 ? (
        <p className="text-gray-500">No lendings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Machine</th>
                <th className="py-2 px-4 border-b">Borrower</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lendings.map((lending) => (
                <tr key={lending._id}>
                  <td className="py-2 px-4 border-b">
                    {lending.machine ? lending.machine.machineName : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {lending.person 
                      ? `${lending.person.firstName} ${lending.person.lastName}` 
                      : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(lending.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {lending.endDate 
                      ? new Date(lending.endDate).toLocaleDateString() 
                      : 'N/A'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      lending.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : lending.status === 'completed' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {lending.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      {lending.status === 'active' && (
                        <>
                          <button
                            onClick={() => handleFinishLending(lending._id)}
                            className="text-green-500 hover:text-green-700"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleCancelLending(lending._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Cancel
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

export default LendingList;