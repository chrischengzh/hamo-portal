# Hamo Portal

Hamo AI 心理治疗平台的门户网站。

## 技术栈

- React 18
- Vite 5
- Tailwind CSS 3
- Lucide React (图标)

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 部署到 Vercel

### 方式一：通过 Vercel CLI

1. 安装 Vercel CLI:
```bash
npm install -g vercel
```

2. 登录 Vercel:
```bash
vercel login
```

3. 部署项目:
```bash
vercel
```

4. 生产部署:
```bash
vercel --prod
```

### 方式二：通过 Git 集成

1. 将代码推送到 GitHub/GitLab/Bitbucket

2. 访问 [Vercel Dashboard](https://vercel.com/dashboard)

3. 点击 "New Project"

4. 导入你的 Git 仓库

5. Vercel 会自动检测 Vite 项目并配置构建设置:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. 点击 "Deploy" 开始部署

### 环境变量（如需要）

在 Vercel Dashboard 中添加环境变量:
- Settings > Environment Variables

## 项目结构

```
hamo-portal/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── main.jsx         # React 入口点
│   └── index.css        # 全局样式
├── index.html           # HTML 模板
├── package.json         # 项目依赖
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
├── postcss.config.js    # PostCSS 配置
├── vercel.json          # Vercel 部署配置
└── README.md            # 项目文档
```

## License

Private
