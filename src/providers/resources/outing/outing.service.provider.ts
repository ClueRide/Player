import {InjectionToken} from "@angular/core";
import {Resource} from "../resource";
import {Restangular} from "ngx-restangular";

export const OUTING_REST = new InjectionToken<string>('OutingResource');

/* Resource providing Nearest Location instances suitable for edit. */
/* For a given locationId, provide a feature set (geometry) for the location. */
const GET =
  {
    resourceName: 'outing/3',
    name: 'get',
    httpMethod: 'get',
    // path: 'outingId'
  };

export function RestFactory(
  restangular: Restangular,
  crResource: Resource,
) {

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, GET);
    }
  );

  return restangular.service('outing');
}

export let outingServiceProvider =
  { provide: OUTING_REST,
    useFactory: RestFactory,
    deps: [Restangular, Resource]
  };

