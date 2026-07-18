# Nuxt Directus SDK

## Nuxt Directus SDKSeamlessly connect Nuxt with Directus

Featuring authentication, realtime, file management, visual editing and more

## Installation [​](https://www.nuxt-directus-sdk.com/#installation)

bash

```
npm install nuxt-directus-sdk
```

typescript

```
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-directus-sdk'],
})
```

dotenv

```


# .env
DIRECTUS_URL=https://your-directus-instance.com
DIRECTUS_ADMIN_TOKEN=your_admin_token
```

That's it! The module handles:

-   ✅ Auto-imports for all functions

-   ✅ Development proxy (no CORS issues)
-   ✅ WebSocket proxy with authentication

-   ✅ Session-based authentication
-   ✅ Devtools integration

## Quick Example [​](https://www.nuxt-directus-sdk.com/#quick-example)

Get started in minutes with full type safety and auto-imports:

vue

```
<script setup>
// Everything is auto-imported and fully typed!
const { user, login, logout, loggedIn } = useDirectusAuth()
const directus = useDirectus()

// Fetch data with type safety
const { data: posts } = await useAsyncData('posts', () =>
  directus.request(readItems('posts', {
    fields: ['*'],
    limit: 10
  })))

// Subscribe to realtime updates
await directus.connect()
const { subscription } = await directus.subscribe('posts')
</script>

<template>
  <div>
    <!-- Authentication state -->
    <div v-if="loggedIn">
      <p>Welcome, {{ user.email }}</p>
      <button @click="logout()">
        Logout
      </button>
    </div>

    <!-- Visual editing in preview mode -->
    <div v-for="post in posts" :key="post.id">
      <DirectusVisualEditor collection="posts" :item="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </DirectusVisualEditor>
    </div>
  </div>
</template>
```

## Why Choose This Module? [​](https://www.nuxt-directus-sdk.com/#why-choose-this-module)

### Key Advantages [​](https://www.nuxt-directus-sdk.com/#key-advantages)

-   **Session-based auth** (more secure) - httpOnly cookies vs. exposed tokens

-   **Full WebSocket support** - Dev proxy with cookie forwarding
-   **Visual editor** - Integrated live preview mode

-   **Active maintenance** - Regular updates and community support

## License [​](https://www.nuxt-directus-sdk.com/#license)

MIT License - Free to use in personal and commercial projects

---
Source: [Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/)

# Introduction | Nuxt Directus SDK

**nuxt-directus-sdk** is a comprehensive Nuxt module that provides seamless integration with Directus CMS. It handles everything from authentication to realtime updates, making it the easiest way to build Nuxt applications with Directus.

## Why nuxt-directus-sdk? [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#why-nuxt-directus-sdk)

Integrating Directus with Nuxt manually involves solving many complex problems:

-   **Authentication**: Managing sessions, tokens, cookies across SSR/client

-   **CORS**: Dealing with cross-origin requests in development
-   **TypeScript**: Keeping types in sync with your Directus schema

-   **WebSockets**: Setting up realtime connections with proper authentication
-   **File handling**: Managing uploads and asset transformations

This module solves all of these problems and more, providing a **production-ready**, **type-safe**, and **developer-friendly** experience.

## Key Features [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#key-features)

### 🔐 Complete Authentication System [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#%F0%9F%94%90-complete-authentication-system)

-   Session-based auth with httpOnly cookies (more secure than tokens)

-   Auto-login on page load
-   SSO/OAuth support (Google, GitHub, Microsoft, etc.)

-   Full auth flow (login, logout, register, password reset, user invites)
-   Works seamlessly across domains

### ⚡ Realtime & WebSocket Support [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#%E2%9A%A1-realtime-websocket-support)

-   Full WebSocket integration with automatic authentication

-   Dev proxy that handles WebSocket connections
-   Multiple auth modes (handshake, public, strict)

-   Live subscriptions to collection changes

### 🛠️ Zero-Config Development [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#%F0%9F%9B%A0%EF%B8%8F-zero-config-development)

-   Auto-imports for all Directus SDK functions

-   Auto-generated TypeScript types from your schema
-   Dev proxy eliminates CORS issues

-   Directus admin panel in Nuxt DevTools

### 📁 File & Asset Management [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#%F0%9F%93%81-file-asset-management)

-   Single and batch file uploads

-   Image transformations (resize, format conversion, quality control)
-   Smart URL generation with parameters

-   Support for signed URLs

### 🎨 Visual Editor [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#%F0%9F%8E%A8-visual-editor)

-   Live preview mode with inline editing

-   `<DirectusVisualEditor>` component
-   Multiple edit modes (drawer, modal, popover)

-   Works with Directus Visual Editing SDK

### 🔒 SSR Ready [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#%F0%9F%94%92-ssr-ready)

-   Full SSR support

-   HttpOnly cookies for security
-   CORS credential handling

-   Route protection middleware
-   Type-safe server utilities

## Quick Example [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#quick-example)

vue

```
<script setup>
// Auto-imported, fully typed!
const { user, login, logout } = useDirectusAuth()
const directus = useDirectus()

// Fetch data with type safety
const { data: posts } = await useAsyncData('posts', () =>
  directus.request(readItems('posts', {
    fields: ['*'],
    limit: 10
  })))

// Subscribe to realtime updates
await directus.connect()
const { subscription } = await directus.subscribe('posts')
</script>

<template>
  <div>
    <div v-if="loggedIn">
      <p>Welcome, {{ user.email }}</p>
      <button @click="logout()">
        Logout
      </button>
    </div>

    <div v-for="post in posts" :key="post.id">
      <DirectusVisualEditor collection="posts" :item="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </DirectusVisualEditor>
    </div>
  </div>
</template>
```

## What's Next? [​](https://www.nuxt-directus-sdk.com/guide/introduction.html#what-s-next)

