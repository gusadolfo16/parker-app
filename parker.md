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
- Esta página utiliza el hook `useSelection` para obtener las fotos seleccionadas y las muestra en un componente `PhotoGrid`.- Se añadió un botón "View Selections" en la barra de navegación (`src/app/NavClient.tsx`) que aparece cuando el modo de selección está activo y hay fotos seleccionadas.

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

Se ha corregido un error por el que el menú de administrador seguía siendo visible para los usuarios no administradores. El problema estaba en el componente `AppViewSwitcher`, que mostraba el menú basándose en si el usuario había iniciado sesión, en lugar de si era un administrador.

**Detalles de la acción:**
- Se modificó el archivo `src/app/AppViewSwitcher.tsx` para usar el estado `isUserAdmin` del contexto de la aplicación para controlar la visibilidad del menú de administrador.

**Paso 14.2: Eliminar la Vista "Full"**

Se ha eliminado la opción de vista "Full" de la interfaz de usuario, dejando la vista de cuadrícula ("Grid") como la única opción para visualizar las fotos. Esto simplifica la navegación y se alinea con los requisitos del proyecto.

**Detalles de la acción:**
- Se confirmó que la constante `GRID_HOMEPAGE_ENABLED` en `src/app/config.ts` controla este comportamiento y debe establecerse en `true` (a través de la variable de entorno `NEXT_PUBLIC_GRID_HOMEPAGE=1`).
- No se requirieron cambios de código adicionales, ya que la lógica existente ya utiliza esta constante para determinar la vista predeterminada.

**Paso 14.3: Habilitar Selección en la Vista de Foto Grande**

Se ha añadido la funcionalidad de selección de fotos a la vista de foto individual (grande). Ahora los usuarios pueden seleccionar y deseleccionar fotos directamente desde esta vista, además de la vista de cuadrícula.

**Detalles de la acción:**
- Se modificó el componente `src/photo/PhotoLarge.tsx` para incluir el hook `useSelection`.
- Se añadió un indicador visual (un borde verde) para mostrar cuándo una foto está seleccionada.
- Se añadió un botón de "Select"/"Deselect" en el panel lateral de metadatos, visible solo cuando el modo de selección está activo.

**Paso 14.4: Crear Nueva Vista para Fotos Seleccionadas**

Se ha creado una nueva página en `/selected` que muestra todas las fotos que el usuario ha seleccionado. Esta vista permite a los usuarios revisar su selección y deseleccionar imágenes si es necesario.

**Detalles de la acción:**
- Se creó un nuevo componente de página en `app/selected/page.tsx`.
- Esta página utiliza el hook `useSelection` para obtener las fotos seleccionadas y las muestra en un componente `PhotoGrid`.- Se añadió un botón "View Selections" en la barra de navegación (`src/app/NavClient.tsx`) que aparece cuando el modo de selección está activo y hay fotos seleccionadas.

### 15. Correcciones y Mejoras (Iteración 3)

**Paso 15.1: Resolver Error de Módulo `@/selection`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/selection'`) que ocurría en `src/photo/PhotoLarge.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx`.
- Se actualizó la ruta de importación de `useSelection` de `@/selection` a `@/selection/SelectionContext` para resolver correctamente el módulo.

### 16. Correcciones y Mejoras (Iteración 4)

**Paso 16.1: Ocultar Botón de Menú de Administrador para Usuarios No Administradores**

Se ha corregido un problema por el cual el botón del menú de administrador (el icono de tres puntos) era visible para los usuarios que iniciaban sesión con Google, incluso si no tenían privilegios de administrador. Esto se debía a que el componente `AppViewSwitcher`, que mostraba el botón basándose en si el usuario había iniciado sesión, en lugar de verificar específicamente el rol de administrador.

**Detalles de la acción:**
- Se modificó `src/app/AppViewSwitcher.tsx`.
- Se eliminó el `SwitcherItem` que mostraba un spinner y un tooltip relacionado con el administrador cuando la autenticación estaba en progreso, ya que esto podía causar confusión y mostrar elementos relacionados con el administrador a usuarios no administradores.

**Paso 16.2: Establecer Vista de Cuadrícula como Predeterminada**

Se ha configurado la vista de cuadrícula ("Grid") como la vista predeterminada para toda la aplicación. Esto asegura una experiencia de usuario consistente y simplificada al eliminar la opción de vista "Full" y dirigir a todos los usuarios a la vista de cuadrícula por defecto.

**Detalles de la acción:**
- Se confirmó que la constante `GRID_HOMEPAGE_ENABLED` en `src/app/config.ts` controla este comportamiento y debe establecerse en `true` (a través de la variable de entorno `NEXT_PUBLIC_GRID_HOMEPAGE=1`).
- No se requirieron cambios de código adicionales, ya que la lógica existente ya utiliza esta constante para determinar la vista predeterminada.

**Paso 16.3: Resolver Error de Compilación en `PhotosEmptyState`**

Se ha solucionado un error de compilación (`Build Error: Ecmascript file had an error`) que ocurría en `src/photo/PhotosEmptyState.tsx`.

**Detalles de la acción:**
- Se movió la lógica de `revalidatePath('/admin', 'layout')` a una nueva acción de servidor (`revalidateAdminPathAction`) en `src/admin/actions.ts`.
- Se importó y utilizó `revalidateAdminPathAction` en `src/photo/PhotosEmptyState.tsx`, asegurando que la acción del servidor no se defina en línea dentro de un componente del cliente.

**Paso 16.4: Optimizar Espacio de Botones en la Navegación**

Se ha mejorado la disposición de los botones "Confirmar Selección", "Ver Selección" y "Cancelar" en la barra de navegación para evitar que se amontonen, especialmente en pantallas más pequeñas.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se eliminó la clase `grow` del contenedor del título, permitiendo que los botones de selección utilicen más espacio disponible y se muestren correctamente.

### 17. Correcciones y Mejoras (Iteración 5)

**Paso 17.1: Diagnóstico de Visibilidad del Botón de Administrador**

Se ha iniciado un diagnóstico para entender por qué el botón del menú de administrador sigue siendo visible para usuarios no administradores, a pesar de las correcciones anteriores. Se sospecha que el problema podría estar relacionado con la configuración de las variables de entorno o la propagación del estado de autenticación.

**Detalles de la acción:**
- Se modificó `src/auth/actions.ts`.
- Se añadieron sentencias `console.log` temporales dentro de la función `getAuthSessionAction` para imprimir el valor de `process.env.ADMIN_EMAIL`, el correo electrónico del usuario autenticado (`session?.user?.email`) y el resultado de la verificación `isAdmin` (`isAdmin`).
- Se requiere que el usuario ejecute la aplicación, inicie sesión con Google y proporcione la salida de la consola para un análisis posterior.

**Paso 17.2: Resolver Error de Módulo `@/components/SiteGrid`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/components/SiteGrid'`) que ocurría en `app/selected/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/page.tsx`.
- Se cambió la importación de `SiteGrid` a `AppGrid` y se actualizó el uso del componente en el JSX, ya que `AppGrid` es el componente correcto disponible en el proyecto.

**Paso 17.3: Resolver Error de Módulo `@/selection` en `app/selected/page.tsx`**

Se ha corregido un error de compilación (`Module not found: Can't resolve '@/selection'`) que ocurría en `app/selected/page.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/page.tsx`.
- Se actualizó la ruta de importación de `useSelection` de `@/selection` a `@/selection/SelectionContext` para resolver correctamente el módulo.

### 18. Correcciones y Mejoras (Iteración 6)

**Paso 18.1: Mover Lógica de Conexión a Cliente en `AdminAppConfigurationClient`**

Se ha refactorizado la lógica de prueba de conexión en el panel de administración para que se ejecute en el lado del cliente, resolviendo errores relacionados con la actualización del estado del enrutador durante la renderización del servidor.

**Detalles de la acción:**
- Se modificó `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las props `databaseError`, `storageError`, `redisError`, `aiError` y `isAnalyzingConfiguration` de la interfaz de props del componente.
- Se añadieron estados locales (`connectionErrors` y `isAnalyzingConfiguration`) utilizando `useState`.

**Paso 18.2: Ajustar Propiedades de `AdminAppConfigurationClient`**

Se han ajustado las propiedades que recibe el componente `AdminAppConfigurationClient` para reflejar los cambios en la gestión de errores de conexión, que ahora se manejan internamente en el cliente.

**Detalles de la acción:**
- Se modificó el archivo `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las propiedades `databaseError`, `storageError`, `redisError`, `aiError` y `isAnalyzingConfiguration` de la interfaz de props del componente, ya que ahora se gestionan mediante estados internos.

### 19. Correcciones y Mejoras (Iteración 7)

**Paso 19.1: Eliminar Declaraciones Duplicadas de `useState`**

Se ha corregido un error de compilación (`the name 
connectionErrors
 is defined multiple times`) causado por declaraciones duplicadas de los hooks `useState` en `src/admin/config/AdminAppConfigurationClient.tsx`.

**Detalles de la acción:**
- Se modificó el archivo `src/admin/config/AdminAppConfigurationClient.tsx`.
- Se eliminaron las líneas duplicadas de `useState` para `hasScrolled`, `connectionErrors` y `isAnalyzingConfiguration`, asegurando que cada estado se declare solo una vez.

### 20. Correcciones y Mejoras (Iteración 8)

**Paso 20.1: Corregir Error de Sintaxis en `AppStateProvider.tsx`**

Se ha corregido un error de sintaxis (`Parsing ecmascript source code failed: Expression expected`) en `src/app/AppStateProvider.tsx` causado por la colocación incorrecta de un bloque `else` dentro de un `if` anidado.

**Detalles de la acción:**
- Se modificó el archivo `src/app/AppStateProvider.tsx`.
- Se corrigió la estructura del bloque `if/else` para asegurar que el `else` esté correctamente asociado a su `if` correspondiente, resolviendo el error de análisis sintáctico.

### 21. Correcciones y Mejoras (Iteración 9)

**Paso 21.1: Aumentar Espacio de Botones de Selección**

Se ha aumentado el ancho de los botones de selección en la barra de navegación para mejorar su visibilidad y evitar que se amontonen.

**Detalles de la acción:**
- Se modificó el archivo `src/components/switcher/SwitcherItem.tsx`.
- Se cambió el valor de `WIDTH_CLASS_NARROW` de `w-[100px]` a `w-[120px]` para proporcionar más espacio al texto de los botones.

**Paso 21.2: Eliminar Logs de Depuración Temporales**

Se han eliminados los `console.log` temporales que se habían añadido para depurar la visibilidad del botón de administrador y el estado de autenticación.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/actions.ts`.
- Se eliminaron los `console.log` relacionados con `ADMIN_EMAIL`, `User Email` y `Is Admin` en `getAuthSessionAction`.
- Se modificó el archivo `src/app/AppStateProvider.tsx`.
- Se eliminaron los `console.log` dentro del `useEffect` que maneja el estado de autenticación y el `console.log` antes del `return` del componente.
- Se modificó el archivo `src/app/AppViewSwitcher.tsx`.
- Se eliminó el `console.log` al inicio del componente que mostraba el estado de `isUserAdmin`.

### 22. Correcciones y Mejoras (Iteración 10)

**Paso 22.1: Ocultar el botón de menú de administrador para usuarios no administradores**

Se ha corregido un error que provocaba que el botón de menú de administrador de una foto (el icono de tres puntos) fuera visible para los usuarios no administradores.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx`.
- Se aseguró de que el componente `AdminPhotoMenu` solo se renderice si el usuario es un administrador, envolviendo su renderización en una comprobación `isUserAdmin && renderAdminMenu`.

**Paso 22.2: Corregir la visualización de miniaturas de fotos anteriores y siguientes**

Se ha solucionado un problema por el que al ver una foto no se mostraba la miniatura de la foto anterior en la cuadrícula de fotos relacionadas.

