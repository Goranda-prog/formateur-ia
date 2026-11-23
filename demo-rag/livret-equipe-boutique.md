# Livret d'accueil · Équipe Boutique (exemple de formation)

Bienvenue dans l'équipe Boutique !

## La vie au bureau
- La machine à café du 3e étage est capricieuse : appuyez deux fois.
- Daily à 9 h 30, debout et en 15 minutes.
- Le gâteau d'anniversaire, c'est la personne qui fête qui l'apporte.
- Pas de réunion le vendredi après-midi.

## Comment on travaille
- Les tickets sont dans Jira, la doc dans Confluence.
- Une revue de code demande deux approbations. Soyez bienveillants.
- Pas de nouvelle dépendance sans l'accord de l'équipe : on a déjà été échaudés.
- On déploie le mardi et le jeudi, jamais le vendredi.
- Le calcul des prix vit dans src/pricing/. Personne ne touche à src/legacy/.

## Notre code
- « On préfère du code simple à du code malin. » (le lead tech)
- Tous les montants sont en centimes, dans des entiers. Un float pour de l'argent, c'est un ticket bloquant.
- Le code est en anglais, les commentaires en français.
- Les erreurs métier lèvent une PricingError avec un code, par exemple EMPTY_CART.
- Chaque règle métier a ses tests, y compris aux seuils exacts.
- Nos tests s'appellent should_…, par exemple should_apply_discount_from_100.

## Avant de dire « c'est fini »
- On lance les tests et le lint.
- On liste ses hypothèses dans la description de la PR.
- On prévient le canal #boutique-dev.

## Sécurité
- Le mot de passe du Wi-Fi invités est à l'accueil.
- Ne collez jamais de données client dans un outil externe.

## Et surtout
- Posez des questions : personne ne vous en voudra.
