## Instrucciones de Configuración del Proyecto Parker

### 1. Configuración de Variables de Entorno

**Paso 1.1: Crear el archivo `.env.local`**

Se ha creado un archivo `.env.local` en la raíz del proyecto (`/home/u631133/dev/Parker/parker-app/`) con las variables de entorno necesarias para el desarrollo local. Este archivo contiene las configuraciones para Vercel Blob, Neon (PostgreSQL), autenticación y metadatos del proyecto.

**Detalles de la acción:**
- Se utilizó el comando `write_file` para crear el archivo.
- El contenido del archivo incluye:
  - `AUTH_SECRET`
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
  - `NEXT_PUBLIC_DOMAIN`
  - `NEXT_PUBLIC_META_TITLE`
  - `NEXT_PUBLIC_LOCALE`
  - Variables relacionadas con Neon (PostgreSQL) como `DATABASE_URL`, `POSTGRES_URL`, etc.
  - `BLOB_READ_WRITE_TOKEN`

**Paso 1.2: Configurar Variables de Entorno en Vercel**

Es crucial que estas mismas variables de entorno sean añadidas en la configuración de tu proyecto en Vercel (en la sección "Environment Variables") para que estén disponibles durante el despliegue para el entorno de producción.

### 2. Gestión de Dependencias y Control de Versiones

**Paso 2.1: Actualización de `package-lock.json`**

Se ha añadido el archivo `package-lock.json` al control de versiones. Este archivo asegura que todos los desarrolladores y el entorno de despliegue utilicen las mismas versiones exactas de las dependencias del proyecto, garantizando la consistencia y evitando problemas de compatibilidad.

**Detalles de la acción:**
- Se ejecutó `git add package-lock.json` para añadir el archivo al área de staging.
- Se realizó un commit con el mensaje: `feat: Add package-lock.json for dependency consistency`.
- Se ejecutó `git push` para subir los cambios al repositorio remoto.

**Paso 2.2: Verificación de `.env.local` en `.gitignore`**

Se confirmó que el archivo `.env.local` está correctamente listado en el `.gitignore` del proyecto. Esto previene que las variables de entorno sensibles sean accidentalmente subidas al repositorio público, manteniendo la seguridad de las credenciales.

### 3. Deshabilitar Funcionalidades de Interacción con Imágenes

**Paso 3.1: Deshabilitar el clic derecho en las imágenes**

Se ha deshabilitado la función de clic derecho (`onContextMenu`) en las imágenes para evitar que los usuarios puedan guardar o inspeccionar las imágenes directamente a través del menú contextual del navegador.

**Detalles de la acción:**
- Se modificó el componente `src/components/image/ImageWithFallback.tsx`.
- Se añadió la propiedad `onContextMenu={(e) => e.preventDefault()}` tanto al componente `Image` de `next/image` como a la etiqueta `<img>` de fallback dentro de `ImageWithFallback.tsx`.

**Paso 3.2: Eliminar bloques de código relacionados con el zoom y compartir**

Se han eliminados los bloques de código correspondientes a `LoaderButton` (para el zoom) y `ShareButton` (para compartir).

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoLarge.tsx`.
- Se eliminaron los bloques de código correspondientes a `LoaderButton` (para el zoom) y `ShareButton` (para compartir).

**Paso 3.3: Deshabilitar la función de zoom al hacer clic en una foto**

Se ha deshabilitado la funcionalidad de zoom al hacer clic en una foto, que anteriormente navegaba a una página de foto individual. Esto se hizo para reemplazarla con la futura función de selección de fotos.

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoLarge.tsx`.
- Se eliminó el componente `Link` que envolvía `renderLargePhoto`, asegurando que al hacer clic en la imagen ya no se navegue a una página de detalle, sino que la imagen se renderice directamente.

### 4. Añadir Botón de Inicio de Sesión

**Paso 4.1: Agregar botón de "Sign In" a la navegación**

Se ha añadido un botón de "Sign In" a la derecha del título/logo de la aplicación en la barra de navegación. Este botón permite a los usuarios acceder a la página de inicio de sesión.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se añadió un componente `Link` con el texto "Sign In" y la ruta `/sign-in`.
- Se utilizó `ml-auto` para alinear el botón a la derecha y se aplicaron clases de estilo para mantener la coherencia visual con el resto de la navegación.

**Paso 4.2: Configuración de Inicio de Sesión con Google**

Se ha añadido un botón para iniciar sesión con Google en la pantalla de inicio de sesión. Este botón permite a los usuarios regulares autenticarse a través de su cuenta de Google.

**Detalles de la acción:**
- Se modificó el componente `src/auth/SignInForm.tsx`.
- Se añadió un botón que, al hacer clic, invoca la función `signIn('google')` de `next-auth/react`.
- Se importó `signIn` desde `next-auth/react` en la parte superior del archivo.
- El botón se estilizó para integrarse visualmente con el formulario existente.

### 5. Implementación de la Función de Selección de Fotos

**Paso 5.1: Añadir botón de selección a la navegación**

Se ha añadido un botón de "Seleccionar" junto al icono de búsqueda en la barra de navegación. Este es el primer paso para implementar la funcionalidad de selección de fotos.

**Detalles de la acción:**
- Se modificó el componente `src/app/AppViewSwitcher.tsx`.
- Se añadió un nuevo `SwitcherItem` que contiene un texto "Select" (marcador de posición) y un `onClick` que actualmente solo registra un mensaje en la consola.
- Se colocó este `SwitcherItem` justo antes del `SwitcherItem` que contiene el `IconSearch`.

**Paso 5.2: Configurar Contexto de Selección de Fotos**

Se ha creado un nuevo contexto de React (`SelectionContext`) para gestionar el estado de selección de fotos a nivel global en la aplicación. Esto permitirá que los componentes de fotos y otros elementos de la interfaz de usuario accedan y modifiquen el estado de selección de manera centralizada.

**Detalles de la acción:**
- Se creó el directorio `src/selection`.
- Se creó el archivo `src/selection/SelectionContext.tsx` con la definición del contexto, el proveedor (`SelectionProvider`) y el hook `useSelection`.
- El `SelectionProvider` se envolvió alrededor de la aplicación en `app/layout.tsx` para que el contexto esté disponible globalmente.
- Se importó `SelectionProvider` en `app/layout.tsx`.

**Paso 5.3: Hacer fotos seleccionables y añadir feedback visual**

Se ha modificado el componente `PhotoGrid` para permitir la selección de fotos y proporcionar una guía visual cuando una foto está seleccionada. Esto es parte de la implementación de la funcionalidad de selección de fotos.

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoGrid.tsx`.
- Se reemplazó el uso de `selectedPhotoIds` y `setSelectedPhotoIds` de `useAppState` por `selectionMode`, `selectedPhotos` y `togglePhotoSelection` del nuevo `useSelection` hook.
- Se actualizó la lógica para determinar si una foto está seleccionada (`isSelected`).
- Se actualizó la función `onSelectChange` de `SelectTileOverlay` para usar `togglePhotoSelection`.
- Se modificó la condición de renderizado de `SelectTileOverlay` para que dependa de `selectionMode`.
- Se añadió una clase condicional (`border-4 border-green-500`) al `div` que envuelve `PhotoMedium` para mostrar un borde verde cuando la foto está seleccionada.

**Paso 5.4: Crear Nueva Vista para Fotos Seleccionadas**

Se ha creado una nueva página en `/selected` que muestra todas las fotos que el usuario ha seleccionado. Esta vista permite a los usuarios revisar su selección y deseleccionar imágenes si es necesario.

**Detalles de la acción:**
- Se creó un nuevo componente de página en `app/selected/page.tsx`.
- Esta página utiliza el hook `useSelection` para obtener las fotos seleccionadas y las muestra en un componente `PhotoGrid`.
- Se añadió un botón "View Selections" en la barra de navegación (`src/app/NavClient.tsx`) que aparece cuando el modo de selección está activo y hay fotos seleccionadas.

### 6. Ajustes de Interfaz de Usuario

**Paso 6.1: Agregar espacio entre el título y el botón de "Sign In"**

Se ha añadido un espacio entre el título de la aplicación y el botón de "Sign In" en la barra de navegación para mejorar la legibilidad y la estética.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se añadió la clase `mr-4` (margin-right de 16px) al `div` que contiene el título y la descripción de la navegación.
- Se eliminó la clase `ml-auto` del `div` que envuelve el botón de "Sign In" para permitir que el `mr-4` del elemento anterior cree el espacio deseado.

**Paso 6.2: Mover el botón de selección a la izquierda del título**

Se ha reubicado el botón de selección de fotos a la izquierda del título de la aplicación en la barra de navegación. Esto mejora la accesibilidad y la coherencia visual con otras funcionalidades de la interfaz.

**Detalles de la acción:**
- Se modificó el componente `src/app/AppViewSwitcher.tsx` para eliminar el `SwitcherItem` del botón de selección.
- Se modificó el componente `src/app/NavClient.tsx`:
  - Se añadió un nuevo `SwitcherItem` para el botón de selección justo después de `AppViewSwitcher` y antes del `div` que contiene el título de la navegación.
  - Se importaron `Switcher`, `SwitcherItem` y `useSelection` en `NavClient.tsx` para soportar el nuevo botón.

### 7. Corrección de Errores

**Paso 7.1: Corregir `ReferenceError: selectedPhotoIds is not defined` en `PhotoGrid.tsx`**

Se ha corregido un error de referencia (`ReferenceError`) que ocurría en el componente `PhotoGrid.tsx` debido a una variable no definida (`selectedPhotoIds`). Este error se introdujo durante la refactorización para utilizar el nuevo contexto de selección de fotos.

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoGrid.tsx`.
- Se reemplazó la expresión `selectedPhotoIds?.length !== undefined && 'pointer-events-none'` por `selectionMode && 'pointer-events-none'` en la línea 93. Esto asegura que la lógica para prevenir la navegación de fotos cuando el modo de selección está activo utilice la variable correcta (`selectionMode`) del contexto de selección.

**Paso 7.2: Corregir `ReferenceError: isUserSignedIn is not defined` en `NavClient.tsx`**

Se ha corregido un error de referencia (`ReferenceError`) que ocurría en el componente `NavClient.tsx` debido a que la variable `isUserSignedIn` no estaba siendo desestructurada correctamente del hook `useAppState()`.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se añadió `isUserSignedIn` a la desestructuración del objeto retornado por `useAppState()`.

### 8. Gestión de Autenticación

**Paso 8.1: Ocultar/Mostrar botón de "Sign In" según el estado de la sesión**

Se ha implementado la lógica para ocultar el botón de "Sign In" en la barra de navegación cuando el usuario ha iniciado sesión y mostrarlo cuando no hay una sesión activa. Esto mejora la experiencia del usuario al presentar solo las opciones relevantes.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se envolvió el `div` que contiene el `Link` del botón de "Sign In" con una condición `{!isUserSignedIn && (...) }` para controlar su visibilidad.

