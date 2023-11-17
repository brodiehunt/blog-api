const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

let token; 

beforeAll(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blog-api-test');
        const user = new User({ username: 'testuser', email: 'test@example.com', password: 'Password1' });
        await user.save();
        token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (err) {
        console.log(err);
    }
    
  });

  
  afterAll(async () => {
    // Close the database connection after all tests are done
    await User.deleteMany({});
    await mongoose.connection.close()
  });

// GET A USER INFO - api/user/profile

describe('GET - /api/user/profile', () => {
    test('Happy path - Should respond with a user and status 200', async () => {
        
        const response = await request(app)
            .get('/api/user/profile')
            .set('Cookie', [`jwt=${token}`])

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.user).toBeDefined();
        expect(response.body.msg).toBe('Success')

    })

    test('No token sent with request should return 401', async () => {
        const response = await request(app)
            .get('/api/user/profile');
        
        expect(response.status).toBe(401);
    })
})


describe('PUT /api/user/profile', () => {
    test('HAPPY PATH - Token and from feilds provided', async () => {
        const newUserData = { username: 'newUserNam', email: 'newemail@email.com'};

        const response = await request(app)
            .put('/api/user/profile')
            .set('Cookie', [`jwt=${token}`])
            .send(newUserData)

        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('User updated successfully')
        expect(response.body.user).toBeDefined()
        expect(response.body.user.username).toBe(newUserData.username)
        expect(response.body.user.email).toBe(newUserData.email)
    })


})

describe('DELETE - /api/user/delete', () => {
    // for now. check that it deletes the user. 

    test('should delete user', async () => {
        const user = await User.create({email: 'brodie@gmail.com', username: 'Brodie', password:'Password1'});
        const userToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const response = await request(app)
            .delete('/api/user/profile')
            .set('Cookie', [`jwt=${userToken}`])


        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('User deleted')
        expect(response.body.user).toBe('Brodie')
    })


})