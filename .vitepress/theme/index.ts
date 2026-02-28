// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import PostList from './components/PostList.vue'
import PDFViewer from './components/PDFViewer.vue'
import VButton  from './helpers/VButton.vue';
import type { Theme } from 'vitepress'


export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('PostList', PostList)
    app.component('PDFViewer', PDFViewer)
    app.component("VButton", VButton)
  }
} satisfies Theme

