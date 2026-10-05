import axios from "axios";
import type { Artwork } from "../../types/artwork.type.ts";
import "./ArtworkCard.css";

type ArtworkCardProps = {
  artwork: Artwork;
  onSuccess: () => void;
};

function ArtworkCard({ artwork, onSuccess }: ArtworkCardProps) {
  const API = import.meta.env.VITE_API;

  const removeArtwork = async (artwork_id: string) => {
    try {
      const response = await axios.delete(`${API}/artworks/${artwork_id}`);

      if (response.status === 204) {
        onSuccess();
      }
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

      <button className="remove-btn" onClick={() => removeArtwork(artwork.id)}>
        Remove artwork
      </button>
    </article>
  );
}

export default ArtworkCard;
