const _ = require('lodash');

module.exports = function(chai, utils) {
  chai.Assertion.addMethod('objects', function(expectedObjects) {

    const obj = utils.flag(this, 'object');
    new chai.Assertion(obj).to.be.an('array');

    const missingObjects = [];
    const remainingObjects = obj.slice();

    _.each(expectedObjects, function(expectedObject) {
      const object = _.find(remainingObjects, object => _.isEqual(object, expectedObject));
      if (object) {
        remainingObjects.splice(remainingObjects.indexOf(object), 1);
      } else {
        missingObjects.push(expectedObject);
      }
    });

    this.assert(_.isEmpty(missingObjects) && _.isEmpty(remainingObjects),
      buildObjectsAssertionMessage(true, missingObjects, remainingObjects),
      buildObjectsAssertionMessage(false, expectedObjects));
  });
};

function buildObjectsAssertionMessage(positive, missingObjects, extraObjects) {

  let message = 'expected ' + (positive ? '' : 'not ') + 'to find the following missing objects:';

  if (!missingObjects.length) {
    message = message + '\n- none';
  }

  _.each(missingObjects, function(object) {
    message = message + '\n- ' + JSON.stringify(object);
  });

  if (extraObjects && extraObjects.length) {
    message = message + '\n\nThe following extra objects were found:';
    _.each(extraObjects, function(object) {
      message += '\n- ' + JSON.stringify(object);
    });
  }

  return message;
}
