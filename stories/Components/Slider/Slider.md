<!-- @format -->

import { Canvas, Meta, Story } from '@storybook/blocks';
import * as SliderStories from './Slider.stories';

<Meta of={SliderStories} />

# Slider

A highly customizable slider component with smooth animations, keyboard navigation, and extensive styling options. Built with Framer Motion for smooth animations and fully compatible with React applications.

<Canvas of={SliderStories.Default} />

## Features

- **Smooth Interactions**

  - Drag and drop functionality
  - Keyboard navigation support
  - Smooth animations with Framer Motion
  - Customizable transition effects

- **Value Control**
  - Controlled and uncontrolled modes
  - Custom min/max range
  - Step size configuration
  - Default value support

<Canvas of={SliderStories.WithCustomRange} />

- **Styling Options**
  - Custom track colors
  - Gradient-filled track
  - Customizable thumb appearance
  - Focus ring styling
  - Hover state customization

<Canvas of={SliderStories.CustomColors} />

- **Accessibility**
  - Keyboard navigation
  - ARIA attributes
  - Focus management
  - Screen reader support

## Usage

### Basic Usage

```tsx
import { Slider } from './UI/Components/Slider';

function App() {
  return (
    <Slider
      defaultValue={50}
      min={0}
      max={100}
      step={1}
      onValueChange={(value) => console.log(value)}
    />
  );
}
```

### With Custom Range and Steps

```tsx
function App() {
  return <Slider min={-50} max={50} step={10} defaultValue={0} />;
}
```

<Canvas of={SliderStories.WithSteps} />

### With Custom Colors

```tsx
function App() {
  return (
    <Slider
      defaultValue={60}
      trackColor='bg-gray-100'
      filledTrackColorFrom='blue-400'
      filledTrackColorTo='blue-600'
      thumbColor='bg-blue-50'
      thumbBorderColor='border-blue-500'
      thumbHoverColor='hover:bg-blue-100'
      focusRingColor='focus:ring-blue-500'
    />
  );
}
```

### Multiple Sliders

<Canvas of={SliderStories.MultipleSliders} />

## Props

| Prop                   | Type                      | Default                    | Description                              |
| ---------------------- | ------------------------- | -------------------------- | ---------------------------------------- |
| `value`                | `number`                  | -                          | Controlled value of the slider           |
| `defaultValue`         | `number`                  | `0`                        | Initial value of the slider              |
| `min`                  | `number`                  | `0`                        | Minimum value of the slider              |
| `max`                  | `number`                  | `100`                      | Maximum value of the slider              |
| `step`                 | `number`                  | `1`                        | Step increment value                     |
| `disabled`             | `boolean`                 | `false`                    | Whether the slider is disabled           |
| `onValueChange`        | `(value: number) => void` | -                          | Callback when value changes              |
| `trackColor`           | `string`                  | `'bg-gray-200'`            | Color class for the track                |
| `filledTrackColorFrom` | `string`                  | `'primary-400'`            | Starting gradient color for filled track |
| `filledTrackColorTo`   | `string`                  | `'primary-600'`            | Ending gradient color for filled track   |
| `thumbColor`           | `string`                  | `'bg-primary-50'`          | Color class for the thumb                |
| `thumbBorderColor`     | `string`                  | `'border-primary-500'`     | Border color class for the thumb         |
| `thumbHoverColor`      | `string`                  | `'hover:bg-white'`         | Hover color class for the thumb          |
| `focusRingColor`       | `string`                  | `'focus:ring-primary-500'` | Focus ring color class                   |

## Accessibility

The Slider component is built with accessibility in mind:

- Full keyboard navigation support (Arrow keys, Home/End)
- ARIA attributes for slider role and values
- Focus management with visible focus ring
- Screen reader support with value announcements

## Best Practices

1. **Provide meaningful defaults** that make sense for your use case
2. **Use appropriate step sizes** for your data range
3. **Consider the context** when choosing colors and styling
4. **Test keyboard navigation** thoroughly
5. **Ensure sufficient contrast** between track and thumb
6. **Use appropriate sizing** for touch targets

## Browser Support

The Slider component works in all modern browsers and includes proper fallbacks:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome for Android

## Contributing

If you'd like to contribute to this component, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This component is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

---

If you like my Slider component, please give me a star on [GitHub](https://github.com/xianzhezhang/xianzhe.site).
