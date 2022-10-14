module.exports = {
  roots: [
      "__test__"
  ],
  testRegex: '__test__/unit/(.+)\\.test\\.(js?|ts?)$',
  transform: {
      "^.+\\.ts?$": "ts-jest"
  },
  moduleFileExtensions: ['ts', 'js'],
};