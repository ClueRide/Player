The Rolling Page is used by the Guide to direct the flow of the game, and
by the players to know where they are within the flow of the game.

# Testing this page under two classes of user
When testing, we'll want to take actions as the Guide, and prevent actions
 as the Seeker, so the accounts need to carry the appropriate 
 Badge/Authorization to view/hide those actions. These accounts should
only be held in the Test system and not in production.

The TEST GUIDE account could call into the API to trigger the transition 
notification without being present in the module under test -- effectively 
acting as a separate client. This would allow testing the app while 
authenticated using a non-Guide account.

## Design Impact
The Guide sends a signal to the server which updates each of the clients 
logged in under that team. This is a "push" operation and occurs at two main 
points in the game:
1. Transitioning from "At Location / Puzzle Solved" to "Rolling"
2. Transitioning from "Rolling" to "Arrived"

Polling may be too network intensive. However, the keeping open a
connection (stream ?) could also be intensive. 

### There are a few options I'm finding
**Upshot:** PLAY-15 implements Server Sent Events (SSE).

So far, I've come across
- polling
- websockets
- EventSource - appears to also be named Server Sent Events (SSE)

Ionic has this:
- Push: https://ionicframework.com/docs/native/push/

