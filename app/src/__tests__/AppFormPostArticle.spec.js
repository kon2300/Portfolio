/**
 * @jest-environment jsdom
 */

import AppFormPostArticle from '@/components/AppFormPostArticle.vue'
import { mount } from '@vue/test-utils'
import { useRoute } from 'vue-router'
import { createStore } from 'vuex'

jest.mock('vue-router', () => ({
  __esModule: true,
  useRoute: jest.fn(),
  useRouter: () => ({
    query: {},
    pathname: '/',
    asPath: '/',
    events: {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    },
    push: jest.fn(() => Promise.resolve(true)),
    prefetch: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
  }),
}))

const store = createStore({
  state: {
    auth: '',
    profile: '',
  },
  actions: {
    showProfile: jest.fn(),
  },
})

describe('app form post article test', () => {
  useRoute.mockImplementationOnce(() => ({
    params: {
      id: 1,
    },
  }))

  const wrapper = mount(AppFormPostArticle, {
    global: {
      provide: {
        store: store,
      },
    },
  })

  test('time input form check', async () => {
    await wrapper.find('select[name="time"]').setValue('year: 2022, month: 1')

    expect(wrapper.find('select[name="time"]').element).toBe(
      'year: 2022, month: 1'
    )
  })
})
