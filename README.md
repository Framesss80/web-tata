# TuEmpresa — Landing Page

Landing page estática para empresa de servicios, desplegada en **Cloudflare Pages**.

## 🚀 Demo

> URL de Cloudflare Pages aparecerá aquí tras el despliegue

## 📁 Estructura

```
/
├── index.html      # Página principal
├── style.css       # Diseño y sistema de tokens
├── main.js         # Interactividad (JS vanilla)
└── .gitignore
```

## 🛠️ Desarrollo local

Abre `index.html` directamente en tu navegador, o usa una extensión como **Live Server** en VS Code.

## ☁️ Despliegue — Cloudflare Pages

1. Haz push al repositorio de GitHub
2. Ve a [Cloudflare Pages](https://dash.cloudflare.com/) → Workers & Pages → Pages
3. Conecta tu repo de GitHub
4. Configuración del build:
   - **Framework**: None
   - **Build command**: *(vacío)*
   - **Output directory**: `/`
5. Clic en **Save and Deploy**

Cloudflare detecta automáticamente cada push a `main` y despliega los cambios.

## ✏️ Personalización

Busca y reemplaza `TuEmpresa` / `tuempresa.com` con el nombre real de tu empresa.

## 📝 Licencia

MIT
