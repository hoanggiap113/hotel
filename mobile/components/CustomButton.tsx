import { View } from 'react-native';
import { Button } from '@ui-kitten/components';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  status?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  disabled?: boolean;
}

export default function CustomButton({ 
  title, 
  onPress, 
  status = 'primary',
  disabled = false 
}: CustomButtonProps) {
  return (
    <View className="mb-3">
      <Button 
        status={status}
        size='large'
        onPress={onPress}
        disabled={disabled}
      >
        {title}
      </Button>
    </View>
  );
}