import React, { useState } from 'react';
import './styles.css';

function App() {
  const [username, setUsername] = useState('');
  const [repoData, setRepoData] = useState([]);
  const [modifiedRepoData, setModifiedRepoData] = useState([]);
  const [isfork, setIsFork] = useState(false);
  const [error, setError] = useState('');

  const onClickSubmitHandler = async () => {
    setError('');
    try {
      const response = await fetch(
        'https://api.github.com/users/' + username + '/repos'
      );
      if (response.status !== 200) {
        throw new Error('Not Found');
      } else {
        const jsonData = await response.json();
        let filteredData = await jsonData.map((item) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            fork: item.fork,
            size: item.size,
            language: item.language,
          };
        });

        if (filteredData.length === 0) {
          setError(`No repo found for ${username}`);
        }

        filteredData.sort((a, b) => {
          return b.size - a.size;
        });

        setRepoData(filteredData);

        if (isfork === false) {
          filteredData = filteredData.filter((type) => type.fork === false);
        }

        setModifiedRepoData(filteredData);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onClickForkHandler = () => {
    let forkedData;
    if (!isfork) {
      forkedData = repoData;
    } else {
      forkedData = repoData.filter((type) => type.fork === false);
    }
    setModifiedRepoData(forkedData);
    setIsFork(!isfork);
  };

  let displayData = modifiedRepoData.map((repo) => (
    <div key={repo.id}>
      <div className="col">{repo.name}</div>
      <div className="col">{repo.language}</div>
      <div className="col">{repo.description}</div>
      <div className="col">{repo.size}</div>
    </div>
  ));

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(val) => setUsername(val.target.value)}
        />
        <label htmlFor="fork">Include forks: </label>
        <input
          id="fork"
          type="checkbox"
          value={isfork}
          onClick={onClickForkHandler}
        />
        <button
          disabled={!username.trim().length}
          onClick={onClickSubmitHandler}
        >
          Submit
        </button>
      </div>
      <section>
        <header>
          <div className="col">Name</div>
          <div className="col">Language</div>
          <div className="col">Description</div>
          <div className="col">Size</div>
        </header>
        {displayData}
      </section>
      <div className="error">{error}</div>
    </div>
  );
}

export default App;
