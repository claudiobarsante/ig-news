module.exports = {
	testPathIgnorePatterns: ['/node_modules/', '/.next'],
	setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
	},
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.(scss|css|sass)$': 'identity-obj-proxy',
	},
};

/*For jest to understand .css or .scss modules you have to install  yarn add identity-obj-proxy -D */