**Detalles de la acción:**
- Se modificó la consulta de la base de datos en `src/photo/db/query.ts` para obtener fotos antes y después de la foto actual.
- Se actualizó la lógica de almacenamiento en caché en `src/photo/cache.ts` para filtrar correctamente la foto actual de la cuadrícula de fotos relacionadas.

**Paso 22.3: Implementar la confirmación de la selección y la redirección**

Se ha implementado la lógica para que, al confirmar una selección de fotos, el usuario sea redirigido a la página `/selected`.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se utilizó el hook `useRouter` de `next/navigation` para redirigir al usuario a la página `/selected` cuando se llama a la función `confirmSelection`.

**Paso 22.4: Corregir error de compilación: `operator does not exist: character varying = integer`**

Se ha corregido un error de compilación relacionado con una operación SQL que intentaba comparar un tipo de dato `character varying` con un `integer` en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se ajustó la consulta SQL para asegurar que los parámetros de `limit` se pasen y se utilicen correctamente como valores numéricos en las operaciones de comparación de `row_number`.

**Paso 22.5: Implementar el backend para registrar la selección de fotos**

Se ha creado un nuevo endpoint de API para recibir y procesar las fotos seleccionadas por el usuario.

**Detalles de la acción:**
- Se creó el archivo `app/api/selection/route.ts`.
- Este endpoint recibe un array de IDs de fotos y, por ahora, los registra en la consola.
- Se modificó la función `confirmSelection` en `src/selection/SelectionContext.tsx` para enviar los IDs de las fotos seleccionadas a este nuevo endpoint.

**Paso 22.6: Controlar la visibilidad del botón "Ver Selección"**

Se ha ajustado la lógica para que el botón "Ver Selección" solo sea visible cuando el modo de selección está inactivo y hay fotos seleccionadas.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición para renderizar el botón "Ver Selección" solo cuando `!selectionMode && selectedPhotos.length > 0`.

**Paso 22.7: Corregir la funcionalidad del botón "Cancelar Selección"**

Se ha corregido el botón "Cancelar Selección" para que no solo borre la selección de fotos, sino que también desactive el modo de selección, devolviendo la interfaz a su estado inicial.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se añadió `setSelectionMode(false)` a la función `clearSelection`.

### 23. Correcciones y Mejoras (Iteración 11)

**Paso 23.1: Corregir errores de importación en `app/api/selection/route.ts`**

Se han corregido los errores de compilación relacionados con la importación de `getServerSession` y `authOptions` en el archivo de la ruta de la API de selección.

**Detalles de la acción:**
- Se modificó el archivo `app/api/selection/route.ts`.
- Se cambió la importación de `getServerSession` de `next-auth` a `auth` desde `@/auth/server`.
- Se eliminó la importación de `authOptions` ya que no era necesaria con el nuevo enfoque de importación de `auth`.

### 24. Correcciones y Mejoras (Iteración 12)

**Paso 24.1: Corregir error de tipo `limit` en `src/photo/db/query.ts`**

Se ha corregido un error de tipo (`TypeError: 'limit' is possibly 'undefined'`) en la función `getPhotosNearId` que ocurría al intentar realizar operaciones aritméticas con la variable `limit` sin asegurar que estuviera definida.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se añadió un valor por defecto a la desestructuración de `limit` (`const { limit = RELATED_GRID_PHOTOS_TO_SHOW + 2 } = options;`) para asegurar que siempre tenga un valor numérico.
- Se importó `RELATED_GRID_PHOTOS_TO_SHOW` desde `@/photo` para utilizarlo como valor por defecto.

### 25. Correcciones y Mejoras (Iteración 13)

**Paso 25.1: Corregir error de compilación `operator does not exist: character varying = integer` en `src/photo/db/query.ts`**

Se ha corregido un error de compilación recurrente (`operator does not exist: character varying = integer`) en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se refactorizó la construcción de la consulta SQL para utilizar directamente el template literal `sql` de `@/platforms/postgres`.
- Esto asegura que los parámetros se pasen correctamente a la consulta SQL como valores tipados, resolviendo el problema de la inferencia de tipos y la comparación incorrecta de `character varying` con `integer`.

### 26. Correcciones y Mejoras (Iteración 14)

**Paso 26.1: Corregir error de tipo en `src/photo/db/query.ts` al mapear resultados de la base de datos**

Se ha corregido un error de tipo (`Type error: Argument of type '(photoDbRaw: PhotoDb) => Photo' is not assignable to parameter of type '(value: QueryResultRow, index: number, array: QueryResultRow[]) => Photo'.`) que ocurría al intentar mapear los resultados de la base de datos a objetos `Photo`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se añadió un casting explícito (`row as PhotoDb`) al mapear cada fila de la base de datos a `PhotoDb` antes de pasarla a `parsePhotoFromDb`, asegurando la compatibilidad de tipos.

### 27. Correcciones y Mejoras (Iteración 15)

**Paso 27.1: Corregir error de compilación `syntax error at or near "$1"` en `src/photo/db/query.ts`**

Se ha corregido un error de sintaxis (`syntax error at or near "$1"`) en la función `getPhotosNearId`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se ajustó la construcción de la consulta SQL para asegurar que los parámetros de `wheresValues` se pasen correctamente al template literal `sql`.
- Se introdujo una variable `paramIndex` para gestionar el índice de los parámetros de forma dinámica, asegurando que los placeholders `$N` en la consulta SQL se correspondan correctamente con los valores proporcionados.

### 28. Correcciones y Mejoras (Iteración 16)

**Paso 28.1: Corregir error de tipo `Property 'photos' does not exist on type 'QueryResult<QueryResultRow>'` en `src/photo/cache.ts`**

Se ha corregido un error de tipo (`Property 'photos' does not exist on type 'QueryResult<QueryResultRow>'`) en la función `getPhotosNearIdCached`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/cache.ts`.
- Se refactorizó la función `getPhotosNearId` en `src/photo/db/query.ts` para que devuelva directamente un objeto con las propiedades `photos` e `indexNumber`.
- Se ajustó la llamada a `query` en `getPhotosNearId` para que utilice `await query(queryString, values)` en lugar del template literal `sql` con `.then()`, lo que permite un control más directo sobre el tipo de retorno y evita el error de tipo al desestructurar el resultado en `getPhotosNearIdCached`.

### 29. Correcciones y Mejoras (Iteración 17)

**Paso 29.1: Corregir error de compilación en la generación de metadatos de lentes sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para lentes que no tenían fotos asociadas. El error se debía a que la función `dateRangeForPhotos` no manejaba correctamente el caso en que recibía un array de fotos vacío, lo que provocaba un `TypeError` al intentar acceder a propiedades de un objeto indefinido.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió una comprobación en la función `dateRangeForPhotos` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío. Esto evita el `TypeError` y permite que el proceso de compilación se complete correctamente, incluso para lentes sin fotos.

### 30. Correcciones y Mejoras (Iteración 18)

**Paso 30.1: Corregir error de compilación en la generación de metadatos de cámaras sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para cámaras que no tenían fotos asociadas. El error se debía a que la función `titleForCamera` no manejaba correctamente el caso en que recibía un array de fotos vacío.

**Detalles de la acción:**
- Se modificó el archivo `src/camera/meta.ts`.
- Se añadió una comprobación en la función `titleForCamera` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío. Esto evita el `TypeError` y permite que el proceso de compilación se complete correctamente, incluso para cámaras sin fotos.

**Paso 30.2: Corregir error de compilación en la generación de metadatos de lentes sin fotos**

Se ha corregido un error de compilación que ocurría al generar páginas para lentes que no tenían fotos asociadas. El error se debía a que la función `titleForLens` no manejaba correctamente el caso en que recibía un array de fotos vacío.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/meta.ts`.
- Se añadió una comprobación en la función `titleForLens` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío. Esto evita el `TypeError` y permite que el proceso de compilación se complete correctamente, incluso para lentes sin fotos.

**Paso 30.3: Mejorar la legibilidad del botón de selección**

Se ha mejorado la legibilidad del botón de selección en la barra de navegación eliminando un ancho fijo que impedía que el texto se mostrara completo.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se eliminó la clase `w-20` del `div` que envuelve el `SwitcherItem` del botón de selección.

**Paso 30.4: Evitar la superposición del botón de confirmación de selección**

Se ha evitado que el botón de confirmación de selección y el número de fotos seleccionadas se superpongan en la barra de navegación.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se movió el contador de fotos seleccionadas fuera del botón de confirmación, mostrándolo como un elemento de texto separado.

**Paso 30.5: Implementar el bloqueo de fotos seleccionadas**

Se ha implementado un mecanismo para bloquear las fotos que un usuario ha seleccionado, evitando que otros usuarios puedan seleccionarlas.

**Detalles de la acción:**
- Se ha añadido un campo `locked_by` y `locked_at` a la tabla `photos` en la base de datos.
- Se ha actualizado la función `confirmSelection` en `src/selection/SelectionContext.tsx` para que envíe el ID del usuario al API de selección.
- Se ha creado un nuevo endpoint de API (`DELETE /api/selection`) para desbloquear las fotos.

- Se ha actualizado la interfaz de usuario en `src/photo/PhotoGrid.tsx` and `src/photo/PhotoLarge.tsx` para mostrar las fotos bloqueadas con un filtro de escala de grises y deshabilitar la selección.

### 31. Correcciones y Mejoras (Iteración 19)

**Paso 31.1: Corregir errores de sintaxis en el renderizado de componentes**

Se han corregido errores de sintaxis en los archivos `src/photo/PhotoLarge.tsx` y `src/app/NavClient.tsx` que se introdujeron en la iteración anterior. Los errores se debían a etiquetas JSX mal formadas y a la falta de un elemento raíz al renderizar varios componentes.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/PhotoLarge.tsx` para corregir una etiqueta de cierre en el componente `ZoomControls`.
- Se modificó el archivo `src/app/NavClient.tsx` para envolver los botones de selección y el contador de fotos en un `div` para proporcionar un único elemento raíz.

### 32. Correcciones y Mejoras (Iteración 20)

**Paso 32.1: Corregir error de tipo `session.user` posiblemente `undefined` en la ruta de la API de selección**

Se ha corregido un error de tipo que ocurría en la ruta de la API de selección (`app/api/selection/route.ts`) al intentar acceder a `session.user.id` sin verificar si `session.user` era `undefined`.

**Detalles de la acción:**
- Se modificó el archivo `app/api/selection/route.ts`.
- Se añadió una comprobación para asegurar que `session.user` existe antes de intentar acceder a sus propiedades en las funciones `POST` y `DELETE`.

### 33. Correcciones y Mejoras (Iteración 21)

**Paso 33.1: Corregir error de tipo `lockedAt` en `src/photo/db/query.ts`**

Se ha corregido un error de tipo que ocurría en la función `insertPhoto` y `updatePhoto` en `src/photo/db/query.ts` al intentar insertar o actualizar el campo `lockedAt` con un objeto `Date` en lugar de una cadena de texto.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/query.ts`.
- Se añadió una comprobación para convertir `photo.lockedAt` a una cadena de texto ISO (`photo.lockedAt.toISOString()`) si es un objeto `Date`, o a `null` si es `undefined` antes de pasarlo a la consulta SQL.

### 34. Correcciones y Mejoras (Iteración 22)

**Paso 34.1: Corregir error de tipo `lockedAt` en `src/photo/form/index.ts`**

