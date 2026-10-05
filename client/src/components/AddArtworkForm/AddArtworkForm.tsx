import axios from "axios";
import "./AddArtworkForm.css";
import React, { useState } from "react";
import { useModal } from "../../contexts/modal.context";

function AddArtworkForm() {
  const API = import.meta.env.VITE_API;

  interface IArtwork {
    title: string;
    artist: string;
    type: "painting" | "sculpture" | null;
    price: string;
    availability: boolean;
  }

  const [newArtwork, setNewArtwork] = useState<IArtwork>({
    title: "",
    artist: "",
    type: null,
    price: "",
    availability: false,
  });

  const { closeAddArtworkModal } = useModal();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setNewArtwork((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const createNewArtwork = async () => {
    try {
      const artworkToSend = {
        ...newArtwork,
        price: Number(newArtwork.price),
      };

      const response = await axios.post(`${API}/artworks`, {
        newArtwork: artworkToSend,
      });

      if (response.status === 201) {
        closeAddArtworkModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal_wrapper">
      <div className="modal">
        <header className="form-header">
          <h2>Add new artwork here</h2>

          <button className="close-button" onClick={closeAddArtworkModal}>
            X
          </button>
        </header>

        <form className="creating-form" onSubmit={createNewArtwork}>
          <div className="input-group">
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
              maxLength={99}
              value={newArtwork.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="artist"></label>
            <input
              type="text"
              name="artist"
              id="artist"
              placeholder="Artist"
              required
              value={newArtwork.artist}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="type"></label>
            <select id="type" name="type" required onChange={handleChange}>
              <option value="">Select</option>
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="price"></label>
            <input
              type="number"
              name="price"
              id="price"
              min="0.01"
              step="0.01"
              required
              value={newArtwork.price}
              onChange={handleChange}
            />
          </div>
          <div className="checkbox-group">
            <label htmlFor="availability">Available</label>
            <input
              type="checkbox"
              name="availability"
              id="availability"
              checked={newArtwork.availability}
              onChange={handleChange}
            />
          </div>

          <button className="create-artwork" type="submit">
            Add artwork
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArtworkForm;
