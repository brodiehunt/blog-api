const app = require('../app');
const request = require('supertest');
const authServices = require('../services/authServices');
const authValidation = require('../middleware/validateUser');

jest.mock('../services/authServices');

describe('POST /register  - HAPPY PATH', () => {
    beforeEach(() => {
        authServices.checkUserExists.mockResolvedValue(null);
        authServices.createUser.mockResolvedValue({ id: '123', username: 'testuser', email: 'test@example.com' });
    })

    test('Should response with status code 201', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123', passwordConfirm: 'Password123' };

        const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

        expect(response.status).toBe(201);
    })

    test('Should respond with content type json', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123', passwordConfirm: 'Password123' };
    
        const response = await request(app)
          .post('/api/auth/register')
          .send(userData);

          expect(response.headers['content-type']).toMatch(/json/);
    })

    test('Should respond with message', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123', passwordConfirm: 'Password123' };
    
        const response = await request(app)
          .post('/api/auth/register')
          .send(userData);

        expect(response.body.msg).toBe('User successfully registered');
    })

    test('Should have cookie set in header', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123', passwordConfirm: 'Password123' };
    
        const response = await request(app)
          .post('/api/auth/register')
          .send(userData);

          expect(response.headers['set-cookie']).toBeDefined();
    })
})

describe('POST /api/auth/register -- validation of feilds', () => {
    // No feilds are sent
    test('No user data is sent', async () => {
        const userData = {};
        const response = await request(app)
          .post('/api/auth/register')
          .send(userData);
        
        expect(response.status).toBe(400);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors).toHaveLength(4);  
    });
    
    // username authentication fails feild wrong
    describe('Username feild validates contraints', () => {

        test('Username less than 2 characters', async () => {
            const userData = { username: 't', email: 'test@example.com', password: 'Password123', passwordConfirm: 'Password123' };
    
            const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

            expect(response.status).toBe(400)
            expect(response.body.errors).toHaveLength(1);
            expect(response.body.errors[0].username).toBe('Username must be more than 2 and less than 20 characters');
        })

        test('username greater than 20 character', async () => {
            const userData = { username: 'testuserghghghghghghgh', email: 'test@example.com', password: 'Password123', passwordConfirm: 'Password123' };
    
            const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

            expect(response.status).toBe(400)
            expect(response.body.errors).toHaveLength(1);
            expect(response.body.errors[0].username).toBe('Username must be more than 2 and less than 20 characters');
        })
    })

    // email authentication fails
    test('Email not valid', async () => {
        const userData = { username: 'tfhghg', email: 'test@example', password: 'Password123', passwordConfirm: 'Password123' };

        const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].email).toBe('Must be a correct email: example@email.com');
    })
    
    // password authetication fails
    describe('Password feild validates contraints', () => {

        test('password less than 6 characters', async () => {
            const userData = { username: 'tfjfjfjfj', email: 'test@example.com', password: 'Pass1', passwordConfirm: 'Pass1' };
    
            const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

            expect(response.status).toBe(400)
            expect(response.body.errors).toHaveLength(1);
            expect(response.body.errors[0].password).toBe('Password must be more than 5 and less than 20 characters');
        })

        test('Password greater than 20 character', async () => {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123111111111111', passwordConfirm: 'Password123111111111111' };
    
            const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

            expect(response.status).toBe(400)
            expect(response.body.errors).toHaveLength(1);
            expect(response.body.errors[0].password).toBe('Password must be more than 5 and less than 20 characters');
        })

        test('Password has no capital letter', async () => {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'password123', passwordConfirm: 'password123' };
    
            const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

            expect(response.status).toBe(400)
            expect(response.body.errors).toHaveLength(1);
            expect(response.body.errors[0].password).toBe('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
        })

        test('Password has no number', async () => {
            const userData = { username: 'testuser', email: 'test@example.com', password: 'Password', passwordConfirm: 'Password' };
    
            const response = await request(app)
            .post('/api/auth/register')
            .send(userData);

            expect(response.status).toBe(400)
            expect(response.body.errors).toHaveLength(1);
            expect(response.body.errors[0].password).toBe('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
        })
    })

    // passwords do not match
    test('Passwords do not match', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'Password1', passwordConfirm: 'Password12' };

        const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

        expect(response.status).toBe(400)
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].passwordConfirm).toBe('Password confirmation does not match password');
    })
})
