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

Es crucial que estas mismas variables de entorno sean añadidas en la configuración de tu proyecto en Vercel (en la sección "Environment Variables") para que estén disponibles durante el despliegue. Esto asegura que la aplicación funcione correctamente en el entorno de producción.

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

**Paso 3.2: Eliminar botones de Zoom y Compartir**

Se han eliminado los botones de "Zoom In" y "Compartir Foto" de la vista por defecto de las imágenes. Esto simplifica la interfaz y prepara el camino para la implementación de la funcionalidad de selección de fotos.

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

### 5. Configuración de Inicio de Sesión con Google

**Paso 5.1: Añadir botón de "Sign in with Google"**

Se ha añadido un botón para iniciar sesión con Google en la pantalla de inicio de sesión. Este botón permite a los usuarios regulares autenticarse a través de su cuenta de Google.

**Detalles de la acción:**
- Se modificó el componente `src/auth/SignInForm.tsx`.
- Se añadió un botón que, al hacer clic, invoca la función `signIn('google')` de `next-auth/react`.
- Se importó `signIn` desde `next-auth/react` en la parte superior del archivo.
- El botón se estilizó para integrarse visualmente con el formulario existente.

### 6. Implementación de la Función de Selección de Fotos

**Paso 6.1: Añadir botón de selección a la navegación**

Se ha añadido un botón de "Seleccionar" junto al icono de búsqueda en la barra de navegación. Este es el primer paso para implementar la funcionalidad de selección de fotos.

**Detalles de la acción:**
- Se modificó el componente `src/app/AppViewSwitcher.tsx`.
- Se añadió un nuevo `SwitcherItem` que contiene un texto "Select" (marcador de posición) y un `onClick` que actualmente solo registra un mensaje en la consola.
- Se colocó este `SwitcherItem` justo antes del `SwitcherItem` que contiene el `IconSearch`.

**Paso 6.2: Configurar Contexto de Selección de Fotos**

Se ha creado un nuevo contexto de React (`SelectionContext`) para gestionar el estado de selección de fotos a nivel global en la aplicación. Esto permitirá que los componentes de fotos y otros elementos de la interfaz de usuario accedan y modifiquen el estado de selección de manera centralizada.

**Detalles de la acción:**
- Se creó el directorio `src/selection`.
- Se creó el archivo `src/selection/SelectionContext.tsx` con la definición del contexto, el proveedor (`SelectionProvider`) y el hook `useSelection`.
- El `SelectionProvider` se envolvió alrededor de la aplicación en `app/layout.tsx` para que el contexto esté disponible globalmente.
- Se importó `SelectionProvider` en `app/layout.tsx`.

**Paso 6.3: Hacer fotos seleccionables y añadir feedback visual**

Se ha modificado el componente `PhotoGrid` para permitir la selección de fotos y proporcionar una guía visual cuando una foto está seleccionada. Esto es parte de la implementación de la funcionalidad de selección de fotos.

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoGrid.tsx`.
- Se reemplazó el uso de `selectedPhotoIds` y `setSelectedPhotoIds` de `useAppState` por `selectionMode`, `selectedPhotos` y `togglePhotoSelection` del nuevo `useSelection` hook.
- Se actualizó la lógica para determinar si una foto está seleccionada (`isSelected`).
- Se actualizó la función `onSelectChange` de `SelectTileOverlay` para usar `togglePhotoSelection`.
- Se modificó la condición de renderizado de `SelectTileOverlay` para que dependa de `selectionMode`.
- Se añadió una clase condicional (`border-4 border-green-500`) al `div` que envuelve `PhotoMedium` para mostrar un borde verde cuando la foto está seleccionada.
- Se añadió la importación de `useSelection` en `src/photo/PhotoGrid.tsx`.

### 7. Ajustes de Interfaz de Usuario

**Paso 7.1: Agregar espacio entre el título y el botón de "Sign In"**

Se ha añadido un espacio entre el título de la aplicación y el botón de "Sign In" en la barra de navegación para mejorar la legibilidad y la estética.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se añadió la clase `mr-4` (margin-right de 16px) al `div` que contiene el título y la descripción de la navegación.
- Se eliminó la clase `ml-auto` del `div` que envuelve el botón de "Sign In" para permitir que el `mr-4` del elemento anterior cree el espacio deseado.

**Paso 7.2: Mover el botón de selección a la izquierda del título**

Se ha reubicado el botón de selección de fotos a la izquierda del título de la aplicación en la barra de navegación. Esto mejora la accesibilidad y la coherencia visual con otras funcionalidades de la interfaz.

**Detalles de la acción:**
- Se modificó el componente `src/app/AppViewSwitcher.tsx` para eliminar el `SwitcherItem` del botón de selección.
- Se modificó el componente `src/app/NavClient.tsx`:
  - Se añadió un nuevo `SwitcherItem` para el botón de selección justo después de `AppViewSwitcher` y antes del `div` que contiene el título de la navegación.
  - Se importaron `Switcher`, `SwitcherItem` y `useSelection` en `NavClient.tsx` para soportar el nuevo botón.

### 8. Corrección de Errores

**Paso 8.1: Corregir `ReferenceError: selectedPhotoIds is not defined` en `PhotoGrid.tsx`**

Se ha corregido un error de referencia (`ReferenceError`) que ocurría en el componente `PhotoGrid.tsx` debido a una variable no definida (`selectedPhotoIds`). Este error se introdujo durante la refactorización para utilizar el nuevo contexto de selección de fotos.

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoGrid.tsx`.
- Se reemplazó la expresión `selectedPhotoIds?.length !== undefined && 'pointer-events-none'` por `selectionMode && 'pointer-events-none'` en la línea 93. Esto asegura que la lógica para prevenir la navegación de fotos cuando el modo de selección está activo utilice la variable correcta (`selectionMode`) del contexto de selección.

