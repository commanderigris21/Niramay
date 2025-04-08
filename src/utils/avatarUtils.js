/**
 * Utility functions for avatar generation
 */

/**
 * Generates a consistent color based on a string (name)
 * @param {string} name - The name to generate a color for
 * @returns {string} - A hex color code
 */
export const getAvatarColor = (name) => {
  // Define a set of pleasant colors for avatars
  const colors = [
    '#e74c3c', // Red (matches app theme)
    '#3498db', // Blue
    '#2ecc71', // Green
    '#f39c12', // Orange
    '#9b59b6', // Purple
    '#1abc9c', // Teal
    '#34495e', // Dark Blue
    '#16a085', // Green Blue
    '#27ae60', // Emerald
    '#2980b9', // Strong Blue
    '#8e44ad', // Wisteria
    '#f1c40f', // Yellow
    '#e67e22', // Carrot
    '#d35400', // Pumpkin
    '#c0392b', // Pomegranate
  ];
  
  // Generate a hash code from the name
  let hashCode = 0;
  if (name.length === 0) return colors[0];
  
  for (let i = 0; i < name.length; i++) {
    hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
  }
  
  // Use the hash to pick a color
  return colors[Math.abs(hashCode) % colors.length];
};

/**
 * Gets the initials from a name (first letter or first and last if available)
 * @param {string} name - The full name
 * @returns {string} - The initials (1-2 characters)
 */
export const getInitials = (name) => {
  if (!name) return '?';
  
  const parts = name.split(' ').filter(part => part.length > 0);
  
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  
  // Return first letter of first and last name
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Creates a letter avatar object with background color and initials
 * @param {string} name - The name to create an avatar for
 * @returns {Object} - Avatar object with backgroundColor and initials
 */
export const getLetterAvatar = (name) => {
  return {
    backgroundColor: getAvatarColor(name),
    initials: getInitials(name)
  };
};