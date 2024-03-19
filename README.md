`npm install -g eas-cli`

### Add EAS build

`eas build:configure`

### Add vars
```
eas secret:create --name="MAPBOX_PUBLIC_API_KEY" --value="$(grep 'MAPBOX_PUBLIC_API_KEY' .env | cut -d '=' -f2 | tr -d '[:space:]')"
eas secret:create --name="MAPBOX_SECURE_API_KEY" --value="$(grep 'MAPBOX_SECURE_API_KEY' .env | cut -d '=' -f2 | tr -d '[:space:]')"
eas secret:create --name="GOOGLE_MAPS_API_KEY" --value="$(grep 'GOOGLE_MAPS_API_KEY' .env | cut -d '=' -f2 | tr -d '[:space:]')"
eas secret:create --name="MAPBOX_STYLE_URL" --value="$(grep 'MAPBOX_STYLE_URL' .env | cut -d '=' -f2 | tr -d '[:space:]')"
```

### Build
`eas build --profile development --platform ios`
`eas build --profile development --platform android`

### Run
`npx expo start --dev-client`

### Check dependencies versions errors
`npx expo install --check`