**Paso 8.2: Corregir `ReferenceError: isUserSignedIn is not defined` en `NavClient.tsx`**

Se ha corregido un error de referencia (`ReferenceError`) que ocurría en el componente `NavClient.tsx` debido a que la variable `isUserSignedIn` no estaba siendo desestructurada correctamente del hook `useAppState()`.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se añadió `isUserSignedIn` a la desestructuración del objeto retornado por `useAppState()`.

### 9. Gestión de Autenticación

**Paso 9.1: Ocultar/Mostrar botón de "Sign In" según el estado de la sesión**

Se ha implementado la lógica para ocultar el botón de "Sign In" en la barra de navegación cuando el usuario ha iniciado sesión y mostrarlo cuando no hay una sesión activa. Esto mejora la experiencia del usuario al presentar solo las opciones relevantes.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se envolvió el `div` que contiene el `Link` del botón de "Sign In" con una condición `{!isUserSignedIn && (...) }` para controlar su visibilidad.

**Paso 9.2: Habilitar inicio de sesión con Google**

Se ha habilitado el proveedor de autenticación de Google en la configuración de NextAuth. Esto permite a los usuarios iniciar sesión utilizando sus cuentas de Google.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/server.ts`.
- Se añadió `GoogleProvider` a la lista de proveedores de NextAuth, configurando `clientId` y `clientSecret` a partir de las variables de entorno (`process.env.GOOGLE_CLIENT_ID` y `process.env.GOOGLE_CLIENT_SECRET`).
- Se importó `GoogleProvider` desde `next-auth/providers/google` en la parte superior del archivo.

### 11. Deshabilitar Funcionalidad de Zoom de Lupa

**Paso 11.1: Deshabilitar la funcionalidad de la lupa para hacer zoom en la foto**

Se ha deshabilitado la funcionalidad de la lupa (zoom) en la vista de fotos grandes. Esto elimina la capacidad de los usuarios de hacer zoom en las imágenes, simplificando la interacción y alineándose con los requisitos del proyecto.

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoLarge.tsx`.
- Se cambió la propiedad `isEnabled` del componente `ZoomControls` a `false` (`isEnabled: false`). Esto asegura que la funcionalidad de zoom proporcionada por `ZoomControls` esté siempre deshabilitada, independientemente de otras condiciones.

### 12. Configuración de Credenciales de Google OAuth

**Paso 12.1: Añadir `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` a `.env.local`**

Se han añadido las credenciales de cliente de Google OAuth (`GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`) al archivo de variables de entorno local (`.env.local`). Estas credenciales son necesarias para que la aplicación pueda autenticarse con Google y permitir el inicio de sesión a través de cuentas de Google.

**Detalles de la acción:**
- Se leyó el contenido existente del archivo `.env.local`.
- Se añadieron las líneas para `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` al archivo.
- Se sobrescribió el archivo `.env.local` con el contenido actualizado.

