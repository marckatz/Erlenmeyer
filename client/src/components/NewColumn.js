import React, { useState } from "react";

import * as yup from 'yup'
import { useFormik } from "formik";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Collapse from 'react-bootstrap/Collapse'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

function NewColumn({ tableId, setColumns }) {
    const COLUMN_TYPES = ['Integer', 'String', 'Text', 'DateTime', 'Float', 'Boolean', 'PickleType', 'LargeBinary']

    const [show, setShow] = useState(false)

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a column name").max(30, 'Column name must have at most 30 characters').matches(/^[A-Za-z_][\w]*$/, 'Invalid column name'),
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
                    formik.resetForm()
                })
        }
    })

    return (
        <>
            <Collapse in={show}>
                <div id='columnForm'>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row className="border border-top-0 mx-0 align-items-center">
                            <Col>
                                <Form.Group controlId="formTable" className="position-relative">
                                    <Form.Control
                                        type="text"
                                        name='name'
                                        placeholder="Name"
                                        value={formik.values.name}
                                        className="py-0 ps-1"
                                        onChange={e => { formik.handleChange(e) }}
                                        style={{
                                            minWidth: '10ch',
                                            width: formik.values.name.length + 2 + 'ch',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }}
                                        isInvalid={!!formik.errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {formik.errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs='auto'>
                                <Form.Group controlId="formTableType" className="position-relative">
                                    <Form.Select
                                        onChange={e => formik.handleChange(e)}
                                        value={formik.values.colType}
                                        name='colType'
                                        isInvalid={!!formik.errors.colType}
                                        className="py-0"
                                    >
                                        <option disabled value={0}>Type</option>
                                        {COLUMN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {formik.errors.colType}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs='auto' className="border-start px-1">
                                <Button
                                    className="py-0 px-1"
                                    style={{ margin: '1px 0' }}
                                    type="submit"
                                    variant="outline-success"
                                    title="Submit">
                                    <FontAwesomeIcon className='fa-fw' icon={faPlus} />
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Collapse>
            <Row>
                <Col xs='auto'>
                    <Button
                        onClick={() => {
                            setShow(!show)
                            formik.resetForm()
                        }}
                        aria-controls="columnForm"
                        aria-expanded={show}
                        className="my-1 py-0 px-1"
                        variant={show ? "warning" : "success"}>
                        {show ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faPlus} />}
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default NewColumn