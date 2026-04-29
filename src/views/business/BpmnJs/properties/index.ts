import CustomPropertiesProvider from "./CustomPropertiesProvider";

const customPropertiesModule = {
  __init__: ["customPropertiesProvider"],
  customPropertiesProvider: ["type", CustomPropertiesProvider],
};

export default customPropertiesModule;
