import { MyItem } from "@/models/myItem";

let items: MyItem[] = [
  { id: 1, title: "White earphones case", subtitle: "Alert on · lost in lecture hall B today", icon: "♫", status: "Lost", step: 2, note: "2 possible matches to review" },
  { id: 2, title: "Car keys, blue tag", subtitle: "Found by Nour · food court", icon: "⚿", status: "Lost", step: 3, note: "Ownership confirmed. Pick up before 4 PM." },
  { id: 3, title: "Green water bottle", subtitle: "Lost in the sports hall · 2 weeks ago", icon: "♧", status: "Lost", step: 4, note: "Item returned successfully." },
  { id: 4, title: "Black notebook", subtitle: "Found near the library · yesterday", icon: "▤", status: "Found", step: 2, note: "Waiting for the owner to respond." },
  { id: 5, title: "Student ID card", subtitle: "Found at the main entrance · today", icon: "▣", status: "Found", step: 1, note: "A possible owner match was found." },
];

export function getMyItems(): MyItem[] {
  return items;
}

export function isReturned(title: string): boolean {
  return items.some((item) => item.title === title && item.step === 4);
}

export function markReturned(title: string) {
  items = items.map((item) =>
    item.title === title ? { ...item, step: 4, note: "Item returned successfully." } : item
  );
}