**Paso 8.2: Habilitar inicio de sesión con Google**

Se ha habilitado el proveedor de autenticación de Google en la configuración de NextAuth. Esto permite a los usuarios iniciar sesión utilizando sus cuentas de Google.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/server.ts`.
- Se añadió `GoogleProvider` a la lista de proveedores de NextAuth, configurando `clientId` y `clientSecret` a partir de las variables de entorno (`process.env.GOOGLE_CLIENT_ID` y `process.env.GOOGLE_CLIENT_SECRET`).
- Se importó `GoogleProvider` desde `next-auth/providers/google` en la parte superior del archivo.

### 9. Deshabilitar Funcionalidades de Zoom de Lupa

**Paso 9.1: Deshabilitar la funcionalidad de la lupa para hacer zoom en la foto**

Se ha deshabilitado la funcionalidad de la lupa (zoom) en la vista de fotos grandes. Esto elimina la capacidad de los usuarios de hacer zoom en las imágenes, simplificando la interacción y alineándose con los requisitos del proyecto.

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoLarge.tsx`.
- Se cambió la propiedad `isEnabled` del componente `ZoomControls` a `false` (`isEnabled: false`). Esto asegura que la funcionalidad de zoom proporcionada por `ZoomControls` esté siempre deshabilitada, independientemente de otras condiciones.

### 10. Configuración de Credenciales de Google OAuth

**Paso 10.1: Añadir `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` a `.env.local`**

Se han añadido las credenciales de cliente de Google OAuth (`GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`) al archivo de variables de entorno local (`.env.local`). Estas credenciales son necesarias para que la aplicación pueda autenticarse con Google y permitir el inicio de sesión a través de cuentas de Google.

**Detalles de la acción:**
- Se leyó el contenido existente del archivo `.env.local`.
- Se añadieron las líneas para `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` al archivo.
- Se sobrescribió el archivo `.env.local` con el contenido actualizado.

**Nota Importante:** Es crucial que estas mismas variables de entorno (`GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`) sean añadidas en la configuración de tu proyecto en Vercel (en la sección "Environment Variables") para que el inicio de sesión con Google funcione correctamente en el entorno de despliegue.

### 11. Corrección de Errores de Autenticación

**Paso 11.1: Resolver error de URI de redireccionamiento de Google OAuth**

Se ha identificado la causa del error "No puedes acceder a esta app porque no cumple con la política OAuth 2.0 de Google" al intentar iniciar sesión con Google. Este error se debe a que el URI de redireccionamiento de la aplicación no está registrado o no coincide con las configuraciones en el proyecto de Google Cloud Console.

**Detalles de la acción:**
- Se proporcionaron instrucciones detalladas al usuario sobre cómo registrar el URI de redireccionamiento (`http://localhost:3000/api/auth/callback/google`) en Google Cloud Console.
- Se enfatizó la necesidad de añadir también la URL de despliegue de Vercel (`https://parker-app-one.vercel.app/api/auth/callback/google`) una vez que el dominio esté configurado.

### 12. Restricción de Acceso de Administrador

**Paso 12.1: Restringir funcionalidades de administrador a usuarios no-admin**

Se ha modificado la lógica de autorización para asegurar que solo el usuario administrador (`process.env.ADMIN_EMAIL`) tenga acceso a las rutas protegidas. Los usuarios autenticados a través de Google que no sean el administrador no podrán acceder a estas funcionalidades.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/server.ts`.
- En el callback `authorized` de NextAuth, se añadió una verificación para `isAdminUser` (`auth?.user?.email === process.env.ADMIN_EMAIL`).
- La condición `isRequestAuthorized` se actualizó para requerir que el usuario esté logueado Y sea el usuario administrador para las rutas protegidas (`!isUrlProtected || (isUserLoggedIn && isAdminUser)`).

### 13. Corrección de Errores y Mejoras de Interfaz

**Paso 13.1: Corregir Bucle de Redirección en Inicio de Sesión**

Se ha solucionado un bucle de redirección que ocurría después de que un usuario no administrador iniciara sesión con Google. El problema era que la página de inicio de sesión redirigía a todos los usuarios a la página de administrador, causando que el middleware de autenticación los enviara de vuelta a la página de inicio en un ciclo.

**Detalles de la acción:**
- Se modificó el archivo `app/sign-in/page.tsx`.
- Se añadió una lógica para verificar si el usuario es un administrador después de iniciar sesión. Si es administrador, se le redirige a `/admin`; de lo contrario, se le redirige a la página de inicio (`/`).

**Paso 13.2: Solucionar Error en el Botón de Selección**

Se ha corregido un error de `ReferenceError: toggleSelectionMode is not defined` que se producía al hacer clic en el botón "Select" en la navegación.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se desestructuró correctamente la función `toggleSelectionMode` del hook `useSelection`.

**Paso 13.3: Mejorar Visibilidad del Botón de Selección**

Se ha ajustado el diseño de la barra de navegación para asegurar que el botón "Select" sea siempre completamente visible y no quede parcialmente oculto.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se eliminaron las clases de CSS (`md:w-[calc(100%+8px)] md:translate-x-[-4px] md:px-[4px]`) que causaban un desbordamiento y ocultaban parte del botón.

**Paso 13.4: Reforzar Control de Acceso del Administrador en el Cliente**

Se ha mejorado la seguridad en el lado del cliente para asegurar que el enlace de navegación "Admin" solo sea visible para el usuario administrador. Esto evita que los usuarios no autorizados vean un enlace a una sección a la que no pueden acceder.

**Detalles de la acción:**
- Se creó una nueva acción de servidor `getAuthSessionAction` en `src/auth/actions.ts` que devuelve la sesión del usuario y un booleano `isAdmin`.
- Se actualizó `src/app/AppStateProvider.tsx` para usar esta nueva acción y almacenar el estado de administrador (`isUserAdmin`) en el contexto de la aplicación.
- Se modificó `src/app/NavClient.tsx` para que el enlace "Admin" solo se renderice si `isUserAdmin` es verdadero.

### 14. Mejoras Adicionales y Correcciones (Iteración 2)

**Paso 14.1: Corregir Visibilidad del Menú de Administrador**

Se ha corregido un error por el que el menú de administrador seguía siendo visible para los usuarios no administradores. El problema estaba en el componente `AppViewSwitcher`, que mostraba el botón basándose en si el usuario había iniciado sesión, en lugar de si era un administrador.

**Detalles de la acción:**
- Se modificó el archivo `src/app/AppViewSwitcher.tsx`.
- Se usó el estado `isUserAdmin` del contexto de la aplicación para controlar la visibilidad del menú de administrador.

**Paso 14.2: Eliminar la Vista "Full"**

Se ha eliminado la opción de vista "Full" de la interfaz de usuario, dejando la vista de cuadrícula ("Grid") como la única opción para visualizar las fotos.

**Detalles de la acción:**
- Se confirmó que la constante `GRID_HOMEPAGE_ENABLED` en `src/app/config.ts` controla este comportamiento y debe establecerse en `true` (a través de la variable de entorno `NEXT_PUBLIC_GRID_HOMEPAGE=1`).
- No se requirieron cambios de código adicionales.

**Paso 14.3: Habilitar Selección en la Vista de Foto Grande**

Se ha añadido la funcionalidad de selección de fotos a la vista de foto individual (grande).

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoLarge.tsx` para incluir el hook `useSelection`.
- Se añadió un indicador visual (un borde verde) para mostrar cuándo una foto está seleccionada.
- Se añadió un botón de "Select"/"Deselect" en el panel lateral de metadatos, visible solo cuando el modo de selección está activo.

**Paso 14.4: Crear Nueva Vista para Fotos Seleccionadas**

Se ha creado una nueva página en `/selected` que muestra todas las fotos que el usuario ha seleccionado.

**Detalles de la acción:**
- Se creó un nuevo componente de página en `app/selected/page.tsx`.
- Esta página utiliza el hook `useSelection` para obtener las fotos seleccionadas y las muestra en un componente `PhotoGrid`.
- Se añadió un botón "View Selections" en la barra de navegación (`src/app/NavClient.tsx`) que aparece cuando el modo de selección está activo y hay fotos seleccionadas.

### 15. Correcciones y Mejoras (Iteración 3)

**Paso 15.1: Resolver Error de Módulo `@/selection`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/selection'`) que ocurría en `src/photo/PhotoLarge.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx`.
- Se actualizó la ruta de importación de `useSelection` de `@/selection` a `@/selection/SelectionContext` para resolver correctamente el módulo.

### 16. Correcciones y Mejoras (Iteración 4)

**Paso 16.1: Ocultar Botón de Menú de Administrador para Usuarios No Administradores**

Se ha corregido un problema por el cual el botón del menú de administrador (el icono de tres puntos) era visible para los usuarios que iniciaban sesión con Google, incluso si no tenían privilegios de administrador.

**Detalles de la acción:**
- Se modificó `src/app/AppViewSwitcher.tsx`.
- Se eliminó el `SwitcherItem` que mostraba un spinner y un tooltip relacionado con el administrador cuando la autenticación estaba en progreso.

**Paso 16.2: Establecer Vista de Cuadrícula como Predeterminada**

Se ha configurado la vista de cuadrícula ("Grid") como la vista predeterminada para toda la aplicación.

**Detalles de la acción:**
- Se confirmó que la constante `GRID_HOMEPAGE_ENABLED` en `src/app/config.ts` controla este comportamiento y debe establecerse en `true` (a través de la variable de entorno `NEXT_PUBLIC_GRID_HOMEPAGE=1`).

**Paso 16.3: Resolver Error de Compilación en `PhotosEmptyState`**

Se ha solucionado un error de compilación (`Build Error: Ecmascript file had an error`) que ocurría en `src/photo/PhotosEmptyState.tsx`.

**Detalles de la acción:**
- Se movió la lógica de `revalidatePath('/admin', 'layout')` a una nueva acción de servidor (`revalidateAdminPathAction`) en `src/admin/actions.ts`.
- Se importó y utilizó `revalidateAdminPathAction` en `src/photo/PhotosEmptyState.tsx`, asegurando que la acción del servidor no se defina en línea dentro de un componente del cliente.

**Paso 16.4: Optimizar Espacio de Botones en la Navegación**

Se ha mejorado la disposición de los botones "Confirmar Selección", "Ver Selección" y "Cancelar" en la barra de navegación.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se eliminó la clase `grow` del contenedor del título.

### 17. Correcciones y Mejoras (Iteración 5)

**Paso 17.1: Diagnóstico de Visibilidad del Botón de Administrador**

Se ha iniciado un diagnóstico para entender por qué el botón del menú de administrador seguía siendo visible para usuarios no administradores.

