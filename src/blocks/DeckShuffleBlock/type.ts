
import { Category, Page, Post } from '@/payload-types'

export interface DeckShuffleBlock {
  blockType: 'deck'
  eyebrow?: string
  introContent?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  populateBy?: ('collection' | 'selection') | null;
  relationTo?: 'posts' | null;
  categories?: (number | Category)[] | null;
  selection?: { relationTo: string; value: string | number }[]
  limit?: number | null;
  links?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({
                relationTo: 'pages';
                value: number | Page;
              } | null)
            | ({
                relationTo: 'posts';
                value: number | Post;
              } | null);
          url?: string | null;
          label: string;
          /**
           * Choose how the link should be rendered.
           */
          appearance?: ('default' | 'outline') | null;
        };
        id?: string | null;
      }[]
    | null;
  selectedDocs?: { relationTo: 'posts'; value: number | Post }[] | null;
  id?: string | null;
  blockName?: string | null;
}
  