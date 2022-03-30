import { useState } from 'react';
import api from '../api'
import uuid from 'react-uuid';

import './PizzaBuilder.scss'
function PizzaBuilder() {

    const [style, setStyle] = useState('');
    const [crust, setCrust] = useState('');
    const [extraCheese, setExtraCheese] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [sending, setSending] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Handle inputs of the form, update state
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
    return (
        <div className='main'>
            <h1>Make Your Pizza</h1>
            <p>Create pizza you would like</p>
            <form onSubmit={handleSubmitForm}>
                {errorMessage && (
                    <div className='errors'>
                        Please complete following: 
                        <ul>
                            {errorMessage.map(
                                (error, index) => (
                                    <li key={index}>{error}</li>
                                )
                            )}
                        </ul>
                    </div>
                )}
                <label style={{ display: 'block' }}>
                    <span>Style</span>
                    <select value={style} onChange={handleStyleChange}>
                        <option value={''}>Select</option>
                        <option value={'hawaiian'}>Hawaiian</option>
                        <option value={'pepperoni'}>Pepperoni</option>
                        <option value={'canadian'}>Canadian</option>
                        <option value={'supreme'}>Supreme</option>
                        <option value={'cheese'}>Cheese</option>
                        <option value={'margherita'}>Margherita</option>
                    </select>
                </label>
                <label style={{ display: 'block' }}>
                    <span>Crust</span>
                    <select value={crust} onChange={handleCrustChange}>
                        <option value={''}>Select</option>
                        <option value={'original'}>Original Crust</option>
                        <option value={'thin'}>Thin Crust</option>
                        <option value={'gluten-free'}>Gluten-Free</option>
                    </select>
                </label>
                <label style={{ display: 'block' }}>
                    <input type='checkbox' checked={extraCheese} onChange={handleCheeseChange} />
                    <span>Extra cheese</span>
                </label>

                <h3>Your Details</h3>
                <label style={{ display: 'block' }}>
                    <span>Name: </span>
                    <input type='text' value={name} onChange={handleNameChange} />
                </label>

                <label style={{ display: 'block' }}>
                    <span>Address: </span>
                    <input type='text' value={address} onChange={handleAddressChange} />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default PizzaBuilder;