# Landing page carte cadeau AbracadaRoom : déploiement

Landing page de conversion réservée au **trafic payant** (Google Shopping, Google Ads Search).
Objectif unique : envoyer vers le tunnel d'achat de la carte cadeau avec le bon montant pré-rempli.
Ce n'est pas une page SEO : elle est en `noindex, nofollow`.

Maquette en ligne : https://proto-hello.vercel.app/lp/carte-cadeau/

## Contenu du dossier

```
index.html   HTML + CSS intégré + bloc de configuration (LP_CONFIG)
lp.js        tout le comportement (montant, paramètres d'URL, tracking, popup avis, bouton collant), sans dépendance
fonts/       Barlow 400 / 600 / 700, jeu latin, woff2 (licence OFL)
img/         photos en AVIF + WebP, plusieurs largeurs, et logo SVG
```

Aucun framework, aucun build. Le dossier se dépose tel quel.

## 1. Mise en ligne

1. Copier le dossier entier sur abracadaroom.com, à l'URL retenue (par exemple `/fr/lp/carte-cadeau/`).
   Les images, polices et `lp.js` sont appelés **en relatif** depuis `index.html` : garder la structure du dossier.
   Tous les **liens** (href) sont en URL absolue.
2. Dans `index.html`, bloc `window.LP_CONFIG` en tête de page : c'est le **seul endroit à modifier**.

   | Clé | Rôle |
   |---|---|
   | `pageUrl` | URL définitive de la page **(à renseigner)** |
   | `checkoutUrl` | tunnel d'achat de la carte cadeau |
   | `secondaryUrl` | mini-boutique bons cadeaux (sortie secondaire) |
   | `src` | valeur du paramètre `src` ajouté aux liens sortants (`lp-carte-cadeau`) |
   | `gtmId` | conteneur GTM (`GTM-WF3MVZ`). Si l'ID change, le modifier aussi dans la balise `<noscript>` juste après `<body>` |
   | `gtmDomain` | GTM ne se charge que sur ce domaine (`abracadaroom.com`), pour que les tests et la maquette ne polluent pas GA4 et Google Ads |

3. **robots.txt : ne rien bloquer.** Le robot Google Shopping doit pouvoir visiter la page. La non-indexation passe uniquement par la balise `<meta name="robots" content="noindex, nofollow">`.
4. Ne pas ajouter la page au sitemap.
   **Adresse avec « / » final obligatoire** : les ressources sont en relatif. Un petit script en tête de page recharge l'adresse avec « / » si besoin (paramètres conservés), mais le mieux est une redirection 301 côté serveur vers l'URL avec « / », et d'utiliser cette URL exacte dans Google Ads et Merchant Center.
5. Serveur : activer la compression (gzip ou brotli) pour HTML, CSS, JS et SVG, et un cache long (1 an) sur `img/` et `fonts/`. En local sans compression, le LCP mobile est à 2,6 s ; la compression doit le faire passer sous 2,5 s.

## 2. Bandeau cookies (obligatoire)

La page charge GTM, donc GA4, Google Ads et les autres balises du conteneur.
Le bandeau cookies du site (cookieconsent) est chargé par le site lui-même, **pas par GTM** : la landing n'en a donc pas.
**Il faut y intégrer le même bandeau et le même paramétrage de consentement que sur le reste du site** avant la mise en ligne.

## 3. Paramètres d'URL de la page

| Paramètre | Effet |
|---|---|
| `value` | 50, 100, 150, 200, 250 ou 300 : le bouton est sélectionné. Autre nombre supérieur ou égal à 20 : « Autre montant » s'ouvre pré-rempli (arrondi à l'euro). Absent, inférieur à 20 ou non numérique : 150. |
| `occasion` | `noel`, `anniversaire`, `amoureux`, `derniere-minute`, `spa`, `famille` : change le titre du hero. Absent ou inconnu : titre par défaut. Les messages de Noël de « Besoin d'inspiration pour votre mot ? » ne s'affichent que sans occasion ou avec `noel`. |
| `utm_*`, `gclid`, `gbraid`, `wbraid`, `fbclid` | conservés et transmis au lien d'achat et au lien de la mini-boutique, avec `src=lp-carte-cadeau` |

Exemple de lien d'achat produit :
`https://gift.abracadaroom.com/fr/giftcards/customization/?value=100&utm_source=google&gclid=XXX&src=lp-carte-cadeau`

Les 6 montants sont écrits en dur dans le HTML (vérification de prix Google Merchant Center). Le JS ne fait que présélectionner.

## 4. Tracking (dataLayer)

| Événement | Quand | Paramètres |
|---|---|---|
| `lp_view` | au chargement | `value`, `occasion` (`default` si absente ou inconnue) |
| `select_amount` | à chaque changement de montant | `value` |
| `click_cta` | clic sur un bouton d'achat, ou sur un bouton « Offrir pour… » des occasions | `value`, `occasion`, `position` (`hero`, `sticky`, `occasion`, `final`) |
| `click_secondary` | clic vers la mini-boutique bons cadeaux | aucun |
| `faq_open` | ouverture d'une question de la FAQ | `question` (intitulé) |

