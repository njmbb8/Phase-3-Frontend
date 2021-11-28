import logo from './logo.svg';
import './App.css';
import { Route, Switch} from 'react-router-dom'
import Navbar from './Navbar';
import { useEffect, useReducer } from 'react';
import ItemSelector from './ItemSelector';
import ItemInfo from './ItemInfo';
import { useParams, useRouteMatch } from "react-router";

function reducer(state, action){
  switch (action.type) {
    case "Loading":
      return{
        isReady: false,
        message: "Loading",
      }
    case "Ready":
      return{
        isReady: true,
        items: action.payload
      }
    case "Error":
      return {

      }
    default:
      break;
  }
}

function App() {
  const params = useParams()
  const [state, dispatch] = useReducer(reducer, {
    isReady: false,
    items: {},
    message: "Hello"
  })

  const {isReady, items, message} = state

  useEffect(() => {
    dispatch({ type: "Loading"})
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
        </Switch>
        :
        <h1>{message}</h1>}
      </div>
    </div>
  );
}

export default App;
