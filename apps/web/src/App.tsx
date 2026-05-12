import { useEffect, useState, type SubmitEvent } from 'react';

import './App.css';
import { UserRoleSchema, type CreateUser, type UserResponse } from './types/User';

const API_URL = 'http://localhost:3000';

export default function App() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    const data: UserResponse[] = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    const form = new FormData(formEl);
    const body: CreateUser = {
      name: form.get('name') as string,
      email: form.get('email') as string,
      age: Number(form.get('age')),
      role: form.get('role') as CreateUser['role'],
    };

    setLoading(true);
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      formEl.reset();
      await fetchUsers();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
    await fetchUsers();
  };

  return (
    <div className="container">
      <h1>nestjs-zod Demo</h1>
      <p className="subtitle">
        Shared Zod types powering request/response typing across client and server
      </p>

      <div className="layout">
        <section className="form-section">
          <h2>Create User</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Name" />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="text" placeholder="email@example.com" />
            </div>

            <div className="field">
              <label htmlFor="age">Age</label>
              <input id="age" name="age" type="number" placeholder="25" />
            </div>

            <div className="field">
              <label htmlFor="role">Role</label>
              <select id="role" name="role">
                {UserRoleSchema.options.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </section>

        <section className="list-section">
          <h2>Users ({users.length})</h2>
          {users.length === 0 ? (
            <p className="empty">No users yet.</p>
          ) : (
            <ul className="user-list">
              {users.map((user) => (
                <li key={user.id} className="user-card">
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <span className="email">{user.email}</span>
                    <span className="meta">
                      Age: {user.age} &middot;{' '}
                      <span className={`role role-${user.role}`}>{user.role}</span>
                    </span>
                  </div>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
