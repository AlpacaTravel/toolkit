// FIXME: Remove this requirement
import "nodelist-foreach-polyfill";
import * as availableControls from "./controls/index";
import { resolver as defaultResolver } from "./resolver";
export { default as View } from "./view";

export { Control } from "./view";
export { FeatureItem, TargetViewport, TargetMove } from "./types";

export const resolver = defaultResolver;
export const controls = availableControls;
