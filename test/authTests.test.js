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
