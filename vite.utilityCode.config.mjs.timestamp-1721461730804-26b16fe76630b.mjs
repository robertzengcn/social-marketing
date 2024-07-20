// vite.utilityCode.config.mjs
import { defineConfig, loadEnv } from "file:///home/robertzeng/project/toyproject/social_market/node_modules/vite/dist/node/index.js";
import alias from "file:///home/robertzeng/project/toyproject/social_market/node_modules/@rollup/plugin-alias/dist/es/index.js";
import * as path from "path";
import { nodePolyfills } from "file:///home/robertzeng/project/toyproject/social_market/node_modules/vite-plugin-node-polyfills/dist/index.js";
import commonjs from "file:///home/robertzeng/project/toyproject/social_market/node_modules/vite-plugin-commonjs/dist/index.mjs";

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

// vite.utilityCode.config.mjs
import { esbuildCommonjs } from "file:///home/robertzeng/project/toyproject/social_market/node_modules/@originjs/vite-plugin-commonjs/lib/index.js";
import checker from "file:///home/robertzeng/project/toyproject/social_market/node_modules/vite-plugin-checker/dist/esm/main.js";
var __vite_injected_original_dirname = "/home/robertzeng/project/toyproject/social_market";
var vite_utilityCode_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      alias(),
      nodePolyfills(),
      commonjs(),
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
        external: [
          "sqlite3"
        ]
      }
    },
    test: {
      include: ["test/vitest/utilitycode/*.test.ts"]
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          esbuildCommonjs(["puppeteer-cluster"])
        ]
      }
    }
  });
};
export {
  vite_utilityCode_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS51dGlsaXR5Q29kZS5jb25maWcubWpzIiwgInZpdGUtcGx1Z2luLWNsb3NlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcm9iZXJ0emVuZy9wcm9qZWN0L3RveXByb2plY3Qvc29jaWFsX21hcmtldFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcm9iZXJ0emVuZy9wcm9qZWN0L3RveXByb2plY3Qvc29jaWFsX21hcmtldC92aXRlLnV0aWxpdHlDb2RlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcm9iZXJ0emVuZy9wcm9qZWN0L3RveXByb2plY3Qvc29jaWFsX21hcmtldC92aXRlLnV0aWxpdHlDb2RlLmNvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBhbGlhcyBmcm9tIFwiQHJvbGx1cC9wbHVnaW4tYWxpYXNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnXG5pbXBvcnQgY29tbW9uanMgZnJvbSAndml0ZS1wbHVnaW4tY29tbW9uanMnXG5pbXBvcnQgQ2xvc2VQbHVnaW4gZnJvbSAnLi92aXRlLXBsdWdpbi1jbG9zZS50cydcbmltcG9ydCB7IGVzYnVpbGRDb21tb25qcyB9IGZyb20gJ0BvcmlnaW5qcy92aXRlLXBsdWdpbi1jb21tb25qcydcbmltcG9ydCBjaGVja2VyIGZyb20gJ3ZpdGUtcGx1Z2luLWNoZWNrZXInXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgICBwcm9jZXNzLmVudiA9IHsgLi4ucHJvY2Vzcy5lbnYsIC4uLmxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgfTtcblxuICAgIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgICAgICBwbHVnaW5zOiBbYWxpYXMoKSxcbiAgICAgICAgICAgIG5vZGVQb2x5ZmlsbHMoKSxcbiAgICAgICAgICAgIGNvbW1vbmpzKCksXG4gICAgICAgICAgICBDbG9zZVBsdWdpbigpLFxuICAgICAgICAgICAgY2hlY2tlcih7XG4gICAgICAgICAgICAgICAgLy8gZS5nLiB1c2UgVHlwZVNjcmlwdCBjaGVja1xuICAgICAgICAgICAgICAgIHR5cGVzY3JpcHQ6IHRydWUsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGQ6IHtcbiAgICAgICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBleHRlcm5hbDogW1xuICAgICAgICAgICAgICAgICAgICAnc3FsaXRlMydcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRlc3Q6IHtcbiAgICAgICAgICAgIGluY2x1ZGU6Wyd0ZXN0L3ZpdGVzdC91dGlsaXR5Y29kZS8qLnRlc3QudHMnXSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW1pemVEZXBzOntcbiAgICAgICAgICAgIGVzYnVpbGRPcHRpb25zOntcbiAgICAgICAgICAgICAgcGx1Z2luczpbXG4gICAgICAgICAgICAgICAgZXNidWlsZENvbW1vbmpzKFsncHVwcGV0ZWVyLWNsdXN0ZXInXSkgXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgfSlcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3JvYmVydHplbmcvcHJvamVjdC90b3lwcm9qZWN0L3NvY2lhbF9tYXJrZXRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3JvYmVydHplbmcvcHJvamVjdC90b3lwcm9qZWN0L3NvY2lhbF9tYXJrZXQvdml0ZS1wbHVnaW4tY2xvc2UudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcm9iZXJ0emVuZy9wcm9qZWN0L3RveXByb2plY3Qvc29jaWFsX21hcmtldC92aXRlLXBsdWdpbi1jbG9zZS50c1wiO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENsb3NlUGx1Z2luKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdDbG9zZVBsdWdpbicsIC8vIHJlcXVpcmVkLCB3aWxsIHNob3cgdXAgaW4gd2FybmluZ3MgYW5kIGVycm9yc1xuXG4gICAgICAgIC8vIHVzZSB0aGlzIHRvIGNhdGNoIGVycm9ycyB3aGVuIGJ1aWxkaW5nXG4gICAgICAgIGJ1aWxkRW5kKGVycm9yKSB7XG4gICAgICAgICAgICBpZihlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGJ1bmRsaW5nJylcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQnVpbGQgZW5kZWQnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHVzZSB0aGlzIHRvIGNhdGNoIHRoZSBlbmQgb2YgYSBidWlsZCB3aXRob3V0IGVycm9yc1xuICAgICAgICBjbG9zZUJ1bmRsZShpZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0J1bmRsZSBjbG9zZWQnKVxuICAgICAgICAgICAgLy9wcm9jZXNzLmV4aXQoMClcbiAgICAgICAgfSxcbiAgICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUErVixTQUFTLGNBQWMsZUFBZTtBQUNyWSxPQUFPLFdBQVc7QUFDbEIsWUFBWSxVQUFVO0FBQ3RCLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sY0FBYzs7O0FDSjJVLFNBQVIsY0FBK0I7QUFDblgsU0FBTztBQUFBLElBQ0gsTUFBTTtBQUFBO0FBQUE7QUFBQSxJQUdOLFNBQVMsT0FBTztBQUNaLFVBQUcsT0FBTztBQUNOLGdCQUFRLE1BQU0sZ0JBQWdCO0FBQzlCLGdCQUFRLE1BQU0sS0FBSztBQUNuQixnQkFBUSxLQUFLLENBQUM7QUFBQSxNQUNsQixPQUFPO0FBQ0gsZ0JBQVEsSUFBSSxhQUFhO0FBQUEsTUFDN0I7QUFBQSxJQUNKO0FBQUE7QUFBQSxJQUdBLFlBQVksSUFBSTtBQUNaLGNBQVEsSUFBSSxlQUFlO0FBQUEsSUFFL0I7QUFBQSxFQUNKO0FBQ0o7OztBRGZBLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sYUFBYTtBQVBwQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLGtDQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDekIsVUFBUSxNQUFNLEVBQUUsR0FBRyxRQUFRLEtBQUssR0FBRyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUMsRUFBRTtBQUVoRSxTQUFPLGFBQWE7QUFBQSxJQUNoQixTQUFTO0FBQUEsTUFBQyxNQUFNO0FBQUEsTUFDWixjQUFjO0FBQUEsTUFDZCxTQUFTO0FBQUEsTUFDVCxZQUFZO0FBQUEsTUFDWixRQUFRO0FBQUE7QUFBQSxRQUVKLFlBQVk7QUFBQSxNQUNkLENBQUM7QUFBQSxJQUNQO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFVLGFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3hDO0FBQUEsSUFDSjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0gsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLFFBQ1gsVUFBVTtBQUFBLFVBQ047QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNGLFNBQVEsQ0FBQyxtQ0FBbUM7QUFBQSxJQUNoRDtBQUFBLElBQ0EsY0FBYTtBQUFBLE1BQ1QsZ0JBQWU7QUFBQSxRQUNiLFNBQVE7QUFBQSxVQUNOLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO0FBQUEsUUFDdkM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ04sQ0FBQztBQUNMOyIsCiAgIm5hbWVzIjogW10KfQo=
