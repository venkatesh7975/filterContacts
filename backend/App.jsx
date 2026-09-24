import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState(null);

  // =========================
  // GET ALL USERS
  // =========================

  async function getUsers() {
    const response = await axios.get("http://localhost:3000/users");

    setUsers(response.data);
  }

  // =========================
  // CREATE USER
  // =========================

  async function addUser() {
    const response = await axios.post("http://localhost:3000/users", {
      name: name,
      number: number,
    });

    console.log(response.data);

    setName("");
    setNumber("");

    getUsers();
  }

  // =========================
  // DELETE USER
  // =========================

  async function deleteUser(id) {
    const response = await axios.delete(`http://localhost:3000/users/${id}`);

    console.log(response.data);

    getUsers();
  }

  // =========================
  // GET ONE USER
  // =========================

  async function getUser(id) {
    const response = await axios.get(`http://localhost:3000/users/${id}`);

    setName(response.data.name);
    setNumber(response.data.number);

    setEditId(id);
  }

  // =========================
  // UPDATE USER
  // =========================

  async function updateUser() {
    const response = await axios.put(`http://localhost:3000/users/${editId}`, {
      name: name,
      number: number,
    });

    console.log(response.data);

    setName("");
    setNumber("");
    setEditId(null);

    getUsers();
  }

  // =========================
  // GET USERS WHEN PAGE LOADS
  // =========================

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>CRUD Application</h1>

      {/* FORM */}

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      {editId ? (
        <button onClick={updateUser}>Update User</button>
      ) : (
        <button onClick={addUser}>Add User</button>
      )}

      <hr />

      {/* USERS */}

      <h2>Users</h2>

      {users.map((user) => (
        <div key={user._id}>
          <h3>{user.name}</h3>

          <p>{user.number}</p>

          <button onClick={() => getUser(user._id)}>Edit</button>

          <button onClick={() => deleteUser(user._id)}>Delete</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
