import { pool } from "../database/index.js";

export class ArtworkController {
  static async createArtwork(req, res) {
    const { title, artist, type, price, availability } = req.body.newArtwork;

    console.log(req.body);

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

    const query =
      "insert into artwork (title, artist, type, price, availability) values ($1, $2, $3, $4, $5) returning *";

    try {
      const newArtwork = await pool.query(query, [
        title,
        artist,
        type,
        price,
        availability,
      ]);

      res.status(201).json({
        success: true,
        artwork: newArtwork.rows[0],
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

    let query = "select * from artwork";

    if (artist) {
      query += ` where artist like '%${artist}%'`;
    }

    if (type && query.includes("where")) {
      query += ` and type like '%${type}%'`;
    } else if (type) {
      query += ` where type like '%${type}%'`;
    }

    if (price === "desc" || price === "asc") {
      query += ` order by price ${price}`;
    }

    console.log(query);

    try {
      const artworks = (await pool.query(query)).rows;

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

    const query = "select * from artwork where id = $1";

    try {
      const artwork = (await pool.query(query, [artwork_id])).rows[0];

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

    const query = "delete from artwork where id = $1";

    try {
      await pool.query(query, [artwork_id]);

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
