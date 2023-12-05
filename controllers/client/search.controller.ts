import {Request, Response} from "express"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

// GET /search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;

  let newSongs = [];

  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");

    //! tạo ra slug không dấu, thêm dấu - ngăn cách
    const stringSlug = convertToSlug(keyword);
    const slugRegex = new RegExp(stringSlug, "i");
    const songs = await Song.find({
      $or: [
        {title: keywordRegex},
        {slug: slugRegex}
      ]
    });

    for (const item of songs) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId
      });
      item["infoSinger"] = infoSinger;
    }

    newSongs = songs;
  }

  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    keyword,
    songs: newSongs
  })
}