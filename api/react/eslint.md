常用插件：

"eslint": "^1.9.0"
安装：cnpm install --save-dev eslint
生成配置文件：./node_modules/.bin/eslint --init
检查：./node_modules/.bin/eslint yourfile.js
插件和共享配置也需要安装。
配置：
详细配置查看：https://eslint.org/docs/user-guide/configuring
运行eslint --init 后, 目录下会生成 .eslintrc
{
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
}
"off" or 0 - turn the rule off
"warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
"error" or 2 - turn the rule on as an error (exit code will be 1)


"eslint-config-airbnb": "^1.0.0",
"eslint-loader": "^1.3.0",
"eslint-plugin-import": "^1.5.0",
"eslint-plugin-jsx-a11y": "^1.0.2",
"eslint-plugin-react": "^5.0.1"
"eslint-friendly-formatter": "^1.2.2",
"eslint-plugin-babel": "^3.2.0",
"eslint-plugin-promise": "^1.0.8",
"eslint-plugin-standard": "^1.3.2"

