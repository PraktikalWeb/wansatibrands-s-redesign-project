# Staging Test Checklist

## Environment Setup
- [ ] Fresh staging or local WordPress install is available.
- [ ] WooCommerce is installed and activated.
- [ ] Required plugins are installed.
- [ ] Payment gateways are configured in sandbox/test mode.
- [ ] Representative products, categories, images, coupons, and shipping settings are loaded.
- [ ] Menus are assigned to `Primary`, `Footer`, and `Legal`.
- [ ] Shop, Cart, Checkout, and My Account pages are correctly assigned in WooCommerce settings.

## Theme Activation
- [ ] Theme uploads successfully as a zip.
- [ ] Theme activates without fatal errors.
- [ ] Frontend loads with no white screen or template errors.
- [ ] `wp_head()` output is present.
- [ ] `wp_footer()` output is present.

## Homepage
- [ ] Homepage hero loads correctly.
- [ ] Category/collection tiles render correctly.
- [ ] Homepage product sections show real WooCommerce products.
- [ ] Trust badges and newsletter section display correctly.
- [ ] Fallback images are identified and scheduled for replacement.

## Header / Navigation
- [ ] Desktop header spacing and alignment look correct.
- [ ] Mega menu opens and closes correctly.
- [ ] Mobile menu opens and closes correctly.
- [ ] Search overlay opens and closes correctly.
- [ ] Cart count updates after add-to-cart.
- [ ] Side cart opens after add-to-cart.
- [ ] Wishlist drawer opens without JS errors.

## Footer
- [ ] Footer columns align correctly.
- [ ] Footer navigation links work.
- [ ] Dynamic product category links render correctly.
- [ ] Contact details and payment logos display correctly.

## Shop / Archive Pages
- [ ] Shop page loads with real product data.
- [ ] Product count displays correctly.
- [ ] Sort dropdown works.
- [ ] Product grid spacing is correct.
- [ ] Category filter sidebar displays correctly.
- [ ] Mobile filter drawer opens and closes correctly.
- [ ] Pagination works if there are multiple pages.
- [ ] Empty state displays correctly when no products match.

## Product Category Pages
- [ ] Product category archives load correctly.
- [ ] Category descriptions display where expected.
- [ ] Category thumbnails and counts are accurate.

## Search
- [ ] Site search returns products, pages, and posts as expected.
- [ ] Product results render with product cards.
- [ ] Search overlay form submits correctly.
- [ ] Empty search results state is usable.

## Single Product Page
- [ ] Single product page loads without PHP/JS errors.
- [ ] Gallery images display correctly.
- [ ] Sale badge and price formatting are correct.
- [ ] SKU, categories, tags, stock status, and short description render correctly.
- [ ] Related products render correctly.
- [ ] Tabs/reviews render correctly if enabled.

## Product Types
- [ ] Simple product add-to-cart works.
- [ ] Variable product variation selection works.
- [ ] Variable product price updates correctly.
- [ ] Out-of-stock products show correctly.
- [ ] Sale products show sale price correctly.

## Cart
- [ ] Cart page loads correctly.
- [ ] Empty cart page displays correctly.
- [ ] Quantity updates work.
- [ ] Remove item works.
- [ ] Cart totals update dynamically.
- [ ] Continue shopping link works.
- [ ] Cart checkout button works.
- [ ] Coupon application works.
- [ ] Discount Rules for WooCommerce adjustments appear correctly.

## Checkout
- [ ] Checkout fields render correctly.
- [ ] Billing and shipping sections work.
- [ ] Order review updates correctly.
- [ ] Coupon area works.
- [ ] Terms and conditions checkbox works if enabled.
- [ ] Place order button works.
- [ ] Guest checkout works if enabled.
- [ ] Logged-in checkout works.

## Payments
- [ ] Payfast sandbox checkout completes successfully.
- [ ] Yoco sandbox checkout completes successfully.
- [ ] WooPayments sandbox checkout completes successfully if used.
- [ ] Payment method labels, descriptions, and extra fields render correctly.

## Order Completion
- [ ] Thank-you page displays order number, date, total, email, and payment method.
- [ ] Order items display correctly.
- [ ] Continue shopping button works.
- [ ] My account orders view reflects the new order.
- [ ] Order emails are triggered and received.

## My Account
- [ ] Login/register screens work.
- [ ] My account dashboard loads.
- [ ] Orders, addresses, account details, and logout work.

## Plugin Compatibility
- [ ] Discount Rules for WooCommerce calculations remain correct in cart and checkout.
- [ ] PixelYourSite events still fire.
- [ ] Google for WooCommerce remains connected and unaffected.
- [ ] Chaty widget displays correctly.
- [ ] WP Rocket does not break cart, checkout, or account page behavior.

## Responsive / Browser QA
- [ ] Homepage is usable on mobile.
- [ ] Archive filters are usable on mobile.
- [ ] PDP layout is usable on mobile.
- [ ] Cart and checkout are usable on mobile.
- [ ] Test on current Chrome.
- [ ] Test on current Safari.
- [ ] Test on current Firefox.

## Performance / Observations
- [ ] Record any layout shifts or slow-loading images.
- [ ] Note any unstyled third-party plugin fragments.
- [ ] Note any remaining fallback imagery or content placeholders.
- [ ] Record any PHP notices, console errors, or caching conflicts.
