import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import QButton from './QButton'

describe('QButton', () => {
  it('renders default properties', async () => {
    const wrapper = mount(QButton, { props: {} })
    const props = wrapper.props()

    expect(props.outline).to.be.false
    expect(props.variant).to.equal('default')
  })

  it('should have class "default", if prop variant not set', async () => {
    const wrapper = mount(QButton, { props: {} })

    expect(wrapper.classes()).toContain('q-button--default')
  })

  it('should have class "primary", if prop variant set "primary"', async () => {
    const wrapper = mount(QButton, { props: { variant: 'primary' } })

    expect(wrapper.classes()).toContain('q-button--primary')
  })

  it('should have class "success", if prop variant set "success"', async () => {
    const wrapper = mount(QButton, { props: { variant: 'success' } })

    expect(wrapper.classes()).toContain('q-button--success')
  })

  it('should have class "neutral", if prop variant set "neutral"', async () => {
    const wrapper = mount(QButton, { props: { variant: 'neutral' } })

    expect(wrapper.classes()).toContain('q-button--neutral')
  })

  it('should have class "warning", if prop variant set "warning"', async () => {
    const wrapper = mount(QButton, { props: { variant: 'warning' } })

    expect(wrapper.classes()).toContain('q-button--warning')
  })

  it('should have class "danger", if prop variant set "danger"', async () => {
    const wrapper = mount(QButton, { props: { variant: 'danger' } })

    expect(wrapper.classes()).toContain('q-button--danger')
  })

  it('should have class "standard" if prop outline not set', async () => {
    const wrapper = mount(QButton, { props: {} })

    expect(wrapper.classes()).toContain('q-button--standard')
  })

  it('should have class "outline" if prop outline set', async () => {
    const wrapper = mount(QButton, { props: { outline: true } })

    expect(wrapper.classes()).toContain('q-button--outline')
  })

  it('should have class "small" if prop size=small set', async () => {
    const wrapper = mount(QButton, { props: { size: 'small' } })

    expect(wrapper.classes()).toContain('q-button--small')
  })

  it('should have class "medium" if prop size=medium set', async () => {
    const wrapper = mount(QButton, { props: { size: 'medium' } })

    expect(wrapper.classes()).toContain('q-button--medium')
  })

  it('should have class "large" if prop size=large set', async () => {
    const wrapper = mount(QButton, { props: { size: 'large' } })

    expect(wrapper.classes()).toContain('q-button--large')
  })

  it('should have class "pill" if prop pill set', async () => {
    const wrapper = mount(QButton, { props: { pill: true } })

    expect(wrapper.classes()).toContain('q-button--pill')
  })

  it('should have class "circle" if prop circle set', async () => {
    const wrapper = mount(QButton, { props: { circle: true } })

    expect(wrapper.classes()).toContain('q-button--circle')
  })

  it('should have class "disabled" if prop disabled set', async () => {
    const wrapper = mount(QButton, { props: { disabled: true } })

    expect(wrapper.classes()).toContain('q-button--disabled')
  })
})
