# Svelte + TS + Vite + Express

> Customized `npm init vite` with **Svelte + TS** including an **Express** backend.

---

### Pros

-   Speed and convenience of **Vite**.
-   Everything running under **one address**.
    -   Just **one port** to forward!
-   **Easier deploy**, requires running **one command**.

### Cons

-   Coupled frontend and backend.
-   Somebody developing just the frontend also clones the backend and vice versa.

### Workspace setup

-   Frontend files can be found under `client`.
-   Backend files can be found under `server`.
-   Shared files can be found under `shared`.
-   `.gitignore` ignores `dist` in **all of them**!

### NPM scripts

-   `npm run dev` for just frontend dev server.
-   `npm run build` for just building the frontend.
-   `npm run preview` for building and then hosting the built files.
    -   Do not use this for production, useful for checking network request sizes.
-   `npm run check` for checking svelte files.
-   `npm run serve-dev` for running both the frontend and backend on a dev server.
-   `npm run serve-prod` for building and then running both the front end and backend.

---

Built with ~~**_hatred towards TS_**~~ 💖 by **null**.
