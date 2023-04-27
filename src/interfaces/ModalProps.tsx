export default interface ModalProps {
  show: boolean;
  handleClose: handleCloseFunction;
}

type handleCloseFunction = () => void;
