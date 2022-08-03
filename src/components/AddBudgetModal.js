import { Form, Button, Modal, Stack, Dropdown } from "react-bootstrap";
import { useRef, useState } from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import { month } from "./MonthCategory";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const monthRef = useRef();
  const [selectedDate, setSelectedDate] = useState(null);
  const { addBudget } = useBudgets();

  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      month: monthRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Stack direction="horizontal" gap={2}>
            <Modal.Title className="ms-auto">New Budget</Modal.Title>
            <div className="me-auto">
              <Dropdown>
                <Dropdown.Toggle variant="success">Month</Dropdown.Toggle>
                <Dropdown.Menu>
                  {month.map((month) => (
                    <Dropdown.Item>{month}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Stack>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
