import { FC } from "react";
import Modal from "react-bootstrap/Modal";

interface Props {
  show: boolean;
  close: () => void;
  children: React.ReactNode;
}

export const CustomModal: FC<Props> = ({ show, close, children }) => {
  return (
    <>
      <Modal show={show} onHide={close} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