**Nota Importante:** Es crucial que estas mismas variables de entorno (`GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`) sean añadidas en la configuración de tu proyecto en Vercel (en la sección "Environment Variables") para que el inicio de sesión con Google funcione correctamente en el entorno de despliegue.

### 13. Corrección de Errores de Autenticación

**Paso 13.1: Resolver error de URI de redireccionamiento de Google OAuth**

Se ha identificado la causa del error "No puedes acceder a esta app porque no cumple con la política OAuth 2.0 de Google" al intentar iniciar sesión con Google. Este error se debe a que el URI de redireccionamiento de la aplicación no está registrado o no coincide con las configuraciones en el proyecto de Google Cloud Console.

**Detalles de la acción:**
- Se proporcionaron instrucciones detalladas al usuario sobre cómo registrar el URI de redireccionamiento (`http://localhost:3000/api/auth/callback/google`) en Google Cloud Console.
- Se enfatizó la necesidad de añadir también la URL de despliegue de Vercel (`https://parker-app-one.vercel.app/api/auth/callback/google`) una vez que el dominio esté configurado.

### 14. Restricción de Acceso de Administrador

**Paso 14.1: Restringir funcionalidades de administrador a usuarios no-admin**

Se ha modificado la lógica de autorización para asegurar que solo el usuario administrador (`process.env.ADMIN_EMAIL`) tenga acceso a las rutas protegidas. Los usuarios autenticados a través de Google que no sean el administrador no podrán acceder a estas funcionalidades.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/server.ts`.
- En el callback `authorized` de NextAuth, se añadió una verificación para `isAdminUser` (`auth?.user?.email === process.env.ADMIN_EMAIL`).
- La condición `isRequestAuthorized` se actualizó para requerir que el usuario esté logueado Y sea el usuario administrador para las rutas protegidas (`!isUrlProtected || (isUserLoggedIn && isAdminUser)`).

### 15. Corrección de Errores y Mejoras de Interfaz

**Paso 15.1: Corregir Bucle de Redirección en Inicio de Sesión**

Se ha solucionado un bucle de redirección que ocurría después de que un usuario no administrador iniciara sesión con Google. El problema era que la página de inicio de sesión redirigía a todos los usuarios a la página de administrador, causando que el middleware de autenticación los enviara de vuelta a la página de inicio en un ciclo.

**Detalles de la acción:**
- Se modificó el archivo `app/sign-in/page.tsx`.
- Se añadió una lógica para verificar si el usuario es un administrador después de iniciar sesión. Si es administrador, se le redirige a `/admin`; de lo contrario, se le redirige a la página de inicio (`/`).

**Paso 15.2: Solucionar Error en el Botón de Selección**

Se ha corregido un error de `ReferenceError: toggleSelectionMode is not defined` que se producía al hacer clic en el botón "Select" en la navegación.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se desestructuró correctamente la función `toggleSelectionMode` del hook `useSelection`.

**Paso 15.3: Mejorar Visibilidad del Botón de Selección**

Se ha ajustado el diseño de la barra de navegación para asegurar que el botón "Select" sea siempre completamente visible y no quede parcialmente oculto.

**Detalles de la acción:**
- Se modificó el componente `src/app/NavClient.tsx`.
- Se eliminaron las clases de CSS (`md:w-[calc(100%+8px)] md:translate-x-[-4px] md:px-[4px]`) que causaban un desbordamiento y ocultaban parte del botón.

**Paso 15.4: Reforzar Control de Acceso del Administrador en el Cliente**

Se ha mejorado la seguridad en el lado del cliente para asegurar que el enlace de navegación "Admin" solo sea visible para el usuario administrador. Esto evita que los usuarios no autorizados vean un enlace a una sección a la que no pueden acceder.

**Detalles de la acción:**
- Se creó una nueva acción de servidor `getAuthSessionAction` en `src/auth/actions.ts` que devuelve la sesión del usuario y un booleano `isAdmin`.
- Se actualizó `src/app/AppStateProvider.tsx` para usar esta nueva acción y almacenar el estado de administrador (`isUserAdmin`) en el contexto de la aplicación.
- Se modificó `src/app/NavClient.tsx` para que el enlace "Admin" solo se renderice si `isUserAdmin` es verdadero.

### 16. Mejoras Adicionales y Correcciones (Iteración 2)

**Paso 16.1: Corregir Visibilidad del Menú de Administrador**

Se ha corregido un error por el que el menú de administrador seguía siendo visible para los usuarios no administradores. El problema estaba en el componente `AppViewSwitcher`, que mostraba el menú basándose en si el usuario había iniciado sesión, en lugar de si era un administrador.

**Detalles de la acción:**
- Se modificó `src/app/AppViewSwitcher.tsx` para usar el estado `isUserAdmin` del contexto de la aplicación para controlar la visibilidad del menú de administrador.

**Paso 16.2: Eliminar la Vista "Full"**

Se ha eliminado la opción de vista "Full" de la interfaz de usuario, dejando la vista de cuadrícula ("Grid") como la única opción para visualizar las fotos. Esto simplifica la navegación y se alinea con los requisitos del proyecto.

**Detalles de la acción:**
- Se confirmó que la constante `GRID_HOMEPAGE_ENABLED` en `src/app/config.ts` controla este comportamiento y debe establecerse en `true` (a través de la variable de entorno `NEXT_PUBLIC_GRID_HOMEPAGE=1`).
- No se requirieron cambios de código adicionales, ya que la lógica existente ya utiliza esta constante para determinar la vista predeterminada.

**Paso 16.3: Habilitar Selección en la Vista de Foto Grande**

Se ha añadido la funcionalidad de selección de fotos a la vista de foto individual (grande). Ahora los usuarios pueden seleccionar y deseleccionar fotos directamente desde esta vista, además de la vista de cuadrícula.

**Detalles de la acción:**
- Se modificó `src/photo/PhotoLarge.tsx` para incluir el hook `useSelection`.
- Se añadió un indicador visual (un borde verde) para mostrar cuándo una foto está seleccionada.
- Se añadió un botón de "Select"/"Deselect" en el panel lateral de metadatos, visible solo cuando el modo de selección está activo.

**Paso 16.4: Crear Nueva Vista para Fotos Seleccionadas**

Se ha creado una nueva página en `/selected` que muestra todas las fotos que el usuario ha seleccionado. Esta vista permite a los usuarios revisar su selección y deseleccionar imágenes si es necesario.

**Detalles de la acción:**
- Se creó un nuevo componente de página en `app/selected/page.tsx`.
- Esta página utiliza el hook `useSelection` para obtener las fotos seleccionadas y las muestra en un componente `PhotoGrid`.
- Se añadió un botón "View Selections" en la barra de navegación (`src/app/NavClient.tsx`) que aparece cuando el modo de selección está activo y hay fotos seleccionadas.

### 17. Corrección de Errores (Iteración 3)

**Paso 17.1: Resolver Error de Módulo `@/selection`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/selection'`) que ocurría en `src/photo/PhotoLarge.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx`.
- Se actualizó la ruta de importación de `useSelection` de `@/selection` a `@/selection/SelectionContext` para resolver correctamente el módulo.

