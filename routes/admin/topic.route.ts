import { Router } from "express";
const router: Router = Router();

import * as topicController from "../../controllers/admin/topic.controller";

router.get("/", topicController.index);

export const topicRoutes: Router = router;