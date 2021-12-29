import React from 'react';
import './App.css';
import Login from './components/login';
function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, []);
  console.log(user);
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;