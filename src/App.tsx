import Products from "./components/Products"
import { CartProvider } from "./components/CartContext"

function App() {
  

  return (
    <CartProvider>
      <Products />
    </CartProvider>
  )
}

export default App
