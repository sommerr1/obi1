<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1avZr5q_0sxPSdGShqrWASKMph9sudsb5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Netlify

Проект настроен для деплоя на Netlify. Доступны два способа:

### Способ 1: Через Netlify UI
1. Зайдите на [netlify.com](https://www.netlify.com) и авторизуйтесь
2. Нажмите "Add new site" → "Import an existing project"
3. Подключите ваш Git репозиторий (GitHub, GitLab, Bitbucket)
4. Netlify автоматически определит настройки из `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Нажмите "Deploy site"

### Способ 2: Через Netlify CLI
1. Установите Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Авторизуйтесь:
   ```bash
   netlify login
   ```
3. Деплой:
   ```bash
   netlify deploy --prod
   ```

### Переменные окружения (если нужны)
Если приложению нужны переменные окружения (например, `GEMINI_API_KEY`):
1. В Netlify Dashboard перейдите в Site settings → Environment variables
2. Добавьте необходимые переменные
3. Они будут доступны во время build через `import.meta.env.VITE_*` (для Vite используйте префикс `VITE_`)

### Важные файлы для Netlify
- `netlify.toml` - конфигурация build и redirects
- `_redirects` - правила перенаправления для SPA (все запросы идут на index.html)
