# Logic Grid

:construction: This game is under development. You can play test it, but be sure to come back for the final version.

A classic logic grid puzzle.

[Play here](https://skedwards88.github.io/logic-grid/)!

<img width="385" alt="Screenshot of the logic grid game showing the clues and grid" src="https://github.com/github/docs-content/assets/25328854/e5f7f022-beb9-4e0e-8356-42a4b15fcf08">

## Contributing

Did you find an error when playing the game? Please open an issue, and include screenshots to illustrate the error.

Do you want to add a new scenario? TODO

## Development

To build, run `npm run build`.

To run locally with live reloading and no service worker, run `npm run dev`. (If a service worker was previously registered, you can unregister it in chrome developer tools: `Application` > `Service workers` > `Unregister`.)

To run locally and register the service worker, run `npm start`.

To deploy, push to `main` or manually trigger the `.github/workflows/deploy.yml` workflow.

Since this app doesn't have a custom domain, asset links for the Google Play Store are stored at https://github.com/skedwards88/.well-known (https://skedwards88.github.io/.well-known/assetlinks.json).
