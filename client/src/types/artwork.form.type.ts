export interface IArtwork {
  title: string;
  artist: string;
  type: "painting" | "sculpture" | null;
  price: string;
  availability: boolean;
}
