# @alita/test

> 使用 jest 请安装 @alita/test@0.0.4

```bash
pnpm i vite vitest @alita/test
```

## 集成 vitest

新建或修改 `vite.config.ts`:

```ts
import { createConfig } from "@alita/test/dist/config";
import { defineConfig, UserConfig } from "vitest/config";

// https://vitest.dev/config/
export default defineConfig({
  ...createConfig<UserConfig["test"], UserConfig>({
    // other vitest config
  }),
  // other vite config
});
```

`createConfig` 实现如下:

```ts
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
```

## 编写测试

`App.test.tsx`

```ts
// Imports
import { describe, it, expect } from "vitest";
import { haveText, render, userEvent } from "@alita/test";
// To Test
import App from "./App";

// Tests
describe("Renders main page correctly", async () => {
  /**
   * Resets all renders after each test
   */

  it("Should render the page correctly", async () => {
    // Setup
    render(<App />);
    await haveText("Vite + React");
  });
  /**
   * Passes - shows the button count correctly present
   */
  it("Should show the button count set to 0", async () => {
    // Setup
    await render(<App />);
    await haveText("count is 0");
  });

  /**
   * Passes - clicks the button 3 times and shows the correct count
   */
  it("Should show the button count set to 3", async () => {
    // Setup
    const user = userEvent.setup();
    await render(<App />);
    const button = await haveText("count is 0");
    // Actions
    await user.click(button as HTMLElement);
    await user.click(button as HTMLElement);
    await user.click(button as HTMLElement);

    // Post Expectations
    expect(button?.innerHTML).toBe("count is 3");
  });
});
```
