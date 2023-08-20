import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as yup from 'yup'
import { useFormik } from "formik";

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
                })
        }
    })

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="border border-top-0 mx-0">
                    <Col className="table-col border-end align-items-center d-flex" style={{ flexBasis: '25%' }}>
                        {beingEdited ? (
                            <Form.Control
                                type="text"
                                name='newName'
                                placeholder={formik.values.newName}
                                onChange={e => { formik.handleChange(e) }}
                                className="py-0 ps-1 border-top-0 border-bottom-0"
                                isInvalid={!!formik.errors.newName} />
                        ) : (
                            name
                        )}
                    </Col>
                    <Col className="table-col border-end align-items-center d-flex" style={{ flexBasis: '35%' }}>{column_type}</Col>
                    <Col className="table-col align-items-center d-flex justify-content-center" style={{ flexBasis: '20%' }}>
                        <Button
                            onClick={() => setBeingEdited(e => !e)}
                            className="py-0 px-1"
                            style={{ margin: '1px 0' }}
                            variant={beingEdited ? "outline-warning" : "outline-primary"}>
                            {beingEdited ? 'Close' : 'Edit'}
                        </Button>
                    </Col>
                    <Col className="table-col align-items-center d-flex justify-content-center" style={{ flexBasis: '20%' }}>
                        {beingEdited ? (
                            <Button
                                className="py-0 px-1"
                                style={{ margin: '1px 0' }}
                                type="submit"
                                variant="outline-success">
                                Submit
                            </Button>
                        ) : (
                            <Button
                                onClick={()=>handleDelete(id)}
                                className="py-0 px-1"
                                style={{ margin: '1px 0' }}
                                variant="outline-danger">
                                Delete
                            </Button>
                        )}
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default ColumnCard