## Introduction
A very simple stem player, built with SolidJS.

## Setup
Two songs have already been set up, adding new songs is a manual process.
To add new songs, head to the `/api/assets/stemplayer` directory and create a new folder. In this folder, place all your stems (as mp3 files) and a file with no extension named after the title of the song. If you don't follow these steps entirely, your song may not work correctly.

## Usage
To install the dependencies run:
```bash
$ npm install # or pnpm install or yarn install
```

In the project directory, run `npm run dev` or `npm start` to start the SolidJS server.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You must also enter the `/api` directory and run `npm run start` to start the back-end server.
`npm run build` builds the app for production to the `dist` folder.<br>

## License
This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more details.