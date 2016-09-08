/* @flow */
import R from 'ramda'
import { expect } from 'chai'
import { createMockStore } from '../_store.spec.js'

import at from '../action-types'
import { saveStory, setStory, createStory, dropAnswer} from './'
import reducer from '../reducers'
import { Story } from '../resources'
import { createToast, CREATE_TOAST } from '../lib/wisp'

const fakeResource = { uid: 'myuid', value: 42 }
const initStore = createMockStore({ PUT: () => Promise.resolve(fakeResource)})
const getDefaultState = () => reducer(undefined, {type: 'INIT'})

describe('Actions', function() {

  describe('saveResource', function() {
    it('should set resource and trigger success notification', function(done) {
      const store = initStore({ stories: {[fakeResource.uid]: fakeResource }})
      store.dispatch(saveStory(fakeResource.uid)).then(() => {
        const actions = store.getActions()
        const actionTypes = R.pluck('type', actions)
        const [setAction, toastAction] = actions
        const actualToast = R.dissoc('id', toastAction.payload)
        const expectedToast = R.dissoc('id', createToast({ id: 'whatever', title: 'Saved', type: "success", message: undefined }).payload)

        expect(actionTypes).to.eql([at.set(Story.type), CREATE_TOAST])
        expect(setAction).to.eql(setStory(fakeResource))
        expect(actualToast).to.eql(expectedToast)
      }).then(done).catch(done)
    })
  });

  describe('createResource', function() {
    it('should put resource then set it, redirect, and show notification', function(done) {
      const store = initStore(getDefaultState())
      store.dispatch(createStory(fakeResource)).then(() => {
        const actions = store.getActions()
        const actionTypes = R.pluck('type', actions)

        const [setAction, _, toastAction] = actions
        const actualToast = R.dissoc('id', toastAction.payload)
        const expectedToast = R.dissoc('id', createToast({ id: 'whatever', title: 'Created', type: "success", message: undefined }).payload)

        expect(actionTypes).to.eql([at.set(Story.type), '@@router/CALL_HISTORY_METHOD', CREATE_TOAST])
        expect(setAction).to.eql(setStory(fakeResource))
        expect(actualToast).to.eql(expectedToast)
      }).then(done).catch(done)
    })
  });

  describe('dropAnswer', function() {
    it('should dispatch DROP_ANSWER with uid from dropData', function() {
      const store = initStore({ui: {dragData: 42}})
      store.dispatch(dropAnswer(1))
      const actions = store.getActions()
      expect(actions).to.eql([{ type: at.DROP_ANSWER, payload: {uid: 42, index: 1} }])
    })
  });

})