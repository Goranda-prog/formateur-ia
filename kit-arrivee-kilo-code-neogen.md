# Kit d'arrivée : installer Kilo Code et le brancher sur NéoGen

Nov 21, 2026 · @Gaetan

Faites ces 5 étapes avant la formation : comptez 20 minutes. À la fin, Kilo Code répond dans le VS Code de votre workspace Coder, avec les modèles NéoGen. Toute la journée, nous montrerons et utiliserons ce seul outil.

Si une étape bloque, ne restez pas coincé : notez le message d'erreur et prévenez le formateur avant le jour J (voir la dernière section).

## Ce qu'il vous faut

- Votre **workspace Coder**, ouvert dans VS Code.
- Votre **compte NéoGen**, avec lequel vous vous connectez déjà au chat.
- L'**adresse de NéoGen** : `https://ADRESSE-NEOGEN` (à remplacer par l'adresse donnée par le formateur).
- Un accès à internet depuis le workspace, pour installer l'extension.

## Étape 1 · Créer votre clé d'API NéoGen

Cette clé permet à Kilo Code d'utiliser les modèles NéoGen en votre nom.

1. Connectez-vous à NéoGen dans votre navigateur.
2. Cliquez sur votre icône de profil, en bas à gauche, puis sur **Paramètres → Compte**.
3. Dans la rubrique **Clés d'API**, cliquez sur **Générer une nouvelle clé d'API** et donnez-lui un nom, par exemple « Kilo Code ».
4. **Copiez la clé tout de suite** : elle ne sera plus affichée ensuite.

Cette clé est personnelle : ne la collez ni dans un chat, ni dans un fichier versionné avec Git. Si la rubrique Clés d'API n'apparaît pas, c'est que l'administrateur ne l'a pas activée pour votre compte : prévenez le formateur.

## Étape 2 · Installer Kilo Code dans VS Code

1. Dans le VS Code de votre workspace, ouvrez les extensions (`Ctrl+Shift+X`).
2. Cherchez **Kilo Code** (éditeur : Kilo Code).
3. Cliquez sur la petite flèche à côté d'**Installer**, puis sur **Installer la version préliminaire** (*Install Pre-Release Version*). C'est la version actuelle de l'extension, stable malgré son nom.
4. Rechargez VS Code si on vous le demande. Une icône Kilo apparaît dans la barre d'activité, à gauche : cliquez dessus pour ouvrir le panneau.

Si votre workspace n'affiche pas le Marketplace de Microsoft (VS Code dans le navigateur, par exemple), il utilise Open VSX : cherchez « Kilo Code » de la même façon et installez-le. L'extension embarque tout ce qu'il lui faut, rien d'autre à installer.

Ne créez pas de compte Kilo et n'achetez pas de crédits : nous utilisons uniquement NéoGen.

## Étape 3 · Brancher Kilo Code sur NéoGen

NéoGen parle le même langage que l'API d'OpenAI : on le déclare comme un fournisseur « compatible OpenAI ».

1. Dans le panneau Kilo, ouvrez les **Paramètres** (icône d'engrenage), onglet **Providers**.
2. Tout en bas de la liste, cliquez sur **Custom provider**.
3. Remplissez le formulaire :

| Champ | Valeur |
| --- | --- |
| Provider API | OpenAI Compatible |
| Base URL | `https://ADRESSE-NEOGEN/api` (sans barre oblique à la fin) |
| API key | la clé copiée à l'étape 1 |
| Models | la liste se remplit toute seule : gardez neogen-dev-low, neogen-dev-high et neogen-dev-max |

4. Enregistrez. Dans le panneau Kilo, choisissez **neogen-dev-high** dans le sélecteur de modèle : c'est le modèle de la journée.

Si la liste des modèles reste vide, cliquez sur **Fetch models** après avoir vérifié l'adresse et la clé, ou ajoutez les trois noms à la main.

## Étape 4 · Régler les autorisations pour la journée

Kilo Code peut lire, modifier des fichiers et lancer des commandes dans votre workspace. Pour la formation, il doit vous demander avant d'agir.

1. Dans les Paramètres de Kilo, ouvrez l'onglet **Auto Approve** : chaque outil y a un réglage Autoriser, Demander ou Refuser.
2. Laissez la **lecture** de fichiers sur Autoriser.
3. Mettez **tout le reste sur Demander** : modification de fichiers, commandes, outils externes.
4. N'activez pas l'approbation automatique de tout.

Pendant la formation, quand Kilo vous demande une autorisation, ne cliquez pas sur « Toujours autoriser » : ce bouton enregistre une règle définitive.

## Étape 5 · Vérifier que tout marche

1. Créez un dossier vide `test-kilo` dans votre workspace et ouvrez-le dans VS Code.
2. Dans le panneau Kilo, choisissez l'agent **code** et le modèle **neogen-dev-high**.
3. Envoyez : « Crée un fichier bonjour.md qui contient la phrase : Bonjour Ada. »
4. Kilo vous demande l'autorisation de créer le fichier : cliquez sur **Autoriser**.
5. Vérifiez que `bonjour.md` est apparu, puis supprimez le dossier.

Si le fichier est là, vous êtes prêt. Envoyez un petit message au formateur pour le lui dire.

## En cas de problème

| Ce que vous voyez | Ce qu'il faut faire |
| --- | --- |
| Pas de rubrique Clés d'API dans NéoGen | Les clés ne sont pas activées pour votre compte : prévenez le formateur. |
| Kilo Code introuvable dans les extensions | Cherchez « Kilo Code » sans filtre ; dans un VS Code du navigateur, la liste vient d'Open VSX. |
| Liste des modèles vide | Vérifiez que l'adresse finit par `/api`, sans barre oblique, puis « Fetch models », ou ajoutez les noms à la main. |
| Erreur 401 ou « Unauthorized » | La clé est incomplète ou supprimée : générez-en une nouvelle et recollez-la. |
| Erreur réseau ou de certificat | Kilo utilise les réglages réseau de VS Code : vérifiez ceux du proxy de votre workspace. |
| Kilo vous propose de créer un compte ou d'acheter des crédits | Refusez : vous êtes sur le mauvais fournisseur. Revenez à l'étape 3. |

Toujours bloqué ? Écrivez au formateur avant la formation avec une capture de l'erreur : **CONTACT DU FORMATEUR** (à compléter).
