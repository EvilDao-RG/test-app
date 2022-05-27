import logo from './logo.svg';
import './App.css';
import React from 'react';


function App() {
  const [data, setData] = React.useState(null);
  const [put, setPut] = React.useState(null);
  const [del, setDel] = React.useState(null);
  
  React.useEffect(() =>{
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setData(data.message));
  }, []);
  
  React.useEffect(() => { 
    fetch('/game/putGame',{method:'PUT'})
    .then((res) => res.json())
    .then((data) => setPut(JSON.stringify(data)));
    },[]);

  React.useEffect(() =>{
    fetch('/game/deleteGame/game2',{method:'DELETE'})
      .then((res) => res.json())
      .then((data) => setDel(JSON.stringify(data)));
  },[]);  

  return (
    <div className="App">
      <div className="App-header">
        <p>
          {!data ? "Loading..." : data}
        </p>
        <p>Game added with PUT:</p> 
        <p>{!put ? "Loading put..." : put}</p>
        <p>Game deleted with DELETE</p>
        <p>{!del ? "Loading delete..." : del}</p>
      </div>
    </div>
    
  );
}

export default App;
