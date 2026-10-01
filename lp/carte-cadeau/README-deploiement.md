# Landing carte cadeau : mise en ligne (pour Michel)

**URL de production** : https://www.abracadaroom.com/fr/offrir-carte-cadeau/
**Aperçu actuel** : https://proto-hello.vercel.app/lp/carte-cadeau/

Page statique : `index.html`, `lp.js`, `img/`, `fonts/`. Aucun framework, aucun build, aucune base de données.
Il n'y a **rien à modifier dans le code** : GTM, bandeau cookies et tracking se chargent tout seuls sur www.abracadaroom.com (via le conteneur GTM-WF3MVZ).

## Objectif

Mettre la page en ligne à l'URL ci-dessus, de façon à ce que Nicolas puisse ensuite **mettre à jour la page sans repasser par toi** (les modifications partent d'un dépôt GitHub).

## Deux options, à toi de choisir

**Option A : proxy vers Vercel**
- La page est hébergée sur un projet Vercel dédié (offre Pro, usage commercial), alimenté par un dépôt GitHub.
- Sur notre serveur, `/fr/offrir-carte-cadeau/` est servi en reverse proxy vers ce projet. Le visiteur reste sur www.abracadaroom.com.
- Exemple nginx (à adapter) :
  ```nginx
  location /fr/offrir-carte-cadeau/ {
      proxy_pass https://NOM-DU-PROJET.vercel.app/;
      proxy_set_header Host NOM-DU-PROJET.vercel.app;
      proxy_ssl_server_name on;
  }
  ```

**Option B : hébergement sur notre serveur, mise en ligne automatique**
- Les fichiers sont servis depuis notre serveur, dans le dossier correspondant à `/fr/offrir-carte-cadeau/`.
- Un déploiement automatique (GitHub Actions, webhook, etc.) copie les fichiers à chaque mise à jour du dépôt.

Dans les deux cas : **garder la structure du dossier** (les images, polices et `lp.js` sont appelés en chemin relatif).

## Points de contrôle

1. **www obligatoire** : la page doit être servie sur `www.abracadaroom.com`. Les balises GTM (bandeau cookies, GA4…) ne se déclenchent que sur `www.abracadaroom.com/fr/`. Si le site redirige déjà tout vers le www, rien à faire.
2. **« / » final** : un script de la page corrige déjà l'adresse si le « / » manque. Une redirection 301 vers l'URL avec « / » est un plus, pas une obligation.
3. **robots.txt** : ne rien bloquer (le robot Google Shopping doit pouvoir visiter la page). La page est déjà en `noindex, nofollow` par sa balise meta. Ne pas l'ajouter au sitemap.
4. **Compression** (gzip ou brotli) pour HTML, JS et SVG : recommandée.
5. **Cache des images et polices** : à ton choix. Un cache long accélère la page ; en contrepartie, une image remplacée sous le même nom peut rester affichée dans l'ancienne version chez certains visiteurs. Le script `lp.js` porte déjà un numéro de version (`lp.js?v=…`) pour éviter ce problème sur le code. (En option A, c'est Vercel qui gère le cache.)

## Recette après mise en ligne

- La page s'affiche avec ses photos, avec et sans « / » final.
- Le bandeau cookies apparaît.
- `?value=100` présélectionne 100 € et le bouton d'achat pointe vers `…/customization/?value=100&src=lp-carte-cadeau`.
- Prévenir Nicolas : une batterie de tests automatiques sera relancée sur l'URL de production.

Le détail fonctionnel (paramètres d'URL, tracking, GTM, contenus) est dans `NOTES-marketing-tracking.md` : pas nécessaire pour la mise en ligne.