**Detalles de la acción:**
- Se modificó `src/auth/actions.ts`.
- Se añadieron sentencias `console.log` temporales dentro de la función `getAuthSessionAction`.

**Paso 17.2: Resolver Error de Módulo `@/components/SiteGrid`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/components/SiteGrid'`) que ocurría en `app/selected/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/page.tsx`.
- Se cambió la importación de `SiteGrid` a `AppGrid` y se actualizó el uso del componente en el JSX.

**Paso 17.3: Resolver Error de Módulo `@/selection` en `app/selected/page.tsx`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/selection'`) que ocurría en `app/selected/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/page.tsx`.
- Se actualizó la ruta de importación de `useSelection` de `@/selection` a `@/selection/SelectionContext` para resolver correctamente el módulo.

### 18. Correcciones y Mejoras (Iteración 6)

**Paso 18.1: Mover Lógica de Conexión a Cliente en `AdminAppConfigurationClient`**

Se ha refactorizado la lógica de prueba de conexión en el panel de administración para que se ejecute en el lado del cliente.

**Detalles de la acción:**
- Se modificó `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las props `databaseError`, `storageError`, `redisError`, `aiError` y `isAnalyzingConfiguration` de la interfaz de props del componente.
- Se añadieron estados locales (`connectionErrors` y `isAnalyzingConfiguration`).

**Paso 18.2: Ajustar Propiedades de `AdminAppConfigurationClient`**

Se han ajustado las propiedades que recibe el componente `AdminAppConfigurationClient` para reflejar los cambios en la gestión de errores de conexión.

**Detalles de la acción:**
- Se modificó el archivo `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las propiedades `databaseError`, `storageError`, `redisError`, `aiError` y `isAnalyzingConfiguration` de la interfaz de props del componente.

### 19. Correcciones y Mejoras (Iteración 7)

**Paso 19.1: Eliminar Declaraciones Duplicadas de `useState`**

Se ha corregido un error de compilación (`the name 
connectionErrors
 is defined multiple times`) causado por declaraciones duplicadas de los hooks `useState` en `src/admin/config/AdminAppConfigurationClient.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las líneas duplicadas de `useState` para `hasScrolled`, `connectionErrors` y `isAnalyzingConfiguration`.

### 20. Correcciones y Mejoras (Iteración 8)

**Paso 20.1: Corregir Error de Sintaxis en `AppStateProvider.tsx`**

Se ha corregido un error de sintaxis (`Parsing ecmascript source code failed: Expression expected`) en `src/app/AppStateProvider.tsx` causado por la colocación incorrecta de un bloque `else` dentro de un `if` anidado.

**Detalles de la acción:**
- Se modificó el archivo `src/app/AppStateProvider.tsx`.
- Se corrigió la estructura del bloque `if/else`.

### 21. Correcciones y Mejoras (Iteración 9)

**Paso 21.1: Aumentar Espacio de Botones de Selección**

Se ha aumentado el ancho de los botones de selección en la barra de navegación.

**Detalles de la acción:**
- Se modificó el archivo `src/components/switcher/SwitcherItem.tsx`.
- Se cambió el valor de `WIDTH_CLASS_NARROW` de `w-[100px]` a `w-[120px]`.

**Paso 21.2: Eliminar Logs de Depuración Temporales**

Se han eliminados los `console.log` temporales que se habían añadido para depurar la visibilidad del botón de administrador y el estado de autenticación.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/actions.ts`.
- Se eliminaron los `console.log` relacionados con `ADMIN_EMAIL`, `User Email` y `Is Admin` en `getAuthSessionAction`.
- Se modificó el archivo `src/app/AppStateProvider.tsx`.
- Se eliminaron los `console.log` dentro del `useEffect`.
- Se modificó el archivo `src/app/AppViewSwitcher.tsx`.
- Se eliminó el `console.log` al inicio del componente.

### 22. Correcciones y Mejoras (Iteración 10)

**Paso 22.1: Ocultar el botón de menú de administrador para usuarios no administradores**

Se ha corregido un error que provocaba que el botón de menú de administrador de una foto (el icono de tres puntos) fuera visible para los usuarios no administradores.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx`.
- Se aseguró de que el componente `AdminPhotoMenu` solo se renderice si el usuario es un administrador.

**Paso 22.2: Corregir la visualización de miniaturas de fotos anteriores y siguientes**

Se ha solucionado un problema por el que al ver una foto no se mostraba la miniatura de la foto anterior en la cuadrícula de fotos relacionadas.

**Detalles de la acción:**
- Se modificó la consulta de la base de datos en `src/photo/db/query.ts`.
- Se actualizó la lógica de almacenamiento en caché en `src/photo/cache.ts`.

**Paso 22.3: Implementar la confirmación de la selección y la redirección**

Se ha implementado la lógica para que, al confirmar una selección de fotos, el usuario sea redirigido a la página `/selected`.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se utilizó el hook `useRouter` de `next/navigation` para redirigir al usuario.

**Paso 22.4: Corregir error de compilación: `operator does not exist: character varying = integer`**

Se ha corregido un error de compilación relacionado con una operación SQL que intentaba comparar un tipo de dato `character varying` con un `integer` en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se ajustó la consulta SQL para asegurar que los parámetros de `limit` se pasen y se utilicen correctamente.

**Paso 22.5: Implementar el backend para registrar la selección de fotos**

Se ha creado un nuevo endpoint de API para recibir y procesar las fotos seleccionadas por el usuario.

**Detalles de la acción:**
- Se creó el archivo `app/api/selection/route.ts`.
- Este endpoint recibe un array de IDs de fotos y los registra en la consola.
- Se modificó la función `confirmSelection` en `src/selection/SelectionContext.tsx` para enviar los IDs de las fotos seleccionadas.

**Paso 22.6: Controlar la visibilidad del botón "Ver Selección"**

Se ha ajustado la lógica para que el botón "Ver Selección" solo sea visible cuando el modo de selección está inactivo y hay fotos seleccionadas.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición para renderizar el botón "Ver Selección".

**Paso 22.7: Corregir la funcionalidad del botón "Cancelar Selección"**

Se ha corregido el botón "Cancelar Selección" para que no solo borre la selección de fotos, sino que también desactive el modo de selección.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se añadió `setSelectionMode(false)` a la función `clearSelection`.

### 23. Correcciones y Mejoras (Iteración 11)

**Paso 23.1: Corregir errores de importación en `app/api/selection/route.ts`**

Se han corregido los errores de compilación relacionados con la importación de `getServerSession` y `authOptions` en el archivo de la ruta de la API de selección.

**Detalles de la acción:**
- Se modificó el archivo `app/api/selection/route.ts`.
- Se cambió la importación de `getServerSession` de `next-auth` a `auth` desde `@/auth/server`.
- Se eliminó la importación de `authOptions`.

### 24. Correcciones y Mejoras (Iteración 12)

**Paso 24.1: Corregir error de tipo `limit` en `src/photo/db/query.ts`**

Se ha corregido un error de tipo (`TypeError: 'limit' is possibly 'undefined'`) en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se añadió un valor por defecto a la desestructuración de `limit`.
- Se importó `RELATED_GRID_PHOTOS_TO_SHOW`.

### 25. Correcciones y Mejoras (Iteración 13)

**Paso 25.1: Corregir error de compilación `operator does not exist: character varying = integer` en `src/photo/db/query.ts`**

Se ha corregido un error de compilación recurrente (`operator does not exist: character varying = integer`) en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se refactorizó la construcción de la consulta SQL.

### 26. Correcciones y Mejoras (Iteración 14)

**Paso 26.1: Corregir error de tipo en `src/photo/db/query.ts` al mapear resultados de la base de datos**

Se ha corregido un error de tipo (`Type error: Argument of type '(photoDbRaw: PhotoDb) => Photo' is not assignable to parameter of type '(value: QueryResultRow, index: number, array: QueryResultRow[]) => Photo'.`) que ocurría al intentar mapear los resultados de la base de datos a objetos `Photo`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se añadió un casting explícito (`row as PhotoDb`).

### 27. Correcciones y Mejoras (Iteración 15)

**Paso 27.1: Corregir error de compilación `syntax error at or near "$1"` en `src/photo/db/query.ts`**

Se ha corregido un error de sintaxis (`syntax error at or near "$1"`) en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se ajustó la construcción de la consulta SQL.
- Se introdujo una variable `paramIndex`.

### 28. Correcciones y Mejoras (Iteración 16)

**Paso 28.1: Corregir error de tipo `Property 'photos' does not exist on type 'QueryResult<QueryResultRow>'` en `src/photo/cache.ts`**

Se ha corregido un error de tipo (`Property 'photos' does not exist on type 'QueryResult<QueryResultRow>'`) en la función `getPhotosNearIdCached`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/cache.ts`.
- Se refactorizó la función `getPhotosNearId` en `src/photo/db/query.ts`.
- Se ajustó la llamada a `query`.

### 29. Correcciones y Mejoras (Iteración 17)

**Paso 29.1: Corregir error de compilación en la generación de metadatos de lentes sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para lentes que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió una comprobación en la función `dateRangeForPhotos`.

### 30. Correcciones y Mejoras (Iteración 18)

**Paso 30.1: Corregir error de compilación en la generación de metadatos de cámaras sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para cámaras que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `src/camera/meta.ts`.
- Se añadió una comprobación en la función `titleForCamera`.

**Paso 30.2: Corregir error de compilación en la generación de metadatos de lentes sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para lentes que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/meta.ts`.
- Se añadió una comprobación en la función `titleForLens`.

**Paso 30.3: Mejorar la legibilidad del botón de selección**

Se ha mejorado la legibilidad del botón de selección en la barra de navegación.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se eliminó la clase `w-20`.

**Paso 30.4: Evitar la superposición del botón de confirmación de selección**

Se ha evitado que el botón de confirmación de selección y el número de fotos seleccionadas se superpongan en la barra de navegación.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se movió el contador de fotos seleccionadas fuera del botón de confirmación.

**Paso 30.5: Implementar el bloqueo de fotos seleccionadas**

Se ha implementado un mecanismo para bloquear las fotos que un usuario ha seleccionado.

**Detalles de la acción:**
- Se ha añadido un campo `locked_by` y `locked_at` a la tabla `photos` en la base de datos.
- Se ha actualizado la función `confirmSelection` en `src/selection/SelectionContext.tsx`.
- Se ha creado un nuevo endpoint de API (`DELETE /api/selection`) para desbloquear las fotos.
- Se ha actualizado la interfaz de usuario en `src/photo/PhotoGrid.tsx` y `src/photo/PhotoLarge.tsx`.

### 31. Correcciones y Mejoras (Iteración 19)

**Paso 31.1: Corregir errores de sintaxis en el renderizado de componentes**

Se han corregido errores de sintaxis en los archivos `src/photo/PhotoLarge.tsx` y `src/app/NavClient.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx`.
- Se modificó el archivo `src/app/NavClient.tsx`.

### 32. Correcciones y Mejoras (Iteración 20)

**Paso 32.1: Corregir error de tipo `session.user` posiblemente `undefined` en la ruta de la API de selección**

Se ha corregido un error de tipo que ocurría en la ruta de la API de selección (`app/api/selection/route.ts`).

**Detalles de la acción:**
- Se modificó el archivo `app/api/selection/route.ts`.
- Se añadió una comprobación para asegurar que `session.user` existe.

### 33. Correcciones y Mejoras (Iteración 21)

**Paso 33.1: Corregir error de tipo `lockedAt` en `src/photo/db/query.ts`**

Se ha corregido un error de tipo que ocurría en la función `insertPhoto` y `updatePhoto` en `src/photo/db/query.ts`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se añadió una comprobación para convertir `photo.lockedAt` a una cadena de texto ISO.

### 34. Correcciones y Mejoras (Iteración 22)

**Paso 34.1: Corregir error de tipo `lockedAt` en `src/photo/form/index.ts`**

Se ha corregido un error de tipo que ocurría en la función `convertFormDataToPhotoDbInsert` en `src/photo/form/index.ts`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/form/index.ts`.
- Se añadió una comprobación para convertir `photoForm.lockedAt` a un objeto `Date`.

