import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Screen, Text } from "app/components"
import {
  ResultFormatOptions,
  launchDocumentScannerAsync,
} from "@infinitered/react-native-mlkit-document-scanner"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

/**
 * Steps
 *   - safeAreaEdges={["top"]} to Screen
 *   - Add a Button component with text "Scan Document" and onPress={scanDocument}
 *   - Add a state variable uri and setUri to manage the scanned document URI
 *   - Add an AutoImage component to display the scanned document
 *   - Implement the scanDocument function to launch the document scanner
 */

interface DocScannerScreenProps extends AppStackScreenProps<"DocScanner"> {}

export const DocScannerScreen: FC<DocScannerScreenProps> = observer(function DocScannerScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

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
      {uri && <AutoImage source={{ uri }} maxWidth={400} maxHeight={400} />}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
