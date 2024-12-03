import React from "react";
import QuestionCard from "./QuestionsCard";
import InforCard from "./InforCard";
import { Col, Container } from "react-bootstrap";

function QuestionSection(){
    return(
        <section>
            <Container className="quest_container">
                <Col lg={6} sm={12}>
                    <InforCard className='qaCard' title='Q&A' text='Question and Answear'></InforCard>
                </Col>

                <Col lg={5} sm={12}>
                    <QuestionCard></QuestionCard>
                </Col>
            </Container>
        </section>
    );
}

export default QuestionSection;