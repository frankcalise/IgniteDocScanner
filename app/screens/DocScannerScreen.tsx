import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, FlatList, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Text } from "app/components"
import {
  ResultFormatOptions,
  launchDocumentScannerAsync,
} from "@infinitered/react-native-mlkit-document-scanner"
import { colors, spacing } from "app/theme"
import { useHeader } from "app/utils/useHeader"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"

interface DocScannerScreenProps extends AppStackScreenProps<"DocScanner"> {}

export const DocScannerScreen: FC<DocScannerScreenProps> = observer(function DocScannerScreen() {
  const [scannedDocuments, setScannedDocuments] = React.useState<string[]>([])

  const $safeAreaInsets = useSafeAreaInsetsStyle(["top", "bottom"])

  const handleScan = React.useCallback(async () => {
    const result = await launchDocumentScannerAsync({
      pageLimit: 1,
      galleryImportAllowed: true,
      resultFormats: ResultFormatOptions.JPEG,
    })

    if (!result.canceled && result.pages?.[0]) {
      setScannedDocuments([...scannedDocuments, result.pages[0]])
    }
  }, [scannedDocuments])

  useHeader(
    {
      title: "Doc Scanner",
      rightText: "Scan",
      onRightPress: handleScan,
    },
    [handleScan],
  )

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={$cell}>
        <Image source={{ uri: item }} style={$cellImage} />
        <Text text={item} />
      </View>
    )
  }

  return (
    <FlatList
      style={[$root, $safeAreaInsets]}
      keyExtractor={(item) => item}
      contentContainerStyle={$list}
      data={scannedDocuments}
      renderItem={renderItem}
      ListEmptyComponent={() => (
        <View style={$empty}>
          <Text
            preset="subheading"
            text="Tap `Scan` in the top right to get started!"
            style={$emptyText}
          />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={$separator} />}
    />
  )
})

const $root: ViewStyle = {
  // flex: 1,
}

const $cellImage: ImageStyle = {
  width: 200,
  height: 200,
  borderRadius: spacing.xs,
  resizeMode: "cover",
}

const $list: ViewStyle = {
  height: Dimensions.get("window").height,
}

const $cell: ViewStyle = {
  height: 250,
  alignItems: "center",
}

const $separator: ViewStyle = {
  height: spacing.xxs,
  backgroundColor: colors.palette.neutral300,
}

const $empty: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
}

const $emptyText: TextStyle = {
  textAlign: "center",
}
