import { prisma } from "../../lib/prisma.js"
import { UPLOAD_URL_PREFIX, utapi } from "../../lib/uploadthing.js"
import { PLACEHOLDER_IMAGE_URLS } from "./upload.constants.js"

/*
Deletes the given image files from UploadThing, skipping the shared placeholder images, files
that aren't ours and files another property still uses, since a landlord can attach any
public UploadThing URL. Runs after the database write and is best effort, so a failure here
leaves an orphaned file instead of failing the request.
*/
const deleteUnusedImages = async (urls: string[]) => {
  const candidates = urls.filter(
    (url) => url.startsWith(UPLOAD_URL_PREFIX) && !PLACEHOLDER_IMAGE_URLS.includes(url),
  )

  if (candidates.length === 0) return

  try {
    const stillUsed = await prisma.property.findMany({
      where: { images: { hasSome: candidates } },
      select: { images: true },
    })
    const usedUrls = new Set(stillUsed.flatMap((property) => property.images))
    const keys = candidates
      .filter((url) => !usedUrls.has(url))
      .map((url) => url.slice(UPLOAD_URL_PREFIX.length))

    if (keys.length > 0) {
      await utapi.deleteFiles(keys)
    }
  } catch (error) {
    console.error("Failed to delete UploadThing files", error)
  }
}

export const uploadService = { deleteUnusedImages }
