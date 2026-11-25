// GitHub Pages는 SPA 라우팅을 지원하지 않으므로, 404.html을 index.html과 동일하게 만들어
// /projects/xxx 같은 경로로 직접 접속·새로고침해도 앱이 뜨도록 합니다.
import { copyFileSync } from "node:fs"

copyFileSync("dist/index.html", "dist/404.html")
console.log("✓ dist/404.html created (SPA fallback)")
