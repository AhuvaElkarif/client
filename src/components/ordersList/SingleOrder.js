function SingleOrder({ order }) {
  return (<>
    <div className="img"> <img src={`images/${order.image}`} /></div><br />
    <h1>{order.Name}</h1>
    <p> תאריך הזמנה: {order.OrderDate.toLocaleDateString()}   מחיר : {order.GlobalPrice}    כמות : {order.Amount}</p>
  </>);
}

export default SingleOrder;