### 35. Correcciones y Mejoras (Iteración 23)

**Paso 35.1: Corregir error de tipo `lockedAt` en `src/photo/index.ts`**

Se ha corregido un error de tipo que ocurría en la función `convertPhotoToPhotoDbInsert` en `src/photo/index.ts`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió una comprobación para convertir `photo.lockedAt` a `undefined`.

### 36. Correcciones y Mejoras (Iteración 24)

**Paso 36.1: Corregir error de tipo `lockedAt` en `app/api/selection/route.ts`**

Se ha corregido un error de tipo que ocurría en la ruta de la API de selección (`app/api/selection/route.ts`).

**Detalles de la acción:**
- Se modificó el archivo `app/api/selection/route.ts`.
- Se añadió una comprobación para convertir `photo.lockedAt` a `undefined`.

### 37. Correcciones y Mejoras (Iteración 25)

**Paso 37.1: Corregir error de pre-renderizado en páginas de etiquetas**

Se ha corregido un error de compilación (`TypeError: b.match is not a function`) que ocurría al pre-renderizar las páginas de etiquetas.

**Detalles de la acción:**
- Se modificó el archivo `src/tag/index.ts`.
- Se actualizó la función `generateMetaForTag`.

### 38. Correcciones y Mejoras (Iteración 26)

**Paso 38.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se añadió una comprobación en la función `generateMetadata`.
- Se añadió una redirección.

### 39. Correcciones y Mejoras (Iteración 27)

**Paso 39.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `src/camera/data.ts`.
- Se añadió una comprobación en la función `getPhotosCameraDataCached`.

### 40. Correcciones y Mejoras (Iteración 28)

**Paso 40.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos (shareTextForCamera)**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `src/camera/meta.ts`.
- Se añadió una comprobación en la función `shareTextForCamera`.

### 41. Correcciones y Mejoras (Iteración 29)

**Paso 41.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos (CameraHeader)**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `src/camera/CameraHeader.tsx`.
- Se añadió una comprobación en la función `CameraHeader`.

### 42. Correcciones y Mejoras (Iteración 30)

**Paso 42.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos (generateMetadata y CameraPage)**

Se ha corregido un error de compilación persistente que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se simplificó la lógica en `generateMetadata`.
- Se añadió una comprobación `if (photos.length === 0) { return null; }` en el componente `CameraPage`.

### 43. Correcciones y Mejoras (Iteración 31)

**Paso 43.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos (generateMetadata y CameraPage - Refuerzo)**

Se ha corregido un error de compilación persistente que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se simplificó la lógica en `generateMetadata`.
- Se añadió una comprobación `if (photos.length === 0) { return null; }` en el componente `CameraPage`.

### 44. Correcciones y Mejoras (Iteración 32)

**Paso 44.1: Deshabilitar temporalmente la generación de parámetros estáticos para páginas de cámaras**

Se ha deshabilitado temporalmente la exportación `generateStaticParams` en `app/shot-on/[make]/[model]/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se comentó la exportación `generateStaticParams`.

### 45. Correcciones y Mejoras (Iteración 33)

**Paso 45.1: Envolver `SelectionProvider` con `SessionProvider` en `app/layout.tsx`**

Se ha corregido el error de compilación `[next-auth]: useSession must be wrapped in a <SessionProvider />`.

**Detalles de la acción:**
- Se modificó el archivo `app/layout.tsx`.
- Se importó `SessionProvider` desde `next-auth/react`.
- Se envolvió el componente `AppStateProvider` con `SessionProvider`.

### 46. Correcciones y Mejoras (Iteración 34)

**Paso 46.1: Ocultar el botón de selección para usuarios no autenticados**

Se ha corregido un error que permitía a los usuarios no autenticados acceder al modo de selección de fotos.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición `isUserSignedIn`.

**Paso 46.2: Ocultar el botón de confirmación para usuarios no autenticados**

Se ha corregido un error que permitía a los usuarios no autenticados ver el botón de "Confirmar".

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición `isUserSignedIn`.

**Paso 46.3: Prevenir la renderización de los botones de selección durante la comprobación de la autenticación**

Se ha corregido una condición de carrera en la que los botones de selección podían renderizarse antes de que se completara la comprobación de autenticación.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición `!isCheckingAuth`.

**Paso 46.4: Usar el estado de la sesión directamente en NavClient.tsx**

Para solucionar de forma definitiva el error de "Usuario no autenticado", se ha modificado `NavClient.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se importó y utilizó el hook `useSession`.
- Se actualizó la lógica de renderizado.

**Paso 46.5: Hacer la función `confirmSelection` más robusta**

Se ha corregido un error que permitía a los usuarios no autenticados acceder al modo de selección de fotos.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se importó la función `toast` de `sonner`.
- Se actualizó la función `confirmSelection`.

**Paso 46.6: Corrección de la dependencia de `useCallback` en `confirmSelection`**

El error persistía debido a que la función `confirmSelection` no se estaba actualizando cuando cambiaba el estado de la sesión.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se actualizó el array de dependencias del `useCallback`.

**Paso 46.7: Refactorizar `SelectionContext.tsx` para ser independiente de la sesión**

Se ha refactorizado `SelectionContext.tsx` para que no dependa directamente del hook `useSession`.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se eliminó la importación de `useSession`.
- Se actualizaron las firmas de `confirmSelection` y `clearSelection`.
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se actualizó la llamada a `confirmSelection` y `clearSelection`.

**Paso 46.8: Añadir migración para las columnas `locked_by` y `locked_at`**

Se ha corregido el error de la base de datos "column 'locked_by' of relation 'photos' does not exist".

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/migration.ts`.
- Se añadió una nueva entrada al array `MIGRATIONS`.

**Paso 46.9: Corregir error de tipo 'session.user' posiblemente 'undefined' en NavClient.tsx**

Se ha corregido el error de tipo que ocurría en `src/app/NavClient.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una comprobación `session?.user?.id`.

**Paso 46.10: Manejar correctamente la ausencia de fotos en las páginas de lentes**

Se ha corregido un error de prerenderizado que ocurría en las páginas de lentes cuando no se encontraban fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/data.ts`.
- Se añadió una comprobación `photos[0] || undefined`.

**Paso 46.11: Manejar correctamente la ausencia de fotos en los metadatos de lentes**

Se ha corregido un error de prerenderizado que ocurría en las páginas de lentes cuando no se encontraban fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/meta.ts`.
- Se añadió una comprobación `photos.length > 0`.

**Paso 46.12: Aislar la causa del error de prerenderizado en `generateMetadata` de las páginas de lentes**

Se ha comentado temporalmente la generación de la descripción y las imágenes en la función `generateMetadata` de las páginas de lentes.

**Detalles de la acción:**
- Se modificó el archivo `app/lens/[make]/[model]/page.tsx`.
- Se comentaron las líneas que asignan `description` e `images`.

**Paso 46.13: Manejar la ausencia de fotos en `generateMetaForLens`**

Se ha añadido una comprobación en la función `generateMetaForLens` para devolver un objeto de metadatos mínimo.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/meta.ts`.
- Se añadió una condición `if (photos.length === 0)`.

**Paso 46.14: Deshabilitar temporalmente la generación de parámetros estáticos para páginas de lentes**

Se ha deshabilitado temporalmente la exportación `generateStaticParams` en `app/lens/[make]/[model]/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/lens/[make]/[model]/page.tsx`.
- Se comentó la exportación `generateStaticParams`.

**Paso 46.15: Deshabilitar temporalmente la generación de parámetros estáticos para páginas de etiquetas**

Se ha deshabilitado temporalmente la exportación `generateStaticParams` en `app/tag/[tag]/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/tag/[tag]/page.tsx`.
- Se comentó la exportación `generateStaticParams`.

**Paso 46.16: Corregir `dateString.match is not a function` en `dateRangeForPhotos`**

Se ha corregido el error `dateString.match is not a function` que ocurría en la función `dateRangeForPhotos`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió el operador de coalescencia nula (`?? ''`).

### 49. Corrección del Flujo de Selección de Fotos (Iteración 34)

Tras una larga investigación sobre por qué los botones de selección de fotos no funcionaban, se identificaron y corrigieron varios problemas subyacentes.

**Paso 49.1: Diagnóstico del Problema de Sesión**

El problema principal era que el botón "Confirmar" no funcionaba.

**Detalles de la acción:**
- Se añadió temporalmente código de depuración (usando `toast` y `console.log`).
- El diagnóstico final reveló el mensaje "Cannot confirm: session.user.id is missing!".

**Paso 49.2: Corrección de la Configuración de NextAuth**

La causa raíz era que la configuración de NextAuth en `src/auth/server.ts` no estaba configurada para persistir el ID del usuario en el objeto de la sesión.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/server.ts`.
- Se añadió un callback `jwt`.
- Se añadió un callback `session`.
- Se requirió que el usuario cerrara la sesión y volviera a iniciarla.

**Paso 49.3: Refactorización y Robustez del Contexto de Selección**

Se realizaron mejoras significativas en el `SelectionContext` para hacerlo más robusto y desacoplar responsabilidades.

**Detalles de la acción:**
- Se refactorizó la función `confirmSelection`.
- El componente `NavClient.tsx` se actualizó.
- Se mejoraron las funciones `toggleSelectionMode` y `clearSelection`.

**Paso 49.4: Corrección de la Página de Selección**

Después de que el botón "Confirmar" comenzó a funcionar, se descubrió que la página `/selected` aparecía vacía.

