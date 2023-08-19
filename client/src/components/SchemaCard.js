import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Col from "react-bootstrap/Col"
import { Link } from 'react-router-dom'

function SchemaCard({ schema }) {
    const { id, name, users, tables } = schema

    const displayUsers = () => {
        if (users.length === 1) {
            return users[0].username
        }
        else if (users.length === 2) {
            return users[0].username + " and " + users[1].username
        }
        else {
            return users.slice(0, -1).map(u => u.username).join(', ') + ', and ' + users.at(-1).username
        }
    }

    const tableArray = () => {
        return tables.map(table => <li key={table.id}>{table.name}</li>)
    }

    return (
        <Col>
            <Card>
                <Card.Body>
                    <Link to={{ pathname: '/schema', state: { id } }} style={{textDecoration:'none'}}><Card.Title>{name}</Card.Title></Link>
                    <Card.Subtitle className='mb-2 text-muted text-truncate'>
                        By {displayUsers()}
                    </Card.Subtitle>
                    Tables:
                    <ul>
                        {tableArray()}
                    </ul>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default SchemaCard