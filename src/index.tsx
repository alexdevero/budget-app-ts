import * as React from 'react'
import { render } from 'react-dom'

// Import components
import AppRouter from './app-router'

// Import styles
import './styles/styles.css'

const rootElement = document.getElementById('root')
render(<AppRouter />, rootElement)
