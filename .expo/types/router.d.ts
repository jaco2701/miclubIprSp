/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/_sitemap` | `/carnet` | `/cuotas` | `/home` | `/login` | `/mediciones`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
