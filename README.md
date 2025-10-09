## Notes App (React Native + Expo)

A simple, fast, and theme-aware notes application built with React Native and Expo. Create, search, and manage notes locally with persistent storage, smooth navigation, and dark/light theme support.

### Features
- **Create & edit notes**: Title and rich multi-line description
- **Local persistence**: Stored using `AsyncStorage`
- **Search**: Filter notes by title or description
- **Theming**: System-like dark and light themes via `ThemeContext`
- **Navigation**: Stack navigation with modal and transparent modal screens

### Tech Stack
- **Framework**: React Native (Expo)
- **Navigation**: `@react-navigation/native`, `@react-navigation/stack`
- **Icons**: `@expo/vector-icons`
- **Storage**: `@react-native-async-storage/async-storage`

### App Structure
```text
Notes-App/
  App.js                   # Navigation + ThemeProvider
  index.js                 # Expo entry
  Components/
    Navbar.jsx             # Top bar (optional)
    RenderNoteItems.jsx    # Note card renderer (themed)
  Screens/
    HomeScreen.jsx         # List + search (themed)
    NoteInput.jsx          # Create/Edit note (themed)
    SettingScreen.jsx      # Settings, theme toggle
  src/
    Colors.jsx             # Dark/Light palettes
    ThemeContext.jsx       # Theme provider + context
  assets/                  # App icons/splash
```

### Theming
- Colors are defined in `src/Colors.jsx` (`lightTheme`, `darkTheme`).
- Current theme comes from `ThemeContext` in `src/ThemeContext.jsx`.
- Screens and components derive a `colors` object:
```javascript
const { theme } = useContext(ThemeContext)
const colors = theme === 'dark' ? darkTheme : lightTheme
```

### Data Persistence
- Notes are saved under the `notes` key via `AsyncStorage`.
- `HomeScreen` loads and filters notes; `NoteInput` creates new entries.

### Prerequisites
- Node.js LTS and npm or Yarn
- Expo CLI (`npm i -g expo-cli`) if you prefer global, otherwise use `npx`
- Android Studio or Xcode for device simulators (or Expo Go on a physical device)

### Getting Started
```bash
# 1) Install dependencies
npm install

# 2) Start the dev server (choose a platform)
npm run start       # Expo Dev Tools
npm run android     # Launch Android (simulator/device)
npm run ios         # Launch iOS (simulator)
npm run web         # Web preview (limited RN features)
```

After the server starts, scan the QR code with Expo Go on your device or open the simulator.

### Available Scripts
```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web"
}
```

### Key Files
- `App.js`: Sets up `ThemeProvider` and a stack with `Home`, `Create Note` (modal), and `Setting` (transparent modal) screens.
- `Screens/HomeScreen.jsx`: Search and list notes using `FlatList`. Themed backgrounds, texts, and FAB icon color.
- `Screens/NoteInput.jsx`: Themed inputs for title/description, date badge, and save action.
- `Components/RenderNoteItems.jsx`: Themed note cards with delete action.

### Customization Tips
- Update palette tokens in `src/Colors.jsx` to brand your app.
- Extend `ThemeContext` to support system theme detection or custom accents.
- Add validation, sorting, or categories to `HomeScreen` and `NoteInput`.

### Troubleshooting
- If the Metro bundler fails to start, clear caches:
```bash
expo start -c
```
- For Android emulator issues, ensure an AVD is running from Android Studio.

### License
This project is provided as-is. You may adapt and use it per your repository's chosen license.

### Acknowledgements
- React Native team, Expo team, React Navigation
