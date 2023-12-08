import type { Endpoint } from '../config/types'
import type { SanitizedCollectionConfig } from './config/types'

import forgotPasswordHandler from '../auth/handlers/forgotPassword'
import initHandler from '../auth/handlers/init'
import loginHandler from '../auth/handlers/login'
import logoutHandler from '../auth/handlers/logout'
import meHandler from '../auth/handlers/me'
import refreshHandler from '../auth/handlers/refresh'
import registerFirstUserHandler from '../auth/handlers/registerFirstUser'
import resetPassword from '../auth/handlers/resetPassword'
import unlock from '../auth/handlers/unlock'
import verifyEmail from '../auth/handlers/verifyEmail'
import create from './requestHandlers/create'
import deleteHandler from './requestHandlers/delete'
import deleteByID from './requestHandlers/deleteByID'
import docAccessRequestHandler from './requestHandlers/docAccess'
import find from './requestHandlers/find'
import findByID from './requestHandlers/findByID'
import findVersionByID from './requestHandlers/findVersionByID'
import findVersions from './requestHandlers/findVersions'
import restoreVersion from './requestHandlers/restoreVersion'
import update from './requestHandlers/update'
import updateByID, { deprecatedUpdate } from './requestHandlers/updateByID'

const buildEndpoints = (collection: SanitizedCollectionConfig): Endpoint[] => {
  if (!collection.endpoints) return []
  const endpoints = [...collection.endpoints]

  if (collection.auth) {
    if (!collection.auth.disableLocalStrategy) {
      if (collection.auth.verify) {
        endpoints.push({
          handler: verifyEmail,
          method: 'post',
          path: '/verify/:token',
        })
      }

      if (collection.auth.maxLoginAttempts > 0) {
        endpoints.push({
          handler: unlock,
          method: 'post',
          path: '/unlock',
        })
      }

      endpoints.push(
        {
          handler: loginHandler,
          method: 'post',
          path: '/login',
        },
        {
          handler: registerFirstUserHandler,
          method: 'post',
          path: '/first-register',
        },
        {
          handler: forgotPasswordHandler,
          method: 'post',
          path: '/forgot-password',
        },
        {
          handler: resetPassword,
          method: 'post',
          path: '/reset-password',
        },
      )
    }

    endpoints.push(
      {
        handler: initHandler,
        method: 'get',
        path: '/init',
      },
      {
        handler: meHandler,
        method: 'get',
        path: '/me',
      },
      {
        handler: logoutHandler,
        method: 'post',
        path: '/logout',
      },
      {
        handler: refreshHandler,
        method: 'post',
        path: '/refresh-token',
      },
    )
  }

  if (collection.versions) {
    endpoints.push(
      {
        handler: findVersions,
        method: 'get',
        path: '/versions',
      },
      {
        handler: findVersionByID,
        method: 'get',
        path: '/versions/:id',
      },
      {
        handler: restoreVersion,
        method: 'post',
        path: '/versions/:id',
      },
    )
  }

  endpoints.push(
    {
      handler: find,
      method: 'get',
      path: '/',
    },
    {
      handler: create,
      method: 'post',
      path: '/',
    },
    {
      handler: docAccessRequestHandler,
      method: 'get',
      path: '/access/:id',
    },
    {
      handler: docAccessRequestHandler,
      method: 'post',
      path: '/access/:id',
    },
    {
      handler: docAccessRequestHandler,
      method: 'post',
      path: '/access',
    },
    {
      handler: deprecatedUpdate,
      method: 'put',
      path: '/:id',
    },
    {
      handler: update,
      method: 'patch',
      path: '/',
    },
    {
      handler: updateByID,
      method: 'patch',
      path: '/:id',
    },
    {
      handler: findByID,
      method: 'get',
      path: '/:id',
    },
    {
      handler: deleteByID,
      method: 'delete',
      path: '/:id',
    },
    {
      handler: deleteHandler,
      method: 'delete',
      path: '/',
    },
  )

  return endpoints
}

export default buildEndpoints