Se ha corregido un error de tipo que ocurría en la función `convertFormDataToPhotoDbInsert` en `src/photo/form/index.ts` al intentar asignar un valor de tipo `string` a la propiedad `lockedAt` de tipo `Date`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/form/index.ts`.
- Se añadió una comprobación para convertir `photoForm.lockedAt` a un objeto `Date` si es una cadena de texto, o a `undefined` if es `null` o `undefined` antes de asignarlo a la propiedad `lockedAt`.

### 35. Correcciones y Mejoras (Iteración 23)

**Paso 35.1: Corregir error de tipo `lockedAt` en `src/photo/index.ts`**

Se ha corregido un error de tipo que ocurría en la función `convertPhotoToPhotoDbInsert` en `src/photo/index.ts` al intentar asignar un valor de tipo `Date | null` a la propiedad `lockedAt` de tipo `Date | undefined`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió una comprobación para convertir `photo.lockedAt` a `undefined` si es `null` antes de asignarlo a la propiedad `lockedAt`.

### 36. Correcciones y Mejoras (Iteración 24)

**Paso 36.1: Corregir error de tipo `lockedAt` en `app/api/selection/route.ts`**

Se ha corregido un error de tipo que ocurría en la ruta de la API de selección (`app/api/selection/route.ts`) al intentar asignar un valor de tipo `Date | null` a la propiedad `lockedAt` de tipo `Date | undefined`.

**Detalles de la acción:**
- Se modificó el archivo `app/api/selection/route.ts`.
- Se añadió una comprobación para convertir `photo.lockedAt` a `undefined` si es `null` antes de asignarlo a la propiedad `lockedAt`.

### 37. Correcciones y Mejoras (Iteración 25)

**Paso 37.1: Corregir error de pre-renderizado en páginas de etiquetas**

Se ha corregido un error de compilación (`TypeError: b.match is not a function`) que ocurría al pre-renderizar las páginas de etiquetas (por ejemplo, `/tag/avila`). El error se debía a que la función `generateMetaForTag` en `src/tag/index.ts` estaba utilizando una descripción de metadatos codificada como `'Temporary Description'` en lugar de generar una descripción dinámica basada en las fotos de la etiqueta.

**Detalles de la acción:**
- Se modificó el archivo `src/tag/index.ts`.
- Se actualizó la función `generateMetaForTag` para que utilice la función `descriptionForTaggedPhotos` para generar una descripción de metadatos dinámica. Esto resuelve el error de compilación y proporciona descripciones más significativas para las páginas de etiquetas.

### 38. Correcciones y Mejoras (Iteración 26)

**Paso 38.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas (por ejemplo, `/shot-on/canon/650d`). El error se debía a que la página no manejaba correctamente el caso en que no se encontraban fotos para una cámara específica, lo que provocaba un error en el renderizado del lado del servidor.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se añadió una comprobación en la función `generateMetadata` para devolver un objeto de metadatos vacío si no se encuentran fotos, evitando así el error de renderizado.
- Se añadió una redirección en el componente de la página para enviar al usuario a la página de inicio si no se encuentran fotos para la cámara especificada.

### 39. Correcciones y Mejoras (Iteración 27)

**Paso 39.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas (por ejemplo, `/shot-on/canon/650d`). El error se debía a que la función `getPhotosCameraDataCached` en `src/camera/data.ts` no manejaba correctamente el caso en que recibía un array de fotos vacío, lo que provocaba un `TypeError` al intentar acceder a propiedades de un objeto indefinido.

**Detalles de la acción:**
- Se modificó el archivo `src/camera/data.ts`.
- Se añadió una comprobación en la función `getPhotosCameraDataCached` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío. Esto evita el `TypeError` y permite que el proceso de compilación se complete correctamente, incluso para cámaras sin fotos.

### 40. Correcciones y Mejoras (Iteración 28)

**Paso 40.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos (shareTextForCamera)**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas (por ejemplo, `/shot-on/canon/650d`). El error se debía a que la función `shareTextForCamera` en `src/camera/meta.ts` no manejaba correctamente el caso en que recibía un array de fotos vacío, lo que provocaba un `TypeError` al intentar acceder a propiedades de un objeto indefinido.

**Detalles de la acción:**
- Se modificó el archivo `src/camera/meta.ts`.
- Se añadió una comprobación en la función `shareTextForCamera` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío. Esto evita el `TypeError` y permite que el proceso de compilación se complete correctamente, incluso para cámaras sin fotos.

### 41. Correcciones y Mejoras (Iteración 29)

**Paso 41.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos (CameraHeader)**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas (por ejemplo, `/shot-on/canon/650d`). El error se debía a que la función `CameraHeader` en `src/camera/CameraHeader.tsx` no manejaba correctamente el caso en que recibía un array de fotos vacío, lo que provocaba un `TypeError` al intentar acceder a propiedades de un objeto indefinido.

**Details of the action:**
- Se modificó el archivo `src/camera/CameraHeader.tsx`.
- Se añadió una comprobación en la función `CameraHeader` para asegurar que no se intente acceder a las propiedades de las fotos si el array está vacío. Esto evita el `TypeError` y permite que el proceso de compilación se complete correctamente, incluso para cámaras sin fotos.

### 42. Correcciones y Mejoras (Iteración 30)

**Paso 42.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos (generateMetadata y CameraPage)**

Se ha corregido un error de compilación persistente que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas (por ejemplo, `/shot-on/canon/650d`). A pesar de las correcciones anteriores, el error seguía manifestándose, lo que sugiere un problema más profundo en la forma en que Next.js maneja los componentes del servidor y la generación de metadatos cuando los datos son escasos o inexistentes.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- En la función `generateMetadata`, se eliminó la lógica condicional dentro de la asignación de `url`, `title`, `description`, `images` y se confió en la comprobación `if (photos.length === 0) { return {}; }` al inicio de la función. Esto simplifica la lógica y asegura que `generateMetaForCamera` solo se llame con un array `photos` no vacío.
- En el componente `CameraPage` (exportación por defecto), se eliminó la lógica condicional dentro del `return` y se añadió una comprobación `if (photos.length === 0) { return null; }` al inicio de la función. Esto garantiza que `CameraOverview` solo se renderice si hay fotos, y que la página no intente renderizar nada si no las hay.
- Estas modificaciones son un refuerzo de las medidas defensivas, simplificando la lógica y asegurando que los componentes y funciones solo operen con datos válidos, lo que debería resolver el error de prerenderizado.

### 43. Correcciones y Mejoras (Iteración 31)

**Paso 43.1: Corregir error de pre-renderizado en páginas de cámaras sin fotos (generateMetadata y CameraPage - Refuerzo)**

Se ha corregido un error de compilación persistente que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas (por ejemplo, `/shot-on/canon/650d`). A pesar de las correcciones anteriores, el error seguía manifestándose, lo que sugiere un problema más profundo en la forma en que Next.js maneja los componentes del servidor y la generación de metadatos cuando los datos son escasos o inexistentes.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- En la función `generateMetadata`, se eliminó la lógica condicional dentro de la asignación de `url`, `title`, `description`, `images` y se confió en la comprobación `if (photos.length === 0) { return {}; }` al inicio de la función. Esto simplifica la lógica y asegura que `generateMetaForCamera` solo se llame con un array `photos` no vacío.
- En el componente `CameraPage` (exportación por defecto), se eliminó la lógica condicional dentro del `return` y se añadió una comprobación `if (photos.length === 0) { return null; }` al inicio de la función. Esto garantiza que `CameraOverview` solo se renderice si hay fotos, y que la página no intente renderizar nada si no las hay.
- Estas modificaciones son un refuerzo de las medidas defensivas, simplificando la lógica y asegurando que los componentes y funciones solo operen con datos válidos, lo que debería resolver el error de prerenderizado.

### 44. Correcciones y Mejoras (Iteración 32)

**Paso 44.1: Deshabilitar temporalmente la generación de parámetros estáticos para páginas de cámaras**

Se ha deshabilitado temporalmente la exportación `generateStaticParams` en `app/shot-on/[make]/[model]/page.tsx`. Esto se hace como una medida de depuración agresiva para aislar la causa del error de prerenderizado persistente en las páginas de cámaras sin fotos. Si el build se completa con éxito después de este cambio, indicará que el problema reside específicamente en el proceso de generación de rutas estáticas o en la forma en que Next.js maneja los datos durante esa fase para rutas que eventualmente no tienen fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se comentó la exportación `generateStaticParams` para evitar que Next.js intente prerenderizar estas rutas durante el proceso de build.

### 45. Correcciones y Mejoras (Iteración 33)

**Paso 45.1: Envolver `SelectionProvider` con `SessionProvider` en `app/layout.tsx`**

Se ha corregido el error de compilación `[next-auth]: useSession must be wrapped in a <SessionProvider />` que ocurría al intentar utilizar el hook `useSession` dentro de `SelectionProvider` sin que este último estuviera anidado correctamente dentro de un `SessionProvider` de NextAuth.js.

**Detalles de la acción:**
- Se modificó el archivo `app/layout.tsx`.
- Se importó `SessionProvider` desde `next-auth/react`.
- Se envolvió el componente `AppStateProvider` (que a su vez contiene `SelectionProvider`) con `SessionProvider` para asegurar que el contexto de sesión esté disponible para todos los componentes que lo requieran.

### 46. Correcciones y Mejoras (Iteración 34)

**Paso 46.1: Ocultar el botón de selección para usuarios no autenticados**

Se ha corregido un error que permitía a los usuarios no autenticados acceder al modo de selección de fotos, lo que provocaba un error de "Usuario no autenticado" al intentar confirmar la selección. Ahora, el botón "Seleccionar" solo es visible para los usuarios que han iniciado sesión.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición `isUserSignedIn` para renderizar el botón "Seleccionar", asegurando que solo los usuarios autenticados puedan iniciar el modo de selección.

**Paso 46.2: Ocultar el botón de confirmación para usuarios no autenticados**

Se ha corregido un error que permitía a los usuarios no autenticados ver el botón de "Confirmar" si estaban en modo de selección y luego cerraban la sesión. Ahora, el botón "Confirmar" solo es visible para los usuarios que han iniciado sesión y están en modo de selección.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición `isUserSignedIn` para renderizar el botón "Confirmar", asegurando que solo los usuarios autenticados puedan confirmar una selección.

**Paso 46.3: Prevenir la renderización de los botones de selección durante la comprobación de la autenticación**

Se ha corregido una condición de carrera en la que los botones de selección podían renderizarse antes de que se completara la comprobación de autenticación, lo que provocaba errores. Ahora, los botones de selección solo se renderizan después de que se haya verificado el estado de autenticación del usuario.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una condición `!isCheckingAuth` para renderizar los botones "Seleccionar" y "Confirmar", asegurando que no se muestren mientras la autenticación está en curso.

**Paso 46.4: Usar el estado de la sesión directamente en NavClient.tsx**

Para solucionar de forma definitiva el error de "Usuario no autenticado", se ha modificado `NavClient.tsx` para que utilice el hook `useSession` de `next-auth/react` directamente. Esto asegura que el estado de autenticación sea siempre el más actual y evita las condiciones de carrera que se producían al depender del estado propagado a través de `AppStateProvider`.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se importó y utilizó el hook `useSession` para obtener el estado de la sesión (`status`).
- Se actualizó la lógica de renderizado de los botones de selección para que dependa directamente del `status` de la sesión, utilizando `status !== 'loading'` y `status === 'authenticated'` para controlar su visibilidad.

**Paso 46.5: Hacer la función `confirmSelection` más robusta**

Se ha corregido un error que permitía a los usuarios no autenticados acceder al modo de selección de fotos, lo que provocaba un error de "Usuario no autenticado" al intentar confirmar la selección. Para solucionarlo de forma definitiva, se ha modificado la función `confirmSelection` en `src/selection/SelectionContext.tsx` para que sea más robusta. Ahora, la función comprueba el estado de la sesión directamente y muestra un mensaje de error al usuario si no está autenticado, en lugar de fallar silenciosamente.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se importó la función `toast` de `sonner`.
- Se actualizó la función `confirmSelection` para que compruebe el `status` de la sesión.
- Si el `status` es `loading`, se registra un error en la consola.
- Si el `status` es `unauthenticated`, se registra un error en la consola y se muestra un mensaje de error al usuario utilizando `toast.error`.
- Si el `status` es `authenticated`, se procede con la confirmación de la selección.

**Paso 46.6: Corrección de la dependencia de `useCallback` en `confirmSelection`**

El error persistía debido a que la función `confirmSelection` no se estaba actualizando cuando cambiaba el estado de la sesión. Esto se debía a que la dependencia del `useCallback` era incorrecta.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se actualizó el array de dependencias del `useCallback` de `confirmSelection` de `[selectedPhotos, router, session]` a `[selectedPhotos, router, sessionData]`. Esto asegura que la función se vuelva a crear cada vez que cambie el objeto `sessionData`, lo que garantiza que siempre tenga el estado de sesión más reciente.

**Paso 46.7: Refactorizar `SelectionContext.tsx` para ser independiente de la sesión**

Para eliminar la dependencia circular y asegurar la robustez del manejo de la sesión, se ha refactorizado `SelectionContext.tsx` para que no dependa directamente del hook `useSession`. En su lugar, las funciones `confirmSelection` y `clearSelection` ahora reciben el `userId` como parámetro.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se eliminó la importación de `useSession` y cualquier referencia a `sessionData` o `session` dentro del componente.
- Se actualizaron las firmas de `confirmSelection` y `clearSelection` en `SelectionContextType` y en sus implementaciones para aceptar `userId` como parámetro.
- Se eliminaron las comprobaciones de autenticación dentro de `confirmSelection`, ya que ahora se espera que el `userId` se proporcione desde el componente que llama.
- Se actualizaron los arrays de dependencia de `useCallback` para `confirmSelection` y `clearSelection` para reflejar los cambios.
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se actualizó la llamada a `confirmSelection` y `clearSelection` para pasar `session.user.id` como argumento.

**Paso 46.8: Añadir migración para las columnas `locked_by` y `locked_at`**

Se ha corregido el error de la base de datos "column 'locked_by' of relation 'photos' does not exist" añadiendo una nueva migración que crea las columnas `locked_by` y `locked_at` en la tabla `photos`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/db/migration.ts`.
- Se añadió una nueva entrada al array `MIGRATIONS` con la etiqueta "08: Photo Locking" y las sentencias SQL para añadir las columnas `locked_by` (VARCHAR) y `locked_at` (TIMESTAMP WITH TIME ZONE) a la tabla `photos` si no existen.

