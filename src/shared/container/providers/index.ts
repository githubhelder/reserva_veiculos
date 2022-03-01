//fazer as injeções de dependências relacionadas aos providers.
import { container} from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateprovider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";


container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);