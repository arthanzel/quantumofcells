export default function propertyMerge(...objects) {
  let target = {};

  for (let object of objects) {
      let props = Object.getOwnPropertyNames(object);
      for (let prop of props) {
          target[prop] = object[prop];
      }
  }

  return target;
};