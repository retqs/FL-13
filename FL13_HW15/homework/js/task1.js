// TODO: Your code goes here
const paymentCard = {cash: '100$'};
const creditCard = {creditLimit: '50$', cash: '200$'};

function assign(newObj, target, source) {
  for (let [key, value] of Object.entries(target)) {
    Object.defineProperty(newObj, key, {
      value: value,
      writable: true
    });
  }

  for (let [key, value] of Object.entries(source)) {
    Object.defineProperty(newObj, key, {
      value: value,
      writable: true
    });
  }

  return newObj;
}

const universalCard = assign({}, creditCard, paymentCard);

console.log(universalCard, '<-------new card');
