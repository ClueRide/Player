import {AnswerKey, HttpService, BASE_URL} from "front-end-common";
import {AnswerPost} from "./answer-post";
import {AnswerSummary} from "./answer-summary";
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {ServerEventsService} from "../server-events/server-events.service";

/**
 * Responsible for Answer Summaries.
 *
 * Posting Answers and following the stream of AnswerSummaries until the Puzzle is closed.
 */
@Injectable()
export class AnswerSummaryService {

  /* This life-cycle probably goes with the page. */
  private subscription: Subscription;

  constructor(
    public http: HttpClient,
    public httpService: HttpService,
    public sseService: ServerEventsService,
  ) {
    console.log('Hello AnswerSummaryService');
  }

  public openAnswerSummaryChannel(): Observable<AnswerSummary> {
    const answerSummary$: Observable<AnswerSummary> = this.sseService.getAnswerSummaryObservable();
    this.subscription = answerSummary$.subscribe(
      (answerSummary) => {
        console.log("Answers received for puzzle ID: " + answerSummary.puzzleId);
      }
    );
    return answerSummary$;
  }

  public closeAnswerSummaryChannel(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Send in player's answer and get back the current AnswerSummary.
   * @param puzzleId unique identifier for the Puzzle we're answering.
   * @param myAnswer AnswerKey matching the selected answer.
   */
  public postAnswer(
    puzzleId: number,
    myAnswer: AnswerKey
  ): Observable<AnswerSummary> {
    const answerPost = new AnswerPost(puzzleId, myAnswer);
    return this.http.post<AnswerSummary>(
      BASE_URL + 'puzzle/answer',
      answerPost,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
