import { createEffect, createSignal, Match, Switch } from "solid-js";
import { TbDeviceLaptop, TbMoon, TbSun } from "solid-icons/tb";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function ThemeToggle() {
  const [theme, setTheme] = createSignal<"light" | "dark" | "system">("light");

  const isDarkMode = document.documentElement.classList.contains("dark");
  setTheme(isDarkMode ? "dark" : "light");
  const preferDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  createEffect(() => {
    const isDark =
      theme() === "dark" ||
      (theme() === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger as={Button} variant="ghost" size="sm" class="w-9" px-0>
        <Switch>
          <Match when={theme() === "light" || (theme() === "system" && !preferDarkMode)}>
            <TbSun class="size-6 motion-scale-in-75 -motion-rotate-in-[20deg] motion-duration-300 motion-ease-spring-bounciest motion-ease-spring-smooth/scale" />
          </Match>
          <Match when={theme() === "dark" || (theme() === "system" && preferDarkMode)}>
            <TbMoon class="size-6 motion-scale-in-75 -motion-rotate-in-[20deg] motion-duration-300 motion-ease-spring-bounciest motion-ease-spring-smooth/scale" />
          </Match>
        </Switch>
        <span class="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setTheme("light")}>
          <TbSun class="mr-2 size-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>
          <TbMoon class="mr-2 size-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")}>
          <TbDeviceLaptop class="mr-2 size-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
