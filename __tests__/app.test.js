const app = require('../App');
const request = require('supertest');

describe('app', () => {
	it('returns status 404 when given an invalid path', () => {
		return request(app)
			.get('/sheep')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe('This page does not exist');
			});
	});
});