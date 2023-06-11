import axios from 'axios';
import { useEffect } from 'react';
import './styles/reset.css'

import Container from './components/Container';

function App() {
  const callApi = async () => {
    axios
      .get('/api/return?text=helei')
      .then((res) => console.log(res.data.test));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <Container></Container>
    </>
  );
}

export default App;
