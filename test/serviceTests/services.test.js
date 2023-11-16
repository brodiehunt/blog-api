const mongoose = require('mongoose');
const authServices = require('../../services/authServices');

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect('mongodb://127.0.0.1:27017/blog-api-test');
});


afterAll(async () => {
  // Close the database connection after all tests are done
  await mongoose.connection.close()
});

describe('User Service Tests', () => {
  test('should create a new user', async () => {
    // Your test logic here
    expect( 1 + 1).toBe(2);
  });

  // Additional test cases...
});