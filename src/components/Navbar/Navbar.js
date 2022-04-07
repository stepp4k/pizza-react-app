import './Navbar.scss';
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='navbar navbar-light'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/get-your-pizza'>Place order</NavLink>
            <NavLink to='/orders'>Orders</NavLink>
        </nav>
    )
}

export default Navbar;