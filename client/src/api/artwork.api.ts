import axios from "axios";
import type { IArtwork } from "../types/artwork.form.type";

const API = import.meta.env.VITE_API;

export const createArtwork = async (artwork: IArtwork) => {
  const artworkToSend = {
    ...artwork,
    price: Number(artwork.price),
  };

  const response = await axios.post(`${API}/artworks`, {
    newArtwork: artworkToSend,
  });

  return response.data;
};

export const getAllArtworks = async (
  sortOption: string,
  type: string,
  artist: string,
) => {
  const response = await axios.get(`${API}/artworks`, {
    params: {
      price: sortOption,
      type: type,
      artist: artist,
    },
  });
  return response.data.artworks;
};

export const removeArtwork = async (id: string) => {
  const response = await axios.delete(`${API}/artworks/${id}`);
  return response.data;
};
