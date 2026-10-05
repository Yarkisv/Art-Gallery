import { useEffect, useState } from "react";
import "./ArtworkList.css";
import type { Artwork } from "../../types/artwork.type.ts";
import ArtworkCard from "../ArtworkCard/ArtworkCard.tsx";
import { useModal } from "../../contexts/modal.context.tsx";
import { getAllArtworks } from "../../api/artwork.api.ts";

function ArtworkList() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [type, setType] = useState<string>("");

  const { openAddArtworkModal } = useModal();

  const getArtworks = async () => {
    try {
      const data = await getAllArtworks(sortOption, type, artist);

      console.log(data);

      setArtworks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtworks();
  }, [sortOption, type]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getArtworks();
    }, 500);

    return () => clearTimeout(timer);
  }, [artist]);

  return (
    <section>
      <div className="filters">
        <input
          type="text"
          id="artist"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <div className="input-group">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="sculpture">Sculpture</option>
            <option value="painting">Painting</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="price">Sort by</label>
          <select
            name="price"
            id="price"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="desc">Highest to lowest</option>
            <option value="asc">Lowest to highest</option>
          </select>
        </div>
      </div>

      <div className="conteiner">
        {artworks.length > 0 ? (
          <div className="grid-container">
            {artworks.map((artwork) => (
              <ArtworkCard
                artwork={artwork}
                key={artwork.id}
                onSuccess={getArtworks}
              />
            ))}
          </div>
        ) : (
          <div>No artworks</div>
        )}
      </div>

      <button className="create-artwork" onClick={openAddArtworkModal}>
        Create artwork
      </button>
    </section>
  );
}

export default ArtworkList;
