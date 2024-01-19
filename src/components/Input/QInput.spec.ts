import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import QInput from './QInput'

describe('QInput', () => {
  it('renders default properties', async () => {
    const wrapper = mount(QInput, { props: {} })
    const props = wrapper.props()

    expect(props.type).to.equal('text')
    expect(props.size).to.equal('medium')
    expect(props.name).to.equal('')
    expect(props.title).to.equal('')
    expect(props.filled).to.be.false
    expect(props.pill).to.be.false
    expect(props.placeholder).to.equal('')
    expect(props.disabled).to.be.false
    expect(props.readonly).to.be.false
    expect(props.minlength).to.be.undefined
    expect(props.maxlength).to.be.undefined
    expect(props.min).to.be.undefined
    expect(props.max).to.be.undefined
    expect(props.pattern).to.be.undefined
    expect(props.required).to.be.false
    expect(props.autocapitalize).to.be.undefined
    expect(props.autocorrect).to.be.undefined
    expect(props.autocomplete).to.be.undefined
    expect(props.autofocus).to.be.false
    expect(props.enterkeyhint).to.be.undefined
    expect(props.spellcheck).to.be.true
    expect(props.inputmode).to.be.undefined
  })

  it('should have name if name prop is set', async () => {
    const wrapper = mount(QInput, { props: { name: 'Name' } })
    const input = await wrapper.find('.q-input__control')

    expect(input.attributes('name')).to.equal('Name')
  })

  it('should have title if title attribute is set', async () => {
    const wrapper = mount(QInput, { props: { title: 'Value' } })
    const input = await wrapper.find('.q-input__control')

    expect(input.attributes('title')).to.equal('Value')
  })

  it('should have class "small" if size prop have large', async () => {
    const wrapper = mount(QInput, { props: { size: 'small' } })

    expect(wrapper.classes()).toContain('q-input--small')
  })

  it('should have class "medium" if size prop have large', async () => {
    const wrapper = mount(QInput, { props: { size: 'medium' } })

    expect(wrapper.classes()).toContain('q-input--medium')
  })

  it('should have class "large" if size prop have large', async () => {
    const wrapper = mount(QInput, { props: { size: 'large' } })

    expect(wrapper.classes()).toContain('q-input--large')
  })

  it('should have class "standard" if filled prop not set', async () => {
    const wrapper = mount(QInput, { props: {} })

    expect(wrapper.classes()).toContain('q-input--standard')
  })

  it('should have class "filled" with the filled prop set', async () => {
    const wrapper = mount(QInput, { props: { filled: true } })

    expect(wrapper.classes()).toContain('q-input--filled')
  })

  it('should have class "pill" with the pill prop set', async () => {
    const wrapper = mount(QInput, { props: { pill: true } })

    expect(wrapper.classes()).toContain('q-input--pill')
  })

  it('should be disabled with the disabled attribute', async () => {
    const wrapper = mount(QInput, { props: { disabled: true } })
    const input = await wrapper.find('.q-input__control')

    expect(input.attributes('disabled')).to.equal('')
  })

  it('should be modelValue updated', async () => {
    const wrapper = mount(QInput, {
      props: {
        modelValue: 'initialText',
        'onUpdate:modelValue': (event: Event) => wrapper.setProps({ modelValue: event })
      }
    })

    await wrapper.find('.q-input__control').setValue('test')

    expect(wrapper.props('modelValue')).toBe('test')
  })
})

