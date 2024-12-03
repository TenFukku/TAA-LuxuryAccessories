import React from "react";
import InforCard from "./InforCard";
import { Container, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '/style/components/Home/InfoSection.scss';



function InfoSection(props) {
    return (
        <section className="infoSec">
        <h1 className="title_section">Tại sao nên mua sắm trên TAA ?</h1>
        <Container className="info_containter" fluid>
            
                <InforCard className='info_item' title="20.000" text="Người dùng"></InforCard>

                <InforCard className='info_item' title="6.800" text="Đối tác"></InforCard>

                <InforCard className='info_item' title="30.000+" text="Sản phẩm"></InforCard>

                <InforCard className='info_item' title="24/7" text="Hỗ trợ tuyệt vời"></InforCard>
        </Container>
        </section>
    );

}
export default InfoSection;