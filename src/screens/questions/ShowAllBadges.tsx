import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {View} from 'react-native-ui-lib';
import {IconShare} from '../../assets/icons/Icons';
import Header from '../../components/header/Header';
import tw from '../../lib/tailwind';
import {makeImage} from '../../redux/api/baseApi';
import {NavigProps} from '../../utils/interface/NaviProps';

interface SheetData {
  title?: string;
  subtitle?: string;
  image?: string;
}
const ShowAllBadges = ({navigation, route}: NavigProps<{badgeData: any}>) => {
  const {badgeData} = route.params;

  const bottomSheetRef = React.useRef(null);

  const [sheetData, setSheetData] = React.useState<SheetData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // configure snap points
  const snapPoints = React.useMemo(() => ['50%'], []);

  // function to handle expanding the bottom sheet
  const handleExpand = (data: SheetData) => {
    bottomSheetRef.current?.expand();
    setSheetData(data);
    setIsSheetOpen(true);
  };

  const handleClose = () => {
    setIsSheetOpen(false);
  };

  const renderBackdrop = props => {
    if (!isSheetOpen) return null;
    return (
      <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.close()}>
        <View
          style={[props.style, tw`absolute inset-0 bg-black bg-opacity-50 `]}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={tw`flex-1 bg-white px-[4%] pt-4 dark:bg-primaryDark`}>
      <Header
        title={'All Badges'}
        containerStyle={tw`mt-2`}
        isIcon={true}
        hideRightIcon={true}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={badgeData}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                handleExpand({
                  image: makeImage(item?.photo),
                  subtitle: item?.description,
                  title: item?.name,
                })
              }
              key={item?.id}
              style={tw`items-center self-start gap-1 w-1/3  p-2`}>
              <Image
                style={tw`h-14 aspect-square rounded-2xl`}
                source={{
                  uri: makeImage(item?.photo),
                }}
              />
              <Text
                style={tw`text-black dark:text-white text-[10px] font-WorkRegular`}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <BottomSheet
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        onClose={handleClose}
        snapPoints={snapPoints}
        index={-1}
        // handleIndicatorStyle={tw`bg-black`}
        handleStyle={tw`bg-white dark:bg-darkBg`}
        enablePanDownToClose>
        <>
          <View style={tw`px-4 flex-1 mt-6 py-2 bg-white dark:bg-darkBg`}>
            <View style={tw`items-center`}>
              <Image
                source={{
                  uri: sheetData?.image,
                }}
                style={tw`h-22 w-22`}
              />
            </View>
            <Text
              style={tw`text-2xl text-center font-WorkBold text-black dark:text-white font-bold mt-6`}>
              {sheetData?.title || 'Question Title'}
            </Text>
            <Text
              style={tw`text-base text-gray70 dark:text-white font-WorkMedium text-center mt-2`}>
              {sheetData?.subtitle}
            </Text>
            <View style={tw`items-center`}>
              <TouchableOpacity
                style={tw`bg-violet100 p-3 mt-6 flex-row gap-2 items-center justify-center w-5/12 rounded-full`}>
                <SvgXml xml={IconShare} />
                <Text style={tw`text-white text-sm font-WorkSemiBold`}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </BottomSheet>
    </View>
  );
};

export default ShowAllBadges;
