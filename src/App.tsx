import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  getProductsData,
  selectProducts,
} from "./features/products/productsSlice";
import { useCallback, useEffect, useState } from "react";
import { CustomModal } from "./components/Modal";
import { NewCommentForm } from "./components/NewProductForm";

export const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { items: products } = useAppSelector(selectProducts);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  useEffect(() => {
    dispatch(getProductsData());
  }, []);

  return (
    <main className="pt-3">
      <div className="container">
        <div className="d-flex mb-3 align-items-center">
          <p className="mb-0 me-2">Add new product to list</p>
          <Button onClick={() => setShowModal(true)}>ADD</Button>
        </div>
        <CardGroup className="gap-3">
          {products.map((product) => (
            <Card
              className="flex-grow-1 border-start"
              style={{ minWidth: "250px" }}
              key={product.id}
            >
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the content.
                </Card.Text>
                <Button variant="primary">Edit</Button>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>

        <CustomModal show={showModal} close={closeModal}>
          <NewCommentForm close={closeModal} />
        </CustomModal>
      </div>
    </main>
  );
};
