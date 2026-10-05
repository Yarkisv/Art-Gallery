import { pool } from "../database/index.js";

export class ArtworkService {
  static async createArtwork(title, artist, type, price, availability) {
    const query = `insert into artwork (title, artist, type, price, availability) values ($1, $2, $3, $4, $5) returning *`;

    const result = await pool.query(query, [
      title,
      artist,
      type,
      price,
      availability,
    ]);

    return result.rows[0];
  }

  static async getAllArtworks(price, artist, type) {
    let query = "select * from artwork";

    if (artist) {
      query += ` where artist ilike '%${artist}%'`;
    }

    if (type && query.includes("where")) {
      query += ` and type like '%${type}%'`;
    } else if (type) {
      query += ` where type like '%${type}%'`;
    }

    if (price === "desc" || price === "asc") {
      query += ` order by price ${price}`;
    }

    const result = await pool.query(query);

    return result.rows;
  }

  static async getOneArtwork(id) {
    const query = "select * from artwork where id = $1";

    const result = await pool.query(query, [id]);

    return result.rows[0];
  }

  static async deleteOneArtwork(id) {
    const query = "delete from artwork where id = $1 returning *";

    const result = await pool.query(query, [id]);

    return result.rows[0];
  }
}
