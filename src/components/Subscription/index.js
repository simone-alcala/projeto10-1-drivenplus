import { useState , useContext ,useEffect} from 'react';
import { Link , useNavigate , useParams} from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';
import UserContext from './../../contexts/UserContext';

function Subscription(){
 
  const navigate = useNavigate();
  const { planId } = useParams();
  const { token } = useContext(UserContext);
  const [ planInfo , setPlanInfo] = useState({id: ''});
  const [ cardInfo, setCardInfo] = useState({
    membershipId: planId.replace(':',''),cardName:'',cardNumber:'',securityNumber:'',expirationDate:''})

  useEffect(()=>{
    if (token !== ''){
      const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planId.replace(':','')}`;
      const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
      const promise = axios.get(URL,CONFIG);
      promise.then((promise)=> setPlanInfo({...promise.data}));
      promise.catch((error)=> alert(`Erro ao carregar plano: ${error.response.status}`));
      
    }
  },[token]);

  function subscribe(e){
    e.preventDefault();
      
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(`Tem certeza que deseja assinar o plano Driven Plus (R$ ${planInfo.price.toString().replace('.',',')})?`);

    if (confirmation) {
      
      const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions';
      const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
      const promise = axios.post(URL,cardInfo,CONFIG);
      promise.then((promise)=> navigate('/home'));
      promise.catch((error)=> alert(`Erro ao carregar assinar: ${error.response.status}`));


    } else {
      return;
    }

  }

  return planInfo.id !== '' ?  (
    <Container>
      <img src={planInfo.image} alt='Driven' />

      <strong>Driven Plus</strong>

      <div>
        <p>Benefícios</p>
          {planInfo.perks.map(({id,membershipId,title,link},index)=> 
            (<span key={id}>{index+1}. <a href={link} target='_blank' rel='noreferrer' > {title} </a></span>
        ))}

        <p>Preço</p>
        <span>R$ {planInfo.price.toString().replace('.',',')} cobrados mensalmente</span>
      </div>

      <form onSubmit={subscribe}>
        <input type='text' placeholder='Nome impresso no cartão' value={cardInfo.cardName} 
          onChange={ e => setCardInfo({...cardInfo, cardName: e.target.value }) }/>

        <input type='text' placeholder='Dígitos do cartão' value={cardInfo.cardNumber} 
          onChange={ e => setCardInfo({...cardInfo, cardNumber: e.target.value }) }/>

        <Div>
          <Input type='text' placeholder='Código de segurança' value={cardInfo.securityNumber} 
            onChange={ e => setCardInfo({...cardInfo, securityNumber: e.target.value }) }/>    

          <Input type='text' placeholder='Validade' value={cardInfo.expirationDate}
            onChange={ e => setCardInfo({...cardInfo, expirationDate: e.target.value }) }/>  
        </Div>

        <button type='submit'>Assinar</button>
        
      </form>  
 
      
    </Container>
  ) : <></>;
}

const Container = styled.section`
	width: 299px;
	height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  margin: 0 auto; 

  form{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  input {
    margin-top: 7px;
    padding: 0px;
  }

  input::placeholder{
    font-size: 12px;
  }

  button{
    width: 299px;
    height: 52px;
    margin: 12px 0;
    color: #fff;
    border-radius: 8px;
    background-color: var(--pink);
    cursor: pointer;
  }

  p{
    color: #fff;
    font-size: 16px;
    margin:10px 0;
  }

  span{
    color: #fff;
    font-size: 14px;
    margin:2px 0;
  }

  div{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
  }

  a{
    color: #fff;
  }

  strong{
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin: 12px;
  }

`;

const Input = styled.input`
  width: 145px;
`;

const Div = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default Subscription;

