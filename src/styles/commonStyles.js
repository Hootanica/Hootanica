import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdfc', // soft off-white
  },
  scrollSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fffdfc', // pale green-pink mix
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#fffdfc',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  primaryButton: {
    backgroundColor: '#8ebf66', //'#d97a8d', // petal pink
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#8ebf66', // sprout green
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white', //'#ffffff', // white text on colored buttons
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#ffffff', // white on green
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#6b9c4b', // leaf green border
  },
  outlineButtonText: {
    color: '#6b9c4b', // leaf green text
    fontWeight: 'bold',
    fontSize: 16,
  },
});
