import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Header({ user }){

    const linkStyles = {
        textDecoration: 'none',
        color:'white'
    }

    let textDec = 'none'
    if (user) {
        textDec = 'underline'
    }


// NOTE: Swap nav.links out for the NavLink once react router is up and running!
    return (
        <div>
            
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                <Image
                className="m-3"
                    alt=""
                    src="./sr2.png"
                    width="150"
                    height="150"
                    rounded
                />{' '}
                </Navbar.Brand>
                <Nav className='p-3 fs-2 text-white'>
                    <NavLink 
                        exact to="/" 
                        className='text-white me-5 ms-3' 
                        style={linkStyles} 
                        activeStyle={{textDecoration: textDec}} 
                    >
                        My Workouts
                    </NavLink>
                    <NavLink 
                        exact to="/explore" 
                        className='text-white me-5' 
                        style={linkStyles} 
                        activeStyle={{textDecoration: textDec}} 
                    >
                        Explore + Find
                    </NavLink>
                    <NavLink 
                        to="/create" 
                        className='text-white me-5'
                        style={linkStyles} 
                        activeStyle={{textDecoration: textDec}} 
                    >
                        Create
                    </NavLink>
            </Nav>
            </Navbar>
        </div>
    )
}

export default Header