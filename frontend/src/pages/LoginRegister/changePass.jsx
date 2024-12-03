import React from "react";
import Form from 'react-bootstrap/Form';


function ChangePass(param) { 
        
    return (
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control type="email" placeholder="Nhập mật khẩu mới" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" placeholder="Xác nhận mật khẩu mới" rows={3} />
                </Form.Group>
            </Form>
            );
}
          
    
