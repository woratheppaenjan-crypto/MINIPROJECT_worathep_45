/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/AddBMIScreen`; params?: Router.UnknownInputParams; } | { pathname: `/AppNavigator`; params?: Router.UnknownInputParams; } | { pathname: `/DeleteBMIScreen`; params?: Router.UnknownInputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/AddBMIScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/AppNavigator`; params?: Router.UnknownOutputParams; } | { pathname: `/DeleteBMIScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/AddBMIScreen${`?${string}` | `#${string}` | ''}` | `/AppNavigator${`?${string}` | `#${string}` | ''}` | `/DeleteBMIScreen${`?${string}` | `#${string}` | ''}` | `/HomeScreen${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/AddBMIScreen`; params?: Router.UnknownInputParams; } | { pathname: `/AppNavigator`; params?: Router.UnknownInputParams; } | { pathname: `/DeleteBMIScreen`; params?: Router.UnknownInputParams; } | { pathname: `/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
