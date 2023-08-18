import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import * as yup from 'yup'
import { useFormik } from "formik";

function NewColumn({ tableId, setColumns }) {
    const COLUMN_TYPES = ['Integer', 'String', 'Text', 'DateTime', 'Float', 'Boolean', 'PickleType', 'LargeBinary']
    const [colType, setColType] = useState('Integer')

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a column name").max(30, 'Column name must have at most 30 characters').matches(/^[A-Za-z][\w]*$/, 'Invalid column name'),
    })

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            const new_column = {
                name: values.name,
                column_type: colType,
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
                    setColType(COLUMN_TYPES[0])
                })
        }
    })

    return (
        <Form className="row align-items-center" noValidate onSubmit={formik.handleSubmit}>
            <Row>
                <Col>
                    <Form.Group controlId="formTable" className="position-relative">
                        <Form.Control
                            type="text"
                            name='name'
                            placeholder="Column Name"
                            value={formik.values.name}
                            onChange={e => { formik.handleChange(e) }}
                            isInvalid={!!formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Select onChange={e => setColType(e.target.value)} value={colType}>
                        {COLUMN_TYPES.map(t => <option key={`'${t}'`} value={`'${t}'`}>{t}</option>)}
                    </Form.Select>
                </Col>
                <Col className="col">
                    <Button type="submit" variant="primary">Submit</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default NewColumn