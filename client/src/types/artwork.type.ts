export type Artwork = {
  id: string;
  title: string;
  artist: string;
  type: "painting" | "sculpture" | null;
  price: number;
  availability: boolean;
};
