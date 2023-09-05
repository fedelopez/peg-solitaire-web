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

![Demo](https://github.com/fedelopez/peg-solitaire-web/blob/master/docs/peg-solitaire.gif)

The game offers a Hint button to provide help with the next move. It uses problem-solving to find the next move on behalf of the player. This algorithm uses an array to store all the visited boards processed so that it does not process states already computed. In order to store the visited boards, each board visited by the 'solve' algorithm is encoded as a 33-char array. The following is an example of an encoded board:

pppeppppppeppppeppppeeeeeeeeeeeee

2^33=8,589,934,592=~8.5 billion board states 





