import Products from "./pages/Products/Products"
import Users from "./pages/users/Users"
import Orders from "./pages/orders/Orders"
import Offs from "./pages/offs/Offs"
import Comments from './pages/comments/Comments'
import App from "./App"

let routes = [
    {path : '/products' , element : <Products />},
    {path : '/comments' , element : <Comments />},
    {path : '/users' , element : <Users />},
    {path : '/orders' , element : <Orders />},
    {path : '/offs' , element : <Offs />},
]

export {routes}