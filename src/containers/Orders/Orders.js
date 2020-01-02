import React, { Component } from "react";
import axios from "../../axios-orders";

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(response => {
        //console.log(response.data);
        let fetchedOrders = [];
        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            fetchedOrders.push({...response.data[key], id: key });
          }
        }
        this.setState({
          isLoading: false,
          orders: fetchedOrders
        });
        //console.log(fetchedOrders);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
          error: true
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
