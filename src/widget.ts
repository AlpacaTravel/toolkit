import { get } from "./api/oembed";
import * as config from "./config";

// Obtain the script attribute
const element = document.currentScript;

// Obtain the configuration
const id = element.getAttribute("id");
const dataset = element.dataset;
const contentId = dataset.id;

// Build the container
const containerId = dataset.containerId || "alpaca";
if (!document.getElementById(containerId)) {
  document.write(`<div id="${containerId}"></div>`);
}

// Build the oembed service options
const oembedOptions = (() => {
  const width = dataset.width && Number(dataset.width);
  const height = dataset.height && Number(dataset.height);
  const baseUrl = dataset.baseUrl || config.BASE_URL;
  const responsive = dataset.responsive === "false" ? false : undefined;
  const oembedService = dataset.oembedService || config.OEMBED_ENDPOINT;
  const viewMode = dataset.viewMode;
  const inline = dataset.inline === "true" ? true : undefined;

  return {
    width,
    height,
    baseUrl,
    responsive,
    oembedService,
    viewMode,
    inline,
  };
})();

// Write via oembed
const oembed = async (url, options) => {
  try {
    const { html } = await get(url, options);
    document.getElementById("alpaca").innerHTML = html;
  } catch (e) {
    console.error(e);
  }
};

// Include the oembed in place
oembed(`https://embed.alpacamaps.com/${contentId}`, oembedOptions);