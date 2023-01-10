/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/12/09 14:57
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 项目初始化配置文件
 */

module.exports = (frame) => {
    if (frame === "vue") {
        return {
            "name": "",
            "version": "",
            "description": "",
            "main": "index.js",
            "dependencies": {
                "@babel/runtime-corejs3": "^7.16.3",
                "@vue/server-renderer": "^3.2.26",
                "@skysong/magic-cube": "^1.0.275",
                "axios": "^0.26.0",
                "pinia": "^2.0.11",
                "tiny-emitter": "^2.1.0",
                "vue": "^3.2.27",
                "vue-router": "^4.0.12"
            },
            "devDependencies": {
                "@babel/core": "^7.16.0",
                "@babel/plugin-proposal-class-properties": "^7.18.6",
                "@babel/plugin-proposal-decorators": "^7.18.10",
                "@babel/plugin-syntax-decorators": "^7.16.0",
                "@babel/plugin-syntax-object-rest-spread": "^7.8.3",
                "@babel/plugin-transform-runtime": "^7.16.4",
                "@babel/plugin-transform-typescript": "^7.16.1",
                "@babel/preset-env": "^7.16.0",
                "@babel/preset-typescript": "^7.16.0",
                "@vue/babel-plugin-jsx": "^1.1.1",
                "babel-loader": "^8.2.2",
                "ts-loader": "^9.2.6",
                "typescript": "^4.4.4",
                "css-loader": "^6.5.1",
                "sass-loader": "^12.3.0",
                "string-replace-loader": "^3.1.0",
                "webpack-cli": "^4.9.1"
            },
            "scripts": {
                "dev": "mc-cli start -v -vapi -vtools",
                "prod": "mc-cli start -v -vapi -vtools -pro",
                "build": "mc-cli build -v"
            },
            "keywords": [
                "magic-cube",
                "vue",
                "ssr",
                "nodejs"
            ],
            "author": "",
            "license": "MIT"
        }
    }

    return {
        "name": "",
        "version": "",
        "description": "",
        "main": "index.js",
        "dependencies": {
            "@babel/runtime-corejs3": "^7.16.3",
            "@skysong/magic-cube": "^1.0.275",
            "@types/react-dom": "^17.0.11",
            "axios": "^0.24.0",
            "react": "^17.0.2",
            "react-dom": "^17.0.2",
            "react-router-dom": "^6.1.1",
            "redux": "^4.1.2",
            "swr": "^1.1.2"
        },
        "devDependencies": {
            "@babel/core": "^7.16.0",
            "@babel/plugin-proposal-class-properties": "^7.18.6",
            "@babel/plugin-syntax-decorators": "^7.16.0",
            "@babel/plugin-syntax-object-rest-spread": "^7.8.3",
            "@babel/plugin-transform-runtime": "^7.16.4",
            "@babel/plugin-transform-typescript": "^7.16.1",
            "@babel/preset-env": "^7.16.0",
            "@babel/preset-react": "^7.16.0",
            "@babel/preset-typescript": "^7.16.0",
            "@types/node": "^18.11.9",
            "babel-loader": "^8.2.2",
            "ts-loader": "^9.2.6",
            "typescript": "^4.4.4",
            "css-loader": "^6.5.1",
            "sass-loader": "^12.3.0",
            "string-replace-loader": "^3.1.0",
            "webpack-cli": "^4.9.1"
        },
        "scripts": {
            "dev": "mc-cli start --react",
            "prod": "mc-cli start --react -pro",
            "build": "mc-cli build --react"
        },
        "keywords": [
            "react",
            "ssr",
            "nodejs",
            "express"
        ],
        "author": "",
        "license": "MIT"
    }
}