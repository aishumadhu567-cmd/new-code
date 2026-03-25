// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   base: '/',   // 👈 CRITICAL FIX
//   plugins: [react()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//  base: '/hrms/dev/',   // 👈 VERY IMPORTANT
//  plugins: [react()],
//  server: {
//    port: 5173,
//    proxy: {
//      '/api': {
//        target: 'https://dev.hrms.venturebiz.in/api',
//        changeOrigin: true,
//        secure: false
//      }
//    }
//  }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  //base: "/hrms/dev/",
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        // target: "https://dev.hrms.venturebiz.in",
        changeOrigin: true,
        secure: false
      }
    }
  }
})