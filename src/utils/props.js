import {mapValues, isFunction, tail} from 'lodash';

function getter(fn) {
  return {
    get: fn,
    enumerable: true
  };
}

function val(v) {
  return {
    value: v,
    enumerable: true
  };
}

function define(obj, definitions) {
  Object.defineProperties(obj, mapValues(definitions, (getterOrVal) => {
    if (isFunction(getterOrVal)) {
      return getter(getterOrVal);
    }
    return val(getterOrVal);
  }));
  return obj;
}

function copy(dest/*, source-1, source-n...*/) {
  const sources = tail(arguments);
  sources.forEach((source) => {
    let key, propertyDescriptor;

    for (key in source) {
      if (!source.hasOwnProperty(key)) {
        continue;
      }

      propertyDescriptor = Object.getOwnPropertyDescriptor(source, key);

      if (propertyDescriptor && propertyDescriptor.get) {
        Object.defineProperty(dest, key, {
          get: propertyDescriptor.get,
          set: propertyDescriptor.set,
          enumerable: true,
          configurable: true
        });
      } else {
        dest[key] = source[key];
      }
    }
  });
}

module.exports = {
  getter,
  val,
  define,
  copy
};
