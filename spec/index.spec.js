/* istanbul ignore file */
const chai = require('chai');
const _ = require('lodash');

const chaiIncludeObjects = require('../');

chai.use(chaiIncludeObjects);
const expect = chai.expect;

describe('chai-objects', () => {
  it('should be a chai plugin that adds the "objects" assertion', () => {
    expect(chaiIncludeObjects).to.be.a('function');
    expect(expect([]).to.have.objects).to.be.a('function');
  });

  it('should compare complex objects', () => {
    expect(() => {

      const objects = [
        { foo: 'bar' },
        { bar: { baz: 'qux' } }
      ];

      expect(objects).to.have.objects(_.cloneDeep(objects));
    }).not.to.throw();
  });

  it('should list missing objects', () => {
    expect(() => {

      const objects = [
        { foo: 'bar' },
        { bar: { baz: 'qux' } },
        { corge: 'grault' }
      ];

      expect(_.cloneDeep(objects.slice(0, 1))).to.have.objects(_.cloneDeep(objects));
    }).to.throw('expected to find the following missing objects:\n- {"bar":{"baz":"qux"}}\n- {"corge":"grault"}');
  });

  it('should list extra objects', () => {
    expect(() => {

      const objects = [
        { foo: 'bar' },
        { bar: { baz: 'qux' } },
        { corge: 'grault' }
      ];

      expect(_.cloneDeep(objects)).to.have.objects(_.cloneDeep(objects.slice(0, 1)));
    }).to.throw('expected to find the following missing objects:\n- none\n\nThe following extra objects were found:\n- {"bar":{"baz":"qux"}}\n- {"corge":"grault"}');
  });

  it('should list both missing and extra objects', () => {
    expect(() => {

      const objects = [
        { foo: 'bar' },
        { bar: { baz: 'qux' } },
        { corge: 'grault' },
        { qux: 'warply' }
      ];

      expect(_.cloneDeep(objects.slice(2))).to.have.objects(_.cloneDeep(objects.slice(0, 3)));
    }).to.throw('expected to find the following missing objects:\n- {"foo":"bar"}\n- {"bar":{"baz":"qux"}}\n\nThe following extra objects were found:\n- {"qux":"warply"}');
  });
});
