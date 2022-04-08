import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';
import UserContext from './../../contexts/UserContext';

function Home(){

  const navigate = useNavigate();
  const { token, plan, userName } = useContext(UserContext);

  function changePlan(){
    navigate('/planos')
  }

  function cancelPlan(){
    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions';
    const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.delete(URL,CONFIG);
    promise.then(promise=> {
      alert('Plano cancelado com sucesso!');
      navigate ('/subscriptions')
    });
    promise.catch(error=> alert(`Erro ao carregar dados: \n\n${error.response.status} ${error.response.data.message}`));   
  }

  return Object.values(plan).length > 0  ? (
    <Container>
      <Header>
        <img src={plan.image} alt='Driven'/>
        <ion-icon name="person-circle"></ion-icon>
      </Header>
      <P>Olá, {userName} </P>
      {plan.perks.map( perk => 
        <a key={perk.id} href={perk.link} target='_blank' rel='noreferrer'> <Perks>{perk.title}</Perks> </a> )}
      <Change onClick={changePlan}>Mudar plano</Change>
      <Cancel onClick={cancelPlan}>Cancelar plano</Cancel>
    </Container>
  ):<></> ;
}

const Container = styled.section`
	width: 320px;
	height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  margin: 0 auto; 

  a{
    color: #fff;
  }

`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items:flex-start;
  margin-top: 32px;

  img{
    height: 50px;
    margin-left: 10px;
  }

  ion-icon{
    color: #fff;
    font-size: 35px;
  }
`;

const P = styled.p`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 70px;
`;

const Perks = styled.div`
  width: 299px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--pink);
  border-radius: 8px;
  margin-bottom: 8px;
`;

const Change = styled.div`
  width: 299px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--pink);
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  position: fixed;
  bottom: 85px;
`;

const Cancel = styled.div`
  width: 299px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--coral);
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
`;

export default Home;