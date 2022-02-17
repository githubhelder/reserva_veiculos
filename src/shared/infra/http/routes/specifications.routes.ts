import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

//desta forma implica que todos os links devem ser autenticados.  
//specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);
//specificationsRoutes.post("/", createSpecificationController.handle);

export {specificationsRoutes};
