/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: lottabody cleanup
 * Removes non-authorable site chrome, widgets, and decorative elements.
 * Selectors validated from captured DOM (migration-work/cleaned.html).
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent banner (blocks content interaction)
    // Found: #onetrust-consent-sdk (line 510 of cleaned.html)
    WebImporter.DOMUtils.remove(element, ['#onetrust-consent-sdk']);

    // Remove popup modals that overlay content
    // Found: .pum (line 368 of cleaned.html)
    WebImporter.DOMUtils.remove(element, ['.pum']);

    // Remove colorbox overlay (lightbox plugin)
    // Found: #cboxOverlay, #colorbox (lines 453-507 of cleaned.html)
    WebImporter.DOMUtils.remove(element, ['#cboxOverlay', '#colorbox']);

    // Remove accessibility widget UI elements that block parsing
    // Found: access-widget-ui (lines 3, 6, 8, 10 of cleaned.html)
    // Found: .acsb-sr-alert (line 2), a.acsb-sr-only (line 5), .acsb-trigger (line 566)
    WebImporter.DOMUtils.remove(element, [
      'access-widget-ui',
      '.acsb-sr-alert',
      'a.acsb-sr-only',
      '.acsb-trigger',
    ]);

    // Remove reCAPTCHA badge
    // Found: .grecaptcha-badge (line 553 of cleaned.html)
    WebImporter.DOMUtils.remove(element, ['.grecaptcha-badge']);

    // Remove UI datepicker widget
    // Found: #ui-datepicker-div (line 447 of cleaned.html)
    WebImporter.DOMUtils.remove(element, ['#ui-datepicker-div']);
  }

  if (hookName === H.after) {
    // Remove header (logo, nav, social links, search form)
    // Found: #main-header (line 13 of cleaned.html)
    WebImporter.DOMUtils.remove(element, ['#main-header']);

    // Remove both footers (main footer nav + secondary footer with copyright)
    // Found: #main-footer (line 287), #secondary-footer (line 325)
    WebImporter.DOMUtils.remove(element, ['#main-footer', '#secondary-footer']);

    // Remove ShareThis social share buttons (not authorable)
    // Found: .sharethis-inline-share-buttons (line 215 of cleaned.html)
    WebImporter.DOMUtils.remove(element, ['.sharethis-inline-share-buttons']);

    // Remove decorative background images above article content
    // Found: #main-content > img (line 189), .entry-content > img (line 192)
    const mainContentBg = element.querySelector('#main-content > img');
    if (mainContentBg) mainContentBg.remove();
    const entryContentBg = element.querySelector('.entry-content > img');
    if (entryContentBg) entryContentBg.remove();

    // Remove iframes, noscript, and link elements
    WebImporter.DOMUtils.remove(element, ['iframe', 'noscript', 'link']);
  }
}
