import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import checkPropTypes from 'check-prop-types';
import ProductCard from '../components/product/ProductCard';

const fakeProduct = {
  name: 'Josephine Sofa',
  image: 'josephine-sofa.jpg',
  price: 1200.99,
  id: 2,
};

describe('ProductCard', () => {
  describe('Checking PropTypes', () => {
    it('should not throw a warning', () => {
      const mockProps = {
        key: 1,
        product: fakeProduct,
      };

      const propsError = checkPropTypes(ProductCard.propTypes, mockProps, 'prop', ProductCard.name);

      expect(propsError).toBeUndefined();
    });
  });

  describe('With props', () => {
    let productCardWrapper;
    beforeAll(() => {
      productCardWrapper = shallow(<ProductCard product={fakeProduct} />);
    });

    it('renders without error', () => {
      expect(productCardWrapper.find('.product-card')).toHaveLength(1);
    });

    it('renders the price', () => {
      const price = productCardWrapper.find('.product-card__price');

      expect(price).toHaveLength(1);
      expect(price.text()).toBe(`$${fakeProduct.price}`);
    });

    it('renders the image', () => {
      const img = productCardWrapper.find('img');

      expect(img).toHaveLength(1);
      expect(img.props().src).toBe(`img/${fakeProduct.image}`);
      expect(img.props().alt).toBe(fakeProduct.name);
      expect(img.props().className).toBe('product-card__img');
    });

    it('renders the links', () => {
      const links = productCardWrapper.find('Link');

      expect(links).toHaveLength(2);
      expect(links.find('img').exists()).toBe(true);
      expect(links.at(0).props().to).toBe(`/products/${fakeProduct.id}`);
      expect(links.at(1).props().to).toBe(`/products/${fakeProduct.id}`);
      expect(links.at(1).props().className).toBe('product-card__name');
      expect(links.at(1).text()).toBe(fakeProduct.name);
    });

    it('matches the snapshot', () => {
      expect(toJSON(productCardWrapper)).toMatchSnapshot();
    });

    it('updates via props', () => {
      const productCardWrapper = shallow(<ProductCard product={{ ...fakeProduct, price: 1000 }} />);
      expect(toJSON(productCardWrapper)).toMatchSnapshot();
      productCardWrapper.setProps({ product: { ...fakeProduct, price: 1100.99 } });
      expect(toJSON(productCardWrapper)).toMatchSnapshot();
    });
  });

  describe('Without props', () => {
    let productCardWrapper;
    beforeAll(() => {
      productCardWrapper = shallow(<ProductCard />);
    });

    it('should not render', () => {
      expect(productCardWrapper.find('.product-card')).toHaveLength(0);
    });
  });
});
