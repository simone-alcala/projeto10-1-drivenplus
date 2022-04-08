import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';

function Signup(){

  const [userInfo, setUserInfo] = useState({name: '', cpf: '', email: '', password: ''})
  const navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault();
    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up';
    const promise = axios.post(URL,userInfo);
    promise.then((promise)=> navigate('/'));
    promise.catch((error)=> alert(`Erro no cadastro: \n\n${error.response.status} ${error.response.data.message}`));
  }

  function validateCPF(cpf){
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  return(
    <Container>
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='Nome' value={userInfo.name} 
          onChange={ e => setUserInfo({...userInfo, name: e.target.value }) }/>
        <input type='text' placeholder='CPF' value={userInfo.cpf} 
          onChange={ e => setUserInfo({...userInfo, cpf: validateCPF(e.target.value) }) }/>
        <input type='email' placeholder='E-mail' value={userInfo.email} 
          onChange={ e => setUserInfo({...userInfo, email: e.target.value }) }/>    
        <input type='password' placeholder='Senha' value={userInfo.password}
          onChange={ e => setUserInfo({...userInfo, password: e.target.value }) }/>   
        <button type='submit'>ENTRAR</button>
        <Link to={'/'}><p>Já possuí uma conta? Entre</p></Link>
      </form>          
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

  img{
    margin-top: 130px;
    margin-bottom: 100px;
  }

  form{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  input {
    margin-top: 16px;
  }

  button{
    width: 299px;
    height: 52px;
    margin: 24px 0;
    color: #fff;
    border-radius: 8px;
    background-color: var(--pink);
    cursor: pointer;
  }

  p{
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }

`;

export default Signup;

