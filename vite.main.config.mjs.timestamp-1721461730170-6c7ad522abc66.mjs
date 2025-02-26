// vite.main.config.mjs
import { defineConfig, loadEnv } from "file:///home/robertzeng/project/toyproject/social_market/node_modules/vite/dist/node/index.js";
import alias from "file:///home/robertzeng/project/toyproject/social_market/node_modules/@rollup/plugin-alias/dist/es/index.js";
import * as path from "path";
import copy from "file:///home/robertzeng/project/toyproject/social_market/node_modules/rollup-plugin-copy/dist/index.commonjs.js";

// vite-plugin-close.ts
function ClosePlugin() {
  return {
    name: "ClosePlugin",
    // required, will show up in warnings and errors
    // use this to catch errors when building
    buildEnd(error) {
      if (error) {
        console.error("Error bundling");
        console.error(error);
        process.exit(1);
      } else {
        console.log("Build ended");
      }
    },
    // use this to catch the end of a build without errors
    closeBundle(id) {
      console.log("Bundle closed");
    }
  };
}

// vite.main.config.mjs
import checker from "file:///home/robertzeng/project/toyproject/social_market/node_modules/vite-plugin-checker/dist/esm/main.js";
var __vite_injected_original_dirname = "/home/robertzeng/project/toyproject/social_market";
var vite_main_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      alias(),
      copy({
        targets: [
          { src: "src/sql/**/*", dest: "dist/sql" }
        ]
      }),
      ClosePlugin(),
      checker({
        // e.g. use TypeScript check
        typescript: true
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        // external: [
        //     'sqlite3'
        // ]
      }
    },
    test: {
      include: ["test/vitest/main/*.test.ts"]
    }
  });
};
export {
  vite_main_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5tYWluLmNvbmZpZy5tanMiLCAidml0ZS1wbHVnaW4tY2xvc2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9yb2JlcnR6ZW5nL3Byb2plY3QvdG95cHJvamVjdC9zb2NpYWxfbWFya2V0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9yb2JlcnR6ZW5nL3Byb2plY3QvdG95cHJvamVjdC9zb2NpYWxfbWFya2V0L3ZpdGUubWFpbi5jb25maWcubWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3JvYmVydHplbmcvcHJvamVjdC90b3lwcm9qZWN0L3NvY2lhbF9tYXJrZXQvdml0ZS5tYWluLmNvbmZpZy5tanNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBhbGlhcyBmcm9tIFwiQHJvbGx1cC9wbHVnaW4tYWxpYXNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY29weSBmcm9tICdyb2xsdXAtcGx1Z2luLWNvcHknXG4vLyBpbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5J1xuaW1wb3J0IENsb3NlUGx1Z2luIGZyb20gJy4vdml0ZS1wbHVnaW4tY2xvc2UnXG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJ1xuXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgICBwcm9jZXNzLmVudiA9IHsgLi4ucHJvY2Vzcy5lbnYsIC4uLmxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgfTtcblxuICAgIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgICAgICBwbHVnaW5zOiBbYWxpYXMoKSxcbiAgICAgICAgICAgIGNvcHkoe1xuICAgICAgICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBzcmM6ICdzcmMvc3FsLyoqLyonLCBkZXN0OiAnZGlzdC9zcWwnIH0gICBcbiAgICAgICAgICAgICAgICBdICBcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgQ2xvc2VQbHVnaW4oKSxcbiAgICAgICAgICAgIGNoZWNrZXIoe1xuICAgICAgICAgICAgICAgIC8vIGUuZy4gdXNlIFR5cGVTY3JpcHQgY2hlY2tcbiAgICAgICAgICAgICAgICB0eXBlc2NyaXB0OiB0cnVlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkOiB7XG4gICAgICAgICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWw6IFtcbiAgICAgICAgICAgICAgICAvLyAgICAgJ3NxbGl0ZTMnXG4gICAgICAgICAgICAgICAgLy8gXVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0ZXN0OiB7XG4gICAgICAgICAgICBpbmNsdWRlOlsndGVzdC92aXRlc3QvbWFpbi8qLnRlc3QudHMnXSxcbiAgICAgICAgfVxuICAgIH0pXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9yb2JlcnR6ZW5nL3Byb2plY3QvdG95cHJvamVjdC9zb2NpYWxfbWFya2V0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9yb2JlcnR6ZW5nL3Byb2plY3QvdG95cHJvamVjdC9zb2NpYWxfbWFya2V0L3ZpdGUtcGx1Z2luLWNsb3NlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3JvYmVydHplbmcvcHJvamVjdC90b3lwcm9qZWN0L3NvY2lhbF9tYXJrZXQvdml0ZS1wbHVnaW4tY2xvc2UudHNcIjtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbG9zZVBsdWdpbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnQ2xvc2VQbHVnaW4nLCAvLyByZXF1aXJlZCwgd2lsbCBzaG93IHVwIGluIHdhcm5pbmdzIGFuZCBlcnJvcnNcblxuICAgICAgICAvLyB1c2UgdGhpcyB0byBjYXRjaCBlcnJvcnMgd2hlbiBidWlsZGluZ1xuICAgICAgICBidWlsZEVuZChlcnJvcikge1xuICAgICAgICAgICAgaWYoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBidW5kbGluZycpXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0J1aWxkIGVuZGVkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvLyB1c2UgdGhpcyB0byBjYXRjaCB0aGUgZW5kIG9mIGEgYnVpbGQgd2l0aG91dCBlcnJvcnNcbiAgICAgICAgY2xvc2VCdW5kbGUoaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdCdW5kbGUgY2xvc2VkJylcbiAgICAgICAgICAgIC8vcHJvY2Vzcy5leGl0KDApXG4gICAgICAgIH0sXG4gICAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFdBQVc7QUFDbEIsWUFBWSxVQUFVO0FBQ3RCLE9BQU8sVUFBVTs7O0FDSitVLFNBQVIsY0FBK0I7QUFDblgsU0FBTztBQUFBLElBQ0gsTUFBTTtBQUFBO0FBQUE7QUFBQSxJQUdOLFNBQVMsT0FBTztBQUNaLFVBQUcsT0FBTztBQUNOLGdCQUFRLE1BQU0sZ0JBQWdCO0FBQzlCLGdCQUFRLE1BQU0sS0FBSztBQUNuQixnQkFBUSxLQUFLLENBQUM7QUFBQSxNQUNsQixPQUFPO0FBQ0gsZ0JBQVEsSUFBSSxhQUFhO0FBQUEsTUFDN0I7QUFBQSxJQUNKO0FBQUE7QUFBQSxJQUdBLFlBQVksSUFBSTtBQUNaLGNBQVEsSUFBSSxlQUFlO0FBQUEsSUFFL0I7QUFBQSxFQUNKO0FBQ0o7OztBRGRBLE9BQU8sYUFBYTtBQVBwQixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLDJCQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDekIsVUFBUSxNQUFNLEVBQUUsR0FBRyxRQUFRLEtBQUssR0FBRyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUMsRUFBRTtBQUVoRSxTQUFPLGFBQWE7QUFBQSxJQUNoQixTQUFTO0FBQUEsTUFBQyxNQUFNO0FBQUEsTUFDWixLQUFLO0FBQUEsUUFDRCxTQUFTO0FBQUEsVUFDTCxFQUFFLEtBQUssZ0JBQWdCLE1BQU0sV0FBVztBQUFBLFFBQzVDO0FBQUEsTUFDSixDQUFDO0FBQUEsTUFDRCxZQUFZO0FBQUEsTUFDWixRQUFRO0FBQUE7QUFBQSxRQUVKLFlBQVk7QUFBQSxNQUNkLENBQUM7QUFBQSxJQUNQO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFVLGFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3hDO0FBQUEsSUFDSjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0gsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSWY7QUFBQSxJQUNKO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDRixTQUFRLENBQUMsNEJBQTRCO0FBQUEsSUFDekM7QUFBQSxFQUNKLENBQUM7QUFDTDsiLAogICJuYW1lcyI6IFtdCn0K
