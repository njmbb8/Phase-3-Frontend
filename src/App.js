import logo from './logo.svg';
import './App.css';
import { Route, Switch} from 'react-router-dom'
import Navbar from './Navbar';
import { useEffect, useReducer } from 'react';
import ItemSelector from './ItemSelector';
import ItemInfo from './ItemInfo';
import ItemAdder from './ItemAdder';
import ItemEditor from './ItemEditor';
import UserBrowser from './UserBrowser';
import UserPage from './UserPage';
import AddUserForm from './AddUserForm';
import OrderPage from './OrderPage';
import OrderList from './OrderList';
import OrderAdder from './OrderAdder';
import AddItemToOrder from './AddItemToOrder';

function reducer(state, action){
  switch (action.type) {
    case "Ready":
      return{
        ...state,
        isReady: true
      }
    case "Loaded Items":
      return{
        ...state,
        items: action.payload,
        message: "Loaded Items"
      }
    case "Loaded Users":
      return{
        ...state,
        users: action.payload,
        message: "Loaded Users"
      }
    case "Loaded Orders":
      return{
        ...state,
        orders: action.payload,
        message: "Loaded Orders"
      }
    case "Unready":
      return{
        ...state,
        isReady: false,
        message: "Loading..."
      }
    case "Error":
      return {
        ...state,
        isReady: false,
        message: `${action.payload.name}: ${action.payload.message}`
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isReady: false,
    items: {},
    users: {},
    orders: {},
    message: "Hello"
  })

  const {isReady, items, users, orders, message} = state

  useEffect(() => {
    dispatch({ type: "Unready"})
    fetch('http://localhost:9292/items')
    .then((data) => data.json())
    .then((ret) => dispatch({type: "Loaded Items", payload: ret}))
    .then(()=>{
      fetch('http://localhost:9292/users')
      .then((data) => data.json())
      .then((ret) => dispatch({type: "Loaded Users", payload: ret}))
      .then(()=> {
        fetch("http://localhost:9292/orders")
        .then((data) => data.json())
        .then((ret) => dispatch({type:"Loaded Orders", payload: ret}))
        .then(()=> dispatch({type: "Ready"}))
      })
      .catch((error) => dispatch({type: "Error", payload: error}))
    })
    .catch((error) => dispatch({type: "Error", payload: error})) 
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div id="content">
        {isReady ? <Switch>
          <Route exact path = '/'>
            <ItemSelector items={items} />
          </Route>
          <Route path = '/items/:itemId' >
            <ItemInfo items={items} dispatch={dispatch}/>
          </Route>
          <Route path='/additems' >
            <ItemAdder items={items} dispatch={dispatch} />
          </Route>
          <Route path='/editItem/:itemId' >
            <ItemEditor items={items} dispatch={dispatch} />
          </Route>
          <Route exact path='/users' >
            <UserBrowser users={users} />
          </Route>
          <Route path='/users/:userId' >
            <UserPage users={users} dispatch={dispatch} />
          </Route>
          <Route path='/adduser' >
            <AddUserForm users={users} dispatch={dispatch} />
          </Route>
          <Route exact path='/orders' >
            <OrderList orders={orders} />
          </Route>
          <Route exact path='/orders/:orderId' >
            <OrderPage users={users} orders={orders} items={items} dispatch={dispatch} />
          </Route>
          <Route path='/addorder' >
            <OrderAdder users={users} orders={orders} dispatch={dispatch} />
          </Route>
          <Route path='/orders/:orderID/addcontents' >
            <AddItemToOrder items={items} orders={orders} dispatch={dispatch} />
          </Route>
        </Switch>
        :
        <h1>{message}</h1>}
      </div>
    </div>
  );
}

export default App;
