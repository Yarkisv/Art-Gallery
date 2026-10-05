import { ArtworkService } from "../services/artwork.service.js";

export class ArtworkController {
  static async createArtwork(req, res) {
    const { title, artist, type, price, availability } = req.body.newArtwork;

    if (!title || title.length > 99) {
      return res
        .status(400)
        .json({ message: "Title max length must be less then 99 characters" });
    }

    if (!artist && artist.length > 50) {
      return res
        .status(400)
        .json({ message: "Artist max length must be less then 50 characters" });
    }

    if (!["painting", "sculpture"].includes(type)) {
      return res.status(400).json({ message: "Invalid artwork type" });
    }

    if (typeof price !== "number" && price < 0) {
      return res
        .status(400)
        .json({ message: "Price must be a number, more then 0" });
    }

    try {
      const artwork = await ArtworkService.createArtwork(
        title,
        artist,
        type,
        price,
        availability,
      );

      res.status(201).json({
        success: true,
        artwork,
        message: "Data has been successfuly added to db",
      });
    } catch (error) {
      console.log("Server error: ", error);
      res
        .status(500)
        .json({ success: false, message: `Server error ${error}` });
    }
  }

  static async getAllArtworks(req, res) {
    const { price, artist, type } = req.query;

    try {
      const artworks = await ArtworkService.getAllArtworks(price, artist, type);

      if (!artworks) {
        return res.status(404).json({ message: "Artworks not found" });
      }

      res.status(200).json({
        success: true,
        artworks,
        message: "Data has been successfuly selected",
      });
    } catch (error) {
      console.log("Server error", error);
      res.status(500).json({
        succes: false,
        message: `Server error during selecting: ${error}`,
      });
    }
  }

  static async getOneArtwork(req, res) {
    const artwork_id = req.params.id;

    try {
      const artwork = await ArtworkService.getOneArtwork(artwork_id);

      if (!artwork) {
        return res.status(404).json({ message: "Artworks not found" });
      }

      res.status(200).json({
        success: true,
        artwork,
        message: "Data has been successfuly selected",
      });
    } catch (error) {
      console.log("Server error", error);
      res.status(500).json({
        succes: false,
        message: `Server error during selecting: ${error}`,
      });
    }
  }

  static async deleteOneArtwork(req, res) {
    const artwork_id = req.params.id;

    console.log(artwork_id);

    try {
      const artwork = await ArtworkService.deleteOneArtwork(artwork_id);

      if (!artwork) {
        return res.status(404).json({
          success: false,
          message: "Artwork not found",
        });
      }

      res
        .status(204)
        .json({ success: true, message: "Artwork was successfuly deleted" });
    } catch (error) {
      console.log(`Server error ${error}`);
      res
        .status(500)
        .json({ succes: false, message: "Server error during deleting" });
    }
  }

  static async updateOneArtwork() {}
}
