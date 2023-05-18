import { Row, Col, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks";
import { addProduct } from "../../features/products/productsSlice";
import { useState } from "react";

interface Props {
  close: () => void;
}

export const NewCommentForm: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();
  const [{ name, count, weight, sizeWidth, sizeHeight }, setValues] = useState({
    name: "",
    count: 1,
    weight: "",
    sizeWidth: 1,
    sizeHeight: 1,
  });

  const clearForm = () => {
    setValues({
      name: "",
      count: 1,
      weight: "",
      sizeWidth: 1,
      sizeHeight: 1,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name: field, value } = event.target;

    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name && weight) {
      dispatch(addProduct({ name, count, weight, sizeWidth, sizeHeight }));
      close();
    }
  };

  return (
    <Form onReset={clearForm} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={name}
            onChange={handleChange}
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="count"
            value={count}
            onChange={handleChange}
            type="number"
            placeholder="1"
            min={1}
          />
        </Form.Group>
      </Row>

      <fieldset>
        <legend>Size</legend>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Width</Form.Label>
            <Form.Control
              name="sizeWidth"
              value={sizeWidth}
              onChange={handleChange}
              type="number"
              placeholder="1"
              min={1}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Height</Form.Label>
            <Form.Control
              name="sizeHeight"
              value={sizeHeight}
              onChange={handleChange}
              type="number"
              placeholder="1"
              min={1}
            />
          </Form.Group>
        </Row>
      </fieldset>

      <Form.Group className="mb-3" as={Col}>
        <Form.Label>Weight</Form.Label>
        <Form.Control
          name="weight"
          value={weight}
          onChange={handleChange}
          type="text"
          min={1}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add product
      </Button>
    </Form>
  );
};
