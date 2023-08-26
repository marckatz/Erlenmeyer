import React, { useEffect, useState } from "react";

import * as yup from 'yup'
import { useFormik } from "formik";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faArrowUpRightFromSquare, faKey } from '@fortawesome/free-solid-svg-icons'

import '../column.css'

function ColumnCard2({ column, handleDelete }) {
    const { id, column_type, is_pk, in_repr } = column
    const [showMenu, setShowMenu] = useState(false)
    const [menuX, setMenuX] = useState(0)
    const [menuY, setMenuY] = useState(0)

    const [isPK, setPK] = useState(is_pk)
    const [inRepr, setInRepr] = useState(in_repr)
    const [name, setName] = useState(column.name)
    const [beingEdited, setBeingEdited] = useState(false)

    useEffect(() => {
        document.addEventListener('click', () => setShowMenu(false))
        document.addEventListener('contextmenu', () => setShowMenu(false))
    })

    const formSchema = yup.object().shape({
        newName: yup.string().required("Must enter a column name").max(30, 'Column name must have at most 30 characters').matches(/^[A-Za-z_][\w]*$/, 'Invalid column name'),
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

    function handleRightClick(e) {
        e.preventDefault()
        setMenuX(e.pageX - e.target.getBoundingClientRect().left)
        setMenuY(e.pageY - e.target.getBoundingClientRect().top)
        setShowMenu(true)
        e.stopPropagation()
    }

    const menuStyle = {
        position: 'absolute',
        left: menuX + 'px',
        top: menuY + 'px',
        display: showMenu ? 'block' : 'none',
        zIndex: '100'
    }

    function handlePK(e) {
        fetch(`/columns/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_pk: !isPK })
        })
            .then(r => r.json())
            .then(newCol => {
                setPK(newCol.is_pk)
            })
    }
    function handleRepr(e) {
        fetch(`/columns/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ in_repr: !inRepr })
        })
            .then(r => r.json())
            .then(newCol => {
                setInRepr(newCol.in_repr)
            })
    }

    return (
        <>
            <Row className="border border-top-0 mx-0 align-items-center column-row" id={`col${id}`} onContextMenu={handleRightClick} style={{ position: 'relative' }}>
                <Col className="text-start" style={{ cursor: 'text' }} onClick={toggleEdited}>
                    {beingEdited ? (
                        <Form onSubmit={formik.handleSubmit} id='editCol'>
                            <Form.Control
                                type="text"
                                name='newName'
                                placeholder={formik.values.newName}
                                value={formik.values.newName}
                                onChange={e => { formik.handleChange(e) }}
                                className="py-0 ps-1"
                                style={{
                                    width: formik.values.newName.length + 3 + 'ch',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                                isInvalid={!!formik.errors.newName} />
                        </Form>
                    ) : (
                        <>{name} <span className="text-muted">{(isPK ? <FontAwesomeIcon icon={faKey} size='xs' /> : '')} {(inRepr ? ' r ' : '')}</span></>
                    )}
                </Col>
                <Col className="text-end text-muted" xs='auto' style={{ cursor: 'default' }}>{column_type}</Col>
                <Col xs='auto' className="border-start px-1">
                    {beingEdited ? (
                        <Button
                            className="py-0 px-1"
                            style={{ margin: '1px 0' }}
                            type="submit"
                            onClick={formik.handleSubmit}
                            variant="outline-success"
                            form='editCol'
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
                {showMenu && (
                    <div style={menuStyle} onContextMenu={e => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}>
                        <ListGroup>
                            <ListGroup.Item action onClick={handlePK}>
                                {isPK ? 'Remove primary key' : 'Make primary key'}
                            </ListGroup.Item>
                            <ListGroup.Item action onClick={handleRepr}>
                                {inRepr ? 'Remove from repr' : 'Add to repr'}
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                )}
            </Row>
        </>
    )
}

export default ColumnCard2