import { UserInterface } from "./UserInterface";

export default interface ModalProps {
  show: boolean;
  handleClose: handleCloseFunction;
  userImage: string;
  userName: string;
  userId: string;
  reloadData: () => Promise<void>;
}

type handleCloseFunction = () => void;
