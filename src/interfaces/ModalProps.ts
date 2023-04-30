import ObjectId from "bson-objectid";

export default interface ModalProps {
  show: boolean;
  handleClose: handleCloseFunction;
  userImage: string;
  userName: string;
  userId: ObjectId;
  reloadData: () => Promise<void>;
}

type handleCloseFunction = () => void;
