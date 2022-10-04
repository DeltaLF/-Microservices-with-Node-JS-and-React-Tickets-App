import request from 'supertest';
import {app} from "../../app";

it('has a route handler listenting to /api/tickets for post reqeust',async () => {
  const response = await request(app)
      .post('/api/tickets')
      .send({});

      expect(response.status).not.toEqual(404);
})

it('can only be accessed if the user is signed in',async () => {
  const response = await request(app)
      .post('/api/tickets') 
      .send({})
      .expect(401);
})

it('returns a status other than 401 if user is signed in ',async () => {
  const cookie = global.signin();
  const response = await request(app)
      .post('/api/tickets')
      .set('Cookie',cookie)
      .send({});

      expect(response.status).not.toEqual(401);
})

it('return an error if an invalid title is provided',async () => {
  // RequestValidationError is expected
  await request(app)
      .post('/api/tickets')
      .set("Cookie", global.signin())
      .send({
        title: '',
        price: 50
      })
      .expect(400);

      await request(app)
      .post('/api/tickets')
      .set("Cookie", global.signin())
      .send({
        price: 50
      })
      .expect(400);
})

it('returns an error if an invalid price is proviced',async () => {
  await request(app)
  .post('/api/tickets')
  .set("Cookie", global.signin())
  .send({
    title: 'valid title',
    price: -50
  })
  .expect(400);

  await request(app)
  .post('/api/tickets')
  .set("Cookie", global.signin())
  .send({
    title: 'valid title',
  })
  .expect(400);
  

})

it('creates a ticket with valid inputs',async () => {
  // after db is implemented, add in a check to make sure ticket was saved
  await request(app)
      .post('/api/tickets')
      .send({
        title:'test',
        price:50
      })
      .expect(201);

})