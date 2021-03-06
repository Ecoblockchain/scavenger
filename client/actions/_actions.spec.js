/* @flow */
import R from 'ramda'
import { expect } from 'chai'
import { createMockStore } from '../store/_store.spec'
import { CALL_HISTORY_METHOD } from 'react-router-redux'

import at from '../actions/types'
import { saveStory, createStory, dropAnswer, dropClue} from './'
import { Story } from '../resources'
import {  CREATE_WISP } from 'wisp-react-redux'

describe('Actions', function() {
  const initialState = {}
  const store = createMockStore(initialState)
  beforeEach(() => store.clearActions())

  describe('saveResource', function() {
    it('should send save action and trigger success notification', function(done) {
      store.dispatch(saveStory('my-uid')).then(() => {
        const actions = store.getActions()
        const types = R.map(R.prop('type'), actions)
        expect(types).to.eql([Story.types.save, CREATE_WISP])
      }).then(done).catch(done)
    })
  })

  describe('createResource', function() {
    it('should send create action and trigger success notification', function(done) {
      store.dispatch(createStory('my-uid')).then(() => {
        const actions = store.getActions()
        const types = R.map(R.prop('type'), actions)
        expect(types).to.eql([Story.types.create, CALL_HISTORY_METHOD, CREATE_WISP])
      }).then(done).catch(done)
    })
  })

  describe('dropAnswer', function() {
    it('should dispatch DROP_ANSWER with uid from dropData', function() {
      const store = createMockStore({ui: {dragData: 42}})
      store.dispatch(dropAnswer(1))
      const actions = store.getActions()
      expect(actions).to.eql([{ type: at.DROP_ANSWER, payload: {uid: 42, index: 1} }])
    })
  })

  describe('dropClue', function() {
    it('should dispatch DROP_CLUE with uid from dropData', function() {
      const store = createMockStore({ui: {dragData: 42}})
      store.dispatch(dropClue(1))
      const actions = store.getActions()
      expect(actions).to.eql([{ type: at.DROP_CLUE, payload: {uid: 42, index: 1} }])
    })
  })

})
