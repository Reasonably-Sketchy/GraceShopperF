import React, {useState, useEffect} from 'react';
import OrderProductCard from '../orders/OrderProductCard';

const AdminOrders = ({allOrders, token, userData}) =>{

    if(!allOrders) {
        return <center><h1>Orders Loading....</h1></center>
    };

    return (<>
        <center><h1>Current Orders</h1></center>
        {allOrders.map((order)=>{
            return (
                <React.Fragment key={order.id}>
                    <div id="indieOrder">{order.id}
                    Order
                    </div>
                    
                </React.Fragment>
            )
        })}

    </>)



    console.log('All orders line 4 in adminorders', allOrders)
    return 'this is orders???'
}

export default AdminOrders;