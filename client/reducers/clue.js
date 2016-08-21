/* @flow */
import R from 'ramda'
import transform from '../lib/transform'

import * as at from '../action-types'
import { splitUid } from './'
import { Clue, Answer } from '../resources'
import { baseResourceReducer } from './common'
import { phoneNumber } from '../lib/validators'

const validate = R.map(R.evolve({
  sender: phoneNumber
}))

export default transform(
  R.map(R.evolve({
    sender: phoneNumber
  })),
  (clues: Object = {}, action: Object) => {
  const baseResult = baseResourceReducer(Clue.type, clues, action)
  if (baseResult !== undefined){
    return baseResult
  }
  let clueUid, answerUid
  switch (action.type) {
    case at.set(Answer.type):
      clueUid = splitUid(action.payload.uid).clueUid
      return R.evolve({
        [clueUid]: {
          answerUids: R.compose(R.uniq, R.append(action.payload.uid))
        }
      }, clues)
    case at.del(Answer.type):
      clueUid = splitUid(action.payload.uid).clueUid
      return R.evolve({
        [clueUid]: {
          answerUids: R.without(action.payload.uid)
        }
      }, clues)
    case at.REORDER_ANSWER:
      clueUid = splitUid(action.payload.uid).clueUid
      answerUid = action.payload.uid
      const newIndex = action.payload.index
      return R.evolve({
        [clueUid]: {
          answerUids: R.compose(R.insert(newIndex, answerUid), R.without(answerUid))
        }
      }, clues)
    default:
      return clues
  }
})
