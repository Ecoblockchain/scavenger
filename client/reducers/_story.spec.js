import { expect } from 'chai'
import * as at from 'action-types'
import reducer from './story'
import { changeStory, setStory } from 'actions'
import { Story } from 'resources'

describe('Story Reducer', function() {
  const startStory = Story.new({
    uid: 'STORY',
    defaultHint: 'my hint',
    clues: ['STORY:CLUE'],
  })
  const startStories = {
    [startStory.uid]: startStory,
  }

  const newStory = Story.new({
    uid: 'NEWSTORY',
    defaultHint: 'my new hint',
    clues: ['NEWSTORY:NEWCLUE'],
  })

  describe(at.LOAD_STORIES, function() {
    it('should overwrite stories', function() {
      const payload = {
        [newStory.uid]: newStory,
      }
      const action = {
        type: at.LOAD_STORIES,
        payload
      }
      const newState = reducer(startStories, action)
      expect(newState).to.eql(payload)
    });
  });

  describe(at.CHANGE_STORY, function() {
    it('should change fields on story', function() {
      const action = changeStory([startStory.uid, 'defaultHint'], '42')
      const newState = reducer(startStories, action)
      expect(newState).to.eql({
        [startStory.uid]: {
          ...startStory,
          defaultHint: '42',
        }
      })
      expect(newState[startStory.uid]).not.to.equal(startStory)
    });
  });

  describe(at.SET_STORY, function() {
    it('should overwrite the story', function() {
      const newStory = R.assoc('defaultHint', 'new-hint', startStory)
      const action = setStory(newStory)
      const newState = reducer(startStories, action)
      expect(newState[startStory.uid]).to.eql(newStory)
    });
  });
});