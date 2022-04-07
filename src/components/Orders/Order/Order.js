import api from '../../api'
import './Order.scss';

const Order = (props) => {

    const id = props.order.id;
    const style = props.order.style;
    // Issue DELETE request to API to remove this instance of order
    // Set status of Loading until confirmation of deletion from API is received
    const removeOrder = () => {

        props.setLoading(true);

        api.delete('/orders/' + id)
            .then((response) => {
                if (response.status === 200) {
                    // Pass ID of removed task to parent to delete locally
                    props.handleOrderRemove(id);
                    props.setLoading(false);
                }
            })
    }

    return (
        <div className="main__order">
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={require(`../../../img/${style}.png`)} className="img-fluid rounded-start" alt="ya" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">Order of {props.order.name}</h5>
                            <p className="card-text">Address: {props.order.address}</p>
                            <p className="card-text">Pizza Style: {props.order.style}</p>
                            <p className="card-text">Crust: {props.order.crust}</p>
                            <p className="card-text">{props.order.cheese ? 'Extra Cheese 🧀' : ''}</p>
                            <p className="card-text"><small className="text-muted">Order ID: {id}</small></p>
                            <button className="btn btn-primary" onClick={removeOrder}>Remove</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Order;