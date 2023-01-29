import reactplugin from "@vitejs/plugin-react";

export function createConfig<T, F>(config: T): F {
  return {
    plugins: [reactplugin()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: [require.resolve("./setup")],
      ...config,
    },
  } as F;
}
