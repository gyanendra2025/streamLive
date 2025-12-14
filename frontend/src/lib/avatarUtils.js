// Fallback avatar URL in case external services fail
export const FALLBACK_AVATAR = "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=200";

// Generate a reliable avatar URL
export const generateAvatarUrl = (name = "User", index = null) => {
  const idx = index || Math.floor(Math.random() * 100) + 1;
  const displayName = name || `User${idx}`;
  
  // UI Avatars is very reliable and doesn't timeout
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&size=200`;
};

// Sanitize avatar URL - replace old/broken services with UI Avatars
export const sanitizeAvatarUrl = (url, userName = "User") => {
  if (!url) return FALLBACK_AVATAR;
  
  // Check if URL is from old/unreliable services
  const unreliableServices = [
    'i.pravatar.cc',
    'avatar.iran.liara.run',
    'randomuser.me'
  ];
  
  const isUnreliable = unreliableServices.some(service => url.includes(service));
  
  if (isUnreliable) {
    // Replace with UI Avatars
    return generateAvatarUrl(userName);
  }
  
  return url;
};

// Handle image loading errors
export const handleImageError = (e) => {
  e.target.src = FALLBACK_AVATAR;
  e.target.onerror = null; // Prevent infinite loop
};
