# Future work

- Add to Sect games site
- Add more scenarios
- Complete applyCluesAdNauseam tests

- Put in app store
  - add screenshots to manifest and webpack config
  - add asset links to webpack config and also do like dragon game ("Since this app doesn't have a custom domain, asset links for the Google Play Store are stored at https://github.com/skedwards88/.well-known (https://skedwards88.github.io/.well-known/assetlinks.json).")
- should autocomplete verify that there is exactly one true per row/column?
- Add error boundaries? handle error for unknown action in reducer
- consider consolidating duplicate code around `matrixColumnInfo,matrixRowInfo` in `generatePuzzle` and `generateSolutionMatrix`

## Maybe later

- Could add more clues?
  - the red house has an even number of trees (this is a glorified "or")
  - the red house has more than 3 trees (this is a glorified "or")
  - the red house does not have the most or fewest trees (this is a glorified "or")
