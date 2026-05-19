/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

  // tools/importer/import-product-detail.js
  var import_product_detail_exports = {};
  __export(import_product_detail_exports, {
    default: () => import_product_detail_default
  });

  // tools/importer/parsers/columns-product.js
  function parse(element, { document }) {
    const isLeftColumn = element.classList.contains("et_pb_column_1_4") || element.classList.contains("et_pb_column_single");
    const isRightInner = element.classList.contains("et_pb_row_inner_0") || element.classList.contains("et_pb_row_inner");
    if (isRightInner && !isLeftColumn) {
      element.remove();
      return;
    }
    const leftContent = [];
    const productImg = element.querySelector('.et_pb_image img, img[class*="wp-image"]');
    if (productImg) {
      leftContent.push(productImg);
    }
    const whereToBuyLink = element.querySelector(':scope > .et_pb_button_module_wrapper > a.et_pb_button, a.et_pb_button[href*="where-to-buy"]');
    if (whereToBuyLink) {
      leftContent.push(whereToBuyLink);
    }
    const amazonLink = element.querySelector('.et_pb_code a.et_pb_button, a.et_pb_button[href*="amazon"]');
    if (amazonLink) {
      leftContent.push(amazonLink);
    }
    const rightContent = [];
    const parentRow = element.parentElement;
    const rightCol = parentRow ? parentRow.querySelector(".et_pb_column_3_4, .et_pb_specialty_column") : null;
    if (rightCol) {
      const innerRow = rightCol.querySelector(".et_pb_row_inner_0, .et_pb_row_inner:first-child");
      if (innerRow) {
        const heading = innerRow.querySelector("h1, h2, h3");
        if (heading) {
          rightContent.push(heading);
        }
        const description = innerRow.querySelector("p");
        if (description) {
          rightContent.push(description);
        }
      }
    } else {
      const section = element.closest(".et_pb_section_1, .et_pb_section");
      if (section) {
        const heading = section.querySelector(".et_pb_row_inner_0 h1, .et_pb_row_inner h1, h1");
        if (heading) rightContent.push(heading);
        const description = section.querySelector(".et_pb_row_inner_0 p, .et_pb_row_inner p");
        if (description) rightContent.push(description);
      }
    }
    const cells = [
      [leftContent, rightContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-details.js
  function parse2(element, { document }) {
    const leftColumn = element.querySelector(".et_pb_column_inner_1, .et_pb_column_inner:first-child");
    const textContainer = leftColumn ? leftColumn.querySelector(".et_pb_text_inner, .et_pb_text") : null;
    const leftCell = [];
    if (textContainer) {
      const inner = textContainer.classList.contains("et_pb_text_inner") ? textContainer : textContainer.querySelector(".et_pb_text_inner") || textContainer;
      const children = inner.children;
      for (let i = 0; i < children.length; i++) {
        leftCell.push(children[i]);
      }
    }
    const rightColumn = element.querySelector(".et_pb_column_inner_2, .et_pb_column_inner:last-child, .et-last-child");
    const image = rightColumn ? rightColumn.querySelector("img") : element.querySelector(".et_pb_image img, img");
    const rightCell = [];
    if (image) {
      rightCell.push(image);
    }
    const cells = [
      [leftCell, rightCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-details", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/lottabody-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
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

  // tools/importer/import-product-detail.js
  var parsers = {
    "columns-product": parse,
    "columns-details": parse2
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "product-detail",
    description: "Product detail page with breadcrumb, product hero image, description, benefits list, directions, and model image",
    urls: [
      "https://lottabody.com/coconut-and-shea-oils/24hr-edge-gel/",
      "https://lottabody.com/coconut-and-shea-oils/love-me-5-n-1-leave-in-treatment/",
      "https://lottabody.com/coconut-and-shea-oils/moisturize-me-curl-and-style-milk/",
      "https://lottabody.com/coconut-and-shea-oils/sleek-me-blowout-lotion/",
      "https://lottabody.com/coconut-and-shea-oils/style-me-texturizing-setting-lotion/",
      "https://lottabody.com/coconut-and-shea-oils/wrap-me-foaming-mousse/",
      "https://lottabody.com/coconut-and-shea-oils/control-me-edge-gel/",
      "https://lottabody.com/milk-and-honey/refine-me-curl-defining-mousse/"
    ],
    blocks: [
      {
        name: "columns-product",
        instances: [".et_pb_section_1 .et_pb_column_1_4, .et_pb_section_1 .et_pb_row_inner_0"]
      },
      {
        name: "columns-details",
        instances: [".et_pb_row_inner_1"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Product Content",
        selector: ".et_pb_section_0, .et_pb_section_1",
        style: "light-blue-textured",
        blocks: ["columns-product", "columns-details"],
        defaultContent: ["#breadcrumbs"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_product_detail_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name}:`, e);
          }
        }
      });
      executeTransformers("afterTransform", main, payload);
      PAGE_TEMPLATE.sections.forEach((section) => {
        if (section.style) {
          const cells = [
            ["Section Metadata"],
            ["style", section.style]
          ];
          const table = WebImporter.DOMUtils.createTable(cells, document);
          main.append(table);
        }
      });
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
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_product_detail_exports);
})();
