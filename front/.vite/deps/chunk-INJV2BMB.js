import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-KFKJ3YBF.js";
import {
  require_prop_types
} from "./chunk-HGRDQ7LL.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/react-bootstrap/esm/Image.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var propTypes = {
  /**
   * @default 'img'
   */
  bsPrefix: import_prop_types.default.string,
  /**
   * Sets image as fluid image.
   */
  fluid: import_prop_types.default.bool,
  /**
   * Sets image shape as rounded.
   */
  rounded: import_prop_types.default.bool,
  /**
   * Sets image shape as circle.
   */
  roundedCircle: import_prop_types.default.bool,
  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: import_prop_types.default.bool
};
var Image = React.forwardRef(({
  bsPrefix,
  className,
  fluid = false,
  rounded = false,
  roundedCircle = false,
  thumbnail = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "img");
  return (0, import_jsx_runtime.jsx)("img", {
    // eslint-disable-line jsx-a11y/alt-text
    ref,
    ...props,
    className: (0, import_classnames.default)(className, fluid && `${bsPrefix}-fluid`, rounded && `rounded`, roundedCircle && `rounded-circle`, thumbnail && `${bsPrefix}-thumbnail`)
  });
});
Image.displayName = "Image";
var Image_default = Image;

export {
  propTypes,
  Image_default
};
//# sourceMappingURL=chunk-INJV2BMB.js.map
