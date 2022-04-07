import api from '../api'
import { useEffect, useState } from "react";
import './Orders.scss';

import Order from "./Order/Order";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    // Retrieves all orders when component is rendered
    useEffect(() => {
        api.get('/orders')
            .then((response) => {
                if (response.status === 200) {
                    setOrders(response.data);
                    setLoading(false);
                }
            })
    }, [])

    // Delete order from array locally, after received confirmation from API
    const handleOrderRemove = (id) => {
        setOrders(orders.filter(item => item.id !== id))
    }

    return (
        <div className="main">
            <h1>Orders</h1>
            {!loading && (
            <>
                {orders.length === 0 && (<p>No orders available, make one first!</p>)}
                <div className='orders'>
                    {orders.map(
                        (order, index) => {
                            return (
                                <Order
                                    key={index}
                                    order={order}
                                    handleOrderRemove={handleOrderRemove}
                                    setLoading={setLoading}
                                />
                            )
                        }
                    )}
                </div>
            </>
            )}
            {loading && (
                <div className='loading'>Loading</div>
            )}
        </div>
    )
}

export default Orders;