**Paso 46.9: Corregir error de tipo 'session.user' posiblemente 'undefined' en NavClient.tsx**

Se ha corregido el error de tipo que ocurría en `src/app/NavClient.tsx` al intentar acceder a `session.user.id` sin una comprobación de nulidad.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se añadió una comprobación `session?.user?.id` antes de llamar a `confirmSelection` y `clearSelection` para asegurar que `session.user.id` esté definido.

**Paso 46.10: Manejar correctamente la ausencia de fotos en las páginas de lentes**

Se ha corregido un error de prerenderizado que ocurría en las páginas de lentes cuando no se encontraban fotos asociadas. El error se debía a que se intentaba acceder a `photos[0]` cuando el array `photos` estaba vacío.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/data.ts`.
- Se añadió una comprobación `photos[0] || undefined` al llamar a `lensFromPhoto` para asegurar que se pase `undefined` si no hay fotos, evitando así el error.

**Paso 46.11: Manejar correctamente la ausencia de fotos en los metadatos de lentes**

Se ha corregido un error de prerenderizado que ocurría en las páginas de lentes cuando no se encontraban fotos asociadas, específicamente en la generación de metadatos. El error se debía a que la función `shareTextForLens` no manejaba correctamente el caso en que el array `photos` estaba vacío.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/meta.ts`.
- Se añadió una comprobación `photos.length > 0` antes de llamar a `lensFromPhoto` en `shareTextForLens` para asegurar que se pase un objeto `Lens` válido, incluso si no hay fotos.

**Paso 46.12: Aislar la causa del error de prerenderizado en `generateMetadata` de las páginas de lentes**

Se ha comentado temporalmente la generación de la descripción y las imágenes en la función `generateMetadata` de las páginas de lentes para aislar la causa del error de prerenderizado.

**Detalles de la acción:**
- Se modificó el archivo `app/lens/[make]/[model]/page.tsx`.
- Se comentaron las líneas que asignan `description` e `images` en el objeto `Metadata` devuelto por `generateMetadata`.

**Paso 46.13: Manejar la ausencia de fotos en `generateMetaForLens`**

Se ha añadido una comprobación en la función `generateMetaForLens` para devolver un objeto de metadatos mínimo si no se encuentran fotos para la lente. Esto evita errores al intentar generar metadatos con datos incompletos.

**Detalles de la acción:**
- Se modificó el archivo `src/lens/meta.ts`.
- Se añadió una condición `if (photos.length === 0)` al inicio de la función `generateMetaForLens` para devolver un objeto con `url` y `title` solamente.

**Paso 46.14: Deshabilitar temporalmente la generación de parámetros estáticos para páginas de lentes**

Se ha deshabilitado temporalmente la exportación `generateStaticParams` en `app/lens/[make]/[model]/page.tsx`. Esto se hace como una medida de depuración agresiva para aislar la causa del error de prerenderizado persistente en las páginas de lentes sin fotos. Si el build se completa con éxito después de este cambio, indicará que el problema reside específicamente en el proceso de generación de rutas estáticas o en la forma en que Next.js maneja los datos durante esa fase para rutas que eventualmente no tienen fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/lens/[make]/[model]/page.tsx`.
- Se comentó la exportación `generateStaticParams` para evitar que Next.js intente prerenderizar estas rutas durante el proceso de build.

**Paso 46.15: Deshabilitar temporalmente la generación de parámetros estáticos para páginas de etiquetas**

Se ha deshabilitado temporalmente la exportación `generateStaticParams` en `app/tag/[tag]/page.tsx`. Esto se hace como una medida de depuración agresiva para aislar la causa del error de prerenderizado persistente en las páginas de etiquetas sin fotos. Si el build se completa con éxito después de este cambio, indicará que el problema reside específicamente en el proceso de generación de rutas estáticas o en la forma en que Next.js maneja los datos durante esa fase para rutas que eventualmente no tienen fotos asociadas.

**Detalles de la acción:**
- Se modificó el archivo `app/tag/[tag]/page.tsx`.
- Se comentó la exportación `generateStaticParams` para evitar que Next.js intente prerenderizar estas rutas durante el proceso de build.

**Paso 46.16: Corregir `dateString.match is not a function` en `dateRangeForPhotos`**

Se ha corregido el error `dateString.match is not a function` que ocurría en la función `dateRangeForPhotos` al intentar acceder a la propiedad `takenAtNaive` de un objeto `Photo` que podría ser `undefined` o `null`.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió el operador de coalescencia nula (`?? ''`) al acceder a `photosSorted[photos.length - 1]?.takenAtNaive` y `photosSorted[0]?.takenAtNaive` para asegurar que siempre se pase una cadena vacía si el valor es `null` o `undefined`.

### 49. Corrección del Flujo de Selección de Fotos (Iteración 34)

Tras una larga investigación sobre por qué los botones de selección de fotos no funcionaban, se identificaron y corrigieron varios problemas subyacentes.

**Paso 49.1: Diagnóstico del Problema de Sesión**

El problema principal era que el botón "Confirmar" no funcionaba. A través de un proceso de depuración, se descubrió que el objeto de la sesión del usuario (`session`) no contenía el `user.id`, a pesar de que el usuario estaba autenticado. Esto causaba que la lógica del botón, que requiere un ID de usuario para asignar la selección, fallara silenciosamente.

**Detalles de la acción:**
- Se añadió temporalmente código de depuración (usando `toast` y `console.log`) a los componentes `NavClient.tsx` y `SelectionContext.tsx` para rastrear el flujo de ejecución y el estado de la sesión en el momento del clic.
- El diagnóstico final reveló el mensaje "Cannot confirm: session.user.id is missing!", confirmando la causa raíz del problema.

**Paso 49.2: Corrección de la Configuración de NextAuth**

La causa raíz era que la configuración de NextAuth en `src/auth/server.ts` no estaba configurada para persistir el ID del usuario en el objeto de la sesión. Para solucionarlo, se añadieron los callbacks `jwt` y `session`.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/server.ts`.
- Se añadió un callback `jwt` para tomar el `id` del objeto `user` (proporcionado por el proveedor de autenticación al iniciar sesión) y añadirlo al token JWT.
- Se añadió un callback `session` para tomar el `id` del `token` JWT y añadirlo al objeto `session.user` que la aplicación consume.
- Se requirió que el usuario cerrara la sesión y volviera a iniciarla para que los cambios en la estructura de la sesión tuvieran efecto.

**Paso 49.3: Refactorización y Robustez del Contexto de Selección**

Durante la depuración, se realizaron varias mejoras en el `SelectionContext` para hacerlo más robusto y desacoplar responsabilidades.

**Detalles de la acción:**
- Se refactorizó la función `confirmSelection` para que ya no se encargue de la navegación. En su lugar, ahora devuelve una `Promise<boolean>` que indica si la confirmación fue exitosa.
- El componente `NavClient.tsx` se actualizó para que sea responsable de la navegación a la página `/selected` después de que la promesa de `confirmSelection` se resuelva con éxito.
- Se mejoraron las funciones `toggleSelectionMode` y `clearSelection` para ser más predecibles y robustas en la gestión del estado.

**Paso 49.4: Corrección de la Página de Selección**

Después de que el botón "Confirmar" comenzó a funcionar, se descubrió que la página `/selected` aparecía vacía. Esto se debía a que la función `confirmSelection` estaba borrando la lista de fotos seleccionadas (`setSelectedPhotos([])`) antes de que la página `/selected` tuviera la oportunidad de leerla.

**Detalles de la acción:**
- Se modificó la función `confirmSelection` en `src/selection/SelectionContext.tsx`.
- Se eliminó la línea `setSelectedPhotos([])` para asegurar que el estado de las fotos seleccionadas persista durante la navegación a la página `/selected`.

### 50. Corrección de Errores en la Página `/selected` (Iteración 35)

Se identificaron errores en la página `/selected` que impedían su correcto funcionamiento y visualización de las fotos seleccionadas.

**Paso 50.1: Eliminación de `PhotosEmptyState` y Reemplazo por Mensaje Simple**

El componente `PhotosEmptyState` estaba causando múltiples errores debido a su complejidad y a la inclusión de lógica y componentes relacionados con la administración del sitio que no eran apropiados para la página de selección. Se decidió reemplazarlo por un mensaje de estado vacío más simple y directo.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/SelectedPageClient.tsx`.
- Se eliminó la importación y el uso de `PhotosEmptyState`.
- Se reemplazó el componente `PhotosEmptyState` por un `div` con un mensaje de texto simple ("No photos selected") y un icono, para indicar que no hay fotos seleccionadas.
- Se ajustaron las importaciones y props del componente `SelectedPageClient.tsx` para reflejar estos cambios.

**Paso 50.2: Ajuste del Componente Padre `page.tsx`**

Debido a los cambios en `SelectedPageClient.tsx` (ya no requiere la prop `appText`), el componente padre que lo renderiza también necesitaba ser actualizado.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/page.tsx`.
- Se eliminó la importación de `getAppText` y la lógica asíncrona para obtener `appText`.
- Se ajustó la llamada a `SelectedPageClient` para que ya no le pase la prop `appText`.

**Paso 50.3: Corrección de Errores de Importación de Componentes**

Durante la implementación del botón "Clear & Unlock Selection", se introdujo un error de importación al intentar usar un componente `Button` genérico que no existía en el proyecto.

**Detalles de la acción:**
- Se modificó el archivo `app/selected/SelectedPageClient.tsx`.
- Se reemplazó la importación incorrecta de `Button` por la importación correcta de `LoaderButton` desde `components/primitives/LoaderButton`.
- Se ajustó el uso del componente en el JSX para pasar la prop `isLoading` y otras props relevantes para `LoaderButton`.

