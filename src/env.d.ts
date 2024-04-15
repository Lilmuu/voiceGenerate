/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'uview-plus' {
  const vis: any;
  export default vis;
}

declare module '@/js_sdk/wa-permission/permission.js' {
  const vis: any;
  export default vis;
}

interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_APP_AXIOS_BASE_URL: string
}

declare type Recordable<T = any> = Record<string, T>;