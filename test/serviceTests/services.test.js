const mongoose = require('mongoose');
const authServices = require('../../services/authServices');
const User = require('../../models/userModel');

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect('mongodb://127.0.0.1:27017/blog-api-test');
});

afterEach(async () => {
    // Clear the data after each test
    const collections = mongoose.connection.collections;

    await User.deleteMany({});
});

afterAll(async () => {
  // Close the database connection after all tests are done
  await mongoose.connection.close()
});

describe('User services tests', () => {

    test('Check user should return null when no user exists', async () => {
        const reqObj = { body: {username: 'username1', email: 'email@email.com', password: 'Password1'}};
        
        const user = await authServices.checkUserExists(reqObj);
        expect(user).toBeNull();

    });

    test('Should return a user when the same email is used', async () => {
        
        const userData = {username: 'username1', email: 'email@email.com', password: 'Password1'};
        // Add user with user data before calling check userExists
        await User.create(userData);
        const reqObj = { body: userData};

        // call auth service function with existing user
        const user = await authServices.checkUserExists(reqObj);
        expect(user).toBeDefined();
        expect(user.email).toBe(userData.email);
    })

    test('Should create a new user', async () => {
        const userData = {username: 'username1', email: 'email@email.com', password: 'Password1'};
        const reqObj = {body: userData};
        const newUser = await authServices.createUser(reqObj);

        expect(newUser).toBeDefined();
        expect(newUser.email).toBe(userData.email);
        expect(newUser.username).toBe(userData.username);
    });

    test('User password should be hashed when created in db', async () => {
        const userData = {username: 'username1', email: 'email@email.com', password: 'Password1'};
        const reqObj = {body: userData};
        const newUser = await authServices.createUser(reqObj);

        expect(newUser.password).toBeDefined();
        expect(newUser.password).not.toBe(userData.password);
    })

    test('wrong data specified for user', async () => {
        const userData = {username: 'username1', password: 'Password1'};
        const reqObj = {body: userData};
        const newUser = await authServices.createUser(reqObj);
    })
})