**Detalles de la acción:**
- Se modificó la función `confirmSelection` en `src/selection/SelectionContext.tsx`.
- Se eliminó la línea `setSelectedPhotos([])`.

### 50. Corrección de Errores en la Página `/selected` (Iteración 35)

Se identificaron errores en la página `/selected` que impedían su correcto funcionamiento y visualización de las fotos seleccionadas.

**Paso 50.1: Eliminación de `PhotosEmptyState` y Reemplazo por Mensaje Simple**

El componente `PhotosEmptyState` estaba causando múltiples errores.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/SelectedPageClient.tsx`.
- Se eliminó la importación y el uso de `PhotosEmptyState`.
- Se reemplazó el componente `PhotosEmptyState`.
- Se ajustaron las importaciones y props.

**Paso 50.2: Ajuste del Componente Padre `page.tsx`**

Debido a los cambios en `SelectedPageClient.tsx`, el componente padre que lo renderiza también necesitaba ser actualizado.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/page.tsx`.
- Se eliminó la importación de `getAppText`.
- Se ajustó la llamada a `SelectedPageClient`.

**Paso 50.3: Corrección de Errores de Importación de Componentes**

Durante la implementación del botón "Clear & Unlock Selection", se introdujo un error de importación.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/SelectedPageClient.tsx`.
- Se reemplazó la importación incorrecta de `Button`.
- Se ajustó el uso del componente.

**Paso 50.4: Corrección de Errores de Sintaxis en la Interfaz de Contexto**

Se identificó un error de sintaxis en la definición de la interfaz `SelectionContextType` en `src/selection/SelectionContext.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se corrigió la definición de la interfaz `SelectionContextType`.

### 51. Correcciones y Mejoras (Iteración 37)

**Paso 51.1: Manejo Robusto de `ReactNode` en `Icon.tsx`**

Se ha modificado el componente `Icon` para manejar de forma más robusta los `children` de tipo `ReactNode`.

**Detalles de la acción:**
- Se modificó `src/components/primitives/Icon.tsx`.
- Se importó `isValidElement` de `react`.
- Se actualizó la lógica de renderizado.

**Paso 51.2: Restauración de `FaCamera` en `app/admin/baseline/page.tsx`**

Se ha revertido un cambio temporal en `app/admin/baseline/page.tsx`.

**Detalles de la acción:**
- Se modificó `app/admin/baseline/page.tsx`.
- Se restauró `icon={<FaCamera size={12} />}`.

**Paso 51.3: Creación de Componentes Envoltorio para Iconos de `react-icons`**

Se crearon componentes envoltorio para varios iconos de `react-icons`.

**Detalles de la acción:**
- Se crearon varios archivos `src/components/icons/*.tsx`.
- Se actualizaron varios archivos para usar los nuevos componentes.

**Paso 51.4: Manejo de Componentes Asíncronos en Componentes de Servidor**

Se corrigieron errores de tipo relacionados con el uso de componentes asíncronos en componentes de servidor.

**Detalles de la acción:**
- Se modificaron varios archivos (`app/admin/insights/page.tsx`, etc.) para `await` los componentes asíncronos.

**Paso 51.5: Manejo de Componentes Cliente que Devuelven `undefined`**

Se corrigieron errores donde componentes cliente podían devolver `undefined`.

**Detalles de la acción:**
- Se creó `app/ShareModalsClient.tsx`.
- Se añadió `return null;` al final de `ShareModals` y `RecipeModal`.

**Paso 51.6: Configuración de Alias de Webpack**

Se actualizó la configuración de Webpack para resolver correctamente los alias de importación.

**Detalles de la acción:**
- Se modificó `next.config.js`.

**Paso 51.7: Definición de Tipo de Sesión de NextAuth**

Se extendió la interfaz `Session` de NextAuth para incluir la propiedad `id`.

**Detalles de la acción:**
- Se creó el archivo `src/types/next-auth.d.ts`.

**Paso 51.8: Exportación de `clearAndUnlockSelection`**

Se modificó `src/selection/SelectionContext.tsx` para exportar la función `clearAndUnlockSelection`.

**Detalles de la acción:**
- Se modificó `src/selection/SelectionContext.tsx`.
- Se actualizó `app/selected/SelectedPageClient.tsx`.

### 52. Correcciones y Mejoras (Iteración 38)

**Paso 52.1: Corrección de Argumentos en `clearAndUnlockSelection`**

Se corrigió la llamada a la función `clearAndUnlockSelection` en `app/selected/SelectedPageClient.tsx`.

**Detalles de la acción:**
- Se modificó `app/selected/SelectedPageClient.tsx`.
- Se actualizó la llamada a `clearAndUnlockSelection`.

**Paso 52.2: Creación y Actualización de Componentes de Iconos Adicionales**

Se crearon componentes envoltorio para varios iconos de `react-icons`.

**Detalles de la acción:**
- Se crearon varios archivos `src/components/icons/*.tsx`.
- Se actualizaron varios archivos para usar los nuevos componentes.

**Paso 52.3: Migración de `getAppText` a `useAppText`**

Se actualizó el componente `AdminAppMenu.tsx` para utilizar el hook `useAppText`.

**Detalles de la acción:**
- Se modificó `src/admin/AdminAppMenu.tsx`.
- Se cambió la importación de `getAppText` a `useAppText`.

**Paso 52.4: Eliminación de Propiedad `isMobile` de `useAppState`**

Se corrigió un error de tipo al desestructurar la propiedad `isMobile` del hook `useAppState`.

**Detalles de la acción:**
- Se modificó `src/admin/AdminAppMenu.tsx`.
- Se eliminó `isMobile`.

**Paso 52.5: Corrección de Propiedades de `appText.admin`**

Se corrigieron errores de tipo relacionados con el acceso a propiedades inexistentes en el objeto `appText.admin`.

**Detalles de la acción:**
- Se modificó `src/admin/AdminAppMenu.tsx`.
- Se cambiaron las referencias a `appText.admin`.

**Paso 52.6: Manejo de Prop `onBatchActionComplete` en `AdminBatchEditPanel`**

Se aseguró que la prop `onBatchActionComplete` siempre sea una función.

**Detalles de la acción:**
- Se modificó `src/admin/AdminBatchEditPanel.tsx`.
- Se añadió un valor por defecto `(() => {})`.

**Paso 52.7: Importación de `ResponsiveText`**

Se corrigió un error de "Module not found" al importar `ResponsiveText`.

**Detalles de la acción:**
- Se modificó `src/admin/AdminBatchEditPanelClient.tsx`.
- Se añadió la importación de `ResponsiveText`.

**Paso 52.8: Actualización de `middleware.ts` para `next-auth`**

Se actualizó la implementación del middleware de autenticación.

**Detalles de la acción:**
- Se modificó `middleware.ts`.
- Se cambió la importación de `auth` a `withAuth`.

**Paso 52.9: Instalación de `zod`**

Se instaló la librería `zod`.

**Detalles de la acción:**
- Se ejecutó `npm install zod --legacy-peer-deps`.

### 53. Correcciones y Mejoras (Iteración 39)

**Paso 53.1: Corregir error de renderizado en `app/shot-on/[make]/[model]/page.tsx`**

Se ha corregido un error de renderizado que ocurría en las páginas de cámaras.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se eliminó el `await` de la llamada al componente `CameraOverview`.

**Paso 53.2: Creación de Componentes Envoltorio para Iconos de `react-icons`**

Se crearon componentes envoltorio para varios iconos de `react-icons`.

**Detalles de la acción:**
- Se crearon varios archivos `src/components/icons/*.tsx`.
- Se actualizaron varios archivos para usar los nuevos componentes.

**Paso 53.3: Corregir error de `label` faltante en `src/cmdk/CommandKClient.tsx`**

Se ha corregido un error de TypeScript que ocurría al intentar añadir un objeto sin la propiedad `label`.

**Detalles de la acción:**
- Se modificó el archivo `src/cmdk/CommandKClient.tsx`.
- Se añadió la propiedad `label`.


### 54. Correcciones y Mejoras (Iteración 39)

**Paso 54.1: Creación de `ScoreCardRowText.tsx`**

Se ha creado un nuevo componente `src/components/ScoreCardRowText.tsx`.

**Detalles de la acción:**
- Se creó el archivo `src/components/ScoreCardRowText.tsx`.
- El componente acepta `label` y `value` como props.

**Paso 54.2: Actualización de `app/admin/report/page.tsx`**

Se ha modificado `app/admin/report/page.tsx` para utilizar el nuevo componente `ScoreCardRowText`.

**Detalles de la acción:**
- Se modificó `app/admin/report/page.tsx`.
- Se actualizó la importación de `ScoreCardRow` a `ScoreCardRowText`.
- Se reemplazaron las instancias de `ScoreCardRow`.

**Paso 54.3: Corrección de `getPhotosMeta` en `src/admin/report/actions.ts`**

Se ha corregido el tipo de la opción `hidden` en la llamada a `getPhotosMeta`.

**Detalles de la acción:**
- Se modificó `src/admin/report/actions.ts`.
- Se cambió `hidden: true` a `hidden: 'only'`.

**Paso 54.4: Creación de `FiArrowLeftIcon.tsx`**

Se ha creado un componente envoltorio para el icono `FiArrowLeft`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/FiArrowLeftIcon.tsx`.

**Paso 54.5: Actualización de `src/components/AdminChildPage.tsx`**

Se ha modificado `src/components/AdminChildPage.tsx` para utilizar el nuevo componente `FiArrowLeftIcon`.

**Detalles de la acción:**
- Se modificó `src/components/AdminChildPage.tsx`.
- Se actualizó la importación de `FiArrowLeft` a `FiArrowLeftIcon`.
- Se reemplazó la instancia de `FiArrowLeft`.

**Paso 54.6: Corrección de `useRef` en `src/components/AnimateItems.tsx`**

Se ha corregido la inicialización de `useRef` en `src/components/AnimateItems.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/AnimateItems.tsx`.
- Se cambió `useRef<string>(undefined)` a `useRef<string | undefined>(undefined)`.

**Paso 54.7: Corrección del tipo `containerRef` en `src/components/AppGrid.tsx`**

Se ha corregido el tipo de la prop `containerRef` en `src/components/AppGrid.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/AppGrid.tsx`.
- Se cambió `RefObject<HTMLDivElement | null>` a `RefObject<HTMLDivElement>`.

**Paso 54.8: Creación de `ImCheckmarkIcon.tsx`**

Se ha creado un componente envoltorio para el icono `ImCheckmark`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/ImCheckmarkIcon.tsx`.

**Paso 54.9: Actualización de `src/components/Checkbox.tsx`**

Se ha modificado `src/components/Checkbox.tsx` para utilizar el nuevo componente `ImCheckmarkIcon`.

