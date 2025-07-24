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
      const a = true;
      // Verifica se o email já existe
      await axios.get("http://127.0.0.1:8000/users/", {
        params: { login_or_register: a, user_email: form.email, user_password: form.password  }
      });

      // Chegou aqui o Login foi realizado 
      alert("Login Realizado")
      window.location.href = "tasks.html";
      
      
    } catch (error) {
      
      if (error.response && error.response.status === 401) {
        alert("Email ou Senha Incorreto.");
      } else {
        alert("Erro ao fazer login.");
      }
    }
  };


  return (
    <div class="container">
        <h2>👋 Bem-vindo de Volta</h2>
        <form action="#" method="post" onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" onChange={handleChange} value={form.email} placeholder="seuemail@exemplo.com" required/>
            </div>
            <div class="form-group">
                <label for="senha">Senha:</label>
                <input type="password" id="senha" name="password" onChange={handleChange} value={form.password} placeholder="Sua senha" required/>
            </div>
            <div class="options">
                <div class="checkbox-group">
                    <input type="checkbox" id="remember-me" name="remember-me"/>
                    <label for="remember-me">Lembrar-me</label>
                </div>
                <a href="#">Esqueceu a senha?</a>
            </div>
            <button type="submit">Entrar</button>
            <div class="signup-link">
                Não tem uma conta? <a href="../index.html">Cadastre-se</a>
            </div>
        </form>
    </div>

  );
};

export default App;
