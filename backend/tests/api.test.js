import request from 'supertest';
import app from '../server.js';

describe('Health Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);

      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/health/detailed', () => {
    it('should return detailed health information', async () => {
      const res = await request(app)
        .get('/api/health/detailed')
        .expect(200);

      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('dependencies');
      expect(res.body).toHaveProperty('system');
      expect(res.body.system).toHaveProperty('memory');
    });
  });
});

describe('Chat Endpoints', () => {
  describe('GET /api/chat/modes', () => {
    it('should return available chat modes', async () => {
      const res = await request(app)
        .get('/api/chat/modes')
        .expect(200);

      expect(res.body).toHaveProperty('modes');
      expect(res.body.modes).toHaveProperty('explain');
      expect(res.body.modes).toHaveProperty('bugs');
      expect(res.body.modes).toHaveProperty('translate');
      expect(res.body.modes).toHaveProperty('optimize');
    });
  });

  describe('POST /api/chat/analyze', () => {
    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/chat/analyze')
        .send({})
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Validation failed');
    });

    it('should reject messages that are too long', async () => {
      const longMessage = 'a'.repeat(10001);
      
      const res = await request(app)
        .post('/api/chat/analyze')
        .send({ message: longMessage })
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Validation failed');
    });

    it('should reject invalid modes', async () => {
      const res = await request(app)
        .post('/api/chat/analyze')
        .send({ 
          message: 'test message',
          mode: 'invalid_mode'
        })
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Validation failed');
    });
  });
});

describe('Error Handling', () => {
  describe('404 Not Found', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app)
        .get('/api/unknown-route')
        .expect(404);

      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('error');
    });
  });
});
