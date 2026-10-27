# BUE Campus Lost & Found

A mobile app for reporting lost and found items on the BUE campus. Students can report an item, see found items on a campus map, claim an item, chat with the finder and confirm the handover with a pickup code.

Mobile Development (25CSCI38H), Coursework 01, Phase 1: UI prototype.

## Team and screens

| Member | Screens |
|---|---|
| Youssef Alaa (241784) | Report an item, Camera, Campus map |
| Mohamed Khalil (249415) | Home, Notifications, Pickup (QR code) |
| Marwan Galal (239310) | My items, Item details, Chat |

## Tech stack

- Expo SDK 58, React Native 0.88, TypeScript
- Expo Router (file-based navigation)
- NativeWind (Tailwind CSS for React Native)
- lucide-react-native icons
- expo-camera, expo-image-picker, @react-native-community/datetimepicker, react-native-qrcode-svg

## Running the app

```bash
npm install
npx expo start -c
```

Scan the QR code with Expo Go on your phone. If the phone can't connect to the dev server (for example on a public Wi-Fi network), use:

```bash
npx expo start --tunnel -c
```

## Architecture: MVVM

```
src/
  app/            routes (Expo Router). Each file only renders its screen
  views/
    screens/      View: the UI of each screen
    components/   View: shared UI (NavBar, BackButton, FormInput, ActionButton, ...)
  viewmodels/     ViewModel: one hook per screen with its state and logic
  models/         Model: data types (Item, MyItem)
  services/       Model: data access (sample data for now)
  constants/      fixed data (colours, categories, campus locations, map layout)
```

- A screen calls its ViewModel hook and only draws what it returns.
- ViewModels hold state and logic and call services. They contain no UI.
- Services and models know nothing about screens, so the sample data can be replaced with a real database later without changing the screens.

## Navigation

- Home, Campus map and My items are switched from the bottom NavBar.
- The NavBar's Report (+) button opens Report an item as a modal; Add photo opens the Camera.
- Item details, Chat, Notifications and Pickup open on top of the current screen.

## Branches

- `youssef241784`, `mohamed249415`, `Marwan239310`: each member's own work
- `integration`: all three merged and connected
- `main`: final version

## Phase 1 limitations

This is a UI prototype with sample data. There is no backend yet, so reports are not saved, search does not filter, and the camera shutter and gallery buttons are not connected.
