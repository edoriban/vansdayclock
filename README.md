# Vansday Clock (Doomsday Clock)

Una aplicación premium para monitorear el tiempo restante hasta la medianoche según el Bulletin of the Atomic Scientists.

## 🚀 Cómo Compilar (Localmente)

Para generar el instalador (.apk) sin usar la nube de Expo, sigue estos pasos:

### 1. Preparar el Entorno
Asegúrate de tener instalados:
- Android Studio (con SDK y Emulador).
- Java (JDK) correctamente configurado en `JAVA_HOME`.

### 2. Generar carpetas nativas
Si es la primera vez o has cambiado librerías, ejecuta:
```bash
npx expo prebuild
```

### 3. Compilar APK (Android)

#### Modo Debug (Para pruebas rápidas)
- **Peso:** ~160 MB (Incluye herramientas de desarrollo y soporte para todas las arquitecturas).
- **Comando:**
  ```powershell
  cd android
  ./gradlew assembleDebug
  ```
- **Ruta:** `android/app/build/outputs/apk/debug/app-debug.apk`

#### Modo Release (Versión Final)
- **Peso:** ~25 - 35 MB (Optimizado y comprimido).
- **Comando:**
  ```powershell
  cd android
  ./gradlew assembleRelease
  ```
- **Ruta:** `android/app/build/outputs/apk/release/app-release-unsigned.apk`

---

## ⚠️ Nota sobre Compatibilidad y Versión "Lite"

**Problema conocido:** La librería de gráficos 3D (`Three.js` / `expo-gl`) causaba cierres inesperados (crashes) en ciertos dispositivos Android (ej. OnePlus Nord N30 5G) debido a incompatibilidades con OpenGL.

**Solución Actual:**
Se ha habilitado una **Versión Lite** por defecto que:
1. Deshabilita el fondo 3D (`CosmicBackground`).
2. Usa un degradado `LinearGradient` optimizado.
3. Reduce significativamente el riesgo de fallos en el arranque.

### Comandos para Compilación Segura (Universal)
Para asegurar que la app funcione en todos los dispositivos Android:

1. **Limpia y regenera los archivos nativos:**
   ```powershell
   npx expo prebuild --clean
   ```
   *(Acepta con "yes" si te pregunta por cambios no guardados)*

2. **Compila la versión Release Universal:**
   ```powershell
   cd android
   ./gradlew assembleRelease
   ```
   *Esto generará un APK compatible con todas las arquitecturas y sin el bug de 3D.*

---

##  Información sobre iOS

Compilar para iOS es más restrictivo debido a las políticas de Apple:

### ¿Se necesita una Mac?
**Sí.** Para compilar localmente (`.ipa`), necesitas el motor **Xcode**, que solo funciona en macOS. 

**¿Hay alternativas?**
1. **EAS Build (Nube):** La única forma de generar un instalador de iOS desde Windows es usando los servidores de Expo (`eas build --platform ios`). Ellos usan una Mac en la nube por ti.
2. **Máquina Virtual / Hackintosh:** Es complejo y poco estable, no se recomienda para producción.

### ¿Se necesita cuenta de pago?
**Sí y No.**
- **Para probar en tu propio iPhone:** Puedes usar una cuenta de Apple gratuita y conectar tu iPhone a una Mac por cable. La app caducará a los 7 días.
- **Para distribuir el instalador (.ipa):** Necesitas obligatoriamente la cuenta de **Apple Developer ($99 USD/año)**.

### Recomendación para compartir en iOS sin Mac ni cuenta:
Usa **Expo Go**. Si publicas tu proyecto (`npx expo export` + hosting), tus amigos con iPhone solo tienen que descargar la app gratuita "Expo Go" de la App Store y abrir tu link.
