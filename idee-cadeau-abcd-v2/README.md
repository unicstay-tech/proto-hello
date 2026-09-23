# Prototype V2 - Page Idée Cadeau AbracadaRoom

Version 2 (septembre 2026), d'après `specs-refonte-idee-cadeau-abcd.md`. La V1 reste intacte dans `../idee-cadeau-abcd/`.

Maquette fonctionnelle pour la refonte de la page `/fr/idee-cadeau/` d'AbracadaRoom.

## Stack

- HTML statique + CSS custom
- Bootstrap 4.3.1 (CDN)
- jQuery (CDN, pour Bootstrap Collapse)
- Pas de build step, pas de framework JS

## Déploiement

Static site deployable tel quel sur Vercel. Ouvrir `index.html` en local pour prévisualiser.

## Couleurs marque

| Nom | Valeur |
|-----|--------|
| Jaune | `#eac12d` |
| Magenta | `#9e3669` |

Charte et police (Barlow) reprises de la boutique cadeau en prod (`/assets/css/box.css`).

## Intégration

Ce prototype sert de référence visuelle pour Sylvain (front-end) qui intégrera dans le codebase Laravel/Blade + Bootstrap 4 existant. Toutes les classes custom sont préfixées `abcd-`.
