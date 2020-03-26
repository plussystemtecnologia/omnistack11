import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Incidents() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  async function handleIncident(e) {
    e.preventDefault();
    try {
      const data = {
        title,
        description,
        value,
      };
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });
      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar caso!');
    }
  }

  return (
    <div className="incidents-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="route-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em R$"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit" >Cadastrar</button>
        </form>
      </div>
    </div>
  );
}