import React from 'react'
import { Card, Stack, Button } from "react-bootstrap"

export default function IncomeCard({
  source,
  value,
}) {

  return (
    <Card>
      <Card.Body>
        <Card.Title
          className="d-flex justify-content-between 
        align-items-baseline fw-normal mb-3"
        >
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {max}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">View Expenses</Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
