// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import PostList from './components/PostList.vue'
import PDFViewer from './components/PDFViewer.vue'
import VButton  from './components/VButton.vue';
import VButtons  from './components/VButtons.vue';

import PLink from "./components/helpers/PLink.vue";
import PLinks from './components/helpers/PLinks.vue';
import PBreadcrumb from "./components/helpers/PBreadcrumb.vue";
import DownloadLink from './components/helpers/DownloadLink.vue';
import PPagination from "./components/helpers/PPagination.vue";
import PFigure from './components/helpers/PFigure.vue';
import PImg from "./components/helpers/PImg.vue";

import type { Theme } from 'vitepress'


export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('PostList', PostList)
    app.component('PDFViewer', PDFViewer)
    app.component("VButton", VButton)
    app.component("VButtons", VButtons)

    app.component("PLink", PLink)
    app.component("PLinks", PLinks)
    app.component('PBreadcrumb', PBreadcrumb)
    app.component("DownloadLink", DownloadLink)
    app.component("PPagination", PPagination)
    app.component("PFigure", PFigure)
    app.component("PImg", PImg)
  }
} satisfies Theme

