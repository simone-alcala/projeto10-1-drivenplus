import { useState , useContext } from 'react';
import { Link , useNavigate } from 'react-router-dom';

import UserContext from './../../contexts/UserContext';
import styled from 'styled-components';
import axios from 'axios';

import Logo from './../../assets/logo.png'

function Login(){

  const [userInfo, setUserInfo] = useState({email: '', password: ''})
  const navigate = useNavigate();
  const {setToken,setUserName,setPlan} = useContext(UserContext);
  
  function handleLogin(e){
    e.preventDefault();

    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/login';
    const promise = axios.post(URL,userInfo);
    promise.then((promise)=> {
      promise.data.membership === null ? navigate ('/subscriptions') : navigate ('/home') ;
      setToken(promise.data.token);
      setUserName(promise.data.name);
      setPlan(promise.data.membership);
    });
    promise.catch((error)=> alert(`Erro no login: ${error.response.data.message}`));
  }

   return(
    <Container>
      <img src={Logo} alt='logo' />
      <form onSubmit={handleLogin}>
        <input type='email' placeholder='E-mail' value={userInfo.email} 
          onChange={ e => setUserInfo({...userInfo, email: e.target.value }) }/>
        <input type='password' placeholder='Senha' value={userInfo.password}
          onChange={ e => setUserInfo({...userInfo, password: e.target.value }) }/>       
        <button type='submit'>ENTRAR</button>
        <Link to={'/sign-up'}><p>Não possui uma conta? Cadastre-se</p></Link>
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

export default Login;

