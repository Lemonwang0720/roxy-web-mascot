# 洛琪希网页看板娘 · Roxy Web Mascot

从「王柠檬的自习室」的洛琪希看板娘提取的独立网页挂件。使用 TypeScript 和 WebGL 网格渲染分层插画。项目灵感来自博客里的 Live2D 看板娘，动画由本项目的着色器和动作模块实现。

[查看博客里的洛琪希](https://lemonblog.pages.dev/)

![独立演示使用的小小探险家](public/preview.webp)

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

## 图层与授权

仓库附带原创示例「小小探险家」，可直接运行。替换角色时，把 10 张 1024 × 1536 的透明 WebP 放到 `public/layers/`，沿用文件名和透明画布，并替换 `public/preview.webp`。渲染器中的眼睛、握点和网格关节基于固定坐标，差异较大的角色还需要调整 `src/mascot/renderer.ts`。示例素材可用 Python 和 Pillow 运行 `scripts/draw-demo.py` 重新生成。

代码与仓库内的示例素材采用 [MIT 许可证](LICENSE)。博客上的洛琪希同人贴图与原剧参考图未随仓库分发。

## 参考

- [live2d-widget](https://github.com/stevenjoezhang/live2d-widget) 提供了通过网页脚本嵌入看板娘的发布思路。
- [晓林的博客](https://www.peterjxl.com/) 是原博客的设计参考之一。
