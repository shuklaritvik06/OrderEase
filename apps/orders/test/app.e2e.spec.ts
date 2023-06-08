import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrdersModule } from './../src/modules/order.module';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;
  const product = {
    product_id: 'P101001',
    product: 'Product One',
    price: 2002,
    address: 'LIG 28',
    phone: '+918929223295',
  };
  jest.setTimeout(60000);
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrdersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/orders/create (POST)', () => {
    request(app.getHttpServer()).delete(
      '/api/v1/orders/delete/P101001',
      (error, response) => {
        if (error) {
          console.log(error);
        }
        console.log('Deleted!', response.body);
      },
    );
    return request(app.getHttpServer())
      .post('/api/v1/orders/create')
      .send(product)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });
  it('/api/v1/orders/get/:id (POST)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/orders/get/P101001')
      .expect(200)
      .expect(product);
  });
  it('/api/v1/orders/update/:id (POST)', () => {
    return request(app.getHttpServer())
      .put('/api/v1/orders/update/P101001')
      .send({
        product_id: 'P101001',
        product: 'Product Two',
        price: 2002,
        address: 'LIG 28',
        phone: '+918929223295',
      })
      .expect(200)
      .expect({
        product_id: 'P101001',
        product: 'Product Two',
        price: 2002,
        address: 'LIG 28',
        phone: '+918929223295',
        acknowledged: true,
      });
  });
  it('/api/v1/orders/delete/:id (POST)', () => {
    return request(app.getHttpServer())
      .delete('/api/v1/orders/delete/P101001')
      .expect(200);
  });
  afterAll(async () => {
    await app.close();
  });
});
