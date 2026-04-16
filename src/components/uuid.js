function UUID() {
  let uuid = localStorage.getItem('shame_uuid');
  if (!uuid) {
    uuid = crypto.randomUUID(); 
    localStorage.setItem('shame_uuid', uuid);
  }
  return uuid;
}
export default UUID