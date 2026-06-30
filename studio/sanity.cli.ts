import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'mcvnhjxb',
    dataset: 'production'
  },
  deployment: {
    /**
     * Auto-updates disabled: the runtime CDN import map it relies on
     * (modules.sanity-cdn.com) fails under Safari's strict CORS/credentials
     * handling, leaving the deployed Studio blank. Disabling bundles the
     * Studio statically instead.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: false,
    appId: 'r28cds6t4oq1ob0u4mmrxpel',
  },
})
