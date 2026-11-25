# Astro SSR on AWS Amplify

A minimal [Astro](https://astro.build) site rendered on demand (SSR) and deployed to AWS Amplify Hosting with the community adapter [`astro-aws-amplify`](https://github.com/alexnguyennz/astro-aws-amplify).

## Routes

| Route                | What it shows                                          |
| :------------------- | :----------------------------------------------------- |
| `/`                  | Post list and a per-request server timestamp           |
| `/posts/[slug]`      | Dynamic route resolved at request time (404 if unknown) |
| `/hello?name=...`    | Reads the query string on the server                   |
| `/api/time`          | JSON API endpoint                                      |
| any other path       | Server-rendered `404.astro`                            |

## Commands

| Command        | Action                                              |
| :------------- | :-------------------------------------------------- |
| `pnpm install` | Install dependencies                                |
| `pnpm dev`     | Dev server at `localhost:4321`                      |
| `pnpm build`   | Build Amplify output to `./.amplify-hosting/`       |

`pnpm preview` is not supported by the adapter.

## How the Amplify build works

- `astro.config.mjs` sets `output: 'server'` and `awsAmplify({ runtime: 'nodejs24.x' })`.
- `pnpm build` writes `.amplify-hosting/` containing `static/`, `compute/default/entry.mjs` and `deploy-manifest.json`.
- The compute function needs `node_modules` at runtime. `.npmrc` sets `node-linker=hoisted`, so pnpm creates a flat `node_modules` folder. `amplify.yml` moves that folder into `.amplify-hosting/compute/default`.

## Deploy to Amplify

1. Push this repo to GitHub.
2. In the Amplify console, choose **Create new app**, select **GitHub** and pick the repo and branch.
3. Amplify detects `amplify.yml` at the repo root. Check that the build output directory is `.amplify-hosting`.
4. Under **Advanced settings → Environment variables**, add `_CUSTOM_IMAGE` = `amplify:al2023`. This uses the Amazon Linux 2023 build image, because the old default image's Node version is too old.
5. Optional: under **Advanced settings**, enable **SSR app logs** to send server logs to CloudWatch.
6. Choose **Save and deploy**.

### Environment variables at runtime

Amplify only injects env vars into the build, not into the SSR compute. To use them at runtime, list them in the adapter config. The adapter writes them to a `.env` file next to `entry.mjs`:

```js
adapter: awsAmplify({ runtime: 'nodejs24.x', runtimeEnv: ['DATABASE_URL'] }),
```

### Prerendered pages

If you add `export const prerender = true` to a page, Amplify still sends that path to the compute by default. Add a rewrite rule for it, for example via `awsAmplify({ customRules: [...] })`. See the adapter README for details.
