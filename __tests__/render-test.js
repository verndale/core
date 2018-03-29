import 'jasmine-jquery';
import dom from '../src';
import render from '../src/render';

jasmine.getFixtures().fixturesPath = 'base/__tests__/__fixtures__';

describe('render(el, cb)', () => {
  beforeEach(() => {
    loadFixtures('index.html');
  });

  it('should fire a callback for every instance of the element that is found', done => {
    let elements = [];

    render(dom('.qux'), el => {
      elements.push(el);
    });

    expect(elements.length).toBe(2);
    expect(elements[0]).toEqual(jasmine.any(Object));
    expect(elements[1]).toEqual(jasmine.any(Object));

    done();
  });

  it('should error if there is no element object passed in', () => {
    expect((() => {
      render();
    })).toThrowError(Error);
  });

  it('should error if there is an empty string passed in', () => {
    expect((() => {
      render('');
    })).toThrowError(Error);
  });

  it('should error if there is anything but a dom object passed in', () => {
    expect((() => {
      render('.qux');
    })).toThrowError(TypeError);

    expect((() => {
      render(['.qux', '.quux']);
    })).toThrowError(TypeError);
  });

  it('should error if there is no callback defined', () => {
    expect((() => {
      render(dom('.qux'));
    })).toThrowError(Error);
  });

  it('should error if there the callback is defined and not a Function', () => {
    expect((() => {
      render(dom('.qux'), 'foo');
    })).toThrowError(TypeError);
  });
});
