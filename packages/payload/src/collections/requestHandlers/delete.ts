import type { NextFunction, Response } from 'express'

import httpStatus from 'http-status'
import { URL } from 'url'

import type { PayloadRequest } from '../../types'
import type { Document, Where } from '../../types'

import formatSuccessResponse from '../../express/responses/formatSuccess'
import { getTranslation } from '../../utilities/getTranslation'
import { isNumber } from '../../utilities/isNumber'
import deleteOperation from '../operations/delete'

export type DeleteResult = {
  doc: Document
  message: string
}

export default async function deleteHandler(
  req: PayloadRequest,
  res: Response,
  next: NextFunction,
): Promise<Response<DeleteResult> | void> {
  try {
    const { searchParams } = new URL(req.url)
    const depth = searchParams.get('depth')
    const where = searchParams.get('where')

    const result = await deleteOperation({
      collection: req.collection,
      depth: isNumber(depth) ? depth : undefined,
      req,
      where: where ? (JSON.parse(where) as Where) : {},
    })

    if (result.errors.length === 0) {
      const message = req.t('general:deletedCountSuccessfully', {
        count: result.docs.length,
        label: getTranslation(
          req.collection.config.labels[result.docs.length > 1 ? 'plural' : 'singular'],
          req.i18n,
        ),
      })

      res.status(httpStatus.OK).json({
        ...formatSuccessResponse(message, 'message'),
        ...result,
      })
      return
    }

    const total = result.docs.length + result.errors.length
    const message = req.t('error:unableToDeleteCount', {
      count: result.errors.length,
      label: getTranslation(
        req.collection.config.labels[total > 1 ? 'plural' : 'singular'],
        req.i18n,
      ),
      total,
    })

    res.status(httpStatus.BAD_REQUEST).json({
      message,
      ...result,
    })
  } catch (error) {
    next(error)
  }
}