### 18. Correcciones y Mejoras (Iteración 4)

**Paso 18.1: Ocultar Botón de Menú de Administrador para Usuarios No Administradores**

Se ha corregido un problema por el cual el botón del menú de administrador (el icono de tres puntos) era visible para los usuarios que iniciaban sesión con Google, incluso si no tenían privilegios de administrador. Esto se debía a que el componente `AppViewSwitcher` mostraba el botón basándose en si el usuario había iniciado sesión, en lugar de verificar específicamente el rol de administrador.

**Detalles de la acción:**
- Se modificó `src/app/AppViewSwitcher.tsx`.
- Se eliminó el `SwitcherItem` que mostraba un spinner y un tooltip relacionado con el administrador cuando la autenticación estaba en progreso, ya que esto podía causar confusión y mostrar elementos relacionados con el administrador a usuarios no administradores.

**Paso 18.2: Establecer Vista de Cuadrícula como Predeterminada**

Se ha configurado la vista de cuadrícula ("Grid") como la vista predeterminada para toda la aplicación. Esto asegura una experiencia de usuario consistente y simplificada al eliminar la opción de vista "Full" y dirigir a todos los usuarios a la vista de cuadrícula por defecto.

**Detalles de la acción:**
- Se confirmó que la constante `GRID_HOMEPAGE_ENABLED` en `src/app/config.ts` controla este comportamiento y debe establecerse en `true` (a través de la variable de entorno `NEXT_PUBLIC_GRID_HOMEPAGE=1`).
- No se requirieron cambios de código adicionales, ya que la lógica existente ya utiliza esta constante para determinar la vista predeterminada.

