import replaceParams from '../replaceParams'

describe('@/utils/replaceParams', () => {
  test('替换一个变量一次', () => {
    let result = replaceParams({ id: 123 }, '/api/{id}/test')
    expect(result).toBe('/api/123/test')
  })

  test('替换一个变量多次', () => {
    let result = replaceParams({ id: 123 }, '/api/{id}/test/{id}')
    expect(result).toBe('/api/123/test/123')
  })

  test('替换多个变量一次', () => {
    let result = replaceParams({ id: 123, name: 'name' }, '/api/{id}/test/{name}')
    expect(result).toBe('/api/123/test/name')
  })

  test('替换多个变量多次', () => {
    let result = replaceParams({ id: 123, name: 'name' }, '/api/{id}{name}/test/{id}/{name}')
    expect(result).toBe('/api/123name/test/123/name')
  })

  test('不替换变量', () => {
    let result = replaceParams({}, '/api/test')
    expect(result).toBe('/api/test')
  })
})
