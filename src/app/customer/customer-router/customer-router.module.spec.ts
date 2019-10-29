import { CustomerRouterModule } from './customer-router.module';

describe('CustomerRouterModule', () => {
  let customerRouterModule: CustomerRouterModule;

  beforeEach(() => {
    customerRouterModule = new CustomerRouterModule();
  });

  it('should create an instance', () => {
    expect(customerRouterModule).toBeTruthy();
  });
});
