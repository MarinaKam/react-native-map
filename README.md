### Add vars
```
eas secret:create --name="MAPBOX_PUBLIC_API_KEY" --value="$(grep 'MAPBOX_PUBLIC_API_KEY' .env | cut -d '=' -f2 | tr -d '[:space:]')"
eas secret:create --name="MAPBOX_SECURE_API_KEY" --value="$(grep 'MAPBOX_SECURE_API_KEY' .env | cut -d '=' -f2 | tr -d '[:space:]')"
eas secret:create --name="GOOGLE_MAPS_API_KEY" --value="$(grep 'GOOGLE_MAPS_API_KEY' .env | cut -d '=' -f2 | tr -d '[:space:]')"
```

### Build
`eas build --profile development-simulator --platform ios`
`eas build --profile development-simulator --platform android`

### Run
`npx expo start --dev-client`

### Check dependencies versions errors
`npx expo install --check`



