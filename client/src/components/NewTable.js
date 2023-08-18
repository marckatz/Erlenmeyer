import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as yup from 'yup'
import { useFormik } from "formik";

function NewTable({ currentId, forceReset }) {
    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(30,'Table name must have at most 30 characters').matches(/^[A-Za-z][\w$#]*$/,'Invalid table name'),
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
            })
        }
    })

    return (
        <Form className="d-flex mt-3" noValidate onSubmit={formik.handleSubmit}>
            <Row className="align-items-center">
                <Col xs='auto'>
                    <Form.Group controlId="formTable" className="position-relative">
                        <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Table Name"
                            name="name"
                            value={formik.values.name}
                            onChange={e => {formik.handleChange(e)}}
                            isInvalid={!!formik.errors.name} />
                    <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.name}
                    </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Button type="submit" variant="outline-primary">Submit</Button>
                </Col>
            </Row>
        </Form>
    )

}

export default NewTable