import path from 'path'

import getFileByPath from '../../packages/payload/src/uploads/getFileByPath'
import { buildConfigWithDefaults } from '../buildConfigWithDefaults'
import { devUser } from '../credentials'
import removeFiles from '../helpers/removeFiles'
import { Uploads1 } from './collections/Upload1'
import Uploads2 from './collections/Upload2'
import AdminThumbnailCol from './collections/admin-thumbnail'
import {
  audioSlug,
  enlargeSlug,
  mediaSlug,
  reduceSlug,
  relationSlug,
  unstoredMediaSlug,
  versionSlug,
} from './shared'

export default buildConfigWithDefaults({
  serverURL: undefined,
  collections: [
    {
      slug: relationSlug,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'versionedImage',
          type: 'upload',
          relationTo: versionSlug,
        },
      ],
    },
    {
      slug: audioSlug,
      fields: [
        {
          name: 'audio',
          type: 'upload',
          filterOptions: {
            mimeType: {
              in: ['audio/mpeg'],
            },
          },
          relationTo: 'media',
        },
      ],
    },
    {
      slug: 'gif-resize',
      fields: [],
      upload: {
        staticURL: '/media-gif',
        staticDir: path.resolve(process.cwd(), 'test/uploads/media-gif'),
        mimeTypes: ['image/gif'],
        resizeOptions: {
          position: 'center',
          width: 200,
          height: 200,
        },
        formatOptions: {
          format: 'gif',
        },
        imageSizes: [
          {
            name: 'small',
            formatOptions: { format: 'gif', options: { quality: 90 } },
            height: 100,
            width: 100,
          },
          {
            name: 'large',
            formatOptions: { format: 'gif', options: { quality: 90 } },
            height: 1000,
            width: 1000,
          },
        ],
      },
    },
    {
      slug: 'no-image-sizes',
      fields: [],
      upload: {
        staticURL: '/no-image-sizes',
        staticDir: path.resolve(process.cwd(), 'test/uploads/no-image-sizes'),
        mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
        resizeOptions: {
          height: 200,
          position: 'center',
          width: 200,
        },
      },
    },
    {
      slug: 'object-fit',
      fields: [],
      upload: {
        staticURL: '/object-fit',
        staticDir: path.resolve(process.cwd(), 'test/uploads/object-fit'),
        mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
        imageSizes: [
          {
            name: 'fitContain',
            fit: 'contain',
            height: 300,
            width: 400,
          },
          {
            name: 'fitInside',
            fit: 'inside',
            height: 400,
            width: 300,
          },
          {
            name: 'fitCover',
            fit: 'cover',
            height: 300,
            width: 900,
          },
          {
            name: 'fitOutside',
            fit: 'outside',
            height: 200,
            width: 900,
          },
        ],
      },
    },
    {
      slug: 'crop-only',
      fields: [],
      upload: {
        focalPoint: false,
        staticURL: '/crop-only',
        staticDir: path.resolve(process.cwd(), 'test/uploads/crop-only'),
        mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
        imageSizes: [
          {
            name: 'focalTest',
            height: 300,
            width: 400,
          },
          {
            name: 'focalTest2',
            height: 300,
            width: 600,
          },
          {
            name: 'focalTest3',
            height: 300,
            width: 900,
          },
        ],
      },
    },
    {
      slug: 'focal-only',
      fields: [],
      upload: {
        crop: false,
        staticURL: '/focal-only',
        staticDir: path.resolve(process.cwd(), 'test/uploads/focal-only'),
        mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
        imageSizes: [
          {
            name: 'focalTest',
            height: 300,
            width: 400,
          },
          {
            name: 'focalTest2',
            height: 300,
            width: 600,
          },
          {
            name: 'focalTest3',
            height: 300,
            width: 900,
          },
        ],
      },
    },
    {
      slug: mediaSlug,
      fields: [],
      upload: {
        staticDir: path.resolve(process.cwd(), 'test/uploads/media'),
        staticURL: '/test/uploads/media',
        // crop: false,
        // focalPoint: false,
        formatOptions: {
          format: 'png',
          options: { quality: 90 },
        },
        imageSizes: [
          {
            name: 'maintainedAspectRatio',
            crop: 'center',
            formatOptions: { format: 'png', options: { quality: 90 } },
            height: undefined,
            position: 'center',
            width: 1024,
          },
          {
            name: 'differentFormatFromMainImage',
            formatOptions: { format: 'jpg', options: { quality: 90 } },
            height: undefined,
            width: 200,
          },
          {
            name: 'maintainedImageSize',
            height: undefined,
            width: undefined,
          },
          {
            name: 'maintainedImageSizeWithNewFormat',
            formatOptions: { format: 'jpg', options: { quality: 90 } },
            height: undefined,
            width: undefined,
          },
          {
            name: 'accidentalSameSize',
            height: 80,
            position: 'top',
            width: 320,
          },
          {
            name: 'tablet',
            height: 480,
            width: 640,
          },
          {
            name: 'mobile',
            crop: 'left top',
            height: 240,
            width: 320,
          },
          {
            name: 'icon',
            height: 16,
            width: 16,
          },
          {
            name: 'focalTest',
            height: 300,
            width: 400,
          },
          {
            name: 'focalTest2',
            height: 300,
            width: 600,
          },
          {
            name: 'focalTest3',
            height: 300,
            width: 900,
          },
          {
            name: 'focalTest4',
            height: 400,
            width: 300,
          },
          {
            name: 'focalTest5',
            height: 600,
            width: 300,
          },
          {
            name: 'focalTest6',
            height: 800,
            width: 300,
          },
          {
            name: 'focalTest7',
            height: 300,
            width: 300,
          },
        ],
      },
    },
    {
      slug: enlargeSlug,
      fields: [],
      upload: {
        staticURL: '/enlarge',
        staticDir: path.resolve(process.cwd(), 'test/uploads/media/enlarge'),
        mimeTypes: [
          'image/png',
          'image/jpg',
          'image/jpeg',
          'image/gif',
          'image/svg+xml',
          'audio/mpeg',
        ],
        imageSizes: [
          {
            name: 'accidentalSameSize',
            height: 80,
            width: 320,
            withoutEnlargement: false,
          },
          {
            name: 'sameSizeWithNewFormat',
            formatOptions: { format: 'jpg', options: { quality: 90 } },
            height: 80,
            width: 320,
            withoutEnlargement: false,
          },
          {
            name: 'resizedLarger',
            height: 480,
            width: 640,
            withoutEnlargement: false,
          },
          {
            name: 'resizedSmaller',
            height: 50,
            width: 180,
          },
          {
            name: 'widthLowerHeightLarger',
            fit: 'contain',
            height: 300,
            width: 300,
          },
        ],
      },
    },
    {
      slug: reduceSlug,
      fields: [],
      upload: {
        staticURL: '/reduce',
        staticDir: path.resolve(process.cwd(), 'test/uploads/media/reduce'),
        imageSizes: [
          {
            name: 'accidentalSameSize',
            height: 80,
            width: 320,
            withoutEnlargement: false,
          },
          {
            name: 'sameSizeWithNewFormat',
            formatOptions: { format: 'jpg', options: { quality: 90 } },
            height: 80,
            width: 320,
            withoutReduction: true,
          },
          {
            name: 'resizedLarger',
            height: 480,
            width: 640,
          },
          {
            name: 'resizedSmaller',
            height: 50,
            width: 180,
            withoutReduction: true,
          },
        ],
        mimeTypes: [
          'image/png',
          'image/jpg',
          'image/jpeg',
          'image/gif',
          'image/svg+xml',
          'audio/mpeg',
        ],
      },
    },
    {
      slug: 'media-trim',
      fields: [],
      upload: {
        staticURL: '/media-trim',
        staticDir: path.resolve(process.cwd(), 'test/uploads/media-trim'),
        mimeTypes: ['image/png', 'image/jpg', 'image/jpeg'],
        trimOptions: {
          threshold: 0,
        },
        imageSizes: [
          {
            name: 'trimNumber',
            height: undefined,
            trimOptions: {
              threshold: 0,
            },
            width: 1024,
          },
          {
            name: 'trimString',
            height: undefined,
            trimOptions: {
              threshold: 0,
            },
            width: 1024,
          },
          {
            name: 'trimOptions',
            height: undefined,
            trimOptions: {
              background: '#000000',
              threshold: 50,
            },
            width: 1024,
          },
        ],
      },
    },
    {
      slug: unstoredMediaSlug,
      fields: [],
      upload: {
        disableLocalStorage: true,
        staticURL: '/media',
      },
    },
    {
      slug: 'externally-served-media',
      fields: [],
      upload: {
        // Either use another web server like `npx serve -l 4000` (http://localhost:4000) or use the static server from the previous collection to serve the media folder (http://localhost:3000/media)
        staticURL: 'http://localhost:3000/media',
        staticDir: path.resolve(process.cwd(), 'test/uploads/media'),
      },
    },
    Uploads1,
    Uploads2,
    AdminThumbnailCol,
    {
      slug: 'optional-file',
      fields: [],
      upload: {
        filesRequiredOnCreate: false,
        staticDir: path.resolve(process.cwd(), 'test/uploads/optional'),
        staticURL: '/optional',
      },
    },
    {
      slug: 'required-file',
      fields: [],
      upload: {
        staticURL: '/required',
        staticDir: path.resolve(process.cwd(), 'test/uploads/required'),
        filesRequiredOnCreate: true,
      },
    },
    {
      slug: versionSlug,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
      ],
      upload: true,
      versions: {
        drafts: true,
      },
    },
  ],
  onInit: async (payload) => {
    const uploadsDir = path.resolve(process.cwd(), 'test/uploads/media')
    removeFiles(path.normalize(uploadsDir))

    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    // Create image
    const imageFilePath = path.resolve(process.cwd(), 'test/uploads/image.png')
    const imageFile = await getFileByPath(imageFilePath)

    const { id: uploadedImage } = await payload.create({
      collection: mediaSlug,
      data: {},
      file: imageFile,
    })

    const { id: versionedImage } = await payload.create({
      collection: versionSlug,
      data: {
        _status: 'published',
        title: 'upload',
      },
      file: imageFile,
    })

    await payload.create({
      collection: relationSlug,
      data: {
        image: uploadedImage,
        versionedImage,
      },
    })

    // Create audio
    const audioFilePath = path.resolve(process.cwd(), 'test/uploads/audio.mp3')
    const audioFile = await getFileByPath(audioFilePath)

    const file = await payload.create({
      collection: mediaSlug,
      data: {},
      file: audioFile,
    })

    await payload.create({
      collection: audioSlug,
      data: {
        audio: file.id,
      },
    })

    // Create admin thumbnail media
    await payload.create({
      collection: AdminThumbnailCol.slug,
      data: {},
      file: {
        ...audioFile,
        name: 'audio-thumbnail.mp3', // Override to avoid conflicts
      },
    })

    await payload.create({
      collection: AdminThumbnailCol.slug,
      data: {},
      file: {
        ...imageFile,
        name: `thumb-${imageFile.name}`,
      },
    })
  },
})
