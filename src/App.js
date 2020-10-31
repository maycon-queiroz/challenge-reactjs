import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {

    api.get('/repositories').then(response => {
      const repository = response.data;

      setRepository(repository);
    });

  }, [])

  async function handleAddRepository() {

    const repository = await api.post('/repositories', {
      title: `Gatsby Starter3 ${Date.now()}`,
      url: "https://github.com/Rocketseat/gatsby-starter-rocket-docs",
      techs: "[javaScript]"
    });

    setRepository([...repositories, repository.data]);

  }

  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex >= 0) {

      await api.delete(`/repositories/${id}`);

      setRepository(repositories.filter(repository => repository.id !== id));

    }


  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
