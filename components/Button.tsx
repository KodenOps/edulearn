import { Text, Pressable } from 'react-native';
import React from 'react';

interface ButtonProps {
	title: string;
	action?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, action }) => {
	return (
		<Pressable
			onPress={action}
			className='bg-blue-700 rounded justify-center items-center py-5 w-full text-red-300'>
			<Text className='text-white font-bold text-lg'>{title}</Text>
		</Pressable>
	);
};

export default Button;
