## Create Storybook Story

Create a Storybook story for a component with the following requirements:

### Required Stories

- **Default** — Component with default props
- **Variant stories** — One story per CVA variant

### Meta Configuration

- Add `autodocs` tag
- Set `title` following "Layer/ComponentName" convention:
    - Base components: `"Base/Button"`
    - Application components: `"Application/Notifications/Sonner"`

### Usage

```
/create-story <component-path>
```

### Example

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "Base/Button",
	component: Button,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Primary: Story = {
	args: { variant: "primary" },
};

export const Secondary: Story = {
	args: { variant: "secondary" },
};
```
