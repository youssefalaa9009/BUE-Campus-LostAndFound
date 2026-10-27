# BUE Campus Lost & Found — interactive UI screens

This project keeps the original Expo/React Native project and adds working, navigable versions of the three supplied screens:
- **Item details** — key listing, found location/date, poster, share action, and claim navigation.
- **Chat** — message composer, send button, quick replies, pickup-code modal, pickup location card, and mark-returned action.
- **My items** — Lost/Found tabs, scrollable item cards, status progress, review actions, and report-item prompt.

## Run in VS Code

1. Extract this ZIP folder.
2. Open the `BUE-Campus-LostAndFound-main` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:
   ```bash
   npm install
   npx expo start
   ```
5. Press `w` to open the web version, or scan the QR code with Expo Go for a device.

The app opens on **My items**. Tap the **Car keys, blue tag** card to open Item details; tap **Claim this item** to open Chat. Use the bottom navigation to move between Home, Map, Report, My items, and Profile.

## Notes
- The screens use local demo state and sample data so interactions work without a backend/API.
- Messages are kept in component state for the current app session only.
- Report flow is a functional demo prompt; it is not connected to a server or image upload.
- UI is implemented in `src/app/index.tsx`, so no manual file moving or extra packages are needed.