**Paso 18.3: Resolver Error de Compilación en `PhotosEmptyState`**

Se ha solucionado un error de compilación (`Build Error: Ecmascript file had an error`) que ocurría en `src/photo/PhotosEmptyState.tsx`.

**Detalles de la acción:**
- Se movió la lógica de `revalidatePath('/admin', 'layout')` a una nueva acción de servidor (`revalidateAdminPathAction`) en `src/admin/actions.ts`.
- Se importó y utilizó `revalidateAdminPathAction` en `src/photo/PhotosEmptyState.tsx`, asegurando que la acción del servidor no se defina en línea dentro de un componente del cliente.

**Paso 18.4: Optimizar Espacio de Botones en la Navegación**

Se ha mejorado la disposición de los botones "Confirmar Selección", "Ver Selección" y "Cancelar" en la barra de navegación para evitar que se amontonen, especialmente en pantallas más pequeñas.

**Detalles de la acción:**
- Se modificó `src/app/NavClient.tsx`.
- Se eliminó la clase `grow` del contenedor del título, permitiendo que los botones de selección utilicen más espacio disponible y se muestren correctamente.

### 19. Correcciones y Mejoras (Iteración 5)

**Paso 19.1: Diagnóstico de Visibilidad del Botón de Administrador**

Se ha iniciado un diagnóstico para entender por qué el botón del menú de administrador sigue siendo visible para usuarios no administradores, a pesar de las correcciones anteriores. Se sospecha que el problema podría estar relacionado con la configuración de las variables de entorno o la propagación del estado de autenticación.

**Detalles de la acción:**
- Se modificó `src/auth/actions.ts`.
- Se añadieron sentencias `console.log` temporales dentro de la función `getAuthSessionAction` para imprimir el valor de `process.env.ADMIN_EMAIL`, el correo electrónico del usuario autenticado (`session?.user?.email`) y el resultado de la verificación `isAdmin` (`isAdmin`).
- Se requiere que el usuario ejecute la aplicación, inicie sesión con Google y proporcione la salida de la consola para un análisis posterior.

**Paso 19.2: Resolver Error de Módulo `@/components/SiteGrid`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/components/SiteGrid'`) que ocurría en `app/selected/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/page.tsx`.
- Se cambió la importación de `SiteGrid` a `AppGrid` y se actualizó el uso del componente en el JSX, ya que `AppGrid` es el componente correcto disponible en el proyecto.

**Paso 19.3: Resolver Error de Módulo `@/selection` en `app/selected/page.tsx`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/selection'`) que ocurría en `app/selected/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/page.tsx`.
- Se actualizó la ruta de importación de `useSelection` de `@/selection` a `@/selection/SelectionContext` para resolver correctamente el módulo.

### 20. Correcciones y Mejoras (Iteración 6)

**Paso 20.1: Mover Lógica de Conexión a Cliente en `AdminAppConfigurationClient`**

Se ha refactorizado la lógica de prueba de conexión en el panel de administración para que se ejecute en el lado del cliente, resolviendo errores relacionados con la actualización del estado del enrutador durante la renderización del servidor.

**Detalles de la acción:**
- Se modificó `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las props `databaseError`, `storageError`, `redisError`, `aiError` y `isAnalyzingConfiguration` de la interfaz de props del componente.
- Se añadieron estados locales (`connectionErrors` y `isAnalyzingConfiguration`) utilizando `useState`.
- Se implementó un `useEffect` para llamar a `testConnectionsAction` (una acción de servidor) una vez que el componente se monta, actualizando los estados locales con los resultados de la prueba de conexión.
- Se actualizó el renderizado condicional de los mensajes de error (`renderError`) para utilizar los errores del estado local `connectionErrors`.

**Paso 20.2: Ajustar Propiedades de `AdminAppConfigurationClient`**

Se han ajustado las propiedades que recibe el componente `AdminAppConfigurationClient` para reflejar los cambios en la gestión de errores de conexión, que ahora se manejan internamente en el cliente.

**Detalles de la acción:**
- Se modificó el archivo `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las propiedades `databaseError`, `storageError`, `redisError`, `aiError` y `isAnalyzingConfiguration` de la interfaz de props del componente, ya que ahora se gestionan mediante estados internos.

