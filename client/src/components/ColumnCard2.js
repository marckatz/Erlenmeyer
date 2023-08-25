import React, { useContext, useState } from "react";

import * as yup from 'yup'
import { useFormik } from "formik";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

// import ColumnContextMenu from "./ColumnContextMenu";
// import { MenuContext } from "../context/menu";

import '../column.css'

function ColumnCard2({ column, handleDelete }) {
    // const { setShowMenu, setXPos, setYPos } = useContext(MenuContext)
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
                        values: {
                            newName: values.newName
                        }
                    })
                })
        }
    })

    function toggleEdited(e) {
        setBeingEdited(true)
        const clickEvent = () => {
            setBeingEdited(false)
            document.removeEventListener('click', clickEvent)
        }
        document.addEventListener('click', clickEvent)
        formik.resetForm()
        e.stopPropagation()
    }


    // function handleRightClick(e) {
    //     e.preventDefault()
    //     setShowMenu(true)
    //     setXPos(e.pageX)
    //     setYPos(e.pageY)
    // }

    return (
        <Row className="border border-top-0 mx-0 align-items-center column-row" id={`col${id}`}>
            <Col className="text-start" style={{ cursor: 'text' }} onClick={toggleEdited}>
                {beingEdited ? (
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Control
                            type="text"
                            name='newName'
                            placeholder={formik.values.newName}
                            value={formik.values.newName}
                            onChange={e => { formik.handleChange(e) }}
                            className="py-0 ps-1"
                            style={{
                                width: formik.values.newName.length + 2 + 'ch',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                            isInvalid={!!formik.errors.newName} />
                    </Form>
                ) : (
                    name
                )}
            </Col>
            <Col className="text-end text-muted" xs='auto' style={{cursor:'default'}}>{column_type}</Col>
            <Col xs='auto' className="border-start px-1">
                {beingEdited ? (
                    <Button
                        className="py-0 px-1"
                        style={{ margin: '1px 0' }}
                        type="submit"
                        variant="outline-success"
                        title="Submit">
                        <FontAwesomeIcon className='fa-fw' icon={faArrowUpRightFromSquare} />
                    </Button>
                ) : (
                    <Button
                        onClick={() => handleDelete(id)}
                        className="py-0 px-1"
                        style={{ margin: '1px 0' }}
                        variant="outline-danger"
                        title="Delete">
                        <FontAwesomeIcon className='fa-fw' icon={faTrashCan} />
                    </Button>
                )}
            </Col>
        </Row>
    )
}

export default ColumnCard2