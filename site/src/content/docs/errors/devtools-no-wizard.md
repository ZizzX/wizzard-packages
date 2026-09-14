---
title: devtools-no-wizard
description: The devtools panel was rendered with no wizard to watch, neither from a provider nor from a prop.
---

```
[wizzard] devtools has no wizard to watch. It reads WizardContext or the wizard prop, and
neither is set. Render <WizardDevtools/> inside <WizardProvider>, or pass wizard={wizard}.
…/errors/devtools-no-wizard
```

Shown by `<WizardDevtools/>` in place of the panel. The panel watches one wizard and reads it
two ways: the React context a `<WizardProvider>` puts in place, or the `wizard` prop. With
neither there is nothing to draw, and drawing an empty panel would read as a wizard that
committed nothing.

The usual cause is placement: the panel is a sibling of the provider rather than a child of
it. A panel rendered beside the form, in a layout file or a portal, is outside the context
even though it looks adjacent on screen. Passing `wizard={wizard}` works from anywhere and is
what a host with several wizards does; the context is the convenience for the common one.
