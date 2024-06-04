
TODO MF APP

npm install (or npm run setup)
Run npm start to start host(main app) and remote(micro frontend components)

That will run npm start on both remote and hostapp

You can run npm start on each subfolder as well or use on two different consoles both: (to be able to quickly restart only one if needed)
npm run start:host
npm run start:remote

Other architectural considerations:

If following a microfrontend with different repos, "remote app" could be its own repo, could be deployed into a custom artifactory and using npm publish and installing that specific version on the main app
same may apply to N different dependencies

Other path may be a monorepo with subfolders for each project (increasing spead and easier collab). Personally i've seen big projects migrating into this architecture after too much "work overhead" in multirepos approach


Considerations:
Ignore .env not found error on start, not needed 