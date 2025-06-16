export const generateRandomId = nbr => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < nbr; i++) {
      randomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "_" + randomId;
};
