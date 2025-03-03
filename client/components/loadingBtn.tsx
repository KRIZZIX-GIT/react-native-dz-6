import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

const LoadingButton = ({ onPress }: any) => {
	const [isLoading, setIsLoading] = useState(false);

	const handlePress = async () => {
		setIsLoading(true);
		try {	
			await onPress(); 
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Pressable onPress={handlePress} disabled={isLoading} style={styles.button}>
			{isLoading ? (
				<>
					<Text style={styles.text}>Загрузка...</Text>
					<ActivityIndicator color="#fff" />
				</>
			) : (
				<Text style={styles.text}>Отправить</Text>
			)}
		</Pressable>
	);
};

export default LoadingButton;

const styles = StyleSheet.create({
	button: {
		width: '100%',
		height: 50,
		boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.35)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		flexDirection: 'row',
		gap: 10,
	},
	text: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},
});
