# Arquitectura

Vamos a construir iOS y Android usando MVVM y Clean Architecture.

Objetivos:
- Mantener un modelo mental compartido entre plataformas.
- Alinear la nomenclatura de variables, funciones, carpetas y estructura de features cuando sea posible.
- Facilitar el desarrollo en paralelo con la menor friccion posible.

Estructura general:
- Presentacion: MVVM (Views/Composables -> ViewModel -> UI State)
- Dominio: casos de uso / reglas de negocio
- Datos: repositorios y data sources

Las decisiones relacionadas estan en `../decisions`.
