# Reguerta Firebase Cloud Functions

Este proyecto contiene funciones en la nube (Cloud Functions) para mantener actualizados los timestamps de colecciones críticas en Firestore.

## 🔧 Tecnologías

- Firebase Functions (2ª generación)
- Node.js 22
- TypeScript
- Firestore
- Eventarc

## 🧠 Funcionalidad

Cada vez que se crea o modifica un documento en ciertas colecciones, puedes llamar manualmente a una función HTTP para actualizar el campo correspondiente en el documento:

```
{entorno}/collections/config/global.lastTimestamps.{colección}
```

### 📦 Colecciones observadas y funciones HTTP asociadas

| Colección     | Campo actualizado                                 | Endpoint HTTP                                                              |
|---------------|---------------------------------------------------|----------------------------------------------------------------------------|
| `products`    | `lastTimestamps.products`                         | `https://europe-west1-reguerta-9f27f.cloudfunctions.net/onProductWrite`   |
| `orderlines`  | `lastTimestamps.orders`                           | `https://europe-west1-reguerta-9f27f.cloudfunctions.net/onOrderWrite`     |
| `containers`  | `lastTimestamps.containers`                       | `https://europe-west1-reguerta-9f27f.cloudfunctions.net/onContainerWrite` |
| `measures`    | `lastTimestamps.measures`                         | `https://europe-west1-reguerta-9f27f.cloudfunctions.net/onMeasureWrite`   |
| `orders`      | `lastTimestamps.orders`                           | `https://europe-west1-reguerta-9f27f.cloudfunctions.net/onOrderWrite`     |
| `users`       | `lastTimestamps.users`                            | `https://europe-west1-reguerta-9f27f.cloudfunctions.net/onUserWrite`      |

## ⚙️ Configuración del entorno

Este proyecto usa una variable `ENV` para determinar si se debe escribir en la rama `develop` o `production`. Puedes establecerla con:

```bash
firebase functions:config:set app.env="develop"
```

## 🚀 Despliegue

```bash
firebase deploy --only functions
```

### 📤 Desplegar funciones individuales

Puedes desplegar una única función (útil para desarrollo o cambios puntuales):

```bash
firebase deploy --only functions:onProductWrite
```

O varias funciones separadas por coma:

```bash
firebase deploy --only functions:onProductWrite,functions:onUserWrite
```