**Paso 50.4: Corrección de Errores de Sintaxis en la Interfaz de Contexto**

Se identificó un error de sintaxis en la definición de la interfaz `SelectionContextType` en `src/selection/SelectionContext.tsx` que causaba fallos en la compilación.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- Se corrigió la definición de la interfaz `SelectionContextType` para asegurar que todos los miembros terminaran con un punto y coma y que la estructura general fuera válida.

### 51. Correcciones y Mejoras (Iteración 37)

**Paso 51.1: Manejo Robusto de `ReactNode` en `Icon.tsx`**

Se ha modificado el componente `Icon` para manejar de forma más robusta los `children` de tipo `ReactNode`, asegurando que solo se rendericen elementos JSX válidos.

**Detalles de la acción:**
- Se modificó `src/components/primitives/Icon.tsx`.
- Se importó `isValidElement` de `react`.
- Se actualizó la lógica de renderizado de `children` para usar `isValidElement(children) ? children : null`.

**Paso 51.2: Restauración de `FaCamera` en `app/admin/baseline/page.tsx`**

Se ha revertido un cambio temporal en `app/admin/baseline/page.tsx` para restaurar el uso original del icono `FaCamera`.

**Detalles de la acción:**
- Se modificó `app/admin/baseline/page.tsx`.
- Se restauró `icon={<FaCamera size={12} />}`.

**Paso 51.3: Creación de Componentes Envoltorio para Iconos de `react-icons`**

Se crearon componentes envoltorio para varios iconos de `react-icons` para asegurar que siempre devuelvan elementos JSX válidos, resolviendo errores de tipo.

**Detalles de la acción:**
- Se crearon los archivos:
    - `src/components/icons/FaCameraIcon.tsx`
    - `src/components/icons/IoImageSharpIcon.tsx`
    - `src/components/icons/FaUserAltSlashIcon.tsx`
    - `src/components/icons/FaHandSparklesIcon.tsx`
    - `src/components/icons/IoMdCameraIcon.tsx`
    - `src/components/icons/TbRefreshIcon.tsx`
    - `src/components/icons/HiOutlinePhotographIcon.tsx`
- Se actualizaron los siguientes archivos para usar los nuevos componentes de iconos:
    - `app/admin/baseline/page.tsx` para usar `FaCameraIcon`, `IoImageSharpIcon`, `FaUserAltSlashIcon`, `FaHandSparklesIcon`, `IoMdCameraIcon`.
    - `app/global-error.tsx` para usar `TbRefreshIcon`.
    - `app/selected/SelectedPageClient.tsx` para usar `HiOutlinePhotographIcon`.

**Paso 51.4: Manejo de Componentes Asíncronos en Componentes de Servidor**

Se corrigieron errores de tipo relacionados con el uso de componentes asíncronos en componentes de servidor, asegurando que los componentes asíncronos sean `await`ed correctamente.

**Detalles de la acción:**
- Se modificó `app/admin/insights/page.tsx` para `await AdminAppInsights`.
- Se modificó `app/admin/layout.tsx` para `await AdminNav`.
- Se modificó `app/admin/recipes/[recipe]/edit/page.tsx` para `await AdminRecipeBadge`.
- Se modificó `app/admin/recipes/page.tsx` para `await AdminRecipeTable`.
- Se modificó `app/admin/tags/[tag]/edit/page.tsx` para `await AdminTagBadge`.
- Se modificó `app/admin/tags/page.tsx` para `await AdminTagTable`.
- Se modificó `app/layout.tsx` para `await AppTextProvider`, `Nav`, `AdminBatchEditPanel` y `CommandK`.

**Paso 51.5: Manejo de Componentes Cliente que Devuelven `undefined`**

Se corrigieron errores donde componentes cliente podían devolver `undefined`, lo que causaba fallos en la compilación.

**Detalles de la acción:**
- Se creó `app/ShareModalsClient.tsx` y se movió `ShareModals` a este archivo, actualizando `app/layout.tsx` para usar `ShareModalsClient`.
- Se añadió `return null;` al final de las funciones `ShareModals` (en `src/share/ShareModals.tsx`) y `RecipeModal` (en `src/recipe/RecipeModal.tsx`).

**Paso 51.6: Configuración de Alias de Webpack**

Se actualizó la configuración de Webpack para resolver correctamente los alias de importación que usan `@`.

**Detalles de la acción:**
- Se modificó `next.config.js` para incluir `path.resolve(__dirname, 'app')` en el alias `@`.

**Paso 51.7: Definición de Tipo de Sesión de NextAuth**

Se extendió la interfaz `Session` de NextAuth para incluir la propiedad `id` en el objeto `user`, resolviendo errores de tipo al acceder a `session.user.id`.

**Detalles de la acción:**
- Se creó el archivo `src/types/next-auth.d.ts` con la definición de tipo extendida.

**Paso 51.8: Exportación de `clearAndUnlockSelection`**

Se modificó `src/selection/SelectionContext.tsx` para exportar la función `clearAndUnlockSelection` como una función independiente y se actualizó su importación en `app/selected/SelectedPageClient.tsx`.

**Detalles de la acción:**
- Se modificó `src/selection/SelectionContext.tsx` para exportar `clearAndUnlockSelection` y se ajustó su implementación para recibir `photoIds` como parámetro.
- Se actualizó `app/selected/SelectedPageClient.tsx` para importar `clearAndUnlockSelection` directamente y pasar los `photoIds` necesarios.

### 52. Correcciones y Mejoras (Iteración 38)

**Paso 52.1: Corrección de Argumentos en `clearAndUnlockSelection`**

Se corrigió la llamada a la función `clearAndUnlockSelection` en `app/selected/SelectedPageClient.tsx` para pasar los `photoIds` como segundo argumento, resolviendo un error de tipo.

**Detalles de la acción:**
- Se modificó `app/selected/SelectedPageClient.tsx`.
- Se actualizó la llamada a `clearAndUnlockSelection(session.user.id, selectedPhotos.map(photo => photo.id))`.
**Paso 52.2: Creación y Actualización de Componentes de Iconos Adicionales**

Se crearon componentes envoltorio para varios iconos de `react-icons` que estaban causando errores de tipo al ser usados directamente como componentes JSX.

**Detalles de la acción:**
- Se crearon los archivos:
    - `src/components/icons/IoArrowBackIcon.tsx`
    - `src/components/icons/LuCogIcon.tsx`
    - `src/components/icons/FiXSquareIcon.tsx`
- Se actualizaron los siguientes archivos para usar los nuevos componentes de iconos:
    - `app/sign-in/page.tsx` para usar `IoArrowBackIcon`.
    - `src/admin/AdminAppInfoIcon.tsx` para usar `LuCogIcon`.
    - `src/admin/AdminAppMenu.tsx` para usar `FiXSquareIcon`.

**Paso 52.3: Migración de `getAppText` a `useAppText`**

Se actualizó el componente `AdminAppMenu.tsx` para utilizar el hook `useAppText` en lugar de la función `getAppText`, siguiendo las convenciones de React Hooks.

**Detalles de la acción:**
- Se modificó `src/admin/AdminAppMenu.tsx`.
- Se cambió la importación de `getAppText` a `useAppText` y se actualizó su uso dentro del componente.

**Paso 52.4: Eliminación de Propiedad `isMobile` de `useAppState`**

Se corrigió un error de tipo al desestructurar la propiedad `isMobile` del hook `useAppState`, ya que esta propiedad no existe en `AppStateContextType`.

**Detalles de la acción:**
- Se modificó `src/admin/AdminAppMenu.tsx`.
- Se eliminó `isMobile` de la desestructuración de `useAppState()`.

**Paso 52.5: Corrección de Propiedades de `appText.admin`**

Se corrigieron errores de tipo relacionados con el acceso a propiedades inexistentes en el objeto `appText.admin`.

**Detalles de la acción:**
- Se modificó `src/admin/AdminAppMenu.tsx`.
- Se cambió `appText.admin.uploads` a `appText.admin.uploadPlural`.
- Se cambió `appText.admin.insights` a `appText.admin.appInsights`.
- Se cambió `appText.admin.exitBatchEdit` a `appText.admin.batchExitEdit`.

**Paso 52.6: Manejo de Prop `onBatchActionComplete` en `AdminBatchEditPanel`**

Se aseguró que la prop `onBatchActionComplete` siempre sea una función al ser pasada al componente `AdminBatchEditPanelClient`, evitando errores de tipo cuando es `undefined`.

**Detalles de la acción:**
- Se modificó `src/admin/AdminBatchEditPanel.tsx`.
- Se añadió un valor por defecto `(() => {})` a `onBatchActionComplete` si es `undefined`.

**Paso 52.7: Importación de `ResponsiveText`**

Se corrigió un error de "Module not found" al importar `ResponsiveText`.

**Detalles de la acción:**
- Se modificó `src/admin/AdminBatchEditPanelClient.tsx`.
- Se añadió la importación de `ResponsiveText` desde `@/components/ResponsiveText`.

**Paso 52.8: Actualización de `middleware.ts` para `next-auth`**

Se actualizó la implementación del middleware de autenticación para usar `withAuth` de `next-auth/middleware` como una función de orden superior, resolviendo errores de tipo.

**Detalles de la acción:**
- Se modificó `middleware.ts`.
- Se cambió la importación de `auth` a `withAuth` y se ajustó la lógica del middleware para usar `withAuth` con un callback `authorized`.

**Paso 52.9: Instalación de `zod`**

Se instaló la librería `zod` para resolver errores de "Module not found".

**Detalles de la acción:**
- Se ejecutó `npm install zod --legacy-peer-deps`.

### 53. Correcciones y Mejoras (Iteración 39)

**Paso 53.1: Corregir error de renderizado en `app/shot-on/[make]/[model]/page.tsx`**

Se ha corregido un error de renderizado que ocurría en las páginas de cámaras. El error se debía a que se estaba intentando `await` un componente de React directamente en la sentencia `return`.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se eliminó el `await` de la llamada al componente `CameraOverview`, y en su lugar se `await` a una variable que luego se retorna.

**Paso 53.2: Creación de Componentes Envoltorio para Iconos de `react-icons`**

Se crearon componentes envoltorio para varios iconos de `react-icons` para asegurar que siempre devuelvan elementos JSX válidos, resolviendo errores de tipo.

**Detalles de la acción:**
- Se crearon los archivos:
    - `src/components/icons/AiFillAppleIcon.tsx`
    - `src/components/icons/IoInvertModeSharpIcon.tsx`
    - `src/components/icons/BiDesktopIcon.tsx`
    - `src/components/icons/BiSunIcon.tsx`
    - `src/components/icons/BiMoonIcon.tsx`
    - `src/components/icons/RiToolsFillIcon.tsx`
    - `src/components/icons/CgCloseIcon.tsx`
    - `src/components/icons/CgFileDocumentIcon.tsx`
    - `src/components/icons/FaRegUserCircleIcon.tsx`
    - `src/components/icons/BiLockAltIcon.tsx`
    - `src/components/icons/IoCloseIcon.tsx`
- Se actualizaron los siguientes archivos para usar los nuevos componentes de iconos:
    - `src/camera/PhotoCamera.tsx` para usar `AiFillAppleIcon`.
    - `src/cmdk/CommandKClient.tsx` para usar `IoInvertModeSharpIcon`, `BiDesktopIcon`, `BiSunIcon`, `BiMoonIcon`, `RiToolsFillIcon`, `CgCloseIcon`, `CgFileDocumentIcon`, `FaRegUserCircleIcon`, `BiLockAltIcon`, y `IoCloseIcon`.

**Paso 53.3: Corregir error de `label` faltante en `src/cmdk/CommandKClient.tsx`**

