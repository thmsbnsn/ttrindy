import { StructureBuilder } from 'sanity/structure'

import { Cog, FileText, FolderOpen, Tag } from 'lucide-react'

export default (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .icon(Cog)
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // Projects
      S.listItem()
        .title('Projects')
        .icon(FolderOpen)
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
            .filter('_type == "project"')
        ),

      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .icon(FileText)
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
            .filter('_type == "blogPost"')
        ),

      // Categories
      S.listItem()
        .title('Categories')
        .icon(Tag)
        .schemaType('category')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
    ])

