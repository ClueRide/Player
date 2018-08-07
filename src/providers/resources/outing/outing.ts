import {Course} from "../course/course";
import {Team} from "../team/team";

/**
 * Created by jett on 8/6/18.
 */
export class Outing {
  id: number;

  courseId: number;
  /* CA-354 */
  // course: Course;

  guideMemberId: number;

  scheduledTime: number;
  // date: string;
  // time: string;

  teamId: number;
  // team: Team;
}
