function SingleOrder({ order }) {
  return (<>
    <div className="img"> <img src={`images/${order.image}`} /></div><br />
    <h1>{order.name}</h1>
    <p> תאריך הזמנה: {order.orderDate.toLocaleDateString()}   מחיר : {order.globalPrice}    כמות : {order.amount}</p>
  </>);
}

export default SingleOrder;
