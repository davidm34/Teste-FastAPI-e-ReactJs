import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    const response = await axios.get("http://127.0.0.1:8000/users/");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/users/", form);
      setForm({ name: "", email: "" });
      fetchUsers();
    } catch (error) {
      alert("Erro ao criar usuário!");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Cadastro de Usuários</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

     <h2>Usuários Cadastrados:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
