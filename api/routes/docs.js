const docs = {
  'API Documentation': {
    'Base URL': 'http://localhost:4000',
    Endpoints: {
      '/snacks': {
        GET: {
          description: 'Retrieve all snacks',
          request: {
            headers: {
              'api-key': 'Required. Admin API key.',
            },
          },
          response: {
            200: {
              description: 'A list of snacks',
              body: [
                {
                  id: 'integer',
                  name: 'string',
                  description: 'string',
                  price: 'float',
                  category: 'string',
                  instock: 'boolean',
                },
              ],
            },
          },
        },
        POST: {
          description: 'Add a new snack',
          request: {
            headers: {
              'api-key': 'Required. Admin API key.',
            },
            body: {
              name: 'string (required)',
              description: 'string (required)',
              price: 'float (required)',
              category: 'string (required)',
              instock: 'boolean (required)',
            },
          },
          response: {
            201: {
              description: 'Snack created',
              body: {
                name: 'string',
                description: 'string',
                price: 'float',
                category: 'string',
                instock: 'boolean',
              },
            },
            400: {
              description: 'Bad request if required fields are missing',
              body: {
                message: 'string',
              },
            },
          },
        },
      },
      '/snacks/:id': {
        GET: {
          description: 'Retrieve a snack by ID',
          request: {
            headers: {
              'api-key': 'Required. Admin API key.',
            },
          },
          response: {
            200: {
              description: 'A snack object',
              body: {
                id: 'integer',
                name: 'string',
                description: 'string',
                price: 'float',
                category: 'string',
                instock: 'boolean',
              },
            },
            404: {
              description: 'Snack not found',
              body: {
                message: 'string',
              },
            },
          },
        },
        PUT: {
          description: 'Update an existing snack',
          request: {
            headers: {
              'api-key': 'Required. Admin API key.',
            },
            body: {
              name: 'string (required)',
              description: 'string (required)',
              price: 'float (required)',
              category: 'string (required)',
              instock: 'boolean (required)',
            },
          },
          response: {
            200: {
              description: 'Snack updated',
            },
            400: {
              description: 'Bad request if required fields are missing',
              body: {
                message: 'string',
              },
            },
          },
        },
        DELETE: {
          description: 'Delete a snack by ID',
          request: {
            headers: {
              'api-key': 'Required. Admin API key.',
            },
          },
          response: {
            204: {
              description: 'Snack deleted',
            },
          },
        },
      },
    },
    'Error Handling': {
      500: {
        description: 'Generic server error',
        body: {
          error: 'string',
          errorStack: 'string',
          errorMessage: 'string',
        },
      },
      404: {
        description: 'Resource not found',
        body: {
          error: 'string',
        },
      },
    },
  },
};

module.exports = docs;
