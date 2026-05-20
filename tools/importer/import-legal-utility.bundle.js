/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-legal-utility.js
  var import_legal_utility_exports = {};
  __export(import_legal_utility_exports, {
    default: () => import_legal_utility_default
  });

  // tools/importer/transformers/lottabody-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, ["#hero-slides-tablet", "#hero-slides-mobile"]);
      WebImporter.DOMUtils.remove(element, ["#onetrust-consent-sdk"]);
      WebImporter.DOMUtils.remove(element, [".pum"]);
      WebImporter.DOMUtils.remove(element, ["#cboxOverlay", "#colorbox"]);
      WebImporter.DOMUtils.remove(element, [
        "access-widget-ui",
        ".acsb-sr-alert",
        "a.acsb-sr-only",
        ".acsb-trigger"
      ]);
      WebImporter.DOMUtils.remove(element, [".grecaptcha-badge"]);
      WebImporter.DOMUtils.remove(element, ["#ui-datepicker-div"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, ["#main-header"]);
      WebImporter.DOMUtils.remove(element, ["#main-footer", "#secondary-footer"]);
      WebImporter.DOMUtils.remove(element, [".sharethis-inline-share-buttons"]);
      const mainContentBg = element.querySelector("#main-content > img");
      if (mainContentBg) mainContentBg.remove();
      const entryContentBg = element.querySelector(".entry-content > img");
      if (entryContentBg) entryContentBg.remove();
      WebImporter.DOMUtils.remove(element, ["iframe", "noscript", "link"]);
    }
  }

  // tools/importer/import-legal-utility.js
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "legal-utility",
    description: "Legal and utility pages with long-form text content",
    urls: [
      "https://lottabody.com/privacy/",
      "https://lottabody.com/terms/",
      "https://lottabody.com/exercise-your-privacy-rights/",
      "https://lottabody.com/sitemap/",
      "https://lottabody.com/thanks-for-registering/",
      "https://lottabody.com/lottaselfie-terms/",
      "https://lottabody.com/lottabody-control-24hr-edge-gel/"
    ],
    blocks: []
  };
  function executeTransformers(hookName, element, payload) {
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, payload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  var import_legal_utility_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name
        }
      }];
    }
  };
  return __toCommonJS(import_legal_utility_exports);
})();
