import { Modal } from '@/components/Modal'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import { getCaseStudy } from '@/utilities/getCaseStudy'

export default async function StudyModal({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  
  const { slug } = await params
  const study = await getCaseStudy(slug)


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
