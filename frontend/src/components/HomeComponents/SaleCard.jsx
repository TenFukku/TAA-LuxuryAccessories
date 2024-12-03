import Card from 'react-bootstrap/Card';
import Button from 'components/Common/Button';
import './SaleCard.scss'
import { useNavigate } from 'react-router-dom';

function SaleCard(props) {
  const navigate = useNavigate();
  const hanndleOnClick = () => {
    navigate("/products")
  }
  return (
    <Card className='info_card_item'>
      <Card.Body>
        <Card.Title as='h3'>{props.title}</Card.Title>
        <Card.Title as='h5'> {props.treatTitle} </Card.Title>
        <Button className='btn_reg_log_round_32px btn_clickable_boldcolor' label={props.btnContent} onClick={hanndleOnClick}></Button>
      </Card.Body>
    </Card>
  );
}

export default SaleCard;