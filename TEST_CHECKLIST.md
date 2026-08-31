# The Missing Necklace - Edge-Case Test Checklist

## Game State Tests

[✓] Game starts in START state
[✓] START button changes the game to PLAYING state
[✓] Pause changes PLAYING state to PAUSED state
[✓] Resume changes PAUSED state to PLAYING state
[✓] Correct answer changes game to WIN state
[✓] Wrong answer changes game to LOSE state
[✓] Timer reaching 0 changes game to LOSE state
[✓] Restart returns the game to START state

## Score Tests

[✓] Initial score is 0
[✓] Finding a new clue adds 100 points
[✓] All three clues give a 200-point bonus
[✓] Correct thief answer gives 500 points
[✓] Maximum successful score is 1000

## Clue Tests

[✓] Three clues can be found
[✓] The same clue cannot be collected twice
[✓] Player cannot identify the thief before finding all clues

## Timer Tests

[✓] Timer starts at 60 seconds
[✓] Timer decreases during gameplay
[✓] Timer reaching 0 produces LOSE state
[✓] Pausing prevents the timer from progressing

## Restart Tests

[✓] Restart resets score to 0
[✓] Restart resets clues to 0/3
[✓] Restart resets timer to 60 seconds
[✓] Restart allows clues to be collected again

## Persistence Test

[✓] High score is saved using browser local storage
[✓] Saved high score remains available after reopening the game
