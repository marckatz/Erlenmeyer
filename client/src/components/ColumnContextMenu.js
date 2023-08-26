import React, { useContext, useEffect, useState } from 'react'
import { MenuContext } from '../context/menu'
import { ListGroup } from 'react-bootstrap'

function ColumnContextMenu({xPos, yPos, showMenu, setShowMenu}) {
    

    useEffect(() => {
        const turnOff = () => {
            setShowMenu && setShowMenu(false) 
        }
        document.addEventListener('click', turnOff)
        // document.addEventListener('contextmenu', turnOff)
        return () => {
            document.removeEventListener('click', turnOff)
            // document.removeEventListener('contextmenu', turnOff)
        }
    }, [])

    const style = {
        position: 'absolute',
        left: xPos + 'px',
        top: yPos + 'px',
        display: showMenu ? 'block' : 'none',
        zIndex: '100'
    }

    function handlePK(e) {
        // handleUpdate(!currentPK, currentRepr)
        // setCurrentPK(pk => !pk)
    }
    function handleRepr(e) {
        // handleUpdate(currentPK, !currentRepr)
        // setCurrentRepr(repr => !repr)
    }

    return (
        <div style={style} onContextMenu={e=>{
            e.stopPropagation()
            e.preventDefault()
            }}>
            <ListGroup>
                <ListGroup.Item action onClick={handlePK}>
                    PK
                    {/* {currentPK?'Remove primary key':'Make primary key'} */}
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleRepr}>
                    repr
                    {/* {currentRepr?'Remove from repr':'Add to repr'} */}
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default ColumnContextMenu