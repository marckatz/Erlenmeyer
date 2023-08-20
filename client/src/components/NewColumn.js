import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as yup from 'yup'
import { useFormik } from "formik";

function NewColumn({ tableId, setColumns }) {
    const COLUMN_TYPES = ['Integer', 'String', 'Text', 'DateTime', 'Float', 'Boolean', 'PickleType', 'LargeBinary']

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a column name").max(30, 'Column name must have at most 30 characters').matches(/^[A-Za-z][\w]*$/, 'Invalid column name'),
        colType: yup.string().matches(/^(?:Integer|String|Text|DateTime|Float|Boolean|PickleType|LargeBinary)$/, "Must select a type")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            colType: '0'
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const new_column = {
                name: values.name,
                column_type: values.colType,
                is_pk: false,
                in_repr: false,
                table_id: tableId
            }
            fetch('/columns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(new_column)
            })
                .then(r => r.json())
                .then(data => {
                    setColumns(c => [...c, data])
                    values.name = ''
                    values.colType = '0'
                })
        }
    })

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="gx-0">
                <Col style={{ flexBasis: '25%' }}>
                    <Form.Group controlId="formTable" className="position-relative">
                        <Form.Control
                            type="text"
                            name='name'
                            placeholder="Name"
                            value={formik.values.name}
                            onChange={e => { formik.handleChange(e) }}
                            isInvalid={!!formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col style={{ flexBasis: '35%' }}>
                    <Form.Group controlId="formTableType" className="position-relative">
                        <Form.Select onChange={e => formik.handleChange(e)} value={formik.values.colType} name='colType' isInvalid={!!formik.errors.colType}>
                            <option disabled value={0}>Type</option>
                            {COLUMN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" tooltip>
                            {formik.errors.colType}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col style={{ flexBasis: '40%' }} className="justify-content-center d-flex text-te">
                    <Button type="submit" variant="primary">Submit</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default NewColumn