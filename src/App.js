import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.sampleapis.com/beers/ale");
        const data = await response.json();
        setBeers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search for a beer..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="beer-container">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image} alt={beer.name} />
            <div>
              <h2>{beer.name}</h2>
              <p>
                <strong>Price:</strong> {beer.price}
              </p>
              <p>
                <strong>Rating:</strong> {beer.rating.average.toFixed(2)} (
                {beer.rating.reviews} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
