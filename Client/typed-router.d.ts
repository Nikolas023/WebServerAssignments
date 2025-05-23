/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/LoginView': RouteRecordInfo<'/LoginView', '/LoginView', Record<never, never>, Record<never, never>>,
    '/SignUpView': RouteRecordInfo<'/SignUpView', '/SignUpView', Record<never, never>, Record<never, never>>,
    '/User/': RouteRecordInfo<'/User/', '/User', Record<never, never>, Record<never, never>>,
    '/User/[id]': RouteRecordInfo<'/User/[id]', '/User/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/User/Admin/[id]': RouteRecordInfo<'/User/Admin/[id]', '/User/Admin/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/User/Friends/[id]': RouteRecordInfo<'/User/Friends/[id]', '/User/Friends/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/User/Search/[id]': RouteRecordInfo<'/User/Search/[id]', '/User/Search/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
  }
}
