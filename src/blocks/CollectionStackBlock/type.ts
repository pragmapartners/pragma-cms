export interface CollectionStackBlock {
  blockType: 'CollectionStack'
  style?: 'scale' | 'bloom' | 'stack' | null;
  relationTo?: 'case-studies' | null;
  limit?: number | null;
  blockName?: string | null;
}
  