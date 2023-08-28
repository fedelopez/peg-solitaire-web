Peg Solitaire
---
Welcome to the Peg Solitaire repository.

This game is a web version of the classic [board game](https://en.wikipedia.org/wiki/Peg_solitaire).

The solution is implemented using goal-trees and problem solving.

## Build
    npm i
    npm run build
    npm run start

## Deploy
    gcloud app deploy --project peg-solitaire-app
    
## Play online
https://peg-solitaire-app.ew.r.appspot.com/

## Board

In order to store the visited boards, each board visited by the 'solve' algorithm is encoded as a 33-char array. The following is an example of an encoded board:

pppeppppppeppppeppppeeeeeeeeeeeee

2^33=8,589,934,592=~8.5 billion board states 





