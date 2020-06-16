import React from "react";
import "./OrderDetail.css";

function OrderDetail({order}) {
  if (!order) {
    return (<div></div>)
  } else {
    const orderDate = new Date(order.OrderDate).toLocaleDateString();
    const shipDate = new Date(order.ShipDate).toLocaleDateString();
    const dueDate = new Date(order.DueDate).toLocaleDateString();

    return(
      <div>        <table>
          <tbody>
            <tr>
              <td>Order Number:</td>
              <td>{order.SalesOrderNumber}</td>
            </tr>
            <tr>
              <td>Order Date:</td>
              <td>{orderDate}</td>
            </tr>
            <tr>
              <td>Ship Date:</td>
              <td>{shipDate}</td>
            </tr>
            <tr>
              <td>Expected Delivery Date:</td>
              <td>{dueDate}</td>
            </tr>
          </tbody>
        </table>
        <div className="customer">
          <div>{order.Customer.Title} {order.Customer.FirstName} {order.Customer.MiddleName} {order.Customer.LastName} {order.Customer.Suffix}</div>
          <div>{order.Customer.CompanyName}</div>
        </div>
        <div className="billToAddress">Bill to:</div>
        <div>{order.BillToAddress.AddressLine1}</div>
        {order.BillToAddress.AddressLine2 && 
          <div>{order.BillToAddress.AddressLine2}</div>
        }
        <div>{order.BillToAddress.City}, {order.BillToAddress.StateProvince}  {order.BillToAddress.PostalCode}</div>
        <div className="shipToAddress">Ship to:</div>
        <div>{order.ShipToAddress.AddressLine1}</div>
        {order.ShipToAddress.AddressLine2 && 
          <div>{order.ShipToAddress.AddressLine2}</div>
        }
        <div>{order.ShipToAddress.City}, {order.ShipToAddress.StateProvince}  {order.ShipToAddress.PostalCode}</div>
        <table className="lineItems">
          <thead>
            <tr>
              <td>Product</td>
              <td>Number</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Discount</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {order.SalesOrderDetail.map(lineItem => {
              return (<tr key={lineItem.SalesOrderDetailId}>
                <td>{lineItem.Product.Name}</td>
                <td>{lineItem.Product.ProductNumber}</td>
                <td>{lineItem.OrderQty}</td>
                <td className="currency">${lineItem.UnitPrice.toFixed(2)}</td>
                <td>{lineItem.UnitPriceDiscount}</td>
                <td className="currency">${lineItem.LineTotal.toFixed(2)}</td>
              </tr>)
            })}
          </tbody>
        </table>
        <table className="orderTotals">
          <tbody>
            <tr>
              <td className="orderTotalLabel">Subtotal:</td>
              <td className="currency">${order.SubTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="orderTotalLabel">Tax:</td>
              <td className="currency">${order.TaxAmt.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="orderTotalLabel">Shipping:</td>
              <td className="currency">${order.Freight.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="orderTotalLabel">Total:</td>
              <td className="currency">${order.TotalDue.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>      
      </div>
    )
  }

}

export default OrderDetail;