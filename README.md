# TD1

*La collection Postman est disponible pour simplifier l'utilisationde l'API*

## Installation sans docker:
### Installer les dépendances:

```bash
bun install
```

### Lancer le serveur:

```bash
bun run index.ts
```

## Installation avec docker:
### Lancer le serveur:

```bash
docker-compose up -d --build
```

### Afficher les logs:

```bash
docker logs -f td1-api-1
```

# Routes disponibles

| Méthode | Route | Description |
| ------- | ----- | ----------- |
| GET | /profiles | Récupérer tous les profils |
| GET | /profiles/:id | Récupérer un profil par son ID |
| POST | /profiles | Créer un nouveau profil |
| PUT | /profiles/:id | Mettre à jour un profil par son ID |
| DELETE | /profiles/:id | Supprimer un profil par son ID |
| POST | /profiles/:id/experience | Ajouter une expérience à un profil |
| DELETE | /profiles/:id/experience/:exp | | Supprimer une expérience d'un profil |
| POST | /profiles/:id/skills | Ajouter une compétence à un profil |
| DELETE | /profiles/:id/skills/:skill | Supprimer une compétence d'un profil |
| PUT | /profiles/:id/information | Mettre à jour les informations d'un profil |
