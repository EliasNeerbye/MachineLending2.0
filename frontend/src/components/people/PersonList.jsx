import { useState, useEffect } from 'react';
import { getAllPeople, deletePerson } from '../../services/personService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PersonList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  const fetchPeople = async () => {
    try {
      setLoading(true);
      const data = await getAllPeople();
      setPeople(data.people || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch people');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        await deletePerson(id);
        fetchPeople();
      } catch (err) {
        setError('Failed to delete person');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading people...</div>;
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
        <h2 className="text-2xl font-bold">People</h2>
        {user?.role === 'admin' && (
          <Link
            to="/people/new"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Person
          </Link>
        )}
      </div>

      {people.length === 0 ? (
        <p className="text-gray-500">No people found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">City</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person._id}>
                  <td className="py-2 px-4 border-b">{`${person.firstName} ${person.lastName}`}</td>
                  <td className="py-2 px-4 border-b">{person.email}</td>
                  <td className="py-2 px-4 border-b">{person.phone}</td>
                  <td className="py-2 px-4 border-b">{person.address?.city}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <Link
                        to={`/people/${person._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        View
                      </Link>
                      {user?.role === 'admin' && (
                        <>
                          <Link
                            to={`/people/edit/${person._id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(person._id)}
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

export default PersonList;