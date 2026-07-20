# Shopify Storefront API

Official references:

- https://shopify.dev/docs/api/storefront/latest/objects/Product
- https://shopify.dev/docs/api/usage/authentication

The Storefront API supports tokenless and token-based access, but availability depends on shop configuration and the fields requested. Public tokens may be used in public clients; private tokens are server-side secrets.

Use the current versioned endpoint and the `product(handle: ...)` query for new work. `productByHandle` is deprecated in the current Storefront schema.

Request only the fields needed for creative production. A useful product query includes:

```graphql
query ProductForAds($handle: String!) {
  product(handle: $handle) {
    id
    handle
    title
    onlineStoreUrl
    featuredImage { url width height altText }
    images(first: 20) { nodes { url width height altText } }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    selectedOrFirstAvailableVariant {
      id
      title
      availableForSale
      image { url width height altText }
      price { amount currencyCode }
      selectedOptions { name value }
    }
  }
}
```

Confirm that the selected image matches the advertised color and variant. Treat storefront data as evidence, not automatic permission to make claims or publish ads.