`click_cta` avec `position: cagnotte` : clic sur « Créer une cagnotte » (bloc « Un cadeau à plusieurs ? »).

### Ce qui est déjà en place (constaté le 24/09/2026)

| Site | Conteneur GTM | GA4 | Google Ads |
|---|---|---|---|
| Landing (www.abracadaroom.com) | GTM-WF3MVZ | G-L7BYJ657F6 | AW-955531351 |
| Tunnel gift.abracadaroom.com (CNAME mhi.bonkdo.com) | GTM-PL2WTCN + GTM-TD85XBF (Bonkdo) | G-NDQTTQ6S8F | conversion AW-955531351 présente dans GTM-PL2WTCN |

- **Google Ads** : rien à faire. La conversion d'achat de votre compte est déclenchée dans le tunnel, la landing transmet `gclid` et `utm_*` au lien d'achat, et les deux sites partagent le domaine abracadaroom.com. À vérifier dans Google Ads : cette conversion est bien l'action « Achat » principale.
- **GA4** : les visites de la landing sont dans G-L7BYJ657F6, les achats dans G-NDQTTQ6S8F. Pour voir le parcours complet dans une seule propriété, ajouter G-L7BYJ657F6 dans GTM-PL2WTCN.
- **`src=lp-carte-cadeau`** : permet de distinguer, dans le GA4 du tunnel, les visites venues de la landing de celles venues de /fr/carte-cadeau-insolite/. À demander à Bonkdo : ce paramètre est-il conservé jusqu'à la confirmation d'achat ?

### Optionnel : exploiter les événements de la landing dans GA4 (GTM-WF3MVZ)

Pour exploiter les 5 événements ci-dessus dans GA4 :

1. **Variables** (Variables > Nouvelle > Variable de couche de données) : `value`, `occasion`, `position`, `question`. Nommer chacune `DLV - <nom>`.
2. **Déclencheurs** (Déclencheurs > Nouveau > Événement personnalisé), un par événement : `lp_view`, `select_amount`, `click_cta`, `click_secondary`, `faq_open`.
3. **Balises** (Balises > Nouvelle > Google Analytics : événement GA4), une par événement, avec l'ID de mesure G-L7BYJ657F6, le même nom d'événement et les paramètres correspondants (`value` = `{{DLV - value}}`, etc.).
4. Dans GA4 : Administration > Définitions personnalisées, créer les dimensions `occasion`, `position` et `question` pour les voir dans les rapports.
5. Tester en mode Aperçu GTM sur la page en ligne, puis publier.

## 5. Contenus à tenir à jour

- **Prix de la galerie** (« À partir de … € la nuit ») : ce sont ceux des hébergements en photo (nommés dans la légende). À vérifier régulièrement.
- **Avis** : avis réels Avis Vérifiés, recopiés tels quels (extraits signalés par « (…) »). Ne jamais les modifier ni en inventer.
- **Médias** (« Vu à la télé et dans la presse ») : noms en texte, remplaçables par les logos officiels.
- **Cagnotte** : le bouton « Créer une cagnotte » pointe vers `https://gift.abracadaroom.com/fr/giftcards/#money_pot` (paramètres de campagne et `src` ajoutés par le script).
- **Photos** : 4:3 pour la galerie (400 et 800 px de large), hero en deux recadrages (mobile 1,7:1 et desktop 1,25:1) avec le couple toujours entier. Garder les mêmes noms de fichiers ou mettre à jour les `srcset`.
- **CGV** : le lien « CGV » du pied de page pointe vers les conditions générales d'utilisation (`/fr/conditions-generales-dutilisation/`), les CGV de la boutique cadeau n'ayant pas d'URL propre.

## 6. Recette

- `?value=50`, `?value=300` : bouton sélectionné. `?value=180` : « Autre montant » ouvert avec 180. `?value=0`, `?value=abc`, sans paramètre : 150.
- Chaque `?occasion=` (`noel`, `anniversaire`, `amoureux`, `derniere-minute`, `spa`, `famille`) et une occasion inconnue.
- Le lien d'achat contient le bon montant, les paramètres de campagne et `src=lp-carte-cadeau`.
- Les 5 événements apparaissent dans la console (`dataLayer`) et dans l'aperçu GTM.
- Balise `noindex, nofollow` présente, robots.txt non bloquant.
- En 375 × 667 : sélecteur de montant et bouton d'achat visibles sans scroller.
- Bouton collant mobile : apparaît quand le bouton du hero sort de l'écran, disparaît au rappel final.
- Bouton « Créer une cagnotte » : lien avec paramètres de campagne, `src` et `#money_pot`.
- Popup Avis Vérifiés : s'ouvre sans quitter la page, se ferme avec la croix, Échap ou un clic à côté.
- Lighthouse mobile en production : performance et accessibilité au-dessus de 90.
