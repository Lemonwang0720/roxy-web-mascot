# 洛琪希网页看板娘 · Roxy Web Mascot

把洛琪希放到你的博客角落。她会跟随鼠标、眨眼、点头和回应点击，可拖动，也可以让她小憩。挂件使用 WebGL 渲染分层插画，可作为静态资源自托管。

An interactive, self-hosted WebGL mascot widget for blogs and static websites.

[**在线体验**](https://lemonwang0720.github.io/roxy-web-mascot/) · [**下载即用**](https://github.com/Lemonwang0720/roxy-web-mascot/releases/download/v0.1.0/roxy-web-mascot-v0.1.0.zip) · [**一行接入**](#接入自己的网页)

![洛琪希跟随指针、点头和回应点击的实机演示](docs/roxy-demo.gif)

## 接入自己的网页

1. 下载 ZIP，把解压后的文件部署到站点的静态目录，例如 `/mascot/`。浏览器里打开该目录的 `index.html` 可以试用，部署成品只需要静态服务器。
2. 把下面这行加到自己的 HTML，或者博客所有页面共用的布局模板。保留 `mascot.js`、CSS、`modules/` 和贴图之间的目录关系。

```html
<script type="module" src="/mascot/mascot.js"></script>
```

挂件会自动加载样式和贴图，每页挂载一个实例。WebGL 不可用时显示静态图，系统开启减少动态效果时会减少动画。

### 自定义

```html
<script
  type="module"
  src="/mascot/mascot.js"
  data-roxy-start="expanded"
  data-roxy-position="right"
  data-roxy-top-offset="64"
  data-roxy-dialogue="/mascot/dialogue.json"
></script>
```

| 选项                   | 默认     | 用途                                                                                     |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `data-roxy-start`      | `auto`   | 窄窗口首次进入时收起。也可选 `expanded` 或 `collapsed`，访客手动休息和唤醒的选择会保存。 |
| `data-roxy-position`   | `left`   | 默认停在左下角，可设为 `right`。拖动后可用归位按钮恢复。                                 |
| `data-roxy-top-offset` | `0`      | 固定页眉的高度，单位为像素，供拖动范围和对白位置计算使用。                               |
| `data-roxy-dialogue`   | 内置对白 | 可选 JSON 文件地址。编辑对应文件并上传即可更改对白。                                     |

对白 JSON 示例：

```json
{
  "arrival": "欢迎来到我的博客！",
  "wake": "我醒啦，继续读吧。",
  "rest": ["我先小睡一会儿。"],
  "click": ["你好呀！", "想聊点什么？"]
}
```

`arrival` 和 `wake` 可以传一条对白，也可以按 `night`、`morning`、`noon`、`afternoon`、`evening` 分时段填写。省略的字段使用内置对白。

## 从源码运行

使用 Node.js 24 或更新版本。在仓库目录执行 `npm run dev`，打开 http://127.0.0.1:4178/ 。执行 `npm run build` 会将可部署文件输出到 `dist/`。

## 角色更新

洛琪希是当前已发布的角色。后续可以更新她的贴图、对白和动画，也可能加入《无职转生》的其他角色。新增角色时会把各自的贴图、对白和绑定参数放在独立目录，并让现有的网页接入继续默认加载洛琪希。

## 图层与授权

仓库包含博客实装的洛琪希。动画使用 `public/layers/` 中的 11 张 1024 × 1536 透明 WebP，静态回退图是 `public/preview.webp`。眼睛、握点和网格关节在 `src/mascot/renderer.ts` 中与这套图层对齐。辫子和衣服位于杖身后方，握手覆盖杖柄，两者共享握点和动画变换。

代码及其文档采用 [MIT 许可证](LICENSE)。洛琪希（Roxy Migurdia）是《无职转生》中的角色。角色相关权利归原权利人，动画贴图、静态回退图和 README 展示图均不适用 MIT 许可证。

## 参考

- [live2d-widget](https://github.com/stevenjoezhang/live2d-widget) 提供了通过网页脚本嵌入看板娘的发布思路。
- [王柠檬的自习室](https://lemonblog.pages.dev/) 是挂件最初使用的博客。

## 角色展示图

<img src="docs/roxy-cover.png" width="420" alt="洛琪希看板娘的深色背景展示图">
