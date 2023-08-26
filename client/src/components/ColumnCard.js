import React, { useState } from "react";

import * as yup from 'yup'
import { useFormik } from "formik";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan, faBan, faShareFromSquare } from '@fortawesome/free-solid-svg-icons'

function ColumnCard({ column, handleDelete }) {
    const { id, column_type } = column
    const [name, setName] = useState(column.name)
    const [beingEdited, setBeingEdited] = useState(false)

    const formSchema = yup.object().shape({
        newName: yup.string().required("Must enter a column name").max(30, 'Column name must have at most 30 characters').matches(/^[A-Za-z][\w]*$/, 'Invalid column name'),
    })

    const formik = useFormik({
        initialValues: {
            newName: name,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const updated_column = {
                name: values.newName
            }
            fetch(`/columns/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated_column)
            })
                .then(r => r.json())
                .then(data => {
                    setName(values.newName)
                    setBeingEdited(false)
                    formik.resetForm({
                        values:{
                            newName:values.newName
                        }
                    })
                })
        }
    })

    function toggleEdited(){
        setBeingEdited(e => !e)
        formik.resetForm()
    }

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="border border-top-0 mx-0 gx-1">
                    <Col className="table-col border-end align-items-center d-flex" >
                        {beingEdited ? (
                            <Form.Control
                                type="text"
                                name='newName'
                                placeholder={formik.values.newName}
                                value={formik.values.newName}
                                onChange={e => { formik.handleChange(e) }}
                                className="py-0 ps-1 border-top-0 border-bottom-0"
                                isInvalid={!!formik.errors.newName} />
                        ) : (
                            name
                        )}
                    </Col>
                    <Col className="table-col border-end align-items-center d-flex" xs='auto'>{column_type}</Col>
                    <Col className="table-col align-items-center d-flex justify-content-center" xs='auto'>
                        <Button
                            onClick={toggleEdited}
                            className="py-0 px-1"
                            style={{ margin: '1px 0' }}
                            variant={beingEdited ? "outline-warning" : "outline-primary"}
                            title={beingEdited? "Cancel":"Edit"}>
                            {beingEdited ? <FontAwesomeIcon icon={faBan}/> : <FontAwesomeIcon icon={faPenToSquare} />}
                        </Button>
                    </Col>
                    <Col className="table-col align-items-center d-flex justify-content-center" xs='auto'>
                        {beingEdited ? (
                            <Button
                                className="py-0 px-1"
                                style={{ margin: '1px 0' }}
                                type="submit"
                                variant="outline-success"
                                title="Submit">
                                <FontAwesomeIcon icon={faShareFromSquare} />
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handleDelete(id)}
                                className="py-0 px-1"
                                style={{ margin: '1px 0' }}
                                variant="outline-danger"
                                title="Delete">
                                <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                        )}
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default ColumnCard