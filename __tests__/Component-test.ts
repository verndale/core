import "jasmine-jquery";
import Component from "../src/Component";

jasmine.getFixtures().fixturesPath = "base/__tests__/__fixtures__";

describe("Component", () => {
  beforeEach(() => {
    loadFixtures("index.html");
  });

  describe("setupDefaults()", () => {
    let foo: typeof Component | null = null;

    beforeEach(() => {
      class Foo extends Component {
        constructor(el: HTMLElement) {
          super(el);
        }

        setupDefaults() {}

        addListeners() {}
      }

      spyOn<Foo, any>(Foo.prototype, "setupDefaults");

      new Foo(document.querySelector(".bar") as HTMLElement);

      foo = Foo;
    });

    afterEach(() => {
      foo = null;
    });

    it("should call setupDefaults when instantiating a component", () => {
      expect(foo?.prototype.setupDefaults).toHaveBeenCalled();
    });

    it("should call setupDefaults once", () => {
      expect(
        (foo?.prototype.setupDefaults as jasmine.Spy).calls.count()
      ).toEqual(1);
    });
  });

  describe("addListeners()", () => {
    let foo: typeof Component | null = null;

    beforeEach(() => {
      class Foo extends Component {
        constructor(el: HTMLElement) {
          super(el);
        }

        setupDefaults() {}

        addListeners() {}
      }

      spyOn<Foo, any>(Foo.prototype, "addListeners");

      new Foo(document.querySelector(".bar") as HTMLElement);

      foo = Foo;
    });

    afterEach(() => {
      foo = null;
    });

    it("should call addListeners when instantiating a component", () => {
      expect(foo?.prototype.addListeners).toHaveBeenCalled();
    });

    it("should call addListeners once", () => {
      expect((foo?.prototype.addListeners as jasmine.Spy).calls.count()).toBe(
        1
      );
    });
  });

  describe("abstract method order", () => {
    it("should call addListeners after setupDefaults", () => {
      let count = 0;

      class Foo extends Component {
        constructor(el: HTMLElement) {
          super(el);
        }

        setupDefaults() {
          count = 1;
        }

        addListeners() {
          count++;
        }
      }

      const foo = new Foo(document.querySelector(".bar") as HTMLElement);

      expect(count).toBe(2);
    });
  });

  describe("config", () => {
    it("should take a props object and be accessible with this.props", () => {
      class Foo extends Component {
        constructor(el: HTMLElement, props: {}) {
          super(el, props);
        }

        get testConfig() {
          return this.props;
        }
      }

      const foo = new Foo(document.querySelector(".bar") as HTMLElement, {
        name: "Joe",
        age: 34,
      });

      expect(foo.testConfig).toEqual(
        jasmine.objectContaining({
          name: "Joe",
          age: 34,
        })
      );
    });
  });
});
