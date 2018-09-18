import {InjectionToken} from "@angular/core";
import {Resource} from "../resource";
import {Restangular} from "ngx-restangular";

export const GUIDE_EVENT_REST = new InjectionToken<string>('GuideEventResource');

/* List of supported endpoints. */
const ARRIVAL =
  {
    resourceName: 'game-state',
    name: 'arrival',
    httpMethod: 'post',
    path: 'arrival'
  };

const DEPARTURE =
  {
    resourceName: 'game-state',
    name: 'departure',
    httpMethod: 'post',
    path: 'departure'
  };

const TEAM_ASSEMBLED =
  {
    resourceName: 'game-state',
    name: 'teamAssembled',
    httpMethod: 'post',
    path: 'team-assembled'
  };

export function RestFactory(
  restangular: Restangular,
  crResource: Resource,
) {

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, ARRIVAL);
    }
  );

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, DEPARTURE);
    }
  );

  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, TEAM_ASSEMBLED);
    }
  );

  return restangular.service('game-state');
}

export let GuideEventServiceProvider =
  { provide: GUIDE_EVENT_REST,
    useFactory: RestFactory,
    deps: [Restangular, Resource]
  };

