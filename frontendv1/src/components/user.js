import React, { useState } from "react";
import { registerUser, getUserByEmail } from "../api/usersapi";
import {listAllUsers} from '../api/management'
import { ErrorDisplay } from "./ErrorDisplay";

const Users = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    bank_type: "",
    transaction_id: "",
  });
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    try {
      const res = await registerUser(form);
      console.log("Register User Response:", res);
      setResponse("User registration successful!");
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.message);
    }
  };

  const handleGetUserByEmail = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await getUserByEmail(email);
      console.log("User Details:", res);
      setUsers([res]); // Display user details in the table
    } catch (err) {
      console.error("Error fetching user by email:", err);
      setError(err.message);
    }
  };

  const handleListAllUsers = async () => {
    setError(null);
    try {
      const res = await listAllUsers();
      console.log("All Users:", res);
      setUsers(res);
    } catch (err) {
      console.error("Error fetching all users:", err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <section>
        <h3>Register User</h3>
        <form onSubmit={handleRegisterSubmit}>
          <input type="text" name="fullname" placeholder="Full Name" value={form.fullname} onChange={(e) => setForm({ ...form, fullname: e.target.value })} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <input type="text" name="bank_type" placeholder="Bank Type" value={form.bank_type} onChange={(e) => setForm({ ...form, bank_type: e.target.value })} required />
          <input type="text" name="transaction_id" placeholder="Transaction ID" value={form.transaction_id} onChange={(e) => setForm({ ...form, transaction_id: e.target.value })} required />
          <button type="submit">Register</button>
        </form>
      </section>

      <section>
        <h3>Get User By Email</h3>
        <form onSubmit={handleGetUserByEmail}>
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Fetch User</button>
        </form>
      </section>

      <section>
        <h3>List All Users</h3>
        <button onClick={handleListAllUsers}>Load Users</button>
      </section>

      {response && <div style={{ color: "green" }}>{response}</div>}
      <ErrorDisplay error={error} />

      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
