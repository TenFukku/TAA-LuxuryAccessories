import React from "react";
import {Form , Button, Modal } from "react-bootstrap";
import { MdEmail } from "react-icons/md";


export default function PhoneEmailVal(props) {
  
  const inform = {
    email: 'Nhập email của bạn',
    phone: 'Nhập số điện thoại của bạn'
  }

  return(
    <Form style={{display: props.show? 'block': 'none' }} >
      {/* <Form.Control
        type="text"
        placeholder={props.email? inform.email: inform.phone}
        id="exampleInput"
        aria-describedby="emailHelp"
      /> */}

      <input placeholder="Nhập bla bla"></input>
      <Button 
        variant="primary"
        
        type="submit">
      Lấy mã
      </Button>
    </Form>
  )
}