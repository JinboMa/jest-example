import { mount } from '@vue/test-utils'
import TestComponent from '../TestComponent'
import flushPromises from 'flush-promises'

describe('测试组件', () => {
  test('isVueInstance', () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('prop: header', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        header: '测试文字'
      }
    })
    const header = wrapper.find('.header')
    expect(header.html()).toContain('测试文字')
  })

  test('prop: footer', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        footer: '测试文字'
      }
    })
    const footer = wrapper.find('.footer')
    expect(footer.html()).toContain('测试文字')
  })

  test('prop: disabled', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        disabled: true
      }
    })
    expect(wrapper.is('.disabled')).toBe(true)
  })

  test('click: header', () => {
    const wrapper = mount(TestComponent)
    const count = wrapper.find('.count')
    wrapper.find('.header').trigger('click')
    expect(wrapper.vm.count).toBe(1)
    expect(count.html()).toContain(1)
  })

  test('click: footer', () => {
    const wrapper = mount(TestComponent)
    const count = wrapper.find('.count')
    wrapper.find('.footer').trigger('click')
    expect(wrapper.vm.count).toBe(-1)
    expect(count.html()).toContain(-1)
  })

  test('event: click', () => {
    const wrapper = mount(TestComponent)
    const emit = wrapper.find('.emit')
    emit.trigger('click')
    expect(wrapper.emitted()['click']).toBeTruthy()
  })

  test('nextTick 方法', (done) => {
    const wrapper = mount(TestComponent)
    const fetch = wrapper.find('.fetch')
    fetch.trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.count).toBe(100)
      done()
    })
  })

  test('flushPromises 方法', async () => {
    const wrapper = mount(TestComponent)
    const fetch = wrapper.find('.fetch')
    fetch.trigger('click')
    await flushPromises()
    console.log(wrapper.vm.count)
    expect(wrapper.vm.count).toBe(100)
  })
})
