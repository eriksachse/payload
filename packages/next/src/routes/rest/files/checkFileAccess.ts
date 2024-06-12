import type { Collection, PayloadRequestWithData, TypeWithID, Where } from 'payload/bundle'

import { Forbidden } from 'payload/errors'
import { executeAccess } from 'payload/server'

import { endpointsAreDisabled } from '../checkEndpoints.js'

export async function checkFileAccess({
  collection,
  filename,
  req,
}: {
  collection: Collection
  filename: string
  req: PayloadRequestWithData
}): Promise<Response | TypeWithID> {
  const { config } = collection
  const disableEndpoints = endpointsAreDisabled({ endpoints: config.endpoints, request: req })
  if (disableEndpoints) return disableEndpoints

  const accessResult = await executeAccess({ isReadingStaticFile: true, req }, config.access.read)

  if (typeof accessResult === 'object') {
    const queryToBuild: Where = {
      and: [
        {
          or: [
            {
              filename: {
                equals: filename,
              },
            },
          ],
        },
        accessResult,
      ],
    }

    if (config.upload.imageSizes) {
      config.upload.imageSizes.forEach(({ name }) => {
        queryToBuild.and[0].or.push({
          [`sizes.${name}.filename`]: {
            equals: filename,
          },
        })
      })
    }

    const doc = await req.payload.db.findOne({
      collection: config.slug,
      req,
      where: queryToBuild,
    })

    if (!doc) {
      throw new Forbidden(req.t)
    }

    return doc
  }
}
