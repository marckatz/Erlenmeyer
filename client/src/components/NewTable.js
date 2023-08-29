import React from "react";

import * as yup from 'yup'
import { useFormik } from "formik";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function NewTable({ currentId, forceReset }) {

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a table name").max(30, 'Table name must have at most 30 characters').matches(/^[A-Za-z][\w]*$/, 'Invalid table name'),
    });

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const newTable = {
                name: values.name,
                schema_id: currentId
            }
            fetch('/tables', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTable)
            })
                .then(r => r.json())
                .then(t => {
                    forceReset()
                    values.name = ''
                })
        }
    })

    return (
        <Form className="d-flex mt-3" noValidate onSubmit={formik.handleSubmit}>
            <Row className="justify-content-between gx-2">
                <Col >
                    <Form.Group controlId="formTable" className="position-relative">
                        <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="New Table"
                            name="name"
                            value={formik.values.name}
                            onChange={e => { formik.handleChange(e) }}
                            isInvalid={!!formik.errors.name} />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col xs='auto'>
                    <Button type="submit" variant="success"><FontAwesomeIcon icon={faPlus} /> Add</Button>
                </Col>
            </Row>
        </Form>
    )

}

export default NewTable