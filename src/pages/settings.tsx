import * as React from 'react'
import { Link } from 'react-router-dom'

// Import interfaces
import { SettingsPageInterface } from './../interfaces'

// Import data for currency codes
import currencyCodes from './../data/currency-codes'

const SettingsPage = (props: SettingsPageInterface) => (
  <div>
    <header>
      <h2>Settings</h2>

      <Link className="btn btn-cross btn-unstyled" to="/">&#x02A2F;</Link>
    </header>

    <fieldset>
      <label htmlFor="period">Budget period:</label>

      <select
        onChange={(event) => props.setBudgetPeriod(event.target.value)}
        name="period"
        id="period"
        defaultValue={props.budgetPeriod}
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </fieldset>

    <fieldset>
      <label htmlFor="currency">Budget currency:</label>

      <input
        onChange={(event) => props.setBudgetCurrency(event.target.value)}
        name="currency"
        id="currency"
        defaultValue={props.budgetCurrency}
        list="currencyCodes"
      />

      <datalist id="currencyCodes">
        {currencyCodes.map(code => <option key={code} value={code} />)}
      </datalist>
    </fieldset>

    <fieldset>
      <label htmlFor="budget">Budget size:</label>

      <input
        onChange={(event) => props.setBudgetAmount(parseInt(event.target.value, 10))}
        type="number"
        name="budget"
        id="budget"
        defaultValue={props.budgetAmount}
      />
    </fieldset>

    <fieldset>
      <label htmlFor="storage">Preffered storage method:</label>

      <select
        onChange={(event) => props.setStorageMethod(event.target.value)}
        name="storage"
        id="storage"
        defaultValue={props.storageMethod}
      >
        <option value="none">None</option>
        <option value="local">Local storage</option>
        <option value="session">Session storage</option>
      </select>
    </fieldset>

    <p><small><em>* All hanges are saved automatically.</em></small></p>
  </div>
)

export default SettingsPage
