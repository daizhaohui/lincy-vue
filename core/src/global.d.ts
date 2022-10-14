// Global compile-time constants
declare var __DEV__: boolean;
declare var __TEST__: boolean;
declare var __VERSION__: string;

// Feature flags
declare var FEATURE_PROD_DEVTOOLS: boolean;

declare interface Window {
  [key:string]:any;
  __themes__: any;
  __lincy_vue__:any;
}
