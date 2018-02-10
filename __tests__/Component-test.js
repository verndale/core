import 'jasmine-jquery';
import Component from '../src/Component';

jasmine.getFixtures().fixturesPath = 'base/__tests__/__fixtures__';

describe('Component', () => {
  beforeEach(() => {
    loadFixtures('index.html');
  });

  describe('setupDefaults()', () => {
    let foo = null;

    beforeEach(() => {
      class Foo extends Component{
        constructor(el){
          super(el);
        }
      }

      spyOn(Foo.prototype, 'setupDefaults');

      new Foo('.bar');

      foo = Foo;
    });

    afterEach(() => {
      foo = null;
    });

    it('should call setupDefaults when instantiating a component', () => {
      expect(foo.prototype.setupDefaults).toHaveBeenCalled();
    });

    it('should call setupDefaults once', () => {
      expect(foo.prototype.setupDefaults.calls.count()).toEqual(1);
    });
  });

  describe('addListeners()', () => {
    let foo = null;

    beforeEach(() => {
      class Foo extends Component{
        constructor(el){
          super(el);
        }
      }

      spyOn(Foo.prototype, 'addListeners');

      new Foo('.bar');

      foo = Foo;
    });

    afterEach(() => {
      foo = null;
    });

    it('should call addListeners when instantiating a component', () => {
      expect(foo.prototype.addListeners).toHaveBeenCalled();
    });

    it('should call addListeners once', () => {
      expect(foo.prototype.addListeners.calls.count()).toBe(1);
    });
  });

  describe('abstract method order', () => {
    it('should call addListeners after setupDefaults', () => {
      class Foo extends Component{
        constructor(el){
          super(el);
        }

        setupDefaults(){
          this.count = 1;
        }

        addListeners(){
          this.count++;
        }
      }

      const foo = new Foo('.bar');

      expect(foo.count).toBe(2);
    });
  });

  describe('config', () => {
    it('should take a props object and be accessible with this.props', () => {
      class Foo extends Component{
        constructor(el, props){
          super(el, props);
        }

        get testConfig(){
          return this.props;
        }
      }

      const foo = new Foo('.bar', {
        name: 'Joe',
        age: 34
      });

      expect(foo.testConfig).toEqual(jasmine.objectContaining({
        name: 'Joe',
        age: 34
      }));
    });
  });
});