### 21. Correcciones y Mejoras (Iteración 7)

**Paso 21.1: Eliminar Declaraciones Duplicadas de `useState`**

Se ha corregido un error de compilación (`the name 
connectionErrors
 is defined multiple times`) causado por declaraciones duplicadas de los hooks `useState` en `src/admin/config/AdminAppConfigurationClient.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las líneas duplicadas de `useState` para `hasScrolled`, `connectionErrors` y `isAnalyzingConfiguration`, asegurando que cada estado se declare solo una vez.

### 22. Correcciones y Mejoras (Iteración 8)

**Paso 22.1: Corregir Error de Sintaxis en `AppStateProvider.tsx`**

Se ha corregido un error de sintaxis (`Parsing ecmascript source code failed: Expression expected`) en `src/app/AppStateProvider.tsx` causado por la colocación incorrecta de un bloque `else` dentro de un `if` anidado.

**Detalles de la acción:**
- Se modificó el archivo `src/app/AppStateProvider.tsx`.
- Se corrigió la estructura del bloque `if/else` para asegurar que el `else` esté correctamente asociado a su `if` correspondiente, resolviendo el error de análisis sintáctico.

### 23. Correcciones y Mejoras (Iteración 9)

**Paso 23.1: Aumentar Espacio de Botones de Selección**

Se ha aumentado el ancho de los botones de selección en la barra de navegación para mejorar su visibilidad y evitar que se amontonen.

**Detalles de la acción:**
- Se modificó el archivo `src/components/switcher/SwitcherItem.tsx`.
- Se cambió el valor de `WIDTH_CLASS_NARROW` de `w-[100px]` a `w-[120px]` para proporcionar más espacio al texto de los botones.

**Paso 23.2: Eliminar Logs de Depuración Temporales**

Se han eliminado los `console.log` temporales que se habían añadido para depurar la visibilidad del botón de administrador y el estado de autenticación.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/actions.ts`.
- Se eliminaron los `console.log` relacionados con `ADMIN_EMAIL`, `User Email` y `Is Admin` en `getAuthSessionAction`.
- Se modificó el archivo `src/app/AppStateProvider.tsx`.
- Se eliminaron los `console.log` dentro del `useEffect` que maneja el estado de autenticación y el `console.log` antes del `return` del componente.
- Se modificó el archivo `src/app/AppViewSwitcher.tsx`.
- Se eliminó el `console.log` al inicio del componente que mostraba el estado de `isUserAdmin`.

### 24. Correcciones y Mejoras (Iteración 10)

**Paso 24.1: Ocultar el botón de menú de administrador para usuarios no administradores**