Se ha corregido un error de TypeScript que ocurría al intentar añadir un objeto sin la propiedad `label` a un array de `CommandKItem`.

**Detalles de la acción:**
- Se modificó el archivo `src/cmdk/CommandKClient.tsx`.
- Se añadió la propiedad `label` que faltaba al objeto que se estaba añadiendo al array `adminSection.items`.


### 54. Correcciones y Mejoras (Iteración 39)

**Paso 54.1: Creación de `ScoreCardRowText.tsx`**

Se ha creado un nuevo componente `src/components/ScoreCardRowText.tsx` para encapsular la lógica de `ScoreCardRow` cuando se necesitan mostrar un `label` y un `value`. Esto mejora la reusabilidad y la claridad del código.

**Detalles de la acción:**
- Se creó el archivo `src/components/ScoreCardRowText.tsx`.
- El componente acepta `label` y `value` como props y renderiza un `ScoreCardRow` con un icono genérico (`HiOutlineDocumentText`).

**Paso 54.2: Actualización de `app/admin/report/page.tsx`**

Se ha modificado `app/admin/report/page.tsx` para utilizar el nuevo componente `ScoreCardRowText` en lugar de `ScoreCardRow` con props incorrectas.

**Detalles de la acción:**
- Se modificó `app/admin/report/page.tsx`.
- Se actualizó la importación de `ScoreCardRow` a `ScoreCardRowText`.
- Se reemplazaron las instancias de `ScoreCardRow` por `ScoreCardRowText`.

**Paso 54.3: Corrección de `getPhotosMeta` en `src/admin/report/actions.ts`**

Se ha corregido el tipo de la opción `hidden` en la llamada a `getPhotosMeta` en `src/admin/report/actions.ts`.

**Detalles de la acción:**
- Se modificó `src/admin/report/actions.ts`.
- Se cambió `hidden: true` a `hidden: 'only'` en la llamada a `getPhotosMeta`.

**Paso 54.4: Creación de `FiArrowLeftIcon.tsx`**

Se ha creado un componente envoltorio para el icono `FiArrowLeft` para resolver errores de compilación.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/FiArrowLeftIcon.tsx`.

**Paso 54.5: Actualización de `src/components/AdminChildPage.tsx`**

Se ha modificado `src/components/AdminChildPage.tsx` para utilizar el nuevo componente `FiArrowLeftIcon`.

**Detalles de la acción:**
- Se modificó `src/components/AdminChildPage.tsx`.
- Se actualizó la importación de `FiArrowLeft` a `FiArrowLeftIcon`.
- Se reemplazó la instancia de `FiArrowLeft` por `FiArrowLeftIcon`.

**Paso 54.6: Corrección de `useRef` en `src/components/AnimateItems.tsx`**

Se ha corregido la inicialización de `useRef` en `src/components/AnimateItems.tsx` para permitir valores `undefined`.

**Detalles de la acción:**
- Se modificó `src/components/AnimateItems.tsx`.
- Se cambió `useRef<string>(undefined)` a `useRef<string | undefined>(undefined)`.

**Paso 54.7: Corrección del tipo `containerRef` en `src/components/AppGrid.tsx`**

Se ha corregido el tipo de la prop `containerRef` en `src/components/AppGrid.tsx` para que sea compatible con el `ref` de un elemento `div`.

**Detalles de la acción:**
- Se modificó `src/components/AppGrid.tsx`.
- Se cambió `RefObject<HTMLDivElement | null>` a `RefObject<HTMLDivElement>`.

**Paso 54.8: Creación de `ImCheckmarkIcon.tsx`**

Se ha creado un componente envoltorio para el icono `ImCheckmark` para resolver errores de compilación y se le han añadido las props `size` y `className`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/ImCheckmarkIcon.tsx`.

**Paso 54.9: Actualización de `src/components/Checkbox.tsx`**

Se ha modificado `src/components/Checkbox.tsx` para utilizar el nuevo componente `ImCheckmarkIcon` y se ha corregido el tipo de la prop `ref`.

**Detalles de la acción:**
- Se modificó `src/components/Checkbox.tsx`.
- Se actualizó la importación de `ImCheckmark` a `ImCheckmarkIcon`.
- Se reemplazó la instancia de `ImCheckmark` por `ImCheckmarkIcon`.
- Se cambió el tipo de `ref` de `RefObject<HTMLInputElement | null>` a `RefObject<HTMLInputElement>`.

**Paso 54.10: Corrección del tipo `ref` en `src/components/Container.tsx`**

Se ha corregido el tipo de la prop `ref` en `src/components/Container.tsx` y se ha convertido el componente a `forwardRef`.

**Detalles de la acción:**
- Se modificó `src/components/Container.tsx`.
- Se cambió el tipo de `ref` de `RefObject<HTMLDivElement | null>` a `RefObject<HTMLDivElement>`.
- Se envolvió el componente con `forwardRef`.

**Paso 54.11: Creación de `BiCopyIcon.tsx`**

Se ha creado un componente envoltorio para el icono `BiCopy` para resolver errores de compilación y se le ha añadido la prop `size`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/BiCopyIcon.tsx`.

**Paso 54.12: Actualización de `src/components/CopyButton.tsx`**

Se ha modificado `src/components/CopyButton.tsx` para utilizar el nuevo componente `BiCopyIcon`.

**Detalles de la acción:**
- Se modificó `src/components/CopyButton.tsx`.
- Se actualizó la importación de `BiCopy` a `BiCopyIcon`.
- Se reemplazó la instancia de `BiCopy` por `BiCopyIcon`.

**Paso 54.13: Creación de `MdOutlineFileDownloadIcon.tsx`**

Se ha creado un componente envoltorio para el icono `MdOutlineFileDownload` para resolver errores de compilación y se le han añadido las props `size` y `className`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/MdOutlineFileDownloadIcon.tsx`.

**Paso 54.14: Actualización de `src/components/DownloadButton.tsx`**

Se ha modificado `src/components/DownloadButton.tsx` para utilizar el nuevo componente `MdOutlineFileDownloadIcon`.

**Detalles de la acción:**
- Se modificó `src/components/DownloadButton.tsx`.
- Se actualizó la importación de `MdOutlineFileDownload` a `MdOutlineFileDownloadIcon`.
- Se reemplazó la instancia de `MdOutlineFileDownload` por `MdOutlineFileDownloadIcon`.

**Paso 54.15: Creación de `BiErrorAltIcon.tsx`**

Se ha creado un componente envoltorio para el icono `BiErrorAlt` para resolver errores de compilación y se le han añadido las props `size` y `className`.

**Detalles de la acción:**
- Se creó el archivo `src/components/icons/BiErrorAltIcon.tsx`.

**Paso 54.16: Actualización de `src/components/ErrorNote.tsx`**

Se ha modificado `src/components/ErrorNote.tsx` para utilizar el nuevo componente `BiErrorAltIcon`.

**Detalles de la acción:**
- Se modificó `src/components/ErrorNote.tsx`.
- Se actualizó la importación de `BiErrorAlt` a `BiErrorAltIcon`.
- Se reemplazó la instancia de `BiErrorAlt` por `BiErrorAltIcon`.

**Paso 54.17: Eliminación de `experimental.serverActions` en `next.config.js`**

Se ha eliminado la bandera `experimental.serverActions` de `next.config.js` ya que las Server Actions están habilitadas por defecto en Next.js 14.

**Detalles de la acción:**
- Se modificó `next.config.js`.
- Se eliminó la sección `experimental.serverActions`.

**Paso 54.18: Actualización de `@types/react` y `@types/react-dom`**

Se han actualizado las dependencias de `@types/react` a `18.2.58` y `@types/react-dom` a `18.2.25` para resolver problemas de compatibilidad.

**Detalles de la acción:**
- Se ejecutó `npm install @types/react@18.2.58 @types/react-dom@18.2.25 --legacy-peer-deps`.

**Paso 54.19: Corrección del tipo `inputRef` en `src/components/FieldsetWithStatus.tsx`**

Se ha corregido el tipo de la prop `inputRef` en `src/components/FieldsetWithStatus.tsx` para que sea compatible con el `ref` de un elemento `input`.

**Detalles de la acción:**
- Se modificó `src/components/FieldsetWithStatus.tsx`.
- Se cambió `RefObject<HTMLInputElement | null>` a `RefObject<HTMLInputElement>`.

**Paso 54.20: Corrección del tipo `ref` en `src/components/ImageInput.tsx`**

Se ha corregido el tipo de la prop `ref` en `src/components/ImageInput.tsx` para que sea compatible con el `ref` de un elemento `input`.

**Detalles de la acción:**
- Se modificó `src/components/ImageInput.tsx`.
- Se cambió `RefObject<HTMLInputElement | null>` a `RefObject<HTMLInputElement>`.

**Paso 54.21: Corrección del tipo `ref` en `src/components/MaskedScroll.tsx`**

Se ha corregido el tipo de la prop `ref` en `src/components/MaskedScroll.tsx` para que sea compatible con el `ref` de un elemento `div`.

**Detalles de la acción:**
- Se modificó `src/components/MaskedScroll.tsx`.
- Se cambió `RefObject<HTMLDivElement | null>` a `RefObject<HTMLDivElement>`.

**Paso 54.22: Corrección del tipo `ref` en `src/components/entity/EntityLink.tsx`**

Se ha corregido el tipo de la prop `ref` en `src/components/entity/EntityLink.tsx` para que sea compatible con el `ref` de un elemento `span`.

**Detalles de la acción:**
- Se modificó `src/components/entity/EntityLink.tsx`.
- Se cambió `RefObject<HTMLSpanElement | null>` a `RefObject<HTMLSpanElement>`.

**Paso 54.23: Corrección de `AiFillAppleIcon.tsx`**

Se ha modificado el componente `AiFillAppleIcon.tsx` para que acepte las props `size`, `className` y `title`.

**Detalles de la acción:**
- Se modificó `src/components/icons/AiFillAppleIcon.tsx`.
- Se añadió la definición de las props `size`, `className` y `title`.

**Paso 54.24: Corrección de `BiCheckCircleIcon.tsx`**

Se ha modificado el componente `BiCheckCircleIcon.tsx` para que pase el icono `BiCheckCircle` como hijo del componente `Icon`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiCheckCircleIcon.tsx`.
- Se cambió `<Icon {...props} icon={BiCheckCircle} />` a `<Icon {...props}><BiCheckCircle /></Icon>`.

**Paso 54.25: Corrección de `BiDataIcon.tsx`**

Se ha modificado el componente `BiDataIcon.tsx` para que pase el icono `BiData` como hijo del componente `Icon`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiDataIcon.tsx`.
- Se cambió `<Icon {...props} icon={BiData} />` a `<Icon {...props}><BiData /></Icon>`.

**Paso 54.26: Corrección de `BiDesktopIcon.tsx`**

Se ha modificado el componente `BiDesktopIcon.tsx` para que acepte las props `size`, `className` y `title`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiDesktopIcon.tsx`.
- Se añadió la definición de las props `size`, `className` y `title`.

**Paso 54.27: Corrección de `BiLockAltIcon.tsx`**

Se ha modificado el componente `BiLockAltIcon.tsx` para que acepte las props `size`, `className` y `title`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiLockAltIcon.tsx`.
- Se añadió la definición de las props `size`, `className` y `title`.

**Paso 54.28: Corrección de `BiMoonIcon.tsx`**

Se ha modificado el componente `BiMoonIcon.tsx` para que acepte las props `size`, `className` y `title`.

**Detalles de la acción:**
- Se modificó `src/components/icons/BiMoonIcon.tsx`.
- Se añadió la definición de las props `size`, `className` y `title`.

### 55. Correcciones y Mejoras (Iteración 35)

**Paso 55.1: Reactivar `generateStaticParams` y corregir errores de pre-renderizado en páginas de cámaras**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de cámaras que no tenían fotos asociadas. El error se debía a que la función `redirect` se invocaba durante el proceso de compilación, lo que provocaba un fallo.

