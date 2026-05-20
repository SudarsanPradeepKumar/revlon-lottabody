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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll(".et_pb_slide");
    if (!slides || slides.length === 0) return;
    const cells = [];
    slides.forEach((slide) => {
      let bgUrl = "";
      const bgStyle = slide.style.backgroundImage || "";
      const match = bgStyle.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1]) {
        bgUrl = match[1];
      }
      if (!bgUrl) return;
      const img = document.createElement("img");
      img.src = bgUrl;
      const ctaLink = slide.querySelector(".et_pb_slide_description a.et_pb_button, .et_pb_button");
      let linkCell = "";
      if (ctaLink) {
        const link = document.createElement("a");
        link.href = ctaLink.href;
        link.textContent = ctaLink.href;
        linkCell = link;
      }
      cells.push([img, linkCell]);
    });
    if (cells.length === 0) return;
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-showcase.js
  function parse2(element, { document }) {
    const columns = element.querySelectorAll(":scope > .et_pb_column");
    if (!columns || columns.length < 2) {
      element.remove();
      return;
    }
    const section = element.closest(".et_pb_section");
    let bgCell = "";
    if (section) {
      const bgStyle = section.style.backgroundImage || "";
      const bgMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/);
      if (bgMatch && bgMatch[1]) {
        const img = document.createElement("img");
        img.src = bgMatch[1];
        bgCell = img;
      }
    }
    let titleCell = "";
    if (section) {
      const sectionHeading = section.querySelector(".et_pb_row h3, .et_pb_row h2");
      if (sectionHeading) {
        const h3 = document.createElement("h3");
        h3.textContent = sectionHeading.textContent.trim();
        titleCell = h3;
      }
    }
    const col0HasImg = columns[0].querySelector(".et_pb_image");
    const col1HasImg = columns[1].querySelector(".et_pb_image");
    let productImgEl = "";
    let rightCell = [];
    if (col0HasImg) {
      const link = columns[0].querySelector("a");
      const img = columns[0].querySelector("img");
      if (link && img) {
        const a = document.createElement("a");
        a.href = link.href;
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        a.append(newImg);
        productImgEl = a;
      } else if (img) {
        productImgEl = img.cloneNode(false);
      }
      const textInner = columns[1].querySelector(".et_pb_text_inner");
      if (textInner) {
        const p = textInner.querySelector("p");
        if (p) rightCell.push(p.cloneNode(true));
        const cta = textInner.querySelector("a");
        if (cta) {
          const pp = document.createElement("p");
          const a = document.createElement("a");
          a.href = cta.href;
          a.textContent = cta.textContent;
          pp.append(a);
          rightCell.push(pp);
        }
      }
    } else if (col1HasImg) {
      const link = columns[1].querySelector("a");
      const img = columns[1].querySelector("img");
      if (link && img) {
        const a = document.createElement("a");
        a.href = link.href;
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        a.append(newImg);
        productImgEl = a;
      } else if (img) {
        productImgEl = img.cloneNode(false);
      }
      const textInner = columns[0].querySelector(".et_pb_text_inner");
      if (textInner) {
        const p = textInner.querySelector("p");
        if (p) rightCell.push(p.cloneNode(true));
        const cta = textInner.querySelector("a");
        if (cta) {
          const pp = document.createElement("p");
          const a = document.createElement("a");
          a.href = cta.href;
          a.textContent = cta.textContent;
          pp.append(a);
          rightCell.push(pp);
        }
      }
    }
    const cells = [];
    if (bgCell) cells.push([bgCell]);
    if (titleCell) cells.push([titleCell]);
    cells.push([productImgEl, rightCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-showcase", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-signup.js
  function parse3(element, { document }) {
    const parent = element.parentElement;
    let heading = element.querySelector("h4, h3, h2");
    if (!heading && parent) {
      const headerRow = parent.querySelector(".et_pb_row.header, .et_pb_row_4");
      if (headerRow) {
        heading = headerRow.querySelector("h4, h3, h2");
      }
    }
    let modelImage = element.querySelector(".et_pb_column_1_4 img, .et_pb_image.model img");
    if (!modelImage && parent) {
      const formRow = parent.querySelector(".et_pb_row.form, .et_pb_row_5, .et_pb_row_3-4_1-4");
      if (formRow) {
        modelImage = formRow.querySelector(".et_pb_column_1_4 img, .et_pb_image.model img, .et-last-child img");
      }
    }
    const leftContent = [];
    if (heading) {
      const h = heading.cloneNode(true);
      leftContent.push(h);
    }
    const placeholder = document.createElement("p");
    placeholder.textContent = "Email signup form";
    leftContent.push(placeholder);
    const rightContent = [];
    if (modelImage) {
      rightContent.push(modelImage);
    }
    const cells = [
      [leftContent, rightContent]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-signup", cells });
    element.replaceWith(block);
  }

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

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "columns-showcase": parse2,
    "columns-signup": parse3
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage with video hero, product line showcases, and email signup form",
    urls: ["https://lottabody.com/"],
    blocks: [
      {
        name: "carousel-hero",
        instances: ["#hero-slides .et_pb_slider"]
      },
      {
        name: "columns-showcase",
        instances: ["#milk-and-honey-callout .et_pb_row", "#ready-to-use .et_pb_row"]
      },
      {
        name: "columns-signup",
        instances: ["#mailing-list .et_pb_row"]
      }
    ],
    sections: [
      {
        id: "section-hero",
        name: "Hero Carousel",
        selector: "#hero-slides",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-milk-honey",
        name: "Milk and Honey Callout",
        selector: "#milk-and-honey-callout",
        style: "pink",
        blocks: ["columns-showcase"],
        defaultContent: ["#milk-and-honey-callout h3"]
      },
      {
        id: "section-ready-to-use",
        name: "Coconut and Shea Oils",
        selector: "#ready-to-use",
        style: "blue",
        blocks: ["columns-showcase"],
        defaultContent: ["#ready-to-use h3"]
      },
      {
        id: "section-mailing-list",
        name: "Mailing List Signup",
        selector: "#mailing-list",
        style: "dark",
        blocks: ["columns-signup"],
        defaultContent: ["#mailing-list .et_pb_text_0"]
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
  var import_homepage_default = {
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
      const blockTables = main.querySelectorAll("table");
      const carouselTable = [...blockTables].find((t) => {
        const firstCell = t.querySelector("tr:first-child td");
        return firstCell && firstCell.textContent.includes("carousel-hero");
      });
      if (carouselTable) {
        const hr2 = document.createElement("hr");
        carouselTable.after(hr2);
      }
      const allTables = [...main.querySelectorAll("table")];
      const showcaseTables = allTables.filter((t) => {
        const firstCell = t.querySelector("tr:first-child td");
        return firstCell && firstCell.textContent.includes("columns-showcase");
      });
      const signupTables = allTables.filter((t) => {
        const firstCell = t.querySelector("tr:first-child td");
        return firstCell && firstCell.textContent.includes("columns-signup");
      });
      if (showcaseTables[0]) {
        const cells = [["Section Metadata"], ["style", "pink"]];
        const table = WebImporter.DOMUtils.createTable(cells, document);
        showcaseTables[0].after(table);
        const hr2 = document.createElement("hr");
        table.after(hr2);
      }
      if (showcaseTables[1]) {
        const cells = [["Section Metadata"], ["style", "blue"]];
        const table = WebImporter.DOMUtils.createTable(cells, document);
        showcaseTables[1].after(table);
        const hr2 = document.createElement("hr");
        table.after(hr2);
      }
      if (signupTables[0]) {
        const cells = [["Section Metadata"], ["style", "dark"]];
        const table = WebImporter.DOMUtils.createTable(cells, document);
        signupTables[0].after(table);
        const hr2 = document.createElement("hr");
        table.after(hr2);
      }
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
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
  return __toCommonJS(import_homepage_exports);
})();