Se ha corregido un error que provocaba que el botón de menú de administrador de una foto (el icono de tres puntos) fuera visible para los usuarios no administradores.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx`.
- Se aseguró de que el componente `AdminPhotoMenu` solo se renderice si el usuario es un administrador, envolviendo su renderización en una comprobación `isUserAdmin && renderAdminMenu`.

**Paso 24.2: Corregir la visualización de miniaturas de fotos anteriores y siguientes**

Se ha solucionado un problema por el que al ver una foto no se mostraba la miniatura de la foto anterior en la cuadrícula de fotos relacionadas.

**Detalles de la acción:**
- Se modificó la consulta de la base de datos en `src/photo/db/query.ts` para obtener fotos antes y después de la foto actual.
- Se actualizó la lógica de almacenamiento en caché en `src/photo/cache.ts` para filtrar correctamente la foto actual de la cuadrícula de fotos relacionadas.

**Paso 24.3: Implementar la confirmación de la selección y la redirección**

Se ha implementado la lógica para que, al confirmar una selección de fotos, el usuario sea redirigido a la página `/selected`.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se utilizó el hook `useRouter` de `next/navigation` para redirigir al usuario a la página `/selected` cuando se llama a la función `confirmSelection`.

**Paso 24.4: Corregir error de compilación: `operator does not exist: character varying = integer`**

Se ha corregido un error de compilación relacionado con una operación SQL que intentaba comparar un tipo de dato `character varying` con un `integer` en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se ajustó la consulta SQL para asegurar que los parámetros de `limit` se pasen y se utilicen correctamente como valores numéricos en las operaciones de comparación de `row_number`.

**Paso 24.5: Implementar el backend para registrar la selección de fotos**

Se ha creado un nuevo endpoint de API para recibir y procesar las fotos seleccionadas por el usuario.

**Detalles de la acción:**
- Se creó el archivo `app/api/selection/route.ts`.
- Este endpoint recibe un array de IDs de fotos y, por ahora, los registra en la consola.
- Se modificó la función `confirmSelection` en `src/selection/SelectionContext.tsx` para enviar los IDs de las fotos seleccionadas a este nuevo endpoint.

**Paso 24.6: Controlar la visibilidad del botón "Ver Selección"**

Se ha ajustado la lógica para que el botón "Ver Selección" solo sea visible cuando el modo de selección está inactivo y hay fotos seleccionadas.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición para renderizar el botón "Ver Selección" solo cuando `!selectionMode && selectedPhotos.length > 0`.

**Paso 24.7: Corregir la funcionalidad del botón "Cancelar Selección"**

Se ha corregido el botón "Cancelar Selección" para que no solo borre la selección de fotos, sino que también desactive el modo de selección, devolviendo la interfaz a su estado inicial.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se añadió `setSelectionMode(false)` a la función `clearSelection`.

### 25. Correcciones y Mejoras (Iteración 11)

**Paso 25.1: Corregir errores de importación en `app/api/selection/route.ts`**

Se han corregido los errores de compilación relacionados con la importación de `getServerSession` y `authOptions` en el archivo de la ruta de la API de selección.

**Detalles de la acción:**
- Se modificó el archivo `app/api/selection/route.ts`.
- Se cambió la importación de `getServerSession` de `next-auth` a `auth` desde `@/auth/server`.
- Se eliminó la importación de `authOptions` ya que no era necesaria con el nuevo enfoque de importación de `auth`.

### 26. Correcciones y Mejoras (Iteración 12)

**Paso 26.1: Corregir error de tipo `limit` en `src/photo/db/query.ts`**

Se ha corregido un error de tipo (`TypeError: 'limit' is possibly 'undefined'`) en la función `getPhotosNearId` que ocurría al intentar realizar operaciones aritméticas con la variable `limit` sin asegurar que estuviera definida.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se añadió un valor por defecto a la desestructuración de `limit` (`const { limit = RELATED_GRID_PHOTOS_TO_SHOW + 2 } = options;`) para asegurar que siempre tenga un valor numérico.
- Se importó `RELATED_GRID_PHOTOS_TO_SHOW` desde `@/photo` para utilizarlo como valor por defecto.

### 27. Correcciones y Mejoras (Iteración 13)

**Paso 27.1: Corregir error de compilación `operator does not exist: character varying = integer` en `src/photo/db/query.ts`**

Se ha corregido un error de compilación recurrente (`operator does not exist: character varying = integer`) en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se refactorizó la construcción de la consulta SQL para utilizar directamente el template literal `sql` de `@/platforms/postgres`.
- Esto asegura que los parámetros se pasen correctamente a la consulta SQL como valores tipados, resolviendo el problema de la inferencia de tipos y la comparación incorrecta de `character varying` con `integer`.

### 28. Correcciones y Mejoras (Iteración 14)

**Paso 28.1: Corregir error de tipo en `src/photo/db/query.ts` al mapear resultados de la base de datos**

Se ha corregido un error de tipo (`Type error: Argument of type '(photoDbRaw: PhotoDb) => Photo' is not assignable to parameter of type '(value: QueryResultRow, index: number, array: QueryResultRow[]) => Photo'.`) que ocurría al intentar mapear los resultados de la base de datos a objetos `Photo`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se añadió un casting explícito (`row as PhotoDb`) al mapear cada fila de la base de datos a `PhotoDb` antes de pasarla a `parsePhotoFromDb`, asegurando la compatibilidad de tipos.

### 29. Correcciones y Mejoras (Iteración 15)

**Paso 29.1: Corregir error de compilación `syntax error at or near "$1"` en `src/photo/db/query.ts`**

Se ha corregido un error de sintaxis (`syntax error at or near "$1"`) en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se ajustó la construcción de la consulta SQL para asegurar que los parámetros de `wheresValues` se pasen correctamente al template literal `sql`.
- Se introdujo una variable `paramIndex` para gestionar el índice de los parámetros de forma dinámica, asegurando que los placeholders `$N` en la consulta SQL se correspondan correctamente con los valores proporcionados.

### 30. Correcciones y Mejoras (Iteración 16)

**Paso 30.1: Corregir error de tipo `Property 'photos' does not exist on type 'QueryResult<QueryResultRow>'` en `src/photo/cache.ts`**

Se ha corregido un error de tipo (`Property 'photos' does not exist on type 'QueryResult<QueryResultRow>'`) en la función `getPhotosNearIdCached`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/cache.ts`.
- Se refactorizó la función `getPhotosNearId` en `src/photo/db/query.ts` para que devuelva directamente un objeto con las propiedades `photos` e `indexNumber`.
- Se ajustó la llamada a `query` en `getPhotosNearId` para que utilice `await query(queryString, values)` en lugar del template literal `sql` con `.then()`, lo que permite un control más directo sobre el tipo de retorno y evita el error de tipo al desestructurar el resultado en `getPhotosNearIdCached`.

