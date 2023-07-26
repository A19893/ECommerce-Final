import Login from '../Pages/Login'
import Home from '../Pages/Home'
import Profile from '../Pages/Profile'
import Signup from '../Pages/Signup'
import Role from '../Pages/Role'
import UploadProducts from '../Pages/UploadProducts'
import SpecificProduct from '../Pages/SpecificProduct'
import Cart from '../Pages/Cart'
import Address from '../Pages/Address'
import BuyNow from '../Pages/BuyNow'
import Confirm from '../Pages/Confirm'
import Orders from '../Components/Orders/Orders'
import SpecificOrder from '../Pages/SpecificOrder'
import Dashboard from '../Pages/Dashboard'
import ViewProducts from '../Components/Products/ViewProducts'
import UpdateProduct from '../Pages/UpdateProduct'
import ViewOrders from '../Components/Orders/ViewOrders'
import UpdateOrder from '../Pages/UpdateOrder'
import ViewUsers from '../Components/Users/ViewUsers'
import ViewVendors from '../Components/Views/ViewVendors'
import Chat from '../Pages/ChatRoom'
import ViewChats from '../Components/Chats/ViewChats'
export const publicRoutes=[
 {
    path:"/",
    element:<Signup/>
 },
 {
    path:"/login",
    element:<Login/>
 },
 {
    path:"/*",
    element:<Login/>
 }
]
export const privateRoutes=[
    {
      path:"/home",
      element:<Home/>
    },
    {
        path:"/profile",
        element:<Profile/>
    },
    {
      path:"/role",
      element:<Role/>
    },
    {
      path:"/upload",
      element:<UploadProducts/>
    },
    {
      path:"/specific",
      element:<SpecificProduct/>
    },
    {
      path:"/cart",
      element:<Cart/>
    },
    {
      path:"/address",
      element:<Address/>
    },
    {
      path:"/buy",
      element:<BuyNow/>
    },
    {
      path:"/confirm",
      element:<Confirm/>
    },
    {
      path:'/orders',
      element:<Orders/>
    },
    {
      path:'/specificOrder',
      element:<SpecificOrder/>
    },
    {
      path:'/dashBoard',
      element:<Dashboard/>
    },
    {
      path:'/viewProducts',
      element:<ViewProducts/>
    },
    {
      path:'/updateProduct',
      element:<UpdateProduct/>
    },
    {
      path:'/viewOrders',
      element:<ViewOrders/>
    },
    {
      path:'/updateOrder',
      element:<UpdateOrder/>
    },
    {
      path:'/viewUsers',
      element:<ViewUsers/>
    },
    {
      path:'/viewVendors',
      element:<ViewVendors/>
    },
    {
      path:'/chat',
      element:<Chat/>
    },
    {
      path:"/viewChats",
      element:<ViewChats/>
    },
    {
      path:"/*",
      element:<Home/>
   }
]