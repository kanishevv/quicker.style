import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { QGrid } from './QGrid'

describe('QGrid', () => {
  it('renders default properties', async () => {
    const wrapper = mount(QGrid, { props: {} })
    const props = wrapper.props()

    expect(props.cols).to.equal(24)
    expect(props.xGap).to.equal(0)
    expect(props.yGap).to.equal(0)
  })

  it('should be grid column style is set', async () => {
    const wrapper = mount(QGrid, { props: { cols: 12 } })

    expect(wrapper.attributes('style')).toContain(
      'grid-template-columns: repeat(12, minmax(0px, 1fr));'
    )
  })

  it('should be row gap style is set', async () => {
    const wrapper = mount(QGrid, { props: { xGap: 15 } })

    expect(wrapper.attributes('style')).toContain('row-gap: 15px;')
  })

  it('should be column gap style is set', async () => {
    const wrapper = mount(QGrid, { props: { yGap: 15 } })

    expect(wrapper.attributes('style')).toContain('column-gap: 15px;')
  })
})
