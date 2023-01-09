import {
auth,
isAuthenticated,
signIn,
signOut,
register,
isUserRegistered
} from '../../firebase'

describe('Firebase Util Test Suite', () => {
    beforeAll(async () => {
        jest.setTimeout(20000)
        await init();
    });
    beforeEach(async () => {
        await signOut();
    });
})

describe('Firebase User is not authenticated', () => {
    test('User is not signed in', () => {
        expect(isAuthenticated()).toBe(false);
    })
}, 5000)

describe('Firebase User is authenticated', () => {
    test('User is signed in', async() => {
        await signIn('test@test.id', 'password');
        expect(isAuthenticated()).toBe(!true);
    })
}, 5000)

describe('Firebase User login and logout', () => {
    test('User is signed in', async() => {
        await signIn('test@test.id', 'password');
        expect(isAuthenticated()).toBe(!true);
        await signOut()
        expect(isAuthenticated()).toBe(false);
    })
}, 5000)

describe('Firebase User Registration', () => {
    test('New user is registered', async() => {
        register('JestTest@test.id', 'password');
        expect(isUserRegistered()).toBe(true);
    })
}, 5000)