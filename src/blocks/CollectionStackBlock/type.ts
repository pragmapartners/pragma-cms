
import { Category, Page, Post } from '@/payload-types'

export interface CollectionStackBlock {
  blockType: 'CollectionStack'
  style?: 'scale' | 'bloom' | null;
  relationTo?: 'case-studies' | null;
  limit?: number | null;
  blockName?: string | null;
}
  