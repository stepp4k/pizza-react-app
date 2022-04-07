import { useState } from 'react';
import api from '../api'
import uuid from 'react-uuid';
import { NavLink } from 'react-router-dom';
import './PizzaBuilder.scss'

function PizzaBuilder() {

    const [style, setStyle] = useState('');
    const [crust, setCrust] = useState('');
    const [extraCheese, setExtraCheese] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [sending, setSending] = useState(false);  // To Render Loading screen
    const [sent, setSent] = useState(false); // To Render Thank You screen
    const [errorMessage, setErrorMessage] = useState(null);

    // Handle inputs of the form, update the state
    const handleStyleChange = (e) => {
        setStyle(e.target.value)
    }
    const handleCrustChange = (e) => {
        setCrust(e.target.value)
    }
    const handleCheeseChange = (e) => {
        setExtraCheese(e.target.checked)
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    // Handle submission of the form, verify for empty fields
    const handleSubmitForm = (e) => {
        e.preventDefault();


        let errors = [];

        // Check for empty fields in form, add a message to error list if empty
        if (style === '') {
            errors.push('Choose Pizza Style')
        }
        if (crust === '') {
            errors.push('Choose the Crust')
        }
        if (name === '') {
            errors.push('Enter your name')
        }
        if (address === '') {
            errors.push('Enter delivery address')
        }

        // Check if there are erors and update the state with error messages
        if (errors.length > 0) {
            setErrorMessage(errors);
        } else {
            // Gives current order unique ID and assemble into newOrder
            let newOrder = {
                id: uuid(),
                style: style,
                crust: crust,
                cheese: extraCheese,
                name: name,
                address: address
            }

            // Change form state to show sending message
            setSending(true);

            // Send post request to API with current order, clear fields when successfully sent
            api.post('/orders', newOrder)
                .then((response) => {
                    if (response.status === 201) {
                        setSending(false);
                        setSent(true);

                        setStyle('');
                        setCrust('');
                        setExtraCheese(false);
                        setName('');
                        setAddress('');
                    }
                })

            // Clear error messages state if none were found
            setErrorMessage(null);
        }


    }
    
    // Will render Thank You page after successful order submission
    const thankYou = () => {
        return (
            <div className='thank-you'>
                <h2>Success!</h2>
                <p>Thank you for ordering with us. We got your pizza covered.</p>
                <p><em>Check orders for more details</em></p>
                <button className='btn btn-primary'><NavLink to='/orders'>See Orders</NavLink></button>
            </div>
        );
    }

    // Will render form for ordering pizza
    const mainForm = () => {
        return (
            <>
                {!sending && (
                    <div className='main__form'>
                        <h1>Make Your Pizza</h1>
                        <p>Choose pizza you would like</p>
                        <form onSubmit={handleSubmitForm}>
                            <div className='pizza-selector' >
                                <label style={{ display: 'block' }}>
                                    <span className='label__form'>Style</span>
                                    <fieldset >
                                        <input type='radio' value={'pepperoni'} id='pepperoni' name='pizza' onChange={handleStyleChange} checked={style === 'pepperoni'} />
                                        <label className='pizza-radio pepperoni' htmlFor='pepperoni'>Pepperoni</label>
                                        <input type='radio' value={'canadian'} id='canadian' name='pizza' onChange={handleStyleChange} checked={style === 'canadian'} />
                                        <label className='pizza-radio canadian' htmlFor='canadian'>Canadian</label>
                                        <input type='radio' value={'hawaiian'} id='hawaiian' name='pizza' onChange={handleStyleChange} checked={style === 'hawaiian'} />
                                        <label className='pizza-radio hawaiian' htmlFor='hawaiian'>Hawaiian</label>
                                        <input type='radio' value={'margherita'} id='margherita' name='pizza' onChange={handleStyleChange} checked={style === 'margherita'} />
                                        <label className='pizza-radio margherita' htmlFor='margherita'>Margherita</label>
                                        <input type='radio' value={'supreme'} id='supreme' name='pizza' onChange={handleStyleChange} checked={style === 'supreme'} />
                                        <label className='pizza-radio supreme' htmlFor='supreme'>Supreme</label>
                                        <input type='radio' value={'cheese'} id='cheese' name='pizza' onChange={handleStyleChange} checked={style === 'cheese'} />
                                        <label className='pizza-radio cheese' htmlFor='cheese'>Cheese</label>
                                    </fieldset>
                                </label>
                            </div>

                            <div className='crust-selector'>
                                <label style={{ display: 'block' }}>
                                    <span className='label__form'>Crust</span>
                                    <fieldset >
                                        <input type='radio' value={'thin'} id='thin' name='crust' onChange={handleCrustChange} checked={crust === 'thin'} />
                                        <label className='crust-radio' htmlFor='thin'>Thin<br />🤏</label>
                                        <input type='radio' value={'thick'} id='thick' name='crust' onChange={handleCrustChange} checked={crust === 'thick'} />
                                        <label className='crust-radio' htmlFor='thick'>Thick<br />💪</label>
                                        <input type='radio' value={'gluten-free'} id='gluten-free' name='crust' onChange={handleCrustChange} checked={crust === 'gluten-free'} />
                                        <label className='crust-radio' htmlFor='gluten-free'>Gluten-Free<br />🍃</label>
                                    </fieldset>
                                </label>
                            </div>

                            <label style={{ display: 'block' }}>
                                <input className='extra-cheese' type='checkbox' checked={extraCheese} onChange={handleCheeseChange} />
                                <span className='extra-cheese'>Add Extra Cheese 🧀</span>
                            </label>

                            <h3>Your Details</h3>
                            <div className="input-group input-group-lg address_container">
                                <span className="input-group-text" >Name</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={name} onChange={handleNameChange} />
                                <span className="input-group-text"  >Address</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={address} onChange={handleAddressChange} />
                            </div>
                            {errorMessage && (
                                <div className='errors'>
                                    <p>Please complete following:</p>
                                    <ul>
                                        {// Lists all errors if any
                                        errorMessage.map(
                                            (error, index) => (
                                                <li key={index}>{error}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        </form>
                    </div >
                )}
                {// Loading screen
                sending && (
                    <div className='sending'>Sending</div>
                )}
            </>
        )
    }

    // Check state if form was successfully sent then render Thank you page, otherwise render form
    return sent
        ? thankYou()
        : mainForm()
}

export default PizzaBuilder;