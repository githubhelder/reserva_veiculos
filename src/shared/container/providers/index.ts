//fazer as injeções de dependências relacionadas aos providers.
import { container} from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateprovider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";


container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);

container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider());