import { View, Text, Pressable } from 'react-native';
import { typography } from '../../styles';

interface HeaderProps {
  Title: string;
  LeftIcon: React.ReactNode;
  LeftAction: () => void;
  RightIcon: React.ReactNode;
  RightAction: () => void;
}
export function Header({
  Title,
  LeftIcon,
  LeftAction,
  RightIcon,
  RightAction,
}: HeaderProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
      }}
    >
      {LeftIcon || Title ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onTouchStart={LeftAction}>{LeftIcon}</Pressable>
          <View style={{ width: 10 }} />
          <Text style={{ ...typography.h5 }}>{Title}</Text>
        </View>
      ) : (
        <View style={{ width: 24 }} />
      )}

      {RightIcon ? (
        <View onTouchStart={RightAction}>{RightIcon}</View>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
}
