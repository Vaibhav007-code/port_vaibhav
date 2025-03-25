// api.js (modified)
const API_KEY = '$2a$10$qCFKVFUR.nWpghZ9DiMxi.qZ6TqsPtA7JzBgVIwVnByeclz.WXQTu';
const BIN_ID = '67e28e448960c979a577f7f0'; // Replace with your actual bin ID

export const fetchData = async () => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  return (await response.json()).record;
};

export const updateData = async (newData) => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    },
    body: JSON.stringify(newData)
  });
  // Return the updated record so that your app can refresh its state
  return (await response.json()).record;
};

export const setAdminPassword = async (password, security) => {
  const data = await fetchData();
  data.adminPassword = password;
  data.security = security;
  return updateData(data);
};
