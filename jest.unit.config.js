module.exports = {
    verbose: true,
    rootDir: '.',
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'js', 'json'],
    testEnvironment: 'jsdom',
    coverageReporters: [
        'json-summary',
        'text',
        'lcov',
        'cobertura'
    ],
    moduleDirectories: [
        'node_modules'
    ],
    testMatch: [
        '<rootDir>/src/tests/unit/**/*.spec.ts'
    ],
    collectCoverageFrom: [
        '**/src/**/*.ts',
        '!**/src/app.ts',
        '!**/src/models/**',
        '!**/src/tests/**',
        '!**/src/config/**'
    ],
    setupFilesAfterEnv: ['<rootDir>/src/tests/unit/setupTest.ts']
};