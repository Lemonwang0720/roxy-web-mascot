# 洛琪希网页看板娘 · Roxy Web Mascot

从「王柠檬的自习室」的洛琪希看板娘提取的独立网页挂件。使用 TypeScript 和 WebGL 网格渲染分层插画。项目灵感来自博客里的 Live2D 看板娘，动画由本项目的着色器和动作模块实现。

[查看博客里的洛琪希](https://lemonblog.pages.dev/)

![洛琪希看板娘](public/preview.webp)

## 本地体验

安装 Node.js 24 或更新版本，然后在仓库目录运行：

```sh
node scripts/serve.mjs
```

打开 http://127.0.0.1:4178/ 。小窗口初次打开时角色默认收起，点击左下角的小憩按钮即可唤醒。角色支持视线跟随、眨眼、呼吸、点头、披风和发辫摆动、点击对白、拖动与小憩。WebGL 不可用时显示静态图，系统开启减少动态效果时会减少动画。

## 接入自己的网页

1. 执行 `node scripts/build.mjs`。
2. 将 `dist/` 上传到自己站点的静态目录，例如 `/mascot/`。
3. 在页面的 `</body>` 前加一行：

```html
<script type="module" src="/mascot/mascot.js"></script>
```

挂件会从脚本所在目录加载样式和贴图。每页挂载一个实例。用 `src/mascot/dialogue.ts` 改对白，重新构建后上传。

## 角色更新

洛琪希是当前已发布的角色。后续可以更新她的贴图、对白和动画，也可能加入《无职转生》的其他角色。新增角色时会把各自的贴图、对白和绑定参数放在独立目录，并让现有的网页接入继续默认加载洛琪希。

## 图层与授权

仓库包含博客实装的洛琪希。动画使用 `public/layers/` 中的 10 张 1024 × 1536 透明 WebP，静态回退图是 `public/preview.webp`。眼睛、握点和网格关节在 `src/mascot/renderer.ts` 中与这套图层对齐。

代码及其文档采用 [MIT 许可证](LICENSE)。洛琪希（Roxy Migurdia）是《无职转生》中的角色。角色相关权利归原权利人，`public/layers/` 和 `public/preview.webp` 中的同人贴图不适用 MIT 许可证。

## 参考

- [live2d-widget](https://github.com/stevenjoezhang/live2d-widget) 提供了通过网页脚本嵌入看板娘的发布思路。
