import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import QFlex from './QFlex'

describe('QFlex', () => {
  it('renders default properties', async () => {
    const wrapper = mount(QFlex, { props: {} })
    const props = wrapper.props()

    expect(props.wrap).to.be.true
    expect(props.justify).to.equal('start')
  })

  it('should have class "wrap" with the wrap prop set', async () => {
    const wrapper = mount(QFlex, { props: { wrap: true } })

    expect(wrapper.classes()).toContain('q-flex--wrap')
  })

  it('should have class "vertical" with the vertical prop set', async () => {
    const wrapper = mount(QFlex, { props: { vertical: true } })

    expect(wrapper.classes()).toContain('q-flex--vertical')
  })

  it('should have class "justify" with the justify prop set', async () => {
    const wrapper = mount(QFlex, { props: { justify: 'space-between' } })

    expect(wrapper.classes()).toContain('q-flex--justify-space-between')
  })

  it('should have class "align" with the align prop set', async () => {
    const wrapper = mount(QFlex, { props: { align: 'flex-start' } })

    expect(wrapper.classes()).toContain('q-flex--align-flex-start')
  })
})
