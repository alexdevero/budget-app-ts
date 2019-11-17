import * as React from 'react'

// Import interface
import { BudgetTotalInterface } from './../interfaces'

const BudgetTotal = (props: BudgetTotalInterface) => {
  return (
    <div className="budget-total">
      <h2>
        <span className="budget-period">Your {props.budgetPeriod}</span>
        {' '}
        <span className="budget-label">budget:</span>
        {' '}
        <span className={`budget-total ${props.budgetAmount - props.budgetPaid > 0 ? 'budget-total-positive' : 'budget-total-negative'}`}>{props.budgetAmount - props.budgetPaid}</span>
        {' '}
        <span className="budget-currency">{props.budgetCurrency}</span>
      </h2>
    </div>
  )
}

export default BudgetTotal
