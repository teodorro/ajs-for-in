import orderByProps from '../basic';

test('should show args first', () => {
  const obj = {
    name: 'мечник', health: 10, level: 2, attack: 80, defence: 40,
  };
  const firstProps = ['name', 'level'];
  const orderedByProps = orderByProps(obj, firstProps);

  expect(orderedByProps[0].key).toBe('name');
  expect(orderedByProps[1].key).toBe('level');
  expect(orderedByProps[2].key).toBe('health');
  expect(orderedByProps[3].key).toBe('attack');
  expect(orderedByProps[4].key).toBe('defence');
});

test('should throw for null object', () => {
  const firstProps = ['name', 'level'];

  expect(() => orderByProps(null, firstProps)).toThrow('null argument');
});

test('should ignore if null first props', () => {
  const obj = {
    name: 'мечник', health: 10, level: 2, attack: 80, defence: 40,
  };
  const orderedByProps = orderByProps(obj, null);

  expect(orderedByProps[0].key).toBe('name');
  expect(orderedByProps[1].key).toBe('health');
  expect(orderedByProps[2].key).toBe('level');
  expect(orderedByProps[3].key).toBe('attack');
  expect(orderedByProps[4].key).toBe('defence');
});

test('should throw if not existing prop', () => {
  const obj = {
    name: 'мечник', health: 10, level: 2, attack: 80, defence: 40,
  };
  const firstProps = ['SDFGHJKL', 'level'];

  expect(() => orderByProps(obj, firstProps)).toThrow('not existing property');
});
