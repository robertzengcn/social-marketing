// vite.utilityCode.config.mjs
import { defineConfig, loadEnv } from "file:///home/robertzeng/project/toyproject/social_market/node_modules/vite/dist/node/index.js";
import alias from "file:///home/robertzeng/project/toyproject/social_market/node_modules/@rollup/plugin-alias/dist/es/index.js";
import * as path from "path";
import { nodePolyfills } from "file:///home/robertzeng/project/toyproject/social_market/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "/home/robertzeng/project/toyproject/social_market";
var vite_utilityCode_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [
      alias(),
      nodePolyfills()
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
    }
  });
};
export {
  vite_utilityCode_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS51dGlsaXR5Q29kZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcm9iZXJ0emVuZy9wcm9qZWN0L3RveXByb2plY3Qvc29jaWFsX21hcmtldFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcm9iZXJ0emVuZy9wcm9qZWN0L3RveXByb2plY3Qvc29jaWFsX21hcmtldC92aXRlLnV0aWxpdHlDb2RlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcm9iZXJ0emVuZy9wcm9qZWN0L3RveXByb2plY3Qvc29jaWFsX21hcmtldC92aXRlLnV0aWxpdHlDb2RlLmNvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBhbGlhcyBmcm9tIFwiQHJvbGx1cC9wbHVnaW4tYWxpYXNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBub2RlUG9seWZpbGxzIH0gZnJvbSAndml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHMnXG5cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xuICAgIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKSB9O1xuXG4gICAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgICAgIHBsdWdpbnM6IFthbGlhcygpLFxuICAgICAgICAgICAgbm9kZVBvbHlmaWxscygpLF0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgICAgICAgICAgICAgICdzcWxpdGUzJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVzdDoge1xuICAgICAgICAgICAgaW5jbHVkZTpbJ3Rlc3Qvdml0ZXN0L3V0aWxpdHljb2RlLyoudGVzdC50cyddLFxuICAgICAgICB9XG4gICAgfSlcbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQStWLFNBQVMsY0FBYyxlQUFlO0FBQ3JZLE9BQU8sV0FBVztBQUNsQixZQUFZLFVBQVU7QUFDdEIsU0FBUyxxQkFBcUI7QUFIOUIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxrQ0FBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3pCLFVBQVEsTUFBTSxFQUFFLEdBQUcsUUFBUSxLQUFLLEdBQUcsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFFaEUsU0FBTyxhQUFhO0FBQUEsSUFDaEIsU0FBUztBQUFBLE1BQUMsTUFBTTtBQUFBLE1BQ1osY0FBYztBQUFBLElBQUU7QUFBQSxJQUNwQixTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFVLGFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3hDO0FBQUEsSUFDSjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0gsV0FBVztBQUFBLE1BQ1gsZUFBZTtBQUFBLFFBQ1gsVUFBVTtBQUFBLFVBQ047QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNGLFNBQVEsQ0FBQyxtQ0FBbUM7QUFBQSxJQUNoRDtBQUFBLEVBQ0osQ0FBQztBQUNMOyIsCiAgIm5hbWVzIjogW10KfQo=
