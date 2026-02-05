# Reguerta Multi

Reguerta Multi es un proyecto mobile multiplataforma (iOS + Android) construido
como monorepo para mantener una evolucion coordinada de funcionalidades,
arquitectura y nomenclatura entre ambas apps.

## Objetivo

Desarrollar en paralelo las apps iOS y Android compartiendo principios de
arquitectura, nomenclatura y estructura de features para reducir friccion en el
trabajo diario, acelerar la entrega y facilitar revisiones cruzadas.

## Arquitectura

- Patron: MVVM + Clean Architecture en ambas plataformas.
- Estructura por capas:
  - Presentacion: Views/Composables -> ViewModel -> UI State
  - Dominio: casos de uso / reglas de negocio
  - Datos: repositorios y data sources

Mas detalles en `common/docs/architecture` y `common/docs-es/architecture`.

## Backend (Firebase)

La plataforma backend elegida es Firebase por su simplicidad, su capa gratuita
robusta y su conjunto de servicios integrados.

Servicios en uso:
- Base de datos: Firestore
- Autenticacion: Firebase Authentication
- Almacenamiento: Firebase Storage
- Crash reporting: Firebase Crashlytics
- Notificaciones push: Firebase Cloud Messaging (FCM)

Las decisiones arquitectonicas estan documentadas en
`common/docs/decisions` y `common/docs-es/decisions`.

## Versiones minimas

- iOS: 18
- Android: API 29 (Android 10)

## Estructura del repositorio

- `ios/`: app iOS
- `android/`: app Android
- `common/`: documentacion compartida (ES/EN)
- `functions/`: Firebase Cloud Functions
- `firebase.json` y `.firebaserc`: configuracion de Firebase

## Cloud Functions

Las Cloud Functions viven en la raiz del repo para mantener el backend junto al
resto del proyecto y facilitar el despliegue.

## Estado

Proyecto en fase inicial. Este README se ira actualizando conforme avance el
desarrollo.
