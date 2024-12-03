import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import img from 'assets/image/banners/TAA.png';

function ImgSection() {
  return (
    <section className="ImgSection">
      <Container className="img_section">
        <Image src={img} fluid />
      </Container>
    </section>
  );
}

export default ImgSection;
