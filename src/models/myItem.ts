export type MyItemStatus = "Lost" | "Found";

export type MyItem = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  status: MyItemStatus;
  step: number;
  note: string;
};