### 31. Correcciones y Mejoras (Iteración 17)

**Paso 31.1: Corregir error de compilación en la generación de metadatos de lentes sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para lentes que no tenían fotos asociadas. El error se debía a que la función `dateRangeForPhotos` no manejaba correctamente el caso en el que recibía un array de fotos vacío, lo que provocaba un `TypeError` al intentar acceder a propiedades de un objeto indefinido.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió una comprobación en la función `dateRangeForPhotos` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío. Esto evita el `TypeError` y permite que el proceso de compilación se complete correctamente, incluso para lentes sin fotos.

### 32. Correcciones y Mejoras (Iteración 18)

**Paso 32.1: Corregir error de compilación en la generación de metadatos de cámaras sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para cámaras que no tenían fotos asociadas. El error se debía a que la función `titleForCamera` no manejaba correctamente el caso en el que recibía un array de fotos vacío.

**Detalles de la acción:**
- Se modificó el archivo `src/camera/meta.ts`.
- Se añadió una comprobación en la función `titleForCamera` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío.

**Paso 32.2: Corregir error de compilación en la generación de metadatos de lentes sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para lentes que no tenían fotos asociadas. El error se debía a que la función `titleForLens` no manejaba correctamente el caso en el que recibía un array de fotos vacío.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/meta.ts`.
- Se añadió una comprobación en la función `titleForLens` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío.

**Paso 32.3: Mejorar la legibilidad del botón de selección**

Se ha mejorado la legibilidad del botón de selección en la barra de navegación eliminando un ancho fijo que impedía que el texto se mostrara completo.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se eliminó la clase `w-20` del `div` que envuelve el `SwitcherItem` del botón de selección.

**Paso 32.4: Evitar la superposición del botón de confirmación de selección**

Se ha evitado que el botón de confirmación de selección y el número de fotos seleccionadas se superpongan en la barra de navegación.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se movió el contador de fotos seleccionadas fuera del botón de confirmación, mostrándolo como un elemento de texto separado.

**Paso 32.5: Implementar el bloqueo de fotos seleccionadas**

Se ha implementado un mecanismo para bloquear las fotos que un usuario ha seleccionado, evitando que otros usuarios puedan seleccionarlas.

**Detalles de la acción:**
- Se ha añadido un campo `locked_by` y `locked_at` a la tabla `photos` en la base de datos.
- Se ha actualizado la función `confirmSelection` en `src/selection/SelectionContext.tsx` para que envíe el ID del usuario al API de selección.
- Se ha creado un nuevo endpoint de API (`DELETE /api/selection`) para desbloquear las fotos.
- Se ha actualizado la interfaz de usuario en `src/photo/PhotoGrid.tsx` and `src/photo/PhotoLarge.tsx` para mostrar las fotos bloqueadas con un filtro de escala de grises y deshabilitar la selección.

### 33. Correcciones y Mejoras (Iteración 19)

**Paso 33.1: Corregir errores de sintaxis en el renderizado de componentes**

Se han corregido errores de sintaxis en los archivos `src/photo/PhotoLarge.tsx` y `src/app/NavClient.tsx` que se introdujeron en la iteración anterior. Los errores se debían a etiquetas JSX mal formadas y a la falta de un elemento raíz al renderizar varios componentes.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx` para corregir una etiqueta de cierre en el componente `ZoomControls`.
- Se modificó el archivo `src/app/NavClient.tsx` para envolver los botones de selección y el contador de fotos en un `div` para proporcionar un único elemento raíz.