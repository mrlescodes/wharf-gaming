import { Layer, ManagedRuntime } from 'effect';

import { SplinterlandsAPIService } from '@wharf-gaming/splinterlands-api-service';
import {
  priceLadder,
  runRentalPricingEngine,
} from '@wharf-gaming/splinterlands-bots';

const MainLayer = Layer.mergeAll(SplinterlandsAPIService.Live);

const SplinterlandsRuntime = ManagedRuntime.make(MainLayer);

const main = runRentalPricingEngine('wharf-gg', priceLadder);

SplinterlandsRuntime.runPromise(main).then((r) => {
  console.log(r);
});
