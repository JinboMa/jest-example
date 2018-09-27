let user = {
  name: '测试用户',
  id: 1
}

describe('测试 user', () => {
  test('user name', () => {
    expect(user.name).toBe('测试用户')
  })

  test('user id', () => {
    expect(user.id).toBe(1)
  })
})

describe('测试 user', () => {
  beforeAll(() => console.log('beforeAll'))
  beforeEach(() => console.log('beforeEach'))
  afterAll(() => console.log('afterAll'))
  afterEach(() => console.log('afterEach'))

  test('user name', () => {
    console.log('test user name')
  })

  test('user id', () => {
    console.log('test user id')
  })
})

describe('测试 expect', () => {
  test('toBe', () => {
    let obj = {
      name: 'pamplemousse',
      ounces: 12
    }
    expect(obj.name).toBe('pamplemousse')
    expect(obj.ounces).toBe(12)
  })

  test('toBeTruthy', () => {
    expect(1).toBeTruthy()
    expect('test').toBeTruthy()
  })

  test('toBeFalsy', () => {
    expect(false).toBeFalsy()
    expect(0).toBeFalsy()
    expect('').toBeFalsy()
    expect(null).toBeFalsy()
    expect(undefined).toBeFalsy()
    expect(NaN).toBeFalsy()
  })

  const user1 = {
    name: 'user',
    id: 1
  }
  const user2 = {
    name: 'user',
    id: 1
  }
  test('toEqual', () => {
    expect(user1).toEqual(user2)
  })

  test('toMatch', () => {
    let str = 'grapefruits'
    expect(str).toMatch(/fruits$/)
    expect(str).toMatch(new RegExp('fruits'))
    expect(str).toMatch('fruits')
  })

  const houseForSale = {
    bath: true,
    bedrooms: 4,
    kitchen: {
      amenities: ['oven', 'stove', 'washer'],
      area: 20,
      wallColor: 'white'
    }
  }
  const desiredHouse = {
    bath: true,
    kitchen: {
      amenities: ['oven', 'stove', 'washer'],
      wallColor: expect.stringMatching(/white|yellow/)
    }
  }
  test('toMatchObject', () => {
    expect(houseForSale).toMatchObject(desiredHouse)
  })

  test('expect.anything()', () => {
    let user1 = expect.anything()
    let user2 = 'user'
    expect(user2).toEqual(user1)
  })

  test('expect.any(constructor)', () => {
    let user1 = expect.any(String)
    let user2 = 'user'
    expect(user2).toEqual(user1)
  })

  test('expect.arrayContaining(array)', () => {
    let testArray = [1, 2, 3]
    expect([1, 2, 3, 4, 5]).toEqual(expect.arrayContaining(testArray))
  })

  test('expect.assertions(number)', () => {
    expect.assertions(2)
    expect(1).toBe(1)
    expect(2).toBe(2)
  })

  test('expect.hasAssertions()', () => {
    expect.hasAssertions();

    (function () {
      expect(1).toBe(1)
    })()
  })

  test('.not', () => {
    expect(1).not.toBe(2)
  })

  test('async success', async () => {
    let res = await Promise.resolve('success')
    expect(res).toBe('success')
  })

  test('async fail', async () => {
    try {
      /* eslint prefer-promise-reject-errors: off */
      await Promise.reject('fail')
    } catch (err) {
      expect(err).toBe('fail')
    }
  })

  test('.resolves .rejects', async () => {
    await expect(Promise.resolve('success')).resolves.toBe('success')
    await expect(Promise.reject('fail')).rejects.toBe('fail')
    await expect(Promise.reject(new Error('fail'))).rejects.toThrow('fail')
  })
})
