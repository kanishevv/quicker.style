import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import QIcon from './QIcon'

describe('QIcon', () => {
  it('renders default properties', async () => {
    const wrapper = mount(QIcon, { props: {} })
    const props = wrapper.props()

    expect(props.size).to.be.undefined
    expect(props.color).to.be.undefined
  })

  it('should be set --font-size to 8rem, with props "8rem" (String) set', async () => {
    const wrapper = mount(QIcon, { props: { size: '8rem' } })

    expect(wrapper.attributes('style')).toContain('--font-size: 8rem;')
  })

  it('should be set --font-size to 8rem, with props "8" (Number) set', async () => {
    const wrapper = mount(QIcon, { props: { size: 8 } })

    expect(wrapper.attributes('style')).toContain('--font-size: 8px;')
  })

  it('should be set --color to #ccc, with props "#ccc" set', async () => {
    const wrapper = mount(QIcon, { props: { color: '#ccc' } })

    expect(wrapper.attributes('style')).toContain('--color: #ccc;')
  })
})
