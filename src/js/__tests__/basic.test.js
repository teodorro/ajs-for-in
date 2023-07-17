import { orderByProps, destructureSpecial } from '../basic';


// ----- orderByProps ----- //

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


test('should ignore if first props are null', () => {
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


// ----- destructureSpecial ----- //

function getCharacter() {
  return {
    name: 'Лучник',
    type: 'Bowman',
    health: 50,
    level: 3,
    attack: 40,
    defence: 10,
    special: [
      {
        id: 8,
        name: 'Двойной выстрел',
        icon: 'http://...',
        description: 'Двойной выстрел наносит двойной урон',
      },
      {
        id: 9,
        name: 'Нокаутирующий удар',
        icon: 'http://...',
        // <- обратите внимание, описание "засекречено"
      },
    ],
  };
}

test('should destructure', () => {
  const obj = getCharacter();

  const specials = destructureSpecial(obj);

  expect(specials[0].id).toBe(8);
  expect(specials[0].name).toBe('Двойной выстрел');
  expect(specials[0].icon).toBe('http://...');
  expect(specials[0].description).toBe('Двойной выстрел наносит двойной урон');
});

test('should always initialize description', () => {
  const obj = getCharacter();

  const specials = destructureSpecial(obj);

  expect(specials[1].id).toBe(9);
  expect(specials[1].name).toBe('Нокаутирующий удар');
  expect(specials[1].icon).toBe('http://...');
  expect(specials[1].description).toBe('Описание недоступно');
});

test('should throw if null', () => {
  expect(() => destructureSpecial(null)).toThrow('null argument');
});


test('should throw if no "special" prop', () => {
  const obj = getCharacter();
  delete obj.special;

  expect(() => destructureSpecial(obj)).toThrow('no "special" prop');
});
