import { Modal } from '@/components/Modal'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export default async function StudyModal({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  console.log('🚀 Modal page rendered for slug:', await params)
  
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const caseStudy = await payload.find({
    collection: 'case-studies',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  if (!caseStudy.docs.length) {
    notFound()
  }

  const study = caseStudy.docs[0]

  return (
    <Modal>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 pr-8">{study.title}</h1>
        {study.media && study.media.length > 0 && (
          <div className="mb-6">
            {study.media.map((media, index) => (
              <Media key={index} resource={media} className="mb-4" />
            ))}
          </div>
        )}
        {study.content && (
          <div className="prose dark:prose-invert max-w-none">
            <RichText data={study.content} />
          </div>
        )}
      </div>
    </Modal>
  )
}
