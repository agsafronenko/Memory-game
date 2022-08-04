# Memory-game
* Classic memory game *

A player is limited to:
- countdown timer;
- number of clicks.

Countdown timer:
    is set to 99 seconds simply to make harder to cheat by writing down the tiles revealed.

Number of clicks:
    is set to the minimum number of clicks required to find all matches in the worst case set-up scenario plus adjustment on difficulty:
        
        Formula:
      
        Clicks = num of cardtiles * 2 - 2 + adjustment on difficulty

        Two conditions were taken into considiration while calculating  *** (num of cardtiles * 2 - 2) *** :
        1) the distribution of card tiles is the least beneficial for a player, in particular, 
        for every new pair of cards clicked (except for the first two and the last two):
            - first card of a pair is always new (hasn't been in previous pairs);
            - second card of a pair has already been in previous pairs;
        that means: an additonal (second) click is always required for every card (except for the last two cards) to match them all;
        2) a player makes no mistakes: 
            - never clicks on one and the same card more than two times (except for the last two revealed cards);
            - always clicks only once on each of the last two revealed cards. 
    
        Adjustment on difficulty:
            +6 clicks for normal difficulty
            +0 clicks for hard difficulty

Hard mode also has different colours for each shape in a pair.
                            