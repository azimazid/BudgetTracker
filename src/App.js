import { Button, Dropdown, ListGroup, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [ViewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const [AddExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="d-flex mb-4">
          <h1 className="me-auto">Personal Cash Flow</h1>
          <Dropdown>
            <Dropdown.Toggle variant="warning">Month</Dropdown.Toggle>
            <Dropdown.Menu>
              <Container>
                <Row style={{minWidth: "50vw"}}>
                  <Col>
                    <ListGroup
                  </Col>
                </Row>
              </Container>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
        <Stack gap={2} className="mx-auto mb-3">
          <TotalBudgetCard />
        </Stack>
        <Stack direction="horizontal" gap={2} className="mx-auto mt-3 mb-3">
          <h3 className="me-auto">Monthly Income</h3>
          <Button className="mb-1" variant="primary">
            Add Income
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "2rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpenseModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
        </div>
        <hr></hr>
        <Stack direction="horizontal" gap={2} className="mx-auto mt-3 mb-3">
          <h3 className="me-auto">Monthly Expenses</h3>
          <Button
            className="mb-1"
            variant="primary"
            onClick={() => setShowAddBudgetModal(true)}
          >
            Add Budget
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "2rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpenseModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={AddExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={ViewExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId()}
      />
    </>
  );
}

export default App;
