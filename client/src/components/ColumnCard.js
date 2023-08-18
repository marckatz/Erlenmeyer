import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ColumnCard({column}) {
    const {id, name, column_type, is_pk} = column

    return (
        <Row >
            <Col className="name-col">{name}</Col>
            <Col className="type-col">{column_type}</Col>
            <Col className="button-col">TODO</Col>
        </Row>
    )
}

export default ColumnCard