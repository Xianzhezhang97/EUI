export interface Person {
  name: string;
  award: string;
  description: string;
  src?: string;
  url?: string;
}

export interface ContentMessages {
  title: string;
  subtitle: string;
  intro: string;
  thanksTitle: string;
  people: Person[];
  finalMessage: string;
  signature: string;
}
