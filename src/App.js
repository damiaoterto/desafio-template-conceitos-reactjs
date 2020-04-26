import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `front-end Gostack ${Date.now()}`,
      url: "http://github.com/front-end-gostack",
      techs: ["Node.js", "ReactJS"]
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if (response.status === 204) {
      const deletedRepository = repositories.filter(repository => 
        repository.id !== id
      );

      setRepository(deletedRepository);
    }
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => {
          return (
            <li key={index}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
