'use strict'
import { authReducer, configureReducer, bookmarkReducer } from '@twreporter/registration'
import { searchedAuthorsList, authorsList } from './authors'
import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import header from './header'
import merge from 'lodash/merge'
import reduxStatePropKey from '../constants/redux-state-prop-key'
import twreporterRedux from '@twreporter/redux'

const { reducers } = twreporterRedux

const registrationInitialState = {
  apiUrl: 'https://go-api.twreporter.org',
  signIn: '/v1/signin',
  activate: '/v1/activate',
  renew: '/v1/token',
  bookmark: '/bookmarks',
  user: '/v1/users',
  oAuthProviders: {
    google: '/v1/auth/google',
    facebook: '/v1/auth/facebook'
  },
  host: 'https://www.twreporter.org'
}

const ConfigureReducer = configureReducer(registrationInitialState)

const rootReducer = combineReducers({
  [reduxStatePropKey.entities]: reducers.entities,
  [reduxStatePropKey.indexPage]: reducers.indexPage,
  [reduxStatePropKey.lists]: reducers.posts,
  [reduxStatePropKey.topicList]: reducers.topics,
  [reduxStatePropKey.selectedPost]: reducers.post,
  [reduxStatePropKey.selectedTopic]: reducers.topic,
  [reduxStatePropKey.bookmarks]: bookmarkReducer,
  [reduxStatePropKey.routing]: routerReducer,
  [reduxStatePropKey.header]: header,
  [reduxStatePropKey.searchedAuthorsList]: searchedAuthorsList,
  [reduxStatePropKey.authorsList]: authorsList,
  [reduxStatePropKey.articlesByAuthor]: articlesByAuthor,
  [reduxStatePropKey.authConfigure]: ConfigureReducer,
  [reduxStatePropKey.auth]: authReducer,
  [reduxStatePropKey.entitiesForAuthors]: (state = {}, action) => {
    if (action.response && action.response.entities) {
      return merge({}, state, action.response.entities)
    }
    return state
  }
})

export default rootReducer
