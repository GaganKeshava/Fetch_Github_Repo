import React from 'react';

const DisplayData = ({ repositoryData }) => {
  return (
    <section>
      <header>
        <div className="col">Name</div>
        <div className="col">Language</div>
        <div className="col">Description</div>
        <div className="col">Size</div>
      </header>
      {repositoryData.map((repo) => (
        <div key={repo.id}>
          <div className="col">{repo.name}</div>
          <div className="col">{repo.language}</div>
          <div className="col">{repo.description}</div>
          <div className="col">{repo.size}</div>
        </div>
      ))}
    </section>
  );
};

export default DisplayData;
