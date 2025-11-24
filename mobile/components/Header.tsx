import { View } from 'react-native';
import { Text } from '@ui-kitten/components';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View className="p-4 bg-blue-500">
      <Text category='h4' className="text-white mt-8">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-white opacity-80 mt-1">
          {subtitle}
        </Text>
      )}
    </View>
  );
}