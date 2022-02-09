import { useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { loadCart, deleteFromCart } from '../../store/cart'
import {getAllProducts} from '../../store/product'
import './Cart.css'

function CartPage() {
  const id = useSelector((state) => state.session?.user.id);
  const cartItemsArray = useSelector((state) => state.carts?.cart);
  const products = useSelector((state) => state.product?.products )
  const user = useSelector((state) => state.session?.user)
  const dispatch = useDispatch();
  const [cart, setCart] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(cartItemsArray);
  console.log(products)

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(loadCart(id));
  }, [dispatch, cart]);

  const productIds = cartItemsArray?.map(cartItem => {
    console.log(cartItem)
   return [cartItem.productId, cartItem.quantity, cartItem.id];
  })

 console.log(productIds)
  const cartProducts = productIds?.map(productId => {
    const cartItem = products[productId[0]];
    if (cartItem) {
      cartItem.quantity = productId[1];
      cartItem.cartId = productId[2];
    }
    return cartItem;
  })

  console.log(cartProducts)

  const handleDelete = (cartId) => {
    cartId = +cartId;
    dispatch(deleteFromCart(cartId));
    dispatch(loadCart(id));
  }

  return (
    <>
      <h1>My Cart</h1>

      <div>
        <ul className="cartItems">
          {cartProducts?.map((product) => {
            if (product) {
              return (
                <>
                  <li key={product.img} className="cartImage">
                    {/* <img src={product.imageUrl} /> */}
                  </li>
                  <li key={product.price} className="cartItemPrice">
                    {product.price}
                  </li>
                  <li>{product.cartId}</li>
                  <li><button id={product.cartId} onClick={e => handleDelete(e.target.id)}>Delete</button></li>
                </>
              );
            }
            else {
              return <h1>You have no items in your cart.</h1>
            }
          })}
        </ul>
      </div>
    </>
  );
}

export default CartPage;
