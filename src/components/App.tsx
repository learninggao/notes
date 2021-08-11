import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { Navbar } from './navbar/navbar'
import { Home } from './pages/home/home'

function NotFound() {
  return <div>Not found</div>
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/tags" component={Posts} /> */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}
