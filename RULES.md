# VendorBridge Coding Standards & Rules

Welcome to the VendorBridge repository. Since this project follows open-source best practices, we hold our codebase to a high standard. All contributors (including AI assistants) must strictly adhere to the following rules.

## General Principles
1. **Clean Code**: Code must be readable, maintainable, and self-documenting. Use clear, descriptive variable and function names. Avoid "magic numbers" and obscure abbreviations.
2. **SOLID Principles**: Follow Object-Oriented best practices. Classes should have a single responsibility, and dependencies should be inverted where possible.
3. **No Dead Code**: Remove unused imports, commented-out code, and dead functions before committing.
4. **Consistency**: Follow the established conventions of the file or module you are editing. 

## Backend (Java / Spring Boot)
We strictly enforce the **Google Java Style Guide** via the Maven Checkstyle Plugin.

1. **Naming Conventions**:
   - `Classes` and `Interfaces` must be `PascalCase`.
   - `methods` and `variables` must be `camelCase`.
   - `CONSTANTS` must be `UPPER_SNAKE_CASE`.
2. **Documentation**:
   - Every public API endpoint (Controller method) and Service class must have Javadoc describing its purpose, parameters, and return types.
3. **Imports**:
   - Do not use wildcard imports (e.g., `import java.util.*;`). Always specify the exact class.
4. **Line Length**:
   - Maximum line length is strictly 100 characters to ensure readability on split screens.
5. **Indentation**:
   - Use 4 spaces for Java indentation. Do not use tabs.

## Frontend (React / JavaScript)
We enforce strict linting using **ESLint** and formatting using **Prettier**.

1. **Formatting**:
   - Indentation: 2 spaces.
   - Use single quotes (`'`) for strings (except in JSX, where double quotes `"` are standard).
   - Trailing commas are required.
2. **React Hooks**:
   - Exhaustive dependencies in `useEffect` and `useCallback` are strictly enforced. Never disable the `react-hooks/exhaustive-deps` rule.
3. **Components**:
   - Use functional components and hooks exclusively. No class components.
   - File names for components must be `PascalCase.jsx`.
4. **State Management**:
   - Keep state as local as possible. 

## Pre-Commit Checklist
Before opening a Pull Request or pushing code:
1. Backend: Run `./mvnw clean verify` to ensure Checkstyle passes and tests execute successfully.
2. Frontend: Run `npm run lint` and `npm run build` to ensure no warnings or errors exist.

Failure to follow these standards will result in failed CI pipelines.
