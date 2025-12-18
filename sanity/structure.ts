// sanity/structure.ts
import { StructureBuilder } from 'sanity/structure'
import { Cog, Home, FileText, Wrench, FolderOpen, BookOpen } from 'lucide-react'

/**
 * Custom desk structure for Sanity Studio
 * Organizes content into logical groups with singleton pages
 */
export default (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // ==================== SITE SETTINGS (Singleton) ====================
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


      // ==================== PAGE MANAGEMENT ====================
      S.listItem()
        .title('Pages')
        .icon(FileText)
        .child(
          S.list()
            .title('Pages')
            .items([
              // Home Page (Singleton)
              S.listItem()
                .title('Home Page')
                .icon(Home)
                .id('homePage')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Home Page')
                ),

              // About Page (Singleton)
              S.listItem()
                .title('About Page')
                .icon(FileText)
                .id('aboutPage')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About Page')
                ),

              // Services Page (Singleton)
              S.listItem()
                .title('Services Page')
                .icon(Wrench)
                .id('servicesPage')
                .child(
                  S.document()
                    .schemaType('servicesPage')
                    .documentId('servicesPage')
                    .title('Services Page')
                ),
            ])
        ),

      S.divider(),

      // ==================== PROJECTS ====================
      S.listItem()
        .title('Projects')
        .icon(FolderOpen)
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{ field: 'date', direction: 'desc' }])
            .filter('_type == "project"')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('project')
                .views([
                  S.view.form(),
                  // Could add preview view here in future
                ])
            )
        ),

      // ==================== BLOG POSTS ====================
      S.listItem()
        .title('Blog Posts')
        .icon(BookOpen)
        .schemaType('blogPost')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
            .filter('_type == "blogPost"')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('blogPost')
                .views([
                  S.view.form(),
                ])
            )
        ),

      S.divider(),

      // Hide singleton documents from the default list
      // This prevents editors from creating multiple instances
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['siteSettings', 'homePage', 'aboutPage', 'servicesPage'].includes(
            listItem.getId() || ''
          )
      ),
    ])
