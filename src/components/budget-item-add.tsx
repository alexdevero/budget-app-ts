import * as React from 'react'
import shortid from 'shortid'

// Import interface
import { BudgetItemAddInterface } from './../interfaces'

const BudgetItemAdd = (props: BudgetItemAddInterface) => {
  // Prepare BudgetItemAdd states
  const [date, setDate] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [price, setPrice] = React.useState(0)
  const [isPaid, setIsPaid] = React.useState(false)

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent form from submitting
    event.preventDefault()

    // Create new item
    props.handleAddItem({
      date: date,
      title: title,
      price: price,
      isPaid: isPaid,
      id: shortid.generate()
    })

    // Reset form state
    setDate('')
    setTitle('')
    setPrice(0)
    setIsPaid(false)

    // Close modal window
    props.handleShowAddItem(!props.showAddItem)
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-dialog">
        <button className="btn btn-cross" onClick={() => props.handleShowAddItem(!props.showAddItem)}>&#x02A2F;</button>

        <form onSubmit={handleFormSubmit}>
          <fieldset>
            {/* Date the item was added */}
            <label htmlFor="date">Date of payment:</label>

            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required={true}
            />
          </fieldset>

          <fieldset>
            {/* Title of the item */}
            <label htmlFor="title">Item name:</label>

            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required={true}
            />
          </fieldset>

          <fieldset>
            {/* Price of the item */}
            <label htmlFor="price">Item price:</label>

            <input
              type="number"
              id="price"
              value={price}
              onChange={(event) => setPrice(parseInt(event.target.value, 10))}
              min="0"
              step="1"
              required={true}
            />
          </fieldset>

          <fieldset>
            {/* Mark as paid */}
            <input
              className="custom-checkbox-checkbox"
              type="checkbox"
              id="isPaid"
              checked={isPaid}
              onChange={() => setIsPaid(!isPaid)}
            />

            <label className="custom-checkbox-label" htmlFor="isPaid"> Item is already paid</label>
          </fieldset>

          <fieldset>
            <input
              className="btn btn-add"
              type="submit"
              value="+ Add item"
            />
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default BudgetItemAdd
