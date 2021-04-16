import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './views/Landing'
import PaymentTest from './views/PaymentTest'

const App: React.FC = () => {
    return(
      <>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Krub&family=Quicksand&family=Roboto&family=Rubik&display=swap');
        </style>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route path='/payments' component={PaymentTest} />
            </Switch>
        </BrowserRouter>
      </>
    )
}

const root = document.getElementById('root')
render(<App />, root)