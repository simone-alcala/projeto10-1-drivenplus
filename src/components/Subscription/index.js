import { useState , useContext ,useEffect} from 'react';
import { Link, useNavigate , useParams} from 'react-router-dom';

import axios from 'axios';
import styled from 'styled-components';
import UserContext from './../../contexts/UserContext';

function Subscription(){
 
  const navigate = useNavigate();
  const { planId } = useParams();
  const { token, setPlan } = useContext(UserContext);
  const [ planInfo , setPlanInfo] = useState({id: ''});
  const [ cardInfo, setCardInfo] = useState({
    membershipId: planId.replace(':',''),cardName:'',cardNumber:'',securityNumber:'',expirationDate:''})
  const [ showModal, setShowModal] = useState(false);

  useEffect(()=>{
    if (token !== ''){
      const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${planId.replace(':','')}`;
      const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
      const promise = axios.get(URL,CONFIG);
      promise.then((promise)=> setPlanInfo({...promise.data}));
      promise.catch((error)=> alert(`Erro ao carregar plano: \n\n${error.response.status} ${error.response.data.message}`));
    }
  },[token]);

  function subscribe(e){
    e.preventDefault();
    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions';
    const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
    const promise = axios.post(URL,cardInfo,CONFIG);
    promise.then((promise)=> {
      setPlan(promise.data.membership);
      navigate('/home');
    });
    promise.catch((error)=> alert(`Erro ao assinar: ${error.response.status}`));
  }

  function validadeCard(creditCard){
    return creditCard
      .replace(/\D/g,'')
      .replace(/(\d{4})(\d)/,'$1 $2')
      .replace(/(\d{4})(\d)/,'$1 $2')
      .replace(/(\d{4})(\d)/,'$1 $2')
      .replace(/(\d{4})(\d)/g,'$1');
  }

  function validadeCode(code){
    return code
      .replace(/\D/g,'')
      .replace(/^(\d{3})(\d)/g,'$1');
  }

  function validadeDate(date){
    return date
    .replace(/\D/g,'')
    .replace(/(\d{2})(\d)/,'$1/$2')
    .replace(/(\d{2})(\d)/g,'$1');
  }

  return planInfo.id !== '' ?  (
    <Container>
      <Link to='/subscriptions'><ion-icon name="arrow-back-outline"></ion-icon> </Link>
      <img src={planInfo.image} alt='Driven' />

      <strong>Driven Plus</strong>

      <div>
        <p>Benefícios</p>
          {planInfo.perks.map(({id,membershipId,title,link},index)=> 
            (<span key={id}>{index+1}. {title} </span>
        ))}

        <p>Preço</p>
        <span>R$ {planInfo.price.toString().replace('.',',')} cobrados mensalmente</span>
      </div>

      <form >
        <input type='text' placeholder='Nome impresso no cartão' value={cardInfo.cardName} 
          onChange={ e => setCardInfo({...cardInfo, cardName: e.target.value }) }/>

        <input type='text' placeholder='Dígitos do cartão' value={cardInfo.cardNumber} 
          onChange={ e => setCardInfo({...cardInfo, cardNumber: validadeCard(e.target.value) }) }/>

        <Div>
          <Input type='text' placeholder='Código de segurança' value={cardInfo.securityNumber} 
            onChange={ e => setCardInfo({...cardInfo, securityNumber: validadeCode(e.target.value) }) }/>    

          <Input type='text' placeholder='Validade' value={cardInfo.expirationDate} 
            onChange={ e => setCardInfo({...cardInfo, expirationDate: validadeDate(e.target.value) }) }/>  
        </Div>

        <Button type='button' onClick={() => setShowModal(true) }>Assinar</Button>

        {showModal && 
          <Modal show={showModal}> 
            <div>
              Tem certeza que deseja assinar o plano {planInfo.name} (R$ {planInfo.price.toString().replace('.',',')})?
              <Buttons>
                <No onClick={()=> setShowModal(false)} >NÃO</No>
                <Yes onClick={subscribe} >SIM</Yes>
              </Buttons>
            </div>

          </Modal> }
        
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
  position: relative;

  form{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  input {
    margin-top: 7px;
    padding-left: 5px;
  }

  input::placeholder{
    font-size: 12px;
    padding-left: 5px;
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

  strong{
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin: 12px;
  }

  a{
    position: absolute;
   top: 10px;
   left: 0px;
  }

  ion-icon{
   color: #fff;
   font-size: 40px;
   
   cursor: pointer;
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

const Button = styled.button`
  width: 299px;
  height: 52px;
  margin: 12px 0;
  color: #fff;
  border-radius: 8px;
  background-color: var(--pink);
  cursor: pointer;
`;

const Modal = styled.section`
  width:100%;
  height: 100%;
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  
  div { 
    width: 248px;
    height: 210px;
    background: #FFF;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #000;
    padding: 22px;

  }
  `;

const Buttons = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
`;

const No = styled.button`
  width: 90px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #CECECE ;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

const Yes = styled.button`
  width: 90px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #FF4791 ;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

export default Subscription;

