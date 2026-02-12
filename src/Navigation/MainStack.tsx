import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../styles/tokens';
import { CommunityListScreen } from '../screens/Home/CommunityListScreen';
import { CommunityDetailsScreen } from '../screens/ComunityDetails/CommunityDetailsScreen';
import { CreatePostScreen } from '../screens/CreatePost/CreatePostScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CommunityList"
        component={CommunityListScreen}
      />
      <Stack.Screen
        name="CommunityDetails"
        component={CommunityDetailsScreen}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
      />
    </Stack.Navigator>
  );
};
