# Markdown to Beautiful Card Image Converter

这是一个基于 Next.js 开发的网页应用，可以将 Markdown 格式的文本转换成精美的长图片。

## 功能特点

1. Markdown 转换
   - 支持标准 Markdown 语法
   - 实时预览转换效果

2. 卡片样式定制
   - 半透明效果
   - 磨砂玻璃效果
   - 发光边框效果
   - 可自定义卡片边距和圆角

3. 背景效果
   - 三组精选渐变色呼吸动画
     - 自然绿色系：Eton Blue → Laurel Green → Dark Vanilla → Crayola's Gold
     - 温暖橙色系：Chinese Red → Golden Gate Bridge Orange → Chinese Orange → UCLA Gold
     - 深邃蓝色系：Cetacean Blue → Navy Blue → Cadmium Blue
   - 可切换不同渐变组合
   - 平滑过渡动画效果

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (动画效果)
- html-to-image (图片导出)
- React-Markdown (Markdown 渲染)

## 开发计划

1. [x] 项目初始化
2. [ ] 基础页面布局
3. [ ] Markdown 编辑器实现
4. [ ] 卡片样式组件开发
5. [ ] 背景动画效果
6. [ ] 图片导出功能
7. [ ] 响应式适配
8. [ ] 性能优化

## 使用方法

1. 在文本输入区域输入 Markdown 格式的内容
2. 在右侧预览区实时查看效果
3. 选择喜欢的卡片样式和背景效果
4. 点击导出按钮生成图片
5. 下载生成的图片

## 开发环境设置

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。

## 许可证

MIT License

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