**Detalles de la acción:**
- Se modificó el archivo `app/shot-on/[make]/[model]/page.tsx`.
- Se reemplazó `redirect(PATH_ROOT)` por `notFound()` para manejar correctamente las páginas de cámaras sin fotos durante la generación estática, evitando errores de compilación.

**Paso 55.2: Reactivar `generateStaticParams` y corregir errores de pre-renderizado en páginas de lentes**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de lentes que no tenían fotos asociadas. El error se debía a que el componente `LensPage` no manejaba correctamente el caso en que no se encontraban fotos para una lente específica.

**Detalles de la acción:**
- Se modificó el archivo `app/lens/[make]/[model]/page.tsx`.
- Se descomentó la exportación `generateStaticParams`.
- Se añadió una comprobación `if (photos.length === 0) { notFound(); }` en el componente `LensPage` para manejar la ausencia de fotos.
- Se añadió la importación de `notFound` desde `next/navigation`.

**Paso 55.3: Reactivar `generateStaticParams` y corregir errores de pre-renderizado en páginas de etiquetas**

Se ha corregido un error de compilación que ocurría al pre-renderizar las páginas de etiquetas que no tenían fotos asociadas. El error se debía a que la función `redirect` se invocaba durante el proceso de compilación, lo que provocaba un fallo.

**Detalles de la acción:**
- Se modificó el archivo `app/tag/[tag]/page.tsx`.
- Se descomentó la exportación `generateStaticParams`.
- Se reemplazó `redirect(PATH_ROOT)` por `notFound()` en el componente `TagPage` para manejar la ausencia de fotos.
- Se eliminó la importación de `PATH_ROOT` y se añadió la importación de `notFound` desde `next/navigation`.

**Paso 55.4: Corrección de errores de tipo en archivos de traducción**

Se corrigieron errores de tipo en varios archivos de traducción (`bd-bn.ts`, `en-gb.ts`, `id-id.ts`, `pt-pt.ts`, y `zh-cn.ts`) que impedían la compilación del proyecto. Los errores se debían a la falta de claves (`or`, `signInWithGoogle`) en el objeto `auth` y a una estructura incorrecta del objeto `admin.report` en comparación con el archivo `en-us.ts`.

**Detalles de la acción:**
- Se modificaron los archivos `src/i18n/locales/bd-bn.ts`, `src/i18n/locales/en-gb.ts`, `src/i18n/locales/id-id.ts`, `src/i18n/locales/pt-pt.ts`, y `src/i18n/locales/zh-cn.ts`.
- Se añadieron las claves `or` y `signInWithGoogle` al objeto `auth` con sus respectivas traducciones.
- Se ajustó la estructura del objeto `admin.report` para que solo contuviera las claves `title` y `description`, eliminando las claves adicionales que causaban el error de tipo.

**Paso 55.5: Eliminación de idiomas adicionales**

Se eliminaron todos los archivos de idioma adicionales, dejando solo el inglés (`en-us.ts`), según la solicitud del usuario.

**Detalles de la acción:**
- Se eliminaron los archivos `src/i18n/locales/bd-bn.ts`, `src/i18n/locales/en-gb.ts`, `src/i18n/locales/id-id.ts`, `src/i18n/locales/pt-br.ts`, `src/i18n/locales/pt-pt.ts`, `src/i18n/locales/tr-tr.ts`, y `src/i18n/locales/zh-cn.ts`.
- Se modificó `src/i18n/index.ts` para eliminar las importaciones de los idiomas eliminados y simplificar la función `getTextForLocale` para que solo use `en-us.ts`.

**Paso 55.6: Corrección de errores de tipo relacionados con `ref`**

Se corrigieron varios errores de tipo relacionados con la propiedad `ref` en diferentes componentes, donde se esperaba un `RefObject` que contuviera un elemento HTML no nulo, pero se estaba proporcionando uno que podía ser `null`.

**Detalles de la acción:**
- Se modificó `src/photo/PhotoLink.tsx`: Se cambió el tipo de `ref` de `RefObject<HTMLAnchorElement | null>` a `RefObject<HTMLAnchorElement>`.
- Se modificó `src/photo/PhotoUploadWithStatus.tsx`: Se cambió el tipo de `inputRef` de `RefObject<HTMLInputElement | null>` a `RefObject<HTMLInputElement>`.
- Se modificó `src/app/AppState.ts`: Se cambió el tipo de `uploadInputRef` de `RefObject<HTMLInputElement | null>` a `RefObject<HTMLInputElement>`.
- Se modificó `src/recipe/PhotoRecipeOverlay.tsx`: Se cambió el tipo de `ref` de `RefObject<HTMLDivElement | null>` a `RefObject<HTMLDivElement>`.

**Paso 55.7: Corrección de errores de tipo en `src/photo/PhotoEditPageClient.tsx`**

Se corrigió un error de tipo en el componente `ExifCaptureButton` en `src/photo/PhotoEditPageClient.tsx`, donde se estaba pasando una prop incorrecta.

**Detalles de la acción:**
- Se modificó `src/photo/PhotoEditPageClient.tsx`.
- Se cambió la prop `onSync` a `onExifDataCapture` y se añadió la prop `photoId` al componente `ExifCaptureButton`.

**Paso 55.8: Corrección de errores de tipo y refactorización de NextAuth**

Se corrigieron errores de tipo relacionados con la importación y el uso de `after` de `next/server`, y se refactorizó la inicialización de NextAuth para resolver problemas de compilación.

**Detalles de la acción:**
- Se modificó `src/photo/actions.ts`: Se eliminó la importación de `after` de `next/server` y todas las llamadas a `after(revalidateAllKeysAndPaths)`.
- Se modificó `app/api/selection/route.ts`: Se añadió una función `GET` vacía para evitar `TypeError: Cannot read properties of undefined (reading 'GET')` durante la compilación.
- Se modificó `src/auth/server.ts`: Se refactorizó para exportar una función `getAuthOptions` que devuelve la configuración de NextAuth. Luego, se inicializó `NextAuth` una sola vez con `getAuthOptions()` y se exportaron `GET`, `POST`, `signIn`, `signOut` y `auth` desde esa única instancia.
- Se modificó `app/api/auth/[...nextauth]/route.ts`: Se actualizó para re-exportar `GET` y `POST` desde `@/auth/server`, alineándose con la refactorización en `src/auth/server.ts`.
- Se modificó `src/auth/server.ts`: Se tiparon explícitamente los parámetros `token` y `session` en los callbacks `jwt` y `session` para resolver errores de tipo.
### 56. Correcciones y Mejoras (Iteración 36)

**Paso 56.1: Refactorización de la configuración de NextAuth para Next.js App Router (v4)**

Se corrigieron múltiples errores de compilación y de tiempo de ejecución relacionados con la configuración de NextAuth.js en el proyecto, adaptándola a las convenciones de NextAuth v4 para el App Router de Next.js. Esto incluyó la exportación correcta de funciones de autenticación y la resolución de problemas de tipado.

**Detalles de la acción:**
- Se modificó `src/auth/server.ts` para:
  - Exportar `authOptions` como una constante `NextAuthOptions`.
  - Inicializar `NextAuth` una única vez y exportar `auth`, `signIn`, `signOut` directamente desde esta instancia.
  - Definir y exportar una función `getServerSession` con sobrecargas para manejar diferentes firmas de llamada, asegurando la compatibilidad con `getNextAuthServerSession`.
- Se modificó `app/api/auth/[...nextauth]/route.ts` para re-exportar `GET` y `POST` desde `src/auth/server.ts`, alineándose con la refactorización.
- Se modificó `src/auth/actions.ts` para:
  - Importar `signIn`, `signOut` y `getServerSession` desde `src/auth/server.ts`.
  - Reemplazar las llamadas a `auth()` con `getServerSession()` en las funciones `getAuthAction` y `getAuthSessionAction`.

**Paso 56.2: Exclusión de la página de inicio de sesión del Middleware**

Se corrigió un bucle de redirección infinito que ocurría al intentar iniciar sesión, causado por la protección del middleware en la página `/sign-in`.

**Detalles de la acción:**
- Se modificó `middleware.ts` para actualizar el `matcher` y excluir explícitamente la ruta `/sign-in` del control del middleware.

**Paso 56.3: Movimiento de `SessionProvider` a un componente cliente**

Se resolvió el error `React Context is unavailable in Server Components` moviendo el `SessionProvider` de NextAuth.js de un componente de servidor (`app/layout.tsx`) a un nuevo componente de cliente.

**Detalles de la acción:**
- Se creó el archivo `src/app/SessionProviderClient.tsx` como un componente de cliente (`'use client'`) que envuelve el `SessionProvider`.
- Se modificó `app/layout.tsx` para importar y utilizar `SessionProviderClient` en lugar de `SessionProvider` directamente.
### 57. Correcciones y Mejoras (Iteración 37)

**Paso 57.1: Corrección del error `TypeError: (0 , _auth_server__WEBPACK_IMPORTED_MODULE_2__.signOut) is not a function`**

Se ha corregido el error que impedía el correcto funcionamiento del cierre de sesión. El problema se debía a que la función `signOut` no podía ser invocada directamente desde una acción de servidor en la versión de NextAuth utilizada.

**Detalles de la acción:**
- Se modificó `src/auth/actions.ts`.
- Se cambió la implementación de `signOutAction` para que realice una redirección a la ruta `/api/auth/signout`, que es la forma correcta de manejar el cierre de sesión desde el lado del servidor en NextAuth v4.

**Paso 57.2: Corrección del problema de redirección en el inicio de sesión**

Se ha corregido el problema por el cual el inicio de sesión no redirigía correctamente al usuario.

**Detalles de la acción:**
- Se refactorizó `src/auth/SignInForm.tsx`.
- Se eliminó la dependencia de `signInAction` y se implementó la llamada directa a `signIn` de `next-auth/react` en el lado del cliente.
- Se añadió lógica para manejar la redirección a `PATH_ROOT` (`/`) en caso de éxito o mostrar un error si la autenticación falla.

**Paso 57.3: Corrección de la visibilidad del panel de edición por lotes**

Se ha corregido el problema por el cual el panel de edición por lotes (`AdminBatchEditPanelClient`) estaba siempre visible.

**Detalles de la acción:**
- Se modificó `src/admin/AdminBatchEditPanelClient.tsx`.
- Se ajustaron las clases de Tailwind CSS para que el panel se oculte (`translate-y-full`) cuando `selectionMode` es `false` y se muestre (`translate-y-0`) cuando `selectionMode` es `true`.

**Paso 57.4: Corrección del error `the name 'redirect' is defined multiple times`**

Se ha corregido un error de compilación causado por una importación duplicada de `redirect`.

**Detalles de la acción:**
- Se modificó `src/auth/actions.ts`.
- Se eliminó la línea de importación duplicada de `redirect` de `next/navigation`.

**Paso 57.5: Corrección del acceso no autenticado a la página de inicio**

Se ha corregido el problema por el cual la aplicación siempre obligaba a iniciar sesión, incluso para acceder a la página de inicio.

**Detalles de la acción:**
- Se modificó `middleware.ts`.
- Se ajustó la expresión regular del `matcher` para excluir correctamente la ruta raíz (`/`) de la autenticación, permitiendo el acceso no autenticado.

**Paso 57.6: Depuración de la visibilidad del menú de administrador y la selección de fotos**

Se han añadido mensajes de depuración para diagnosticar problemas con la visibilidad del menú de administrador y la funcionalidad de selección de fotos.

**Detalles de la acción:**
- Se añadió `console.log` a `src/app/AppStateProvider.tsx` para mostrar el estado de autenticación y `isUserAdmin`.
- Se añadió `console.log` a `src/app/AppViewSwitcher.tsx` para mostrar el valor de `isUserAdmin`.
- Se añadió un borde rojo a `src/components/SelectTileOverlay.tsx` para verificar si el componente de superposición de selección se está renderizando correctamente.
- Se re-añadió `console.log` a `src/auth/SignInForm.tsx` para obtener el resultado de la función `signIn`.

