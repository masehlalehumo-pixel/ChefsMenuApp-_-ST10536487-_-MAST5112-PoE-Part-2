# Chef's Menu Board (MAST5112 Portfolio of Evidence )

An interactive, user-friendly mobile and web application built with **React Native** and **Expo**, designed for culinary professionals to manage, organize, and track restaurant menu items dynamically with authentic South African flair.

## Features

* **Dynamic Menu Management:** Easily add new dishes complete with title, rich descriptions, price inputs, and course classifications.
* **Category Filtering:** Organize items seamlessly across standard course categories (*Starter*, *Main Course*, *Dessert*).
* **Real-Time Executive Statistics:** Automatically calculates and displays total active item counts and live average pricing in South African Rand (R).
* **Deletion Safeguards:** Interactive confirmation alerts prevent accidental deletions by prompting users with the specific name of the dish before removal.
* **Form Validation:** Built-in safeguards ensure all required text fields are populated and prices are valid positive numbers before submission.

## Tech Stack & Dependencies

* **Framework:** React Native (Expo SDK)
* **Language:** TypeScript (`.tsx`)
* **Core Components:** `FlatList`, `SafeAreaView`, `KeyboardAvoidingView`, `Alert`, `ScrollView`, `TextInput`
* **State Management:** React Hooks (`useState`)

## Challenges & Solutions Faced During Development

Throughout this project, they were a couple of technical difficulties that I encountered and resolved:

### 1. Dynamic Alert String Interpolation
* **Challenge:** Initially, the confirmation alert dialog rendered literal template strings (e.g., `"${dishName}"`) instead of evaluating the dynamic name of the selected menu item.
* **Solution:** Refactored the alert message string to use robust string concatenation (`'Are you sure you want to remove "' + item.dishName + '" from the menu'`), ensuring the active dish name evaluates and displays correctly inside the runtime alert dialog.

### 2. Expo Template Routing & Boilerplate Cleanup
* **Challenge:** Default Expo template structures introduced unused wrapper components (`themed-text.tsx` and `themed-view.tsx`) that triggered missing module warnings/ showing errors (`Cannot find module '@/hooks/use-theme-color'`).
* **Solution:** Consolidated application logic and custom styling directly into a clean, self-contained `index.tsx` file and removed unused boilerplate modules to eliminate compile-time warnings/errors and streamline project architecture.

### 3. TypeScript Type Safety Constraints
* **Challenge:** Strict TypeScript checking in `.tsx` files flagged parameter implicit `any` type errors when passing item references into custom event handlers like `confirmDelete(item)`.
* **Solution:** Explicitly typed function parameters (e.g., `(item: any)`) to satisfy TypeScript compiler standards while preserving smooth runtime interactivity and seamless state filtering.

### 4. Cross-Environment Testing & Preview Isolation (Expo Snack)
* **Challenge:** During early development, local simulator routing issues and missing module warnings on my mobile device and browser previews made it difficult to determine whether errors popping up were from local project configurations or core code logic.
* **Solution:** Leveraged [Expo Snack (`snack.expo.dev`)](https://snack.expo.dev) to rapidly prototype, test, and isolate the application code in a clean, web-based sandbox environment. This allowed for real-time validation of dynamic state updates, form validations, and delete alert behavior directly on physical devices via Expo Go before finalizing the local code in Virtual Studio Code.


## Project Links

* **GitHub Repository:** [ChefsMenuApp GitHub Link]:  https://github.com/masehlalehumo-pixel/ChefsMenuApp-_-ST10536487-_-MAST5112-PoE-Part-2
* **Video Demonstration:** [YouTube Video Link]: https://youtu.be/i56o4Y-W4ek?si=0xhFPLC1FpecVmEW


Final Portfolio of Evidence YouTube video demonstration 
https://youtu.be/rm1pQIcBVXI?si=muE2SqTLv4iKIutl

