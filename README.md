### Educational project "messenger"

This project is interesting because it minimizes the use of third-party libraries.

Instead of popular libraries, the project uses the following custom modules:
1. Template engine
2. Fetch analogue for working with HTTP
3. Store for working with the global state of the application
4. Router
5. Component approach (reactivity)
6. Form validation module

**Project hosting on [Netlify](https://distracted-swartz-d8b108.netlify.app/).
**Layouts in [figma](https://www.figma.com/file/l0jgte4N2dzWv5zMITIC4f/shipko_messenger?node-id=0%3A1)**.

**Project structure:**
* `./src` - project source files
* `./dist` - repository for built files
* `./webpack` - webpack configuration files
* `./test` - test files

**Commands:**
1. Configure production files in dist: `npm run build`
2. Deploy the project locally (webpack devServer): `npm start`
2. Deploy the project locally (node ​​js): `npm run server`
3. Run tests: `npm run test`
4. Run linting: `npm-run-all lint:*`

**List of technologies:**
1. Testing: [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/).
Fake server and spy functions [sinon](https://sinonjs.org/).
Mocking dom-tree [jsdom](https://github.com/jsdom/jsdom).
2. Preprocessor: [less](http://lesscss.org/).
3. Bundle: [webpack](https://webpack.js.org/).
4. Linting: [eslint](https://eslint.org/), [stylelint](https://stylelint.io/).
5. Precommit: [husky](https://github.com/typicode/husky).

**Current functionality:**
1. Adding a user to a chat
2. Removing a user from a chat
3. Add a chat
4. Delete a chat
5. Log in/log out
6. Change profile settings
7. Change avatar
8. Change password
9. Register
10. Connecting to a chat and displaying a list of messages with dynamic loading
11. Send/Receive a message

**Planned:**
1. Teach the messenger to understand whether a message has been read or not (at the time of passing - not in the back of the workshop)
2. Sending pictures and videos (at the time of passing - not in the back of the workshop)
3. Activate the search bar and quickly create a chat with one user
4. Show beautiful pop-up messages instead of blocking alerts
5. Add a sound when receiving a message