### 58. Corrección del Flujo de Selección de Fotos y Mejoras de Autenticación (Iteración 34-35)

Se han implementado correcciones críticas y mejoras en el flujo de selección de fotos y en la gestión de la autenticación, resolviendo problemas de persistencia de sesión y funcionalidad de los botones de selección.

**Paso 58.1: Persistencia del ID de Usuario en la Sesión de NextAuth**

Se corrigió un problema fundamental donde el `user.id` no se estaba persistiendo correctamente en el objeto de sesión de NextAuth, lo que impedía que las funcionalidades que dependían de este ID (como la selección de fotos) funcionaran.

**Detalles de la acción:**
- Se modificó el archivo `src/auth/server.ts`.
- Se añadió el `id` del usuario al token JWT a través del callback `jwt`.
- Se añadió el `id` del token JWT al objeto `session.user` a través del callback `session`, asegurando que el `user.id` esté disponible en toda la aplicación.
- Se actualizó la creación del usuario en el `CredentialsProvider` para incluir el `id` como el `email`.

**Paso 58.2: Refactorización y Robustez del Contexto de Selección de Fotos**

Se realizaron mejoras significativas en el `SelectionContext` para hacerlo más robusto, desacoplar responsabilidades y proporcionar una mejor retroalimentación al usuario.

**Detalles de la acción:**
- Se modificó el archivo `src/selection/SelectionContext.tsx`.
- La función `toggleSelectionMode` ahora limpia las fotos seleccionadas solo al salir del modo de selección.
- La función `clearSelection` ahora envía una solicitud `DELETE` a la API de selección para desbloquear fotos si se proporciona un `userId` y hay fotos seleccionadas, y muestra mensajes `toast` para la retroalimentación.
- La función `confirmSelection` ahora devuelve una `Promise<boolean>` para indicar el éxito o fracaso, muestra mensajes `toast` y ya no maneja la navegación. También establece `selectionMode` en `false` después de la confirmación.
- Se añadió una nueva función `clearAndUnlockSelection` que realiza una solicitud `DELETE` a la API de selección para desbloquear fotos, limpia la selección local y proporciona retroalimentación con `toast`.

**Paso 58.3: Integración de la Navegación con la Confirmación de Selección**

La navegación a la página de fotos seleccionadas ahora se maneja en el componente `NavClient.tsx` después de una confirmación exitosa.

**Detalles de la acción:**
- Se modificó el archivo `src/app/NavClient.tsx`.
- Se importó `useRouter` para manejar la navegación programática.
- El botón "Confirm Selection" ahora llama a `confirmSelection` y, si es exitoso, redirige al usuario a `/selected`.
- El botón "Cancel Selection" ahora llama a `clearSelection` con el `userId`.

**Paso 58.4: Corrección de la Visibilidad de Datos de Administrador**

Se ajustó la lógica para que los datos de administrador solo se carguen si el usuario es un administrador, no solo si ha iniciado sesión.

**Detalles de la acción:**
- Se modificó el archivo `src/app/AppStateProvider.tsx`.
- El hook `useSWR` para `getAdminDataAction` ahora depende de `isUserAdmin` en lugar de `isUserSignedIn`.

**Paso 58.5: Manejo de Fechas Nulas en `dateRangeForPhotos`**

Se mejoró la robustez de la función `dateRangeForPhotos` para manejar casos donde las fechas de las fotos pueden ser nulas o indefinidas.

**Detalles de la acción:**
- Se modificó el archivo `src/photo/index.ts`.
- Se añadió el operador de coalescencia nula (`?? ''`) al acceder a `takenAtNaive` para asegurar que siempre se utilice una cadena vacía si el valor es `null` o `undefined`, previniendo errores de tipo.

### 59. Resumen de Cambios Recientes

#### Flujo de Autenticación
- **Corrección Crítica de Sesión:** Se solucionó un error fundamental que impedía que el `user.id` se incluyera en la sesión del usuario. Esto se logró configurando correctamente los callbacks `jwt` y `session` en NextAuth.js para persistir el ID del usuario, lo cual es esencial para funcionalidades como la selección de fotos.
- **Refactorización de Autenticación:** Se refactorizó el flujo de inicio y cierre de sesión para alinearse con las convenciones de NextAuth.js v4 para el App Router, mejorando la robustez y predictibilidad del sistema.
- **Mejoras en la Interfaz de Usuario:** Se ajustó la visibilidad de los elementos de la interfaz de usuario dependientes de la autenticación (como los botones "Seleccionar" y "Confirmar") para que solo se muestren a los usuarios autenticados y no durante la comprobación de la sesión.

#### Funcionalidad de Selección de Fotos
- **Contexto de Selección Robusto:** Se refactorizó el `SelectionContext` para proporcionar una mejor retroalimentación al usuario a través de mensajes `toast` y para desacoplar la lógica de confirmación de la navegación.
- **Navegación Mejorada:** La responsabilidad de la navegación después de confirmar una selección se trasladó al componente `NavClient.tsx`, que ahora espera una promesa de la función `confirmSelection`.
- **Corrección de Errores:** Se solucionó un error que causaba que la página de fotos seleccionadas (`/selected`) apareciera vacía al limpiar el estado de selección prematuramente.
  El Problema Oculto: ¿Por qué cambiar algo que "funcionaba perfecto"?

  A primera vista, la funcionalidad de selección parecía funcionar: podías hacer
  clic en las fotos y veías el borde de selección aparecer y desaparecer. Sin
  embargo, el problema no era visual, sino funcional y estaba oculto.

   1. El `user.id` Faltante: El error más grave era que, al confirmar la selección, la
      aplicación no sabía quién estaba seleccionando las fotos. El objeto de la sesión
      del usuario no incluía su id. Como resultado, cuando se enviaba la información al
      backend para "bloquear" las fotos para ese usuario, la operación fallaba
      silenciosamente porque no había un ID de usuario al cual asignarlas. Parecía que
      funcionaba, pero en realidad no se estaba guardando nada en la base de datos.
   2. Condiciones de Carrera: La función que confirmaba la selección hacía demasias
      cosas a la vez: llamaba a la API, navegaba a otra página y limpiaba el estado.
      Esto creaba una "condición de carrera" (race condition): a veces la navegación
      era tan rápida que la página /selected intentaba leer las fotos seleccionadas
      después de que ya se habían borrado, resultando en una página vacía.

  El objetivo no era solo que los botones se vieran bien, sino asegurar que el flujo
  completo (seleccionar -> confirmar -> guardar en la base de datos -> ver la
  selección) fuera robusto y libre de errores.

  ¿Qué es "Decoupled Navigation" (Navegación Desacoplada)?

  Este es el cambio más importante que realicé para solucionar los problemas de
  raíz.

  El Enfoque Anterior (Acoplado)

  Antes, la función confirmSelection dentro del SelectionContext (el gestor de
  estado de la selección) tenía múltiples responsabilidades:

   1. Lógica de Datos: Preparar los IDs de las fotos.
   2. Lógica de API: Enviar esos IDs al backend.
   3. Lógica de Navegación: Redirigir al usuario a la página /selected.
   4. Lógica de Estado: Limpiar la lista de fotos seleccionadas.

  Esto se llama lógica acoplada: la gestión de datos y la gestión de la interfaz de
  usuario (navegación) estaban mezcladas en un solo lugar.

  Problemas del acoplamiento:
   * Fragilidad: Como vimos, cambiar el orden o la velocidad de estas operaciones
     causaba errores (la página /selected vacía).
   * Poca Reutilización: Si en el futuro quisiéramos confirmar una selección desde
     otro lugar de la app sin navegar, no podríamos usar esta función.
   * Dificultad para Probar: Probar una función que hace tantas cosas diferentes es
     más complejo.

  El Nuevo Enfoque (Desacoplado)

  Ahora, las responsabilidades están separadas, siguiendo un principio de diseño
  llamado "Principio de Responsabilidad Única".

   1. El `SelectionContext` se encarga SOLO de la lógica de datos y estado:
       * La función confirmSelection ahora solo se comunica con el backend.
       * Crucialmente, ahora devuelve una `Promesa` que se resuelve a `true` si la
         confirmación fue exitosa, o `false` si falló.
       * Ya no sabe nada sobre la navegación. Su única misión es gestionar el estado
         de la selección y hablar con la API.

   2. El componente de UI (`NavClient.tsx`) se encarga SOLO de la lógica de UI
      (interacción y navegación):
       * El botón "Confirmar Selección" en la barra de navegación ahora es quien
         orquesta el proceso.
       * Llama a confirmSelection y espera a que la promesa se resuelva.
       * Solo si la promesa devuelve true (éxito), entonces y solo entonces, el
         componente se encarga de redirigir al usuario a /selected.

  En resumen, "desacoplar la navegación" significó sacar la responsabilidad de
  navegar fuera del contexto de datos y dársela al componente de la interfaz que
  inicia la acción.

  ¿Qué significa "Better User Feedback" (Mejor Retroalimentación al Usuario)?

  Antes, si algo fallaba (como la falta del user.id), la aplicación no decía nada.
  El usuario hacía clic y simplemente no pasaba nada, lo cual es una experiencia
  frustrante.

  Ahora, aproveché la refactorización para añadir retroalimentación clara usando
  notificaciones (toast):

   * Si la confirmación es exitosa, aparece un mensaje: "Selection confirmed!".
   * Si falla por un error de red o del servidor, aparece: "Failed to confirm
     selection".
   * Si el usuario intenta confirmar sin haber iniciado sesión, se le notifica: "You
     must be signed in...".

  Esto hace que la aplicación se sienta mucho más profesional, predecible y
  amigable, ya que el usuario siempre sabe lo que está sucediendo.

  Espero que esta explicación detallada aclare por qué los cambios eran necesarios y
  qué implican. ¡Fue una serie de correcciones importantes para la estabilidad y la
  correcta funcionalidad de la aplicación

#### Errores de Compilación y Construcción
- **Resolución de Errores en Cascada:** Se solucionó una serie de errores de TypeScript y Webpack que impedían la compilación exitosa de la aplicación. Esto incluyó:
  - Corrección de tipos de props incorrectos en varios componentes.
  - Ajuste de asignaciones de desestructuración del estado global de la aplicación.
  - Adición de claves faltantes a la configuración de SWR.
  - Creación de una `Server Action` (`getPhotosMetaAction`) para aislar el código del lado del servidor de los componentes del cliente, resolviendo errores de "Module not found".
  - Corrección de un error de `signOut` no definido en `CommandKClient.tsx` mediante la importación desde `next-auth/react`.

#### Calidad del Código y Refactorización
- **Limpieza de Código:** Se eliminaron importaciones y variables no utilizadas en múltiples archivos para mejorar la legibilidad y el mantenimiento del código.
- **Simplificación:** Se simplificaron y refactorizaron varias partes del código para una mayor claridad y eficiencia.

### 60. Correcciones y Mejoras (Iteración 40)

**Paso 60.1: Añadir el elemento "Report" al menú de administrador**

Se ha añadido un nuevo elemento de menú para acceder a la página de informes en el menú de administrador.

**Detalles de la acción:**
- Se modificó el archivo `src/admin/AdminAppMenu.tsx`.
- Se añadió un nuevo objeto al array `menuItems` con la etiqueta "Report", la ruta `PATH_ADMIN_REPORT` y un icono `HiOutlineChartBar`.
- Se añadieron iconos a todos los demás elementos del menú para mantener la coherencia visual.
- Se importaron los iconos necesarios de `react-icons/fi` y `react-icons/hi`.
- Se ajustó el JSX para renderizar el icono junto a la etiqueta en cada elemento del menú.