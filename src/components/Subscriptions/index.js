import { useState , useContext ,useEffect} from 'react';
import { Link , useNavigate } from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';
import UserContext from './../../contexts/UserContext';

function Subscriptions(){

  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const {token} = useContext(UserContext);

  useEffect(()=>{
    if (token !== ''){
      const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships';
      const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
      const promise = axios.get(URL,CONFIG);
      promise.then((promise)=> setPlans([...promise.data]));
      promise.catch((error)=> alert(`Erro ao carregar planos: \n\n${error.response.status} ${error.response.data.message}`));
    }
  },[token]);

  return(
    <Container>
      <p>Escolha seu Plano</p>
      {plans.length > 0 &&
        plans.map ((plan) =>
          <div key={plan.id} onClick={() => navigate(`/subscriptions:${plan.id}`)}>
            <img src={plan.image} alt='Driven' />
            <span>{`R$ ${plan.price.toString().replace('.',',')}`}</span>
          </div>
        )           
      }
    </Container>
  );
}

const Container = styled.section`
	width: 100%;
	height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #fff;

  div{
    width: 290px;
    height: 180px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background: var(--black);
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  img{
    height: 95px;
  }

  span{
    font-weight: 700;
    font-size: 24px;
    color: #fff;
  }

  p{
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 24px;
  }

`;

export default Subscriptions;

