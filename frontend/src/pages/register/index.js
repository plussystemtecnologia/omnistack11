import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        whatsapp,
        city,
        uf,
      };
      const response = await api.post('ongs', data);
      alert(`Sei ID de acesso: ${response.data.id}`);
      // Enviando o usuário a rota principal
      history.push('/');
    } catch (error) {
      alert('Erro ao cadastrar ONG!');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be The Hero" />
          <h1>Cadastrar nova ONG</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className="route-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsApp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF" style={{ width: 80 }}
              value={uf}
              onChange={e => setUF(e.target.value)}
            />
          </div>
          <button className="button" type="submit" >Cadastrar</button>
        </form>
      </div>
    </div>
  );
}