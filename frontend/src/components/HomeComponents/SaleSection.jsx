import { Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaleCard from 'components/HomeComponents/SaleCard';
// import 'style/components/Home/SaleSection.scss';

function SaleSection() {
    return (
        <section className='sale_section'>
            <h1 className='title_section' style={{fontSize: '47px'}} >Các ưu đãi khi mua sắm tại TAA</h1>
            <Container className='saleSecCotainer'>
                <Col className='col-6'>
                    <SaleCard
                        title='Hàng mới về giảm lên đến 30%'
                        treatTitle='Dành riêng cho gói hội viên của TAA'
                        // treatDescription='Ưu đãi tuyệt vời đang chờ đón!'
                        btnContent='Tìm hiểu ngay' ></SaleCard>
                </Col>

                <Col className='col-6'>
                    <SaleCard className='col-6'
                        title='Freeship cho mọi đơn hàng'
                        treatTitle='Mã giảm giá trao tay mua ngay kẻo hết'
                        // treatDescription='Mã giảm giá: FREESHIP25'
                        btnContent='Tìm hiểu ngay'></SaleCard>
                </Col>
            </Container>
        </section>
    );

}
export default SaleSection;