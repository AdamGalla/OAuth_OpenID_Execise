import "./App.css";

function App() {

  const logIn = (() => {
    fetch('http://localhost:3000/auth')
    .then((response) => response.text())
    .then((body) => {
      window.location.href = body;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  })
  
  return (
    <div className="App">
          <div className="card">
        <button onClick={() => logIn()}>
          LogIn with Keycloack
        </button>
      </div>
    </div>
    )
  }
export default App;
