export interface Note {
    id: string;
    title: string;
    content: string;
    priority: "high" | "medium" | "low",
    date_: number,
    formatedDate?: string
  }