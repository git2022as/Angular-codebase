import { ProductDescriptionPipe } from './product-description.pipe';

describe('ProductDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductDescriptionPipe();
    expect(pipe).toBeTruthy();
  });
});
