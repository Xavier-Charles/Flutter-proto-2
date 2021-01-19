import React from 'react';

export const CartContext = React.createContext({
  cart: [],
  addProduct: () => {},
  deleteProduct: () => {}
});

// export class cartProvider extends Component {
//   // Context state
//   state = {
//     cart: {},
//   }

//   // Method to update state
//   setCart = (cart) => {
//     this.setState((prevState) => ({ cart }))
//   }

//   render() {
//     const { children } = this.props
//     const { cart } = this.state
//     const { setCart } = this

//     return (
//       <CartContext.Provider
//         value={{
//           cart,
//           setCart,
//         }}
//       >
//         {children}
//       </CartContext.Provider>
//     )
//   }
// }
