Here's the content reformatted in Markdown:

```markdown
# Deploying Backend and Frontend on Vercel

## 📌 1. Setting up Backend (Express.js)

### 1.1. Install Vercel CLI
```sh
npm install -g vercel
```

### 1.2. Add vercel.json to the backend folder:
```json
{
  "version": 2,
  "builds": [
    { "src": "index.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.js" }
  ]
}
```

### 1.3. Add to package.json:
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

### 1.4. Deploy Backend:
```sh
cd backend
vercel
```

## 📌 2. Setting up Frontend (React)

### 2.1. Add vercel.json to the frontend folder:
```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### 2.2. Add to package.json:
```json
{
  "scripts": {
    "build": "react-scripts build"
  }
}
```

### 2.3. Deploy Frontend:
```sh
cd frontend
vercel
```

✅ Done!

Now your project is available at the link provided by Vercel. 🎉
```
