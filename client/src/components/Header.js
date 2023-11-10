import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function Header(){

    const linkStyles = {
        textDecoration: 'none',
        color:'white'
    }
// NOTE: Swap nav.links out for the NavLink once react router is up and running!
    return (
        <div>
            
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                <Image
                className="m-3"
                    alt=""
                    src="./squawk-rack-high-resolution-logo.png"
                    width="150"
                    height="150"
                    rounded
                />{' '}
                </Navbar.Brand>
                <Nav className='p-2 fs-4 text-white'>
                    <Nav.Link 
                        href="#home" 
                        className='text-white me-5 ms-3' 
                        style={linkStyles} 
                        activeStyle={{textDecoration: 'overline'}}
                    >
                        My Workouts
                    </Nav.Link>
                    <Nav.Link 
                        href="#features"
                        className='text-white me-5 ms-3' 
                        style={linkStyles} 
                        activeStyle={{textDecoration: 'overline'}}
                    >Explore + Find </Nav.Link>
                    <Nav.Link 
                        href="#pricing"
                        className='text-white me-5 ms-3' 
                        style={linkStyles} 
                        activeStyle={{textDecoration: 'overline'}}
                    >Create</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header