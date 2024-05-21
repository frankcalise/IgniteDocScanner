import React from "react"
import { Dimensions, ViewStyle } from "react-native"
import { AutoImage, Button, Screen, Text } from "app/components"
import {
  ResultFormatOptions,
  launchDocumentScannerAsync,
} from "@infinitered/react-native-mlkit-document-scanner"

export function DocScannerScreen() {
  const [uri, setUri] = React.useState("")

  async function scanDocument() {
    const result = await launchDocumentScannerAsync({
      pageLimit: 1,
      galleryImportAllowed: true,
      resultFormats: ResultFormatOptions.JPEG,
    })

    if (!result.canceled && result.pages?.[0]) {
      setUri(result.pages[0])
    }
  }

  return (
    <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
      <Text text="docScanner" />
      <Button text="Scan Document" onPress={scanDocument} />
      {uri && (
        <AutoImage
          source={{ uri }}
          maxWidth={Dimensions.get("window").width}
          maxHeight={Dimensions.get("window").height - 200}
        />
      )}
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}
