# Wansati Brands Redesign Theme

## Purpose
`Wansati Brands Redesign` is a custom classic WordPress/WooCommerce theme built from the separate React/Vite redesign as a visual reference. The goal is to preserve native WooCommerce behavior and plugin compatibility while matching the React design as closely as practical.

This theme is intended for staging and controlled rollout first. It should not be activated on the live site before a full staging QA pass.

## Required Plugins
- WooCommerce

## Recommended Plugins
- WooCommerce Payfast Gateway
- Yoco Payments
- Discount Rules for WooCommerce
- Google for WooCommerce
- WP Mail SMTP Pro
- WP Rocket
- PixelYourSite
- Chaty
- WooPayments
- Jetpack / Jetpack Search
- Omnisend for WooCommerce

## Testing Instructions
1. Install WordPress on a local or staging environment.
2. Install and activate WooCommerce before activating this theme.
3. Import or sync representative products, categories, images, coupons, and shipping settings.
4. Activate the required payment gateway plugins and switch them to sandbox/test mode.
5. Activate the theme and assign the `Primary`, `Footer`, and `Legal` menus.
6. Set the WooCommerce pages for Shop, Cart, Checkout, My Account, and Terms if needed.
7. Upload category thumbnails, homepage imagery, and any brand assets to the Media Library.
8. Run through the checklist in `STAGING-TEST-CHECKLIST.md`.

## Known Limitations
- The wishlist drawer is only a visual scaffold. No real wishlist persistence or plugin integration is included yet.
- Some decorative fallback images still use temporary remote URLs for design preview. Replace them with Media Library assets before production rollout.
- Product filters are styling-first and taxonomy-driven. They are not a full faceted AJAX filtering system.
- Visual parity is strongest on the homepage, archive, PDP, cart, and checkout shells; it is not yet guaranteed to be pixel-identical across every WooCommerce extension UI.

## Payment and Checkout Notes
- Payfast, Yoco, WooPayments, coupons, taxes, shipping, totals, and discount rules must be tested through native WooCommerce checkout flows.
- Do not replace or bypass gateway rendering in checkout templates.
- Run Payfast and Yoco in sandbox mode first and verify successful order creation, thank-you page rendering, and order emails.

## Image Notes
- Product images should come from WooCommerce product galleries.
- Collection/category visuals should come from WooCommerce category thumbnails or WordPress Media Library assets.
- Temporary fallback images in homepage sections should be replaced before production launch.

## Activation Safety Notes
- Do not activate this theme directly on the live site first.
- Test activation on a fresh staging clone with the live plugin stack.
- If WooCommerce is temporarily inactive, the theme should fail gracefully, but full storefront functionality requires WooCommerce to be active.
