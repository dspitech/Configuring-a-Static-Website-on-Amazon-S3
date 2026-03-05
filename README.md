## ESTIAM AWS Labs – Site statique S3

Plateforme web statique destinée aux étudiants de l’ESTIAM pour pratiquer les principaux services AWS (EC2, S3, RDS, CloudFront, IAM, etc.).  
Le site est conçu pour être **hébergé sur Amazon S3 en mode “static website hosting”**.

---

### Informations auteur

- **Nom**: LO  
- **Prénom**: Pape  
- **Niveau**: E4 CCSN  
- **Cours**: AWS / Cloud Computing  

---

## 1. Prérequis

- Un **compte AWS** avec droits suffisants sur S3.
- **AWS CLI** installée et configurée (`aws configure`).
- PowerShell (les commandes ci‑dessous utilisent la syntaxe PowerShell).
- Un bucket S3 dédié à ce projet (exemple dans ce README: `estiam.com` dans la région `eu-west-3`).

> Remplace systématiquement `estiam.com` par **ton propre nom de bucket**, unique dans S3.

---

## 2. Création du bucket S3 (région Paris eu-west-3)

```powershell
aws s3api create-bucket `
  --bucket estiam.com `
  --region eu-west-3 `
  --create-bucket-configuration LocationConstraint=eu-west-3
```

---

## 3. Autoriser l’accès public (pour un site statique)

> À n’utiliser que pour un **bucket dédié au site web public**.

```powershell
aws s3api put-public-access-block `
  --bucket estiam.com `
  --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
```

Vérifie également dans la console S3 que l’option “Bloquer l’accès public” est bien adaptée à ton cas d’usage.

---

## 4. Activer le mode “Static website hosting”

```powershell
aws s3 website s3://estiam.com/ `
  --index-document index.html `
  --error-document error.html
```

Le bucket doit contenir au minimum `index.html` et `error.html`.

---

## 5. Appliquer une Bucket Policy de lecture publique

Création du fichier `policy.json` en PowerShell :

```powershell
$policy = @"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::estiam.com/*"
    }
  ]
}
"@

$policy | Out-File -FilePath policy.json -Encoding ascii

aws s3api put-bucket-policy `
  --bucket estiam.com `
  --policy file://policy.json
```

---

## 6. Déployer le site statique sur S3

Positionne-toi dans le dossier qui contient le projet (ce dépôt) puis exécute :

```powershell
aws s3 sync "D:\AWS\Labs\Bucket-S3\Site-Web-AWS" s3://estiam.com --exclude "policy.json"
```

Pense à adapter le chemin local si ton projet n’est pas dans `D:\AWS\Labs\Bucket-S3\Site-Web-AWS`.

---

## 7. Récupérer l’URL publique du site

```powershell
$BucketName = "estiam.com"
$Region     = "eu-west-3"

Write-Host "--- TON SITE EST EN LIGNE ---" -ForegroundColor Green
Write-Host "URL : http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Cyan
```

Tu peux ensuite coller cette URL dans un navigateur pour accéder à la plateforme ESTIAM AWS Labs.

---

## 8. Nettoyage complet (suppression du bucket)

> Attention : cette commande **supprime tous les objets** et le bucket.  
> À utiliser uniquement lorsque tu veux détruire l’environnement.

```powershell
aws s3 rb s3://estiam.com --force
```

---

## 9. Structure du projet

- `index.html` – page d’accueil (présentation de la plateforme et aperçu des labs).
- `labs.html` – catalogue des laboratoires avec liens vers la documentation AWS.
- `apropos.html` – contexte pédagogique et objectifs.
- `contact.html` – page de contact / FAQ (exemple statique).
- `style.css` – styles global UX/UI.
- `script.js` – logique front simple (génération des cards de labs, scroll fluide).
- `error.html` – page d’erreur pour l’hébergement statique S3.

---

## 10. Améliorations possibles

- Ajouter un domaine personnalisé via **Route 53** et distribuer le site avec **CloudFront**.
- Intégrer un véritable backend serverless pour le formulaire de contact (API Gateway + Lambda + SES).
- Ajouter des labs supplémentaires alignés sur les dernières certifications AWS.