-   [Installation](https://www.nuxt-directus-sdk.com/guide/getting-started.html) - Get started in minutes

-   [Authentication](https://www.nuxt-directus-sdk.com/guide/authentication.html) - Learn about session-based auth
-   [Realtime](https://www.nuxt-directus-sdk.com/guide/realtime.html) - Set up WebSocket connections

-   [API Reference](https://www.nuxt-directus-sdk.com/api/configuration/) - Full configuration options

---
Source: [Introduction | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/introduction.html)

# Getting Started | Nuxt Directus SDK

## Getting Started [​](https://www.nuxt-directus-sdk.com/guide/getting-started.html#getting-started)

Get up and running with nuxt-directus-sdk in minutes.

## Installation [​](https://www.nuxt-directus-sdk.com/guide/getting-started.html#installation)

1.  Install the module using your preferred package manager:

npmyarnpnpmbun

bash

```
npm install nuxt-directus-sdk
```

bash

```
yarn add nuxt-directus-sdk
```

bash

```
pnpm add nuxt-directus-sdk
```

bash

```
bun add nuxt-directus-sdk
```

2.  Add the module to your `nuxt.config.ts`:

ts

```
export default defineNuxtConfig({
  modules: ['nuxt-directus-sdk'], 
  directus: {},
})
```

3.  Add the following variables to the `.env` file in your nuxt project root:

dotenv

```
DIRECTUS_URL=https://url-to.directus.app
DIRECTUS_ADMIN_TOKEN=admin_token_required_for_typegen
```

-   **`DIRECTUS_URL`** (required): Your Directus instance URL

-   **`DIRECTUS_ADMIN_TOKEN`** (optional): Admin token for type generation and `useAdminDirectus()` module.

## Directus Configuration [​](https://www.nuxt-directus-sdk.com/guide/getting-started.html#directus-configuration)

For the module to work properly, you need to configure your Directus instance with the following environment variables depending on your environment:

developmentsame-domaincross-domain

dotenv

```
CORS_ENABLED=true
CORS_ORIGIN=*
SESSION_COOKIE_DOMAIN=localhost
```

dotenv

```
SESSION_COOKIE_DOMAIN=http://url-to.nuxt.app
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_SAME_SITE=None
```

dotenv

```
CORS_ENABLED=true
CORS_ORIGIN=http://url-to.nuxt.app
AUTH_LOCAL_MODE=session
SESSION_COOKIE_DOMAIN=url-to.nuxt.app
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_SAME_SITE=none
```

INFO

These configuration examples assume that you do not modify the default environment variables in Directus. Refer to [Directus Configuration](https://directus.io/docs/configuration/general) for details about environment variables and their defaults.

### Optional Configuration [​](https://www.nuxt-directus-sdk.com/guide/getting-started.html#optional-configuration)

dotenv

```
WEBSOCKETS_ENABLED=true
```

## Verify Installation [​](https://www.nuxt-directus-sdk.com/guide/getting-started.html#verify-installation)

Create a simple page to test the integration:

vue

```
<script setup>
const directus = useDirectus()
const { data: posts, error } = await useAsyncData('posts', () =>
  directus.request(
    readItems('posts', {
      limit: 10,
      filter: {
        status: { _eq: 'published' },
      },
    }),
  ))
</script>

<template>
  <div>
    <h1>Blog Posts</h1>
    <div v-if="posts">
      <p>Successfully connected to Directus!</p>
      <p>Item count: {{ posts.length }}</p>
    </div>
    <pre>{{ error }}</pre>
  </div>
  <div
    v-for="post in posts"
    :key="post.id"
  >
    <h2>{{ post.title }}</h2>
  </div>
</template>
```

INFO

The examples provided are written to work with the [directus-template-cli](https://github.com/directus-labs/directus-template-cli?tab=readme-ov-file#directus-template-cli) CMS Template provided by the Directus team.

To populate your Directus instance with the information used in the examples, use the following command:

bash

```
npx directus-template-cli@latest apply
```

WARNING

The template cli will attempt to merge with your existing content, but is not guaranteed to preserve anything. It is recommended that you use the cli on a fresh instance for testing as needed or modify the examples to work with your existing data structures.

## Next Steps [​](https://www.nuxt-directus-sdk.com/guide/getting-started.html#next-steps)

Now that you're set up, explore the features:

-   [Authentication](https://www.nuxt-directus-sdk.com/guide/authentication.html) - Session-based auth, SSO, user management

-   [Realtime](https://www.nuxt-directus-sdk.com/guide/realtime.html) - WebSocket connections and live updates
-   [File Management](https://www.nuxt-directus-sdk.com/guide/files.html) - Upload and transform files

-   [Visual Editor](https://www.nuxt-directus-sdk.com/guide/visual-editor.html) - Live preview and inline editing
-   [Type Generation](https://www.nuxt-directus-sdk.com/guide/type-generation.html) - Auto-generated types from your Directus schema

-   [Proxy](https://www.nuxt-directus-sdk.com/guide/proxy.html) - Support for cross origin server configurations
-   [Server-Side Utils](https://www.nuxt-directus-sdk.com/guide/server-side.html) - Server routes and utilities

-   [Configuration Reference](https://www.nuxt-directus-sdk.com/api/configuration/) - All configuration options

---
Source: [Getting Started | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/getting-started.html)

# Authentication | Nuxt Directus SDK

nuxt-directus-sdk uses Directus's **session-based authentication**, which is ideal for Nuxt applications. Session mode provides better security (httpOnly cookies) and works seamlessly across domains with proper configuration.

## Quick Start [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#quick-start)

### Basic Login [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#basic-login)

typescript

```
const { login, logout, user, loggedIn } = useDirectusAuth()

// Login with email/password
await login('user@example.com', 'password')

// Check if logged in
if (loggedIn.value) {
  console.log('User:', user.value)
}

// Logout
await logout()
```

The module automatically:

-   Sets the session cookie

-   Fetches the user data
-   Redirects after login/logout

-   Handles token refresh

## SSO / OAuth Login [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#sso-oauth-login)

One-line integration with SSO providers:

typescript

```
const { loginWithProvider } = useDirectusAuth()

// Redirect to Google OAuth
await loginWithProvider('google')

// Other providers
await loginWithProvider('github')
await loginWithProvider('microsoft')
await loginWithProvider('facebook')
```

The flow:

1.  Redirects to Directus SSO endpoint
2.  User authenticates with provider
3.  Directus sets session cookie
4.  Redirects back to your app
5.  User is automatically logged in

Directus Configuration Required

For SSO to work with external redirects, you must add your frontend URL to the Directus redirect allow list:

dotenv

```


# Directus .env
AUTH_<PROVIDER>_REDIRECT_ALLOW_LIST=https://yourapp.com,http://localhost:3000
```

For example:

dotenv

```
AUTH_GOOGLE_REDIRECT_ALLOW_LIST=https://yourapp.com,http://localhost:3000
AUTH_GITHUB_REDIRECT_ALLOW_LIST=https://yourapp.com,http://localhost:3000
```

This is a security setting in Directus to prevent open redirect vulnerabilities.

## User Management [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#user-management)

### Get Current User [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#get-current-user)

typescript

```
const { user, readMe } = useDirectusAuth()

// User is auto-fetched on app load
console.log(user.value)

// Manually refresh user data
await readMe()
```

### Update Current User [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#update-current-user)

typescript

```
const { updateMe } = useDirectusAuth()

await updateMe({
  first_name: 'John',
  last_name: 'Doe',
})
```

### User Registration [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#user-registration)

typescript

```
const { register } = useDirectusAuth()

const newUser = await register({
  email: 'newuser@example.com',
  password: 'secure-password',
  first_name: 'John',
  last_name: 'Doe',
})
```

### Password Reset [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#password-reset)

typescript

```
const { passwordRequest, passwordReset } = useDirectusAuth()

// Request password reset
await passwordRequest('user@example.com', 'https://yourapp.com/reset-password')

// Reset password with token
await passwordReset('reset-token', 'new-password')
```

Directus Configuration Required

For password reset links to work with external domains, you must add them to the Directus redirect allow list:

dotenv

```


# Directus .env
PASSWORD_RESET_URL_ALLOW_LIST=https://yourapp.com/auth/password-reset,http://localhost:3000/auth/password-reset
```

This is a security setting in Directus to prevent open redirect vulnerabilities when users accept invitations.

### User Invites [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#user-invites)

typescript

```
const { inviteUser, acceptUserInvite } = useDirectusAuth()

// Invite a user
await inviteUser('newuser@example.com', 'role-id', 'https://yourapp.com/accept-invite')

// Accept invite
await acceptUserInvite('invite-token', 'password')
```

Directus Configuration Required

For invite URLs to work with external domains, you must add them to the Directus redirect allow list:

dotenv

```


# Directus .env
USER_INVITE_URL_ALLOW_LIST=https://yourapp.com/accept-invite,http://localhost:3000/accept-invite
```

This is a security setting in Directus to prevent open redirect vulnerabilities when users accept invitations.

## Protected Routes [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#protected-routes)

### Page-Level Protection [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#page-level-protection)

Protect individual pages with the `auth` middleware:

vue

```
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div>
    <p>This page requires authentication</p>
  </div>
</template>
```

### Global Protection [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#global-protection)

Protect all routes by default:

typescript

```
// nuxt.config.ts
export default defineNuxtConfig({
  directus: {
    auth: {
      enableGlobalAuthMiddleware: true,
    },
  },
})
```

Then allow public pages using the `guest` middleware:

vue

```
<script setup>
definePageMeta({
  middleware: 'guest'
})
</script>

<template>
  <div>
    <p>This page is public</p>
  </div>
</template>
```

### Custom Redirects [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#custom-redirects)

Configure where users are redirected:

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      redirect: {
        home: '/', // Where to go after login
        login: '/auth/login', // Where to go when not logged in
        logout: '/', // Where to go after logout
      },
    },
  },
})
```

## Server-Side Authentication [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#server-side-authentication)

### In Server Routes [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#in-server-routes)

typescript

```
// server/api/profile.ts
export default defineEventHandler(async (event) => {
  const directus = useSessionDirectus(event)

  // This request is automatically authenticated with the user's session
  const user = await directus.request(readMe())

  return { user }
})
```

### Admin Operations [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#admin-operations)

typescript

```
// server/api/admin/users.ts
export default defineEventHandler(async () => {
  const directus = useAdminDirectus()

  // Uses admin token for privileged operations
  const users = await directus.request(readUsers())

  return { users }
})
```

## Configuration [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#configuration)

### Frontend Configuration [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#frontend-configuration)

typescript

```
// nuxt.config.ts
export default defineNuxtConfig({
  directus: {

    auth: {
      enabled: true, // default
      autoRefresh: true, // auto-refresh tokens
      credentials: 'include', // required for cross-domain
      realtimeAuthMode: 'public', // 'public', 'handshake', or 'strict'
      enableGlobalAuthMiddleware: false, // protect all routes
      readMeFields: ['*'], // fields to fetch for current user
      redirect: {
        home: '/',
        login: '/auth/login',
        logout: '/',
      },
    },
  },
})
```

### Backend Configuration [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#backend-configuration)

#### Same Domain Setup [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#same-domain-setup)

If your Nuxt app and Directus are on the same domain (e.g., localhost in dev):

dotenv

```


# Directus .env
AUTH_LOCAL_MODE=session
SESSION_COOKIE_SECURE=false  # true in production
SESSION_COOKIE_SAME_SITE=Lax

CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true
```

#### Cross-Domain Setup [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#cross-domain-setup)

For production with separate domains (e.g., `app.example.com` and `api.example.com`):

dotenv

```


# Directus .env
AUTH_LOCAL_MODE=session
SESSION_COOKIE_DOMAIN=.example.com    # Shared parent domain
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_SAME_SITE=None

CORS_ENABLED=true
CORS_ORIGIN=https://app.example.com
CORS_CREDENTIALS=true
```

## Composable API Reference [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#composable-api-reference)

### `useDirectusAuth()` [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#usedirectusauth)

Returns an object with auth methods and state:

typescript

```
const {
  user, // Ref<DirectusUser | null>
  loggedIn, // ComputedRef<boolean>
  readMe, // () => Promise<DirectusUser | null>
  updateMe, // (data) => Promise<DirectusUser>
  login, // (email, password, options?) => Promise<DirectusUser>
  loginWithProvider, // (provider, redirect?) => Promise<void>
  logout, // (redirect?) => Promise<void>
  register, // (data) => Promise<DirectusUser>
  createUser, // (data) => Promise<DirectusUser>
  inviteUser, // (email, role, inviteUrl?) => Promise<void>
  acceptUserInvite, // (token, password) => Promise<void>
  passwordRequest, // (email, resetUrl?) => Promise<void>
  passwordReset, // (token, password) => Promise<void>
} = useDirectusAuth()
```

### `useDirectusUser()` [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#usedirectususer)

Direct access to the user state:

typescript

```
const user = useDirectusUser()
// Ref<DirectusUser | null>
```

## Advanced Topics [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#advanced-topics)

### Custom Login Logic [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#custom-login-logic)

typescript

```
const { login } = useDirectusAuth()

// Login without redirect
await login('user@example.com', 'password', {
  redirect: false
})

// Login with custom redirect
await login('user@example.com', 'password', {
  redirect: '/custom-page'
})

// Login and handle manually
const user = await login('user@example.com', 'password', {
  redirect: false
})

if (user.role === 'admin') {
  await navigateTo('/admin')
}
else {
  await navigateTo('/dashboard')
}
```

### Listen to Login Events [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#listen-to-login-events)

typescript

```
// plugins/auth-listener.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('directus:loggedIn', (user) => {
    console.log('User logged in:', user)
    // Track login event, update analytics, etc.
  })
})
```

### Configurable User Fields [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#configurable-user-fields)

Control which fields are fetched for the current user:

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      readMeFields: ['id', 'email', 'first_name', 'last_name', 'avatar'],
    },
  },
})
```

## Troubleshooting [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#troubleshooting)

### Cookies Not Being Set [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#cookies-not-being-set)

1.  ✅ Check `CORS_CREDENTIALS=true` in Directus
2.  ✅ Verify `SESSION_COOKIE_DOMAIN` is set correctly
3.  ✅ Ensure both sites use HTTPS in production (required for `SameSite=None`)
4.  ✅ Check `credentials: 'include'` is set in module config

### Session Not Persisting [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#session-not-persisting)

1.  ✅ Make sure cookies aren't being blocked by browser
2.  ✅ Check browser dev tools → Application → Cookies
3.  ✅ Verify `directus_session_token` cookie exists
4.  ✅ Ensure cookie domain matches your setup

### SSR Issues [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#ssr-issues)

1.  ✅ Use `useSessionDirectus(event)` in server routes (not `useDirectus()`)
2.  ✅ Check cookies are being forwarded on SSR (automatic with this module)
3.  ✅ Verify server-side requests include session cookie

## See Also [​](https://www.nuxt-directus-sdk.com/guide/authentication.html#see-also)

-   [Directus Authentication Docs](https://docs.directus.io/reference/authentication.html)

-   [Server-Side Utils](https://www.nuxt-directus-sdk.com/guide/server-side.html)
-   [Configuration Reference](https://www.nuxt-directus-sdk.com/api/configuration/)

---
Source: [Authentication | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/authentication.html)

# Realtime & WebSockets | Nuxt Directus SDK

nuxt-directus-sdk provides full WebSocket support for realtime updates from your Directus collections. The module handles WebSocket authentication automatically using your session cookies.

## Quick Start [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#quick-start)

### Basic Subscription [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#basic-subscription)

typescript

```
const directus = useDirectus()

// Connect to WebSocket
await directus.connect()

// Subscribe to a collection
const { subscription } = await directus.subscribe('posts', {
  query: {
    fields: ['*'],
    filter: {
      status: { _eq: 'published' }
    }
  }
})

// Listen for updates
for await (const message of subscription) {
  if (message.event === 'create') {
    console.log('New post created:', message.data)
  }
  if (message.event === 'update') {
    console.log('Post updated:', message.data)
  }
  if (message.event === 'delete') {
    console.log('Post deleted:', message.data)
  }
}

// Unsubscribe when done
subscription.unsubscribe()
```

### Reactive Example [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#reactive-example)

vue

```
<script setup>
const directus = useDirectus()
const posts = ref([])

onMounted(async () => {
  // Load initial data
  posts.value = await directus.request(readItems('posts'))

  // Connect and subscribe
  await directus.connect()
  const { subscription } = await directus.subscribe('posts')

  // Update reactively
  for await (const message of subscription) {
    if (message.event === 'create') {
      posts.value.push(message.data[0])
    }
    if (message.event === 'update') {
      const index = posts.value.findIndex(p => p.id === message.data[0].id)
      if (index !== -1) {
        posts.value[index] = message.data[0]
      }
    }
    if (message.event === 'delete') {
      posts.value = posts.value.filter(p => !message.data.includes(p.id))
    }
  }
})

onBeforeUnmount(() => {
  subscription.unsubscribe()
})
</script>

<template>
  <div v-for="post in posts" :key="post.id">
    {{ post.title }}
  </div>
</template>
```

## Configuration [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#configuration)

### Directus Configuration [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#directus-configuration)

Enable WebSockets in your Directus instance:

dotenv

```


# Directus .env
WEBSOCKETS_ENABLED=true

# Authentication mode
WEBSOCKETS_REST_AUTH=strict  # or 'public' or 'handshake'
WEBSOCKETS_REST_AUTH_TIMEOUT=30000
```

### Nuxt Configuration [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#nuxt-configuration)

Configure realtime auth mode in your Nuxt app:

typescript

```
// nuxt.config.ts
export default defineNuxtConfig({
  directus: {
    auth: {
      realtimeAuthMode: 'public', // 'public', 'handshake', or 'strict'
    },
  },
})
```

## Authentication Modes [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#authentication-modes)

### Public Mode (Recommended) [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#public-mode-recommended)

With session-based authentication and `WEBSOCKETS_REST_AUTH=strict` in Directus:

typescript

```
// nuxt.config.ts
export default defineNuxtConfig({
  directus: {
    auth: {
      realtimeAuthMode: 'public', // Default
    },
  },
})
```

The WebSocket authentication is handled by the session cookie automatically forwarded through the WebSocket proxy.

### Handshake Mode [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#handshake-mode)

Authenticates during the initial WebSocket handshake:

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      realtimeAuthMode: 'public', // Default - recommended
    },
  },
})
```

Requires `WEBSOCKETS_REST_AUTH=handshake` in Directus.

### Strict Mode [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#strict-mode)

Per-message authentication (more overhead):

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      realtimeAuthMode: 'strict',
    },
  },
})
```

## Development Proxy [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#development-proxy)

In development mode, WebSocket connections use a special proxy route (`/directus-ws`) that:

-   Forwards WebSocket connections to Directus

-   Includes session cookies for authentication
-   Handles secure WebSocket upgrades

This is automatic - no configuration needed!

## Subscription API [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#subscription-api)

### Subscribe to Collection [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#subscribe-to-collection)

typescript

```
const { subscription } = await directus.subscribe('collection_name', {
  query: {
    fields: ['*'],
    filter: { /* filter options */ },
    limit: 100,
  },
  uid: 'optional-uid' // Unique identifier for this subscription
})
```

### Event Types [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#event-types)

typescript

```
for await (const message of subscription) {
  switch (message.event) {
    case 'init':
      // Initial connection
      console.log('Subscription active')
      break
    case 'create':
      // New item created
      console.log('Created:', message.data)
      break
    case 'update':
      // Item updated
      console.log('Updated:', message.data)
      break
    case 'delete':
      // Item deleted
      console.log('Deleted:', message.data) // Array of IDs
      break
  }
}
```

### Unsubscribe [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#unsubscribe)

typescript

```
// Unsubscribe from specific subscription
subscription.unsubscribe()

// Disconnect entirely
await directus.disconnect()
```

## Advanced Usage [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#advanced-usage)

### Multiple Subscriptions [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#multiple-subscriptions)

typescript

```
const directus = useDirectus()
await directus.connect()

// Subscribe to multiple collections
const posts = await directus.subscribe('posts')
const comments = await directus.subscribe('comments')
const users = await directus.subscribe('directus_users')

// Handle each subscription
Promise.all([
  (async () => {
    for await (const msg of posts.subscription) {
      console.log('Post event:', msg)
    }
  })(),
  (async () => {
    for await (const msg of comments.subscription) {
      console.log('Comment event:', msg)
    }
  })(),
])
```

### Filtered Subscriptions [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#filtered-subscriptions)

typescript

```
// Only subscribe to published posts
const { subscription } = await directus.subscribe('posts', {
  query: {
    filter: {
      status: { _eq: 'published' },
      author: { _eq: '$CURRENT_USER' }
    }
  }
})
```

### Composable Pattern [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#composable-pattern)

Create a reusable composable:

typescript

```
// composables/useRealtimePosts.ts
export function useRealtimePosts() {
  const directus = useDirectus()
  const posts = ref([])
  const connected = ref(false)
  let subscription: any = null

  async function connect() {
    // Load initial data
    posts.value = await directus.request(readItems('posts'))

    // Connect WebSocket
    await directus.connect()
    connected.value = true

    // Subscribe
    const result = await directus.subscribe('posts')
    subscription = result.subscription

    // Handle updates
    for await (const message of subscription) {
      if (message.event === 'create') {
        posts.value.push(...message.data)
      }
      if (message.event === 'update') {
        message.data.forEach((updated) => {
          const index = posts.value.findIndex(p => p.id === updated.id)
          if (index !== -1) {
            posts.value[index] = updated
          }
        })
      }
      if (message.event === 'delete') {
        posts.value = posts.value.filter(p => !message.data.includes(p.id))
      }
    }
  }

  function disconnect() {
    if (subscription) {
      subscription.unsubscribe()
    }
    connected.value = false
  }

  return {
    posts,
    connected,
    connect,
    disconnect,
  }
}
```

Usage:

vue

```
<script setup>
const { posts, connected, connect, disconnect } = useRealtimePosts()

onMounted(() => connect())
onBeforeUnmount(() => disconnect())
</script>

<template>
  <div>
    <p v-if="connected">
      🟢 Live
    </p>
    <div v-for="post in posts" :key="post.id">
      {{ post.title }}
    </div>
  </div>
</template>
```

## Troubleshooting [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#troubleshooting)

### WebSocket Connection Failed [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#websocket-connection-failed)

1.  ✅ Check `WEBSOCKETS_ENABLED=true` in Directus
2.  ✅ Verify `WEBSOCKETS_REST_AUTH` matches your `realtimeAuthMode`
3.  ✅ Ensure you're authenticated before connecting
4.  ✅ Check browser console for WebSocket errors

### Authentication Errors [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#authentication-errors)

1.  ✅ Verify session cookie exists (`directus_session_token`)
2.  ✅ Check `WEBSOCKETS_REST_AUTH=strict` in Directus
3.  ✅ Use `realtimeAuthMode: 'public'` in Nuxt config
4.  ✅ Make sure you're logged in before connecting

### Connection Stuck on "Pending" [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#connection-stuck-on-pending)

1.  ✅ Check Directus logs for WebSocket errors
2.  ✅ Verify WebSocket URL is correct (check browser dev tools → Network → WS)
3.  ✅ Ensure development proxy is running
4.  ✅ Check for CORS issues in Directus

### Updates Not Received [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#updates-not-received)

1.  ✅ Verify subscription is active: `subscription.unsubscribe` exists
2.  ✅ Check Directus permissions allow read access
3.  ✅ Ensure filter query matches the data you're changing
4.  ✅ Test with a simple subscription (no filters)

## See Also [​](https://www.nuxt-directus-sdk.com/guide/realtime.html#see-also)

-   [Directus Realtime Docs](https://docs.directus.io/guides/real-time/)

-   [Authentication](https://www.nuxt-directus-sdk.com/guide/authentication.html)
-   [Configuration Reference](https://www.nuxt-directus-sdk.com/api/configuration/)

---
Source: [Realtime & WebSockets | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/realtime.html)

# File Management | Nuxt Directus SDK

nuxt-directus-sdk provides utilities for uploading files to Directus and generating optimized image URLs with transformation options.

## File Uploads [​](https://www.nuxt-directus-sdk.com/guide/files.html#file-uploads)

### Upload Single File [​](https://www.nuxt-directus-sdk.com/guide/files.html#upload-single-file)

typescript

```
const file = event.target.files[0]

const uploadedFile = await uploadDirectusFile({
  file,
  data: {
    title: 'My Image',
    folder: 'folder-id',
  }
})

console.log('File uploaded:', uploadedFile.id)
```

### Upload Multiple Files [​](https://www.nuxt-directus-sdk.com/guide/files.html#upload-multiple-files)

typescript

```
const files = Array.from(event.target.files).map(file => ({
  file,
  data: {
    folder: 'folder-id',
  }
}))

const uploadedFiles = await uploadDirectusFiles(files)

console.log('Uploaded files:', uploadedFiles)
```

### Complete Upload Example [​](https://www.nuxt-directus-sdk.com/guide/files.html#complete-upload-example)

vue

```
<script setup>
const uploading = ref(false)
const uploadedFile = ref(null)

async function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file)
    return

  uploading.value = true

  try {
    uploadedFile.value = await uploadDirectusFile({
      file,
      data: {
        title: file.name,
        description: 'Uploaded from Nuxt app',
      }
    })

    console.log('Upload successful:', uploadedFile.value)
  }
  catch (error) {
    console.error('Upload failed:', error)
  }
  finally {
    uploading.value = false
  }
}
</script>

<template>
  <div>
    <input type="file" :disabled="uploading" @change="handleFileUpload">

    <div v-if="uploading">
      Uploading...
    </div>

    <div v-if="uploadedFile">
      <p>File uploaded successfully!</p>
      <img :src="getDirectusFileUrl(uploadedFile.id, { width: 300 })">
    </div>
  </div>
</template>
```

## File URLs [​](https://www.nuxt-directus-sdk.com/guide/files.html#file-urls)

### Basic File URL [​](https://www.nuxt-directus-sdk.com/guide/files.html#basic-file-url)

typescript

```
// From file ID
const url = getDirectusFileUrl('file-uuid')

// From file object
const file = await directus.request(readFile('file-uuid'))
const url = getDirectusFileUrl(file)
```

### Image Transformations [​](https://www.nuxt-directus-sdk.com/guide/files.html#image-transformations)

The `getDirectusFileUrl()` function supports all Directus asset transformation parameters:

typescript

```
const url = getDirectusFileUrl('file-uuid', {
  width: 800,
  height: 600,
  quality: 80,
  fit: 'cover',
  format: 'webp',
})
```

## Transformation Options [​](https://www.nuxt-directus-sdk.com/guide/files.html#transformation-options)

### Width & Height [​](https://www.nuxt-directus-sdk.com/guide/files.html#width-height)

Resize images to specific dimensions:

typescript

```
// Fixed width, auto height
getDirectusFileUrl(file, { width: 800 })

// Fixed height, auto width
getDirectusFileUrl(file, { height: 600 })

// Fixed width and height
getDirectusFileUrl(file, { width: 800, height: 600 })
```

### Fit Modes [​](https://www.nuxt-directus-sdk.com/guide/files.html#fit-modes)

Control how images are resized:

typescript

```
// Cover - crop to fill dimensions (default)
getDirectusFileUrl(file, { width: 800, height: 600, fit: 'cover' })

// Contain - resize to fit within dimensions
getDirectusFileUrl(file, { width: 800, height: 600, fit: 'contain' })

// Inside - resize only if larger
getDirectusFileUrl(file, { width: 800, height: 600, fit: 'inside' })

// Outside - resize to cover dimensions
getDirectusFileUrl(file, { width: 800, height: 600, fit: 'outside' })
```

### Format Conversion [​](https://www.nuxt-directus-sdk.com/guide/files.html#format-conversion)

Convert images to different formats:

typescript

```
// Convert to WebP
getDirectusFileUrl(file, { format: 'webp' })

// Convert to AVIF (modern format, better compression)
getDirectusFileUrl(file, { format: 'avif' })

// Other formats: jpg, png, tiff
getDirectusFileUrl(file, { format: 'jpg' })
```

### Quality [​](https://www.nuxt-directus-sdk.com/guide/files.html#quality)

Control image compression (1-100):

typescript

```
// Low quality, smaller file
getDirectusFileUrl(file, { quality: 60 })

// High quality
getDirectusFileUrl(file, { quality: 90 })

// Combined with format
getDirectusFileUrl(file, { format: 'webp', quality: 80 })
```

### Prevent Enlargement [​](https://www.nuxt-directus-sdk.com/guide/files.html#prevent-enlargement)

Prevent upscaling of small images:

typescript

```
getDirectusFileUrl(file, {
  width: 1920,
  withoutEnlargement: true, // Won't upscale if original is smaller
})
```

### Download Files [​](https://www.nuxt-directus-sdk.com/guide/files.html#download-files)

Generate download links:

typescript

```
// Force download
getDirectusFileUrl(file, { download: true })

// Download with custom filename
getDirectusFileUrl(file, {
  download: true,
  filename: 'my-custom-filename.jpg'
})
```

## Responsive Images [​](https://www.nuxt-directus-sdk.com/guide/files.html#responsive-images)

Create responsive images with multiple sizes:

vue

```
<script setup>
const props = defineProps({
  image: Object,
  alt: String,
})

const sizes = {
  small: getDirectusFileUrl(props.image, { width: 400, format: 'webp' }),
  medium: getDirectusFileUrl(props.image, { width: 800, format: 'webp' }),
  large: getDirectusFileUrl(props.image, { width: 1200, format: 'webp' }),
}
</script>

<template>
  <img
    :src="sizes.medium"
    :srcset="`
      ${sizes.small} 400w,
      ${sizes.medium} 800w,
      ${sizes.large} 1200w
    `"
    sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
    :alt="alt"
  >
</template>
```

## Using Nuxt Image [​](https://www.nuxt-directus-sdk.com/guide/files.html#using-nuxt-image)

The module automatically integrates with `@nuxt/image` for advanced image optimization. The Directus provider is pre-configured and ready to use:

vue

```
<script setup>
const props = defineProps({
  fileId: String,
})
</script>

<template>
  <NuxtImg
    provider="directus"
    :src="fileId"
    width="800"
    height="600"
    format="webp"
    quality="80"
    fit="cover"
  />
</template>
```

### Setting Directus as Default Provider [​](https://www.nuxt-directus-sdk.com/guide/files.html#setting-directus-as-default-provider)

By default, you need to specify `provider="directus"` on `<NuxtImg>` components. You can make Directus the default provider:

typescript

```
export default defineNuxtConfig({
  modules: ['nuxt-directus-sdk'],

  directus: {
    url: 'https://directus.example.com',

    image: {
      // Set Directus as default provider
      setDefaultProvider: true,
      modifiers: {
        withoutEnlargement: 'true',
        // array of options from sharp api (https://sharp.pixelplumbing.com/api-operation/)
        transforms: [['blur', 4], ['negate']]
      }
    },
  },
})
```

With this setting, you can use `<NuxtImg>` without specifying the provider:

vue

```
<template>
  <!-- No need to specify provider="directus" -->
  <NuxtImg
    src="your-file-id"
    width="800"
    height="600"
  />
</template>
```

### Disabling Nuxt Image Integration [​](https://www.nuxt-directus-sdk.com/guide/files.html#disabling-nuxt-image-integration)

If you don't want to use `@nuxt/image`, you can disable it:

typescript

```
export default defineNuxtConfig({
  directus: {
    url: 'https://directus.example.com',
    image: false, // Disable @nuxt/image integration
  },
})
```

## File Management [​](https://www.nuxt-directus-sdk.com/guide/files.html#file-management-1)

### Reading Files [​](https://www.nuxt-directus-sdk.com/guide/files.html#reading-files)

typescript

```
const directus = useDirectus()

// Get single file
const file = await directus.request(readFile('file-uuid'))

// Get all files
const files = await directus.request(readFiles())

// Get files with query
const images = await directus.request(readFiles({
  filter: {
    type: { _starts_with: 'image/' }
  },
  limit: 10,
}))
```

### Updating Files [​](https://www.nuxt-directus-sdk.com/guide/files.html#updating-files)

typescript

```
// Update file metadata
await directus.request(updateFile('file-uuid', {
  title: 'Updated Title',
  description: 'New description',
}))
```

### Deleting Files [​](https://www.nuxt-directus-sdk.com/guide/files.html#deleting-files)

typescript

```
// Delete single file
await directus.request(deleteFile('file-uuid'))

// Delete multiple files
await directus.request(deleteFiles(['uuid1', 'uuid2']))
```

## Advanced Examples [​](https://www.nuxt-directus-sdk.com/guide/files.html#advanced-examples)

### Image Gallery [​](https://www.nuxt-directus-sdk.com/guide/files.html#image-gallery)

vue

```
<script setup>
const directus = useDirectus()
const uploading = ref(false)

// Load existing images
const { data: images } = await useAsyncData('gallery', () =>
  directus.request(readFiles({
    filter: { type: { _starts_with: 'image/' } },
    sort: ['-uploaded_on'],
  })))

async function handleUpload(event) {
  const files = Array.from(event.target.files).map(file => ({ file }))
  uploading.value = true

  try {
    const uploaded = await uploadDirectusFiles(files)
    images.value = [
      ...(Array.isArray(uploaded) ? uploaded : [uploaded]),
      ...(images.value || [])
    ]
  }
  finally {
    uploading.value = false
  }
}
</script>

<template>
  <div>
    <input
      type="file"
      multiple
      accept="image/*"
      :disabled="uploading"
      @change="handleUpload"
    >

    <div class="gallery">
      <div v-for="image in images" :key="image.id" class="gallery-item">
        <img
          :src="getDirectusFileUrl(image, {
            width: 300,
            height: 300,
            fit: 'cover',
            format: 'webp',
            quality: 80,
          })"
          :alt="image.title"
        >
        <p>{{ image.title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
```

### Optimized Hero Image [​](https://www.nuxt-directus-sdk.com/guide/files.html#optimized-hero-image)

vue

```
<script setup>
const props = defineProps({
  image: Object,
})

// Generate optimized URLs for different formats and sizes
const sources = {
  avif: {
    desktop: getDirectusFileUrl(props.image, {
      width: 1920,
      format: 'avif',
      quality: 75
    }),
    mobile: getDirectusFileUrl(props.image, {
      width: 768,
      format: 'avif',
      quality: 75
    }),
  },
  webp: {
    desktop: getDirectusFileUrl(props.image, {
      width: 1920,
      format: 'webp',
      quality: 80
    }),
    mobile: getDirectusFileUrl(props.image, {
      width: 768,
      format: 'webp',
      quality: 80
    }),
  },
  jpg: {
    desktop: getDirectusFileUrl(props.image, {
      width: 1920,
      format: 'jpg',
      quality: 85
    }),
    mobile: getDirectusFileUrl(props.image, {
      width: 768,
      format: 'jpg',
      quality: 85
    }),
  },
}
</script>

<template>
  <picture>
    <!-- AVIF format (best compression) -->
    <source
      :srcset="`${sources.avif.mobile} 768w, ${sources.avif.desktop} 1920w`"
      type="image/avif"
      sizes="100vw"
    >

    <!-- WebP format (good compression) -->
    <source
      :srcset="`${sources.webp.mobile} 768w, ${sources.webp.desktop} 1920w`"
      type="image/webp"
      sizes="100vw"
    >

    <!-- JPG fallback -->
    <img
      :src="sources.jpg.desktop"
      :srcset="`${sources.jpg.mobile} 768w, ${sources.jpg.desktop} 1920w`"
      sizes="100vw"
      :alt="image.title"
      loading="lazy"
    >
  </picture>
</template>
```

## API Reference [​](https://www.nuxt-directus-sdk.com/guide/files.html#api-reference)

### `uploadDirectusFile(file, query?)` [​](https://www.nuxt-directus-sdk.com/guide/files.html#uploaddirectusfile-file-query)

Upload a single file to Directus.

**Parameters:**

-   `file: { file: File, data?: Record<string, string> }` - File and metadata

-   `query?: Query` - Directus query options

**Returns:** `Promise<DirectusFile>`

### `uploadDirectusFiles(files, query?)` [​](https://www.nuxt-directus-sdk.com/guide/files.html#uploaddirectusfiles-files-query)

Upload multiple files to Directus.

**Parameters:**

-   `files: Array<{ file: File, data?: Record<string, string> }>` - Files and metadata

-   `query?: Query` - Directus query options

**Returns:** `Promise<DirectusFile[] | DirectusFile>`

### `getDirectusFileUrl(file, options?)` [​](https://www.nuxt-directus-sdk.com/guide/files.html#getdirectusfileurl-file-options)

Generate a URL for a Directus file with optional transformations.

**Parameters:**

-   `file: string | DirectusFile` - File ID or file object

-   `options?: DirectusFileOptions` - Transformation options

**Options:**

typescript

```
interface DirectusFileOptions {
  filename?: string // Custom filename for downloads
  download?: boolean // Force download
  width?: number // Resize width
  height?: number // Resize height
  quality?: number // Image quality (1-100)
  fit?: 'cover' | 'contain' | 'inside' | 'outside'
  format?: 'jpg' | 'png' | 'webp' | 'tiff' | 'avif'
  withoutEnlargement?: boolean // Prevent upscaling
  key?: string // Access key for private files
}
```

**Returns:** `string` - Full URL to the file

## See Also [​](https://www.nuxt-directus-sdk.com/guide/files.html#see-also)

-   [Directus Files Documentation](https://docs.directus.io/reference/files.html)

-   [Getting Started](https://www.nuxt-directus-sdk.com/guide/getting-started.html)
-   [Configuration Reference](https://www.nuxt-directus-sdk.com/api/configuration/)

---
Source: [File Management | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/files.html)

# Visual Editor | Nuxt Directus SDK

The Visual Editor allows content editors to preview and edit content directly from your Nuxt frontend when embedded inside the Directus admin panel. It automatically detects when your site is loaded inside a Directus iframe and enables inline editing.

## Features [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#features)

-   Automatic iframe detection — no query parameters needed

-   Inline editing with drawer, modal, or popover modes
-   Edit and Add buttons for quick content management

-   Debug mode via `?debug` for troubleshooting deployments
-   Automatic data refresh on save (no full page reload)

-   MutationObserver-based detection for reliable SSR hydration

## How It Works [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#how-it-works)

When `visualEditor: true` is set in your config (the default), the module:

1.  **Detects the iframe** — On the client, the plugin checks `window.parent !== window` to determine if your site is embedded inside Directus
2.  **Renders attributes** — `DirectusVisualEditor` components add `data-directus` attributes to mark editable elements (only when inside the iframe)
3.  **Applies the SDK** — A client-only plugin uses a MutationObserver to detect `data-directus` attributes in the DOM, then calls `apply()` from `@directus/visual-editing` to establish the connection with Directus
4.  **Refreshes on save** — When content is saved in Directus, `refreshNuxtData()` is called to update the page without a full reload

## Quick Start [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#quick-start)

### 1\. Enable Visual Editor (default) [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#_1-enable-visual-editor-default)

typescript

```
// nuxt.config.ts
export default defineNuxtConfig({
  directus: {
    url: 'https://your-directus-instance.com',
    visualEditor: true, // This is the default
  },
})
```

### 2\. Wrap Editable Content [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#_2-wrap-editable-content)

vue

```
<script setup>
const directus = useDirectus()

const { data: article } = await useAsyncData('article', () =>
  directus.request(readItem('articles', route.params.id)))
</script>

<template>
  <article>
    <DirectusVisualEditor
      collection="articles"
      :item="article.id"
      fields="title"
    >
      <h1>{{ article.title }}</h1>
    </DirectusVisualEditor>

    <DirectusVisualEditor
      collection="articles"
      :item="article.id"
      fields="content"
    >
      <div v-html="article.content" />
    </DirectusVisualEditor>
  </article>
</template>
```

### 3\. Configure Directus Live Preview [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#_3-configure-directus-live-preview)

In your Directus admin panel, configure Live Preview to point to your Nuxt app URL. When content editors open the preview, your site loads inside the Directus iframe and editing is automatically enabled.

No `?preview=true` query parameter is needed — the visual editor activates automatically when it detects the iframe.

## Component Props [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#component-props)

### `collection` (required) [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#collection-required)

The Directus collection name:

vue

```
<DirectusVisualEditor collection="articles" :item="article.id">
  <h1>{{ article.title }}</h1>
</DirectusVisualEditor>
```

### `item` (required) [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#item-required)

The item ID (primary key):

vue

```
<DirectusVisualEditor collection="articles" :item="article.id">
  <!-- content -->
</DirectusVisualEditor>
```

### `fields` (optional) [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#fields-optional)

Specify which field(s) to edit. Can be a string or array:

vue

```
<!-- Single field -->
<DirectusVisualEditor
  collection="articles"
  :item="article.id"
  fields="title"
>
  <h1>{{ article.title }}</h1>
</DirectusVisualEditor>

<!-- Multiple fields -->
<DirectusVisualEditor
  collection="articles"
  :item="article.id"
  :fields="['title', 'subtitle']"
>
  <h1>{{ article.title }}</h1>
  <h2>{{ article.subtitle }}</h2>
</DirectusVisualEditor>
```

If omitted, all fields in the wrapped content can be edited.

### `mode` (optional) [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#mode-optional)

Control how the editor opens:

vue

```
<!-- Drawer mode (default) - slides in from the side -->
<DirectusVisualEditor mode="drawer" collection="articles" :item="id">
  <h1>{{ article.title }}</h1>
</DirectusVisualEditor>

<!-- Modal mode - opens in a centered modal -->
<DirectusVisualEditor mode="modal" collection="articles" :item="id">
  <h1>{{ article.title }}</h1>
</DirectusVisualEditor>

<!-- Popover mode - opens near the clicked element -->
<DirectusVisualEditor mode="popover" collection="articles" :item="id">
  <h1>{{ article.title }}</h1>
</DirectusVisualEditor>
```

## Visual Editor State [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#visual-editor-state)

### `useDirectusVisualEditor()` [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#usedirectusvisualeditor)

Check if the visual editor is active (i.e., your site is inside the Directus iframe):

vue

```
<script setup>
const directusVisualEditor = useDirectusVisualEditor()
</script>

<template>
  <div>
    <div v-if="directusVisualEditor" class="editor-banner">
      Editing Mode
    </div>

    <h1>{{ article.title }}</h1>
  </div>
</template>
```

This composable is set automatically by the plugin — you don't need to set it manually.

### Preview Mode [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#preview-mode)

Preview mode (`useDirectusPreview()`) and visual editor mode (`useDirectusVisualEditor()`) are separate concepts:

-   **Preview mode** — Activated via `?preview=true` query parameter. Use this to show draft/unpublished content with a preview token.

-   **Visual editor mode** — Activated automatically when inside a Directus iframe. Enables inline editing.

They can be used together:

vue

```
<script setup>
const directusPreview = useDirectusPreview()
const directusVisualEditor = useDirectusVisualEditor()
</script>

<template>
  <div>
    <!-- Show preview banner when viewing draft content -->
    <div v-if="directusPreview" class="preview-banner">
      Preview Mode
    </div>

    <!-- Editable content - attributes only added inside Directus iframe -->
    <DirectusVisualEditor
      collection="articles"
      :item="article.id"
      fields="title"
    >
      <h1>{{ article.title }}</h1>
    </DirectusVisualEditor>
  </div>
</template>
```

## Complete Example [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#complete-example)

### Blog Post Page [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#blog-post-page)

vue

```
<script setup>
const route = useRoute()
const directus = useDirectus()

const { data: article } = await useAsyncData('article', () =>
  directus.request(readItem('articles', route.params.id, {
    fields: ['*', { author: ['*'] }]
  })))
</script>

<template>
  <article>
    <!-- Featured image -->
    <DirectusVisualEditor
      collection="articles"
      :item="article.id"
      fields="featured_image"
      mode="drawer"
    >
      <img
        v-if="article.featured_image"
        :src="getDirectusFileUrl(article.featured_image, { width: 1200 })"
        :alt="article.title"
      >
    </DirectusVisualEditor>

    <!-- Title -->
    <DirectusVisualEditor
      collection="articles"
      :item="article.id"
      fields="title"
    >
      <h1>{{ article.title }}</h1>
    </DirectusVisualEditor>

    <!-- Author (related collection) -->
    <DirectusVisualEditor
      collection="directus_users"
      :item="article.author.id"
      :fields="['first_name', 'last_name']"
    >
      <p class="author">
        By {{ article.author.first_name }} {{ article.author.last_name }}
      </p>
    </DirectusVisualEditor>

    <!-- Content -->
    <DirectusVisualEditor
      collection="articles"
      :item="article.id"
      fields="content"
    >
      <div class="content" v-html="article.content" />
    </DirectusVisualEditor>
  </article>
</template>
```

### Page with Dynamic Blocks [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#page-with-dynamic-blocks)

vue

```
<script setup>
const route = useRoute()
const directus = useDirectus()

const { data: page } = await useAsyncData('page', () =>
  directus.request(readItem('pages', route.params.id, {
    fields: ['*', { blocks: ['*'] }]
  })))
</script>

<template>
  <div class="page">
    <!-- Page title -->
    <DirectusVisualEditor
      collection="pages"
      :item="page.id"
      fields="title"
    >
      <h1>{{ page.title }}</h1>
    </DirectusVisualEditor>

    <!-- Dynamic blocks -->
    <DirectusVisualEditor
      v-for="block in page.blocks"
      :key="block.id"
      collection="blocks"
      :item="block.id"
      mode="drawer"
    >
      <component :is="getBlockComponent(block.type)" :data="block" />
    </DirectusVisualEditor>
  </div>
</template>
```

## Debug Mode [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#debug-mode)

Add `?debug` to any page URL to enable debug logging for the visual editor:

```
https://yourapp.com/blog/my-post?debug
```

This outputs detailed logs to the browser console:

```
[Directus Plugin] Visual editor config enabled: true
[Directus Plugin] Is in iframe: true
[Directus Visual Editor] Config visualEditor: true
[Directus Visual Editor] Is in iframe: true
[Directus Visual Editor] Directus URL: https://your-directus.com
[Directus Visual Editor] MutationObserver started, waiting for [data-directus] elements
[Directus Visual Editor] MutationObserver: found 12 [data-directus] elements
[Directus Visual Editor] Calling apply()...
[Directus Visual Editor] apply() result: true
```

Debug mode is useful for diagnosing:

-   **CSP issues** — Content-Security-Policy blocking `frame-ancestors` or `postMessage`

-   **URL mismatches** — `directusUrl` in your config not matching the actual Directus admin origin
-   **Iframe detection** — Confirming your site correctly detects the Directus iframe

-   **Element detection** — Verifying `data-directus` attributes are being rendered

## Configuration [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#configuration)

### Disable Visual Editor [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#disable-visual-editor)

typescript

```
// nuxt.config.ts
export default defineNuxtConfig({
  directus: {
    visualEditor: false,
  },
})
```

When disabled, `DirectusVisualEditor` renders as a pass-through wrapper with no `data-directus` attributes, and the visual editor plugin is not loaded.

## Advanced Usage [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#advanced-usage)

### Nested Collections [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#nested-collections)

Edit related items from different collections:

vue

```
<template>
  <article>
    <!-- Edit the article -->
    <DirectusVisualEditor
      collection="articles"
      :item="article.id"
      fields="title"
    >
      <h1>{{ article.title }}</h1>
    </DirectusVisualEditor>

    <!-- Edit the related category -->
    <DirectusVisualEditor
      collection="categories"
      :item="article.category.id"
      fields="name"
    >
      <span class="category">{{ article.category.name }}</span>
    </DirectusVisualEditor>

    <!-- Edit multiple related tags -->
    <div class="tags">
      <DirectusVisualEditor
        v-for="tag in article.tags"
        :key="tag.id"
        collection="tags"
        :item="tag.tags_id.id"
        fields="name"
      >
        <span class="tag">{{ tag.tags_id.name }}</span>
      </DirectusVisualEditor>
    </div>
  </article>
</template>
```

### Conditional Content Based on Editor State [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#conditional-content-based-on-editor-state)

vue

```
<script setup>
const directusVisualEditor = useDirectusVisualEditor()
</script>

<template>
  <div>
    <!-- Show an editor banner only inside Directus -->
    <div v-if="directusVisualEditor" class="editor-banner">
      Editing inside Directus — changes save automatically.
    </div>

    <DirectusVisualEditor
      collection="articles"
      :item="article.id"
      fields="title"
    >
      <h1>{{ article.title }}</h1>
    </DirectusVisualEditor>
  </div>
</template>
```

## Troubleshooting [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#troubleshooting)

### Editor Not Connecting [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#editor-not-connecting)

1.  Check debug output with `?debug` in the URL
2.  Verify `visualEditor: true` in module config (default)
3.  Ensure your Directus URL config matches the actual Directus admin URL origin
4.  Check that CORS is configured correctly on your Directus instance

### `apply() result: false` [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#apply-result-false)

The `apply()` function uses `postMessage` to handshake with the Directus parent frame. If it returns `false`:

1.  **URL mismatch** — The `url` in your nuxt.config must match the exact origin of the Directus admin panel. For example, if your Directus admin is at `https://api.example.com` but your config points to `https://directus.fly.dev`, the handshake will fail
2.  **CORS issues** — Ensure your Directus instance allows your Nuxt app origin
3.  **CSP restrictions** — Check that `Content-Security-Policy` allows `frame-ancestors` from your Directus origin

### CORS Configuration [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#cors-configuration)

The visual editor connects to your Directus instance via `postMessage`. Ensure CORS is configured:

dotenv

```


# Directus .env
CORS_ENABLED=true
CORS_ORIGIN=https://your-nuxt-app.com
CORS_CREDENTIALS=true
```

### Attributes Not Appearing [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#attributes-not-appearing)

If `data-directus` attributes are not being added to elements:

1.  Confirm your site is loaded inside the Directus iframe (check `?debug` output)
2.  Verify `visualEditor: true` in your config
3.  The attributes are only rendered when the visual editor detects an iframe — they are hidden from normal visitors

## API Reference [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#api-reference)

### `DirectusVisualEditor` [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#directusvisualeditor)

A component that wraps editable content with `data-directus` attributes.

**Props:**

typescript

```
interface DirectusVisualEditorProps {
  collection: string // Directus collection name
  item: string | number // Item ID (primary key)
  fields?: string | string[] // Field(s) to edit
  mode?: 'drawer' | 'modal' | 'popover' // Editor display mode
}
```

### `useDirectusVisualEditor()` [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#usedirectusvisualeditor-1)

Returns a ref indicating whether the visual editor is active.

**Returns:** `Ref<boolean>`

typescript

```
const directusVisualEditor = useDirectusVisualEditor()

if (directusVisualEditor.value) {
  // Inside Directus iframe — editing is enabled
}
```

### `useDirectusPreview()` [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#usedirectuspreview)

Returns a ref for controlling preview mode.

**Returns:** `Ref<boolean>`

typescript

```
const directusPreview = useDirectusPreview()

// Enable preview mode
directusPreview.value = true
```

## See Also [​](https://www.nuxt-directus-sdk.com/guide/visual-editor.html#see-also)

-   [Directus Visual Editing Documentation](https://docs.directus.io/guides/headless-cms/live-preview-nuxt.html)

-   [Getting Started](https://www.nuxt-directus-sdk.com/guide/getting-started.html)
-   [Configuration Reference](https://www.nuxt-directus-sdk.com/api/configuration/)

---
Source: [Visual Editor | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/visual-editor.html)

# Type Generation | Nuxt Directus SDK

The module generates TypeScript types from your Directus schema at build time, so your app code is fully typed against real collections and fields.

## Quick Start [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#quick-start)

Type generation is enabled by default. Set `DIRECTUS_ADMIN_TOKEN` in your `.env`:

dotenv

```
DIRECTUS_URL=https://your-directus-instance.com
DIRECTUS_ADMIN_TOKEN=your_admin_token
```

...and the module does the rest:

typescript

```
// nuxt.config.ts — zero config needed
export default defineNuxtConfig({
  modules: ['nuxt-directus-sdk'],
})
```

When you run `nuxi dev` or `nuxi build`, the module fetches your Directus schema and writes a `.d.ts` file into `#build/types/directus.d.ts`. Nuxt picks it up automatically.

No admin token?

Type generation is a dev/build-time operation. You only need an admin token in the environment where you run `nuxi dev` / `nuxi build` / CI, not in production runtime. If you don't set one, type generation is skipped and a minimal fallback shape is used.

## What Gets Generated [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#what-gets-generated)

For a Directus instance with collections `posts`, `pages`, and the standard system collections, you get:

typescript

```
// Interface per collection
interface Post {
  id: number
  title: string
  author: DirectusUser | string
  // ...every field on the collection
}

interface Page {
  id: number
  title: string
  // ...
}

// The schema used by the Directus SDK
interface DirectusSchema {
  posts: Post[]
  pages: Page[]
  directus_users: DirectusUser[]
  // ...every collection
}

// An enum of every collection name, for autocomplete
enum CollectionNames {
  posts = 'posts',
  pages = 'pages',
  directus_users = 'directus_users',
  // ...
}
```

Every `@directus/sdk` call in your app is typed against `DirectusSchema`, so `readItems('posts', ...)` knows the return shape and `readItems('notACollection')` is a type error.

## Type Prefix [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#type-prefix)

If your custom collection names collide with TypeScript globals or other types in your app (for example, you have a `Page` interface elsewhere), add a prefix:

typescript

```
export default defineNuxtConfig({
  directus: {
    types: {
      prefix: 'App', // Prefix custom collection types
    },
  },
})
```

With `prefix: 'App'`, your generated types become:

typescript

```
interface AppPost {
  id: number
  title: string
}

interface AppPage {
  id: number
  title: string
}

interface DirectusSchema {
  posts: AppPost[]
  pages: AppPage[]
}

// Directus system collections are NOT prefixed
interface DirectusUser {
  id: string
  email: string
}
```

**How it works:**

-   Custom collection interface names get prefixed (`Post` becomes `AppPost`)

-   `DirectusSchema` keys stay unchanged (they match the API endpoints)
-   Directus system collections (`DirectusUser`, `DirectusFile`, etc.) are never prefixed

-   All internal type references update to use the prefixed names

## Disabling advanced [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#disabling)

Set `types: false` to skip generation:

typescript

```
export default defineNuxtConfig({
  directus: {
    types: false,
  },
})
```

WARNING

This module creates a minimal fallback shape that covers the SDK's core needs (a `DirectusSchema` stub, `DirectusFile`, `DirectusUser`), so your code compiles. Follow the [Directus Advanced Types Guide](https://directus.io/docs/tutorials/tips-and-tricks/advanced-types-with-the-directus-sdk#custom-fields-on-core-collections) using the interface `DirectusSchema` for direct plug-and-play integration.

## Generating Types Outside a Nuxt Build [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#generating-types-outside-a-nuxt-build)

A standalone CLI lets you generate types on demand, without a running Nuxt instance. Useful for CI, pre-commit hooks, and non-Nuxt consumers.

bash

```
npx nuxt-directus-sdk generate-types --prefix App -o types/directus.d.ts
```

See the [`generate-types` CLI reference](https://www.nuxt-directus-sdk.com/cli/generate-types.html) for every flag and example.

## Filtering Collections advanced [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#filtering-collections)

For most apps you won't need anything below this line. The defaults emit every collection in your Directus schema, which is what you want unless the generated `.d.ts` is getting unwieldy.

If your instance has collections your app never touches (for example, `directus_activity`, `directus_revisions`) and you want to trim the generated types, or you have a large instance and want to limit types to a specific subset, two options let you do that:

-   **`exclude`** — drop specific collections (deny-list).

-   **`include`** — emit only specific collections (allow-list). Takes precedence over `exclude` if both are set (a warning is logged).

### Exclude [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#exclude)

Drop the listed collections:

typescript

```
export default defineNuxtConfig({
  directus: {
    types: {
      prefix: 'App',
      exclude: ['directus_activity', 'directus_revisions'],
    },
  },
})
```

### Include [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#include)

Emit only the listed collections plus anything they reference. References are followed transitively, so you typically only need to list the collections your app code directly interacts with:

typescript

```
export default defineNuxtConfig({
  directus: {
    types: {
      prefix: 'App',
      include: ['posts', 'pages'],
      // expandReferences defaults to true, pulls in directus_users, directus_files, etc.
    },
  },
})
```

Disable expansion with `expandReferences: false` if you want a strict allow-list where references to collections not in the list collapse to `string`:

typescript

```
export default defineNuxtConfig({
  directus: {
    types: {
      prefix: 'App',
      include: ['posts'],
      expandReferences: false, // strict — posts.author becomes string, not DirectusUser | string
    },
  },
})
```

When expansion is on and collections are pulled in, a log line reports the delta:

```
 - Expanded include from 2 → 7 collections (+5 via references)
```

### How Missing References Are Handled [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#how-missing-references-are-handled)

When a field on an emitted collection references a missing collection (not in the include list and not pulled in by expansion, or explicitly excluded), the generator rewrites the reference so the emitted types stay resolvable:

-   **M2O** references (for example `user_created: DirectusUser | string`) collapse to `string`

-   **O2M** references (for example `revisions: DirectusRevision[] | string[]`) collapse to `string[]`
-   **M2A** (polymorphic) references filter out missing collections from the union; if the whole union becomes empty, the field type collapses to `string`

After generation, a summary log line reports how many fields were rewritten and why:

```
 - 14 field references across 3 targets collapsed to string (excluded)
```

### Verbose Logging [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#verbose-logging)

Enable `verbose: true` to see each rewritten target grouped and listed (capped at 5 fields per collection):

typescript

```
export default defineNuxtConfig({
  directus: {
    types: {
      prefix: 'App',
      exclude: ['directus_users'],
      verbose: true,
    },
  },
})
```

Produces:

```
 - 92 field references across 1 target collapsed to string (excluded)
   · directus_users (excluded) — referenced by 92 fields across 45 collections
     posts.user_created, posts.user_updated, pages.user_created, pages.user_updated, blocks.user_created, …and 87 more
```

### When to Use Each [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#when-to-use-each)

-   **`exclude`** is most common. Keeps most of your types, drops a handful of collections you don't care about (`directus_activity`, `directus_revisions`, `directus_sessions`). Smaller `.d.ts`, faster TypeScript compile.

-   **`include`** is for when you have a large Directus instance but your app touches only a narrow subset. More restrictive but produces the smallest possible `.d.ts`.

The same options are available on the CLI. See the [`generate-types` CLI reference](https://www.nuxt-directus-sdk.com/cli/generate-types.html#filtering-collections) for flag-level usage.

## See Also [​](https://www.nuxt-directus-sdk.com/guide/type-generation.html#see-also)

-   [Module options: `types`](https://www.nuxt-directus-sdk.com/api/configuration/module.html#types)

-   [CLI reference: `generate-types`](https://www.nuxt-directus-sdk.com/cli/generate-types.html)

---
Source: [Type Generation | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/type-generation.html)

# Proxy | Nuxt Directus SDK

The module can create a proxy path to Directus at a user defined frontend path (defaults to `/directus`). This eliminates CORS issues, handles cookie forwarding for session auth, and (in dev) proxies WebSocket connections for realtime.

Renamed from `devProxy` in v6.1

The option was originally called `devProxy` because it only worked in development. It now works in production builds too, so the name has been generalised to `proxy`. The old name still works as an alias but logs a deprecation warning. Rename your config at your convenience.

## Default Behaviour [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#default-behaviour)

The proxy is **enabled by default in development** and **disabled in production**. Most users don't need to configure anything.

typescript

```
// nuxt.config.ts, zero config needed
export default defineNuxtConfig({
  modules: ['nuxt-directus-sdk'],
  directus: {
    url: process.env.DIRECTUS_URL,
  },
})
```

Browser requests that would normally go to `https://directus.example.com/items/posts` instead go to `http://localhost:3000/directus/items/posts` and the Nuxt server forwards them.

The proxy automatically picks up Nuxt's port, including dynamic port changes (3000 → 3001 when you already have a server running).

## Configuration [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#configuration)

typescript

```
export default defineNuxtConfig({
  directus: {
    proxy: {
      enabled: true, // default: true in dev, false in prod
      path: '/directus', // HTTP proxy mount path
      wsPath: '/directus-ws', // WebSocket proxy path (for realtime)
    },
  },
})
```

-   **`enabled`** (`boolean`, default: `true` in dev, `false` in prod). Turns the proxy on or off.

-   **`path`** (`string`, default: `/directus`). The URL path prefix the proxy mounts under.
-   **`wsPath`** (`string`, default: `/directus-ws`). Separate path for WebSocket connections. Kept separate from `path` because the HTTP handler can't also terminate a WebSocket upgrade cleanly.

**Shorthand:** pass a boolean to enable/disable with defaults.

typescript

```
export default defineNuxtConfig({
  directus: {
    proxy: true, // same as { enabled: true }
  },
})
```

typescript

```
export default defineNuxtConfig({
  directus: {
    proxy: false, // disable, use the direct URL even in dev
  },
})
```

## Why It Exists [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#why-it-exists)

Three problems it solves:

1.  **CORS.** Your Nuxt dev server is on `http://localhost:3000`. Directus is on `https://directus.example.com`. Without the proxy, every browser request is cross-origin and needs CORS headers configured on Directus. With the proxy, requests are same-origin.
2.  **Cookies.** Session-based authentication relies on httpOnly cookies. Cookies are scoped to the domain that sets them, so a `Set-Cookie` from Directus wouldn't be honoured by a browser fetching from `localhost`. The proxy rewrites the cookie domain so the cookie is accepted.
3.  **WebSockets.** Realtime subscriptions use the WebSocket protocol, which has its own handshake and CORS rules. The `wsPath` proxy handles this with cookie forwarding so auth survives the upgrade.

## Works with Split URLs [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#works-with-split-urls)

If you've set up separate `client` and `server` URLs (for Docker, Kubernetes, or any setup where your Nuxt server reaches Directus via an internal hostname), the proxy forwards to the `server` URL and exposes it under the proxy path to the browser. Same-origin for the browser, internal hostname for the backend, no special handling on your end.

See the [`url` option reference](https://www.nuxt-directus-sdk.com/api/configuration/module.html#url) for split-URL configuration.

## Disabling the Proxy [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#disabling-the-proxy)

If you want browsers to talk to Directus directly even in development (for instance, you've configured CORS on Directus and prefer real URLs in DevTools Network panel), disable the proxy:

typescript

```
export default defineNuxtConfig({
  directus: {
    proxy: false,
  },
})
```

Or disable just the WebSocket proxy by leaving `enabled: true` and setting `wsPath: false` (HTTP proxy on, realtime goes direct).

## Production Behaviour [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#production-behaviour)

In production builds the proxy is off by default and all requests go directly to the `client` URL from the browser. This is what most users want: no extra hop, no Nuxt server involvement on every Directus call. For this to work with session auth, cookie domains have to match, either same apex domain or configured correctly. See the [Authentication guide](https://www.nuxt-directus-sdk.com/guide/authentication.html) for the cross-domain setup.

Sometimes the direct-from-browser route doesn't work. The most common case is hosting Directus on a different domain than your Nuxt app where you can't (or don't want to) deal with cross-domain cookies. Third-party cookie restrictions in modern browsers make this increasingly fragile, especially in staging environments. Turning the proxy on in production (see [Configuration](https://www.nuxt-directus-sdk.com/guide/proxy.html#configuration) above) puts the session cookie back on your own origin.

**Trade-offs to know about:**

-   **Extra hop on every Directus call.** Browser to your Nuxt server to Directus instead of browser to Directus. Negligible for occasional calls like login; can add up on data-heavy pages.

-   **WebSocket proxy is dev-only.** The realtime proxy uses the Nuxt dev-server's upgrade hook, which doesn't exist in production builds. If you turn the HTTP proxy on in production, realtime connects directly to Directus instead, which means realtime is still subject to the original cross-domain cookie problem if you're using `realtimeAuthMode: 'handshake'` or `'strict'`. For `'public'` realtime (no auth), this is fine.
-   **Serverless caveats.** On platforms like Vercel functions or Netlify functions, the HTTP proxy works (regular request/response). WebSocket proxying wouldn't work even if we could enable it; those runtimes don't hold persistent connections.

If you need realtime with auth in production-with-proxy, the cleanest answer is usually to put Directus on a subdomain of your app (`app.example.com` and `directus.example.com`) with `SESSION_COOKIE_DOMAIN=.example.com`, so cookies are shared without proxying.

## Client IP & `IP_TRUST_PROXY` [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#client-ip-ip-trust-proxy)

When the proxy is on, every request reaches Directus from your **Nuxt server's** IP. The connection is Nuxt to Directus, not browser to Directus. The real client IP travels in the `X-Forwarded-For` header, and the proxy sets it to a single, resolved value rather than blindly forwarding whatever the browser sent. This matters only if your Directus instance uses an IP-based feature:

-   Role/policy **IP allow-lists** (`ip_access`)

-   **Per-IP rate limiting** (`RATE_LIMITER_*`)
-   The client IP recorded in the **activity / audit log**

For Directus to read that header it has to trust the proxy, which it controls with `IP_TRUST_PROXY`:

-   **Directus 11 and earlier** defaulted to `IP_TRUST_PROXY=true`; it trusts `X-Forwarded-For` out of the box, so the proxy "just worked".

-   **Directus 12+** changed the default to `false` to harden against IP spoofing ([directus#27607](https://github.com/directus/directus/pull/27607)). With the new default, Directus ignores `X-Forwarded-For`, so every proxied request looks like it came from your Nuxt server.

If you run the proxy **and** rely on client IPs on Directus 12+, set it to trust exactly one hop, the SDK proxy:

bash

```


# Directus .env
IP_TRUST_PROXY=1
```

Prefer the hop count (`1`) over a blanket `true`. The SDK proxy already strips the attacker-controllable inbound header and forwards a single clean entry, so trusting one hop gives you the real client IP without re-opening the spoofing hole that `true` is prone to. If you stack another proxy in front of your Nuxt app (e.g. Cloudflare to Nuxt to Directus), increase the count to match.

Resolution is only as trustworthy as your edge

The proxy resolves the client IP from the request reaching your Nuxt server. If Nuxt is exposed directly to the internet with no trusted edge in front of it, that value can itself be spoofed. Configure your platform / Nitro trust settings so the incoming IP is trustworthy before relying on it downstream.

## Migration from `devProxy` [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#migration-from-devproxy)

From v6.1 the option was renamed from `devProxy` to `proxy` to reflect that it works in production too. The old name still works as an alias:

ts

```
// Old (deprecated, still works with a warning)
directus: {
  devProxy: { enabled: true },
}

// New (preferred)
directus: {
  proxy: { enabled: true },
}
```

If both `proxy` and `devProxy` are set, `proxy` wins and `devProxy` is ignored. The runtime config is published under the `proxy` key only, so the deprecated name doesn't leak into your app's runtime.

## See Also [​](https://www.nuxt-directus-sdk.com/guide/proxy.html#see-also)

-   [Module option: `proxy`](https://www.nuxt-directus-sdk.com/api/configuration/module.html#proxy)

-   [Module option: `url`](https://www.nuxt-directus-sdk.com/api/configuration/module.html#url)
-   [Authentication guide: cross-domain setups](https://www.nuxt-directus-sdk.com/guide/authentication.html)

---
Source: [Proxy | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/proxy.html)

# Server-Side Utilities | Nuxt Directus SDK

## Server-Side Utilities [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#server-side-utilities)

nuxt-directus-sdk provides server-side utilities for authenticating Directus requests in Nuxt server routes. These utilities automatically handle session tokens and admin authentication.

## Overview [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#overview)

The module provides several server utilities:

-   **`useSessionDirectus(event)`** - Authenticated requests using user session

-   **`useAdminDirectus()`** - Admin requests using admin token
-   **`useTokenDirectus(token)`** - Custom token authentication

-   **`getDirectusSessionToken(event)`** - Manual token extraction

## User Authentication [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#user-authentication)

### `useSessionDirectus(event)` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#usesessiondirectus-event)

Use the current user's session token for authenticated requests:

typescript

```
// server/api/profile.ts
export default defineEventHandler(async (event) => {
  const directus = useSessionDirectus(event)

  // This request uses the user's session token
  const user = await directus.request(readMe())

  return { user }
})
```

This automatically:

1.  Extracts the session token from cookies
2.  Attaches it to Directus requests
3.  Maintains the user's authentication context

### Complete Example [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#complete-example)

typescript

```
// server/api/my-articles.ts
export default defineEventHandler(async (event) => {
  const directus = useSessionDirectus(event)

  try {
    // Get current user
    const user = await directus.request(readMe())

    // Fetch user's articles
    const articles = await directus.request(readItems('articles', {
      filter: {
        author: { _eq: user.id }
      },
      sort: ['-date_created'],
      limit: 10,
    }))

    return {
      user,
      articles,
    }
  }
  catch (error) {
    throw createError({
      status: 401,
      statusText: 'Unauthorized - Please log in',
    })
  }
})
```

## Admin Authentication [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#admin-authentication)

### `useAdminDirectus()` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#useadmindirectus)

Use the admin token for privileged operations:

typescript

```
// server/api/admin/users.ts
export default defineEventHandler(async () => {
  const directus = useAdminDirectus()

  // Admin-level access to all users
  const users = await directus.request(readUsers({
    fields: ['id', 'email', 'first_name', 'last_name', 'role'],
  }))

  return { users }
})
```

Requirements:

-   `DIRECTUS_ADMIN_TOKEN` must be set in `.env`

-   Should only be used for server-side operations
-   Never expose admin token to client

### Admin Operations [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#admin-operations)

typescript

```
// server/api/admin/create-user.ts

export default defineEventHandler(async (event) => {
  const directus = useAdminDirectus()
  const body = await readBody(event)

  // Create user with admin privileges
  const user = await directus.request(createUser({
    email: body.email,
    password: body.password,
    role: body.role,
  }))

  return { user }
})
```

## Custom Token Authentication [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#custom-token-authentication)

### `useTokenDirectus(token?)` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#usetokendirectus-token)

Use a custom token for authentication:

typescript

```
// server/api/custom-auth.ts
export default defineEventHandler(async (event) => {
  // Get token from header
  const token = getHeader(event, 'Authorization')?.replace('Bearer ', '')

  if (!token) {
    throw createError({
      status: 401,
      statusText: 'No token provided',
    })
  }

  const directus = useTokenDirectus(token)

  const user = await directus.request(readMe())

  return { user }
})
```

### API Key Authentication [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#api-key-authentication)

typescript

```
// server/api/webhook.ts
export default defineEventHandler(async (event) => {
  const apiKey = getHeader(event, 'X-API-Key')

  // Validate API key and get associated token
  const token = await validateApiKey(apiKey)

  const directus = useTokenDirectus(token)

  // Make authenticated request
  const items = await directus.request(readItems('posts'))

  return { items }
})
```

## Manual Token Extraction [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#manual-token-extraction)

### `getDirectusSessionToken(event)` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#getdirectussessiontoken-event)

Extract the session token manually:

typescript

```
// server/api/check-auth.ts
export default defineEventHandler((event) => {
  const token = getDirectusSessionToken(event)

  return {
    authenticated: !!token,
    token: token ? '***' : null, // Don't expose actual token
  }
})
```

Use case: Custom authentication logic

typescript

```
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const publicPaths = ['/api/public']

  if (publicPaths.some(path => event.path.startsWith(path))) {
    return
  }

  const token = getDirectusSessionToken(event)

  if (!token) {
    throw createError({
      status: 401,
      statusText: 'Authentication required',
    })
  }
})
```

## Advanced Examples [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#advanced-examples)

### Protected API Route [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#protected-api-route)

typescript

```
// server/api/protected/data.ts

export default defineEventHandler(async (event) => {
  // Verify user is authenticated
  const token = getDirectusSessionToken(event)
  if (!token) {
    throw createError({
      status: 401,
      statusText: 'Unauthorized',
    })
  }

  const directus = useSessionDirectus(event)

  // Get user data
  const user = await directus.request(readMe())

  // Check user role
  if (user.role.name !== 'Admin') {
    throw createError({
      status: 403,
      statusText: 'Forbidden - Admin access required',
    })
  }

  // Fetch sensitive data
  const data = await directus.request(readItems('sensitive_data'))

  return { data }
})
```

### Hybrid Authentication [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#hybrid-authentication)

Combine user and admin authentication:

typescript

```
// server/api/analytics.ts

export default defineEventHandler(async (event) => {
  // Try user authentication first
  const userToken = getDirectusSessionToken(event)

  let directus
  let scope = 'public'

  if (userToken) {
    directus = useSessionDirectus(event)
    const user = await directus.request(readMe())

    // Admins get full data
    if (user.role.name === 'Admin') {
      directus = useAdminDirectus()
      scope = 'admin'
    }
    else {
      scope = 'user'
    }
  }
  else {
    // Public users get limited data
    directus = useAdminDirectus() // Still need read access
    scope = 'public'
  }

  // Fetch data based on scope
  const filter = scope === 'public'
    ? { status: { _eq: 'published' } }
    : {}

  const analytics = await directus.request(readItems('analytics', {
    filter,
    limit: scope === 'admin' ? -1 : 10,
  }))

  return { scope, analytics }
})
```

### Batch Operations [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#batch-operations)

typescript

```
// server/api/batch/import.ts

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const directus = useAdminDirectus()

  // Batch create items
  const results = await directus.request(createItems('items', body.items))

  return {
    success: true,
    count: results.length,
    items: results,
  }
})
```

### File Upload Handler [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#file-upload-handler)

typescript

```
// server/api/upload.ts
export default defineEventHandler(async (event) => {
  const directus = useSessionDirectus(event)

  // Read multipart form data
  const files = await readFiles(event)

  if (!files || files.length === 0) {
    throw createError({
      status: 400,
      statusText: 'No files provided',
    })
  }

  const formData = new FormData()

  files.forEach((file) => {
    formData.append('file', file)
  })

  // Upload to Directus
  const uploaded = await directus.request(uploadFiles(formData))

  return { uploaded }
})
```

### Scheduled Task [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#scheduled-task)

typescript

```
// server/tasks/sync.ts

export default defineTask({
  meta: {
    name: 'sync:data',
    description: 'Sync data with external API',
  },
  async run() {
    const directus = useAdminDirectus()

    // Fetch items to sync
    const items = await directus.request(readItems('sync_queue', {
      filter: { status: { _eq: 'pending' } },
      limit: 100,
    }))

    for (const item of items) {
      try {
        // Sync with external API
        await syncToExternalAPI(item)

        // Update status
        await directus.request(updateItem('sync_queue', item.id, {
          status: 'completed',
          synced_at: new Date(),
        }))
      }
      catch (error) {
        console.error(`Failed to sync item ${item.id}:`, error)
      }
    }

    return { synced: items.length }
  },
})
```

### Database Query Helper [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#database-query-helper)

typescript

```
// server/utils/db.ts
import type { Query } from '@directus/sdk'

export async function fetchWithAuth<T>(
  event: H3Event,
  collection: string,
  query?: Query<DirectusSchema, any>
) {
  const directus = useSessionDirectus(event)
  return directus.request(readItems(collection, query))
}

// Usage in route
// server/api/posts.ts
export default defineEventHandler(async (event) => {
  const posts = await fetchWithAuth(event, 'posts', {
    sort: ['-date_created'],
    limit: 20,
  })

  return { posts }
})
```

### Role-Based Access Control [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#role-based-access-control)

typescript

```
// server/utils/auth.ts
export async function requireRole(event: H3Event, requiredRole: string) {
  const directus = useSessionDirectus(event)

  const user = await directus.request(readMe({
    fields: ['id', 'email', 'role.*'],
  }))

  if (user.role.name !== requiredRole) {
    throw createError({
      status: 403,
      statusText: `Access denied - ${requiredRole} role required`,
    })
  }

  return user
}

// Usage
// server/api/admin/settings.ts
export default defineEventHandler(async (event) => {
  await requireRole(event, 'Admin')

  const directus = useAdminDirectus()
  const settings = await directus.request(readSingleton('settings'))

  return { settings }
})
```

## Configuration [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#configuration)

### Admin Token Setup [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#admin-token-setup)

Set your admin token in `.env`:

dotenv

```
DIRECTUS_ADMIN_TOKEN=your_admin_token_here
```

Get your admin token from Directus:

1.  Go to Directus Admin → User Menu → Account
2.  Copy your token under "Admin Access Token"

### Security Best Practices [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#security-best-practices)

1.  **Never expose admin token to client**
    
    typescript
    
    ```
    // ❌ DON'T
    export default defineEventHandler(() => {
      return { adminToken: process.env.DIRECTUS_ADMIN_TOKEN }
    })
    
    // ✅ DO
    export default defineEventHandler(() => {
      const directus = useAdminDirectus()
      // Use admin token internally only
    })
    ```
    
2.  **Always validate user input**
    
    typescript
    
    ```
    export default defineEventHandler(async (event) => {
      const body = await readBody(event)
    
      // Validate input
      if (!body.email || !isValidEmail(body.email)) {
        throw createError({ status: 400, statusText: 'Invalid email' })
      }
    
      const directus = useSessionDirectus(event)
      // Proceed with validated data
    })
    ```
    
3.  **Use appropriate authentication level**
    
    typescript
    
    ```
    // User operations - use user session
    const directus = useSessionDirectus(event)
    
    // Admin operations - use admin token
    const directus = useAdminDirectus()
    ```
    

## API Reference [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#api-reference)

### `useSessionDirectus(event)` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#usesessiondirectus-event-1)

Create a Directus client authenticated with the user's session token.

**Parameters:**

-   `event: H3Event` - The Nuxt server event

**Returns:** `DirectusClient` - Authenticated Directus client

**Example:**

typescript

```
const directus = useSessionDirectus(event)
const user = await directus.request(readMe())
```

### `useAdminDirectus()` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#useadmindirectus-1)

Create a Directus client authenticated with the admin token.

**Returns:** `DirectusClient` - Admin-authenticated Directus client

**Throws:** Error if `DIRECTUS_ADMIN_TOKEN` is not set

**Example:**

typescript

```
const directus = useAdminDirectus()
const users = await directus.request(readUsers())
```

### `useTokenDirectus(token?)` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#usetokendirectus-token-1)

Create a Directus client with a custom token.

**Parameters:**

-   `token?: string` - Optional authentication token

**Returns:** `DirectusClient` - Token-authenticated Directus client

**Example:**

typescript

```
const directus = useTokenDirectus('custom-token')
const items = await directus.request(readItems('items'))
```

### `getDirectusSessionToken(event)` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#getdirectussessiontoken-event-1)

Extract the session token from cookies.

**Parameters:**

-   `event: H3Event` - The Nuxt server event

**Returns:** `string | undefined` - The session token if present

**Example:**

typescript

```
const token = getDirectusSessionToken(event)
if (token) {
  console.log('User is authenticated')
}
```

### `useDirectusUrl(path?)` [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#usedirectusurl-path)

Get the full Directus URL for a given path. On the server, this prefers the `serverDirectusUrl` if configured (for Docker/K8s internal networking), falling back to the client URL.

**Parameters:**

-   `path?: string` - Optional path to append

**Returns:** `string` - Full Directus URL

**Example:**

typescript

```
const assetsUrl = useDirectusUrl('assets')
// With simple URL: https://your-directus.com/assets
// With split URL: http://directus:8055/assets (uses internal server URL)
```

## Troubleshooting [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#troubleshooting)

### Token Not Found [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#token-not-found)

If `getDirectusSessionToken()` returns `undefined`:

1.  Check that user is logged in on the frontend
2.  Verify cookies are being sent with requests
3.  Check cookie name is `directus_session_token`
4.  Ensure `credentials: 'include'` is set in module config

### Admin Token Errors [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#admin-token-errors)

If you get "DIRECTUS\_ADMIN\_TOKEN is not set":

1.  Add `DIRECTUS_ADMIN_TOKEN` to your `.env` file
2.  Restart your development server
3.  Verify the token is valid in Directus

### Permission Errors [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#permission-errors)

If you get permission errors:

1.  Verify the user/token has appropriate permissions in Directus
2.  Check collection access settings in Directus
3.  Use `useAdminDirectus()` for privileged operations

## See Also [​](https://www.nuxt-directus-sdk.com/guide/server-side.html#see-also)

-   [Authentication Guide](https://www.nuxt-directus-sdk.com/guide/authentication.html)

-   [Getting Started](https://www.nuxt-directus-sdk.com/guide/getting-started.html)
-   [Configuration Reference](https://www.nuxt-directus-sdk.com/api/configuration/)

-   [Directus Server-Side Documentation](https://docs.directus.io/)

---
Source: [Side Utilities | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/server-side.html)

# Rules DSL | Nuxt Directus SDK

## Rules DSL [​](https://www.nuxt-directus-sdk.com/guide/rules.html#rules-dsl)

The Rules DSL lets you define Directus roles, policies, and permissions as code. Instead of configuring access control through the Directus UI and hoping it stays in sync, you define it in TypeScript, test it, and push it to any Directus instance.

## Quick Start [​](https://www.nuxt-directus-sdk.com/guide/rules.html#quick-start)

typescript

```
import { defineDirectusRules } from 'nuxt-directus-sdk/rules'

const rules = defineDirectusRules <DirectusSchema> ({
  roles: [
    {
      name: 'Editor',
      policies: [
        {
          name: 'Content Management',
          permissions: {
            posts: {
              create: { fields: ['title', 'content'], presets: { status: 'draft' } },
              read: true,
              update: {
                fields: ['title', 'content', 'status'],
                filter: { author: { _eq: '$CURRENT_USER' } },
              },
              delete: { filter: { status: { _eq: 'draft' } } },
            },
            categories: { read: true },
          },
        },
      ],
    },
    {
      name: 'Admin',
      policies: [{ name: 'Full Access', adminAccess: true, permissions: {} }],
    },
  ],
})
```

## Permission Shorthand [​](https://www.nuxt-directus-sdk.com/guide/rules.html#permission-shorthand)

Each collection action accepts several formats:

| Value | Meaning |
| --- | --- |
| `true` | Full access to all fields |
| `false` | Deny access |
| `'*'` | Same as `true` |
| `{ fields, filter, presets, validation }` | Conditional access |

typescript

```
const permissions = {
  // Full read access
  posts: { read: true },

  // Specific fields only
  users: { read: { fields: ['name', 'email', 'avatar'] } },

  // Filtered access
  comments: {
    read: { filter: { status: { _eq: 'published' } } },
    update: {
      fields: ['content'],
      filter: { author: { _eq: '$CURRENT_USER' } },
    },
  },

  // Presets applied on create
  articles: {
    create: {
      fields: ['title', 'body'],
      presets: { status: 'draft', author: '$CURRENT_USER' },
    },
  },
}
```

## Admin Policies [​](https://www.nuxt-directus-sdk.com/guide/rules.html#admin-policies)

For full admin access, use the `adminAccess` flag or the helper:

typescript

```
import { createAdminPolicy } from 'nuxt-directus-sdk/rules'

// Inline
const rules = defineDirectusRules<DirectusSchema>({
  roles: [
    {
      name: 'Admin',
      policies: [{ name: 'Full Access', adminAccess: true, permissions: {} }],
    },
  ],
})

// Or with the helper
const rules = defineDirectusRules<DirectusSchema>({
  roles: [
    {
      name: 'Admin',
      policies: [createAdminPolicy('Full Access')],
    },
  ],
})
```

## Extending Rules [​](https://www.nuxt-directus-sdk.com/guide/rules.html#extending-rules)

Load existing rules from a Directus instance (or JSON file) and extend them with local additions:

typescript

```
import {
  createAdminPolicy,
  extendRules,
  loadRulesFromPayload,
} from 'nuxt-directus-sdk/rules'

// Load remote rules (e.g. pulled from Directus)
const payload = JSON.parse(readFileSync('rules.json', 'utf-8'))
const remoteRules = loadRulesFromPayload <DirectusSchema> (payload)

// Add local roles and policies
const rules = extendRules(remoteRules, {
  policies: [
    {
      name: 'Blog Editor',
      permissions: {
        blogs: { read: true, create: true, update: true },
      },
    },
  ],
  roles: [
    {
      name: 'Editor',
      policies: [
        {
          name: 'Content Management',
          permissions: {
            blogs: { read: true, create: true, update: true },
            case_studies: { read: true },
          },
        },
      ],
    },
    {
      name: 'Admin',
      policies: [createAdminPolicy('Full Access')],
    },
  ],
})
```

You can also merge multiple rule sets:

typescript

```
import { mergeRules } from 'nuxt-directus-sdk/rules'

const combined = mergeRules(baseRules, teamARules, teamBRules)
```

## Validation [​](https://www.nuxt-directus-sdk.com/guide/rules.html#validation)

Attach validation rules to permissions using Directus filter syntax or standard schema libraries (Zod, Valibot, Arktype):

typescript

```
import { allOf, field, pattern, required } from 'nuxt-directus-sdk/rules'

const rules = defineDirectusRules <DirectusSchema> ({
  roles: [
    {
      name: 'Editor',
      policies: [
        {
          name: 'Posts',
          permissions: {
            posts: {
              create: {
                fields: ['title', 'content', 'slug'],
                validation: allOf(
                  required('title'),
                  required('content'),
                  pattern('slug', '^[a-z0-9-]+$'),
                ),
              },
            },
          },
        },
      ],
    },
  ],
})
```

### Standard Schema Support [​](https://www.nuxt-directus-sdk.com/guide/rules.html#standard-schema-support)

You can use Zod, Valibot, or Arktype schemas directly:

typescript

```
import { z } from 'zod'

const rules = defineDirectusRules <DirectusSchema> ({
  roles: [
    {
      name: 'Editor',
      policies: [
        {
          name: 'Posts',
          permissions: {
            posts: {
              create: {
                fields: ['title', 'content'],
                validation: z.object({
                  title: z.string().min(1).max(200),
                  content: z.string().min(10),
                }),
              },
            },
          },
        },
      ],
    },
  ],
})
```

## Loading Rules [​](https://www.nuxt-directus-sdk.com/guide/rules.html#loading-rules)

Rules can be loaded from several sources:

typescript

```
import {
  loadRulesFromJson,
  loadRulesFromJsonFile,
  loadRulesFromPayload,
  loadRulesFromPayloadFile,
} from 'nuxt-directus-sdk/rules'

// From a JSON string or object
const rules = loadRulesFromJson<DirectusSchema>(jsonString)

// From a JSON file
const rules = loadRulesFromJsonFile<DirectusSchema>('rules.json')

// From a Directus API payload object
const rules = loadRulesFromPayload<DirectusSchema>(payload)

// From a Directus API payload file
const rules = loadRulesFromPayloadFile<DirectusSchema>('payload.json')
```

## Serialization [​](https://www.nuxt-directus-sdk.com/guide/rules.html#serialization)

Convert rules back to formats Directus understands:

typescript

```
import { serializeToDirectusApi, serializeToJson } from 'nuxt-directus-sdk/rules'

// To Directus API format (roles, policies, permissions arrays)
const payload = serializeToDirectusApi(rules)

// To a normalized JSON string
const json = serializeToJson(rules, true) // true = pretty-print
```

---
Source: [Rules DSL | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/rules.html)

# Testing Rules | Nuxt Directus SDK

The rules framework includes a full testing API for verifying permissions in your test suite. Define your access control in code, then write tests to ensure it works as expected before pushing to Directus.

## Creating a Tester [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#creating-a-tester)

typescript

```
import { createRulesTester, defineDirectusRules } from 'nuxt-directus-sdk/rules'

const rules = defineDirectusRules <DirectusSchema> ({
  roles: [
    {
      name: 'Admin',
      policies: [{ name: 'Full Access', adminAccess: true, permissions: {} }],
    },
    {
      name: 'Editor',
      policies: [
        {
          name: 'Content Management',
          permissions: {
            posts: {
              create: { fields: ['title', 'content'] },
              read: true,
              update: {
                fields: ['title', 'content', 'status'],
                filter: { author: { _eq: '$CURRENT_USER' } },
              },
              delete: {
                filter: {
                  _and: [
                    { author: { _eq: '$CURRENT_USER' } },
                    { status: { _eq: 'draft' } },
                  ],
                },
              },
            },
            categories: { read: true },
          },
        },
      ],
    },
    {
      name: 'Viewer',
      policies: [
        {
          name: 'Read Only',
          permissions: {
            posts: {
              read: {
                fields: ['id', 'title', 'status'],
                filter: { status: { _eq: 'published' } },
              },
            },
          },
        },
      ],
    },
  ],
})

const tester = createRulesTester(rules)
```

## Checking Permissions [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#checking-permissions)

Use `can()` to check if a role or policy allows an action:

typescript

```
import { describe, expect, it } from 'vitest'

describe('Editor permissions', () => {
  it('can read and create posts', () => {
    expect(tester.can('Editor', 'read', 'posts').allowed).toBe(true)
    expect(tester.can('Editor', 'create', 'posts').allowed).toBe(true)
  })

  it('cannot delete users', () => {
    expect(tester.can('Editor', 'delete', 'users').allowed).toBe(false)
  })

  it('returns filter details for conditional access', () => {
    const result = tester.can('Editor', 'update', 'posts')
    expect(result.allowed).toBe(true)
    expect(result.permission?.filter).toEqual({
      author: { _eq: '$CURRENT_USER' },
    })
  })
})

describe('Admin permissions', () => {
  it('has admin access to everything', () => {
    const result = tester.can('Admin', 'delete', 'users')
    expect(result.allowed).toBe(true)
    expect(result.reason).toBe('Admin access granted')
  })
})
```

You can also look up by policy name instead of role name:

typescript

```
expect(tester.can('Content Management', 'read', 'posts').allowed).toBe(true)
```

## Filter Matching [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#filter-matching)

Test whether a specific item would pass the permission filter:

typescript

```
describe('Editor filter matching', () => {
  it('can update own posts', () => {
    const post = { id: 1, title: 'My Post', content: '...', status: 'draft', author: 'user-123' }

    const matches = tester.itemMatchesFilter('Editor', 'update', 'posts', post, {
      currentUser: 'user-123',
    })

    expect(matches).toBe(true)
  })

  it('cannot update other users posts', () => {
    const post = { id: 2, title: 'Their Post', content: '...', status: 'draft', author: 'user-456' }

    const matches = tester.itemMatchesFilter('Editor', 'update', 'posts', post, {
      currentUser: 'user-123',
    })

    expect(matches).toBe(false)
  })

  it('can only delete own drafts', () => {
    const draft = { id: 1, title: 'Draft', content: '...', status: 'draft', author: 'user-123' }
    const published = { id: 2, title: 'Live', content: '...', status: 'published', author: 'user-123' }

    expect(tester.itemMatchesFilter('Editor', 'delete', 'posts', draft, {
      currentUser: 'user-123',
    })).toBe(true)

    expect(tester.itemMatchesFilter('Editor', 'delete', 'posts', published, {
      currentUser: 'user-123',
    })).toBe(false)
  })
})
```

The `context` parameter supports these dynamic variables:

| Variable | Context Key |
| --- | --- |
| `$CURRENT_USER` | `currentUser` |
| `$CURRENT_ROLE` | `currentRole` |
| `$CURRENT_ROLES` | `currentRoles` |
| `$NOW` | Current timestamp |

## Field-Level Access [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#field-level-access)

Check which fields a role can access:

typescript

```
describe('field access', () => {
  it('Editor can create with specific fields', () => {
    const fields = tester.getAccessibleFields('Editor', 'create', 'posts')
    expect(fields).toEqual(['title', 'content'])
  })

  it('Editor can read all fields', () => {
    const fields = tester.getAccessibleFields('Editor', 'read', 'posts')
    expect(fields).toBe('*')
  })

  it('Viewer can only read subset of fields', () => {
    const fields = tester.getAccessibleFields('Viewer', 'read', 'posts')
    expect(fields).toEqual(['id', 'title', 'status'])
  })

  it('check individual field access', () => {
    expect(tester.canAccessField('Editor', 'create', 'posts', 'title')).toBe(true)
    expect(tester.canAccessField('Editor', 'create', 'posts', 'status')).toBe(false)
  })
})
```

## Presets [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#presets)

Test default values applied when creating items:

typescript

```
const rules = defineDirectusRules <DirectusSchema> ({
  roles: [
    {
      name: 'Editor',
      policies: [
        {
          name: 'Posts',
          permissions: {
            posts: {
              create: {
                fields: ['title', 'content'],
                presets: { status: 'draft' },
              },
            },
          },
        },
      ],
    },
  ],
})

const tester = createRulesTester(rules)

it('applies draft status preset on create', () => {
  const presets = tester.getPresets('Editor', 'create', 'posts')
  expect(presets).toEqual({ status: 'draft' })
})

it('returns null when no presets configured', () => {
  expect(tester.getPresets('Editor', 'read', 'posts')).toBeNull()
})
```

## Validation Testing [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#validation-testing)

Test validation rules against item data:

typescript

```
import { allOf, pattern, required } from 'nuxt-directus-sdk/rules'

const rules = defineDirectusRules <DirectusSchema> ({
  roles: [
    {
      name: 'Editor',
      policies: [
        {
          name: 'Posts',
          permissions: {
            posts: {
              create: {
                fields: ['title', 'slug'],
                validation: allOf(
                  required('title'),
                  pattern('slug', '^[a-z0-9-]+$'),
                ),
              },
            },
          },
        },
      ],
    },
  ],
})

const tester = createRulesTester(rules)

it('passes with valid data', async () => {
  const result = await tester.validateItem('Editor', 'create', 'posts', {
    title: 'My Post',
    slug: 'my-post',
  })
  expect(result.valid).toBe(true)
})

it('fails when title is missing', async () => {
  const result = await tester.validateItem('Editor', 'create', 'posts', {
    slug: 'my-post',
  })
  expect(result.valid).toBe(false)
  expect(result.issues[0].field).toBe('title')
})

it('fails with invalid slug', async () => {
  const result = await tester.validateItem('Editor', 'create', 'posts', {
    title: 'My Post',
    slug: 'Invalid Slug!',
  })
  expect(result.valid).toBe(false)
  expect(result.issues[0].field).toBe('slug')
})
```

## Custom Vitest Matchers [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#custom-vitest-matchers)

For a more expressive test API, use the custom matchers:

typescript

```
import { createRulesMatchers, createRulesTester } from 'nuxt-directus-sdk/rules'

const tester = createRulesTester(rules)
const matchers = createRulesMatchers(tester)

expect.extend(matchers)
```

Add the type declarations to your `vitest.d.ts`:

typescript

```
import type { RulesMatcherExtensions } from 'nuxt-directus-sdk/rules'
import 'vitest'

declare module 'vitest' {
  interface Assertion<T> extends RulesMatcherExtensions<T> {}
  interface AsymmetricMatchersContaining extends RulesMatcherExtensions<unknown> {}
}
```

Then use them in tests:

typescript

```
expect('Editor').toAllowAction('read', 'posts')
expect('Editor').toRestrictAction('delete', 'users')
expect('Editor').toAllowFields('create', 'posts', ['title', 'content'])
expect('Editor').toRestrictFields('create', 'posts', ['status', 'author'])
expect('Admin').toHaveAdminAccess()
```

## Testing with Remote Rules [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#testing-with-remote-rules)

A common pattern is loading rules from Directus, extending them, and testing the result:

typescript

```
import { readFileSync } from 'node:fs'
import {
  createAdminPolicy,
  createRulesTester,
  extendRules,
  loadRulesFromPayload,
} from 'nuxt-directus-sdk/rules'

// Load rules exported from Directus (via rules:pull CLI)
const payload = JSON.parse(readFileSync('rules.json', 'utf-8'))
const remoteRules = loadRulesFromPayload <DirectusSchema> (payload)

// Extend with your local additions
const rules = extendRules(remoteRules, {
  roles: [
    {
      name: 'Editor',
      policies: [
        {
          name: 'Content Management',
          permissions: {
            blogs: { read: true, create: true, update: true },
          },
        },
      ],
    },
    {
      name: 'Admin',
      policies: [createAdminPolicy('Full Access')],
    },
  ],
})

const tester = createRulesTester(rules)

describe('remote rules', () => {
  it('public policy allows reading blogs', () => {
    expect(tester.can('$t:public_label', 'read', 'blogs').allowed).toBe(true)
  })
})

describe('local additions', () => {
  it('editor can manage blogs', () => {
    expect(tester.can('Editor', 'read', 'blogs').allowed).toBe(true)
    expect(tester.can('Editor', 'create', 'blogs').allowed).toBe(true)
  })

  it('admin has full access', () => {
    expect(tester.can('Admin', 'delete', 'blogs').allowed).toBe(true)
    expect(tester.can('Admin', 'read', 'blogs').reason).toBe('Admin access granted')
  })
})
```

## API Reference [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#api-reference)

### `createRulesTester(rules)` [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#createrulestester-rules)

Creates a tester instance with the following methods:

| Method | Returns | Description |
| --- | --- | --- |
| `can(roleOrPolicy, action, collection)` | `PermissionTestResult` | Check if an action is allowed |
| `itemMatchesFilter(roleOrPolicy, action, collection, item, context?)` | `boolean` | Test item against permission filter |
| `getAccessibleFields(roleOrPolicy, action, collection)` | `string[] | '*'` | Get allowed fields |
| `canAccessField(roleOrPolicy, action, collection, field)` | `boolean` | Check single field access |
| `getPresets(roleOrPolicy, action, collection)` | `object | null` | Get default values |
| `validateItem(roleOrPolicy, action, collection, item)` | `Promise<ValidationTestResult>` | Validate item data |
| `getRules()` | `RulesConfig` | Get the underlying rules |

### `PermissionTestResult` [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#permissiontestresult)

typescript

```
interface PermissionTestResult {
  allowed: boolean
  permission?: PermissionConfig // Present when conditionally allowed
  reason?: string // Human-readable explanation
}
```

### `ValidationTestResult` [​](https://www.nuxt-directus-sdk.com/guide/rules-testing.html#validationtestresult)

typescript

```
interface ValidationTestResult {
  valid: boolean
  issues: Array<{
    field: string // Field that failed, or '*' for general errors
    message: string // Human-readable error
  }>
}
```

---
Source: [Testing Rules | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/rules-testing.html)

# Rules Sync | Nuxt Directus SDK

Sync your locally-defined rules with remote Directus instances. Pull existing rules, compare differences, and push changes -- from code or the CLI.

## CLI [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#cli)

The CLI is the quickest way to manage rules sync. What follows is a workflow walkthrough; see the [`rules:*` CLI reference](https://www.nuxt-directus-sdk.com/cli/rules.html) for the full flag list on each command.

### Pull Rules [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#pull-rules)

Download the current rules from Directus to a JSON file:

bash

```


# Uses DIRECTUS_URL and DIRECTUS_ADMIN_TOKEN from .env
npx nuxt-directus-sdk rules:pull

# Or specify connection explicitly
npx nuxt-directus-sdk rules:pull --source-url https://directus.example.com --source-token my-token

# Custom output file
npx nuxt-directus-sdk rules:pull -o staging-rules.json
```

### Diff Rules [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#diff-rules)

Compare a local rules file with a remote Directus instance:

bash

```
npx nuxt-directus-sdk rules:diff rules.json
```

Compare two local files:

bash

```
npx nuxt-directus-sdk rules:diff-files staging.json production.json
```

Compare two remote instances:

bash

```
npx nuxt-directus-sdk rules:diff-remote \
  --source-url https://staging.example.com --source-token staging-token \
  --target-url https://production.example.com --target-token production-token
```

The diff output shows added (+), modified (~), and removed (-) items. The command exits with code 1 if there are differences, making it useful in CI pipelines.

### Push Rules [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#push-rules)

Push local rules to a remote Directus instance:

bash

```


# Preview what would change (recommended first step)
npx nuxt-directus-sdk rules:push rules.json --dry-run

# Apply changes
npx nuxt-directus-sdk rules:push rules.json

# Only add new items, don't modify or delete existing ones
npx nuxt-directus-sdk rules:push rules.json --add-only

# Add and update, but don't delete items missing locally
npx nuxt-directus-sdk rules:push rules.json --skip-deletes
```

### Environment Variables [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#environment-variables)

Instead of passing flags every time, set these in your `.env`:

bash

```
DIRECTUS_URL=https://directus.example.com
DIRECTUS_ADMIN_TOKEN=your-admin-token
```

## Programmatic API [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#programmatic-api)

All CLI operations are available as functions.

### Fetching Remote Rules [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#fetching-remote-rules)

typescript

```
import { createDirectus, rest, staticToken } from '@directus/sdk'
import { fetchRemoteRules, pullRules } from 'nuxt-directus-sdk/rules'

const client = createDirectus('https://directus.example.com')
  .with(staticToken('your-token'))
  .with(rest())

// Get raw payload (roles, policies, permissions arrays)
const payload = await fetchRemoteRules(client)

// Or get as RulesConfig, ready for testing/extending
const rules = await pullRules(client)
```

### Diffing [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#diffing)

typescript

```
import {
  compareRulesPayloads,
  diffRemoteRules,
  diffRules,
  formatDiff,
  serializeToDirectusApi,
} from 'nuxt-directus-sdk/rules'

// Compare local rules with remote
const diff = await diffRules(client, localRules)

if (diff.hasChanges) {
  console.log(formatDiff(diff))
  // Or access structured data:
  console.log(diff.summary)
  // { roles: { added: 2, modified: 0, removed: 0 },
  //   policies: { added: 3, modified: 0, removed: 0 },
  //   permissions: { added: 7, modified: 0, removed: 0 } }
}

// Compare two payloads directly
const diff = compareRulesPayloads(localPayload, remotePayload)

// Compare two remote instances
const diff = await diffRemoteRules(stagingClient, productionClient)
```

### Pushing [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#pushing)

typescript

```
import { formatPushResult, pushRules } from 'nuxt-directus-sdk/rules'

const result = await pushRules(client, localRules, {
  // Only create, don't update or delete
  addOnly: false,

  // Don't delete items that exist remotely but not locally
  skipDeletes: false,

  // Progress callback
  onProgress: (event) => {
    console.log(`[${event.current}/${event.total}] ${event.action} ${event.phase}: ${event.name}`)
  },
})

console.log(formatPushResult(result))

if (!result.success) {
  console.error('Push failed:', result.errors)
}
```

Push applies changes in dependency order:

1.  **Create/update:** policies -> roles -> permissions
2.  **Delete:** permissions -> roles -> policies

### System Collection Handling [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#system-collection-handling)

By default, diffs exclude internal Directus system collections (`directus_activity`, `directus_settings`, etc.) since these are managed by Directus itself. `directus_users` and `directus_files` are **not** excluded, since they commonly have custom permissions.

To include all system collections:

typescript

```
const diff = compareRulesPayloads(local, remote, {
  excludeSystemCollections: false,
})
```

## Workflow Example [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#workflow-example)

A typical workflow for managing rules across environments:

bash

```


# 1. Pull current rules from staging
npx nuxt-directus-sdk rules:pull -o rules.json

# 2. Define/extend rules in code, test them (see Testing Rules guide)

# 3. Serialize your extended rules


#    (or use the JSON file directly)

# 4. Preview changes
npx nuxt-directus-sdk rules:push rules.json --dry-run

# 5. Apply to staging
npx nuxt-directus-sdk rules:push rules.json

# 6. Compare staging with production
npx nuxt-directus-sdk rules:diff-remote \
  --source-url https://staging.example.com --source-token staging-token \
  --target-url https://production.example.com --target-token production-token
```

### CI Integration [​](https://www.nuxt-directus-sdk.com/guide/rules-sync.html#ci-integration)

The diff command's exit code makes it easy to use in CI:

yaml

```


# GitHub Actions example
- name: Check rules are in sync
  run: npx nuxt-directus-sdk rules:diff rules.json
  env:
    DIRECTUS_URL: ${{ secrets.DIRECTUS_URL }}
    DIRECTUS_ADMIN_TOKEN: ${{ secrets.DIRECTUS_ADMIN_TOKEN }}
```

---
Source: [Rules Sync | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/guide/rules-sync.html)

# generate-types | Nuxt Directus SDK

[Skip to content](https://www.nuxt-directus-sdk.com/cli/generate-types.html#VPContent)

## `generate-types` [​](https://www.nuxt-directus-sdk.com/cli/generate-types.html#generate-types)

Generate TypeScript types from a Directus schema. This is the standalone version of what the module's [Type Generation](https://www.nuxt-directus-sdk.com/guide/type-generation.html) feature does automatically during `nuxi dev` / `nuxi build`. Useful in CI, pre-commit hooks, or any workflow where you want `.d.ts` output without a Nuxt build.

Connection settings (URL / admin token) are the same as every other CLI command. See the [CLI overview](https://www.nuxt-directus-sdk.com/cli/) for precedence.

## Examples [​](https://www.nuxt-directus-sdk.com/cli/generate-types.html#examples)

bash

```


# Pipe to a file (uses DIRECTUS_URL + DIRECTUS_ADMIN_TOKEN from .env)
npx nuxt-directus-sdk generate-types > types/directus.d.ts

# Write directly to a file (creates parent directories)
npx nuxt-directus-sdk generate-types -o types/directus.d.ts

# Inline env vars, useful for one-off runs against a specific instance
DIRECTUS_URL=https://my-directus.com \
DIRECTUS_ADMIN_TOKEN=my-token \
  npx nuxt-directus-sdk generate-types > types/directus.d.ts

# Flags override env vars
npx nuxt-directus-sdk generate-types \
  --url https://my-directus.com \
  --token $DIRECTUS_ADMIN_TOKEN \
  -o types/directus.d.ts

# Add a prefix to custom collection type names
npx nuxt-directus-sdk generate-types --prefix App -o types/directus.d.ts

# Emit without the `declare global { ... }` wrapper (non-Nuxt consumers)
npx nuxt-directus-sdk generate-types --no-declare-global -o types/directus.d.ts
```

## Flags [​](https://www.nuxt-directus-sdk.com/cli/generate-types.html#flags)

| Flag | Type | Default | Description |
| --- | --- | --- | --- |
| `-o, --output <file>` | path | stdout | Output file. Parent directories are created automatically. |
| `--prefix <prefix>` | string | `''` | Prefix for custom collection type names (e.g. `App` produces `AppBlog`). System collection interfaces like `DirectusUser` are never prefixed. |
| `--no-declare-global` | boolean | wrapper on | Emit top-level `interface` declarations instead of wrapping everything in `declare global { ... }`. Useful for non-Nuxt consumers. |
| `--include <names>` | CSV | — | Emit only these collections (see [Filtering collections](https://www.nuxt-directus-sdk.com/cli/generate-types.html#filtering-collections)). |
| `--exclude <names>` | CSV | — | Drop these collections (see [Filtering collections](https://www.nuxt-directus-sdk.com/cli/generate-types.html#filtering-collections)). |
| `--no-expand-references` | boolean | expansion on | Disable reference expansion when `--include` is used (see below). |
| `--verbose` | boolean | `false` | Emit per-target grouped warnings for collapsed references. |

Informational logs (e.g. `Fetched 42 collections`) go to stderr, so they do not pollute stdout when piping.

Keeping types in version control

Running `generate-types` in CI and committing the output is a common pattern. It keeps your team working with consistent types without requiring each developer to have their own admin token or a local Nuxt build. Just make sure the CI job has access to the Directus instance and an admin token.

## Filtering Collections advanced [​](https://www.nuxt-directus-sdk.com/cli/generate-types.html#filtering-collections)

You can narrow what the CLI emits in the same way as the [module's `types` option](https://www.nuxt-directus-sdk.com/api/configuration/module.html#types):

bash

```


# Exclude
npx nuxt-directus-sdk generate-types --exclude directus_activity,directus_revisions

# Include (referenced collections auto-included)
npx nuxt-directus-sdk generate-types --include posts

# Strict include (only the listed collections; references collapse to `string`)
npx nuxt-directus-sdk generate-types --include posts --no-expand-references

# Verbose warnings, grouped by target collection
npx nuxt-directus-sdk generate-types --exclude directus_users --verbose
```

Precedence: when both `--include` and `--exclude` are set, `--include` wins and `--exclude` is ignored with a warning.

References to collections that are not emitted are rewritten so the generated types stay valid:

-   M2O (e.g. `user_created: DirectusUser | string`) collapses to `string`

-   O2M (e.g. `revisions: DirectusRevision[] | string[]`) collapses to `string[]`
-   M2A (polymorphic) filters out missing collections from the union; if the whole union is missing, the field collapses to `string`

See the [Type Generation guide](https://www.nuxt-directus-sdk.com/guide/type-generation.html#advanced-filtering-collections) for the full story with config-level examples.

## See Also [​](https://www.nuxt-directus-sdk.com/cli/generate-types.html#see-also)

-   [Type Generation guide](https://www.nuxt-directus-sdk.com/guide/type-generation.html) — the feature-level overview

-   [Module option: `types`](https://www.nuxt-directus-sdk.com/api/configuration/module.html#types) — same behaviour in `nuxt.config.ts`
-   [CLI overview](https://www.nuxt-directus-sdk.com/cli/) — connection settings, exit codes

---
Source: [types | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/cli/generate-types.html)

# rules:* | Nuxt Directus SDK

Pull, push, and diff Directus permissions, policies, and roles as JSON. Pairs with the [Rules Sync guide](https://www.nuxt-directus-sdk.com/guide/rules-sync.html), which covers the full workflow of defining rules in code, testing them, and syncing to your Directus instance.

Connection settings (URL / admin token) are the same as every other CLI command. See the [CLI overview](https://www.nuxt-directus-sdk.com/cli/) for precedence.

## Commands [​](https://www.nuxt-directus-sdk.com/cli/rules.html#commands)

### `rules:pull` [​](https://www.nuxt-directus-sdk.com/cli/rules.html#rules-pull)

Download the current Directus permissions/policies/roles to a JSON file.

bash

```


# Pull to rules.json (default output path)
npx nuxt-directus-sdk rules:pull

# Pull to a specific file
npx nuxt-directus-sdk rules:pull -o staging-rules.json

# Pull from a specific instance
npx nuxt-directus-sdk rules:pull \
  --url https://staging.example.com \
  --token $STAGING_TOKEN
```

**Flags:**

| Flag | Default | Description |
| --- | --- | --- |
| `-o, --output <file>` | `rules.json` | Output file path |
| `--compact` | `false` | Output compact JSON without pretty-printing |

### `rules:push` [​](https://www.nuxt-directus-sdk.com/cli/rules.html#rules-push)

Push a local JSON rules file to Directus.

bash

```


# Preview what would change (dry run, never writes)
npx nuxt-directus-sdk rules:push rules.json --dry-run

# Push the rules
npx nuxt-directus-sdk rules:push rules.json

# Only add new items, never modify or delete existing ones
npx nuxt-directus-sdk rules:push rules.json --add-only

# Skip deletions (useful for additive migrations)
npx nuxt-directus-sdk rules:push rules.json --skip-deletes
```

**Flags:**

| Flag | Default | Description |
| --- | --- | --- |
| `--dry-run` | `false` | Report what would be changed, don't actually change anything |
| `--add-only` | `false` | Only create new items, never modify or delete existing items |
| `--skip-deletes` | `false` | Don't delete items that exist remotely but not locally |

### `rules:diff` [​](https://www.nuxt-directus-sdk.com/cli/rules.html#rules-diff)

Compare a local JSON file against a Directus instance.

bash

```
npx nuxt-directus-sdk rules:diff rules.json
```

Exits with code 1 if differences are found, so you can use it as a CI gate:

yaml

```


# .github/workflows/rules-drift.yml
- name: Check for rule drift
  run: npx nuxt-directus-sdk rules:diff rules.json
```

The job fails if remote Directus has drifted from what's checked into the repo.

### `rules:diff-files` [​](https://www.nuxt-directus-sdk.com/cli/rules.html#rules-diff-files)

Compare two local JSON files.

bash

```
npx nuxt-directus-sdk rules:diff-files staging.json production.json
```

Useful when you've pulled from two instances and want to see what's different.

### `rules:diff-remote` [​](https://www.nuxt-directus-sdk.com/cli/rules.html#rules-diff-remote)

Compare two Directus instances directly.

bash

```
npx nuxt-directus-sdk rules:diff-remote \
  --source-url https://staging.example.com --source-token staging-token \
  --target-url https://production.example.com --target-token production-token
```

**Flags:**

| Flag | Description |
| --- | --- |
| `--source-url <url>` | URL of the source Directus instance |
| `--source-token <token>` | Admin token for the source instance |
| `--target-url <url>` | URL of the target Directus instance |
| `--target-token <token>` | Admin token for the target instance |

## See Also [​](https://www.nuxt-directus-sdk.com/cli/rules.html#see-also)

-   [Rules Sync guide](https://www.nuxt-directus-sdk.com/guide/rules-sync.html) — full workflow including the code-first authoring API

-   [Defining Rules](https://www.nuxt-directus-sdk.com/guide/rules.html) — reference for the rules DSL
-   [Testing Rules](https://www.nuxt-directus-sdk.com/guide/rules-testing.html) — test utilities for verifying rule behaviour

-   [CLI overview](https://www.nuxt-directus-sdk.com/cli/) — connection settings, exit codes

---
Source: [rules:* | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/cli/rules.html)

# Configuration Reference | Nuxt Directus SDK

## Configuration Reference [​](https://www.nuxt-directus-sdk.com/api/configuration/#configuration-reference)

Complete reference for all nuxt-directus-sdk configuration options.

## Module Options [​](https://www.nuxt-directus-sdk.com/api/configuration/#module-options)

Configure the module in your `nuxt.config.ts`:

typescript

```
export default defineNuxtConfig({
  modules: ['nuxt-directus-sdk'],

  directus: {
    // Configuration options here
  },
})
```

Module options are automatically loaded into Nuxt RuntimeConfig().

`adminToken` is automatically excluded from public runtime config for security.

typescript

```
// Client-side and server-side
const config = useRuntimeConfig()
console.log(config.public.directus.url)

// Server-side only (includes adminToken)
const config = useRuntimeConfig()
console.log(config.directus.adminToken)
```

All Configuration Options

typescript

```
export default defineNuxtConfig({
  modules: ['nuxt-directus-sdk'],

  directus: { 
    // Core configuration — simple string
    url: process.env.DIRECTUS_URL,
    // Or split URLs for Docker/K8s:
    // url: { client: 'https://cms.example.com', server: 'http://directus:8055' },
    adminToken: process.env.DIRECTUS_ADMIN_TOKEN,

    // Development
    proxy: {
      enabled: true,
      path: '/directus',
      wsPath: '/directus-ws',
    },
    devtools: true,
    visualEditor: true,

    // Image integration
    image: true, // Directus provider is automatically configured

    // Type generation
    types: {
      enabled: true,
      prefix: 'App',
    },

    // Authentication
    auth: {
      enabled: true,
      enableGlobalAuthMiddleware: false,
      autoRefresh: true,
      credentials: 'include',
      realtimeAuthMode: 'handshake',
      readMeFields: ['id', 'email', 'first_name', 'last_name', 'avatar', 'role'],
      redirect: {
        home: '/',
        login: '/auth/login',
        logout: '/',
      },
    },
  },
})
```

### Core Options [​](https://www.nuxt-directus-sdk.com/api/configuration/#core-options)

#### `url` [​](https://www.nuxt-directus-sdk.com/api/configuration/#url)

-   **Type:** `string | { client: string, server: string }`

-   **Required:** Yes
-   **Default:** `process.env.DIRECTUS_URL`

-   **Environment Variable:** `DIRECTUS_URL`

Your Directus instance URL. Can be a simple string, or an object with separate `client` and `server` URLs for environments where SSR needs to reach Directus via an internal hostname (e.g. Docker, Kubernetes).

typescript

```
export default defineNuxtConfig({
  directus: {
    // Simple string — used everywhere
    url: 'https://your-directus-instance.com',

    // Or split URLs for Docker/K8s
    url: {
      client: 'https://cms.example.com', // Browser requests
      server: 'http://directus:8055', // SSR / server-side requests
    },
  },
})
```

Or use environment variable (string form only):

dotenv

```
DIRECTUS_URL=https://your-directus-instance.com
```

When to use split URLs

Use the object form when your Nuxt server can reach Directus via an internal network address that browsers can't access. Common scenarios:

-   **Docker Compose**: `server: 'http://directus:8055'` (container name)

-   **Kubernetes**: `server: 'http://directus-service.default.svc.cluster.local:8055'`
-   **Private network**: `server: 'http://10.0.0.5:8055'`

The `client` URL is what browsers use and what SSO redirects point to. The `server` URL is only used during SSR and is never exposed to the browser.

#### `adminToken` [​](https://www.nuxt-directus-sdk.com/api/configuration/#admintoken)

-   **Type:** `string`

-   **Required:** No (required for type generation and admin operations)
-   **Default:** `process.env.DIRECTUS_ADMIN_TOKEN`

-   **Environment Variable:** `DIRECTUS_ADMIN_TOKEN`

Admin token for privileged operations and type generation.

typescript

```
export default defineNuxtConfig({
  directus: {
  },
})
```

Or use environment variable:

dotenv

```
DIRECTUS_ADMIN_TOKEN=your-admin-token-here
```

**Security Note:** Never commit admin tokens to version control. Always use environment variables.

### Proxy Options [​](https://www.nuxt-directus-sdk.com/api/configuration/#proxy-options)

#### `proxy` [​](https://www.nuxt-directus-sdk.com/api/configuration/#proxy)

-   **Type:** `boolean | { enabled?: boolean, path?: string, wsPath?: string }`

-   **Default:** `{ enabled: true, path: '/directus', wsPath: '/directus-ws' }` in dev mode
-   **Default:** `false` in production

Proxy configuration. When enabled, creates a Nitro server handler that forwards HTTP requests to your Directus instance, eliminating CORS issues and supporting dynamic ports in development. In production it solves cross-domain cookie scope problems (e.g. login on Vercel where app and Directus are on different domains).

typescript

```
export default defineNuxtConfig({
  directus: {
    // Simple boolean
    proxy: true,

    // Or detailed configuration
    proxy: {
      enabled: true,
      path: '/directus', // HTTP proxy mount path
      wsPath: '/directus-ws', // WebSocket proxy path (dev only)
    },
  },
})
```

**How it works:**

-   In development: requests route through the proxy on Nuxt's current port. Supports dynamic port changes (3000 → 3001).

-   In production: off by default. Set `proxy: true` (or `{ enabled: true }`) to enable HTTP proxying.
-   WebSocket proxy at `wsPath` is dev-only. In production, realtime connects directly to Directus.

**Disable proxy:**

typescript

```
export default defineNuxtConfig({
  directus: {
    proxy: false, // Use direct connection in dev
  },
})
```

Renamed from `devProxy` in v6.1

The option was previously called `devProxy`. From v6.1 the old name still works as an alias but logs a deprecation warning at build time; it will be removed in the next major release. See the [Proxy guide](https://www.nuxt-directus-sdk.com/guide/proxy.html#migration-from-devproxy) for migration details.

#### `devtools` [​](https://www.nuxt-directus-sdk.com/api/configuration/#devtools)

-   **Type:** `boolean`

-   **Default:** `true`

Add Directus admin panel to Nuxt Devtools.

typescript

```
export default defineNuxtConfig({
  directus: {
    devtools: true, // Enable Directus tab in devtools
  },
})
```

When enabled, you can access the Directus admin panel directly from Nuxt Devtools.

#### `visualEditor` [​](https://www.nuxt-directus-sdk.com/api/configuration/#visualeditor)

-   **Type:** `boolean`

-   **Default:** `true`

Enable visual editor capabilities. When enabled, the module:

-   Automatically detects when your site is loaded inside a Directus admin iframe

-   Renders `data-directus` attributes on `DirectusVisualEditor` components (only inside the iframe)
-   Applies the `@directus/visual-editing` SDK to enable inline editing

-   Calls `refreshNuxtData()` when content is saved (no full page reload)

typescript

```
export default defineNuxtConfig({
  directus: {
    visualEditor: true, // Enable visual editor (default)
  },
})
```

When disabled, `DirectusVisualEditor` renders as a pass-through wrapper with no attributes.

Add `?debug` to any page URL to enable debug logging for the visual editor in the browser console. This is useful for diagnosing CSP issues, URL mismatches, and iframe detection on staging/production deployments.

#### `image` [​](https://www.nuxt-directus-sdk.com/api/configuration/#image)

-   **Type:** `boolean | { enabled?: boolean, setDefaultProvider?: boolean }`

-   **Default:** `true`

Configure `@nuxt/image` integration with Directus provider.

typescript

```
export default defineNuxtConfig({
  directus: {
    // Enable with defaults
    image: true,

    // Disable @nuxt/image integration
    image: false,

    // Set Directus as default provider
    image: {
      setDefaultProvider: true,
    },
  },
})
```

##### Options [​](https://www.nuxt-directus-sdk.com/api/configuration/#options)

-   **`enabled`** (`boolean`, default: `true`) - Enable/disable `@nuxt/image` integration

-   **`setDefaultProvider`** (`boolean`, default: `false`) - Set Directus as the default provider for `<NuxtImg>` components (no need to specify `provider="directus"`)

When enabled, the module automatically:

-   Installs and configures `@nuxt/image`

-   Sets up the Directus provider with your instance's assets endpoint

##### Usage [​](https://www.nuxt-directus-sdk.com/api/configuration/#usage)

With `setDefaultProvider: false` (default):

vue

```
<NuxtImg
  provider="directus"
  src="your-file-id"
  width="800"
  height="600"
/>
```

With `setDefaultProvider: true`:

vue

```
<!-- No need to specify provider -->
<NuxtImg
  src="your-file-id"
  width="800"
  height="600"
/>
```

See the [File Management Guide](https://www.nuxt-directus-sdk.com/guide/files.html#using-with-nuxt-image) for more details.

### Type Generation [​](https://www.nuxt-directus-sdk.com/api/configuration/#type-generation)

The module generates TypeScript types from your Directus schema at build time. Enabled by default when `DIRECTUS_ADMIN_TOKEN` is set.

See the [Type Generation guide](https://www.nuxt-directus-sdk.com/guide/type-generation.html) for what gets generated, the `prefix` option, and advanced filtering (`include` / `exclude` / `expandReferences` / `verbose`). The standalone CLI is documented on the [`generate-types` CLI page](https://www.nuxt-directus-sdk.com/cli/generate-types.html).

#### `types` [​](https://www.nuxt-directus-sdk.com/api/configuration/#types)

-   **Type:** `boolean | { enabled?: boolean, prefix?: string, include?: string[], expandReferences?: boolean, exclude?: string[], verbose?: boolean }`

-   **Default:** `true`

Enable/disable automatic type generation from your Directus schema.

typescript

```
export default defineNuxtConfig({
  directus: {
    types: true, // Generate types from Directus schema
  },
})
```

**Requires `adminToken` to be set.**

When enabled, types are automatically generated and available globally:

typescript

```
// Access generated types
type Article = DirectusSchema['articles']
type User = DirectusUser
type File = DirectusFile

// Use with Directus SDK - fully typed!
const directus = useDirectus()
const articles = await directus.request(readItems('articles'))
// articles is typed as Article[]
```

**Disable type generation:**

typescript

```
export default defineNuxtConfig({
  directus: {
    types: false,
  },
})
```

See the [Type Generation guide](https://www.nuxt-directus-sdk.com/guide/type-generation.html) for:

-   [Type prefix](https://www.nuxt-directus-sdk.com/guide/type-generation.html#type-prefix) to avoid naming conflicts

-   [Filtering collectionsadvanced](https://www.nuxt-directus-sdk.com/guide/type-generation.html#filtering-collections) with `include` / `exclude` / `expandReferences` / `verbose`
-   [Manually Generating Typesadvanced](https://www.nuxt-directus-sdk.com/guide/type-generation.html#disabling) that work with the module

-   [Using the CLI](https://www.nuxt-directus-sdk.com/guide/type-generation.html#generating-types-outside-a-nuxt-build) for on-demand generation

### SDK Auto-Imports [​](https://www.nuxt-directus-sdk.com/api/configuration/#sdk-auto-imports)

#### `autoImportSdk` [​](https://www.nuxt-directus-sdk.com/api/configuration/#autoimportsdk)

-   **Type:** `boolean | { exclude?: string[] }`

-   **Default:** `true`

Controls whether the module auto-imports functions from `@directus/sdk`. By default every SDK function is auto-imported (minus a small list the module wraps or explicitly doesn't support — see [Composables > Auto-Imported Directus SDK Functions](https://www.nuxt-directus-sdk.com/api/composables/#auto-imported-directus-sdk-functions)).

**Disable entirely** — you'll need to `import { ... } from '@directus/sdk'` wherever you use them:

typescript

```
export default defineNuxtConfig({
  directus: {
    autoImportSdk: false,
  },
})
```

**Exclude specific functions** — useful if an SDK function name collides with something else in your app:

typescript

```
export default defineNuxtConfig({
  directus: {
    autoImportSdk: {
      exclude: ['aggregate', 'customEndpoint'],
    },
  },
})
```

Your `exclude` list is added to the module's built-in exclusions; you don't need to repeat `createDirectus`, `rest`, etc.

Tree-shaking means disabling auto-imports has no bundle-size benefit for end users — unused SDK functions don't ship regardless. The option exists for collisions and for teams that prefer explicit imports.

### Authentication Options [​](https://www.nuxt-directus-sdk.com/api/configuration/#authentication-options)

#### `auth` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth)

Authentication configuration.

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      // Auth options here
    },
  },
})
```

##### `auth.enabled` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-enabled)

-   **Type:** `boolean`

-   **Default:** `true`

Enable/disable authentication features.

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      enabled: true,
    },
  },
})
```

##### `auth.enableGlobalAuthMiddleware` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-enableglobalauthmiddleware)

-   **Type:** `boolean`

-   **Default:** `false`

Enable global authentication middleware on all routes.

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      enableGlobalAuthMiddleware: true, // All routes require auth by default
    },
  },
})
```

When enabled, all routes are protected. Allow public routes with:

vue

```
<script setup>
definePageMeta({
  middleware: [] // Override global middleware
})
</script>
```

##### `auth.autoRefresh` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-autorefresh)

-   **Type:** `boolean`

-   **Default:** `true`

Automatically refresh authentication tokens before expiry.

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      autoRefresh: true, // Auto-refresh session tokens
    },
  },
})
```

##### `auth.credentials` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-credentials)

-   **Type:** `'include' | 'omit' | 'same-origin'`

-   **Default:** `'include'`

Credentials mode for cross-domain requests.

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      credentials: 'include', // Required for cross-domain cookies
    },
  },
})
```

**Options:**

-   `'include'` - Always send cookies (required for cross-domain)

-   `'same-origin'` - Only send cookies for same-origin requests
-   `'omit'` - Never send cookies

##### `auth.realtimeAuthMode` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-realtimeauthmode)

-   **Type:** `'public' | 'handshake' | 'strict'`

-   **Default:** `'public'`

WebSocket authentication mode for realtime features.

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      realtimeAuthMode: 'handshake',
    },
  },
})
```

**Modes:**

-   `'public'` - No authentication required

-   `'handshake'` - Authenticate during connection
-   `'strict'` - Full authentication required

##### `auth.readMeFields` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-readmefields)

-   **Type:** `Array<string>`

-   **Default:** `[]` (fetches all fields)

Fields to fetch for the current user.

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      readMeFields: ['id', 'email', 'first_name', 'last_name', 'avatar'],
    },
  },
})
```

Reduces payload size by only fetching needed fields.

##### `auth.redirect` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-redirect)

Redirect configuration for authentication.

typescript

```
export default defineNuxtConfig({
  directus: {
    auth: {
      redirect: {
        home: '/', // After login
        login: '/auth/login', // When not authenticated
        logout: '/', // After logout
      },
    },
  },
})
```

###### `auth.redirect.home` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-redirect-home)

-   **Type:** `string`

-   **Default:** `'/'`

Where to redirect after successful login.

###### `auth.redirect.login` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-redirect-login)

-   **Type:** `string`

-   **Default:** `'/auth/login'`

Where to redirect when authentication is required.

###### `auth.redirect.logout` [​](https://www.nuxt-directus-sdk.com/api/configuration/#auth-redirect-logout)

-   **Type:** `string`

-   **Default:** `'/'`

Where to redirect after logout.

## Environment Variables [​](https://www.nuxt-directus-sdk.com/api/configuration/#environment-variables)

### .env for Development [​](https://www.nuxt-directus-sdk.com/api/configuration/#env-for-development)

dotenv

```


# Required
DIRECTUS_URL=http://localhost:8055

# Optional (for type generation and admin operations)
DIRECTUS_ADMIN_TOKEN=your-admin-token-here
```

### .env for Production [​](https://www.nuxt-directus-sdk.com/api/configuration/#env-for-production)

For production, set environment variables in your hosting platform:

**Vercel:**

bash

```
vercel env add DIRECTUS_URL production
vercel env add DIRECTUS_ADMIN_TOKEN production
```

**Netlify:**

bash

```


# In Netlify UI: Site settings → Environment variables
DIRECTUS_URL=https://your-directus.com
DIRECTUS_ADMIN_TOKEN=your-token
```

**Docker:**

dockerfile

```
ENV DIRECTUS_URL=https://your-directus.com
ENV DIRECTUS_ADMIN_TOKEN=your-token
```

Docker with split URLs

When using Docker Compose, you can use the object URL form in `nuxt.config.ts` to route SSR requests through the internal Docker network:

typescript

```
export default defineNuxtConfig({
  directus: {
    url: {
      client: 'https://cms.example.com',
      server: 'http://directus:8055', // Docker service name
    },
  }
})
```

## Directus Server Configuration [​](https://www.nuxt-directus-sdk.com/api/configuration/#directus-server-configuration)

### Required Directus Settings [​](https://www.nuxt-directus-sdk.com/api/configuration/#required-directus-settings)

For the module to work correctly, configure your Directus instance:

dotenv

```


# Directus .env

# Authentication
AUTH_LOCAL_MODE=session

# Session cookies
SESSION_COOKIE_SECURE=true  # false in development
SESSION_COOKIE_SAME_SITE=Lax  # None for cross-domain
SESSION_COOKIE_DOMAIN=.yourdomain.com  # For cross-domain

# CORS (required)
CORS_ENABLED=true
CORS_ORIGIN=https://your-nuxt-app.com
CORS_CREDENTIALS=true

# Realtime/WebSocket (optional)
WEBSOCKETS_ENABLED=true
WEBSOCKETS_REST_AUTH=strict
```

### Same Domain Setup [​](https://www.nuxt-directus-sdk.com/api/configuration/#same-domain-setup)

If Nuxt and Directus are on the same domain:

dotenv

```


# Directus .env
SESSION_COOKIE_SECURE=false  # true in production
SESSION_COOKIE_SAME_SITE=Lax
CORS_ORIGIN=http://localhost:3000
```

### Cross-Domain Setup [​](https://www.nuxt-directus-sdk.com/api/configuration/#cross-domain-setup)

If on different domains (e.g., app.example.com and api.example.com):

dotenv

```


# Directus .env
SESSION_COOKIE_DOMAIN=.example.com  # Shared parent domain
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_SAME_SITE=None  # Required for cross-domain
CORS_ORIGIN=https://app.example.com
```

## TypeScript Configuration [​](https://www.nuxt-directus-sdk.com/api/configuration/#typescript-configuration)

The module automatically adds type declarations. Ensure your `tsconfig.json` extends Nuxt's config:

json

```
{
  "extends": "./.nuxt/tsconfig.json"
}
```

Generated types are available globally:

typescript

```
// Access generated types
type Article = DirectusSchema['articles']
type User = DirectusUser
type File = DirectusFile

// Use with Directus SDK
const directus = useDirectus()
const articles = await directus.request(readItems('articles'))
// articles is typed as Article[]
```

## See Also [​](https://www.nuxt-directus-sdk.com/api/configuration/#see-also)

-   [Getting Started](https://www.nuxt-directus-sdk.com/guide/getting-started.html)

-   [Authentication Guide](https://www.nuxt-directus-sdk.com/guide/authentication.html)
-   [Server-Side Utils](https://www.nuxt-directus-sdk.com/guide/server-side.html)

-   [Composables Reference](https://www.nuxt-directus-sdk.com/api/composables/)

---
Source: [Configuration Reference | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/api/configuration/)

# Environment Variables | Nuxt Directus SDK

### .env for Development [​](https://www.nuxt-directus-sdk.com/api/configuration/env.html#env-for-development)

dotenv

```


# Required
DIRECTUS_URL=http://localhost:8055

# Optional (for type generation and admin operations)
DIRECTUS_ADMIN_TOKEN=your-admin-token-here
```

### .env for Production [​](https://www.nuxt-directus-sdk.com/api/configuration/env.html#env-for-production)

For production, set environment variables in your hosting platform:

**Vercel:**

bash

```
vercel env add DIRECTUS_URL production
vercel env add DIRECTUS_ADMIN_TOKEN production
```

**Netlify:**

bash

```


# In Netlify UI: Site settings → Environment variables
DIRECTUS_URL=https://your-directus.com
DIRECTUS_ADMIN_TOKEN=your-token
```

**Docker:**

dockerfile

```
ENV DIRECTUS_URL=https://your-directus.com
ENV DIRECTUS_ADMIN_TOKEN=your-token
```

Docker with split URLs

When using Docker Compose, you can use the object URL form in `nuxt.config.ts` to route SSR requests through the internal Docker network:

typescript

```
export default defineNuxtConfig({
  directus: {
    url: {
      client: 'https://cms.example.com',
      server: 'http://directus:8055', // Docker service name
    },
  }
})
```

---
Source: [Environment Variables | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/api/configuration/env.html)

# Directus Server Configuration | Nuxt Directus SDK

### Required Directus Settings [​](https://www.nuxt-directus-sdk.com/api/configuration/server.html#required-directus-settings)

For the module to work correctly, configure your Directus instance:

dotenv

```


# Directus .env

# Authentication
AUTH_LOCAL_MODE=session

# Session cookies
SESSION_COOKIE_SECURE=true  # false in development
SESSION_COOKIE_SAME_SITE=Lax  # None for cross-domain
SESSION_COOKIE_DOMAIN=.yourdomain.com  # For cross-domain

# CORS (required)
CORS_ENABLED=true
CORS_ORIGIN=https://your-nuxt-app.com
CORS_CREDENTIALS=true

# Realtime/WebSocket (optional)
WEBSOCKETS_ENABLED=true
WEBSOCKETS_REST_AUTH=strict
```

### Same Domain Setup [​](https://www.nuxt-directus-sdk.com/api/configuration/server.html#same-domain-setup)

If Nuxt and Directus are on the same domain:

dotenv

```


# Directus .env
SESSION_COOKIE_SECURE=false  # true in production
SESSION_COOKIE_SAME_SITE=Lax
CORS_ORIGIN=http://localhost:3000
```

### Cross-Domain Setup [​](https://www.nuxt-directus-sdk.com/api/configuration/server.html#cross-domain-setup)

If on different domains (e.g., app.example.com and api.example.com):

dotenv

```


# Directus .env
SESSION_COOKIE_DOMAIN=.example.com  # Shared parent domain
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_SAME_SITE=None  # Required for cross-domain
CORS_ORIGIN=https://app.example.com
```

---
Source: [Directus Server Configuration | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/api/configuration/server.html)

# Composables | Nuxt Directus SDK

Complete API reference for all composables provided by nuxt-directus-sdk.

## TypeScript Support [​](https://www.nuxt-directus-sdk.com/api/composables/#typescript-support)

All composables are fully typed with TypeScript:

typescript

```
// User is typed as DirectusUser
const { user } = useDirectusAuth()
user.value?.email // string | undefined
user.value?.first_name // string | undefined

// Directus client is typed with your schema
const directus = useDirectus()
const articles = await directus.request(readItems('articles'))
// articles is typed based on your Directus schema

// File options are typed
const url = getDirectusFileUrl(file, {
  fit: 'cover', // Only allows: 'cover' | 'contain' | 'inside' | 'outside'
  format: 'webp', // Only allows: 'jpg' | 'png' | 'webp' | 'tiff' | 'avif'
})
```

## Auto-Imported Directus SDK Functions [​](https://www.nuxt-directus-sdk.com/api/composables/#auto-imported-directus-sdk-functions)

The module auto-imports every function exported by `@directus/sdk` — including any new ones added in future SDK releases — so you can call them directly without an `import` statement. The module reads the SDK's exports at build time, so whichever version of `@directus/sdk` you have installed, those functions are what you get.

**Usage:**

typescript

```
const directus = useDirectus()

const articles = await directus.request(readItems('articles', {
  filter: { status: { _eq: 'published' } },
  fields: ['*', { author: ['*'] }],
  sort: ['-date_created'],
  limit: 10,
}))

const article = await directus.request(readItem('articles', 'id', {
  fields: ['*', { author: ['first_name', 'last_name'] }],
}))

const created = await directus.request(createItem('articles', {
  title: 'New Article',
  status: 'draft',
}))
```

### Functions Excluded from Auto-Import [​](https://www.nuxt-directus-sdk.com/api/composables/#functions-excluded-from-auto-import)

A small number of SDK functions are intentionally not auto-imported — either because this module provides a composable wrapper, or because the function is an internal SDK detail. All of them can still be imported manually from `@directus/sdk` when you have a specific reason.

| Category | Function | Use instead |
| --- | --- | --- |
| Client setup | `createDirectus()` | Use [`useDirectus()`](https://www.nuxt-directus-sdk.com/api/composables/#directus-client-composables) — pre-configured with `auth()`, `rest()`, `realtime()`, and SSR cookie forwarding. |
| Client setup | `authentication()` | Already configured by `useDirectus()`. |
| Client setup | `rest()` | Already configured by `useDirectus()`. |
| Client setup | `realtime()` | Already configured by `useDirectus()`. |
| Client setup | `staticToken()` | Used internally for `adminToken`. Import manually if you need a one-off static-token client alongside `createDirectus()`. |
| Auth | `auth()` | Low-level realtime auth handler. Use [`useDirectusAuth()`](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables) for normal flows. |
| Auth | `getAuthEndpoint()` | Internal SDK auth routing helper. |
| Auth | `acceptUserInvite()` | Use [`useDirectusAuth().acceptUserInvite()`](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables). |
| Auth | `createUser()` | Use [`useDirectusAuth().createUser()`](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables). |
| Auth | `inviteUser()` | Use [`useDirectusAuth().inviteUser()`](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables). |
| Auth | `passwordRequest()` | Use [`useDirectusAuth().passwordRequest()`](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables). |
| Auth | `passwordReset()` | Use [`useDirectusAuth().passwordReset()`](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables). |
| Auth | `readMe()` | Use [`useDirectusAuth().readMe()`](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables) — manages shared user state. |
| Auth | `updateMe()` | Use [`useDirectusAuth().updateMe()`](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables) — manages shared user state. |
| Files | `uploadFiles()` | Use [`uploadDirectusFiles()`](https://www.nuxt-directus-sdk.com/api/composables/#file-composables) — handles `FormData` construction. |
| Storage | `memoryStorage()` | Use [`useDirectusStorage()`](https://www.nuxt-directus-sdk.com/api/composables/#storage-composables). |
| GraphQL | `graphql()` | Not supported by this module. Import manually if needed. |
| GraphQL | `readGraphqlSdl()` | Not supported by this module. Import manually if needed. |

If you need one of these, import it directly:

typescript

```
import { createDirectus, graphql, rest } from '@directus/sdk'
```

### Disabling or Customizing Auto-Imports [​](https://www.nuxt-directus-sdk.com/api/composables/#disabling-or-customizing-auto-imports)

You can turn auto-imports off or narrow the list via the [`autoImportSdk`](https://www.nuxt-directus-sdk.com/api/configuration/module.html#autoimportsdk) option in your Nuxt config.

**Disable entirely:**

typescript

```
export default defineNuxtConfig({
  directus: {
    autoImportSdk: false,
  },
})
```

**Exclude specific functions** — useful if a name collides with something else in your app:

typescript

```
export default defineNuxtConfig({
  directus: {
    autoImportSdk: {
      exclude: ['aggregate', 'customEndpoint'],
    },
  },
})
```

Your `exclude` is additive: the module's built-in exclusions still apply, and you don't need to repeat them.

## Authentication Composables [​](https://www.nuxt-directus-sdk.com/api/composables/#authentication-composables)

### `useDirectusAuth()` [​](https://www.nuxt-directus-sdk.com/api/composables/#usedirectusauth)

Main authentication composable with methods and state for user authentication.

**Returns:** `DirectusAuth`

typescript

```
interface DirectusAuth {
  user: Ref<DirectusUser | null>
  loggedIn: ComputedRef<boolean>
  readMe: () => Promise<DirectusUser | null>
  updateMe: (data: UpdateMeInput) => Promise<DirectusUser>
  login: (email: string, password: string, options?: LoginOptions & { redirect?: boolean | RouteLocationRaw }) => Promise<DirectusUser | null>
  loginWithProvider: (provider: string, redirectOnLogin?: boolean | string) => Promise<void>
  logout: (redirect?: boolean | RouteLocationRaw) => Promise<void>
  createUser: (data: RegisterUserInput) => Promise<DirectusUser>
  register: (data: RegisterUserInput) => Promise<DirectusUser>
  inviteUser: (email: string, role: string, inviteUrl?: string) => Promise<void>
  acceptUserInvite: (token: string, password: string) => Promise<void>
  passwordRequest: (email: string, resetUrl?: string) => Promise<void>
  passwordReset: (token: string, password: string) => Promise<void>
}
```

**Example:**

typescript

```
const {
  user,
  loggedIn,
  login,
  logout,
  readMe,
  updateMe,
} = useDirectusAuth()

// Login
await login('user@example.com', 'password')

// Check if logged in
if (loggedIn.value) {
  console.log('Logged in as:', user.value.email)
}

// Update user
await updateMe({ first_name: 'John' })

// Logout
await logout()
```

#### Properties [​](https://www.nuxt-directus-sdk.com/api/composables/#properties)

##### `user` [​](https://www.nuxt-directus-sdk.com/api/composables/#user)

-   **Type:** `Ref<DirectusUser | null>`

-   **Description:** Current authenticated user

typescript

```
const { user } = useDirectusAuth()

console.log(user.value?.email)
console.log(user.value?.first_name)
console.log(user.value?.role)
```

##### `loggedIn` [​](https://www.nuxt-directus-sdk.com/api/composables/#loggedin)

-   **Type:** `ComputedRef<boolean>`

-   **Description:** Whether a user is currently logged in

typescript

```
const { loggedIn } = useDirectusAuth()

if (loggedIn.value) {
  console.log('User is authenticated')
}
```

#### Methods [​](https://www.nuxt-directus-sdk.com/api/composables/#methods)

##### `readMe()` [​](https://www.nuxt-directus-sdk.com/api/composables/#readme)

Fetch the current user's data.

**Returns:** `Promise<DirectusUser | null>`

typescript

```
const { readMe } = useDirectusAuth()

const user = await readMe()
```

##### `updateMe(data)` [​](https://www.nuxt-directus-sdk.com/api/composables/#updateme-data)

Update the current user's profile.

**Parameters:**

-   `data: UpdateMeInput` - Fields to update. `role` and `policies` are excluded to prevent privilege escalation. `avatar` accepts a pre-uploaded file ID (`string`), not a file object — upload the file first, then pass its ID here.

**Returns:** `Promise<DirectusUser>`

typescript

```
const { updateMe } = useDirectusAuth()

await updateMe({
  first_name: 'John',
  last_name: 'Doe',
})

// To update avatar, first upload the file, then attach its ID
await updateMe({ avatar: 'file-uuid' })
```

##### `login(email, password, options?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#login-email-password-options)

Login with email and password.

**Parameters:**

-   `email: string` - User email

-   `password: string` - User password
-   `options?: LoginOptions & { redirect?: boolean | RouteLocationRaw }` - Login options

**Returns:** `Promise<DirectusUser | null>`

typescript

```
const { login } = useDirectusAuth()

// Login with redirect (default)
await login('user@example.com', 'password')

// Login without redirect
await login('user@example.com', 'password', { redirect: false })

// Login with custom redirect
await login('user@example.com', 'password', { redirect: '/dashboard' })

// Login with OTP
await login('user@example.com', 'password', { otp: '123456' })
```

##### `loginWithProvider(provider, redirectOnLogin?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#loginwithprovider-provider-redirectonlogin)

Login with SSO/OAuth provider. Note that a redirect is required for SSO authentication, so if you are passing `false` to redirectOnLogin your browser will still redirect, but you will be redirected to the current page.

**Parameters:**

-   `provider: string` - Provider name (google, github, microsoft, etc.)

-   `redirectOnLogin?: string | boolean` - URL to redirect to after login

**Returns:** `Promise<void>`

typescript

```
const { loginWithProvider } = useDirectusAuth()

// Login with Google
await loginWithProvider('google')

// Login with custom redirect
await loginWithProvider('google', '/dashboard')

// Login with redirect as boolean
await loginWithProvider('google', false)
```

##### `logout(redirect?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#logout-redirect)

Logout the current user.

**Parameters:**

-   `redirect?: boolean | RouteLocationRaw` - Where to redirect after logout

**Returns:** `Promise<void>`

typescript

```
const { logout } = useDirectusAuth()

// Logout with default redirect
await logout()

// Logout without redirect
await logout(false)

// Logout with custom redirect
await logout('/login')
```

##### `createUser(data)` / `register(data)` [​](https://www.nuxt-directus-sdk.com/api/composables/#createuser-data-register-data)

Create a new user account. `register()` is an alias for `createUser()`.

**Parameters:**

-   `data: RegisterUserInput` - User registration data

**Returns:** `Promise<DirectusUser>`

typescript

```
const { register } = useDirectusAuth()

const newUser = await register({
  email: 'new@example.com',
  password: 'secure-password',
  first_name: 'John',
  last_name: 'Doe',
})
```

##### `inviteUser(email, role, inviteUrl?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#inviteuser-email-role-inviteurl)

Invite a new user.

**Parameters:**

-   `email: string` - User email

-   `role: string` - Role ID or UUID
-   `inviteUrl?: string` - Custom invite URL

**Returns:** `Promise<void>`

typescript

```
const { inviteUser } = useDirectusAuth()

await inviteUser(
  'newuser@example.com',
  'role-uuid',
  'https://yourapp.com/accept-invite'
)
```

##### `acceptUserInvite(token, password)` [​](https://www.nuxt-directus-sdk.com/api/composables/#acceptuserinvite-token-password)

Accept a user invitation.

**Parameters:**

-   `token: string` - Invite token

-   `password: string` - New password

**Returns:** `Promise<void>`

typescript

```
const { acceptUserInvite } = useDirectusAuth()

await acceptUserInvite('invite-token', 'new-password')
```

##### `passwordRequest(email, resetUrl?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#passwordrequest-email-reseturl)

Request a password reset.

**Parameters:**

-   `email: string` - User email

-   `resetUrl?: string` - Custom reset URL

**Returns:** `Promise<void>`

typescript

```
const { passwordRequest } = useDirectusAuth()

await passwordRequest(
  'user@example.com',
  'https://yourapp.com/reset-password'
)
```

##### `passwordReset(token, password)` [​](https://www.nuxt-directus-sdk.com/api/composables/#passwordreset-token-password)

Reset password with token.

**Parameters:**

-   `token: string` - Reset token

-   `password: string` - New password

**Returns:** `Promise<void>`

typescript

```
const { passwordReset } = useDirectusAuth()

await passwordReset('reset-token', 'new-password')
```

---

### `useDirectusUser()` [​](https://www.nuxt-directus-sdk.com/api/composables/#usedirectususer)

Direct access to the current user state.

**Returns:** `Ref<DirectusUser | null>`

typescript

```
const user = useDirectusUser()

console.log(user.value?.email)
console.log(user.value?.first_name)

// Watch for changes
watch(user, (newUser) => {
  if (newUser) {
    console.log('User logged in:', newUser.email)
  }
  else {
    console.log('User logged out')
  }
})
```

## Directus Client Composables [​](https://www.nuxt-directus-sdk.com/api/composables/#directus-client-composables)

### `useDirectus()` [​](https://www.nuxt-directus-sdk.com/api/composables/#usedirectus)

Get the Directus client instance for making API requests.

**Returns:** `DirectusClient<DirectusSchema>`

typescript

```
const directus = useDirectus()

// Read items
const articles = await directus.request(readItems('articles'))

// Create item
const newArticle = await directus.request(createItem('articles', {
  title: 'New Article',
  content: 'Article content...',
}))

// Update item
await directus.request(updateItem('articles', 'item-id', {
  title: 'Updated Title',
}))

// Delete item
await directus.request(deleteItem('articles', 'item-id'))

// Read singleton
const settings = await directus.request(readSingleton('settings'))

// Custom queries
const { data: articles } = await useAsyncData('articles', () =>
  directus.request(readItems('articles', {
    filter: { status: { _eq: 'published' } },
    sort: ['-date_created'],
    limit: 10,
  })))
```

**Common Operations:**

typescript

```
const directus = useDirectus()

// Collections
const items = await directus.request(readItems('collection'))
const item = await directus.request(readItem('collection', 'id'))
const created = await directus.request(createItem('collection', data))
const updated = await directus.request(updateItem('collection', 'id', data))
await directus.request(deleteItem('collection', 'id'))

// Singletons
const singleton = await directus.request(readSingleton('settings'))
await directus.request(updateSingleton('settings', data))
```

---

### `useDirectusUrl(path?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#usedirectusurl-path)

Generate full URLs to your Directus instance. This composable is context-aware:

-   **Client**: returns the client URL (or proxy path if `proxy` is enabled)

-   **Server (SSR)**: returns the server URL if configured (for Docker/K8s internal networking), otherwise the client URL
-   **Proxy**: returns `window.location.origin + proxyPath` on client, or host header-based URL on server

**Parameters:**

-   `path?: string` - Optional path to append

**Returns:** `string`

typescript

```
const directusUrl = useDirectusUrl()
// Client: https://directus.example.com
// Server (with split URL): http://directus:8055

const apiUrl = useDirectusUrl('items/articles')
// Client: https://directus.example.com/items/articles

const assetsUrl = useDirectusUrl('assets')
// Client: https://directus.example.com/assets
```

---

### `useDirectusOriginUrl(path?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#usedirectusoriginurl-path)

Generate URLs to the **public-facing** Directus instance. Unlike `useDirectusUrl`, this always returns the client URL; it ignores both `proxy` and `serverDirectusUrl`.

Use this when you need the real Directus URL for browser navigation (e.g. SSO redirects, admin links).

**Parameters:**

-   `path?: string` - Optional path to append

**Returns:** `string`

typescript

```
const ssoUrl = useDirectusOriginUrl('/auth/login/google?redirect=...')
// Always: https://directus.example.com/auth/login/google?redirect=...

const adminUrl = useDirectusOriginUrl('admin')
// Always: https://directus.example.com/admin
```

---

### `useDirectusPreview()` [​](https://www.nuxt-directus-sdk.com/api/composables/#usedirectuspreview)

Control and check preview mode. Preview mode is typically used to show draft/unpublished content when viewing your site with a `?preview=true` query parameter.

**Returns:** `Ref<boolean>`

typescript

```
const directusPreview = useDirectusPreview()

// Check if preview mode is active
if (directusPreview.value) {
  console.log('Preview mode is enabled')
}
```

**Note:** Preview mode is separate from visual editor mode. Preview mode is set automatically by the plugin when `?preview=true` is in the URL. Visual editor mode is set automatically when the site is inside a Directus iframe.

vue

```
<script setup>
const directusPreview = useDirectusPreview()
</script>

<template>
  <div v-if="directusPreview" class="preview-banner">
    Preview Mode — Showing draft content
  </div>
</template>
```

---

### `useDirectusVisualEditor()` [​](https://www.nuxt-directus-sdk.com/api/composables/#usedirectusvisualeditor)

Check if the visual editor is active (i.e., your site is loaded inside a Directus iframe).

**Returns:** `Ref<boolean>`

This composable is set automatically by the Directus plugin — you do not need to set it manually. When `visualEditor: true` is in your config and the site is inside an iframe, this will be `true`.

typescript

```
const directusVisualEditor = useDirectusVisualEditor()

if (directusVisualEditor.value) {
  console.log('Inside Directus iframe — editing enabled')
}
```

**Common Usage:**

vue

```
<script setup>
const directusVisualEditor = useDirectusVisualEditor()
</script>

<template>
  <div v-if="directusVisualEditor" class="editor-banner">
    Editing Mode Active
  </div>
</template>
```

## File Composables [​](https://www.nuxt-directus-sdk.com/api/composables/#file-composables)

### `uploadDirectusFile(file, query?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#uploaddirectusfile-file-query)

Upload a single file to Directus.

**Parameters:**

-   `file: { file: File, data?: Partial<Record<keyof DirectusFile, string>> }` - File and metadata

-   `query?: Query` - Directus query options

**Returns:** `Promise<DirectusFile>`

typescript

```
const file = event.target.files[0]

const uploaded = await uploadDirectusFile({
  file,
  data: {
    title: 'My Image',
    description: 'Image description',
    folder: 'folder-uuid',
  }
}, {
  fields: ['*'],
})

console.log('Uploaded:', uploaded.id)
```

---

### `uploadDirectusFiles(files, query?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#uploaddirectusfiles-files-query)

Upload multiple files to Directus.

**Parameters:**

-   `files: Array<{ file: File, data?: Partial<Record<keyof DirectusFile, string>> }>` - Files and metadata

-   `query?: Query` - Directus query options

**Returns:** `Promise<DirectusFile[] | DirectusFile>`

typescript

```
const files = Array.from(event.target.files).map(file => ({
  file,
  data: {
    folder: 'folder-uuid',
  }
}))

const uploaded = await uploadDirectusFiles(files)

console.log('Uploaded files:', uploaded.length)
```

---

### `getDirectusFileUrl(file, options?)` [​](https://www.nuxt-directus-sdk.com/api/composables/#getdirectusfileurl-file-options)

Generate a URL for a Directus file with optional transformations.

**Parameters:**

-   `file: string | DirectusFile` - File ID or file object

-   `options?: DirectusFileOptions` - Transformation options

**Returns:** `string`

typescript

```
// Basic URL
const url = getDirectusFileUrl('file-uuid')

// With transformations
const url = getDirectusFileUrl('file-uuid', {
  width: 800,
  height: 600,
  quality: 80,
  fit: 'cover',
  format: 'webp',
})

// From file object
const file = await directus.request(readFile('file-uuid'))
const url = getDirectusFileUrl(file, { width: 400 })

// Download link
const downloadUrl = getDirectusFileUrl(file, {
  download: true,
  filename: 'custom-name.jpg',
})
```

**Options:**

typescript

```
interface DirectusFileOptions {
  filename?: string // Custom filename for downloads
  download?: boolean // Force download
  width?: number // Resize width
  height?: number // Resize height
  quality?: number // Image quality (1-100)
  fit?: 'cover' | 'contain' | 'inside' | 'outside'
  format?: 'jpg' | 'png' | 'webp' | 'tiff' | 'avif'
  withoutEnlargement?: boolean // Prevent upscaling
  key?: string // Access key for private files
}
```

**Examples:**

typescript

```
// Responsive image sizes
const thumbnail = getDirectusFileUrl(file, { width: 200, format: 'webp' })
const medium = getDirectusFileUrl(file, { width: 800, format: 'webp' })
const large = getDirectusFileUrl(file, { width: 1600, format: 'webp' })

// High-quality cover image
const cover = getDirectusFileUrl(file, {
  width: 1920,
  height: 1080,
  fit: 'cover',
  quality: 90,
  format: 'webp',
})

// Optimized thumbnail
const thumb = getDirectusFileUrl(file, {
  width: 300,
  height: 300,
  fit: 'cover',
  quality: 70,
  format: 'webp',
  withoutEnlargement: true,
})
```

## Storage Composables [​](https://www.nuxt-directus-sdk.com/api/composables/#storage-composables)

### `useDirectusStorage()` [​](https://www.nuxt-directus-sdk.com/api/composables/#usedirectusstorage)

Get the Directus client storage instance (primarily for internal use).

**Returns:** `DirectusStorage`

typescript

```
const storage = useDirectusStorage()

// Get item
const token = await storage.get('directus_session_token')

// Set item
await storage.set('directus_session_token', 'token-value')

// Delete item
await storage.delete('directus_session_token')
```

**Note:** This composable is mainly used internally for session management. You typically won't need to use it directly.

## See Also [​](https://www.nuxt-directus-sdk.com/api/composables/#see-also)

-   [Server-Side Utilities](https://www.nuxt-directus-sdk.com/guide/server-side.html)

-   [Configuration Reference](https://www.nuxt-directus-sdk.com/api/configuration/)
-   [Visual Editor Guide](https://www.nuxt-directus-sdk.com/guide/visual-editor.html)

-   [Directus SDK Documentation](https://docs.directus.io/reference/sdk.html)

---
Source: [Composables | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/api/composables/)

# Authentication Composables | Nuxt Directus SDK

### `useDirectusAuth()` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#usedirectusauth)

Main authentication composable with methods and state for user authentication.

**Returns:** `DirectusAuth`

typescript

```
interface DirectusAuth {
  user: Ref<DirectusUser | null>
  loggedIn: ComputedRef<boolean>
  readMe: () => Promise<DirectusUser | null>
  updateMe: (data: UpdateMeInput) => Promise<DirectusUser>
  login: (email: string, password: string, options?: LoginOptions & { redirect?: boolean | RouteLocationRaw }) => Promise<DirectusUser | null>
  loginWithProvider: (provider: string, redirectOnLogin?: boolean | string) => Promise<void>
  logout: (redirect?: boolean | RouteLocationRaw) => Promise<void>
  createUser: (data: RegisterUserInput) => Promise<DirectusUser>
  register: (data: RegisterUserInput) => Promise<DirectusUser>
  inviteUser: (email: string, role: string, inviteUrl?: string) => Promise<void>
  acceptUserInvite: (token: string, password: string) => Promise<void>
  passwordRequest: (email: string, resetUrl?: string) => Promise<void>
  passwordReset: (token: string, password: string) => Promise<void>
}
```

**Example:**

typescript

```
const {
  user,
  loggedIn,
  login,
  logout,
  readMe,
  updateMe,
} = useDirectusAuth()

// Login
await login('user@example.com', 'password')

// Check if logged in
if (loggedIn.value) {
  console.log('Logged in as:', user.value.email)
}

// Update user
await updateMe({ first_name: 'John' })

// Logout
await logout()
```

#### Properties [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#properties)

##### `user` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#user)

-   **Type:** `Ref<DirectusUser | null>`

-   **Description:** Current authenticated user

typescript

```
const { user } = useDirectusAuth()

console.log(user.value?.email)
console.log(user.value?.first_name)
console.log(user.value?.role)
```

##### `loggedIn` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#loggedin)

-   **Type:** `ComputedRef<boolean>`

-   **Description:** Whether a user is currently logged in

typescript

```
const { loggedIn } = useDirectusAuth()

if (loggedIn.value) {
  console.log('User is authenticated')
}
```

#### Methods [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#methods)

##### `readMe()` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#readme)

Fetch the current user's data.

**Returns:** `Promise<DirectusUser | null>`

typescript

```
const { readMe } = useDirectusAuth()

const user = await readMe()
```

##### `updateMe(data)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#updateme-data)

Update the current user's profile.

**Parameters:**

-   `data: UpdateMeInput` - Fields to update. `role` and `policies` are excluded to prevent privilege escalation. `avatar` accepts a pre-uploaded file ID (`string`), not a file object — upload the file first, then pass its ID here.

**Returns:** `Promise<DirectusUser>`

typescript

```
const { updateMe } = useDirectusAuth()

await updateMe({
  first_name: 'John',
  last_name: 'Doe',
})

// To update avatar, first upload the file, then attach its ID
await updateMe({ avatar: 'file-uuid' })
```

##### `login(email, password, options?)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#login-email-password-options)

Login with email and password.

**Parameters:**

-   `email: string` - User email

-   `password: string` - User password
-   `options?: LoginOptions & { redirect?: boolean | RouteLocationRaw }` - Login options

**Returns:** `Promise<DirectusUser | null>`

typescript

```
const { login } = useDirectusAuth()

// Login with redirect (default)
await login('user@example.com', 'password')

// Login without redirect
await login('user@example.com', 'password', { redirect: false })

// Login with custom redirect
await login('user@example.com', 'password', { redirect: '/dashboard' })

// Login with OTP
await login('user@example.com', 'password', { otp: '123456' })
```

##### `loginWithProvider(provider, redirectOnLogin?)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#loginwithprovider-provider-redirectonlogin)

Login with SSO/OAuth provider. Note that a redirect is required for SSO authentication, so if you are passing `false` to redirectOnLogin your browser will still redirect, but you will be redirected to the current page.

**Parameters:**

-   `provider: string` - Provider name (google, github, microsoft, etc.)

-   `redirectOnLogin?: string | boolean` - URL to redirect to after login

**Returns:** `Promise<void>`

typescript

```
const { loginWithProvider } = useDirectusAuth()

// Login with Google
await loginWithProvider('google')

// Login with custom redirect
await loginWithProvider('google', '/dashboard')

// Login with redirect as boolean
await loginWithProvider('google', false)
```

##### `logout(redirect?)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#logout-redirect)

Logout the current user.

**Parameters:**

-   `redirect?: boolean | RouteLocationRaw` - Where to redirect after logout

**Returns:** `Promise<void>`

typescript

```
const { logout } = useDirectusAuth()

// Logout with default redirect
await logout()

// Logout without redirect
await logout(false)

// Logout with custom redirect
await logout('/login')
```

##### `createUser(data)` / `register(data)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#createuser-data-register-data)

Create a new user account. `register()` is an alias for `createUser()`.

**Parameters:**

-   `data: RegisterUserInput` - User registration data

**Returns:** `Promise<DirectusUser>`

typescript

```
const { register } = useDirectusAuth()

const newUser = await register({
  email: 'new@example.com',
  password: 'secure-password',
  first_name: 'John',
  last_name: 'Doe',
})
```

##### `inviteUser(email, role, inviteUrl?)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#inviteuser-email-role-inviteurl)

Invite a new user.

**Parameters:**

-   `email: string` - User email

-   `role: string` - Role ID or UUID
-   `inviteUrl?: string` - Custom invite URL

**Returns:** `Promise<void>`

typescript

```
const { inviteUser } = useDirectusAuth()

await inviteUser(
  'newuser@example.com',
  'role-uuid',
  'https://yourapp.com/accept-invite'
)
```

##### `acceptUserInvite(token, password)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#acceptuserinvite-token-password)

Accept a user invitation.

**Parameters:**

-   `token: string` - Invite token

-   `password: string` - New password

**Returns:** `Promise<void>`

typescript

```
const { acceptUserInvite } = useDirectusAuth()

await acceptUserInvite('invite-token', 'new-password')
```

##### `passwordRequest(email, resetUrl?)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#passwordrequest-email-reseturl)

Request a password reset.

**Parameters:**

-   `email: string` - User email

-   `resetUrl?: string` - Custom reset URL

**Returns:** `Promise<void>`

typescript

```
const { passwordRequest } = useDirectusAuth()

await passwordRequest(
  'user@example.com',
  'https://yourapp.com/reset-password'
)
```

##### `passwordReset(token, password)` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#passwordreset-token-password)

Reset password with token.

**Parameters:**

-   `token: string` - Reset token

-   `password: string` - New password

**Returns:** `Promise<void>`

typescript

```
const { passwordReset } = useDirectusAuth()

await passwordReset('reset-token', 'new-password')
```

---

### `useDirectusUser()` [​](https://www.nuxt-directus-sdk.com/api/composables/auth.html#usedirectususer)

Direct access to the current user state.

**Returns:** `Ref<DirectusUser | null>`

typescript

```
const user = useDirectusUser()

console.log(user.value?.email)
console.log(user.value?.first_name)

// Watch for changes
watch(user, (newUser) => {
  if (newUser) {
    console.log('User logged in:', newUser.email)
  }
  else {
    console.log('User logged out')
  }
})
```

---
Source: [Authentication Composables | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/api/composables/auth.html)

# Client Composables | Nuxt Directus SDK

### `useDirectus()` [​](https://www.nuxt-directus-sdk.com/api/composables/client.html#usedirectus)

Get the Directus client instance for making API requests.

**Returns:** `DirectusClient<DirectusSchema>`

typescript

```
const directus = useDirectus()

// Read items
const articles = await directus.request(readItems('articles'))

// Create item
const newArticle = await directus.request(createItem('articles', {
  title: 'New Article',
  content: 'Article content...',
}))

// Update item
await directus.request(updateItem('articles', 'item-id', {
  title: 'Updated Title',
}))

// Delete item
await directus.request(deleteItem('articles', 'item-id'))

// Read singleton
const settings = await directus.request(readSingleton('settings'))

// Custom queries
const { data: articles } = await useAsyncData('articles', () =>
  directus.request(readItems('articles', {
    filter: { status: { _eq: 'published' } },
    sort: ['-date_created'],
    limit: 10,
  })))
```

**Common Operations:**

typescript

```
const directus = useDirectus()

// Collections
const items = await directus.request(readItems('collection'))
const item = await directus.request(readItem('collection', 'id'))
const created = await directus.request(createItem('collection', data))
const updated = await directus.request(updateItem('collection', 'id', data))
await directus.request(deleteItem('collection', 'id'))

// Singletons
const singleton = await directus.request(readSingleton('settings'))
await directus.request(updateSingleton('settings', data))
```

---

### `useDirectusUrl(path?)` [​](https://www.nuxt-directus-sdk.com/api/composables/client.html#usedirectusurl-path)

Generate full URLs to your Directus instance. This composable is context-aware:

-   **Client**: returns the client URL (or proxy path if `proxy` is enabled)

-   **Server (SSR)**: returns the server URL if configured (for Docker/K8s internal networking), otherwise the client URL
-   **Proxy**: returns `window.location.origin + proxyPath` on client, or host header-based URL on server

**Parameters:**

-   `path?: string` - Optional path to append

**Returns:** `string`

typescript

```
const directusUrl = useDirectusUrl()
// Client: https://directus.example.com
// Server (with split URL): http://directus:8055

const apiUrl = useDirectusUrl('items/articles')
// Client: https://directus.example.com/items/articles

const assetsUrl = useDirectusUrl('assets')
// Client: https://directus.example.com/assets
```

---

### `useDirectusOriginUrl(path?)` [​](https://www.nuxt-directus-sdk.com/api/composables/client.html#usedirectusoriginurl-path)

Generate URLs to the **public-facing** Directus instance. Unlike `useDirectusUrl`, this always returns the client URL; it ignores both `proxy` and `serverDirectusUrl`.

Use this when you need the real Directus URL for browser navigation (e.g. SSO redirects, admin links).

**Parameters:**

-   `path?: string` - Optional path to append

**Returns:** `string`

typescript

```
const ssoUrl = useDirectusOriginUrl('/auth/login/google?redirect=...')
// Always: https://directus.example.com/auth/login/google?redirect=...

const adminUrl = useDirectusOriginUrl('admin')
// Always: https://directus.example.com/admin
```

---

### `useDirectusPreview()` [​](https://www.nuxt-directus-sdk.com/api/composables/client.html#usedirectuspreview)

Control and check preview mode. Preview mode is typically used to show draft/unpublished content when viewing your site with a `?preview=true` query parameter.

**Returns:** `Ref<boolean>`

typescript

```
const directusPreview = useDirectusPreview()

// Check if preview mode is active
if (directusPreview.value) {
  console.log('Preview mode is enabled')
}
```

**Note:** Preview mode is separate from visual editor mode. Preview mode is set automatically by the plugin when `?preview=true` is in the URL. Visual editor mode is set automatically when the site is inside a Directus iframe.

vue

```
<script setup>
const directusPreview = useDirectusPreview()
</script>

<template>
  <div v-if="directusPreview" class="preview-banner">
    Preview Mode — Showing draft content
  </div>
</template>
```

---

### `useDirectusVisualEditor()` [​](https://www.nuxt-directus-sdk.com/api/composables/client.html#usedirectusvisualeditor)

Check if the visual editor is active (i.e., your site is loaded inside a Directus iframe).

**Returns:** `Ref<boolean>`

This composable is set automatically by the Directus plugin — you do not need to set it manually. When `visualEditor: true` is in your config and the site is inside an iframe, this will be `true`.

typescript

```
const directusVisualEditor = useDirectusVisualEditor()

if (directusVisualEditor.value) {
  console.log('Inside Directus iframe — editing enabled')
}
```

**Common Usage:**

vue

```
<script setup>
const directusVisualEditor = useDirectusVisualEditor()
</script>

<template>
  <div v-if="directusVisualEditor" class="editor-banner">
    Editing Mode Active
  </div>
</template>
```

---
Source: [Client Composables | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/api/composables/client.html)

# File Composables | Nuxt Directus SDK

### `uploadDirectusFile(file, query?)` [​](https://www.nuxt-directus-sdk.com/api/composables/file.html#uploaddirectusfile-file-query)

Upload a single file to Directus.

**Parameters:**

-   `file: { file: File, data?: Partial<Record<keyof DirectusFile, string>> }` - File and metadata

-   `query?: Query` - Directus query options

**Returns:** `Promise<DirectusFile>`

typescript

```
const file = event.target.files[0]

const uploaded = await uploadDirectusFile({
  file,
  data: {
    title: 'My Image',
    description: 'Image description',
    folder: 'folder-uuid',
  }
}, {
  fields: ['*'],
})

console.log('Uploaded:', uploaded.id)
```

---

### `uploadDirectusFiles(files, query?)` [​](https://www.nuxt-directus-sdk.com/api/composables/file.html#uploaddirectusfiles-files-query)

Upload multiple files to Directus.

**Parameters:**

-   `files: Array<{ file: File, data?: Partial<Record<keyof DirectusFile, string>> }>` - Files and metadata

-   `query?: Query` - Directus query options

**Returns:** `Promise<DirectusFile[] | DirectusFile>`

typescript

```
const files = Array.from(event.target.files).map(file => ({
  file,
  data: {
    folder: 'folder-uuid',
  }
}))

const uploaded = await uploadDirectusFiles(files)

console.log('Uploaded files:', uploaded.length)
```

---

### `getDirectusFileUrl(file, options?)` [​](https://www.nuxt-directus-sdk.com/api/composables/file.html#getdirectusfileurl-file-options)

Generate a URL for a Directus file with optional transformations.

**Parameters:**

-   `file: string | DirectusFile` - File ID or file object

-   `options?: DirectusFileOptions` - Transformation options

**Returns:** `string`

typescript

```
// Basic URL
const url = getDirectusFileUrl('file-uuid')

// With transformations
const url = getDirectusFileUrl('file-uuid', {
  width: 800,
  height: 600,
  quality: 80,
  fit: 'cover',
  format: 'webp',
})

// From file object
const file = await directus.request(readFile('file-uuid'))
const url = getDirectusFileUrl(file, { width: 400 })

// Download link
const downloadUrl = getDirectusFileUrl(file, {
  download: true,
  filename: 'custom-name.jpg',
})
```

**Options:**

typescript

```
interface DirectusFileOptions {
  filename?: string // Custom filename for downloads
  download?: boolean // Force download
  width?: number // Resize width
  height?: number // Resize height
  quality?: number // Image quality (1-100)
  fit?: 'cover' | 'contain' | 'inside' | 'outside'
  format?: 'jpg' | 'png' | 'webp' | 'tiff' | 'avif'
  withoutEnlargement?: boolean // Prevent upscaling
  key?: string // Access key for private files
}
```

**Examples:**

typescript

```
// Responsive image sizes
const thumbnail = getDirectusFileUrl(file, { width: 200, format: 'webp' })
const medium = getDirectusFileUrl(file, { width: 800, format: 'webp' })
const large = getDirectusFileUrl(file, { width: 1600, format: 'webp' })

// High-quality cover image
const cover = getDirectusFileUrl(file, {
  width: 1920,
  height: 1080,
  fit: 'cover',
  quality: 90,
  format: 'webp',
})

// Optimized thumbnail
const thumb = getDirectusFileUrl(file, {
  width: 300,
  height: 300,
  fit: 'cover',
  quality: 70,
  format: 'webp',
  withoutEnlargement: true,
})
```

---
Source: [File Composables | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/api/composables/file.html)

# Storage Composables | Nuxt Directus SDK

### `useDirectusStorage()` [​](https://www.nuxt-directus-sdk.com/api/composables/storage.html#usedirectusstorage)

Get the Directus client storage instance (primarily for internal use).

**Returns:** `DirectusStorage`

typescript

```
const storage = useDirectusStorage()

// Get item
const token = await storage.get('directus_session_token')

// Set item
await storage.set('directus_session_token', 'token-value')

// Delete item
await storage.delete('directus_session_token')
```

**Note:** This composable is mainly used internally for session management. You typically won't need to use it directly.

---
Source: [Storage Composables | Nuxt Directus SDK](https://www.nuxt-directus-sdk.com/api/composables/storage.html)
