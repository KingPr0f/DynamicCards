import { FaReact } from "react-icons/fa"
import { PiShoppingCartSimpleFill } from "react-icons/pi"
import { useState, useEffect } from 'react'
import { data } from '../data'
import './Products.css'
import {Book, useCart} from './CartContext'
import Cart from "./Cart"

const Products = () => {

    const {state, dispatch} = useCart()
    const [cartUpdated, setCartUpdated] = useState(false)
    const [openCart, setOpenCart] = useState(false)

    //*Adding Books To The Cart
    const addToCart = (book:Book) => {
        dispatch({type:'ADD_TO_CART', payload: {...book, count: 1}})
    }

    //*Opening The Cart
    const openCartHandler = () => {
        setOpenCart(true)
    }

    //*Closing The Cart
    const closeCartHandler = () => {
        setOpenCart(false)
    }

    //*Total Items
    const totalCartCount = state.cart.reduce((total, book) => {
        const countToAdd = typeof book.count === 'number' ? book.count : 0;
        const newTotal = total + countToAdd;
        return newTotal
    }, 0)

    useEffect(() => {
        setCartUpdated(true);

        const timeoutId = setTimeout(() => {
            setCartUpdated(false)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [state.cart])
    
    return (
        <>
            <div className="navbar">
                <div className='logo'>
                    <FaReact />
                    <h1>MikiK</h1>
                    <FaReact />
                </div>

                <h2 onClick={openCartHandler}>
                    <PiShoppingCartSimpleFill />
                    <span className={cartUpdated ? 'bounce' : ''}>{totalCartCount}</span>
                </h2>
            </div>

            <div className='main'>
                {data.map((book) => (
                    <div key={book.id} className='book'>
                        <img src={book.image} alt={book.name} />
                        <div className='bookInfo'>
                            <h2>{book.name}</h2>
                            <p>By: {book.author}</p>
                            <p>Pages: {book.pages}</p>
                            <p>Year: {book.year}</p>
                            <p>Price: ${book.price}</p>
                        </div>
                        <button onClick={() => addToCart({...book, count: 1})}>Add To Cart</button>
                    </div>
                ))}
            </div>

            {openCart && <Cart closeCart={closeCartHandler} />}
        </>
    )
}

export default Products