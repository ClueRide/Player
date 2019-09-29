import {BadgeFeatures} from "front-end-common";

/**
 * What is received from SSE when a Badge is awarded.
 */
export class BadgeEvent {
  userId: number;
  badgeFeatures: BadgeFeatures;
}
