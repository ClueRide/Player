# Testing this page
The Rolling page is used by the Guide to direct the flow of the game. 
When testing, we'll want to take actions as the Guide, so the account needs
to carry the Badge/Authorization to view those actions. This account should
only be held in the Test system and not in production.

That account could call into the API to trigger the transition notification
without being present in the module under test. This would allow testing the 
app while authenticated using a non-Guide account.

## Design Impact
The Guide sends a signal to the server which updates each of the clients 
logged in under that team. This is a "push" operation and occurs at two main 
points in the game:
1. Transitioning from "At Location / Puzzle Solved" to "Rolling"
2. Transitioning from "Rolling" to "Arrived"

Polling may be too network intensive. However, the keeping open a
connection (stream ?) could also be intensive. 

### There are a few options I'm finding
So far, I've come across
- polling
- websockets
- EventSource - appears to also be named Server Sent Events (SSE)

Ionic has this:
- Push: https://ionicframework.com/docs/native/push/

