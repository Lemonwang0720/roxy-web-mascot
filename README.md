# 洛琪希网页看板娘 · Roxy Web Mascot

这个项目的灵感来自 [stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)。受它在网页角落添加互动角色的做法启发，我为自己的博客做了一只洛琪希，用 WebGL 给分层插画加上视线、表情和动作。

[**在线体验**](https://lemonwang0720.github.io/roxy-web-mascot/) · [**下载 v0.1.0**](https://github.com/Lemonwang0720/roxy-web-mascot/releases/download/v0.1.0/roxy-web-mascot-v0.1.0.zip) · [**接入自己的网页**](#接入自己的网页)

![洛琪希跟随指针、点头和回应点击的实机演示](docs/roxy-demo.gif)

移动鼠标，洛琪希会转动视线。点她可以触发点头、表情和对白，靠近时可以拖动、归位或让她小憩。也可以在 [王柠檬的自习室](https://lemonblog.pages.dev/) 体验博客里的版本。

## 接入自己的网页

1. 下载 ZIP，把解压后的文件上传到网站的静态目录，例如 `/mascot/`。保留脚本、样式、模块和贴图的目录结构。
2. 在 HTML 或博客的公共布局中加入下面这行脚本。

```html
<script type="module" src="/mascot/mascot.js"></script>
```

然后打开站点页面。也可以访问 `/mascot/` 查看自带的演示。ZIP 已包含构建产物，普通静态服务器即可托管。浏览器无法使用 WebGL 时，挂件会显示透明静态图。开启系统的「减少动态效果」时，挂件会减少动画。

## 自定义位置和对白

脚本标签可以加上这些可选属性。

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

| 属性                   | 默认值   | 用途                                                                                             |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `data-roxy-start`      | `auto`   | 窄窗口首次进入时收起。可设为 `expanded` 或 `collapsed`。访客手动休息或唤醒后，浏览器会记住选择。 |
| `data-roxy-position`   | `left`   | 停靠在左下角。设为 `right` 时停靠在右下角。归位操作会回到设定的一侧。                            |
| `data-roxy-top-offset` | `0`      | 给固定页眉预留的高度，单位为像素，用于计算拖动范围和对白位置。                                   |
| `data-roxy-dialogue`   | 内置对白 | 自定义对白的 JSON 地址。修改该文件后刷新页面即可生效。                                           |

例如，将下面的内容保存为 `/mascot/dialogue.json`。

```json
{
  "arrival": "欢迎来到我的博客！",
  "wake": "我醒啦，继续读吧。",
  "rest": ["我先小睡一会儿。"],
  "click": ["你好呀！", "想聊点什么？"]
}
```

`arrival` 和 `wake` 接受一条对白，也可以按 `night`、`morning`、`noon`、`afternoon`、`evening` 分时段填写。省略的字段使用内置对白。

## 从源码运行

安装 Node.js 24 或更新版本，进入仓库目录后运行下面的命令。

```sh
npm run dev
```

打开 [http://127.0.0.1:4178/](http://127.0.0.1:4178/) 体验。运行 `npm run build` 会将可部署文件输出到 `dist/`。

- [`src/mascot/`](src/mascot/) 包含渲染、动作、定位和对白逻辑。
- [`public/layers/`](public/layers/) 包含 11 张 1024 × 1536 的透明 WebP。杖身和握手各自绘制，并共享同一个握点。
- [`public/preview.webp`](public/preview.webp) 是挂件的透明静态回退图。

洛琪希是当前发布的角色。后续会继续迭代她的贴图、对白和动画，也可能加入《无职转生》的其他角色。新增角色时，已有接入默认仍加载洛琪希。

## 角色展示图

<img src="docs/roxy-cover.png" width="420" alt="洛琪希看板娘的深色背景展示图">

## 授权

代码与文档文字采用 [MIT 许可证](LICENSE)。洛琪希（Roxy Migurdia）是《无职转生》中的角色。角色及配图的相关权利归各自权利人，下载包附有[素材说明](public/ARTWORK.txt)。
