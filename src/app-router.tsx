import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Import pages
import HomePage from './pages/home'
import SettingsPage from './pages/settings'

// Import interface
import { BudgetItemObjInterface } from './interfaces'

const AppRouter = () => {
  // Prepare default app states
  const [budgetItems, setBudgetItems] = React.useState<BudgetItemObjInterface[]>([])
  const [budgetPeriod, setBudgetPeriod] = React.useState('monthly')
  const [budgetCurrency, setBudgetCurrency] = React.useState('USD')
  const [budgetAmount, setBudgetAmount] = React.useState(2500)
  const [storageMethod, setStorageMethod] = React.useState('none')

  // Restore settings from local/session storage if any exists
  React.useEffect(() => {
    // Check if there are any existing data for settings in sessionStorage
    if (window && window.sessionStorage && window.sessionStorage.getItem('budget-app-settings') !== null && window.sessionStorage.getItem('budget-app-settings')!.length > 0) {
      // Get data from sessionStorage
      const recoveredSettings = window.sessionStorage.getItem('budget-app-settings')

      // If storage contains any data process them
      if (recoveredSettings) {
        // Get all recovered state data
        const { oldBudgetPeriod, oldBudgetCurrency, oldBudgetAmount, oldStorageMethod } = JSON.parse(recoveredSettings)

        // Update all settings
        setBudgetPeriod(oldBudgetPeriod)
        setBudgetCurrency(oldBudgetCurrency)
        setBudgetAmount(oldBudgetAmount)
        setStorageMethod(oldStorageMethod)
      }
    } else if (window && window.localStorage && window.localStorage.getItem('budget-app-settings') !== null && window.localStorage.getItem('budget-app-settings')!.length > 0) {
      // Of if there are any existing data for settings in localStorage
      // Get data from localStorage
      const recoveredSettings = window.localStorage.getItem('budget-app-settings')

      // If storage contains any data process them
      if (recoveredSettings) {
        // Get all recovered state data
        const { oldBudgetPeriod, oldBudgetCurrency, oldBudgetAmount, oldStorageMethod } = JSON.parse(recoveredSettings)

        // Update all settings
        setBudgetPeriod(oldBudgetPeriod)
        setBudgetCurrency(oldBudgetCurrency)
        setBudgetAmount(oldBudgetAmount)
        setStorageMethod(oldStorageMethod)
      }
    }

    // Check if there are any existing data for items in sessionStorage
    if (window && window.sessionStorage && window.sessionStorage.getItem('budget-app') !== null && window.sessionStorage.getItem('budget-app')!.length > 0) {
      // Get items data from sessionStorage
      const recoveredItems = window.sessionStorage.getItem('budget-app')

      // If there are any items to be recovered
      if (recoveredItems) {
        // Extract recovered items data
        const { oldItems } = JSON.parse(recoveredItems)

        // Update budgetItems state
        setBudgetItems(oldItems)
      }
    } else if (window && window.localStorage && window.localStorage.getItem('budget-app') !== null && window.localStorage.getItem('budget-app')!.length > 0) {
      // Of if there are any existing data for items in localStorage
      // Get items data from localStorage
      const recoveredItems = window.localStorage.getItem('budget-app')

      // If there are any items to be recovered
      if (recoveredItems) {
        // Extract recovered items data
        const { oldItems } = JSON.parse(recoveredItems)

        // Update budgetItems state
        setBudgetItems(oldItems)
      }
    }
  }, [])// Run on initial render

  React.useEffect(() => {
    if (storageMethod === 'session') {
      // Save settings to sessionStorage
      window.sessionStorage.setItem('budget-app', JSON.stringify({
        oldItems: budgetItems
      }))

      // Remove duplicate data in localStorage
      window.localStorage.removeItem('budget-app')
    } else if (storageMethod === 'local') {
      // Save settings to localStorage
      window.localStorage.setItem('budget-app', JSON.stringify({
        oldItems: budgetItems
      }))

      // Remove duplicate data in sessionStorage
      window.sessionStorage.removeItem('budget-app')
    } else if (storageMethod === 'none') {
      // Remove all previous data from both storages
      window.localStorage.removeItem('budget-app')
      window.sessionStorage.removeItem('budget-app')
    }
  }, [budgetItems, storageMethod])// Watch budgetItems & storageMethod props

  React.useEffect(() => {
    if (storageMethod === 'session') {
      // Save settings to sessionStorage
      window.sessionStorage.setItem('budget-app-settings', JSON.stringify({
        oldBudgetPeriod: budgetPeriod,
        oldBudgetCurrency: budgetCurrency,
        oldBudgetAmount: budgetAmount,
        oldStorageMethod: storageMethod
      }))

      // Remove duplicate data in localStorage
      window.localStorage.removeItem('budget-app-settings')
    } else if (storageMethod === 'local') {
      // Save settings to localStorage
      window.localStorage.setItem('budget-app-settings', JSON.stringify({
        oldBudgetPeriod: budgetPeriod,
        oldBudgetCurrency: budgetCurrency,
        oldBudgetAmount: budgetAmount,
        oldStorageMethod: storageMethod
      }))

      // Remove duplicate data in sessionStorage
      window.sessionStorage.removeItem('budget-app-settings')
    } else if (storageMethod === 'none') {
      // Remove all previous data from both storages
      window.localStorage.removeItem('budget-app-settings')
      window.sessionStorage.removeItem('budget-app-settings')
    }
  }, [budgetPeriod, budgetCurrency, budgetAmount, storageMethod])// Watch budgetPeriod, budgetCurrency, budgetAmount & storageMethod props

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          {/* Add homepage */}
          <Route path="/" exact={true}>
            <HomePage
              budgetItems={budgetItems}
              setBudgetItems={setBudgetItems}
              budgetAmount={budgetAmount}
              budgetPeriod={budgetPeriod}
              budgetCurrency={budgetCurrency}
              storageMethod={storageMethod}
            />
          </Route>

          {/* Add settings */}
          <Route path="/settings">
            <SettingsPage
              budgetPeriod={budgetPeriod}
              budgetCurrency={budgetCurrency}
              budgetAmount={budgetAmount}
              storageMethod={storageMethod}
              setBudgetPeriod={setBudgetPeriod}
              setBudgetCurrency={setBudgetCurrency}
              setBudgetAmount={setBudgetAmount}
              setStorageMethod={setStorageMethod}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
