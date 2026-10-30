import { useEffect, useState } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './api';

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      if (editingId) {
        await updateItem(editingId, form);
        setEditingId(null);
      } else {
        await createItem(form);
      }
      setForm({ title: '', description: '' });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description });
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: '', description: '' });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h2 className="text-2xl font-bold mb-4">CRUD App</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', marginRight: '8px' }}>
          {editingId ? 'Update Item' : 'Add Item'}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel} style={{ padding: '8px 16px' }}>
            Cancel
          </button>
        )}
      </form>

      <div>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '12px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 6px 0' }}>{item.title}</h4>
              <p style={{ margin: 0, color: '#555' }}>{item.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(item)} style={{ marginRight: '6px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}