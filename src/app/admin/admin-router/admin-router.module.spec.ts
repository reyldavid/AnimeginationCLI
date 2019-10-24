import { AdminRouterModule } from './admin-router.module';

describe('AdminRouterModule', () => {
  let adminRouterModule: AdminRouterModule;

  beforeEach(() => {
    adminRouterModule = new AdminRouterModule();
  });

  it('should create an instance', () => {
    expect(adminRouterModule).toBeTruthy();
  });
});
