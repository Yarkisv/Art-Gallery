import { removeArtwork } from "../../api/artwork.api.ts";
import type { ArtworkCardProps } from "../../types/artworkCardProps.type.ts";
import "./ArtworkCard.css";

function ArtworkCard({ artwork, onSuccess }: ArtworkCardProps) {
  const deleteArtwork = async (artwork_id: string) => {
    try {
      await removeArtwork(artwork_id);
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="artwork-card">
      <div className="block"></div>

      <div className="artwork-details">
        <h2>{artwork.title}</h2>
        <span>${artwork.price}</span>
      </div>

      <h3>by {artwork.artist}</h3>

      <p>Type: {artwork.type}</p>

      <p className={artwork.availability ? "available" : "not-available"}>
        {artwork.availability ? "Available" : "Not available"}
      </p>

      <button className="remove-btn" onClick={() => deleteArtwork(artwork.id)}>
        Remove artwork
      </button>
    </article>
  );
}

export default ArtworkCard;
