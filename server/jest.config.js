module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ["js", "ts"],
	transform: {
		'^.+\\.(ts|tsx)?$': 'ts-jest',
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	modulePaths: [
			'<rootDir>'
	],
	moduleNameMapper: {
		"~/(.*)": "<rootDir>/$1"
	},
	moduleDirectories: ['node_modules', 'src'],
	globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
}