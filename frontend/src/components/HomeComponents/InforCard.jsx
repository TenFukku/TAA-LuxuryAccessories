import React from "react";
import Card from 'react-bootstrap/Card';

function InforCard(props) {
    return (
        <Card className={props.className}>
            <Card.Body>
                <Card.Title style={{textAlign: 'center'}}>{props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default InforCard;