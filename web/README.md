This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Déploiement (Cloudflare Workers)

Le site est un export statique (`output: "export"`) : `npm run build` produit le
dossier `out/`, que le Worker `chatterie-vent-d-automne` sert tel quel (voir
`wrangler.jsonc`). Le Studio Sanity n'est pas concerné : il est hébergé par
Sanity et se déploie avec `npm run deploy` depuis `studio/`.

**Réglages du Worker** (Workers & Pages → chatterie-vent-d-automne → Settings → Builds) :

| Réglage | Valeur |
|---|---|
| Root directory | `web` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

**Variables d'environnement** : dans le bloc *Variables and secrets* de
**Settings → Builds** (et non dans *Runtime variables*, qui ne servent qu'à
l'exécution d'un Worker — ici il n'y en a pas) :

- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SITE_URL` — le domaine définitif (`https://ventsdautomne.com`)
- `NEXT_PUBLIC_WEB3FORMS_KEY` — clé d'accès du formulaire de contact (app.web3forms.com)
- `NODE_VERSION` = `22`

Les variables `NEXT_PUBLIC_` sont intégrées au JavaScript **au moment du build** :
après en avoir modifié une, il faut redéployer.

**Mise à jour du contenu.** Les pages sont figées au build. Pour qu'une
publication dans Sanity apparaisse sur le site :

1. Worker → Settings → Builds → Deploy hooks : créer un hook (branche `main`).
2. Sanity → Manage → API → Webhooks : coller l'URL du hook, trigger Create / Update / Delete.

Comptez une à deux minutes entre la publication et la mise en ligne.

**Domaine secondaire.** `ventsdautomne.fr` doit renvoyer vers `ventsdautomne.com`
(sinon Google voit deux sites identiques et le référencement se dilue). Cloudflare
ne le fait pas via un fichier du dépôt : créer, dans la zone `ventsdautomne.fr`
de Cloudflare, une *Redirect Rule* « tous les hôtes `ventsdautomne.fr` et
`www.ventsdautomne.fr` » → `https://ventsdautomne.com` + chemin conservé, code 301.
La règle ne s'applique qu'au trafic qui passe par Cloudflare : les enregistrements
DNS de `ventsdautomne.fr` et `www` doivent exister et être *proxied* (nuage orange),
par exemple un `A` vers `192.0.2.1`.
