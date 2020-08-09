const axios = require("axios");

exports.getAll = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data.map((x) => {
    return {
      id: x.id,
      name: x.name,
      email: x.email,
      address: {
        city: x.address.city,
        street: x.address.street,
      },
      avatar: `https://i.pravatar.cc/150?img=${x.id}`,
    };
  });
};
