// api.js (new file)
const API_KEY = '$2a$10$qCFKVFUR.nWpghZ9DiMxi.qZ6TqsPtA7JzBgVIwVnByeclz.WXQTu';
const BIN_ID = '67e28a8e8a456b79667c2de5'; // Replace with your actual bin ID

export const fetchData = async () => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { 'X-Master-Key': API_KEY }
  });
  return (await response.json()).record;
};

export const updateData = async (newData) => {
  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    },
    body: JSON.stringify(newData)
  });
};