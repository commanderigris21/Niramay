// ... existing code ...

// Replace the text logo with an image logo
<View style={styles.logoContainer}>
  <Image 
    source={require('../assets/niramay-logo.png')} 
    style={styles.logo}
    resizeMode="contain"
  />
</View>

// ... existing code ...

// ... existing code ...
logoContainer: {
  height: 40,
  justifyContent: 'center',
},
logo: {
  height: 35,
  width: 120,
},
// ... existing code ...