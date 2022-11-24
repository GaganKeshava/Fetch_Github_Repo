import React, { useState } from 'react';
import './styles.css';

function App() {
  const [username, setUsername] = useState('');
  const [repoData, setRepoData] = useState([]);
  const [isfork, setIsFork] = useState(false);
  const [error, setError] = useState('');

  const onSubmitHandler = async () => {
    setError('');
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      if (response.status !== 200) {
        throw new Error('Not Found');
      }
      const jsonData = await response.json();
      let sortedData = jsonData.sort((a, b) => {
        return b.size - a.size;
      });
      if (sortedData.length === 0) {
        setError(`No repo found for ${username}`);
      }
      setRepoData(sortedData);
    } catch (error) {
      setError(error.message);
      setRepoData([]);
    }
  };

  const excludeForkData = (repositoryData) => {
    const { id, name, language, description, size, fork } = repositoryData;
    if (!fork) {
      return (
        <div key={id}>
          <div className="col">{name}</div>
          <div className="col">{language}</div>
          <div className="col">{description}</div>
          <div className="col">{size}</div>
        </div>
      );
    }
  };

  const includeForkData = (repositoryData) => {
    const { id, name, language, description, size } = repositoryData;
    return (
      <div key={id}>
        <div className="col">{name}</div>
        <div className="col">{language}</div>
        <div className="col">{description}</div>
        <div className="col">{size}</div>
      </div>
    );
  };

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
          onChange={(val) => setIsFork(val.target.checked)}
        />
        <button disabled={!username.trim().length} onClick={onSubmitHandler}>
          Submit
        </button>
      </div>
      {repoData.length > 0 && (
        <section>
          <header>
            <div className="col">Name</div>
            <div className="col">Language</div>
            <div className="col">Description</div>
            <div className="col">Size</div>
          </header>
          {isfork
            ? repoData.map(includeForkData)
            : repoData.map(excludeForkData)}
        </section>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;
