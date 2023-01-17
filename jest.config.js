module.exports = {
    displayName: "dtc-portal-web",
    globals: {
        __PORT__: 4212,
        __STARTCMD__: "npm start -- --port 4212",
        __TIMEOUT__: 90000
    },
    preset: "../../e2eTestUtils/jest-puppeteer-utils/jest-preset.js"
};
