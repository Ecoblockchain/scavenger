/* @flow */
import React from 'react'
import { connect } from 'react-redux'

import { uidsFromParams } from '../utils'
import { getStory } from '../reducers'
import { changeStory, saveStory } from '../actions'
import { Clues } from '../clue'

const stateToProps = (state, {params}) => {
  const {storyUid} = uidsFromParams(params)
  return {
    story: getStory(state, storyUid),
  }
}
const Story = ({story, changeStory, saveStory}) => {
  return (
    <div className="message is-primary">
      <div className="message-header is-marginless level is-mobile">
        <span className="level-item">
          {story.uid}
        </span>
        <button
          className="button is-success is-narrow level-item"
          onClick={() => saveStory(story.uid)}>
          Save
        </button>
      </div>
      <div className="message-body">
        <label className="label">
          Default Hint
        </label>
        <div className="control">
          <input
            id="default-hint"
            className="input"
            value={story.defaultHint || ''}
            onChange={(e) => changeStory([story.uid, 'defaultHint'], e.target.value)} />
        </div>
        <label className="label">
          Clues
        </label>
        <Clues storyUid={story.uid} />
      </div>
    </div>
  )
}

Story.propTypes = {
  story: React.PropTypes.object.isRequired,
  changeStory: React.PropTypes.func.isRequired,
  saveStory: React.PropTypes.func.isRequired,
}
export default connect(stateToProps, {
  changeStory,
  saveStory
})(Story)