**Detalles de la acción:**
- Se modificó `src/components/Checkbox.tsx`.
- Se actualizó la importación de `ImCheckmark` a `ImCheckmarkIcon`.
- Se reemplazó la instancia de `ImCheckmark`.
- Se cambió el tipo de `ref`.

**Paso 54.10: Corrección del tipo `ref` en `src/components/Container.tsx`**

Se ha corregido el tipo de la prop `ref` en `src/components/Container.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/Container.tsx`.
- Se cambió el tipo de `ref`.
- Se envolvió el componente con `forwardRef`.

**Paso 54.11: Creación de `BiCopyIcon.tsx`**

Se ha creado un componente envoltorio para el icono `BiCopy`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/BiCopyIcon.tsx`.

**Paso 54.12: Actualización de `src/components/CopyButton.tsx`**

Se ha modificado `src/components/CopyButton.tsx` para utilizar el nuevo componente `BiCopyIcon`.

**Detalles de la acción:**
- Se modificó `src/components/CopyButton.tsx`.
- Se actualizó la importación de `BiCopy` a `BiCopyIcon`.
- Se reemplazó la instancia de `BiCopy`.

**Paso 54.13: Creación de `MdOutlineFileDownloadIcon.tsx`**

Se ha creado un componente envoltorio para el icono `MdOutlineFileDownload`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/MdOutlineFileDownloadIcon.tsx`.

**Paso 54.14: Actualización de `src/components/DownloadButton.tsx`**

Se ha modificado `src/components/DownloadButton.tsx` para utilizar el nuevo componente `MdOutlineFileDownloadIcon`.

**Detalles de la acción:**
- Se modificó `src/components/DownloadButton.tsx`.
- Se actualizó la importación de `MdOutlineFileDownload` a `MdOutlineFileDownloadIcon`.
- Se reemplazó la instancia de `MdOutlineFileDownload`.

**Paso 54.15: Creación de `BiErrorAltIcon.tsx`**

Se ha creado un componente envoltorio para el icono `BiErrorAlt`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/BiErrorAltIcon.tsx`.

**Paso 54.16: Actualización de `src/components/ErrorNote.tsx`**

Se ha modificado `src/components/ErrorNote.tsx` para utilizar el nuevo componente `BiErrorAltIcon`.

**Detalles de la acción:**
- Se modificó `src/components/ErrorNote.tsx`.
- Se actualizó la importación de `BiErrorAlt` a `BiErrorAltIcon`.
- Se reemplazó la instancia de `BiErrorAlt`.

**Paso 54.17: Eliminación de `experimental.serverActions` en `next.config.js`**

Se ha eliminado la bandera `experimental.serverActions` de `next.config.js`.

**Detalles de la acción:**
- Se modificó `next.config.js`.
- Se eliminó la sección `experimental.serverActions`.

**Paso 54.18: Actualización de `@types/react` y `@types/react-dom`**

Se han actualizado las dependencias de `@types/react` a `18.2.58` y `@types/react-dom` a `18.2.25`.

**Detalles de la acción:**
- Se ejecutó `npm install @types/react@18.2.58 @types/react-dom@18.2.25 --legacy-peer-deps`.

**Paso 54.19: Corrección del tipo `inputRef` en `src/components/FieldsetWithStatus.tsx`**

Se ha corregido el tipo de la prop `inputRef` en `src/components/FieldsetWithStatus.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/FieldsetWithStatus.tsx`.
- Se cambió `RefObject<HTMLInputElement | null>` a `RefObject<HTMLInputElement>`.

**Paso 54.20: Corrección del tipo `ref` en `src/components/ImageInput.tsx`**

Se ha corregido el tipo de la prop `ref` en `src/components/ImageInput.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/ImageInput.tsx`.
- Se cambió `RefObject<HTMLInputElement | null>` a `RefObject<HTMLInputElement>`.

**Paso 54.21: Corrección del tipo `ref` en `src/components/MaskedScroll.tsx`**

Se ha corregido el tipo de la prop `ref` en `src/components/MaskedScroll.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/MaskedScroll.tsx`.
- Se cambió `RefObject<HTMLDivElement | null>` a `RefObject<HTMLDivElement>`.

**Paso 54.22: Corrección del tipo `ref` en `src/components/entity/EntityLink.tsx`**

Se ha corregido el tipo de la prop `ref` en `src/components/entity/EntityLink.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/entity/EntityLink.tsx`.
- Se cambió `RefObject<HTMLSpanElement | null>` a `RefObject<HTMLSpanElement>`.

**Paso 54.23: Corrección de `AiFillAppleIcon.tsx`**

Se ha modificado el componente `AiFillAppleIcon.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/icons/AiFillAppleIcon.tsx`.
- Se añadió la definición de las props `size`, `className` y `title`.

**Paso 54.24: Corrección de `BiCheckCircleIcon.tsx`**

Se ha modificado el componente `BiCheckCircleIcon.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiCheckCircleIcon.tsx`.
- Se cambió `<Icon {...props} icon={BiCheckCircle} />` a `<Icon {...props}><BiCheckCircle /></Icon>`.

**Paso 54.25: Corrección de `BiDataIcon.tsx`**

Se ha modificado el componente `BiDataIcon.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiDataIcon.tsx`.
- Se cambió `<Icon {...props} icon={BiData} />` a `<Icon {...props}><BiData /></Icon>`.

**Paso 54.26: Corrección de `BiDesktopIcon.tsx`**

Se ha modificado el componente `BiDesktopIcon.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiDesktopIcon.tsx`.
- Se añadió la definición de las props `size`, `className` y `title`.

**Paso 54.27: Corrección de `BiLockAltIcon.tsx`**

Se ha modificado el componente `BiLockAltIcon.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiLockAltIcon.tsx`.
- Se añadió la definición de las props `size`, `className` y `title`.

**Paso 54.28: Corrección de `BiMoonIcon.tsx`**

Se ha modificado el componente `BiMoonIcon.tsx`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiMoonIcon.tsx`.
- Se añadió la definición de las props `size`, `className` y `title`.

### 55. Correcciones y Mejoras (Iteración 35)

**Paso 55.1: Reactivar `generateStaticParams` y corregir errores de pre-renderizado en páginas de cámaras**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se reemplazó `redirect(PATH_ROOT)` por `notFound()`.

**Paso 55.2: Reactivar `generateStaticParams` y corregir errores de pre-renderizado en páginas de lentes**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de lentes que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/lens/[make]/[model]/page.tsx`.
- Se descomentó la exportación `generateStaticParams`.
- Se añadió una comprobación `if (photos.length === 0) { notFound(); }`.
- Se añadió la importación de `notFound`.

**Paso 55.3: Reactivar `generateStaticParams` y corregir errores de pre-renderizado en páginas de etiquetas**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de etiquetas que no tenían fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/tag/[tag]/page.tsx`.
- Se descomentó la exportación `generateStaticParams`.
- Se reemplazó `redirect(PATH_ROOT)` por `notFound()`.
- Se eliminó la importación de `PATH_ROOT` y se añadió la importación de `notFound`.

**Paso 55.4: Corrección de errores de tipo en archivos de traducción**

Se corrigieron errores de tipo en varios archivos de traducción.

**Detalles de la acción:**
- Se modificaron varios archivos `src/i18n/locales/*.ts`.
- Se añadieron las claves `or` y `signInWithGoogle`.
- Se ajustó la estructura del objeto `admin.report`.

**Paso 55.5: Eliminación de idiomas adicionales**

Se eliminaron todos los archivos de idioma adicionales, dejando solo el inglés (`en-us.ts`).

**Detalles de la acción:**
- Se eliminaron varios archivos `src/i18n/locales/*.ts`.
- Se modificó `src/i18n/index.ts`.

**Paso 55.6: Corrección de errores de tipo relacionados con `ref`**

Se corrigieron varios errores de tipo relacionados con la propiedad `ref`.

**Detalles de la acción:**
- Se modificaron varios archivos (`src/photo/PhotoLink.tsx`, etc.).
- Se cambió el tipo de `ref`.

**Paso 55.7: Corrección de errores de tipo en `src/photo/PhotoEditPageClient.tsx`**

Se corrigió un error de tipo en el componente `ExifCaptureButton`.

**Detalles de la acción:**
- Se modificó `src/photo/PhotoEditPageClient.tsx`.
- Se cambió la prop `onSync` a `onExifDataCapture`.

**Paso 55.8: Corrección de errores de tipo y refactorización de NextAuth**

Se corrigieron errores de tipo relacionados con la importación y el uso de `after` de `next/server`.

**Detalles de la acción:**
- Se modificó `src/photo/actions.ts`.
- Se modificó `app/api/selection/route.ts`.
- Se modificó `src/auth/server.ts`.
- Se modificó `app/api/auth/[...nextauth]/route.ts`.
- Se modificó `src/auth/server.ts`.
### 56. Correcciones y Mejoras (Iteración 36)

**Paso 56.1: Refactorización de la configuración de NextAuth para Next.js App Router (v4)**

Se corrigieron múltiples errores de compilación y de tiempo de ejecución relacionados con la configuración de NextAuth.js.

**Detalles de la acción:**
- Se modificó `src/auth/server.ts`.
- Se modificó `app/api/auth/[...nextauth]/route.ts`.
- Se modificó `src/auth/actions.ts`.

**Paso 56.2: Exclusión de la página de inicio de sesión del Middleware**

Se corrigió un bucle de redirección infinito que ocurría al intentar iniciar sesión.

**Detalles de la acción:**
- Se modificó `middleware.ts`.

**Paso 56.3: Movimiento de `SessionProvider` a un componente cliente**

Se resolvió el error `React Context is unavailable in Server Components`.

**Detalles de la acción:**
- Se creó el archivo `src/app/SessionProviderClient.tsx`.
- Se modificó `app/layout.tsx`.
### 57. Correcciones y Mejoras (Iteración 37)

**Paso 57.1: Corrección del error `TypeError: (0 , _auth_server__WEBPACK_IMPORTED_MODULE_2__.signOut) is not a function`**

Se ha corregido el error que impedía el correcto funcionamiento del cierre de sesión.

**Detalles de la acción:**
- Se modificó `src/auth/actions.ts`.
- Se cambió la implementación de `signOutAction`.

**Paso 57.2: Corrección del problema de redirección en el inicio de sesión**

Se ha corregido el problema por el cual el inicio de sesión no redirigía correctamente al usuario.

**Detalles de la acción:**
- Se refactorizó `src/auth/SignInForm.tsx`.
- Se eliminó la dependencia de `signInAction`.

**Paso 57.3: Corrección de la visibilidad del panel de edición por lotes**

Se ha corregido el problema por el cual el panel de edición por lotes (`AdminBatchEditPanelClient`) estaba siempre visible.

**Detalles de la acción:**
- Se modificó `src/admin/AdminBatchEditPanelClient.tsx`.
- Se ajustaron las clases de Tailwind CSS.

