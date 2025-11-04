# Quicker.style

A small UI component library for Vue 3 with modern design and full TypeScript support.

## Installation

```bash
npm install quicker.style
# or
yarn add quicker.style
# or
pnpm add quicker.style
```

## Usage

> **Important:** CSS is automatically included when importing components. You **don't need** to manually import `'quicker.style/style.css'`!

### Using in Nuxt.js

#### 1. Install the library

```bash
npm install quicker.style
```

#### 2. Create a plugin

Create a file `plugins/quicker-style.client.ts`:

```typescript
import {
  QInput,
  QButton,
  QDialog,
  QToastStack,
  // ... import needed components
} from 'quicker.style'

export default defineNuxtPlugin((nuxtApp) => {
  // Register components globally
  const components = {
    QInput,
    QButton,
    QDialog,
    QToastStack,
    // ... add other components
  }

  Object.entries(components).forEach(([name, component]) => {
    nuxtApp.vueApp.component(name, component)
  })
})
```

#### 3. Use components

Components are now available in all `.vue` files without import:

```vue
<template>
  <div class="q-theme-light">
    <QButton variant="primary">Button</QButton>
    <QInput v-model="value" placeholder="Enter text" />
    <QToastStack />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Composables need to be imported
import { useToast } from 'quicker.style'

const value = ref('')
const { addToast } = useToast()
</script>
```

> **Note:** The plugin must have a `.client.ts` suffix to work only on the client side (important for SSR).

### Using in a regular Vue 3 project

#### Option A: Global registration

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import {
  QButton,
  QInput,
  QDialog,
  QToastStack
} from 'quicker.style'

const app = createApp(App)

// Register components globally
app.component('QButton', QButton)
app.component('QInput', QInput)
app.component('QDialog', QDialog)
app.component('QToastStack', QToastStack)

app.mount('#app')
```

#### Option B: Import as needed

```vue
<!-- MyComponent.vue -->
<template>
  <QButton @click="showDialog = true">Open</QButton>
  <QDialog v-model="showDialog">
    <p>Content</p>
  </QDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { QButton, QDialog } from 'quicker.style'

const showDialog = ref(false)
</script>
```

## Examples

### Button

```vue
<template>
  <QButton variant="primary" size="large">
    Click me
  </QButton>
  
  <QButton variant="success" outline>
    Success
  </QButton>
  
  <QButton variant="danger" pill>
    Delete
  </QButton>
</template>

<script setup>
import { QButton } from 'quicker.style'
// CSS is automatically included!
</script>
```

### Input

```vue
<template>
  <QInput 
    v-model="value"
    placeholder="Enter text"
    size="medium"
    filled
  />
  
  <QInput 
    v-model="email"
    type="email"
    placeholder="email@example.com"
    required
  />
</template>

<script setup>
import { ref } from 'vue'
import { QInput } from 'quicker.style'
// CSS is automatically included!

const value = ref('')
const email = ref('')
</script>
```

### Dialog

```vue
<template>
  <QButton @click="showDialog = true">Open dialog</QButton>
  
  <QDialog v-model="showDialog">
    <template #label>
      <h2>Dialog title</h2>
    </template>
    
    <p>Dialog content</p>
    
    <template #footer>
      <QButton @click="showDialog = false">Close</QButton>
    </template>
  </QDialog>
</template>

<script setup>
import { ref } from 'vue'
import { QDialog, QButton } from 'quicker.style'
// CSS is automatically included!

const showDialog = ref(false)
</script>
```

### Toast

```vue
<template>
  <QButton @click="showToast">Show notification</QButton>
  <QToastStack />
</template>

<script setup>
import { QButton, QToastStack, useToast } from 'quicker.style'
// CSS is automatically included!

const { addToast } = useToast()

const showToast = () => {
  addToast({
    message: 'Operation completed successfully!',
    type: 'success',
    duration: 3000
  })
}
</script>
```

## Theming

The library uses CSS variables for theming. A light theme is available by default.

### Applying theme

Add the `q-theme-light` class to the root element:

```html
<!-- In Nuxt.js: app.vue or layouts/default.vue -->
<template>
  <div class="q-theme-light">
    <NuxtPage />
  </div>
</template>
```

Or in regular Vue:
```html
<!-- index.html -->
<body class="q-theme-light">
  <div id="app"></div>
</body>
```

### CSS variables

You can customize colors, spacing, typography, and other parameters through CSS variables:

```css
:root {
  --q-color-primary-500: #0ea5e9;
  --q-spacing-medium: 1rem;
  --q-border-radius-medium: 0.25rem;
  /* and other variables */
}
```

A complete list of CSS variables is available in the `src/themes/light.scss` file.

## TypeScript

All components are fully typed. You can import prop types:

```typescript
import type { QButtonProps, QInputProps, Placement } from 'quicker.style'
```

## Components

- **QAlert** - Alerts and notifications
- **QAvatar** - User avatar
- **QBadge** - Badges and labels
- **QButton** - Buttons in various variants
- **QCard** - Content cards
- **QCheckbox** - Checkboxes
- **QDetails** - Expandable details
- **QDialog** - Modal dialogs
- **QDivider** - Dividers
- **QDrawer** - Drawer panels
- **QFlex** - Flex container
- **QForm** / **QFormField** - Forms and form fields
- **QGrid** / **QGridItem** - Grid system
- **QIcon** - Icons
- **QIconButton** - Icon buttons
- **QInput** - Input fields
- **QMenu** / **QMenuItem** - Menus
- **QPopup** - Popover windows
- **QSkeleton** - Loading skeletons
- **QSpinner** - Loading indicators
- **QTabs** / **QTab** / **QTabPanel** - Tabs
- **QToast** / **QToastStack** - Toast notifications

## Requirements

- Vue 3.4.5 or higher
- Modern browser with ES modules support

## License

MIT
