import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SecretKey from './pages/secret-key';
import NotFound from './pages/NotFound';
import SecretPath from './pages/SecretPath';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret/key" element={<SecretKey />} />
        <Route path="/secret" element={<SecretPath />} />
        <Route path="*" element={<NotFound />} />
      </Routes> 
    </Router>
  );
};

export default App;