import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "world"
  },
  anchor: null,
  hydrate: false,
  intro: false
});

export default app;
