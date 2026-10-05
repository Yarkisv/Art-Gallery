import express from "express";
import { ArtworkController } from "../controllers/artwork.controller.js";

export const router = express.Router();

router.get("/artworks", ArtworkController.getAllArtworks);
router.get("/artworks/:id", ArtworkController.getOneArtwork);
router.post("/artworks", ArtworkController.createArtwork);
router.delete("/artworks/:id", ArtworkController.deleteOneArtwork);
router.put("/artworks/:id", ArtworkController.updateOneArtwork);
