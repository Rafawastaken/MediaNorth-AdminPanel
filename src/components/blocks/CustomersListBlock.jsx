import CustomerCard from "../cards/CustomerCard";

const CustomersListBlock = ({ customers }) => {
  return (
    <ul className="grid grid-cols-2 xl:grid-cols-3  gap-4">
      {customers.map((customer) => (
        <CustomerCard customer={customer} />
      ))}
    </ul>
  );
};

export default CustomersListBlock;
