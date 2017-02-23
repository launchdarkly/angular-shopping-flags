# Angular Shopping Flags
> A demo showcasing the use of feature flags in an e-commerce AngularJS app.

Built on top of Code Project's [ShoppingCart](https://www.codeproject.com/Articles/576246/A-Shopping-Cart-Application-Built-with-AngularJS), this Angular app uses LaunchDarkly feature flags to dynamically discount products in a webstore.

## Feature Flags
Feature flags are served using [LaunchDarkly's JavaScript SDK](https://github.com/launchdarkly/js-client). In this app, we define a feature flag "store-discount" which can be toggled to return different numbers, indicating a store-wide discount.

## Integrating
To integrate LaunchDarkly feature flags, we use Angular's [$q](https://docs.angularjs.org/api/ng/service/$q) to create a service which returns the feature flag client as a promise, which resolves when the client is ready to return flag variations. Then, the main store controller starts a listener. Whenever the store-discount flag is modified, the changes are detected, and new discounts are displayed to any user that may be viewing the store.
