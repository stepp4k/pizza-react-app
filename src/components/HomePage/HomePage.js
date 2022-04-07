import './HomePage.scss'
import { GiFullPizza } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
function HomePage() {
    return (
        <div className='main'>
            <h1 className='main-title'>Welcome to Free Pizza delivery</h1>
            <p className='main-p'>Here you can order some pizza 🍕</p>
            <p><NavLink to='/get-your-pizza'><GiFullPizza size={'200px'} /></NavLink></p>
        </div>
    )
}

export default HomePage;