# 🌿 AI叶子训练师

> 面向小学 1-2 年级研学活动的 AI 教学网页

一个可爱、温暖、童趣的 Web 应用，让孩子在农场研学活动中通过观察、分类、采样、测试来理解 AI 如何从样本中学习。

## ✨ 功能特色

- 🤖 **教AI学叶子** — 用摄像头拍照，让 AI 学习 4 种叶子形态
- 🧠 **本地AI推理** — 基于 MobileNet + KNN，所有计算在浏览器完成
- 📸 **摄像头采集** — 支持平板后置摄像头，适合现场操作
- 💾 **离线数据** — IndexedDB 保存训练数据，刷新可恢复
- 🎨 **童趣UI** — 可爱机器人吉祥物、叶子插画、动画反馈
- 📊 **活动报告** — 生成训练记录卡，适合拍照分享

## 🛠 技术栈

- **框架**: React 19 + TypeScript + Vite
- **AI**: TensorFlow.js + MobileNet + KNN Classifier
- **存储**: Dexie.js (IndexedDB)
- **部署**: Cloudflare Pages / Vercel

## 📁 项目结构

```
src/
├── components/          # 共享UI组件
│   ├── AppButton.tsx    # 统一按钮组件
│   ├── CameraView.tsx   # 摄像头视图
│   ├── ConfirmDialog.tsx # 确认对话框
│   ├── LeafIcon.tsx     # 叶子SVG图标
│   ├── LoadingOverlay.tsx # 加载遮罩
│   ├── MascotBot.tsx    # 机器人吉祥物
│   ├── PageShell.tsx    # 页面外壳布局
│   └── ProgressBar.tsx  # 进度条
├── pages/               # 页面组件
│   ├── StartPage.tsx    # 开始页
│   ├── SetupPage.tsx    # 准备页
│   ├── CollectPage.tsx  # 采样页
│   ├── TrainingPage.tsx # 训练动画页
│   ├── ChallengePage.tsx # 挑战页
│   ├── MistakePage.tsx  # AI犯错分析页
│   ├── RestorePage.tsx  # 恢复训练页
│   └── ReportPage.tsx   # 报告页
├── hooks/
│   └── useCamera.ts     # 摄像头Hook
├── lib/
│   ├── classifier.ts    # AI分类器核心
│   ├── constants.ts     # 常量定义
│   ├── db.ts            # IndexedDB数据库
│   └── imageUtils.ts    # 图片工具
├── App.tsx              # 主应用入口
└── main.tsx             # React挂载点

public/
└── samples/             # 预置样本图片（可替换为真实叶子照片）
```

## 🚀 本地运行

### 前提条件

- Node.js 18+
- npm 或 yarn

### 安装与启动

```bash
# 克隆项目
cd leafai

# 安装依赖
npm install

# 启动开发服务器（需要HTTPS才能使用摄像头）
npm run dev
```

### 启用 HTTPS（本地开发摄像头必需）

```bash
# 使用 mkcert 生成本地证书
brew install mkcert  # macOS
mkcert -install
mkcert localhost

# 然后使用 vite 配置 HTTPS
# 或使用 ngrok / localtunnel 等工具
npx localtunnel --port 5173
```

也可以在 `vite.config.ts` 中配置：

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
    },
  },
})
```

## 📦 部署

### Cloudflare Pages

1. Fork 或推送到 GitHub
2. 在 Cloudflare Pages 中连接仓库
3. 设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18`
4. Cloudflare Pages 自动提供 HTTPS，摄像头可直接使用

### Vercel

1. Fork 或推送到 GitHub
2. 在 Vercel 中导入项目
3. 框架预设选 **Vite**
4. 设置保持默认即可
5. Vercel 自动提供 HTTPS

## 📸 预置样本

将真实叶子照片放在 `public/samples/` 目录中，命名格式：

```
long_leaf_1.jpg, long_leaf_2.jpg, ... long_leaf_4.jpg
round_leaf_1.jpg, round_leaf_2.jpg, ... round_leaf_4.jpg
tooth_leaf_1.jpg, tooth_leaf_2.jpg, ... tooth_leaf_4.jpg
big_leaf_1.jpg, big_leaf_2.jpg, ... big_leaf_4.jpg
```

建议每类 4-8 张不同角度的清晰叶子照片（512x512 或更大）。

## 🎯 叶子类别

| 类别 | 名称 | 说明 |
|------|------|------|
| `long_leaf` | 长条叶 | 又长又窄，像小剑一样 |
| `round_leaf` | 圆圆叶 | 形状比较圆 |
| `tooth_leaf` | 锯齿叶 | 边缘像小牙齿 |
| `big_leaf` | 大菜叶 | 又大又宽，比较柔软 |

## 🔒 隐私说明

- 所有叶子照片仅用于现场 AI 训练演示
- 数据保存在本设备浏览器中，**不上传服务器**
- 活动结束后，老师可一键清除训练数据

## 📄 License

MIT
