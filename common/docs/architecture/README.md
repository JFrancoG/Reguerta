# Architecture

We will build both iOS and Android using MVVM and Clean Architecture.

Goals:
- Keep a shared mental model across platforms.
- Align naming for variables, functions, folders, and feature structure whenever possible.
- Enable parallel development with minimal translation overhead between teams.

High-level structure:
- Presentation: MVVM (Views/Composables -> ViewModel -> UI State)
- Domain: Use cases / business rules
- Data: Repositories and data sources

Related decisions live in `../decisions`.
