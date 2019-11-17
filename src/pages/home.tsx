import * as React from 'react'
import { Link } from 'react-router-dom'

// Import components
import BudgetTotal from './../components/budget-total'
import BudgetList from './../components/budget-list'
import BudgetItemAdd from './../components/budget-item-add'
import IconSettings from './../components/icon-settings'

// Import interfaces
import { BudgetItemObjInterface, HomePageInterface } from './../interfaces'

const HomePage = (props: HomePageInterface) => {
  // Prepare homepage states
  const [budgetPaid, setBudgetPaid] = React.useState(0)
  const [showAddItem, setShowAddItem] = React.useState(false)

  // Recalculate total budget
  React.useEffect(() => {
    // Prepare total costs
    let costs = 0

    // Iterate over items and add costs to total costs
    props.budgetItems.forEach((item: BudgetItemObjInterface) => {
      if (item.isPaid) {
        costs += item.price
      }
    })

    // Update budgetPaid state
    setBudgetPaid(costs)
  }, [props.budgetItems]) // Watch 'budgetItems' state for changes

  // Handle local/session storage
  function handleStorage(task: 'get' | 'update', newState: BudgetItemObjInterface[]) {
    if (props.storageMethod === 'local') {
      if (task === 'update') {
        // Overwrite items in localStorage
        window.localStorage.setItem('budget-app', JSON.stringify(newState))
      } else {
        // If there are any data in sessionStorage
        if (window && window.localStorage && window.localStorage.getItem('budget-app')) {
          // Extract the data from localStorage
          const recoveredLocalData = window.localStorage.getItem('budget-app')

          // If there data to be recovered
          if (recoveredLocalData) {
            // Update budgetItems state
            props.setBudgetItems(JSON.parse(recoveredLocalData))
          }
        }
      }
    } else if (props.storageMethod === 'session') {
      if (task === 'update') {
        // Overwrite items in sessionStorage
        window.sessionStorage.setItem('budget-app', JSON.stringify(newState))
      } else {
        // If there are any data in sessionStorage
        if (window && window.sessionStorage && window.sessionStorage.getItem('budget-app')) {
          // Extract the data from sessionStorage
          const recoveredSessionData = window.sessionStorage.getItem('budget-app')

          // If there data to be recovered
          if (recoveredSessionData) {
            // Update budgetItems state
            props.setBudgetItems(JSON.parse(recoveredSessionData))
          }
        }
      }
    }
  }

  // Handle change of items
  function handleItemUpdate(value: string, id: string, itemProperty: string) {
    // Prepare new budgetItems state
    const newBudgetItemsState: BudgetItemObjInterface[] = [...props.budgetItems]

    switch (itemProperty) {
      case 'isPaid':
        // Find 'isPaid' property and update it with new value
        newBudgetItemsState.find((item: BudgetItemObjInterface) => item.id === id)!.isPaid = !newBudgetItemsState.find((item: BudgetItemObjInterface) => item.id === id)!.isPaid
        break
      case 'price':
        // Find 'price' property and update it with new value
        newBudgetItemsState.find((item: BudgetItemObjInterface) => item.id === id)!.price = parseInt(value, 10)
        break
      case 'title':
        // Find 'title' property and update it with new value
        newBudgetItemsState.find((item: BudgetItemObjInterface) => item.id === id)!.title = value
        break
    }

    // Update budgetItems state
    props.setBudgetItems(newBudgetItemsState)

    // Update local/session storage
    handleStorage('update', newBudgetItemsState)
  }

  // Handle adding new item
  function handleAddItem(payload: BudgetItemObjInterface) {
    // prepare new budgetItemsState
    const newBudgetItemsState = [...props.budgetItems]

    // Add new item to newBudgetItemsState
    newBudgetItemsState.push({
      date: payload.date,
      isPaid: payload.isPaid,
      price: payload.price,
      title: payload.title,
      id: payload.id
    })

    // Update budgetItems state
    props.setBudgetItems(newBudgetItemsState)

    // Update local/session storage
    handleStorage('update', newBudgetItemsState)
  }

  // Handle removing existing items
  function handleItemRemove(id: string) {
    // Find & remove correct budget item
    let newBudgetItemsState =  props.budgetItems.filter((item: BudgetItemObjInterface) => item.id !== id)

    // Update budgetItems state
    props.setBudgetItems(newBudgetItemsState)

    // Update local/session storage
    handleStorage('update', newBudgetItemsState)
  }

  return (
    <div>
      <header>
        <BudgetTotal
          budgetPeriod={props.budgetPeriod}
          budgetCurrency={props.budgetCurrency}
          budgetAmount={props.budgetAmount}
          budgetPaid={budgetPaid}
        />

        <Link className="btn btn-settings" to="/settings"><IconSettings /></Link>
      </header>

      <BudgetList
        budgetCurrency={props.budgetCurrency}
        budgetItems={props.budgetItems}
        handleItemUpdate={handleItemUpdate}
        handleItemRemove={handleItemRemove}
      />

      {showAddItem && (
        <BudgetItemAdd
          showAddItem={showAddItem}
          handleShowAddItem={setShowAddItem}
          handleAddItem={handleAddItem}
        />
      )}

      <button
        className="btn btn-add"
        onClick={() => setShowAddItem(!showAddItem)}
      >+ <span className="btn-label">Add item</span></button>
    </div>
  )
}
export default HomePage
