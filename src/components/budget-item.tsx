import * as React from 'react'

// Import interfaces
import { BudgetItemInterface } from './../interfaces'

// Import components
import IconBin from './icon-bin'

const BudgetItem = (props: BudgetItemInterface) => {
  return (
    <div className="budget-item">
      <div className="budget-item-paid">
        {/* Mark as paid */}
        <input
          className="custom-checkbox-checkbox"
          type="checkbox"
          id={props.budgetItem.id}
          checked={props.budgetItem.isPaid}
          onChange={(event) => props.handleItemUpdate(event.target.value, props.budgetItem.id, 'isPaid')}
        />

        <label className="custom-checkbox-label" htmlFor={props.budgetItem.id} />
      </div>

      <div className="budget-item-title">
        {/* Title of the item */}
        <input
          type="text"
          value={props.budgetItem.title}
          onChange={(event) => props.handleItemUpdate(event.target.value, props.budgetItem.id, 'title')}
        />
      </div>

      <div className="budget-item-date">
        {/* Date the item was added */}
        <input
          type="date"
          value={props.budgetItem.date}
          onChange={(event) => props.handleItemUpdate(event.target.value, props.budgetItem.id, 'date')}
        />
      </div>

      <div className="budget-item-price">
        {/* Price of the item */}
        <input
          type="number"
          value={props.budgetItem.price}
          onChange={(event) => props.handleItemUpdate(event.target.value, props.budgetItem.id, 'price')}
        />
        {' '}
        <span>{props.budgetCurrency}</span>
      </div>

      <div className="budget-item-remove">
        {/* Delete item */}
        <button className="btn btn-remove" onClick={() => props.handleItemRemove(props.budgetItem.id)}><IconBin /></button>
      </div>
    </div>
  )
}

export default BudgetItem
