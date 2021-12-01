import logo from './logo.svg';
import './App.css';
import { Route, Switch} from 'react-router-dom'
import Navbar from './Navbar';
import { useEffect, useReducer } from 'react';
import ItemSelector from './ItemSelector';
import ItemInfo from './ItemInfo';
import ItemAdder from './ItemAdder';

function reducer(state, action){
  switch (action.type) {
    case "Ready":
      return{
        isReady: true,
        items: action.payload
      }
    case "Unready":
      return{
        isReady: false,
        message: "Loading..."
      }
    case "Error":
      return {
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
    message: "Hello"
  })

  const {isReady, items, message} = state

  useEffect(() => {
    dispatch({ type: "Unready"})
    fetch('http://localhost:9292/items')
    .then((data) => data.json())
    .then((ret) => dispatch({type: "Ready", payload: ret}))
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
            <ItemInfo items={items}/>
          </Route>
          <Route path='/additems' >
            <ItemAdder items={items} dispatch={dispatch} />
          </Route>
        </Switch>
        :
        <h1>{message}</h1>}
      </div>
    </div>
  );
}

export default App;