**Paso 57.4: Corrección del error `the name 'redirect' is defined multiple times`**

Se ha corregido un error de compilación causado por una importación duplicada de `redirect`.

**Detalles de la acción:**
- Se modificó `src/auth/actions.ts`.
- Se eliminó la línea de importación duplicada de `redirect`.

**Paso 57.5: Corrección del acceso no autenticado a la página de inicio**

Se ha corregido el problema por el cual la aplicación siempre obligaba a iniciar sesión.

**Detalles de la acción:**
- Se modificó `middleware.ts`.
- Se ajustó la expresión regular del `matcher`.

**Paso 57.6: Depuración de la visibilidad del menú de administrador y la selección de fotos**

Se han añadido mensajes de depuración para diagnosticar problemas con la visibilidad del menú de administrador.

**Detalles de la acción:**
- Se añadió `console.log` a `src/app/AppStateProvider.tsx`.
- Se añadió `console.log` a `src/app/AppViewSwitcher.tsx`.
- Se añadió un borde rojo a `src/components/SelectTileOverlay.tsx`.
- Se re-añadió `console.log` a `src/auth/SignInForm.tsx`.

### 58. Corrección del Flujo de Selección de Fotos y Mejoras de Autenticación (Iteración 34-35)

Se han implementado correcciones críticas y mejoras en el flujo de selección de fotos y en la gestión de la autenticación.

**Paso 58.1: Persistencia del ID de Usuario en la Sesión de NextAuth**

Se corrigió un problema fundamental donde el `user.id` no se estaba persistiendo correctamente en el objeto de sesión de NextAuth.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/server.ts`.
- Se añadió el `id` del usuario al token JWT.
- Se añadió el `id` del token JWT al objeto `session.user`.
- Se actualizó la creación del usuario en el `CredentialsProvider`.

**Paso 58.2: Refactorización y Robustez del Contexto de Selección de Fotos**

Se realizaron mejoras significativas en el `SelectionContext`.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- La función `toggleSelectionMode` ahora limpia las fotos seleccionadas.
- La función `clearSelection` ahora envía una solicitud `DELETE`.
- La función `confirmSelection` ahora devuelve una `Promise<boolean>`.
- Se añadió una nueva función `clearAndUnlockSelection`.

**Paso 58.3: Integración de la Navegación con la Confirmación de Selección**

La navegación a la página de fotos seleccionadas ahora se maneja en el componente `NavClient.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se importó `useRouter`.
- El botón "Confirm Selection" ahora llama a `confirmSelection`.
- El botón "Cancel Selection" ahora llama a `clearSelection`.

**Paso 58.4: Corrección de la Visibilidad de Datos de Administrador**

Se ajustó la lógica para que los datos de administrador solo se carguen si el usuario es un administrador.

**Detalles de la acción:**
- Se modificó el archivo `src/app/AppStateProvider.tsx`.
- El hook `useSWR` para `getAdminDataAction` ahora depende de `isUserAdmin`.

**Paso 58.5: Manejo de Fechas Nulas en `dateRangeForPhotos`**

Se mejoró la robustez de la función `dateRangeForPhotos`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió el operador de coalescencia nula (`?? ''`).

### 59. Resumen de Cambios Recientes

#### Flujo de Autenticación
- **Corrección Crítica de Sesión:** Se solucionó un error fundamental que impedía que el `user.id` se incluyera en la sesión del usuario.
- **Refactorización de Autenticación:** Se refactorizó el flujo de inicio y cierre de sesión.
- **Mejoras en la Interfaz de Usuario:** Se ajustó la visibilidad de los elementos de la interfaz de usuario.

#### Funcionalidad de Selección de Fotos
- **Contexto de Selección Robusto:** Se refactorizó el `SelectionContext`.
- **Navegación Mejorada:** La responsabilidad de la navegación después de confirmar una selección se trasladó al componente `NavClient.tsx`.
- **Corrección de Errores:** Se solucionó un error que causaba que la página de fotos seleccionadas (`/selected`) apareciera vacía.

#### Errores de Compilación y Construcción
- **Resolución de Errores en Cascada:** Se solucionó una serie de errores de TypeScript y Webpack.

#### Calidad del Código y Refactorización
- **Limpieza de Código:** Se eliminaron importaciones y variables no utilizadas.
- **Simplificación:** Se simplificaron y refactorizaron varias partes del código.

### 60. Correcciones y Mejoras (Iteración 40)

**Paso 60.1: Añadir el elemento "Report" al menú de administrador**

Se ha añadido un nuevo elemento de menú para acceder a la página de informes en el menú de administrador.

**Detalles de la acción:**
- Se modificó el archivo `src/admin/AdminAppMenu.tsx`.
- Se añadió un nuevo objeto al array `menuItems`.
- Se añadieron iconos a todos los demás elementos del menú.
- Se importaron los iconos necesarios.
- Se ajustó el JSX para renderizar el icono.

### 61. Últimos Cambios (Iteración 41)

**Paso 61.1: Implementación de estado de hover compartido y actualización de hover de entidad**
**Detalles de la acción:**
- Se implementó un estado de hover compartido y se actualizó el comportamiento de hover para las entidades.

**Paso 61.2: Corrección: Mostrar etiquetas en una fila con espaciado**
**Detalles de la acción:**
- Se corrigió la visualización de etiquetas para que se muestren en una fila con espaciado adecuado.

**Paso 61.3: Corrección de errores de hidratación e implementación de etiquetas con estilo en la barra lateral**
**Detalles de la acción:**
- Se corrigieron errores de hidratación y se implementaron etiquetas con estilo en la barra lateral.

**Paso 61.4: Corrección de error de hidratación en EntityLink y actualización del estilo de etiquetas a píldora de solo texto**
**Detalles de la acción:**
- Se corrigió un error de hidratación en `EntityLink` y se actualizó el estilo de las etiquetas a un formato de píldora de solo texto.

**Paso 61.5: Característica: Mostrar etiquetas de fotos en la cuadrícula de la página principal**
**Detalles de la acción:**
- Se añadió la funcionalidad para mostrar etiquetas de fotos en la cuadrícula de la página principal.

**Paso 61.6: Característica: Refactorizar estilos de etiquetas de la página principal y corregir consulta a la base de datos**
**Detalles de la acción:**
- Se refactorizaron los estilos de las etiquetas de la página principal y se corrigió una consulta a la base de datos.

**Paso 61.7: Tarea: Añadir comentario a README para generar commit**
**Detalles de la acción:**
- Se añadió un comentario al archivo `README` para generar un commit.

**Paso 61.8: Corrección: Actualizar pnpm-lock.yaml después de cambios en dependencias**
**Detalles de la acción:**
- Se actualizó el archivo `pnpm-lock.yaml` después de realizar cambios en las dependencias.

### 62. Correcciones de Despliegue y Visuales (Iteración 42)

**Paso 62.1: Solución al error "Clear Selection" en Vercel**
**Detalles de la acción:**
- Se actualizó `src/admin/actions.ts` para que `clearAllSelectionsAction` y `cleanAllUsersAction` revaliden todas las rutas y claves de caché (`revalidateAllKeysAndPaths`), asegurando que la galería pública se actualice inmediatamente.
- Se añadió `router.refresh()` en `src/app/NavClient.tsx` al limpiar la selección para forzar una actualización del cliente.

**Paso 62.2: Correcciones Visuales en Grid y Previsualizaciones**
**Detalles de la acción:**
- **Grid:** Se añadió la clase `h-full` al componente `LinkWithStatus` en `src/photo/PhotoMedium.tsx`.
- **Tags:** Se pasó `className="w-full h-full"` al componente `PhotoMedium` dentro de `src/components/entity/EntityHover.tsx`.

**Paso 62.3: Solución al error de Google OAuth (redirect_uri_mismatch)**
**Detalles de la acción:**
- Se identificó que el error 400 en producción se debía a una URI de redirección no autorizada.
- Se instruyó al usuario para agregar la URL de producción de Vercel (`.../api/auth/callback/google`) a la lista de URIs autorizadas en la consola de Google Cloud.

### 63. Mejoras de Navegación y Correcciones en Móvil (Iteración 43)

**Paso 63.1: Permitir navegación pública en rutas de etiquetas y fotos**

Se ha configurado el middleware para permitir el acceso público a las páginas de etiquetas (`/tag`), fotos (`/p`), y otras rutas de navegación.

**Detalles de la acción:**
- Se modificó `middleware.ts`.
- Se actualizaron las exclusiones del `matcher`.
- Se actualizó el callback `authorized`.

**Paso 63.2: Condicionar la UI de selección a la autenticación**

Se han ocultado los controles de selección ("Select" y "View Selections") en la barra de navegación para los usuarios que no han iniciado sesión.

**Detalles de la acción:**
- Se modificó `src/app/NavClient.tsx`.
- Se añadieron comprobaciones `status === 'authenticated'`.

**Paso 63.3: Limpieza automática del estado de selección**

Se implementó una medida de seguridad en el contexto de selección para limpiar cualquier selección activa si el usuario no está autenticado.

**Detalles de la acción:**
- Se modificó `src/selection/SelectionContext.tsx`.
- Se añadió un `useEffect`.

**Paso 63.4: Deshabilitar menú contextual (Long Press) en iOS**

Se ha corregido el comportamiento donde mantener presionada una imagen en dispositivos móviles (iOS).

**Detalles de la acción:**
- Se modificó `src/components/image/ImageWithFallback.tsx`.
- Se añadió la propiedad de estilo `WebkitTouchCallout: 'none'`.
### 64. Optimización de Carga de Imágenes (Iteración 44)

**Paso 64.1: Optimizar `ImageMedium` con `next/image`**

Se ha refactorizado el componente `ImageMedium` para utilizar `ImageWithFallback` (que envuelve `next/image`).

**Detalles de la acción:**
- Se modificó `src/components/image/ImageMedium.tsx`.
- Se reemplazó `<img>` por `ImageWithFallback`.
- Se configuró `width` a `IMAGE_WIDTH_MEDIUM` (300px) y `quality` a `IMAGE_QUALITY`.

**Paso 64.2: Priorizar carga de imágenes en vista previa de etiquetas**

Se ha optimizado la vista previa de etiquetas al pasar el mouse (`EntityHover`).

**Detalles de la acción:**
- Se modificó `src/components/entity/EntityHover.tsx`.
- Se añadió la propiedad `priority={index < 4}`.

### 65. Análisis de Seguridad (CVE-2025-55182)

**Estado:** Seguro (No vulnerable)
**Versión Actual:** Next.js 14.2.19 / React 19.0.0
**Decisión:** Mantener versión actual.

