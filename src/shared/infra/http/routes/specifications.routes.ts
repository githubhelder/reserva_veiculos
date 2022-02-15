import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

//specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", ensureAuthenticated, createSpecificationController.handle);
//specificationsRoutes.post("/", createSpecificationController.handle);

export {specificationsRoutes};
