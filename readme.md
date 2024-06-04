**Running the Application:**

## Installation

```npm install``` (or ```npm run setup```)

## Start both environments (host and remote components)

```npm run start```
That will run npm start on both remote and hostapp


Run npm start to start host(main app) and remote(micro frontend components)

That will run npm start on both remote and hostapp

You can run npm start on each subfolder as well or use on two different consoles both: (to be able to quickly restart only one if needed)
```npm run start:host```
```npm run start:remote```


## Tests
```npm run test```
```npm run test:cov```
```npm run test:watch```

Commands can be run in root or in /remote (micro frontend for Todo app)


**Other architectural considerations**

If following a microfrontend with different repos, "remote app" could be its own repo, could be deployed into a custom artifactory and using npm publish and installing that specific version on the main app
same may apply to N different dependencies

Other path may be a monorepo with subfolders for each project (increasing spead and easier collab). Personally i've seen big projects migrating into this architecture after too much "work overhead" in multirepos approach
 
 **1. Micro-frontend in a Separate Repository:**

- The "remote app" can reside in its own repository.
- Deploy it to a custom artifactory or package registry.
- Use package managers like npm to publish and install the specific version needed in the main app.

**2. N Different Dependencies:**

- Similar to the single "remote app" concept, manage multiple front-end dependencies as independent repositories.
- Publish each dependency using package managers for integration with the main app.


# Regarding .env 

- You can ignore the `.env` file not found warning on startup if it's not necessary for your application current state (may be added later if the scope requires it)