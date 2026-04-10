Crée un nouveau projet dans un dossier `idee-cadeau-abcd` pour prototyper la refonte de la page idée cadeau d'AbracadaRoom.

## Contexte

Ce prototype sera déployé sur Vercel via le repo GitHub `unicstay-tech/idee-cadeau-abcd`. C'est une page HTML/CSS/JS statique (pas de Laravel/Blade ici, c'est un prototype). Le but est de produire une maquette fonctionnelle fidèle aux specs, que notre développeur front Sylvain intégrera ensuite dans le vrai codebase Laravel/Blade + Bootstrap 4.

## Fichiers de référence

Lis attentivement ces deux fichiers AVANT de coder :
1. `HANDOFF-idee-cadeau-claude-code.md` : les specs complètes bloc par bloc (structure, contenu, CSS, responsive, SEO)
2. `Decouvrez_nos_offres_cadeaux.pdf` : la maquette Canva, source de vérité visuelle pour l'ordre et le contenu des blocs

## Ce que tu dois produire

Un dossier `idee-cadeau-abcd/` contenant :
- `index.html` : page complète avec tous les blocs décrits dans le handoff, dans l'ordre exact du handoff
- CSS intégré ou dans un fichier séparé, au choix
- Utiliser Bootstrap 4.3.1 via CDN (pas d'install npm)
- jQuery via CDN (pour le collapse Bootstrap de la FAQ)
- Pas de framework JS, pas de React, pas de build step
- Responsive (mobile-first)
- Couleurs marque : turquoise `#1babb5`, bordeaux `#7f204e`
- Images placeholder via Unsplash (URLs directes, pas de téléchargement)
- Toutes les classes custom préfixées `abcd-`
- Le balisage JSON-LD FAQPage décrit dans les specs
- Un `README.md` minimal

## Contraintes

- Pas de nouvelles Google Fonts (utiliser les fonts système ou celles déjà chargées par Bootstrap)
- Pas de dépendances à installer
- Le fichier doit être déployable tel quel sur Vercel (static site)
- Tous les liens internes pointent vers les vraies URLs abracadaroom.com
- Le contenu texte (FAQ, réassurance, offres cadeaux) est celui du handoff, ne pas inventer

## Blocs dans l'ordre

1. Hero plein écran (image + overlay bordeaux + H1 + 2 CTA)
2. Nos offres cadeaux (Carte Cadeau vs Bon Cadeau, 2 cartes)
3. Bannière B2B entreprises
4. Réassurance 5 pictos "Les cadeaux AbracadaRoom c'est..."
5. Avis clients (badges placeholder)
6. Moteur de recherche (3 selects inline)
7. Nos expériences à offrir (grille magazine, 8 cartes)
8. 1000 raisons d'offrir (carrousel horizontal scroll, 6+ cartes)
9. On met les boxs ? (3 cartes box physiques)
10. FAQ accordéon (7 questions, Bootstrap Collapse)
11. Bloc SEO éditorial

## Méthode de travail obligatoire

Procède de manière incrémentale. C'est non négociable.

1. Etape 1 : Lis les deux fichiers de référence. Ne code rien encore.
2. Etape 2 : Crée le squelette du projet (dossier, README.md, index.html avec head/CDN/styles globaux/body vide). Commit.
3. Etape 3 : Ajoute les blocs UN PAR UN dans index.html. Maximum 2 blocs par réponse. Commit après chaque ajout.
4. Etape 4 : Après chaque bloc ajouté, montre-moi un résumé de ce qui a été fait et attends mon "ok" avant de continuer.
5. Ne génère JAMAIS le fichier HTML complet en une seule passe.

Initialise un repo git, commit, et push sur `unicstay-tech/idee-cadeau-abcd`.