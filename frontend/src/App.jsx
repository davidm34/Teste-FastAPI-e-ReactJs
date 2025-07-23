import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

const App = () => {
  const [form, setForm] = useState({ name: "", email: "", password: ""});
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
      // Verifica se o email já existe
      await axios.get("http://127.0.0.1:8000/users/", {
        params: { user_email: form.email }
      });

      // Se chegou aqui, email está livre — pode criar o usuário
      await axios.post("http://127.0.0.1:8000/users/", form);
      setForm({ name: "", email: "", password: "" });
      fetchUsers();
      alert("Usuário criado com sucesso!");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("E-mail já cadastrado.");
      } else {
        alert("Erro ao verificar ou criar usuário.");
      }
    }
  };


  return (
    <div class="container">
        <h2>🚀 Crie sua Conta</h2>
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label>Nome Completo:</label>
                <input type="text" id="nome" name="name" value={form.name} onChange={handleChange} placeholder="Seu nome completo"/>
            </div>
            <div class="form-group">
                <label>E-mail:</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="seuemail@exemplo.com"/>
            </div>
            <div class="form-group">
                <label>Senha:</label>
                <input type="password" id="senha" name="password" value={form.password} onChange={handleChange} placeholder="Mínimo 8 caracteres"/>
                <small class="password-strength">A senha deve ter pelo menos 8 caracteres.</small>
            </div>
            <button type="submit">Cadastrar</button>       
            <div class="login-link">
                Já tem uma conta? <a href="#">Faça Login</a>
            </div>
        </form>
    </div>

  );
};

export default App;
