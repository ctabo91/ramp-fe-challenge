import { useState, useEffect } from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {
  // Used localStorage to store the approval state of a transaction.
  const localStorageKey = `approved-${transaction.id}`

  const [approved, setApproved] = useState(() => {
    const storedValue = window.localStorage.getItem(localStorageKey)
    return storedValue !== null ? JSON.parse(storedValue) : transaction.approved
  })
  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(approved))
  }, [approved, localStorageKey])

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={async (newValue) => {
          try {
            await consumerSetTransactionApproval({
              transactionId: transaction.id,
              newValue,
            })
          } catch (error) {
            if (error instanceof Error) {
              alert(error.message)
            }
          }

          setApproved(newValue)
        }}
      />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