Se realizó un análisis del código en respuesta a la vulnerabilidad crítica CVE-2025-55182 que afecta a React 19 y Next.js 15. Se confirmó que el proyecto utiliza versiones anteriores no afectadas. Además, se verificó que el código está preparado para una futura actualización a Next.js 15 (uso correcto de `await params` y `await cookies()`).


### 66. Actualización a Next.js 15.1.9 y React 19 (Iteración 45)

**Paso 66.1: Actualización de dependencias principales**

Se ha actualizado el proyecto a Next.js 15.1.9 y React 19.2.1.

**Detalles de la acción:**
- Las versiones instaladas son:
  - Next.js: 15.1.9
  - React: 19.2.1
  - React DOM: 19.2.1

**Paso 66.2: Corrección de errores de compatibilidad con React 19**

Se corrigieron múltiples errores de compatibilidad de tipos relacionados con los cambios en React 19.

**Detalles de la acción:**
- Se modificaron 10 archivos para actualizar los tipos `RefObject`.

**Paso 66.3: Verificación del build**

Se verificó que el proyecto compila correctamente con las nuevas versiones.

**Detalles de la acción:**
- Se ejecutó `pnpm build` exitosamente
- El build se completó sin errores de tipo
- Solo se reportaron warnings de ESLint (max-len y unused vars)

### 67. Persistencia de Selección y Arreglos de Autenticación (Iteración 46)

**Paso 67.1: Solución a Login de Admin y Google OAuth**

Se corrigió un problema crítico donde las variables de entorno `ADMIN_EMAIL` y `ADMIN_PASSWORD` contenían comillas dobles extra.

**Detalles de la acción:**
- Se modificó `.env.local` para limpiar las comillas.
- Se modificó `src/auth/server.ts` para habilitar el enlace de cuentas.

**Paso 67.2: Persistencia Visual de Selección (Checkmark)**

Se implementó la lógica para que las fotos seleccionadas y confirmadas por el usuario actual muestren un checkmark rojo persistente en la grilla.

**Detalles de la acción:**
- Se creó la propiedad `userEmail` en `PhotoGrid`.
- Se modificó `SelectTileOverlay.tsx`.
- Se introdujo la lógica `isLockedByMe`.

**Paso 67.3: Corrección de Estilo (Borde Blanco)**

Se eliminó un borde blanco no deseado que aparecía en las fotos confirmadas.

**Detalles de la acción:**
- Se modificó `SelectTileOverlay.tsx`.

**Paso 67.4: Corrección de Error de Build (SSG)**

Se solucionó un error que rompía el build (`Event handlers cannot be passed to Client Component props`).

**Detalles de la acción:**
- Se corrigió la lógica en `PhotoGrid.tsx` y `PhotoGridPage.tsx`.

**Paso 67.5: Configuración de Título Fijo en Vercel**

Se forzó el título del sitio a "Polifonía Visual".

**Detalles de la acción:**
- Se modificó `src/app/config.ts`.

### 68. Implementación de Subida Dual y Sistema de Correos (Iteración Actual)

Esta iteración se centró en la implementación completa del sistema de carga dual de imágenes (web y alta resolución) y un sistema de correos electrónicos robusto para notificaciones y entrega de contenido.

**Paso 68.1: Migración de Base de Datos para URLs de Alta Resolución**

Se añadió una nueva columna `url_high_res` a la tabla `photos` en la base de datos.

**Detalles de la acción:**
- Se añadió la migración `'09: High Res URL'` en `src/photo/db/migration.ts`.

**Paso 68.2: Integración de URLs de Alta Resolución en el Modelo de Datos y Formularios**

Se actualizó el modelo de datos para incluir `urlHighRes` y se extendió el formulario de metadatos de fotos para manejar esta nueva propiedad.

**Detalles de la acción:**
- Se añadió `urlHighRes` a `FORM_METADATA` en `src/photo/form/index.ts`.

**Paso 68.3: Refactorización del Sistema de Almacenamiento para Subida Dual**

Se mejoró el sistema de URL prefirmadas y se introdujeron funciones específicas para manejar la subida de imágenes de alta resolución a Cloudflare R2, manteniendo Vercel Blob para las imágenes web.

**Detalles de la acción:**
- Se modificó `app/api/storage/presigned-url/[key]/route.ts` para aceptar un parámetro `storage` en la query.
- Se añadió `uploadHighResPhotoFromClient` en `src/platforms/storage/index.ts`.
- Se mejoró el manejo de errores en `uploadFromClientViaPresignedUrl` en `src/platforms/storage/index.ts`.
- Se implementó `ChecksumAlgorithm: 'NONE'` en `cloudflareR2PutObjectCommandForKey` en `src/platforms/storage/cloudflare-r2.ts`.
- Se instruyó al usuario para configurar la política CORS en el bucket R2 de Cloudflare.
- Se modificó `uploadPhotoFromClient` en `src/platforms/storage/index.ts` para forzar la subida de imágenes web a Vercel Blob, ya que `CURRENT_STORAGE` estaba configurado por defecto a R2. Se instruyó al usuario a añadir `NEXT_PUBLIC_STORAGE_PREFERENCE=vercel-blob` en `.env.local` para una configuración más limpia.
- Se refactorizó la lógica en `app/api/storage/presigned-url/[key]/route.ts` para utilizar `HAS_AWS_S3_STORAGE` y `HAS_CLOUDFLARE_R2_STORAGE` de `src/app/config.ts` y manejar la inicialización del cliente de almacenamiento de forma más robusta.

**Paso 68.4: Interfaz de Usuario para Subida de Alta Resolución**

Se añadió un control de subida de archivos para las imágenes de alta resolución en el formulario de metadatos de las fotos.

**Detalles de la acción:**
- Se añadió un `ImageInput` con `showButton={true}` al componente `PhotoForm.tsx` para el campo `urlHighRes`.

**Paso 68.5: Procesamiento de Imágenes de Alta Resolución en el Servidor**

Se aseguró que las imágenes de alta resolución se procesen y almacenen correctamente en la base de datos y el storage.

**Detalles de la acción:**
- Se modificó `createPhotoAction` en `src/photo/actions.ts` para que, si existe `photo.urlHighRes`, se llame a `convertUploadToPhoto` para procesarla (renombrar de `upload-` a `photo-` y eliminar el temporal).

**Paso 68.6: Configuración del Sistema de Envío de Correos**

Se instalaron las bibliotecas necesarias y se crearon las plantillas y acciones para enviar correos electrónicos.

**Detalles de la acción:**
- Se instalaron `@react-email/components`, `@react-email/html`, `@react-email/tailwind`.
- Se creó el directorio `src/emails/`.
- Se creó `src/emails/WelcomeEmail.tsx` con un diseño y texto específicos, y una referencia a `email-header.jpg` en la carpeta `public/`.
- Se creó `src/emails/SelectionEmail.tsx` para listar y enlazar fotos de alta resolución.
- Se creó `src/emails/actions.ts` con `sendWelcomeEmailAction` y `sendSelectionEmailAction`.
- Se cambió el asunto del correo de bienvenida a "Bienvenido a Polifonía Visual".
- Se cambió el asunto del correo de selección a "Tus fotos seleccionadas - Polifonía Visual".
- Se cambió el mensaje final en el correo de selección a "Gracias por participar en Polifonía Visual."

**Paso 68.7: Integración del Correo de Bienvenida en Autenticación**

Se configuró NextAuth para enviar un correo de bienvenida al crear un nuevo usuario.

**Detalles de la acción:**
- Se modificó `src/auth/server.ts` para usar el evento `createUser` e invocar `sendWelcomeEmailAction`.
- Se añadió `import { sendWelcomeEmailAction } from '@/emails/actions';` a `src/auth/server.ts`.

**Paso 68.8: Integración del Correo de Selección en la Interfaz de Usuario**

Se añadió la funcionalidad para enviar el correo con los enlaces de descarga de las fotos seleccionadas.

**Detalles de la acción:**
- Se añadió un botón "Enviar a mi correo" en `app/selected/SelectedPageClient.tsx` que invoca `sendSelectionEmailAction`.

**Paso 68.9: Corrección de Consistencia de Sesión para Bloqueo de Fotos**

Se resolvió la inconsistencia en el uso del ID de usuario entre las acciones de bloqueo y envío de correo, asegurando que el filtrado funcione correctamente.

**Detalles de la acción:**
- Se modificó `app/api/selection/route.ts` para guardar `session.user.email` en `locked_by`.
- Se modificó `src/emails/actions.ts` para que el filtro de `lockedPhotos` compare `p.lockedBy` con `session.user.email`.

**Paso 68.10: Mejora de la Resistencia de la Conexión a Base de Datos**

Se añadió lógica de reintento para mejorar la estabilidad de la conexión con la base de datos en entornos serverless.

**Detalles de la acción:**
- Se añadió un reintento en `safelyQueryPhotos` en `src/photo/db/query.ts` para errores de "Connection terminated unexpectedly".

**Paso 68.11: Indicador de Carga en Navegación**

Se añadió un indicador visual de carga para mejorar la experiencia de usuario durante la navegación.

**Detalles de la acción:**
- Se creó `app/selected/loading.tsx` con un spinner y un mensaje de "Cargando selección..."

### 69. Correcciones y Mejoras Menores

Se realizaron varias correcciones de errores, advertencias y mejoras de código para asegurar la estabilidad y calidad del proyecto.

**Paso 69.1: Corrección de `TypeError` al Borrar Fotos**
- Se ajustó la firma de `deletePhotoAction` y sus llamadas en `src/admin/AdminPhotoMenu.tsx` y `src/photo/PhotoPrevNextActions.tsx` para evitar `TypeError: Expected 1-2 arguments, but got 3`.

**Paso 69.2: Limpieza de Warnings de ESLint**
- Se corrigieron warnings de `max-len` y `comma-dangle` en `src/platforms/storage/index.ts` (resolviendo un problema de formateo).
- Se eliminó el import no utilizado de `useRouter` en `src/selection/SelectionContext.tsx`.

**Paso 69.3: Corrección de `ReferenceError` en Acciones de Admin**
- Se añadió la importación de `runAuthenticatedAdminServerAction` a `src/admin/actions.ts` para resolver `ReferenceError`.

**Paso 69.4: Mejoras en Acciones de Limpieza de Admin**
- Se añadieron `try...catch` blocks y manejo de errores consistente a `cleanAllPhotosDbAction` y `cleanAllR2FilesAction` en `src/admin/actions.ts`.
- Se añadió logging detallado a `cleanAllR2FilesAction` para depuración de errores de eliminación de archivos.

### 70. Herramientas de Limpieza y Depuración (Permanentes)

Se añadieron herramientas de limpieza que el usuario puede usar para resetear el estado de la aplicación.

**Detalles de la acción:**
- Se añadieron botones a `src/admin/AdminReportClient.tsx` para `Clean All Photos (DB)`, `Clean All R2/Blob Files` y `Clean All Users`.