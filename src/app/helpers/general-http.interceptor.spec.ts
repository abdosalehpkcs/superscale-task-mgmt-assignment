import { TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared/shared/shared.module';
import { GeneralHttpInterceptor } from './general-http.interceptor';

describe('GeneralHttpInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [GeneralHttpInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: GeneralHttpInterceptor = TestBed.inject(GeneralHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
