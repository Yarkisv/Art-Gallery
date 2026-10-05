import type { Artwork } from "./artwork.type";

export type ArtworkCardProps = {
  artwork: Artwork;
  onSuccess: () => void;
};
