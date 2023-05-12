import ProgressItem from "./ProgressItem";

export default interface GroupedProgressData {
  [exerciseId: string]: ProgressItem[];
}
