import React, { useState } from "react";

import ColumnCard from "./ColumnCard";
import ColumnCard2 from "./ColumnCard2";
import NewColumn from "./NewColumn";

import '../TableCard.css'

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button"
import Collapse from 'react-bootstrap/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

function TableCard({ table }) {
    const { id, name } = table
    const [columns, setColumns] = useState(table.columns)
    const [show, setShow] = useState(false)

    function handleDelete(columnId) {
        fetch(`/columns/${columnId}`, {
            method: "DELETE"
        })
            .then(r => {
                if (r.ok) {
                    setColumns(cs => cs.filter(c => c.id !== columnId))
                }
            })
    }

    const create_rows = columns.map((col) => {
        return <ColumnCard2 key={col.id} column={col} handleDelete={handleDelete} />
        // return <ColumnCard key={col.id} column={col} handleDelete={handleDelete} />
    });

    return (
        <Col xs='auto'>
            <Card className="shadow" style={{ height: '100%' }}>
                <Card.Body>
                    <Card.Title>
                        {name}
                    </Card.Title>
                    <Row className="border mx-0 align-items-center">
                        <Col className="text-start fw-bold" >Name</Col>
                        <Col className="text-end fw-bold" xs='auto'>Type</Col>
                        <Col className="border-start px-1" xs='auto'>
                            <Button
                                className="py-0 px-1"
                                style={{ margin: '1px 0', color: 'transparent', backgroundColor: 'transparent', borderColor: 'transparent' }}
                                disabled>
                                <FontAwesomeIcon className='fa-fw' icon={faArrowUpRightFromSquare} />
                            </Button>
                        </Col>
                    </Row>
                    {create_rows}
                    <Collapse in={show}>
                        <div id='columnForm'>
                            <NewColumn setColumns={setColumns} tableId={id} />
                        </div>
                    </Collapse>
                    <Row>
                        <Col xs='auto'>
                            <Button
                                onClick={() => setShow(!show)}
                                aria-controls="columnForm"
                                aria-expanded={show}
                                className="my-1 py-0 px-1"
                                variant={show ? "warning" : "success"}>
                                {show ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faPlus} />}
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TableCard