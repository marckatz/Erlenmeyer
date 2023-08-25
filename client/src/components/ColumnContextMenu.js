import React, { useContext, useEffect } from 'react'
import { MenuContext } from '../context/menu'
import { ListGroup } from 'react-bootstrap'

function ColumnContextMenu() {
    const {showMenu, setShowMenu, xPos, yPos} = useContext(MenuContext)

    useEffect(() => {
        document.addEventListener('click', ()=>setShowMenu(false))
        return () => document.removeEventListener('click', ()=>setShowMenu(false))
    },[])

    const style = {
        position:'absolute',
        left: xPos+'px',
        top:yPos+'px',
        display: showMenu?'block':'none',
    }

    function handleClick(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function handleEdit(e){
        console.log('edit')
    }
    function handleDelete(e){
        console.log('delete')
    }

    return (
        <div style={style} onClick={handleClick}>
            <ListGroup>
                <ListGroup.Item action onClick={handleEdit}>Edit</ListGroup.Item>
                <ListGroup.Item action onClick={handleDelete}>Delete</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default ColumnContextMenu