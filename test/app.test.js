const request = require('supertest');
const app = require('../api/index');

describe('Snacks API', () => {
  // Test Get all snacks
  it('should fetch all snacks', async () => {
    const response = await request(app).get('/snacks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test POST route to create a new snack
  it('should create a new snack', async () => {
    const newSnack = {
      name: 'Salty Chips',
      description: 'Crunchy and salty',
      price: 1.99,
      category: 'Salty',
      instock: true,
    };
    const response = await request(app).post('/snacks').send(newSnack);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'description', 'price');
  });

  // Test GET single snack by ID
  it('should fetch a single snack by ID', async () => {
    const snackId = 8;
    const response = await request(app).get(`/snacks/${snackId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', snackId);
  });

  // Test PUT route to update a snack
  it('should update an existing snack', async () => {
    const snackId = 1;
    const updatedSnack = {
      name: 'Chips',
      description: 'Spicy and crunchy',
      price: 2.49,
      category: 'Spicy',
      instock: true,
    };
    const response = await request(app)
      .put(`/snacks/${snackId}`)
      .send(updatedSnack);
    expect(response.status).toBe(200);
  });
  // Test DELETE route
  it('should delete a snack', async () => {
    const snackId = 1;
    const response = await request(app).delete(`/snacks/${snackId}`);
    expect(response.status).toBe(204);

    // Verify deletion
    const fetchResponse = await request(app).get(`/snacks/${snackId}`);
    expect(fetchResponse.statusCode).toBe(404);
  });
});
