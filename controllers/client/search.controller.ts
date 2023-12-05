import {Request, Response} from "express"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

// GET /search/:type
export const result = async (req: Request, res: Response) => {
  const type = req.params.type;
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
    }).lean();

    for (const item of songs) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId
      });
      item["infoSinger"] = infoSinger;
    }

    newSongs = songs;
  }

  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        pageTitle: `Kết quả: ${keyword}`,
        keyword,
        songs: newSongs
      })
      break;
    case "suggest":
      res.json({
        code: 200,
        message:"OK",
        songs: newSongs
      });
      break;
    default:
      res.json({
        code: 404,
        message: "Not found"
      })
      break;
  }
}