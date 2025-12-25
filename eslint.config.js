import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    {
        ignores: ["node_modules/", "testcmds.txt", ".env"]
    },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
];
