// Environment validation
const requiredEnvVars = {
  VITE_STREAM_API_KEY: import.meta.env.VITE_STREAM_API_KEY,
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error(
    `❌ Missing required environment variables:\n${missingVars.join('\n')}\n\nPlease check your .env file.`
  );
}

export const ENV = {
  STREAM_API_KEY: import.meta.env.VITE_STREAM_API_KEY,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

export const validateEnv = () => {
  return missingVars.length === 0;
};
