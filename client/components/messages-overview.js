/* @flow */
import { connect } from 'react-redux'
import { Link } from 'react-router'
import R from 'ramda'
import loadingGuard from '../lib/loaded'
import * as Routes from '../routes'
import { getGroupsList } from '../selectors'
import { Group, Story } from '../resources'
import type {GroupType} from '../resources'

const storyMessageStateToProps = state => ({
  storyUids: Story.selectors.getUids(state),
})

type StoryMessageProps = {
  storyUids: Array<string>
}

const StoryMessageOverviewComponent = ({storyUids}: StoryMessageProps) => {
  const storyList = storyUids.map(storyUid => (
    <tr key={storyUid}>
      <td>{storyUid}</td>
      <td>
        <Link
          to={Routes.storyMessages(storyUid)}
          className="button is-primary"> 
          View Transcript
        </Link>
      </td>
    </tr>
  ))
  return (
    <div>
      <h1 className="title"> Stories </h1>
      <table className="table is-bordered is-striped group__table">
        <thead>
          <tr>
            <th>Story Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {storyList}
        </tbody>
      </table>
    </div>
  )
}

const StoryMessageOverview = R.compose(
  loadingGuard([Story.type]),
  connect(storyMessageStateToProps)
)(StoryMessageOverviewComponent)

const groupMessageStateToProps = state => ({
  groupList: getGroupsList(state),
})

type GroupListProps = {
  groupList: Array<GroupType>,
}

const GroupMessageOverviewComponent = ({groupList}: GroupListProps) => {
  const groups = groupList.map(group => {
    return (
      <tr key={group.uid}>
        <td>{group.uid}</td>
        <td>{group.clueUid}</td>
        <td>{group.createdAt}</td>
        <td>{group.completedAt}</td>
        <td>
          <Link
            to={Routes.groupMessages(group.uid)}
            className="button is-primary"> 
            View Transcript
          </Link>
        </td>
      </tr>
    )
  })
  return (
    <div>
      <h1 className="title"> Groups </h1>

      <table className="table is-bordered is-striped group__table">
        <thead>
          <tr>
            <th>Group Code</th>
            <th>Current Clue</th>
            <th>Date Started</th>
            <th>Date Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groups}
        </tbody>
      </table>
    </div>
  )
}

const GroupMessageOverview = R.compose(
  loadingGuard([Group.type]),
  connect(groupMessageStateToProps)
)(GroupMessageOverviewComponent)

const MessageOverview = () => {
  return (
    <section className="section">
      <section className="columns">

        <div className="column">
          <StoryMessageOverview />
        </div>
        <div className="column is-three-quarters">
          <GroupMessageOverview />
        </div>
      </section>
    </section>
  )}

export default MessageOverview
